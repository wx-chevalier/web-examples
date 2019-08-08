/* @flow */
import { cube } from './maths';

// 只使用了 cube, 所以 maths 中的 square 会被 tree shaking 移除掉
function foo(x: ?number): number {
  if (x) {
    return cube(x);
  }
  return -1;
}

if (process.env.NODE_ENV !== 'production') {
  console.log('-----');
}

export default {
  foo
};
