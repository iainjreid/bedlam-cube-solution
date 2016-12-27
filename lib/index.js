"use strict";

// Classes
const Move = require('./classes/move');
const Piece = require('./classes/piece');

// Methods
const methods = require('./methods');

// Setup the pieces
const pieces = require('./conf.json').map(x => new Piece(x.name, x.mapping));

// Setup the moves
const moves = [];
const cube = methods.generateCube();

console.log('Preparing possible moves:\n');

for (let piece of pieces) {
  const rotations = processRotations(piece.mapping);
  let positions = [];

  console.log(' - %s [%s rotations]', piece.name, rotations.length);

  for (let coordinate in cube) {
    const [x, y, z] = Array.from(coordinate).map(x => parseInt(x));

    positions.push(...rotations
      .map(rotation => {
        return rotation
          .map(co => {
            return {
              x: x + co.x,
              y: y + co.y,
              z: z + co.z
            }
          })
          .sort((a, b) => {
            return methods.generateJSONHash(a) < methods.generateJSONHash(b);
          });
      })
      .filter(position => {
        return position.every(co => {
          return co.x <= 4 && co.x >= 1 && co.y <= 4 && co.y >= 1 && co.z <= 4 && co.z >= 1;
        });
      }));
  }

  // Filter duplicate positions
  let hashMap = positions.map(methods.generateJSONHash);
  positions = positions
    .filter((position, i) => {
      return !hashMap.includes(methods.generateJSONHash(position), i + 1);
    });

  console.log(' - %s [%s poss pos]', piece.name, positions.length);

  moves.push(...positions
    .map(position => new Move(piece.name, position)))

  console.log(' - %s [complete]', piece.name);
}

console.log(' - Done\n');

/**
 * @description This method will simulate all possible rotations for the mapping supplied, and then proceed to filter
 *              them to ensure that each rotation is unique. The rotations are returned in an array of mappings.
 * 
 * @param {Array} mapping - An array of coordinates representing a given piece
 * 
 * @returns {Array} An array of mappings
 */
function processRotations(mapping) {
  const rotations = [];

  for (let i = 0; i < 4; i++) {
    let [coX, coY, coZ] = [({x}) => normalise(x), ({y}) => normalise(y), ({z}) => normalise(z)];

    switch (i) {
      case 1:
        [coX, coY] = [invert(coY), coX];
        break;
      case 2:
        [coX, coY] = [invert(coX), invert(coY)];
        break;
      case 3:
        [coX, coY] = [coY, invert(coX)];
        break;
    }

    for (let i = 0; i < 4; i++) {
      let [_coX, _coY, _coZ] = [coX, coY, coZ];

      switch (i) {
        case 1:
          [_coX, _coZ] = [invert(coZ), coX];
          break;
        case 2:
          [_coX, _coZ] = [invert(coX), invert(coZ)];
          break;
        case 3:
          [_coX, _coZ] = [coZ, invert(coX)];
          break;
      }

      for (let i = 0; i < 4; i++) {
        let [__coX, __coY, __coZ] = [_coX, _coY, _coZ];

        switch (i) {
          case 1:
            [__coY, __coZ] = [invert(_coZ), _coY];
            break;
          case 2:
            [__coY, __coZ] = [invert(_coY), invert(_coZ)];
            break;
          case 3:
            [__coY, __coZ] = [_coZ, invert(_coY)];
            break;
        }

        rotations.push(mapping
          .map(co => {
            return {
              x: __coX(co),
              y: __coY(co),
              z: __coZ(co)
            };
          })
          .sort((a, b) => {
            return methods.generateJSONHash(a) < methods.generateJSONHash(b);
          }));
      }
    }
  }

  return rotations
    .filter((rotation, i) => {
      return !rotations.map(methods.generateJSONHash).includes(methods.generateJSONHash(rotation), i + 1)
    });

  function normalise(num) {
    return num === -0 ? 0 : num;
  }

  function invert(fn) {
    return (co) => normalise(-fn(co));
  }
}

exports.pieces = pieces;
exports.moves = moves;
exports.methods = methods;