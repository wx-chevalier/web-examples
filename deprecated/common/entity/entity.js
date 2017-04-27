// @flow

export default class EntityBase {

  name: string;

  /**
   * @function 默认构造函数
   * @param data JSONObject
   */
  constructor(data = {}) {
    Object.assign(this, data);
  }

}