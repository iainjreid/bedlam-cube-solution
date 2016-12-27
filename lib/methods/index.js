"use strict";

/**
 * Generators
 */
const _generateUid = (function* () {
  let i = 0;
  while (true) {
    yield (i++).toString(36);
  }
})();

exports.generateCube = () => {
  let cube = {};

  for (let i = 1, j = 1, k = 1; k <= 4; ++i > 4 && (i = 1, ++j > 4 && (j = 1, k++))) {
    cube[i.toString() + j.toString() + k.toString()] = true;
  }

  return cube;
};

exports.generateUid = () => {
  return _generateUid.next().value;
};

exports.generateJSONHash = json => {
  return JSON.stringify(json)
    .split("")
    .reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
}
