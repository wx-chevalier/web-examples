import { IAppModule, IBasicModule, IInitOption } from '@wx/rtw-core';
import * as SystemJS from 'systemjs';

import { loadCSS } from '../loaders';

/**
 * Represents a module resolver.
 */
export class ModuleResolver {
  public readonly apps: IAppModule[] = [];

  public readonly isRegistered: boolean = false;

  public readonly systemConfig: SystemJS.Config = { map: {} };

  public readonly css: string[] = [];

  /**
   * Creates a new instance of `ModuleResolver`.
   * @param option
   */
  constructor(option: IInitOption) {
    if (option.vendors) {
      option.vendors.forEach(vendor => {
        this.registerSystemMap(vendor);
      });
    }

    option.apps.forEach(app => {
      this.registerSystemMap(app);
    });

    // Init systemJS
    SystemJS.config(this.systemConfig);

    // Mount CSS
    this.css.forEach(cssHref => {
      loadCSS(cssHref);
    });

    this.apps = option.apps;
    this.isRegistered = true;

    return this;
  }

  /** 替换 URL 中的版本号 */
  public getURLWithVersion(url: string, version?: string): string {
    if (version == null) {
      return url;
    }
    return url.replace('__VERSION__', version);
  }

  /** 注册 SystemJS 中的模块 */
  public registerSystemMap(mod: IBasicModule | IAppModule) {
    const url = this.getURLWithVersion(mod.module, mod.version);

    if (!this.systemConfig.map) {
      this.systemConfig.map = {};
    }

    this.systemConfig.map[mod.id] = url;

    if ('css' in mod && mod.css != null) {
      if (Array.isArray(mod.css)) {
        this.css.push(...mod.css.map(cssHref => this.getURLWithVersion(cssHref, mod.version)));
      } else {
        this.css.push(this.getURLWithVersion(mod.css, mod.version));
      }
    }
  }
}
