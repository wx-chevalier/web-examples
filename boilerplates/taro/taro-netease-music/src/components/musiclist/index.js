import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components';
import { AtList, AtListItem,AtActionSheet,AtActionSheetItem } from "wTaro"
import './index.scss';
import { set as setGlobalData } from '../../global_data'

export default class MusicList extends Component {
    // toDetail(e) {
    //     Taro.navigateTo({ url: '/pages/MovieDetail/movieDetail?id=' + e.target.dataset.id });
    // }
    constructor() {
        super(...arguments)
        this.state = {
            isShowSheet: false,
            currentIndex:null,
            listData: ''
        }
    }
    config: Config = {
        navigationBarTitleText: '歌单'
    }
    componentWillMount() {
        Taro.showNavigationBarLoading()
        Taro.showLoading({
            title: '加载中',
        })
    }
    componentDidMount() {
        this.props.listId && Taro.request('http://134.175.224.127:7003/playlist/detail?id='+this.props.listId).then(res=>{
            this.setState({listData:res.data.playlist})
            setGlobalData('currentList',{
                img:res.data.playlist.coverImgUrl,
                name:res.data.playlist.name,
                username:res.data.playlist.creator.nickname,
            })
            Taro.hideNavigationBarLoading()
            Taro.hideLoading()
        })
    }

    handleClick(e) {
        console.log(e.currentTarget);
        if(e.target.dataset.index){
            this.setState({isShowSheet:true,currentIndex:e.target.dataset.index-1})
        }else if(e.currentTarget.dataset.midx){
            const cp = this.state.listData.tracks[e.currentTarget.dataset.midx]
            setGlobalData('currentPlaying',{
                name:cp.name,
                img:cp.al.picUrl,
                id: cp.id,
                dt:cp.dt,
            })
            Taro.navigateTo({
                url:'/pages/music/playing/index'
            })
        }
        
    }

    toComment(){
        Taro.navigateTo({
            url:`/pages/music/comment/index?type=playlist&id=${this.state.listData.id}`
        })
    }

    handleShare(){
        console.log('share')
    }

    render() {
        const data = this.state.listData
        const currentItem = data && data.tracks[this.state.currentIndex]
        return data && (
            <View class='music-list'>
                <View class='list-top-main'>
                    <View class='list-bgimg' style={'background-image:url(' + data.coverImgUrl + ')'}></View>
                    <View >
                        <View class='list-info'>
                            <View class='list-img-count'>
                                <Image src={data.coverImgUrl} class='list-img' />
                                <View class='list-count-view'>
                                    <Text class='iconfont icon-erji'></Text>
                                    <Text class='list-count'>{data.playCount >= 10000 ? data.playCount % 10000 + '万' : data.playCount}</Text>
                                </View>

                            </View>
                            <View class='list-user'>
                                <Text class='list-name'>{data.name}</Text>
                                <View class='list-user-info'>
                                    <Image src={data.creator.avatarUrl} class='list-avator' />
                                    <Text>{data.creator.nickname}</Text>
                                </View>
                            </View>
                        </View>
                        <View class='list-action'>
                            <View class='list-action-view' onClick={this.toComment}>
                                <Text class='iconfont icon-pinglun'></Text>
                                <View>{data.commentCount}</View>
                            </View>
                            <View class='list-action-view'>
                                <Text class='iconfont icon-share' onClick={this.handleShare}></Text>
                                <View>{data.shareCount}</View>
                            </View>
                            <View class='list-action-view'>
                                <Text class='iconfont icon-plus-download'></Text>
                                <View>下载</View>
                            </View>
                            <View class='list-action-view'>
                                <Text class='iconfont icon-pinglun'></Text>
                                <View>多选</View>
                            </View>
                        </View>
                    </View>

                    <View class='list-total-sub'>
                        <View class='list-total'>
                            <Text class='iconfont icon-play-circle'></Text>
                            <Text>播放全部(共{data.trackCount}首)</Text>
                        </View>
                        <View class='list-sub'>
                            <Text>收藏({data.subscribedCount})</Text>
                        </View>
                    </View>
                </View>

                <AtList>
                    {data.tracks && data.tracks.map((item, idx) => {
                        return (
                            <View onClick={this.handleClick}  data-midx={idx} key={item.id}>
                                <AtListItem title={item.name}  note={item.ar[0].name + '-' + item.al.name} arrow='list' iconInfo={{ value: (idx + 1), type: 'idx' }} />
                            </View>
                        )
                    }
                    )}
                </AtList>

                {this.state.isShowSheet && <AtActionSheet isOpened >
                    <AtActionSheetItem>
                        <Text class='iconfont icon-yinle'></Text>歌曲：{currentItem.name}
                    </AtActionSheetItem>
                    <AtActionSheetItem>
                        <Text class='iconfont icon-user'></Text>歌手：{currentItem.ar[0].name}
                    </AtActionSheetItem>
                    <AtActionSheetItem>
                    <Text class='iconfont icon-yinle'></Text>专辑：{currentItem.al.name}
                    </AtActionSheetItem>
                    <AtActionSheetItem>
                        <Text class='iconfont icon-pinglun'></Text>评论
                    </AtActionSheetItem>
                    <AtActionSheetItem>
                        <Text class='iconfont icon-plus-download'></Text>下载
                    </AtActionSheetItem>
                    <AtActionSheetItem>
                        <Text class='iconfont icon-share'></Text>分享
                    </AtActionSheetItem>
                    
                </AtActionSheet>
                }
            </View>
        )
    }
}