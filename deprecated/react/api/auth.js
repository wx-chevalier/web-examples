/**
 * Created by apple on 16/10/11.
 */

const validUserToken = "123456";

/**
 * @function 验证用户令牌是否有效
 * @param userToken
 */
export const valid_user = (userToken = undefined)=> {

  return new Promise((resolve, reject)=> {

    if (userToken == validUserToken) {
      resolve(true);
    } else {
      resolve(false);
    }

  });

};

/**
 * @function 执行登陆操作
 * @return {Promise}
 */
export const login = ()=> {
  return new Promise((resolve, reject)=> {

    //将userToken写入到localStorage,首先判断是否为DOM环境
    !window || window.localStorage.setItem('userToken',validUserToken);

    resolve(validUserToken);

  });
};

/**
 * @function 执行登出操作
 * @return {Promise}
 */
export const logout = ()=> {
  return new Promise((resolve, reject)=> {

    !window || window.localStorage.removeItem('userToken');

    resolve();

  });
};