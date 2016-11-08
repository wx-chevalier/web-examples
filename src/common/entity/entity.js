// @flow

export default class Entity {

  name: string = 'name';

  /**
   * @function 默认构造函数
   * @param data JSONObject
   */
  constructor(data = {}) {
    Object.assign(this, data);
  }

}