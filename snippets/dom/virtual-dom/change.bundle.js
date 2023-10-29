/** @jsx h */

function h(type, props, ...children) {
  return { type, props: props || {}, children };
}

const a = h("div", null);

const b = h("div", null);

console.log(a == b);

