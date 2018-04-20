/* eslint-disable */

const validUserToken = '123456';

/**
 * @function 验证用户令牌是否有效
 * @param userToken
 */
export const validateUserTokenSync = () => {
  const userToken = window.localStorage.getItem('userToken');

  return userToken && userToken === validUserToken;
};

/**
 * @function 验证用户令牌是否有效
 * @param userToken
 */
export const validateUserTokenAsync = async () => {
  return new Promise((resolve, reject) => {
    if (userToken === validUserToken) {
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
export const login = async () => {
  return new Promise((resolve, _) => {
    // 将userToken写入到localStorage,首先判断是否为DOM环境
    !window || window.localStorage.setItem('userToken', validUserToken);

    resolve(validUserToken);
  });
};

/**
 * @function 执行登出操作
 * @return {Promise}
 */
export const logout = async () => {
  return new Promise((resolve, _) => {
    !window || window.localStorage.removeItem('userToken');

    resolve();
  });
};
