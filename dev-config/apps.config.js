/**
 * Created by apple on 16/6/8.
 */
module.exports = {
    apps: [
        {
            //required
            id: "index",//编号
            title: "Index",//HTML文件标题
            entry: {
                name: "index",//该应用的入口名
                src: "./src/index.js",//该应用对应的入口文件
            },//入口文件
            indexPage: "./src/index.html",//主页文件
            compiled: true//判斷當前是否加入编译,默认为true
        },
        {
            id: "helloworld",
            title: "HelloWorld",
            entry: {
                name: "helloworld",
                src: "./src/modules/helloworld/container/app.js"
            },
            indexPage: "./src/modules/helloworld/container/helloworld.html",
            compiled: true
        },
        {
            id: "todolist",
            title: "TodoList",
            compiled: false
        },
        {
            //required
            id: "counter",//编号
            title: "Counter",//HTML文件标题
            entry: {
                name: "counter",//该应用的入口名
                src: "./src/modules/counter/container/app.js",//该应用对应的入口文件
            },//入口文件
            indexPage: "./src/modules/counter/container/counter.html",//主页文件
            compiled: true//判斷當前是否加入编译,默认为true
        },
        {
            //required
            id: "form",//编号
            title: "Form",//HTML文件标题
            entry: {
                name: "form",//该应用的入口名
                src: "./src/modules/form/form.js"//该应用对应的入口文件
            },//入口文件
            indexPage: "./src/modules/form/form.html",//主页文件
            compiled: true//判斷當前是否加入编译,默认为true
        }
    ],

    //开发服务器配置
    devServer: {
        appEntrySrc: "./widgets/components/scalable/demo.js", //当前待调试的APP的编号
        port: 3000 //监听的Server端口
    }
};