import {configure} from "@kadira/storybook";

import { disable } from 'react-komposer';

disable();

function loadStories() {
    require('../src/app/.stories/helloworld.js');
}

configure(loadStories, module);