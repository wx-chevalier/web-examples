/**
 * Created by apple on 16/7/21.
 */

import Model from "./model";

const model = new Model();

model
    .getWithQueryParams({
        BASE_URL: "http://ggzy.njzwfw.gov.cn/njggzy/jsgc/",
        path: "001001/001001001/001001001001/",
        queryParams: {
            Paging:100
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