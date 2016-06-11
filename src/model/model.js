/**
 * Created by apple on 16/5/3.
 */
//自动进行全局的ES6 Promise的Polyfill
require('es6-promise').polyfill();
require('isomorphic-fetch');


/**
 * @function 基础的模型类,包含了基本的URL定义
 */
export default class Model {

    constructor() {

        //绑定本地的CheckStatus方法
        this.checkStatus = this.checkStatus.bind(this);

        //绑定本地的JSON解析方法
        this.parseJSON = this.parseJSON.bind(this);

    }


    /**
     * @function 检测响应参数的状态
     * @param response
     * @returns {*}
     */
    checkStatus(response) {

        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText)
            error.response = response
            throw error
        }
    }

    /**
     * @function 获取响应中的JSON参数
     * @param response
     * @returns {*}
     */
    parseJSON(response) {

        if (!!response) {
            return response.json()
        }
        else {
            return undefined;
        }


    }

    /**
     * @function 在url中根据名称获取值
     * @param name
     * @param url
     * @returns {*}
     */
    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

    /**
     * @function 以扁平化方式发起请求
     * @param host
     * @param path
     * @param requestData
     * @param action
     */
    getWithQueryParams({host=Model.BASE_URL, path="/", requestData={}, action="GET"}) {

        //待拼接的查询字符串
        let queryString = "";

        //拼接查询字符串
        for (let key in requestData) {
            queryString += `${key}=${requestData[key]}&`
        }

        //将字符串链接
        const packagedRequestURL = `${host}${path}?${queryString}action=${action}`;

        console.log(packagedRequestURL);

        //执行fetch方法发起请求
        return fetch(packagedRequestURL, {
            mode: "cors", headers: {}
        })
            .then(this.checkStatus, (error)=> {
                console.log(error);
                return error;
            })
            .then(this.parseJSON, (error)=> {
                return error;
            });

    }

    /**
     * @function 利用get方法发起请求
     * @param path 请求的路径(包括路径参数)
     * @param requestData 请求的参数
     * @param action 请求的类型
     * @returns {Promise.<TResult>|*} Promise.then((data)=>{},(error)=>{});
     */
    get({host=Model.BASE_URL, path="/", requestData={}, action="GET"}) {

        //将requestData序列化为JSON
        var requestDataString = encodeURIComponent(JSON.stringify(requestData));

        //将字符串链接
        const packagedRequestURL = `${host}${path}?requestData=${requestDataString}&action=${action}`;

        console.log(packagedRequestURL);

        return fetch(packagedRequestURL, {
            mode: "cors", headers: {}
        })
            .then(this.checkStatus, (error)=> {
                console.log(error);
                return error;
            })
            .then(this.parseJSON, (error)=> {
                return error;
            });
    }

    /**
     * @function 考虑到未来post会有不同的请求方式,因此做区分处理
     * @param path
     * @param requestData
     * @param action
     * @returns {Promise.<TResult>|*}
     */
    post({path="/", requestData={}, action="POST"}) {

        //将requestData序列化为JSON
        var requestDataString = encodeURIComponent(JSON.stringify(requestData));

        //将字符串链接
        const packagedRequestURL = `${Model.BASE_URL}${path}?requestData=${requestDataString}&action=${action}`;

        return fetch(packagedRequestURL, {
            mode: "cors", headers: {}
        })
            .then(this.checkStatus, (error)=> {
                console.log(error);
                return error;
            })
            .then(this.parseJSON, (error)=> {
                return error;
            });

    }

    put({path="/", requestData={}, action="put"}) {

    }


    delete({path="/", requestData={}, action="DELETE"}) {

    }

}


//基础的URL
Model.BASE_URL = "http://mp.dragon.live-forest.com/";

// Model.BASE_URL = "http://localhost:8080";

Model.testData = {};

Model.testData.error = {};