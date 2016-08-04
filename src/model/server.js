/**
 * Created by apple on 16/7/26.
 */
var express = require('express');
var cors = require('cors');

import Model from "../model/model";
import ServerCache from "./server_cache";

//创建服务端缓存实例
const serverCache = new ServerCache();

/**
 * @region 全局配置
 * @type {string}
 */
const hashKey = "ggzy"; //缓存的Hash值
const timeOut = 5; //设置超时时间,5秒
/**
 * @endregion 全局配置
 */

//添加跨域支持
var app = express(cors());

//默认的GET类型的透明路由
app.get('/get_proxy', cors(), (req, res)=> {

    //所有查询参数是以GET方式传入
    //获取原地址
    let BASE_URL = decodeURIComponent(req.query.BASE_URL);

    //获取原路径
    let path = decodeURIComponent(req.query.path);

    //反序列化请求参数集合
    let params = {};

    //构造生成的全部的字符串
    let url = "";

    //遍历所有传入的参数集合
    for (let key in req.query) {

        if (key == "BASE_URL" || key == "path") {
            //对于传入的根URL与路径直接忽略,
            //封装其他参数
            continue;
        } else {
            params[key] = decodeURIComponent(req.query[key]);
        }

        url += `${key}${req.query[key]}`;

    }

    //判断缓存中是否存在值
    serverCache.get(hashKey, url).then((data)=> {

        //如果存在数据
        res.set('Access-Control-Allow-Origin', '*');
        res.send(data);
        res.end();

    }).catch((error)=> {

        //如果不存在数据,执行数据抓取
        //发起GET形式的请求
        const model = new Model();

        //判断是否已经返回
        let isSent = false;

        //使用模型类发起请求,并且不进行解码直接返回
        model.getWithQueryParams({
            BASE_URL,
            path,
            params,
            contentType: "text" //不进行解码,直接返回
        }).then((data)=> {

            if (isSent) {
                //如果已经设置了超时返回,则直接返回
                return;
            }
            //返回抓取到的数据
            res.set('Access-Control-Allow-Origin', '*');
            res.send(data);
            res.end();

            isSent = true;

        }, (error)=> {

            if (isSent) {
                //如果已经设置了超时返回,则直接返回
                return;
            }

            //如果直接抓取失败,则返回无效信息
            res.send(JSON.stringify({
                "message": "Invalid Request"
            }));

            isSent = true;

            throw error;

        });

        //设置秒超时返回N
        setTimeout(
            ()=> {

                if (isSent) {
                    //如果已经设置了超时返回,则直接返回
                    return;
                }

                //设置返回超时
                res.status(504);
                
                //终止本次返回
                res.end();

                isSent = true;

            },
            1000 * timeOut
        );

    });


});

//设置POST类型的默认路由

//默认的返回值
app.get('/', function (req, res) {
    res.send('Hello World!');
    res.end();

});

//启动服务器
var server = app.listen(399, '0.0.0.0', function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});