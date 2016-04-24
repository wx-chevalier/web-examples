/**
 * Created by apple on 16/4/24.
 */

import React from "react";
import {storiesOf, action} from "@kadira/storybook";
import HelloWorld from "../helloworld/components/HelloWorld";

//导入自定义组件

storiesOf('HelloWorld', module)
    .add('Plain HelloWorld', () => {
        return getHelloWorld();
    });

function getHelloWorld() {
    return (
        <div>
            <HelloWorld
                text="Hello Story"
                SayWorld={action("SayWorld")}
                SayChevalier={action("SayChevalier")}
                SaySomething={action("SaySomething")}
            ></HelloWorld>
        </div>
    );
}