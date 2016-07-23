/**
 * Created by apple on 16/7/4.
 */
import React from "react";
import {render} from "react-dom";
import ScalableComponent from "../scalable";
import {SwiperContainer, SwiperSlide} from "../../scroll/slider/swiper";


render(
    <ScalableComponent mode="contain" wrapperBackgroundColor="rgb(117,155,156)">

        <SwiperContainer options={{
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical'
    }}>

            <SwiperSlide>
                <div style={{color:"white"}}>
                    <h1 style={{position:"absolute"}}>HI Slide1</h1>
                    <p style={{position:"absolute",top:"50px"}}>This is Demo For Scalable</p>
                    <img height="504px" width="320px"
                         src="http://img5.cache.netease.com/photo/0031/2014-09-20/A6K9J0G94UUJ0031.jpg"
                         alt=""/>
                </div>
            </SwiperSlide>

            <SwiperSlide>
                <div style={{color:"white"}}>
                    <h1 style={{position:"absolute"}}>HI Slide2</h1>
                    <p style={{position:"absolute",top:"50px"}}>This is Demo For Scalable</p>
                    <img height="504px" width="320px"
                         src="http://img5.cache.netease.com/photo/0031/2014-09-20/A6K9J0G94UUJ0031.jpg"
                         alt=""/>
                </div>
            </SwiperSlide>

        </SwiperContainer>

    </ScalableComponent>, document.getElementById('root'));
