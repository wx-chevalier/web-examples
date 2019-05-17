import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { set as setGlobalData,get as getGlobalData} from '../../../global_data'
import './index.scss'

export default class Index extends Component {

    config: Config = {
        navigationBarTitleText: '每日推荐'
    }
    constructor() {
        super(...arguments)
        this.state = {
            listData: ''
        }
    }

    componentDidMount() {
        Taro.request({
            url: 'http://134.175.224.127:7003/recommend/songs',
            header: {
                cookie: getGlobalData('_cookies')
            },
        }).then(res => {
            this.setState({ listData: res.data.recommend })
            Taro.hideNavigationBarLoading()
            Taro.hideLoading()
        })
    }

    toPlaying(e){
        const cp = this.state.listData[e.target.dataset.idx]
        setGlobalData('currentPlaying',{
            name:cp.name,
            img:cp.album.picUrl,
            id: cp.id,
            dt:cp.duration,
        })
        Taro.navigateTo({
            url:'/pages/music/playing/index'
        })
    }

    render() {
        const listData = this.state.listData
        return listData && (
            <View>
                <View class='day-main' style='background-image:url(../../../img/day.jpeg)'>
                    <View class='day'>
                        <View>
                            <Text class='iconfont icon-rili'></Text>
                            <Text class='day-data'>{new Date().getDate()}</Text>
                        </View>
                        <View class='day-info'>根据你的音乐口味生成,每天6:00更新</View>
                    </View>
                    <View class='list-top'>
                        <Text class='iconfont icon-bofang'></Text>
                        <Text>播放全部</Text>
                    </View>
                </View>
                <View onClick={this.toPlaying}>
                    {listData.map((item,index) => {
                        return (
                            <View key={item.id} class='m-list'>
                                <View><Image class='m-img' data-idx={index} src={item.album.picUrl} /></View>
                                <View class='m-arts'>
                                    <View class='m-name'>{item.name}</View>
                                    <View class='m-ars'>
                                        {item.artists.map((ar, idx) => {
                                            return (
                                                <Text key={ar.id}>{ar.name}{idx == item.artists.length - 1 ? '' : '/'}</Text>
                                            )
                                        })}
                                        -
                                        {
                                            item.album.name
                                        }
                                    </View>
                                </View>
                                <View>
                                    <Text class='iconfont icon-menu2'></Text>
                                </View>
                            </View>
                        )
                    })}
                </View>
            </View>
        )
    }
}