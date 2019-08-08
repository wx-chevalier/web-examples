import axios from 'axios';
import {
  Indicator,
  Toast
} from 'mint-ui';
import router from '@/router';
import {
	setSessionStorage,
	getSessionStorage,
	removeSessionStorage
} from '@/utils/mixin';
class Http {
  constructor(){
    this.Domain = 'https://awei.fun:3032';
  }
  require(options) {
    if (!options.api) throw new Error('api 不能为空');
    if (!options.param) { options.param = {} }; 
    if (!options.methods) { options.methods = 'POST' }; //不传递方法默认为POST
    if (!options.loadingVisble) { options.loadingVisble = true }; // 不传递默认开启loading
    if (!options.loadingText) { options.loadingText = '加载中...' };
    if(options.loadingVisble){
        Indicator.open({
            text: options.loadingText,
            spinnerType: 'snake'
        })
    };
    options.param.MemberToken = options.param.MemberToken ? options.param.MemberToken : getSessionStorage('MemberToken');
    return new Promise((resolve,reject) => {
        return axios({
            method: options.methods,
            url: options.api,
            baseURL: this.Domain,  
            // `withCredentials` indicates whether or not cross-site Access-Control requests
            // should be made using credentials
            // withCredentials: true, // default
            headers: {
                'Content-Type':'text/plain'
            },
            data: options.param
        }).then(response => {
            Indicator.close();
            if(response.data.Code === 0){ //请求成功
                return resolve(response.data)
            }else{
                if(response.data.Code === 2){ //未登录
                //   router.push('/Login')
                }
                Toast({
                    message: response.data.Message,
                    position: 'bottom'
                });
                return reject(response.data)
            }
        },error => {
            Indicator.close();
            Toast({
                message: error,
                position: 'bottom'
            });
            return reject()
        })
    })
  }
}

export default Http;
