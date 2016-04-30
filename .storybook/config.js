import {configure} from "@kadira/storybook";
import {disable} from "react-komposer";

disable();

/**
 * @function 加载所有的
 */
function loadStories() {
    require('../widgets/indicator/introduction/login/.storybook/login.js')
}

configure(loadStories, module);