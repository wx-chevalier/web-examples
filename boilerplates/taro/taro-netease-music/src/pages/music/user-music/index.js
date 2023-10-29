import Taro, { Component } from '@tarojs/taro'
import { View, Text, Image,ScrollView } from '@tarojs/components'
import { get as getGlobalData, set as setGlobalData } from '../../../global_data'
import { AtInput, AtForm,AtList, AtListItem, } from "../../../components/taro-ui/dist/weapp/index"

import './index.scss'

export default class Index extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            userData: '',
            curNav: 'music',
            phone: '',
            password: '',
            events: [],
            follower:[],
            followed:[],
        }
    }

    componentWillMount() {
        // Taro.showNavigationBarLoading()
        // Taro.showLoading({
        //     title: '加载中',
        // })
    }

    componentDidMount() {
        this.showPanl(getGlobalData('_cookies'));//getGlobalData('_cookies')
    }

    changeTab(e) {
        console.log(getGlobalData('_userData'));
        if(e.target.dataset.nav==='active'){
            this.state.events.length==0 ? Taro.request({
                // url:'https://www.easy-mock.com/mock/5bda694acd0e9e45c2074584/event',
                url:'http://134.175.224.127:7003/user/event?uid=' + getGlobalData('_userData').profile.userId
                }).then(res => {
                this.setState({ events: res.data.events,curNav: e.target.dataset.nav })
            }):this.setState({ curNav: e.target.dataset.nav })
        }else if(e.target.dataset.nav==='followed'){
            this.state.followed.length==0 ? Taro.request({
                url:'http://134.175.224.127:7003/user/follows?uid=' + getGlobalData('_userData').profile.userId
                }).then(res => {
                this.setState({ followed: res.data.follow,curNav: e.target.dataset.nav })
            }):this.setState({ curNav: e.target.dataset.nav })
        }else if(e.target.dataset.nav==='follower'){
            this.state.follower.length==0 ? Taro.request({
                url:'http://134.175.224.127:7003/user/followeds?uid=' + getGlobalData('_userData').profile.userId
                }).then(res => {
                this.setState({ follower: res.data.followeds,curNav: e.target.dataset.nav })
            }):this.setState({ curNav: e.target.dataset.nav })
        }else{
            this.setState({ curNav: e.target.dataset.nav })
        }
    }

    showPanl(cookies) {
        if (cookies) {
            Taro.request({
                // url: 'https://www.easy-mock.com/mock/5bda694acd0e9e45c2074584/user/datail',
                url:`http://134.175.224.127:7003/user/detail?uid=${getGlobalData('_userData').account.id}`,
                header: {
                    cookie: cookies,
                },
            }).then(res => {
                this.setState({ userData: res.data })
                setGlobalData('_userData', res.data)
                Taro.hideNavigationBarLoading()
                Taro.hideLoading()
            })
        }
    }

    toListPage(e) {
        Taro.navigateTo({ url: '../music-playlist/music-playlist?id=' + e.target.dataset.id })
    }
    handleChange(type, e) {
        type == 'phone' ? this.setState({ 'phone': e }) : this.setState({ 'password': e })
    }

    login() {
        Taro.showLoading({
            title: '登陆中',
        })
        Taro.request({
            url: `http://134.175.224.127:7003/login/cellphone?phone=${this.state.phone}&password=${this.state.password}`
        }).then(res => {
            if (res.data.code == 200) {
                setGlobalData('_cookies', res.header['set-cookie'])
                setGlobalData('_userData', res.data)
                this.showPanl(res.header['set-cookie']);
                Taro.hideLoading();
                Taro.showToast({
                    title: '登陆成功',
                    icon: 'success',
                    duration: 1000
                  })
            } else {
                Taro.showToast({
                    title: '登陆失败',
                    icon: 'error',
                    duration: 1000
                  })
            }

        })
    }

    aboutMe(e){
        console.log(e);
        // Taro.navigateTo({ url: '' +  })
    }

    render() {
        const userData = this.state.userData
        let followed = this.state.followed
        let follower = this.state.follower
        return userData ? (
            <View class='user-main' style={`background-image:url(${userData.profile.backgroundUrl});`}>
                <View class='user-info'>
                    <View><Image class='user-avator' src={userData.profile.avatarUrl} /></View>
                    <View class='user-info-item'>
                        <Text class='user-name'>{userData.profile.nickname}</Text>

                        <Text class='user-level'>Lv.{userData.level}</Text>
                    </View>
                    <View class='user-info-item'>{userData.profile.signature}</View>
                    <View class='user-info-item'>
                        <Text>关注 {userData.profile.follows}</Text>
                        <Text class='user-shu'>|</Text>
                        <Text>粉丝 {userData.profile.followeds}</Text>
                    </View>
                </View>

                <View class='user-music'>
                    <View class='user-nav' onClick={this.changeTab}>
                        <Text data-nav='followed' class={`${this.state.curNav == 'followed' ? 'active' : ''}`}>关注</Text>
                        <Text data-nav='follower' class={`${this.state.curNav == 'follower' ? 'active' : ''}`}>粉丝</Text>
                        <Text data-nav='active' class={`${this.state.curNav == 'active' ? 'active' : ''}`}>动态 {userData.profile.eventCount}</Text>
                        <Text data-nav='about' class={`${this.state.curNav == 'about' ? 'active' : ''}`}>关于我</Text>
                    </View>
                    <ScrollView scrollIntoView={this.state.curNav} scroll-x scroll-with-animation  class='user-scroll-view'>
                        <View id='followed'>
                            <AtList>
                                {followed && followed.map(item=>{
                                return( <View key={item.userId}>
                                        <AtListItem title={item.nickname} thumb={item.avatarUrl} note={item.signature} arrow='list' />
                                    </View>
                                    )
                                })}
                            </AtList>
                        </View>
                        <View id='follower'>
                            <AtList>
                                {follower && follower.map(item=>{
                                return( <View key={item.userId}>
                                        <AtListItem title={item.nickname} thumb={item.avatarUrl} note={item.signature} arrow='list' />
                                    </View>
                                    )
                                })}
                            </AtList>
                        </View>
                        {/* 动态 */}
                        <View id='active'>
                            {this.state.events && this.state.events.map(item=>{
                                return (
                                    <View key={item.id} class='e-main'>
                                        <View><Image class='e-user' src={item.user.avatarUrl} /></View>
                                        <View class='e-info'>
                                            <View class='e-nickname'>{item.user.nickname}</View>
                                            <View class='e-date'>{new Date(item.showTime).toLocaleDateString()}</View>
                                            <Text class='e-title'>{item.info.commentThread.resourceTitle}</Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </View>
                        {/* 动态 */}

                        {/* 关于我 */}
                            <View id='about' onClick={this.aboutMe}>
                                <View data-mynav='msg'>
                                    <Text class='iconfont icon-mail'></Text>
                                    <Text >我的消息</Text>
                                </View>
                                <View>
                                    <Text class='iconfont icon-user'></Text>
                                    <Text >我的好友</Text>
                                </View>
                            </View>
                        {/* 关于我 */}
                        
                    </ScrollView>
                </View>

            </View>
        ) : (
                <View class='log-form'>
                    <Image class='bg-img' src='../../../img/login.jpeg' />
                    <View class='log'>
                        <Text class='iconfont icon-erji'></Text>
                    </View>
                    <AtForm>
                        <AtInput
                          name='phone'
                          title='手机号'
                          type='number'
                          placeholder='手机号'
                          value={this.state.phone}
                          onChange={this.handleChange.bind(this, 'phone')}
                        />

                        <AtInput
                          name='password'
                          title='密码'
                          type='password'
                          placeholder='密码'
                          value={this.state.password}
                          onChange={this.handleChange.bind(this, 'password')}
                        />
                    </AtForm>
                    <View class='login-btn' onClick={this.login}>登陆</View>
                </View>
            )
    }
}