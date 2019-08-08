const onloadSsdk = (url) => {
  return new Promise((resolve, reject) => {
    let removeScript = function (scriptElement) {
      document.body.removeChild(scriptElement);
    }
    var scriptElement = document.createElement('script');
    document.body.appendChild(scriptElement);
    scriptElement.addEventListener('load', e => {
      removeScript(scriptElement);
      resolve(e);
    }, false);

    scriptElement.addEventListener('error', e => {
      removeScript(scriptElement);
      reject(e);
    }, false);
    scriptElement.src = url;
  });
}

const getSsdk = (debug) => {
  return new Promise(async(resolve, reject) => {
    if (!(window.__wxjs_environment === 'miniprogram' || window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1 || window.navigator.wxuserAgent)) {
      return reject('need wechat dev');
    }
    wx.config({
      debug: debug, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId: res.Data.AppId, // 必填，公众号的唯一标识
      timestamp: res.Data.Timestamp, // 必填，生成签名的时间戳
      nonceStr: res.Data.NonceStr, // 必填，生成签名的随机串
      signature: res.Data.Signature, // 必填，签名，见附录1
      jsApiList: apiList
    });
    wx.ready(function () {
      return resolve();
    });
  });
}

export const wxSsdkOnload = (debug) => {
  if (window.wx) {
    return getSsdk(debug);
  }
  onloadSsdk("//res.wx.qq.com/open/js/jweixin-1.3.0.js").then(res => {
    return getSsdk(debug);
  });
}
