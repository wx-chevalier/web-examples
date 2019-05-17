import Taro, { Component } from '@tarojs/taro'
import { Commen } from './commen'
export class New extends Component {

  constructor() {
    super(...arguments)
    this.state = {
      movies: [],
      loading:true
    }
  }


  componentDidMount() {
    let self = this
    Taro.request({
      url: 'https://www.easy-mock.com/mock/5bf27ef5700af43dcbc9c7bb/dban/new',
    }).then(res => {
      self.setState({ movies: res.data.subjects,loading:false })
    })
  }

  render() {
    if (!this.state.loading) {
    return (
      <Commen movies={this.state.movies.slice(0,8)} />
    )
  }
}
}

