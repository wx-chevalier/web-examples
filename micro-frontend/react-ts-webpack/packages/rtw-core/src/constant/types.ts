export interface IBasicModule {
  // 模块编号
  id: string;
  // 模块的加载文件路径
  module: string;
  // 版本
  version?: string;
}

export interface IAppModule extends IBasicModule {
  // 模块标题
  name: string;
  // 引入的 CSS 路径
  css?: string | string[];
}

/** 初始化参数 */
export interface IInitOption {
  apps: IAppModule[];
  vendors?: IBasicModule[];
}
