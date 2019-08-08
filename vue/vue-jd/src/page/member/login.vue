<style lang="scss" scoped>
  @import '~assets/common/css/mixin.scss'; // @include flexbox()
  .user-container {
    @include wh(10rem, 100%);
    .clear {
      width: 16px;
      height: 16px;
      margin: 0;
      position: absolute;
      right: 10px;
      @include bg('~jd/images/close.png');
    }
    .my-header {
      padding: $padding;
      background: #fff;
      @include flexbox(space-between, center, row, nowrap);
      margin-bottom: 30px;
      .back {
        display: block;
        width: .65rem;
        height: .65rem;
        background: url('~jd/images/close.png') no-repeat;
        background-size: 100%;
      }
      strong {
        font-size: 18px;
        font-weight: normal;
        color: #333;
      }
      .myMsg {
        display: block;
        height: .65rem;
        width: .65rem;
        opacity: 0;
      }
    }
    /* 注册 */
    .registered-container {
      height: 100%;
      background: #f8f8f8;
      .my-header .back {
        background: url('~jd/images/arrow-left.png') no-repeat;
        background-size: 100%;
      }
      .cell-box {
        padding: 30px 15px;
        >p {
          padding: 15px 0;
          font-size: $title;
          color: #333;
          text-align: left;
          padding: 16px;
        }
        .phone-cell {
          position: relative;
          background: #fff;
          padding: $padding;
          @include placeholderColor($gray);
          width: 100%;
          input {
            width: 100%;
            border: none;
            outline: none;
            box-shadow: none;
            text-shadow: none;
            text-align: left;
            font-size: $title;
            color: #333;
          }
        }
        .registered-code-cell {
          @include flexbox(space-between,
          center,
          row,
          nowrap);
          padding: 0 16px;
          .code-cell {
            width: 50%;
            background: #fff;
            position: relative;
            padding: $padding;
            @include placeholderColor($gray);
            input {
              width: 100%;
              border: none;
              outline: none;
              box-shadow: none;
              text-shadow: none;
              text-align: left;
              font-size: $title;
              color: #333;
            }
          }
          .registered-getCode {
            width: 50%;
            background: $red;
            color: #fff;
            font-size: 16px;
            text-align: center;
            margin-left: 10px;
            border-radius: 2px;
            padding: 10px 0;
          }
        }
      }
    }

    /* 忘记密码 */
    .forget-container {
      height: 100%;
      background: #f8f8f8;
      .my-header .back {
        background: url('~jd/images/arrow-left.png') no-repeat;
        background-size: 100%;
      }
      .forget-content {
        font-size: $title;
        text-align: left;
        .forget-validate {
          margin-top: $margin;
          padding: 16px;
          .validate-username {
            @include flexbox(space-between,
            center,
            row,
            nowrap);
            span {
              font-size: $title;
              color: #333;
              margin-right: 10px;
            }
            background: #fff;
            position: relative;
            padding: $padding;
            @include placeholderColor($gray);
            input {
              width: 80%;
              border: none;
              outline: none;
              box-shadow: none;
              text-shadow: none;
              text-align: left;
              font-size: $title;
              color: #333;
            }
          }
        }
        .forget-code-tip {
          color: $red;
          padding: 16px;
        }
        .forget-username-tip {
          color: #333;
          padding: 16px;
        }
      }
      .cell-box {
        padding: 15px;
        >p {
          padding: 15px 0;
          font-size: $title;
          color: #333;
          text-align: left;
          padding: 16px;
        }
        .phone-cell {
          position: relative;
          background: #fff;
          padding: $padding;
          @include placeholderColor($gray);
          width: 100%;
          input {
            width: 100%;
            border: none;
            outline: none;
            box-shadow: none;
            text-shadow: none;
            text-align: left;
            font-size: $title;
            color: #333;
          }
        }
        .registered-code-cell {
          @include flexbox(space-between,
          center,
          row,
          nowrap);
          padding: 0 16px;
          .code-cell {
            width: 50%;
            background: #fff;
            position: relative;
            padding: $padding;
            @include placeholderColor($gray);
            input {
              width: 100%;
              border: none;
              outline: none;
              box-shadow: none;
              text-shadow: none;
              text-align: left;
              font-size: $title;
              color: #333;
            }
          }
          .registered-getCode {
            width: 50%;
            background: $red;
            color: #fff;
            font-size: 16px;
            text-align: center;
            margin-left: 10px;
            border-radius: 2px;
            padding: 10px 0;
          }
        }
      }
    }
  }

  .from-user {
    padding: $padding;
    background: #fff;
    .cell-list {
      .cell-item {
        @include flexbox(flex-start,
        center,
        row,
        nowrap);
        border-bottom: 1px solid #eee;
        padding: $padding $padding $padding 0;
        margin: $margin 0;
        position: relative;
        .left {
          span {
            font-size: $title;
            color: #333;
          }
        }
        .right {
          width: 70%;
          margin-left: 20px;
          @include placeholderColor($gray);
          input {
            width: 100%;
            border: none;
            outline: none;
            box-shadow: none;
            text-shadow: none;
            text-align: left;
            font-size: $title;
            color: #333;
          }
          .arrow-right {
            display: block;
            width: 16px;
            height: 20px;
            background: url('~jd/images/arrow-right.png') no-repeat;
            background-size: 100%;
          }
        }
      }
    }
    .other-link {
      @include flexbox(space-between,
      center,
      row,
      nowrap);
      font-size: 15px;
      color: $gray;
      margin-top: $margin;
    }
  }

