import Taro, { Component } from '@tarojs/taro'
import { Commen } from './commen'
export class HotMovie extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      hotMovie: [],
      loading: true
    }
  }


  componentDidMount() {
    let self = this
    Taro.request({header: { 'content-type': 'application/xml' },
    url:'https://douban.uieee.com/v2/movie/in_theaters',
    }).then(res => {
      self.setState({ hotMovie: res.data.subjects, loading: false })
    })
  }

  render() {
    if (!this.state.loading) {
      return (
        <Commen movies={this.state.hotMovie.slice(0,8)} />
      )
    } 
  }
}

