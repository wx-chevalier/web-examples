const queue = {}
let evalWorker = null

const setup = (paths) => {

    let externalScriptsDirective = ''

    if(paths){
        const ext = JSON.stringify(paths).replace(/[\[\]]/mig, '')
        externalScriptsDirective = `self.importScripts(${ext})`
    }

    const workerRunnerStrFunc = `function workerRunner(){

        ${externalScriptsDirective}

        const dangObjects = ['Worker', 'fetch', 'location', 'IndexedDB', 'WebTransport', 'WebSocketStream', 'BroadcastChannel', 'XMLHttpRequest', 'WebSocket', 'EventSource', 'WorkerNavigator', 'navigator']
        dangObjects.forEach(d => self[d] = {})
        
        self.onmessage = function(event) {
            const {code, context, uid} = event.data
            const keys = Object.keys(context)
            const keysStr = keys.toString()
            const func = new Function(keysStr, code)
            const arrkeys = keys.map(k => context[k])
            const res = func(...arrkeys)
            self.postMessage({uid, res})
        }

    }`

    const workerBlob = new Blob(
        [workerRunnerStrFunc.replace(/^function .+\{?|\}$/g, '')],
        { type:'module' }
    )

    const workerBlobUrl = URL.createObjectURL(workerBlob)

    evalWorker = new Worker(workerBlobUrl)

    evalWorker.addEventListener('message', function(event){
        const {uid, res} = event.data
        queue[uid](res)
        queue[uid] = null
        delete queue[uid]
    }, false)

}


const exe = (code, context) => {
    const uid = new Date().getTime() + Math.random()
    evalWorker.postMessage({code,context,uid})
    return new Promise((resolve, reject) => {
        queue[uid] = resolve
    })
}



export default {setup, exe}