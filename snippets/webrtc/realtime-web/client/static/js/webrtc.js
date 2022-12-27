import {chart, initCanvas, visualizePacket} from "./common.js";

const webRTCBtn = document.getElementById("webrtc");
const reliable = false;

webRTCBtn.onclick = (_) => {
    initCanvas();

    let t0 = new Date();
    let messageCount = 0;
    let iceFinished = false;

    const wsClient = new WebSocket("wss://localhost:8002");
    const conn = new RTCPeerConnection({iceServers: [{urls: 'stun:stun.l.google.com:19302'}]});
    const dataChannel = reliable ?
        conn.createDataChannel('dataChannel', {ordered: true, maxRetransmits: 5}) :
        conn.createDataChannel('dataChannel', {ordered: false, maxRetransmits: 0});
    const decoder = new TextDecoder("utf-8");

    conn.onicecandidate = async e => {
        // console.log(`New ice candidate: ${e.candidate}`)
        if (e.candidate === null) {
            iceFinished = true;
            while (wsClient.readyState !== 1) await new Promise(r => setTimeout(r, 10));
            wsClient.send(btoa(JSON.stringify(conn.localDescription)));
        }
    }

    dataChannel.onopen = () => {
        console.info(`WebRTC DataChannel established in ${new Date() - t0} ms.`);
    };

    dataChannel.onmessage = (e) => {
        if (messageCount === 0) {
            webRTCBtn.disabled = true;
            t0 = new Date();
            chart.data.datasets[2].data.push({x: 0, y: 0});
        }
        messageCount += 1;
        if (new Date() - t0 - chart.data.datasets[2].data.at(-1).x > 200) {
            chart.data.datasets[2].data.push({x: new Date() - t0, y: messageCount});
            chart.update();
        }
        visualizePacket(decoder.decode(e.data));
    }

    dataChannel.onclose = () => {
        chart.data.datasets[2].data.push({x: new Date() - t0, y: messageCount});
        chart.update();
        conn.close();
        console.info(`${messageCount} message(s) were received within ${new Date() - t0} ms.`)
        console.info('DataChannel closed');
    };

    conn.createOffer().then(o => conn.setLocalDescription(o));

    wsClient.onmessage = (e) => {
        try {
            conn.setRemoteDescription(new RTCSessionDescription(JSON.parse(atob(e.data)))).then();
        } catch (e) {
            console.error(e);
        }
    }
}
