import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { Commen } from '../index/child/commen'
import './MovieType.scss'
export default class MovieType extends Component {

    constructor() {
        super(...arguments)
        this.$router.params.tag && Taro.setNavigationBarTitle({ title: this.$router.params.tag })
        this.state = {
            movies: [],
            start: 0,
            selfUrl:''
        }
    }

    componentWillMount() {
        Taro.showNavigationBarLoading()
    }

    onReachBottom() {
        Taro.showLoading({
            title: '加载中',
          })
        this.fetchDate();
    }

    fetchDate(selfUrl) {
        let self = this;
        let temp = self.state.movies;
        let thisUrl = selfUrl || this.state.selfUrl
        Taro.request(
            {
                header: { 'content-type': 'application/xml' },
                url: `${thisUrl}start=${self.state.start || 0}&count=12`
            }).then(res => {
                self.setState({ movies: temp.concat(res.data.subjects)});
                Taro.hideNavigationBarLoading()
                Taro.hideLoading()
                self.setState({start:self.state.start + 12})
            })
    }

    componentDidMount() {
        let type = this.$router.params.type
        let self = this
        if(type == 'hot'){
            this.setState({selfUrl:'https://douban.uieee.com/v2/movie/in_theaters?'},()=>{this.fetchDate(this.state.selfUrl)})
        }else if(type == 'tags'){
            this.setState({selfUrl:'https://douban.uieee.com/v2/movie/search?tag=' + this.$router.params.tag +'&'}
            ,()=>{this.fetchDate(this.state.selfUrl)})
        }
        
    }

    render() {
        return (
            <View>
                <View id='movieType'>
                    <Commen movies={this.state.movies} />
                </View>
            </View >
        )
    }
}

