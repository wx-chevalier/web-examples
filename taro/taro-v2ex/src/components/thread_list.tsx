import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Thread } from './thread'
import { Loading } from './loading'
import { IMember } from '../interfaces/member'
import { INode } from '../interfaces/node'

import './thread.css'

interface IProps {
  threads: IThread[],
  loading: boolean
}

interface IThread {
  title: string,
  member: IMember,
  node: INode,
  last_modified: number,
  id: number,
  replies: number
  key?: number
}

class ThreadList extends Component<IProps, {}> {
  static defaultProps = {
    threads: [],
    loading: true
  }

  render () {
    const { loading, threads } = this.props

    if (loading) {
      return <Loading />
    }

    const element = threads.map((thread, index) => {
      return (
        <Thread
          key={thread.id}
          node={thread.node}
          title={thread.title}
          last_modified={thread.last_modified}
          replies={thread.replies}
          tid={thread.id}
          member={thread.member}
        />
      )
    })

    return (
      <View className='thread-list'>
        {element}
      </View>
    )
  }
}

export { ThreadList }
