"use strict";

// Generators
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

/**
 * @description This method will stringify the JSON provided, and then generate a numeric hash based upon that JSON
 *              string.
 *
 * @param {Object|Array} json - The JSON to be hashed
 *
 * @returns {Number} A numeric hash built from the JSON provided 
 */
exports.generateJSONHash = json => {
  return JSON.stringify(json)
    .split("")
    .reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0);
}

/**
 * @description This method will return a random item from the Array provided.
 *
 * @param {Array} arr - The Array to select the random item from
 *
 * @returns {Any} A random item from the Array provided
 */
exports.retrieveRandomIndex = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
}
