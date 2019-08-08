import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { HotMovie } from './child/HotMovie'
import { CanWatch } from './child/CanWatch'
import { New } from './child/New'
import './index.scss'

export default class Index extends Component {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '电影首页'
  }
  constructor() {
    super(...arguments)
    this.state = {
      hotMovie: [],
      types:['经典','冷门佳片','豆瓣高分','动作','喜剧','爱情','悬疑','恐怖','科幻','治愈','文艺','成长','动画','华语','欧美','韩国','日本','其他']
    }
  }

  componentDidMount() {
    // Taro.request({url:'https://m.douban.com/app_topic/movie_free_stream'}).then(res=>{
    //   console.log(res)
    // })
  }

  whichType(e){
    console.log(e)
    Taro.navigateTo({url:'/pages/MovieType/MovieType?tag='+e.target.dataset.type+'&type=tags'})
  }
  render() {
    return (
      <View>
        <View id='index'>
          <View class='userInfo'>
            <View class='userTitle'>
              <open-data type='userAvatarUrl' lang='zh_CN'></open-data>
            </View>
            <View>
              <open-data type='userNickName' lang='zh_CN'></open-data>
            </View>
          </View>
          <View class='mainView'>
            <View class='titleView'>
              <Text>影院热映</Text>
              <Navigator url='/pages/MovieType/MovieType?type=hot&tag=影院热映'>更多</Navigator>
            </View>
            <HotMovie></HotMovie>
          </View>

          <View class='mainView'>
            <View class='titleView'>
              <Text>免费在线观看</Text>
              {/* <Navigator url='#'>更多</Navigator> */}
            </View>
            <CanWatch></CanWatch>
          </View>

          <View class='mainView'>
            <View class='titleView'>
              <Text>新片速递</Text>
              {/* <Navigator url='#'>更多</Navigator> */}
            </View>
            <New></New>
          </View>

          <View class='mainView'>
            <View class='titleView'>
              <Text>分类预览</Text>
            </View>
            <View onClick={this.whichType}>
              {this.state.types.map(item=>{
                return (
                  <View  data-type={item} class='typeItem' key={item}>
                    <Text  data-type={item}>{item}</Text>
                    {<Text class='iconfont icon-you-right-a'></Text>}
                  </View>
                )
              })}
            </View>
          </View>
        </View>
      </View >
    )
  }
}

