import React from 'react';
import { render } from 'react-dom';

import App from './page/app';
import './index.scss';

render(<App title="Webpack 4 Demo" />, document.querySelector('#root'));
