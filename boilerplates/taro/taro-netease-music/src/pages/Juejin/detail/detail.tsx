import Taro,{ Component } from '@tarojs/taro'
import ParseComponent from './wxParseComponent'
import WxParse from '../../../components/wxParse/wxParse'

export default class JuejinDetail extends Component {
    constructor() {
        super(...arguments)
        this.state = {
            detail: '',
        }
    }
    componentWillMount() {
        Taro.showNavigationBarLoading()
    }

    fetchDate() {
        let self = this
        const article = '<div style="color: red">我是HTML代码</div>'
        
        Taro.request(
            {
                header: { 'content-type': 'application/xml' },
                url: 'https://post-storage-api-ms.juejin.im/v1/getDetailData?src=web&type=entryView&postId='+this.$router.params.id
            }).then(res => {
                // self.setState({ detail: res.data.d.content })
                WxParse.wxParse('article', 'html', res.data.d.content, this.$scope, 5)
                Taro.hideNavigationBarLoading()
            })
    }

    componentDidMount() {
        this.fetchDate()
    }

    render() {
        return (
            // <View>
            //     {<ParseComponent data={this.state.detail}/>}
            // </View>
            <View>
                <import src='../../../components/wxParse/wxParse.wxml' />
                <template is='wxParse' data='{{wxParseData:article.nodes}}'/>
            </View>
        )
    }
}