import { agent as defaultAgent } from 'c-apis/agent';
import { AxiosRequestConfig, AxiosInstance } from 'axios';
import notice, { Notice } from '../utils/notice';

interface ResultNotice {
  title: string;
  content: string;
}

enum HttpMethods {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch'
}

interface BaseConfig {
  url: string;
  params?: Object;
  successNotice?: ResultNotice;
  errorNotice?: ResultNotice;
}

interface PostConfig extends BaseConfig {
  data: Object;
}

// interface ServerResonpse<T> {
//   data: T;
// }

export default class BaseApi {
  constructor(public agent: AxiosInstance = defaultAgent, public resultNotice: Notice = notice) {}

  async get<T>(config: BaseConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.GET, config, extra);
  }

  async post<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.POST, config, extra);
  }

  async delete<T>(config: BaseConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.DELETE, config, extra);
  }

  async put<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.PUT, config, extra);
  }

  async patch<T>(config: PostConfig, extra?: AxiosRequestConfig) {
    return this.request<T>(HttpMethods.PATCH, config, extra);
  }

  get agentList() {
    return [this.agent];
  }

  private async request<T>(
    method: HttpMethods,
    config: BaseConfig | PostConfig,
    extra: AxiosRequestConfig = {}
  ): Promise<T> {
    const requestConfig: AxiosRequestConfig = {
      method: method,
      url: config.url,
      params: config.params || {},
      ...extra
    };
    if (method === HttpMethods.POST || method === HttpMethods.PUT || method === HttpMethods.PATCH) {
      requestConfig.data = (config as PostConfig).data || {};
    }

    try {
      const result = await this.agent.request<T>(requestConfig);
      if (config.successNotice) {
        this.resultNotice('success', config.successNotice.title, config.successNotice.content);
      }
      return result.data as T;
    } catch (error) {
      if (config.errorNotice) {
        this.resultNotice('error', config.errorNotice.title, config.errorNotice.content);
      }
      throw error;
    }
  }
}
