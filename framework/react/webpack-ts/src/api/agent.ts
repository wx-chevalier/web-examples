import axios from 'axios';

let HOST;

if (process.env.NODE_ENV === 'development') {
  // HOST = 'https://example/api/';
} else {
  HOST = '/api/';
}

// 需要自定义的几个地方
// 1. base URL
// 2. timeout 时间
// 3. 拦截器, 用于字段名的转换
// 4. 错误, 触发一些全局的提示
export const agent = axios.create({
  baseURL: HOST,
  timeout: 15000
});

// 拦截器用来将驼峰和下划线两种风格互转，根据 Server 端命名风格决定是否使用

// 驼峰转下划线
agent.interceptors.request.use(
  config => {
    config.data = transformPropertyName(config.data, key =>
      key.replace(/[A-Z]/g, str => '_' + str.toLowerCase())
    );
    return config;
  },
  error => Promise.reject(error)
);

// 下划线转驼峰
agent.interceptors.response.use(
  response => {
    response.data = transformPropertyName(response.data, key =>
      key.replace(/\_./g, str => str[1].toUpperCase())
    );

    return response;
  },
  error => Promise.reject(error)
);

function transformPropertyName(data: object, transformer: (key: string) => string): object {
  if (!isObject(data)) {
    return data;
  } else {
    const newObj = Array.isArray(data) ? [] : {};
    Object.keys(data).forEach(key => {
      const newKey = transformer(key);
      newObj[newKey] = transformPropertyName(data[key], transformer);
    });
    return newObj;
  }
}

// tslint:disable-next-line
function isObject(data: any) {
  return data !== null && typeof data === 'object';
}

// export default agent;