</style>
<template>
  <div class="user-container">
    <!-- 登陆 -->
    <mt-popup v-model="visiblePopup.login" :closeOnClickModal="true" :modal="false" position="bottom" class="modal-popup">
      <div class="my-header">
        <i class="back" @click="closeOpen"></i>
        <strong>京东登录</strong>
        <i class="myMsg"></i>
      </div>
      <div class="from-user">
        <div class="cell-list">
          <div class="cell-item">
            <div class="left">
              <span>账号</span>
            </div>
            <div class="right">
              <input v-focus v-validate.initial="'required'" type="text" name="username" v-model="loginForm.username" placeholder="请输入用户名或手机号码">
            </div>
            <i class="clear" style="" v-show="loginForm.username.length>0" @click="loginForm.username=''"></i>
          </div>
          <div class="cell-item">
            <div class="left">
              <span>密码</span>
            </div>
            <div class="right">
              <input v-validate.initial="'required'" name="password" @keyup.enter="Login" :type="loginForm.passwordFormType" v-model="loginForm.password" placeholder="请输入密码">
            </div>
            <i class="clear" style="" v-show="loginForm.password.length>0" @click="loginForm.password=''" style="right: 40px;"></i>
            <i :class="['eye-icon', loginForm.passwordFormType=='password'?'eye-close-icon':'']" style="position: absolute;right: 10px;"
              @click="loginForm.passwordFormType=loginForm.passwordFormType=='password'?'text':'password'"></i>
          </div>
        </div>
        <div :class="['cell-btn',errors.has('username')||errors.has('password')?'disabled-btn':'']" @click="()=>{errors.has('username')||errors.has('password')?false:Login()}">登录</div>
        <div class="other-link">
          <span @click="()=>visiblePopup.registered=true">手机快速注册</span>
          <span @click="()=>visiblePopup.forget=true">忘记密码</span>
        </div>
      </div>
    </mt-popup>
    <!-- 登录 -->

    <!-- 注册 -->
    <mt-popup v-model="visiblePopup.registered" :closeOnClickModal="true" :modal="false" position="right" class="modal-popup">
      <div class="registered-container">
        <div class="my-header">
          <i class="back" @click="()=>visiblePopup.registered=false"></i>
          <strong>手机快速注册</strong>
          <i class="myMsg"></i>
        </div>
        <div class="cell-box">
          <div class="phone-cell">
            <input v-focus v-validate.initial="'required'" name="registered-phone" type="tel" v-model="registeredForm.phone" placeholder="请输入手机号">
            <i class="clear" style="" v-show="registeredForm.phone.length>0" @click="registeredForm.phone=''" style="right: 10px;top:12px;"></i>
          </div>
          <div :class="['cell-btn',errors.has('registered-phone')?'disabled-btn':'']" @click="registeredNext">下一步</div>
        </div>
      </div>
      <mt-popup v-model="visiblePopup.registeredCode" :closeOnClickModal="true" :modal="false" position="right" class="modal-popup">
        <div class="registered-container">
          <div class="my-header">
            <i class="back" @click="()=>visiblePopup.registeredCode=false"></i>
            <strong>手机快速注册</strong>
            <i class="myMsg"></i>
          </div>
          <div class="cell-box">
            <p>请输入{{registeredForm.phone}}收到的验证码</p>
            <div class="registered-code-cell">
              <div class="code-cell">
                <input v-focus v-validate.initial="'required'" name="registeredCode" type="tel" v-model="registeredForm.code" placeholder="请输入验证码">
                <i class="clear" v-show="registeredForm.code.length>0" @click="registeredForm.code=''" style="right: 10px;top:12px;"></i>
              </div>
              <div :class="['registered-getCode',registeredForm.resetSendPhoneMessage?'disabled-btn':'']" @click="registeredSendPhoneMessage"
                :disabled="registeredForm.resetSendPhoneMessage">{{registeredForm.resetSendPhoneMessage ? `(${registeredForm.resetSendPhoneMessage})` : '获取验证码'}}</div>
            </div>
            <div :class="['cell-btn',errors.has('registeredCode')?'disabled-btn':'']" @click="()=>{errors.has('registeredCode')?false: visiblePopup.registeredFormId = true}">下一步</div>
          </div>
        </div>
      </mt-popup>
      <mt-popup v-model="visiblePopup.registeredFormId" :closeOnClickModal="true" :modal="false" position="right" class="modal-popup">
        <div class="registered-container">
          <div class="my-header">
            <i class="back" @click="()=>visiblePopup.registeredFormId=false"></i>
            <strong>填写注册信息</strong>
            <i class="myMsg"></i>
          </div>
          <div class="from-user">
            <div class="cell-list">
              <div class="cell-item">
                <div class="left">
                  <span>用户昵称</span>
                </div>
                <div class="right">
                  <input v-focus v-validate.initial="'required'" type="text" name="registeredMemberName" v-model="registeredForm.username"
                    placeholder="请输入用户名">
                </div>
                <i class="clear" style="" v-show="registeredForm.username.length>0" @click="registeredForm.username=''"></i>
              </div>
              <div class="cell-item">
                <div class="left">
                  <span>密码</span>
                </div>
                <div class="right">
                  <input v-validate.initial="'required'" name="registeredPassword" :type="registeredForm.passwordFormType" v-model="registeredForm.password"
                    placeholder="请输入密码">
                </div>
                <i class="clear" style="" v-show="registeredForm.password.length>0" @click="registeredForm.password=''" style="right: 40px;"></i>
                <i :class="['eye-icon', registeredForm.passwordFormType=='password'?'eye-close-icon':'']" style="position: absolute;right: 10px;"
                  @click="registeredForm.passwordFormType=registeredForm.passwordFormType=='password'?'text':'password'"></i>
              </div>
              <div class="cell-item">
                <div class="left">
                  <span>确认密码</span>
                </div>
                <div class="right">
                  <input v-validate.initial="'required'" name="registeredConfirmPassword" :type="registeredForm.passwordConfirmFormType" v-model="registeredForm.confirmpassword"
                    placeholder="请重新输入确认密码">
                </div>
                <i class="clear" style="" v-show="registeredForm.confirmpassword.length>0" @click="registeredForm.confirmpassword=''" style="right: 40px;"></i>
                <i :class="['eye-icon', registeredForm.passwordConfirmFormType=='password'?'eye-close-icon':'']" style="position: absolute;right: 10px;"
                  @click="registeredForm.passwordConfirmFormType=registeredForm.passwordConfirmFormType=='password'?'text':'password'"></i>
              </div>
            </div>
          </div>
          <div class="cell-box">
            <div :class="['cell-btn',errors.has('registeredMemberName') || errors.has('registeredPassword') || errors.has('registeredConfirmPassword') ?'disabled-btn':'']"
              @click="registered">注册</div>
          </div>
        </div>
      </mt-popup>
    </mt-popup>
    <!-- 注册 -->

    <!-- 忘记密码 -->
    <mt-popup v-model="visiblePopup.forget" :closeOnClickModal="true" :modal="false" position="right" class="modal-popup">
      <div class="forget-container">
        <div class="my-header">
          <i class="back" @click="()=>visiblePopup.forget=false"></i>
          <strong>忘记密码</strong>
          <i class="myMsg"></i>
        </div>
        <div class="forget-content">
          <div class="forget-validate">
            <div class="validate-username">
              <span>账号</span>
              <input v-focus v-model="forgetForm.phone" v-validate.initial="'required'" name="forgetusername" type="text" placeholder="用户名/手机号">
              <i class="clear" v-show="forgetForm.phone.length>0" @click="forgetForm.phone=''" style="right: 10px;top:12px;"></i>
            </div>
            <div :class="['cell-btn',errors.has('forgetusername')?'disabled-btn':'']" @click="()=>{
              if(!errors.has('forgetusername')){
                setPasswordNext()
              }
            }">下一步</div>
          </div>
        </div>
      </div>
      <mt-popup v-model="visiblePopup.forgetCode" :closeOnClickModal="true" :modal="false" position="right" class="modal-popup">
        <div class="forget-container">
          <div class="my-header">
            <i class="back" @click="()=>visiblePopup.forgetCode=false"></i>
            <strong>忘记密码</strong>
            <i class="myMsg"></i>
          </div>
          <div class="forget-content">
            <p class="forget-code-tip">请输入{{forgetForm.phone}}收到的验证码</p>
            <p class="forget-username-tip">用户名: {{forgetForm.userName}}****</p>
            <div class="cell-box">
              <div class="registered-code-cell">
                <div class="code-cell">
                  <input v-focus v-validate.initial="'required'" name="forgetCode" type="tel" v-model="forgetForm.code" placeholder="请输入验证码">
                  <i class="clear" v-show="forgetForm.code.length>0" @click="forgetForm.code=''" style="right: 10px;top:12px;"></i>
                </div>
                <div :class="['registered-getCode',forgetForm.resetSendPhoneMessage?'disabled-btn':'']" @click="forgetSendPhoneMessage" :disabled="forgetForm.resetSendPhoneMessage">{{forgetForm.resetSendPhoneMessage ? `(${forgetForm.resetSendPhoneMessage})` : '获取验证码'}}</div>
              </div>
              <div :class="['cell-btn',errors.has('forgetCode')?'disabled-btn':'']" @click="()=>{errors.has('forgetCode')?false: visiblePopup.forgetResetPassword=true }">下一步</div>
            </div>
          </div>
        </div>
      </mt-popup>
      <mt-popup v-model="visiblePopup.forgetResetPassword" :closeOnClickModal="true" :modal="false" position="bottom" class="modal-popup">
        <div class="my-header">
          <i class="back" @click="()=>visiblePopup.forgetResetPassword=false"></i>
          <strong>设置密码</strong>
          <i class="myMsg"></i>
        </div>
        <div class="from-user">
          <div class="cell-list">
            <div class="cell-item">
              <div class="left">
                <span>输入新密码</span>
              </div>
              <div class="right">
                <input v-validate.initial="'required'" name="forgetFormPassword" :type="forgetForm.passwordFormType" v-model="forgetForm.password"
                  placeholder="请输入新的密码，位数6-12位">
              </div>
              <i class="clear" style="" v-show="forgetForm.password.length>0" @click="forgetForm.password=''" style="right: 40px;"></i>
              <i :class="['eye-icon', forgetForm.passwordFormType=='password'?'eye-close-icon':'']" style="position: absolute;right: 10px;"
                @click="forgetForm.passwordFormType=forgetForm.passwordFormType=='password'?'text':'password'"></i>
            </div>
            <div class="cell-item">
              <div class="left">
                <span>确认新密码</span>
              </div>
              <div class="right">
                <input v-validate.initial="'required'" name="forgetFormConfirmPassword" :type="forgetForm.confirmPasswordFormType" v-model="forgetForm.confirmPassword"
                  placeholder="请输入确认密码">
              </div>
              <i class="clear" style="" v-show="forgetForm.confirmPassword.length>0" @click="forgetForm.confirmPassword=''" style="right: 40px;"></i>
              <i :class="['eye-icon', forgetForm.confirmPasswordFormType=='password'?'eye-close-icon':'']" style="position: absolute;right: 10px;"
                @click="forgetForm.confirmPasswordFormType=forgetForm.confirmPasswordFormType=='password'?'text':'password'"></i>
            </div>
          </div>
          <div :class="['cell-btn',(!errors.has('forgetFormPassword')&&!errors.has('forgetFormConfirmPassword'))&&forgetForm.password === forgetForm.confirmPassword?'':'disabled-btn']"
            @click="setPassword">确认</div>
        </div>
      </mt-popup>
    </mt-popup>
    <!-- 忘记密码 -->
  </div>
