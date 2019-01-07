/** 默认的核心注册类 */
export class Registry {
  localMap: Map<string, object> = new Map();

  set(key: string, value: object) {
    this.localMap.set(key, value);
  }
}

export default new Registry();
