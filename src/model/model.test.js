/**
 * Created by apple on 16/7/21.
 */

import Model from "./model";

const model = new Model();

//正常的发起请求
model
    .getWithQueryParams({
        BASE_URL: "http://ggzy.njzwfw.gov.cn/njggzy/jsgc/",
        path: "001001/001001001/001001001001/",
        queryParams: {
            Paging: 100
        },
        contentType: "text"

    })
    .then(
        (data)=> {
            console.log(data);
        }
    )
    .catch((error)=> {
        console.log(error);
    });

//使用透明路由发起请求
model
    .getWithQueryParamsByProxy({
        BASE_URL: "http://ggzy.njzwfw.gov.cn/njggzy/jsgc/",
        path: "001001/001001001/001001001001/",
        queryParams: {
            Paging: 100
        },
        contentType: "text",
        proxyUrl: "http://153.3.251.190:11399/"

    })
    .then(
        (data)=> {
            console.log(data);
        }
    )
    .catch((error)=> {
        console.log(error);
    });