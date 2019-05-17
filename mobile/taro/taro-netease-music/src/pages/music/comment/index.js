import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { get as getGlobalData } from '../../../global_data'

export default class Index extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            comments: [],
            nowDate: new Date(),
            listInfo:{},
        }
    }

    componentWillMount() {
        Taro.showNavigationBarLoading()
        Taro.showLoading({
            title: '加载中',
        })
    }

    componentDidMount() {
        Taro.request({
            url:`http://134.175.224.127:7003/comment/${this.$router.params.type}?id=${this.$router.params.id}`
        }).then(res=>{
            let cur = getGlobalData('currentList')
            this.setState({ comments: res.data,listInfo: cur })
            Taro.setNavigationBarTitle({
                title: `评论(${res.data.total})`
            })
            Taro.hideNavigationBarLoading()
            Taro.hideLoading()
        })
    }

    formatDate(val) {
        const now = this.state.nowDate;
        const diffTime = (now - val)
        const diffHours = Math.floor(diffTime / 3600000)
        if (diffHours > 24) {
            return new Date(val).toLocaleDateString()
        } if (diffHours > 0) {
            let temp = (new Date(val).getHours()+'').padStart(2,'0') + ':' + (new Date(val).getMinutes()+'').padStart(2,'0');
            return diffHours < 12 ? temp : '昨天' + temp
        } else if (Math.floor(diffTime / 60000) > 0) {
            return parseInt(diffTime / 60000) + '分钟前'
        }
    }

    render() {
        const dataHot = this.state.comments.hotComments
        const dataNew = this.state.comments.comments
        const listInfo = this.state.listInfo
        return (
            <View class='cmt-main'>

                <View class='info-main'>
                    <View><Image class='info-img' src={listInfo.img} /></View>
                    <View class='info-right'>
                        <View class='info-name'>{listInfo.name}</View>
                        by <Text class='info-username'>{listInfo.username}</Text>
                    </View>
                </View>
                <View class='cmt-type'>精彩评论</View>
                {dataHot && dataHot.map(item => {
                    return (
                        <View key={item.commentId} class='cmt-list'>
                            <View><Image src={item.user.avatarUrl} class='cmt-avator' /></View>
                            <View class='cmt-top'>
                                <View class='cmt-user'>
                                    <View class='cmt-user-time'>
                                        <Text>{item.user.nickname}</Text>
                                        <View class='cmt-time'>{this.formatDate(item.time)}</View>
                                    </View>
                                    <View class='cmt-like'>
                                        <Text>{item.likedCount}</Text>
                                        <Text class='iconfont icon-like'></Text>
                                    </View>
                                </View>
                                <View class='cmt-content'>{item.content}</View>
                            </View>
                        </View>
                    )
                })
                }
                <View class='cmt-type'>最新评论({dataNew.length})</View>
                {dataNew && dataNew.map(item => {
                    return (
                        <View key={item.commentId} class='cmt-list'>
                            <View><Image src={item.user.avatarUrl} class='cmt-avator' /></View>
                            <View class='cmt-top'>
                                <View class='cmt-user'>
                                    <View class='cmt-user-time'>
                                        <Text>{item.user.nickname}</Text>
                                        <View class='cmt-time'>{this.formatDate(item.time)}</View>
                                    </View>
                                    <View class='cmt-like'>
                                        <Text>{item.likedCount}</Text>
                                        <Text class='iconfont icon-like'></Text>
                                    </View>
                                </View>
                                <View class='cmt-content'>{item.content}</View>
                            </View>
                        </View>
                    )
                })
                }
            </View>
        )
    }
}