/**
 * Created by apple on 16/7/2.
 */
import React from "react";
import {render} from "react-dom";
import {SwiperContainer, SwiperSlide} from "./swiper";

render(<SwiperContainer options={{
        pagination: '.swiper-pagination',
        paginationClickable: true,
        direction: 'vertical'
    }}>
    <SwiperSlide>
        <div>Slide 1</div>
    </SwiperSlide>
    <SwiperSlide>
        <div>Slide 2</div>
    </SwiperSlide>
</SwiperContainer>, document.getElementById('root'));
