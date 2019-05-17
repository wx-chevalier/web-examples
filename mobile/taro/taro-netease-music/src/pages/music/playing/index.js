import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import { AtSlider } from 'taro-ui';
import { get as getGlobalData } from '../../../global_data'

import './index.scss';

export default class Index extends Component {

    constructor() {
        super(...arguments)
        this.state = {
            playing: '',
            isPlaying: true,
            playTime: 0,
            cpi: {},
            msP: [],
            togShow: true,
            playValue: 0,
            audioCtx:'',
            scTop:0
        }
    }

    componentDidMount() {
        let cp = getGlobalData('currentPlaying');
        if (cp) {
            let tt = Math.floor(cp.dt / 60000)
            cp.total = `0${tt}:${String(cp.dt - tt * 60000).substr(0, 2)}`
            cp.totalValue = cp.dt / 1000
            this.setState({ cpi: cp })
            Taro.setNavigationBarTitle({
                title: cp.name
            })
            Taro.request({ url: 'http://134.175.224.127:7003/song/url?id=' + cp.id }).then(res => {
                const audioCtx = Taro.createInnerAudioContext()
                audioCtx.autoplay = true
                audioCtx.loop = false
                audioCtx.src = res.data.data[0].url
                audioCtx.onPlay(() => {
                    console.log('开始播放')
                })
                audioCtx.onError((res) => {
                    console.log(res.errMsg)
                    console.log(res.errCode)
                })
                this.setState({ audioCtx: audioCtx })
            })
            console.log(1)
            console.log(2)
            Taro.request({ url: 'http://134.175.224.127:7003/lyric?id=' + cp.id }).then(res => {
                let ps = res.data.lrc.lyric
                let psAry = ps.split('\n')
                let temp
                let msP = psAry.map(item => {
                    item = item.split(']')
                    if (item[1]) {
                        temp = item[0].match(/\d{2}/g)
                        item[0] = temp[0] * 60 + Number(temp[1])
                    }
                    return item;
                })

                this.setState({ msP: msP })
            })
        }
        this.setPlay();
    };

    componentWillUnmount() {
        clearInterval(this.state.playing);
        this.state.audioCtx.destroy()
    }

    setPlay(index = 0) {
        let temp = setInterval(() => {
            let curId
            if(index>getGlobalData('currentPlaying').totalValue){
                clearInterval(this.state.playing);
                return;
            }
            ++index;
            this.state.msP.forEach((item,idx)=>{
                if(this.state.msP[idx-1]&&this.state.msP[idx+1]){
                    if(this.state.msP[idx-1][0]<=index && this.state.msP[idx+1][0]>=index){
                        curId = (idx-1)*60
                    }
                }
            })
            this.setState({ playTime: `0${Math.floor(index / 60)}:${index >= 60 ? index % 60 : (index < 10 ? '0' + index : index)}`, playValue: index ,
            scTop: curId})
        }, 1000);
        this.setState({ playing: temp })
    }

    togglePlay() {
        this.setState({ isPlaying: !this.state.isPlaying });
        if (this.state.isPlaying) {
            clearInterval(this.state.playing);
            this.state.audioCtx.pause()
        }
        else { 
            this.setPlay(this.state.playValue) 
            this.state.audioCtx.play()
        };
    }
    toggleShow() {
        this.setState({ togShow: !this.state.togShow })
    }
    toComment(){
        Taro.navigateTo({
            url:`/pages/music/comment/index?type=music&id=${getGlobalData('currentPlaying').id}`
        })
    }
    render() {
        return (
            <View class='play-main'>
                <View class='bg-img' style={`background-image:url(${this.state.cpi.img})`}></View>
                
                {this.state.togShow ?
                    <View onClick={this.toggleShow} class={this.state.isPlaying ? 'play-img-view' : 'play-img-view stop-anim'}>
                        <View class={this.state.isPlaying ? 'play-img-before' : 'play-img-before stop-anim'}>
                            <View class='play-cic'></View>
                            <View class='play-cic2'></View>
                            <View class='play-cic3'></View>
                        </View>
                        <Image class='play-img' src={this.state.cpi.img} />
                    </View>
                    : <View onClick={this.toggleShow} class='play-irc-view'>
                        <ScrollView class='play-irc' id='ircView' scroll-y='true' scroll-top={`${this.state.scTop}rpx`}>
                            <View style='height:400rpx'></View>
                            {this.state.msP.map((item, idx) => {
                                return (<View class={this.state.scTop==idx*60 ? 'play-light' : ''} key={idx}>{item[1]}</View>)
                            })}
                        </ScrollView>
                    </View>
                }

                <View class='icon-view'>
                    <Text class='iconfont icon-heart'></Text>
                    <Text class='iconfont icon-plus-download'></Text>
                    <Text class='iconfont icon-pinglun' onClick={this.toComment}></Text>
                    <Text class='iconfont icon-menu2'></Text>
                </View>

                <View class='play-slider-view'>
                    <View>{this.state.playTime}</View>
                    <View class='play-slider'><AtSlider activeColor='white' backgroundColor='gainsboro' min={0} value={this.state.playValue} blockSize={12} max={this.state.cpi.totalValue}></AtSlider></View>
                    <View>{this.state.cpi.total}</View>
                </View>
                <View class='icon-view'>
                    <Text class='iconfont icon-icon-1'></Text>
                    <Text class='iconfont icon-shangyishoushangyige'></Text>
                    {this.state.isPlaying ?
                        <Text class='iconfont icon-zanting' onClick={this.togglePlay}></Text> :
                        <Text class='iconfont icon-bofang' onClick={this.togglePlay}></Text>
                    }
                    <Text class='iconfont icon-xiayigexiayishou'></Text>
                    <Text class='iconfont icon-yinleliebiao'></Text>
                </View>
            </View>
        )
    }
}