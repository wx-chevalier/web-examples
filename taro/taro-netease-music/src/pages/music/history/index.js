import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text,ScrollView } from '@tarojs/components'

import { AtList, AtListItem, } from "wTaro"
import './index.scss'

export default class Index extends Component {

    config: Config = {
        navigationBarTitleText: '歌单详情'
    }
    constructor() {
        super(...arguments)
        this.state = {
            curNav:'followed',
            musics:[],
        }
    }
    componentDidMount(){
        Taro.request({
            url:'http://134.175.224.127:7003/user/record?uid=111736605&type=1',
        }).then(res=>{
            this.setState({musics:res.data.weekData})
        })

    }
    changeTab(e) {
        this.setState({curNav: e.target.dataset.nav});
    }
    // handleScroll(event){
    //     console.log(event.detail.scrollLeft,event.detail.scrollWidth/3);
    //     if(event.detail.scrollLeft<=event.detail.scrollWidth/3){
    //         this.setState({curNav:'followed'})
    //     }else if( event.detail.scrollLeft>=event.detail.scrollWidth/3){
    //         this.setState({curNav:'follower'})
    //     }
    // }
    render(){
        let musics = this.state.musics;
        return (
            <View>
                <View class='user-nav' onClick={this.changeTab}>
                    <Text data-nav='musics' class={`${this.state.curNav == 'musics' ? 'active' : ''}`}>音乐</Text>
                    <Text data-nav='follower' class={`${this.state.curNav == 'follower' ? 'active' : ''}`}>粉丝</Text>
                </View>
                <ScrollView 
                  scrollIntoView={this.state.curNav} 
                //   onScroll={this.handleScroll}
                  scroll-x scroll-with-animation  class='user-scroll-view'
                >
                    <View id='followed'>
                        <AtList>
                            {musics && musics.map((item, idx) => {
                                return (
                                    <View  data-midx={idx} key={item.song.id}>
                                        <AtListItem title={item.song.name}  note={item.song.ar[0].name + '-' + item.song.al.name} arrow='list' iconInfo={{ value: (idx + 1), type: 'idx' }} />
                                    </View>
                                )
                            }
                            )}
                        </AtList>
                    </View>
                    <View id='follower'>
                        
                    </View>
                </ScrollView>
            </View>
        )
    }
}