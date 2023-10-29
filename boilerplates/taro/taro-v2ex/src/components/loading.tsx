import Taro, { Component } from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
const url = require('../resource/spiner.gif')
import './loading.css'

class Loading extends Component {
  render () {
    return (
      <View className='loading'>
        <Image src={url} className='img' />
      </View>
    )
  }
}

export { Loading }
