/**
 * Created by apple on 16/7/23.
 */
import {FooService} from "./foo";

/**
 * @function 配置需要暴露的API
 * @type {{foo: {echo: FooService.echo}}}
 */
module.exports = {

    foo: {
        echo: FooService.echo
    }

};