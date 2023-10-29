import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtList, AtListItem, AtSearchBar } from 'wTaro'
import {set as setGlobalData} from 'globaData'
import './index.scss'


export default class Index extends Component {

    config: Config = {
        navigationBarTitleText: '搜索'
    }
    constructor() {
        super(...arguments)
        this.state = {
            musics: [],
            hots: Array,
            queryValue: '',
            hotShow: true,
        }
    }

    componentDidMount() {
        Taro.request({
            url: `http://134.175.224.127:7003/search/hot`,
        }).then(res => {
            this.setState({ hots: res.data.result.hots })
        })
    }

    onQueryChange(e) {
        this.setState({ queryValue: e })
    }

    onActionClick() {
        this.setState({ hotShow: false })
        Taro.request({
            url: `http://134.175.224.127:7003/search?keywords=${this.state.queryValue}&limit=10`,
        }).then(res => {
            this.setState({ musics: res.data.result.songs })
        })
    }

    handlemClick(e) {
        if(e.target.dataset.id){
            Taro.request({
                url: `http://134.175.224.127:7003/song/detail?ids=${e.target.dataset.id}`,
            }).then(res => {
                let data = res.data.songs[0]
                setGlobalData('currentPlaying',{
                    name:data.name,
                    img:data.al.picUrl,
                    id: data.id,
                    dt:data.dt,
                })
                Taro.navigateTo({
                    url:'/pages/music/playing/index'
                })
            })
        }
    }
    render() {
        const musics = this.state.musics
        const hots = this.state.hots
        return (
            <View>
                <AtSearchBar
                  actionName='搜一下'
                  value={this.state.queryValue}
                  onChange={this.onQueryChange.bind(this)}
                  onActionClick={this.onActionClick}
                />
                {this.state.hotShow ? <View class='hots'>
                    {hots.map(item => {
                        return (
                            <Text key={item.first} data-key={item.first}>{item.first}</Text>
                        )
                    })}
                </View> : ''}
                <AtList >
                    <View onClick={this.handlemClick}>
                        {musics && musics.map((item, idx) => {
                            return (
                                <AtListItem data-id={item.id} key={idx} title={item.name}
                                  note={item.artists[0].name + '-' + item.album.name}
                                  arrow='list'
                                  iconInfo={{ value: idx, type: 'menu' }}
                                />
                            )
                        }
                        )}
                    </View>
                </AtList>
            </View>
        )
    }
}