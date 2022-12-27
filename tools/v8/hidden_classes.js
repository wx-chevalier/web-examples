var PROPERTIES = 10000000;
var o = {};

var start = +new Date();

for (var i = 0; i < PROPERTIES; i++) {
  o[i] = i;
}

console.log(+new Date() - start);

var PROPERTIES = 10000000;

function O(size) {
  for (var i = 0; i < size; i++) {
    this[i] = null;
  }
}

var o = new O(PROPERTIES);

var start = +new Date();

for (var i = 0; i < PROPERTIES; i++) {
  o[i] = i;
}

console.log(+new Date() - start);

var PROPERTIES = 10000000;

class OClass {
  constructor(size) {
    for (var i = 0; i < size; i++) {
      this[i] = null;
    }
  }
}

var o = new OClass(PROPERTIES);

var start = +new Date();

for (var i = 0; i < PROPERTIES; i++) {
  o[i] = i;
}

console.log(+new Date() - start);
