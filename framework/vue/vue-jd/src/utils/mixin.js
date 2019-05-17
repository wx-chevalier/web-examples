export const setLocalStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.localStorage.setItem(key, val);
}

export const getLocalStorage = (key) => {
  if (!key) return;
  return window.localStorage.getItem(key);
}

export const removeLocalStorage = (key) => {
  if (!key) return;
  window.localStorage.removeItem(key);
}

export const setSessionStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== 'string') {
    val = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, val);
}

export const getSessionStorage = (key) => {
  if (!key) return;
  return window.sessionStorage.getItem(key);
}

export const removeSessionStorage = (key) => {
  if (!key) return;
  window.sessionStorage.removeItem(key);
}

export const search = (key) => {
  if (!key) return;
  var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
  var url = window.location.hash == '' ? window.location.search : window.location.hash.substring(window.location.hash.indexOf('?'));
  var r = url.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

/**
 * 显示返回顶部按钮，开始、结束、运动 三个过程中调用函数判断是否达到目标点
 */
export const showBack = callback => {
    let requestFram;
    let oldScrollTop;

    document.addEventListener('scroll',() => {
       showBackFun();
    }, false)
    document.addEventListener('touchstart',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchmove',() => {
       showBackFun();
    },{passive: true})

    document.addEventListener('touchend',() => {
        oldScrollTop = document.body.scrollTop | document.documentElement.scrollTop;
        moveEnd();
    },{passive: true})
    
    const moveEnd = () => {
        requestFram = requestAnimationFrame(() => {
            if (document.body.scrollTop | document.documentElement.scrollTop != oldScrollTop) {
                oldScrollTop = document.body.scrollTop | document.documentElement.scrollTop;
                moveEnd();
            }else{
                cancelAnimationFrame(requestFram);
            }
            showBackFun();
        })
    }

    //判断是否达到目标点
    const showBackFun = () => {
        if (document.body.scrollTop | document.documentElement.scrollTop > 500) {
            callback(true);
        }else{
            callback(false);
        }
    }
}
