function promiseMiddleware() {
  return ({dispatch, getState}) => {
    return next => action => {

      if (typeof action === 'function') {
        return action(dispatch, getState);
      }

      const {promise, types, ...rest} = action; // eslint-disable-line no-redeclare

      //判断是否存在Promise对象
      if (!promise) {
        return next(action);
      }

      const [REQUEST, SUCCESS, FAILURE] = types;
      next({...rest, type: REQUEST});

      let actionPromise;

      //判断promise的类别
      if (promise instanceof Function) {

        //如果promise为函数,则执行
        actionPromise = promise();

      } else {

        //否则直接赋值
        actionPromise = promise;
      }

      actionPromise.then(
        (result) => next({...rest, result, type: SUCCESS}),
        (error) => next({...rest, error, type: FAILURE})
      ).catch((error)=> {

        console.error('MIDDLEWARE ERROR:', error);
        next({...rest, error, type: FAILURE});
      });

      return actionPromise;
    };
  };
}

export default promiseMiddleware();