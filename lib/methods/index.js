"use strict";

/**
 * Generators
 */
const _uid = (function* () {
  let i = 0;
  while (true) {
    yield (i++).toString(36);
  }
})();

/**
 * @description This method will generate a 4x4x4 cube in memory, and return an Object representing that cube.
 * 
 * @returns {Object} The generated cube
 */
exports.generateCube = () => {
  let cube = {};

  for (let i = 1, j = 1, k = 1; k <= 4; ++i > 4 && (i = 1, ++j > 4 && (j = 1, k++))) {
    cube[i.toString() + j.toString() + k.toString()] = true;
  }

  return cube;
};

/**
 * @description This method will generate a unique identifier, and return it accordingly. The identifier is generated
 *              from the "_uid" generator method.
 * 
 * @returns {String} A unique identifier
 */
exports.generateUid = () => {
  return _uid.next().value;
};

exports.generateJSONHash = json => {
  return JSON.stringify(json)
    .split("")
    .reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
}
