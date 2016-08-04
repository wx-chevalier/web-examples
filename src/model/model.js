/**
 * Created by apple on 16/5/3.
 */
//自动进行全局的ES6 Promise的Polyfill
require('es6-promise').polyfill();
require('isomorphic-fetch');
// import "whatwg-fetch";


/**
 * @function 基础的模型类,包含了基本的URL定义
 */
export default class Model {


    //默认的基本URL路径
    static BASE_URL = "/";

    //默认的请求头
    static headers = {
        "Origin": "*", //默认允许加载所有域的信息,
    };

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

        //HTTP请求头
        let httpHeaders = new Headers();

        //遍历所有的当前请求头
        for (let key in Model.headers) {
            httpHeaders.append(key, Model.headers[key]);
        }

        return fetch(packagedRequestURL, {
            mode: "cors", headers: httpHeaders
        })
            .then(this.checkStatus, (error)=> {
                throw error;
            })
            .then(contentType === "json" ? this._parseJSON : this._parseText, (error)=> {
                throw error;
            });


    }

    /**
     * @function 利用get方法发起请求
     * @param path 请求的路径(包括路径参数)
     * @param requestData 请求的参数
     * @param contentType 返回的类型
     * @returns {Promise.<TResult>|*} Promise.then((data)=>{},(error)=>{});
     */
    get({BASE_URL=Model.BASE_URL, path="/", contentType="json"}) {

        //封装最终待请求的字符串
        const packagedRequestURL = `${BASE_URL}${(path)}?action=GET`;

        //以CORS方式发起请求
        return this._fetchWithCORS(packagedRequestURL, contentType);

    }

    /**
     * @function 利用get方法与封装好的QueryParams形式发起请求
     * @param path 请求的路径(包括路径参数)
     * @param requestData 请求的参数
     * @returns {Promise.<TResult>|*} Promise.then((data)=>{},(error)=>{});
     */
    getWithQueryParams({BASE_URL=Model.BASE_URL, path="/", queryParams={}, contentType="json"}) {


        //初始化查询字符串
        let queryString = "";

        //根据queryParams构造查询字符串
        for (let key in queryParams) {

            //拼接查询字符串
            queryString += `${key}=${encodeURIComponent(queryParams[key])}&`;

        }

        //将查询字符串进行编码
        let encodedQueryString = (queryString);

        //封装最终待请求的字符串
        const packagedRequestURL = `${BASE_URL}${path}?${encodedQueryString}action=GET`;

        console.log(packagedRequestURL);

        //以CORS方式发起请求
        return this._fetchWithCORS(packagedRequestURL, contentType);

    }

    /**
     * @function 通过透明路由,利用get方法与封装好的QueryParams形式发起请求
     * @param BASE_URL 请求根URL地址,注意,需要添加http://以及末尾的/,譬如`http://api.com/`
     * @param path 请求路径,譬如"path1/path2"
     * @param queryParams 请求的查询参数
     * @param contentType 请求返回的数据格式
     * @param proxyUrl 请求的路由地址
     */
    getWithQueryParamsByProxy({BASE_URL=Model.BASE_URL, path="/", queryParams={}, contentType="json", proxyUrl="http://api.proxy.com"}) {

        //初始化查询字符串,将BASE_URL以及path进行编码
        let queryString = `BASE_URL=${encodeURIComponent(BASE_URL)}&path=${encodeURIComponent(path)}&`;

        //根据queryParams构造查询字符串
        for (let key in queryParams) {

            //拼接查询字符串
            queryString += `${key}=${encodeURIComponent(queryParams[key])}&`;

        }

        //将查询字符串进行编码
        let encodedQueryString = (queryString);

        //封装最终待请求的字符串
        const packagedRequestURL = `${proxyUrl}?${encodedQueryString}action=GET`;

        //以CORS方式发起请求
        return this._fetchWithCORS(packagedRequestURL, contentType);

    }

    /**
     * @function 以url-form-encoded方式发起请求
     * @param path
     * @param queryParams
     * @param contentType
     */
    post({path="/", queryParams={}, contentType="json"}) {

    }

    postWithJSONBody({path="/", queryParams={}, contentType="json"}) {

    }

}


Model.testData = {};

Model.testData.error = {};