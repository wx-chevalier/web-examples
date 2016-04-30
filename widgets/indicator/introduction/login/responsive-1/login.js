/**
 * Created by apple on 16/4/27.
 */
import React, {Component, PropTypes} from "react";

require("./login.scss");

export default class LoginComponent extends Component {

    constructor(props) {

        super(props);

        //将Props
        this.state = {...props};

        //初始化内部状态
        this.state.username = "";

        this.state.password = "";

        this.handleClickLoginButton = this.handleClickLoginButton.bind(this);
    }

    /**
     * @function 处理登录按钮的点击事件
     * @param e 传入的参数
     */
    handleClickLoginButton(e) {

        console.log(e);

        console.log(this.state.username);

        //判断是否为空,基本的判断
        if(username === "" || password === ""){

        }

        //调用传入的处理方法
        this.props.doLogin();
    }

    //返回构造的界面
    render() {

        return (<div>
            <div className="login">
                <div className="login-header">
                    <h1>登录</h1>
                </div>
                <div className="login-form">
                    <h3>Username:</h3>
                    <input type="text" placeholder="Username" onChange={(event)=>{
                        this.setState({username:event.target.value})
                    }}/><br/>
                    <h3>Password:</h3>
                    <input type="password" placeholder="Password"/>
                    <br/>
                    <input type="button" value="Login" className="login-button" onClick={this.handleClickLoginButton}/>
                    <br/>
                    <a className="sign-up">Sign Up!</a>
                    <br/>
                    <h6 className="no-access">Can't access your account?</h6>
                </div>
            </div>
        </div>);

    }

}

//定义登录界面的输入的属性
LoginComponent.propTypes = {
    doLogin: React.PropTypes.func, //执行登录操作的方法
    loginResult: React.PropTypes.object //登录操作的返回结果
};

