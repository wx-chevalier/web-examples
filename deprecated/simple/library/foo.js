/**
 * Created by apple on 16/7/23.
 */

/**
 * @function 基于ES6的服务类
 */
export class FooService {

    static echo(){

        const fooService = new FooService();

        return fooService.getMessage();
    }

    /**
     * @function 默认构造函数
     */
    constructor() {
        this.message = "This is Message From FooService!";
    }

    getMessage() {
        return this.message;
    }

}