import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import './movieDetail.scss'
import temp from './temp.json'
export default class Index extends Component {

    config: Config = {
        navigationBarTitleText: '详情'
    }
    constructor() {
        super(...arguments)
        this.state = {
            info: '',
            loading:true,
            temp: ''
        }
    }


    componentDidMount() {
        this.setState({ temp: temp })
        let self = this;
        Taro.request({header: { 'content-type': 'application/xml' },url:'https://douban.uieee.com/v2/movie/subject/'+self.$router.params.id}).then(res=>{
            this.setState({info:res.data,loading: false})
        })
    }

    render() {
        let data = this.state.info;//this.state.temp;
        if(!this.state.loading){
        return (
            <View id='detail'>
                <Text class='title'>{data.title}</Text>
                <View class='rightView'>
                    <View class='movieInfo'>
                        <View class='movieRate'>
                            <Text>评分：{data.rating.average}</Text>
                            <Text class='totalComt'>{data.ratings_count}人评价</Text>
                        </View>
                        <Text>
                            {data.durations[1] || data.durations[0]}/
                            {data.genres.map(item => { return item + '/' })}
                            {data.directors[0].name}(导演)/
                            {data.casts.map(item => item.name + '/')}
                            {data.pubdates[1] || data.pubdates[0]}
                        </Text>
                    </View>
                    <View><Image class='movieImage' src={data.images.small} /></View>
                </View>

                <View class='views'>
                    <Text class='grayText'>所属频道</Text>
                    <View>
                        {data.tags.map(item => {
                            return (<Text class='tag'  keys={item.id}>{item}></Text>)
                        })}
                    </View>
                </View>
                <View>
                    <Text class='grayText'>{data.title}的剧情简介</Text>
                    <View><Text>{data.summary}</Text></View>
                </View>

                <View class='views'>
                    <Text class='grayText'>影人</Text>
                    <View class='moviePeople'>
                        <View class='peoS'>
                            <Image src={data.directors[0].avatars.small} />
                            <Text>{data.directors[0].name}</Text>
                            <Text class='grayText'>导演</Text>
                        </View>

                        {data.casts.map(item => {
                            return (
                                <View class='peoS' keys={item.id}>
                                    <Image src={item.avatars.small} />
                                    <Text>{item.name}</Text>
                                    <Text class='grayText'>演员</Text>
                                </View>
                            )
                        })}

                    </View>
                </View>

                <View class='views'>
                    <Text class='grayText'>预告片</Text>
                    <View class='videoView'>
                        {data.trailers.map(item => {
                            return (
                                <View class='videoCont'>
                                    <Video
                                        class='videos'
                                        src={item.resource_url}
                                        poster={item.medium}
                                        controls={true}
                                        autoplay={false}
                                        initialTime='0'
                                        id='video'
                                        loop={false}
                                        muted={false}
                                    />
                                    <Text>{item.title}</Text>
                                </View>
                            )
                        })}

                    </View>
                </View>

                <View class='views'>
                    <Text class='grayText'>{data.title}的短评({data.comments_count})</Text>

                    {data.popular_comments.map(item => {
                        return (
                            <View class='shortComt'>
                                <View><Image class='comentImg' src={item.author.avatar} /></View>
                                <View class='comentView'>
                                    <Text class='comentPeople'>{item.author.name}</Text>
                                    <Text class='comentCont'>{item.content.slice(0,150)}</Text>
                                </View>
                            </View>)
                    })
                    }
                </View>

                <View class='views'>
                    <Text class='grayText'>{data.title}的影评({data.reviews_count})</Text>

                    {data.popular_reviews.map(item => {
                        return (
                            <View class='comentView'>
                                <Text class='comentTitle'>{item.title}</Text>
                                <Text class='comentPeople'>{item.author.name}</Text>
                                <Text class='comentCont'>{item.summary}</Text>
                            </View>)
                    })
                    }
                </View>

            </View>
        )
    }
}
}

