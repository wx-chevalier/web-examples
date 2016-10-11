/**
 * Created by apple on 16/10/10.
 */

/**
 * @function 验证用户令牌是否有效
 * @param userToken
 */
export const valid_user = (userToken = undefined)=> {

  return new Promise((resolve, reject)=> {

    if (userToken == "123456") {
      resolve(true);
    } else {
      resolve(false);
    }

  });

};

export const get_posts = ()=> {

};