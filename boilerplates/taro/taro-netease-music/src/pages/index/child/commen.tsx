import Taro, { Component } from '@tarojs/taro'
import { View, Text, } from '@tarojs/components'
import './commen.scss'
export class Commen extends Component {
    static defaultProps: { movies: []; };    
    toDetail(e) {
        Taro.navigateTo({ url: '/pages/MovieDetail/movieDetail?id=' + e.target.dataset.id });
    }

    render() {
        return (
            this.props.movies.map(item => {
                let rate = item.rate || item.rating.average
                return (
                    <View class="innerView" onClick={this.toDetail} key={item.id}>
                        <Image data-id={item.id} src={item.images.large || item.cover} style="background-image:url(../../img/temp.jpg)" alt="图片无法获取" />
                        <Text class="movieTitle">{item.title}</Text>
                        <Text class="movieRate">
                            <Text class="start">
                                {rate ? '评分：' + rate : '暂无评分'}
                            </Text>
                        </Text>
                    </View>
                )
            })
        )
    }
}

Commen.defaultProps = {
    movies: []
}