</template>
<script>
  import {
    Field,
    Button,
    Toast,
    Popup
  } from 'mint-ui';
  export default {
    data() {
      return {
        visiblePopup: {
          login: true,
          registered: false,
          registeredCode: false,
          forget: false,
          forgetCode: false,
          registeredFormId: false,
          forgetResetPassword: false
        },
        loginForm: {
          username: '',
          password: '',
          passwordFormType: 'password'
        },
        registeredForm: {
          phone: '',
          username: '',
          password: '',
          confirmpassword: '',
          passwordFormType: 'password',
          passwordConfirmFormType: 'password',
          resetSendPhoneMessage: null,
          code: ''
        },
        forgetForm: {
          resetSendPhoneMessage: null,
          userName: null,
          password: '',
          passwordFormType: 'password',
          confirmPasswordFormType: 'password',
          confirmPassword: '',
          phone: '',
          code: ''
        }
      }
    },
    components: {},
    methods: {
      closeOpen() {
        this.visiblePopup.login = false;
        setTimeout(() => {
          this.$router.go(-1)
        }, 200)
      },
      async setPassword() { //设置密码
        let {
          Code,
          Message
        } = await this.$store.dispatch('SetPassword', {
          phone: this.forgetForm.phone,
          challengecode: this.forgetForm.code,
          newpassword: this.forgetForm.confirmPassword
        })
        Toast({
          message: Code === 0 ? '修改成功' : Message,
          position: 'bottom'
        })
        this.visiblePopup.forget = false;
        this.visiblePopup.forgetCode = false;
        this.visiblePopup.forgetResetPassword = false;
      },
      async registered() { //注册账号
        let formData = {
          username: this.registeredForm.username,
          password: this.registeredForm.confirmpassword,
          phone: this.registeredForm.phone,
          challengecode: this.registeredForm.code,
        }
        this.$store.dispatch('Registered', formData).then(response => {
          Toast({
            message: '注册成功',
            position: 'bottom'
          })
          this.visiblePopup.registered = false;
          this.visiblePopup.registeredCode = false;
          this.visiblePopup.registeredFormId = false;
        }, err => {
          return Toast({
            message: err.message,
            position: 'bottom'
          })
        })
      },
      async registeredNext() { //注册账号发送短信
        this.$store.dispatch('GetUserInfo', {
          MemberToken: this.registeredForm.phone
        }).then(response => {
          if (response.Code === 0) return Toast({
            message: '该手机已被注册',
            position: 'bottom'
          })
        }, err => {
          this.visiblePopup.registeredCode = true
        })
      },
      async setPasswordNext() { //忘记密码
        let {
          Code,
          Message,
          Data,
        } = await this.$store.dispatch('GetUserInfo', {
          MemberToken: this.forgetForm.phone
        });
        if (Code !== 0) return Toast({
          message: Message,
          position: 'bottom'
        })
        this.forgetForm.userName = Data.username;
        this.visiblePopup.forgetCode = true
      },
      async registeredSendPhoneMessage() { //获取验证码
        await this.$store.dispatch('SendPhoneMessage', {
          phone: this.registeredForm.phone
        });
        this.registeredForm.resetSendPhoneMessage = 120;
        let times = setInterval(() => {
          if (this.registeredForm.resetSendPhoneMessage <= 0) {
            this.registeredForm.resetSendPhoneMessage = null;
            clearInterval(times);
          } else {
            this.registeredForm.resetSendPhoneMessage--;
          }
        }, 1000)
      },
      async forgetSendPhoneMessage() { //获取验证码
        await this.$store.dispatch('SendPhoneMessage', {
          phone: this.forgetForm.phone
        });
        this.forgetForm.resetSendPhoneMessage = 120;
        let times = setInterval(() => {
          if (this.forgetForm.resetSendPhoneMessage <= 0) {
            this.forgetForm.resetSendPhoneMessage = null;
            clearInterval(times);
          } else {
            this.forgetForm.resetSendPhoneMessage--;
          }
        }, 1000)
      },
      async Login() { //登录
        let Data = await this.$store.dispatch('Login', {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        if (Data.Code !== 0) return Toast({
          message: Data.Message,
          position: 'bottom'
        })
        this.$router.go(-1);
      }
    },
    mounted: function () {}
  }

</script>
