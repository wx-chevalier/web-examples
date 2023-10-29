/** @jsx h */

function h(type, props, ...children) {
  return { type, props: props || {}, children };
}


const a = (<div></div>);

const b = (<div></div>);

console.log( a == b );