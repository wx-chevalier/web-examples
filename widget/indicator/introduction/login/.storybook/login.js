/**
 * Created by apple on 16/4/27.
 */
import React from "react";
import {storiesOf, action} from "@kadira/storybook";
import LoginComponent_Responsive_1 from "../responsive-1/login";

//导入自定义组件

storiesOf('Login', module)
    .add('Responsive Login', () => {
        return (<div>
            <LoginComponent_Responsive_1
                doLogin={action("doLogin")}
                loginResult={{
                code:0
                }
                }>

            </LoginComponent_Responsive_1>
        </div>)
            ;
    });

