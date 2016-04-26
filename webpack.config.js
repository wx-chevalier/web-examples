var path = require('path');
var webpack = require('webpack');

//PostCSS plugins
var autoprefixer = require('autoprefixer');

//webpack plugins
var ProvidePlugin = require('webpack/lib/ProvidePlugin');
var DefinePlugin = require('webpack/lib/DefinePlugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var WebpackMd5Hash = require('webpack-md5-hash');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var NODE_ENV = process.env.NODE_ENV || "develop";//获取命令行变量

//@region 可配置区域

//定义统一的Application，不同的单页面会作为不同的Application
/**
 * @function 开发状态下默认会把JS文本编译为main.bundle.js,然后使用根目录下dev.html作为调试文件.
 * @type {*[]}
 */
var apps = [
    {
        //required
        id: "index",//编号
        title: "Index",//HTML文件标题
        entry: {
            name: "index",//该应用的入口名
            src: "./src/index.js",//该应用对应的入口文件
        },//入口文件
        indexPage: "./src/index.html",//主页文件

        //optional
        dev: false,//判断是否当前正在调试,默认为false
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
        dev: true,
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

        //optional
        dev: false,//判断是否当前正在调试,默认为false
        compiled: true//判斷當前是否加入编译,默认为true
    },
];

//定义非直接引用依赖
//定义第三方直接用Script引入而不需要打包的类库
//使用方式即为var $ = require("jquery")
const externals = {
    jquery: "jQuery",
    pageResponse: 'pageResponse'
};


/*********************************************************/
/*********************************************************/
/*下面属于静态配置部分，修改请谨慎*/
/*********************************************************/
/*********************************************************/

//开发时的入口考虑到热加载，只用数组形式，即每次只会加载一个文件
var devEntry = [
    'eventsource-polyfill',
    'webpack-hot-middleware/client',
];

//生产环境下考虑到方便编译成不同的文件名，所以使用数组
var proEntry = {
    "vendors": "./src/vendors.js",//存放所有的公共文件
};

//定义HTML文件入口,默认的调试文件为src/index.html
var htmlPages = [];

//遍历定义好的app进行构造
apps.forEach(function (app) {

    //判断是否加入编译
    if (app.compiled === false) {
        //如果还未开发好,就设置为false
        return;
    }

    //添加入入口
    proEntry[app.entry.name] = app.entry.src;

    //构造HTML页面
    htmlPages.push({
        filename: app.entry.name + "/" + app.id + ".html",
        title: app.title,
        // favicon: path.join(__dirname, 'assets/images/favicon.ico'),
        template: 'underscore-template-loader!' + app.indexPage, //默认使用underscore
        inject: false, // 使用自动插入JS脚本,
        chunks: ["vendors", app.entry.name] //选定需要插入的chunk名
    });

    //判断是否为当前正在调试的
    if (app.dev === true) {
        //如果是当前正在调试的，则加入到devEntry
        devEntry.push(app.entry.src);
    }
});

//@endregion 可配置区域

//基本配置
var config = {
    devtool: 'source-map',
    //所有的出口文件，注意，所有的包括图片等本机被放置到了dist目录下，其他文件放置到static目录下
    output: {
        path: path.join(__dirname, 'dist'),//生成目录
        filename: '[name].bundle.js',//文件名
        sourceMapFilename: '[name].bundle.map'//映射名
        // chunkFilename: '[id].[chunkhash].chunk.js',//块文件索引
    },
    //配置插件
    plugins: [
        // new WebpackMd5Hash(),//计算Hash插件
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                //因为使用热加载，所以在开发状态下可能传入的环境变量为空
                'NODE_ENV': process.env.NODE_ENV === undefined ? JSON.stringify('develop') : JSON.stringify(NODE_ENV)
            },
            //判断当前是否处于开发状态
            __DEV__: process.env.NODE_ENV === undefined || process.env.NODE_ENV === "develop" ? JSON.stringify(true) : JSON.stringify(false)
        }),

        //提供者fetch Polyfill插件
        new webpack.ProvidePlugin({
            // 'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
        }),

        //提取出所有的CSS代码
        new ExtractTextPlugin('[name]/[name].css'),

        //自动分割Vendor代码
        new CommonsChunkPlugin({name: 'vendors', filename: 'vendors.bundle.js', minChunks: Infinity}),
    ],
    module: {
        loaders: [
            {test: /\.jsx$/, exclude: /(libs|node_modules)/, loader: 'babel'},
            {test: /\.js$/, exclude: /(libs|node_modules)/, loader: 'babel'},
            {test: /\.(png|jpg|ttf|woff|svg|eot)$/, loader: 'url-loader?limit=8192&name=assets/imgs/[hash].[ext]'},// inline base64 URLs for <=8k images, direct URLs for the rest
            {
                test: /\.(scss|sass|css)$/,
                loader: ExtractTextPlugin.extract('style-loader','css-loader!postcss-loader!sass')
            },
            {test: /\.vue$/, loader: 'vue'}
        ]
    },
    postcss: [autoprefixer({browsers: ['last 10 versions', "> 1%"]})],//使用postcss作为默认的CSS编译器
    resolve: {
        alias: {
            libs: path.resolve(__dirname, 'libs'),
            nm: path.resolve(__dirname, "node_modules"),
            assets: path.resolve(__dirname, "assets"),
        }
    }
};

//进行脚本组装
config.externals = externals;

//自动创建HTML代码
htmlPages.forEach(function (p) {
    config.plugins.push(new HtmlWebpackPlugin(p));
});

//为开发状态下添加插件
if (process.env.NODE_ENV === undefined || process.env.NODE_ENV === "develop") {

    //配置SourceMap
    config.devtool = 'cheap-module-eval-source-map';

    //设置入口为调试入口
    config.entry = devEntry;

    //設置公共目錄名
    config.output.publicPath = '/dist/'//公共目录名


    //添加插件
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NoErrorsPlugin());

} else {
    
    //如果是生产环境下
    config.entry = proEntry;

    //如果是生成环境下，将文件名加上hash
    config.output.filename = '[name]/[name].bundle.js.[hash:8]';

    //設置公共目錄名
    config.output.publicPath = '/'//公共目录名

    //添加代码压缩插件
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        }));

    //添加MD5计算插件
}

module.exports = config;
