import Http from '@/utils/axios';

//member
export const login = (params) => new Http().require({api: '/api/member/Login',param:params}); //登录

export const getUserInfo = (params) => new Http().require({api: '/api/member/GetUserInfo',param:params}); //获取个人信息

export const sendPhoneMessage = (params) => new Http().require({api: '/api/member/SendPhoneMessage',param: params}); //获取短信验证码

export const registered = (params) => new Http().require({api: '/api/member/Registered',param: params}); //注册账号

export const editUserInfo = (params) => new Http().require({api: '/api/member/EditUserInfo',param: params}); //编辑用户信息

export const setPassword = (params) => new Http().require({api: '/api/member/SetPassword',param: params}); //设置密码

export const saveAddress = (params) => new Http().require({api: '/api/member/SaveAddress',param: params}); //新建地址

export const getAddressList = (params) => new Http().require({api: '/api/member/GetAddressList',param: params}); //获取地址信息

export const getAddress = (params) => new Http().require({api: '/api/member/GetAddress',param: params}); //获取地址详细信息

export const getDefaultAddress = (params) => new Http().require({api: '/api/member/GetDefaultAddress',param: params}); //获取默认地址信息

export const removeAddress = (params) => new Http().require({api: '/api/member/RemoveAddress',param: params}); //删除地址

export const payByWallet = (params) => new Http().require({api: '/api/member/PayByWallet',param: params}); //余额支付

export const shopFavorite = (params) => new Http().require({api: '/api/member/ShopFavorite',param: params}); //收藏店铺

export const getMyShopFavorite = (params) => new Http().require({api: '/api/member/GetMyShopFavorite',param: params}); //获取我收藏的店铺


//shop
export const getCategoryList = (params) => new Http().require({api: '/api/shop/GetCategoryList',param:params}); //获取分类列表

export const getSelectedProductList = (params) => new Http().require({api: '/api/shop/GetSelectedProductList',param:params}); //获取购物车列表

export const searchGoods = (params) => new Http().require({api: '/api/shop/SearchGoods',param:params}); //获取购物车列表

export const getProduct = (params) => new Http().require({api: '/api/shop/GetProduct',param:params}); //获取购物车列表

export const getProductList = (params) => new Http().require({api: '/api/shop/GetProductList',param: params}); //获取

export const selectProduct = (params) => new Http().require({api: '/api/shop/SelectProduct',param: params}); //获取

export const removeSelectedProduct = (params) => new Http().require({api: '/api/shop/RemoveSelectedProduct',param: params}); //获取

export const confirmSelectProduct = (params) => new Http().require({api: '/api/shop/ConfirmSelectProduct',param: params}); //获取

export const getConfirmSelectedProductList = (params) => new Http().require({api: '/api/shop/GetConfirmSelectedProductList',param: params}); //获取

export const createOrder = (params) => new Http().require({api: '/api/shop/CreateOrder',param: params}); //获取

export const finishOrder = (params) => new Http().require({api: '/api/shop/FinishOrder',param: params}); //确认收货

export const cancelOrder = (params) => new Http().require({api: '/api/shop/CancelOrder',param: params}); //取消订单

export const getOrderList = (params) => new Http().require({api: '/api/shop/GetOrderList',param: params}); //获取

export const getOrder = (params) => new Http().require({api: '/api/shop/GetOrder',param: params}); //获取

export const getShopInfo = (params) => new Http().require({api: '/api/shop/GetShopInfo',param: params}); //获取

export const getCommentList = (params) => new Http().require({api: '/api/shop/GetCommentList',param: params}); //获取

export const commitMessage = (params) => new Http().require({api: '/api/shop/CommitMessage',param: params}); //获取




//cms
export const getArticle = (params) => new Http().require({api: '/api/cms/GetArticle',param:params}); //获取文章信息

export const getArticleList = (params) => new Http().require({api: '/api/cms/GetArticleList',param:params}); //获取文章列表

export const getGoodsCategoryList = (params) => new Http().require({api: '/api/cms/GetGoodsCategoryList',param:params}); //获取咨询分类列表

export const getGoodsCategory = (params) => new Http().require({api: '/api/cms/GetGoodsCategory',param:params}); //获取咨询分类信息

export const getRecommend = (params) => new Http().require({api: '/api/cms/GetRecommend',param:params}); //获取咨询分类信息

export const getIndexCmsData = (params) => new Http().require({api: '/api/cms/GetIndexCmsData',param:params}); //获取首页的全部资讯

export const getShop = (params) => new Http().require({api: '/system/GetShop',param:params}); //获取购物车列表


