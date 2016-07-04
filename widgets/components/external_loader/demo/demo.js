/**
 * Created by apple on 16/7/2.
 */
/**
 * Created by apple on 16/6/30.
 */
import React from "react";
import {render} from "react-dom";
import {ReactExternalLoader} from "../external_loader";

render(<ReactExternalLoader
    srcArray={[
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/css/swiper.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/js/swiper.min.js"
    ]}

    onLoad={()=>{alert("Loaded!");}}

>
    <div style={{color:"white"}}>
        <h1 style={{position:"absolute"}}>HI</h1>
        <p style={{position:"absolute",top:"50px"}}>This is Demo For Scalable</p>
        <img height="504px" width="320px" src="http://img5.cache.netease.com/photo/0031/2014-09-20/A6K9J0G94UUJ0031.jpg"
             alt=""/>
    </div>
</ReactExternalLoader>, document.getElementById('root'));
