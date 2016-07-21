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


    //默认的基本URL路径
    static BASE_URL = "/";

    //默认的请求头
    static headers = {};

    /**
     * @function 默认构造函数
     */
    constructor() {

        this._checkStatus = this._checkStatus.bind(this);

        this._parseJSON = this._parseJSON.bind(this);

        this._parseText = this._parseText.bind(this);

        this._fetchWithCORS = this._fetchWithCORS.bind(this);


    }

    /**
     * @function 检测返回值的状态
     * @param response
     * @returns {*}
     */
    _checkStatus(response) {

        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }

    /**
     * @function 解析返回值中的Response为JSON形式
     * @param response
     * @returns {*}
     */
    _parseJSON(response) {

        if (!!response) {

            return response.json();
        }
        else {
            return undefined;
        }

    }

    /**
     * @function 解析TEXT性质的返回
     * @param response
     * @returns {*}
     */
    _parseText(response) {

        if (!!response) {

            return response.text();
        }
        else {
            return undefined;
        }

    }

    /**
     * @function 封装好的跨域请求的方法
     * @param packagedRequestURL
     * @returns {*|Promise.<TResult>}
     * @private
     */
    _fetchWithCORS(packagedRequestURL, contentType) {

        return fetch(packagedRequestURL, {
            mode: "cors", headers: Model.headers
        })
            .then(this.checkStatus, (error)=> {
                return error;
            })
            .then(contentType === "json" ? this._parseJSON : this._parseText, (error)=> {
                return error;
            });
    }

    /**
     * @function 利用get方法发起请求
     * @param path 请求的路径(包括路径参数)
     * @param requestData 请求的参数
     * @param action 请求的类型
     * @param contentType 返回的类型
     * @returns {Promise.<TResult>|*} Promise.then((data)=>{},(error)=>{});
     */
    get({BASE_URL=Model.BASE_URL, path="/", action="GET", contentType="json"}) {

        //封装最终待请求的字符串
        const packagedRequestURL = `${BASE_URL}${(path)}?action=${action}`;

        //以CORS方式发起请求
        return this._fetchWithCORS(packagedRequestURL, contentType);

    }

    /**
     * @function 利用get方法与封装好的QueryParams形式发起请求
     * @param path 请求的路径(包括路径参数)
     * @param requestData 请求的参数
     * @param action 请求的类型
     * @returns {Promise.<TResult>|*} Promise.then((data)=>{},(error)=>{});
     */
    getWithQueryParams({BASE_URL=Model.BASE_URL, path="/", queryParams={}, action="GET", contentType="json"}) {


        //初始化查询字符串
        let queryString = "";

        //根据queryParams构造查询字符串
        for (let key in queryParams) {

            queryString += `${key}=${encodeURIComponent(queryParams[key])}&`;

        }

        //将查询字符串进行编码
        let encodedQueryString = (queryString);

        //封装最终待请求的字符串
        const packagedRequestURL = `${BASE_URL}${path}?${encodedQueryString}action=${action}`;

        //以CORS方式发起请求
        return this._fetchWithCORS(packagedRequestURL, contentType);

    }

    /**
     * @function 利用get方法与封装好的RequestData形式发起请求
     * @param path 请求的路径(包括路径参数)
     * @param requestData 请求的参数
     * @param action 请求的类型
     * @returns {Promise.<TResult>|*} Promise.then((data)=>{},(error)=>{});
     */
    getWithRequestData({path="/", requestData={}, action="GET", contentType="json"}) {

        //将requestData序列化为JSON
        //注意要对序列化后的数据进行URI编码
        var requestDataString = encodeURIComponent(JSON.stringify(requestData));

        //将字符串链接
        const packagedRequestURL = `${Model.BASE_URL}${path}?requestData=${requestDataString}&action=${action}`;

        return this._fetchWithCORS(packagedRequestURL, contentType);

    }

    /**
     * @function 考虑到未来post会有不同的请求方式,因此做区分处理
     * @param path
     * @param requestData
     * @param action
     * @returns {Promise.<TResult>|*}
     */
    postWithRequestData({path="/", requestData={}, action="POST", contentType="json"}) {

        //将requestData序列化为JSON
        //注意要对序列化后的数据进行URI编码
        var requestDataString = encodeURIComponent(JSON.stringify(requestData));

        //将字符串链接
        const packagedRequestURL = `${Model.BASE_URL}${path}?requestData=${requestDataString}&action=${action}`;

        return this._fetchWithCORS(packagedRequestURL, contentType);
    }

    put({path="/", requestData={}, action="put", contentType="json"}) {

    }


    delete({path="/", requestData={}, action="DELETE", contentType="json"}) {

    }

}


Model.testData = {};

Model.testData.error = {};