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

class Index extends Component<{}, IState> {
  config = {
    navigationBarTitleText: '首页'
  }

  state = {
    loading: true,
    threads: []
  }

  async componentDidMount () {
    try {
      const res = await Taro.request<IThread[]>({
        url: api.getLatestTopic()
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

export default Index
