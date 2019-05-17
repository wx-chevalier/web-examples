import 'babel-polyfill'
import Vue from 'vue'
import Router from 'vue-router'
/* cms */
const Index = () => import ('page/cms/index')
const Article = () =>   import ('page/cms/article')
const ArticleDetail = () => import ('page/cms/articleDetail')
    /* cms */

/* member */
const Login = () => import ('page/member/login')
const Myhome = () =>    import ('page/member/myhome')
const Register = () =>  import ('page/member/register')
const Forget = () =>    import ('page/member/forget')
const Sttings = () =>   import ('page/member/sttings')
const AddressList = () =>   import ('page/member/addressList')
const Address = () =>   import ('page/member/address')
    /* member */

/* shop */
const Cart = () =>  import ('page/shop/cart')
const Category = () =>  import ('page/shop/category')
const Order = () => import ('page/shop/order')
const OrderList = () => import ('page/shop/orderList')
const Product = () =>   import ('page/shop/product')
const SearchRusult = () =>  import ('page/shop/searchRusult')
const Shop = () =>  import ('page/shop/shop')
const CreateOrder = () =>   import ('page/shop/createOrder')
const Review = () =>    import ('page/shop/review')
    /* shop */

const appRouter = {
        // mode: 'history',
        routes: [{
                path: '',
                redirect: '/index'
            },
            {
                path: '/index',
                name: 'index',
                component: Index,
                meta: { keepAlive: true }
            },
            {
                path: '/article',
                name: 'article',
                component: Article,
                meta: { keepAlive: true }
            },
            {
                path: '/articleDetail/:Id',
                name: 'articleDetail',
                component: ArticleDetail,
                meta: { KeepAlive: false }
            },
            {
                path: '/login',
                name: 'login',
                component: Login,
                meta: { keepAlive: false }
            },
            {
                path: '/myhome',
                name: 'myhome',
                component: Myhome,
                meta: { keepAlive: false }
            },
            {
                path: '/register',
                name: 'register',
                component: Register,
                meta: { keepAlive: false }
            },
            {
                path: '/forget',
                name: 'forget',
                component: Forget,
                meta: { keepAlive: false }
            },
            {
                path: '/cart',
                name: 'cart',
                component: Cart,
                meta: { keepAlive: false }
            },
            {
                path: '/category',
                name: 'category',
                component: Category,
                meta: { keepAlive: true }
            },
            {
                path: '/review/:OrderNo',
                name: 'review',
                component: Review,
                meta: { keepAlive: false }
            },
            {
                path: '/order',
                name: 'order',
                component: Order,
                meta: { keepAlive: false }
            },
            {
                path: '/createOrder',
                name: 'createOrder',
                component: CreateOrder,
                meta: { keepAlive: false }
            },
            {
                path: '/orderList/:tab?',
                name: 'orderList',
                component: OrderList,
                meta: { keepAlive: false }
            },
            {
                path: '/product/:id',
                name: 'product',
                component: Product,
                meta: { keepAlive: false }
            },
            {
                path: '/searchRusult',
                name: 'searchRusult',
                component: SearchRusult,
                meta: { keepAlive: false }
            },
            {
                path: '/shop',
                name: 'shop',
                component: Shop,
                meta: { keepAlive: false }
            },
            {
                path: '/sttings',
                name: 'sttings',
                component: Sttings,
                meta: { keepAlive: false }
            },
            {
                path: '/addressList',
                name: 'addresslist',
                component: AddressList,
                meta: { keepAlive: true }
            },
            {
                path: '/address/:Id?',
                name: 'address',
                component: Address,
                meta: { keepAlive: false }
            }
        ]
    }
    // import example from '@/router/example'
    // example.map(i=>{appRouter.routes.push(i)}) // 部署线上记得吧这行代码注释掉

Vue.use(Router)


export default new Router(appRouter);