// @flow
import EntityBase from './entity';

export default class UserEntity extends EntityBase {

  name: string = '王下邀月熊';

  /**
   * @function 默认构造函数
   * @param data JSONObject
   */
  constructor(data = {}) {
    super();
    Object.assign(this, data);
  }

}
