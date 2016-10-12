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

    resolve(validUserToken);

  });
};

/**
 * @function 执行登出操作
 * @return {Promise}
 */
export const logout = ()=> {
  return new Promise((resolve, reject)=> {

    resolve();

  });
};