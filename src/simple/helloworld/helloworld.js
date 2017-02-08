/**
 * Created by apple on 16/7/23.
 */
import React from 'react';
import App from './app/app';
import './helloworld.scss';
import optionalRender from '../../../dev-config/webpack/render';

optionalRender(<App />, './app/app', 'root');

// ReactDOM.render(
//   <div>
//     <App />
//   </div>,
//   document.getElementById('root')
// );