import axios from 'axios';
import config from './config';

// 取消重复请求
let pending: Array<{
  url: string;
  cancel: Function;
}> = [];
const cancelToken = axios.CancelToken;
const removePending = config => {
  for (let p in pending) {
    let item: any = p;
    let list: any = pending[p];
    // 当前请求在数组中存在时执行函数体
    if (list.url === config.url + '&' + config.method) {
      // 执行取消操作
      list.cancel();
      // 从数组中移除记录
      pending.splice(item, 1);
    }
  }
};

const service = axios.create(config);

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    removePending(config);
    config.cancelToken = new cancelToken(c => {
      pending.push({
        url: config.url + '&request_type=' + config.method,
        cancel: c
      });
    });
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 返回状态判断(添加响应拦截器)
service.interceptors.response.use(
  res => {
    removePending(res.config);
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default service;
