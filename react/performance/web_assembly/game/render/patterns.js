// @flow

function acorn(engine, i, j) {
  engine.set(i - 1, j);
  engine.set(i, j + 2);
  engine.set(i + 1, j - 1);
  engine.set(i + 1, j);
  engine.set(i + 1, j + 3);
  engine.set(i + 1, j + 4);
  engine.set(i + 1, j + 5);
}

function cross(engine, i, j) {
  engine.set(i - 1, j);
  engine.set(i, j - 1);
  engine.set(i, j);
  engine.set(i, j + 1);
  engine.set(i + 1, j);
}

function erase(engine, i, j) {
  engine.set(i - 1, j - 1, 0);
  engine.set(i - 1, j, 0);
  engine.set(i - 1, j + 1, 0);
  engine.set(i, j - 1, 0);
  engine.set(i, j, 0);
  engine.set(i, j + 1, 0);
  engine.set(i + 1, j - 1, 0);
  engine.set(i + 1, j, 0);
  engine.set(i + 1, j + 1, 0);
}

export { acorn, cross, erase };
