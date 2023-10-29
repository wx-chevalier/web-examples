import Taro, { Component, eventCenter } from '@tarojs/taro'
import { View, Text, Navigator, Image } from '@tarojs/components'

import api from '../utils/api'
import { timeagoInst, Thread_DETAIL_NAVIGATE } from '../utils'
import { IMember } from '../interfaces/member'
import { INode } from '../interfaces/node'

import './thread.css'

interface IProps {
  title: string,
  member: IMember,
  node: INode,
  last_modified: number,
  tid: number,
  replies: number,
  key?: number,
  not_navi?: boolean // 不导航到 detail
}

class Thread extends Component<IProps, {}> {

  handleNavigate = () => {
    // 这里必须显式指名 this.props 包含 tid
    // 或设置 defaultProps
    const { tid, not_navi } = this.props
    if (not_navi) {
      return
    }
    // 懒得用 redux 了
    eventCenter.trigger(Thread_DETAIL_NAVIGATE, this.props)
    Taro.navigateTo({
      url: '/pages/thread_detail/thread_detail'
    })
  }

  render () {
    const { title, member, last_modified, replies, node, not_navi } = this.props
    const time = timeagoInst.format(last_modified * 1000, 'zh')
    const usernameCls = `author ${not_navi ? 'bold' : ''}`

    return (
      <View className='thread' onClick={this.handleNavigate}>
        <View className='info'>
          <View>
            <Image src={member.avatar_large} className='avatar' />
          </View>
          <View className='middle'>
            <View className={usernameCls}>
                {member.username}
            </View>
            <View className='replies'>
              <Text className='mr10'>
                {time}
              </Text>
              <Text>
                评论 {replies}
              </Text>
            </View>
          </View>
          <View className='node'>
            <Text className='tag'>
              {node.title}
            </Text>
          </View>
        </View>
        <Text className='title'>
          {title}
        </Text>
      </View>
    )
  }
}

export { Thread }
