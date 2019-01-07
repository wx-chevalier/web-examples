import { IInitOption } from '@wx/rtw-core';
import * as SystemJS from 'systemjs';

import { ModuleResolver } from './resolvers/ModuleResolver';

let globalModuleResolver: ModuleResolver | null = null;

/** 导入某个模块 */
export function importApp(moduleName: string) {
  return SystemJS.import(moduleName);
}

/** 注册某个模块 */
export function registerModule(moduleName: string, moduleExports: object) {
  return SystemJS.registerDynamic(moduleName, [], false, (_1, _2, module) => {
    module.exports = moduleExports;
  });
}

/** 执行初始化操作 */
export function init(option: IInitOption) {
  globalModuleResolver = new ModuleResolver(option);

  return globalModuleResolver;
}

export const global = globalModuleResolver;
