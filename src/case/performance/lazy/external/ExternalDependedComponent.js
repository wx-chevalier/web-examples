// @flow
import React, { Component } from "react";
import { message } from "antd";
import { ExternalLoader } from "fluent-fetcher";

/**
 * @function 执行外部脚本加载工作
 */
export default class ExternalDependedComponent extends Component {
  render() {
    return (
      <section className="ExternalDependedComponent__container">
        <ExternalLoader
          srcArray={[
            "https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/css/swiper.min.css",
            "https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/js/swiper.min.js"
          ]}
          loadingIndicator={
            <div>
              正在加载：
              {[
                "https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/css/swiper.min.css",
                "https://cdnjs.cloudflare.com/ajax/libs/Swiper/3.3.1/js/swiper.min.js"
              ]}
            </div>
          }
          onLoad={() => {
            message.success("Loaded!");
          }}
        >
          <div style={{ color: "white" }}>
            <h1 style={{ position: "absolute" }}>Swiper</h1>
            <p style={{ position: "absolute", top: "50px" }}>
              Swiper 加载完毕，现在你可以在全局对象中使用 Swiper!
            </p>
            <img
              height="504px"
              width="320px"
              src="http://img5.cache.netease.com/photo/0031/2014-09-20/A6K9J0G94UUJ0031.jpg"
              alt=""
            />
          </div>
        </ExternalLoader>
      </section>
    );
  }
}
