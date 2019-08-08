import Taro, { Component, Config } from '@tarojs/taro'
import { View, PickerView } from '@tarojs/components'
import { AtIcon, AtAvatar, AtSegmentedControl, AtSearchBar ,AtDivider} from 'taro-ui'
import './trending.scss'
export default class Trending extends Component {
    config: Config = {
        navigationBarTitleText: 'GitHub'
    }
    constructor() {
        super(...arguments)
        this.state = {
            data: [],
            language: '',
            since: 1,
            sort: 'stars',
            gitType: 'taro',
            list: '',
            idx:0,
            baseUrl: 'http://anly.leanapp.cn/api/github/trending/vue?since=weekly',
            temp: [
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/8121621?s=40&v=4',
                    'desc': '\ud83c\udf89 A magical vue admin http://panjiachen.github.io/vue-element-admin',
                    'link': 'https://github.com/PanJiaChen/vue-element-admin',
                    'owner': 'PanJiaChen',
                    'repo': 'vue-element-admin',
                    'stars': '23,082'
                },
                {
                    'avatar': 'https://avatars2.githubusercontent.com/u/10095631?s=40&v=4',
                    'desc': 'A Vue.js 2.0 UI Toolkit for Web',
                    'link': 'https://github.com/ElemeFE/element',
                    'owner': 'ElemeFE',
                    'repo': 'element',
                    'stars': '32,943'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/24296884?s=40&v=4',
                    'desc': '\u4f7f\u7528 Vue.js \u5f00\u53d1\u8de8\u5e73\u53f0\u5e94\u7528\u7684\u524d\u7aef\u6846\u67b6',
                    'link': 'https://github.com/dcloudio/uni-app',
                    'owner': 'dcloudio',
                    'repo': 'uni-app',
                    'stars': '932'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/20297227?s=40&v=4',
                    'desc': '\u57fa\u4e8e vue2 + vuex \u6784\u5efa\u4e00\u4e2a\u5177\u6709 45 \u4e2a\u9875\u9762\u7684\u5927\u578b\u5355\u9875\u9762\u5e94\u7528',
                    'link': 'https://github.com/bailicangdu/vue2-elm',
                    'owner': 'bailicangdu',
                    'repo': 'vue2-elm',
                    'stars': '23,753'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/5370542?s=40&v=4',
                    'desc': 'A high quality UI Toolkit built on Vue.js 2.0',
                    'link': 'https://github.com/iview/iview',
                    'owner': 'iview',
                    'repo': 'iview',
                    'stars': '18,561'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/20942571?s=40&v=4',
                    'desc': 'Vue 2.0 admin management system template based on iView',
                    'link': 'https://github.com/iview/iview-admin',
                    'owner': 'iview',
                    'repo': 'iview-admin',
                    'stars': '9,595'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/211899?s=40&v=4',
                    'desc': 'Vue Storefront - PWA for eCommerce. 100% offline, platform agnostic, headless, Magento 2 supported. Always Open Source, MIT license. Join us as contributor (contributors@vuestorefront.io).',
                    'link': 'https://github.com/DivanteLtd/vue-storefront',
                    'owner': 'DivanteLtd',
                    'repo': 'vue-storefront',
                    'stars': '3,556'
                },
                {
                    'avatar': 'https://avatars3.githubusercontent.com/u/6937879?s=40&v=4',
                    'desc': 'An enterprise-class UI components based on Ant Design and Vue. \ud83d\udc1c',
                    'link': 'https://github.com/vueComponent/ant-design-vue',
                    'owner': 'vueComponent',
                    'repo': 'ant-design-vue',
                    'stars': '3,093'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/7237365?s=40&v=4',
                    'desc': 'Lightweight Mobile UI Components built on Vue',
                    'link': 'https://github.com/youzan/vant',
                    'owner': 'youzan',
                    'repo': 'vant',
                    'stars': '6,681'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/12621342?s=40&v=4',
                    'desc': '\ud83d\ude80 A simple & beautiful tool for pictures uploading built by electron-vue',
                    'link': 'https://github.com/Molunerfinn/PicGo',
                    'owner': 'Molunerfinn',
                    'repo': 'PicGo',
                    'stars': '2,812'
                },
                {
                    'avatar': 'https://avatars3.githubusercontent.com/u/559179?s=40&v=4',
                    'desc': 'Mobile UI Components based on Vue & WeUI',
                    'link': 'https://github.com/airyland/vux',
                    'owner': 'airyland',
                    'repo': 'vux',
                    'stars': '14,590'
                },
                {
                    'avatar': 'https://avatars3.githubusercontent.com/u/17480987?s=40&v=4',
                    'desc': 'Is a pack of more than 480 beautiful open source Eva icons as Vue components',
                    'link': 'https://github.com/antonreshetov/vue-eva-icons',
                    'owner': 'antonreshetov',
                    'repo': 'vue-eva-icons',
                    'stars': '69'
                },
                {
                    'avatar': 'https://avatars2.githubusercontent.com/u/1472352?s=40&v=4',
                    'desc': '\u4e00\u523b\u793e\u533a\u524d\u7aef\u6e90\u7801',
                    'link': 'https://github.com/overtrue/yike.io',
                    'owner': 'overtrue',
                    'repo': 'yike.io',
                    'stars': '346'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/18370605?s=40&v=4',
                    'desc': 'Lightweight UI components for Vue.js based on Bulma',
                    'link': 'https://github.com/buefy/buefy',
                    'owner': 'buefy',
                    'repo': 'buefy',
                    'stars': '4,145'
                },
                {
                    'avatar': 'https://avatars1.githubusercontent.com/u/22343354?s=40&v=4',
                    'desc': 'Mysql web\u7aefsql\u5ba1\u6838\u5e73\u53f0',
                    'link': 'https://github.com/cookieY/Yearning',
                    'owner': 'cookieY',
                    'repo': 'Yearning',
                    'stars': '1,463'
                },
                {
                    'avatar': 'https://avatars3.githubusercontent.com/u/854406?s=40&v=4',
                    'desc': 'A simple region selector, provide Chinese administrative division data',
                    'link': 'https://github.com/TerryZ/v-region',
                    'owner': 'TerryZ',
                    'repo': 'v-region',
                    'stars': '369'
                },
                {
                    'avatar': 'https://avatars2.githubusercontent.com/u/1357885?s=40&v=4',
                    'desc': 'Material design for Vue.js',
                    'link': 'https://github.com/vuematerial/vue-material',
                    'owner': 'vuematerial',
                    'repo': 'vue-material',
                    'stars': '7,282'
                },
                {
                    'avatar': 'https://avatars3.githubusercontent.com/u/7221389?s=40&v=4',
                    'desc': '\ud83d\udcd6 Read Quran Anywhere, Directly from Your Browser, No Need Installing Apps Anymore.',
                    'link': 'https://github.com/mazipan/quran-offline',
                    'owner': 'mazipan',
                    'repo': 'quran-offline',
                    'stars': '36'
                },
                {
                    'avatar': 'https://avatars3.githubusercontent.com/u/22396965?s=40&v=4',
                    'desc': 'A Vue.js 2.0 slideshow component working with Three.js',
                    'link': 'https://github.com/AlbanCrepel/vue-displacement-slideshow',
                    'owner': 'AlbanCrepel',
                    'repo': 'vue-displacement-slideshow',
                    'stars': '39'
                },
                {
                    'avatar': 'https://avatars2.githubusercontent.com/u/26454305?s=40&v=4',
                    'desc': 'mavonEditor - A markdown editor based on Vue that supports a variety of personalized features',
                    'link': 'https://github.com/hinesboy/mavonEditor',
                    'owner': 'hinesboy',
                    'repo': 'mavonEditor',
                    'stars': '1,873'
                },
                {
                    'avatar': 'https://avatars3.githubusercontent.com/u/19411940?s=40&v=4',
                    'desc': '',
                    'link': 'https://github.com/ftdus/PyUI',
                    'owner': 'ftdus',
                    'repo': 'PyUI',
                    'stars': '46'
                },
                {
                    'avatar': 'https://avatars1.githubusercontent.com/u/29813435?s=40&v=4',
                    'desc': '\u7cbe\u81f4\u7684\u4e0b\u62c9\u5237\u65b0\u548c\u4e0a\u62c9\u52a0\u8f7d js\u6846\u67b6.\u652f\u6301vue,\u5b8c\u7f8e\u8fd0\u884c\u4e8e\u79fb\u52a8\u7aef\u548c\u4e3b\u6d41PC\u6d4f\u89c8\u5668 (JS framework for pull-refresh and pull-up-loading)',
                    'link': 'https://github.com/mescroll/mescroll',
                    'owner': 'mescroll',
                    'repo': 'mescroll',
                    'stars': '1,522'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/13193407?s=40&v=4',
                    'desc': '\ud83d\udcf1 \u4e00\u5957 Vue \u4ee3\u7801\uff0c\u4e24\u7aef\u539f\u751f\u5e94\u7528 \uff0c\u6216\u8bb8\u53ef\u4ee5\u53eb\u6211 weex-native\u3002',
                    'link': 'https://github.com/bmfe/eros',
                    'owner': 'bmfe',
                    'repo': 'eros',
                    'stars': '1,431'
                },
                {
                    'avatar': 'https://avatars1.githubusercontent.com/u/421233?s=40&v=4',
                    'desc': 'A collection of components that visualizes DaySpan Calendars and Schedules using Vuetify',
                    'link': 'https://github.com/ClickerMonkey/dayspan-vuetify',
                    'owner': 'ClickerMonkey',
                    'repo': 'dayspan-vuetify',
                    'stars': '314'
                },
                {
                    'avatar': 'https://avatars0.githubusercontent.com/u/3674348?s=40&v=4',
                    'desc': 'Vue.js admin dashboard',
                    'link': 'https://github.com/epicmaxco/vuestic-admin',
                    'owner': 'epicmaxco',
                    'repo': 'vuestic-admin',
                    'stars': '4,934'
                }
            ]

        }
    }
    componentDidMount() {
        // Taro.request({ url: this.state.baseUrl }).then(res => {
        //     console.log(res)
        // })
        this.fetchDate('');
    }

    onReachBottom() {
        this.state.idx <= 30 ? this.setState({idx:this.state.idx+6}) :'';
    }

    toLink(e) {
        // <web-view src="https://github.com/PanJiaChen/vue-element-admin"></web-view>
    }
    onChange(value) {
        this.setState({ language: value })
    }
    onActionClick() {
        this.fetchDate(this.state.language, this.state.sort)
    }
    choseSince(val) {
        let sort = 'stars'
        if (val === 0) {
            sort = 'match'
            this.setState({ since: 0 })
        } else if (val === 2) {
            sort = 'forks'
            this.setState({ since: 2 })
        } else {
            this.setState({ since: 1 })
        }
        this.fetchDate(this.state.language, sort)

    }
    fetchDate(language, sort = 'stars') {
        Taro.showLoading({
            title: '获取中...',
        })
        language = language || 'taro'
        let url = `https://api.github.com/search/repositories?q=${language}&sort=${sort}&order=desc`
        Taro.request({ url: url }).then(res => {
            this.setState({ list: res.data.items })
            Taro.hideLoading()
        })

    }
    render() {
        let list = this.state.list.slice(0,this.state.idx+6)
        return (
            <View onClick={this.toLink}>
                <AtSearchBar
                    actionName='搜一下'
                    value={this.state.language}
                    onChange={this.onChange.bind(this)}
                    onActionClick={this.onActionClick.bind(this)}
                />
                <AtSegmentedControl
                    values={['Match', 'Stars', 'Forks']}
                    onClick={this.choseSince.bind(this)}
                    current={this.state.since}
                />
                <View class="itemsView">
                    {list && list.map(item => {
                        return (
                            <View key={item.owner} class='items'>
                                {/* <Text>{item.link}</Text> */}
                                <View class='itemCont'>
                                    <View class='itemInfo'>
                                        <View>
                                            <Text data-link={item.link}>{item.name}</Text>
                                        </View>
                                        <Text class='itemDesc'>{item.description ? item.description.slice(0, 100)+'...' : ''}</Text>
                                    </View>
                                    <View class='itemOwner'>
                                        <Image src={item.owner.avatar_url} class='ownerImg'></Image>
                                        <Text class='owner'>{item.owner.login}</Text>
                                    </View>
                                </View>
                                <View class='itemStars'>
                                    <View>
                                        <Text class='iconfont icon-shezhi_tougao_edit'></Text>
                                        <Text>{item.language}</Text>
                                    </View>
                                    <View>
                                        <Text class='iconfont icon-star1'></Text>
                                        <Text>{item.stargazers_count}</Text>
                                    </View>
                                    <View>
                                        <Text class='iconfont icon-fork'></Text>
                                        <Text>{item.forks}</Text>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </View>
                {this.state.idx>=30 && <AtDivider content='没有更多了' />}
            </View>
        )
    }
}