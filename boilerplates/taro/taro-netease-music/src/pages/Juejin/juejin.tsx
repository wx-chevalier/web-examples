import Taro,{  Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtDivider } from 'taro-ui'
import './juejin.scss'
export default class MovieType extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            lists: [],
        }
    }

    componentWillMount() {
        Taro.showNavigationBarLoading()
    }

    onReachBottom() {
        Taro.showLoading({
            title: '加载中',
          })
        this.fetchDate();
    }

    fetchDate(selfUrl) {
        let self = this;
        Taro.request(
            {
                header: { 'content-type': 'application/xml' },
                url: 'https://timeline-merger-ms.juejin.im/v1/get_entry_by_rank?src=web&category=5562b415e4b00c57d9b94ac8&limit=20'
            }).then(res => {
                let tempTags,objectId;
                let list = res.data.d.entrylist.map(item=>{
                        tempTags= (item.tags[0]?item.tags[0].title:'' + item.tags[1]?'/'+item.tags[1].title:'')
                        objectId = item.original?item.originalUrl.slice(item.originalUrl.indexOf('post')+5):item.objectId
                        return {
                            commentsCount:item.commentsCount,
                            title:item.title,
                            collectionCount:item.collectionCount,
                            viewsCount:item.viewsCount,
                            originalUrl:item.originalUrl,
                            createdAt:item.createdAt.slice(0,10),
                            username: item.user.username,
                            objectId: objectId,
                            tags: tempTags,
                        }
                    })
                this.setState({lists:list})
                Taro.hideNavigationBarLoading()
                Taro.hideLoading()
            })
    }
    
    componentDidMount() {
        this.fetchDate()
    }

    toDetail(e){
        console.log(e);
        
        // Taro.request(
        //     {
        //         header: { 'content-type': 'application/xml' },
        //         url: 'https://post-storage-api-ms.juejin.im/v1/getDetailData?src=web&type=entryView&postId=5c11bf145188252704368b98'
        //     }).then(res => {
        //         console.log(res.data.d.content);
        //     })
        
    }

    render() {
        return (
            <View>
                <View id='movieType'>
                {this.state.lists.map(item=>{
                    return (
                        <Navigator key={item.objectId} url={'detail/detail?id='+item.objectId}>
                            <View class="post-info">
                                <Text>{item.username}</Text>
                                <Text class="post-create">{item.createdAt}</Text>
                                <Text>{item.tags}</Text>
                            </View>
                            <View class="post-title">
                                <Text>{item.title}</Text>
                            </View>
                            <View class="post-icons">
                                <Text class="iconfont icon-like">{item.collectionCount}</Text>
                                <Text class="iconfont icon-pinglun center-icon">{item.commentsCount}</Text>
                                <Text class="iconfont icon-yanjing">{item.viewsCount}</Text>
                            </View>
                            <AtDivider height="36"></AtDivider>
                        </Navigator>
                    )
                })
                }
                </View>
            </View >
        )
    }
}

