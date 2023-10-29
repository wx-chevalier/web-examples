import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ThreadList } from '../../components/thread_list'
import { IThread } from '../../interfaces/thread'
import api from '../../utils/api'

import './index.css'

interface IState {
  loading: boolean,
  threads: IThread[]
}

class Hot extends Component<{}, IState> {
  config = {
    navigationBarTitleText: '热门'
  }

  state = {
    loading: true,
    threads: []
  }

  async componentDidMount () {
    try {
      const res = await Taro.request<IThread[]>({
        url: api.getHotNodes()
      })
      this.setState({
        threads: res.data,
        loading: false
      })
    } catch (error) {
      Taro.showToast({
        title: '载入远程数据错误'
      })
    }
  }

  render () {
    const { loading, threads } = this.state
    return (
      <View className='index'>
        <ThreadList
          threads={threads}
          loading={loading}
        />
      </View>
    )
  }
}

export default Hot
