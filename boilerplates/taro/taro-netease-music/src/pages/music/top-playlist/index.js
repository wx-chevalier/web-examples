import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,Image } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {

    config: Config = {
        navigationBarTitleText: '热门歌单'
    }
    constructor() {
        super(...arguments)
        this.state = {
            limit: 20,
            listData: [],
            su: {},
        }
    }
    componentDidMount() {
        Taro.request(`http://134.175.224.127:7003/top/playlist?limit=${this.state.limit}&order=hot`).then(res => {
            this.setState({ listData: res.data.playlists })
        })

        let su = {
            "playlists": [
                {
                    "name": "『小酒馆』剑与魔法 · 旅途中的休憩时光",
                    "id": 800496969,
                    "trackNumberUpdateTime": 1545707984891,
                    "status": 0,
                    "userId": 83659385,
                    "createTime": 1499340513937,
                    "updateTime": 1545574781569,
                    "subscribedCount": 187268,
                    "trackCount": 132,
                    "cloudTrackCount": 0,
                    "coverImgUrl": "http://p2.music.126.net/_maMFcRbjX5Pgy-jZTf6cg==/109951163674078407.jpg",
                    "coverImgId": 109951163674078400,
                    "description": "[]~(￣▽￣) つロ干杯！\n\n风雨之中一个满身泥泞的旅人走入酒馆，\n\n迎面而来的是喧闹的人群，永远臭着脸的酒馆老板。\n\n酒鬼们围坐在火炉旁，火光映着他们粗糙的手和朴实的面庞。\n\n烈酒入喉的同时，吟游诗人拿起鲁特琴开始弹唱，喧闹的碰杯声、吆喝声、欢笑声也变得宁静。\n\n“献给每一位离家的游人、荆棘路途中的求道者、远行于荒野之上的冒险家”\n\n～～～～～～～～～～～～～～\n\n歌单根据听感排序，大致分为三个部分。\n\n01 ~ 68 \n第一部分：有种刚进入小酒馆，喧闹的旅人们与酒馆欢快的气氛扑面而来的感觉。\n\n69 ~ 106\n第二部分：酒馆里的旅人们都喝醉了，就连碰杯声与欢笑声也变得宁静。\n\n107 ~ 132\n第三部分：吟游诗人拿起鲁特琴弹唱着他旅途中的所见所闻——勇者与巨龙的传说。\n\n～～～～～～～～～～～～～～\n\n大致使用的乐器：提琴、竖琴、风笛、鲁特琴等\n\n涉及风格：凯尔特、中世纪、北欧、民谣、船歌、琴歌\n\n封面出自《狼与香辛料》官方画集，未经允许禁止搬运哦。",
                    "tags": [
                        "民谣",
                        "游戏",
                        "ACG"
                    ],
                    "playCount": 4903372,
                    "trackUpdateTime": 1546483086892,
                    "specialType": 0,
                    "totalDuration": 0,
                    "creator": {
                        "defaultAvatar": false,
                        "province": 1000000,
                        "authStatus": 0,
                        "followed": false,
                        "avatarUrl": "http://p1.music.126.net/uC0efodc3QaFtsfhLzVokg==/109951163740722119.jpg",
                        "accountStatus": 0,
                        "gender": 0,
                        "city": 1010000,
                        "birthday": 873820800000,
                        "userId": 83659385,
                        "userType": 200,
                        "nickname": "花嫁赫萝",
                        "signature": "",
                        "description": "",
                        "detailDescription": "",
                        "avatarImgId": 109951163740722110,
                        "backgroundImgId": 109951163754470020,
                        "backgroundUrl": "http://p1.music.126.net/ylWtVig9mcNL26Mnw2BecQ==/109951163754470011.jpg",
                        "authority": 0,
                        "mutual": false,
                        "expertTags": [
                            "ACG",
                            "爵士",
                            "摇滚"
                        ],
                        "experts": null,
                        "djStatus": 10,
                        "vipType": 11,
                        "remarkName": null,
                        "backgroundImgIdStr": "109951163754470011",
                        "avatarImgIdStr": "109951163740722119",
                        "avatarImgId_str": "109951163740722119"
                    },
                    "tracks": null,
                    "subscribers": [
                        {
                            "defaultAvatar": false,
                            "province": 440000,
                            "authStatus": 0,
                            "followed": false,
                            "avatarUrl": "http://p1.music.126.net/FDwkUvEpc08-OgIDsHaXgQ==/109951163655508591.jpg",
                            "accountStatus": 0,
                            "gender": 0,
                            "city": 440100,
                            "birthday": 1540490606099,
                            "userId": 434347824,
                            "userType": 0,
                            "nickname": "CELFSSS",
                            "signature": "",
                            "description": "",
                            "detailDescription": "",
                            "avatarImgId": 109951163655508590,
                            "backgroundImgId": 109951162868128400,
                            "backgroundUrl": "http://p1.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg",
                            "authority": 0,
                            "mutual": false,
                            "expertTags": null,
                            "experts": null,
                            "djStatus": 0,
                            "vipType": 0,
                            "remarkName": null,
                            "backgroundImgIdStr": "109951162868128395",
                            "avatarImgIdStr": "109951163655508591",
                            "avatarImgId_str": "109951163655508591"
                        }
                    ],
                    "subscribed": false,
                    "commentThreadId": "A_PL_0_800496969",
                    "newImported": false,
                    "adType": 0,
                    "highQuality": true,
                    "privacy": 0,
                    "ordered": true,
                    "anonimous": false,
                    "shareCount": 1992,
                    "coverImgId_str": "109951163674078407",
                    "commentCount": 1758,
                    "copywriter": "献给每一位离家的游人、荆棘路途中的求道者、远行于荒野之上的冒险家。",
                    "tag": "ACG"
                }
            ],
            "code": 200,
            "more": true,
            "lasttime": 1511099724503,
            "total": 263
        }
        this.setState({ su:su })
    }
    toListPage(e){
        Taro.navigateTo({url:'../music-playlist/music-playlist?id='+e.target.dataset.id})
    }
    toHighquality(){
        Taro.navigateTo({url:'../highquality-playlist/index'})
    }
    render() {
        const listData = this.state.listData
        const suData = this.state.su.playlists && this.state.su.playlists[0]
        return (
            <View>
                <View class='m-top'>
                    <View class='bg-img' style={`background-image:url(${suData.coverImgUrl})`}></View>
                    <View><Image class='su-img' src={suData.coverImgUrl} onClick={this.toHighquality}></Image></View>
                    <View>
                        <View>
                            <Text>👑</Text>
                            <Text>精品歌单</Text>
                        </View>
                        <View class='su-name'>{suData.name}</View>
                        <View class='su-cpwrite'>{suData.copywriter}</View>
                    </View>
                </View>
            
            <View class='m-main'>
                {listData && listData.map(item => {
                    return (
                        <View class='m-cont' key={item.id}>
                            <View class='m-item' style={`background-image:url(${item.coverImgUrl})`} data-id={item.id} onClick={this.toListPage}>
                                <View class='m-playcount'>
                                    <Text class='iconfont icon-erji'></Text>
                                    <Text>{item.playCount>=100000?parseInt(item.playCount/10000)+'万':item.playCount}</Text>
                                </View>
                                <View class='m-username'>
                                    <Text class='iconfont icon-user'></Text>
                                    <Text>{item.creator.nickname}</Text>
                                </View>
                            </View>
                            <View class='m-name'>{item.name}</View>
                        </View>
                    )

                })}
            </View>
            </View>
        )
    }
}