/*!
 * YourLibraryName.js v0.1.0-canary.1
 * (c) 2017-2018 Leo Hui <leohxj@gmail.com>
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.YourLibraryName = factory());
}(this, (function () { 'use strict';

// This function isn't used anywhere, so
// Rollup excludes it from the bundle...
var PI = 3.14;



// This function gets included
function cube(x) {
  return x * x * x * PI;
}

// 只使用了 cube, 所以 maths 中的 square 会被 tree shaking 移除掉
function foo(x) {
  if (x) {
    return cube(x);
  }
  return -1;
}

var main = {
  foo: foo
};

return main;

})));
//# sourceMappingURL=YourLibraryName.js.map
