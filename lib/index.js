"use strict";

// Dependencies
const Move = require('./classes/move');
const Piece = require('./classes/piece');
const methods = require('./methods');

/**
 * An array of pieces, with each piece being an instance of the Piece class, exposing its name and basic mapping. The
 * mappings are used during the setup process to calculate all of the potential positions, and the rotations from each
 * position, that the piece could achieve within the bounds of the cube.
 */
const pieces = require('./conf.json')
  .map(piece => {
    return new Piece(piece.name, piece.mapping);
  });

/**
 * An array of all of the possible valid moves that could be made by each piece within the cube. Each move is an instance of
 * the Move class.
 */
const moves = [];

for (let piece of pieces) {
  const rotations = processRotations(piece.mapping);
  const positions = [];

  for (let coordinate in methods.generateCube()) {
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

  /**
   * A hash table of the computed positions, used to elimiate duplicated positions by ensuring that each value held
   * within the positions array appears only once.
   */
  const hashMap = positions.map(methods.generateJSONHash);

  moves.push(...positions
    .filter((position, i) => {
      return !hashMap.includes(methods.generateJSONHash(position), i + 1);
    })
    .map(position => {
      return new Move(piece, position);
    }));
}

/**
 * Reset and retrieve the available Moves.
 */
exports.resetMoves = () => {
  for (let move of moves) {
    move.markAsPossible();
  }

  return moves;
};

/**
 * Reset and retrieve the available Pieces.
 */
exports.resetPieces = () => {
  for (let piece of pieces) {
    piece.markAsNotPlaced();
  }

  return pieces;
}

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

  /**
   * @private
   * 
   * @description This method will iron out any negitive zero values. Although these values are technically correct,
   *              they cause issues later on.
   * 
   * @param {Number} num - A number to normalise
   * 
   * @returns {Number} The normalised number
   */
  function normalise(num) {
    return num === -0 ? 0 : num;
  }

  /**
   * @private
   * 
   * @description This method will return a function that when invoked will invert the number supplied to that function.
   *              Note that this method will likely be recursively invoked.
   * 
   * @param {Function} fn - The function to invert
   * 
   * @returns {Function} A function that when called will invert the provided value
   */
  function invert(fn) {
    return (co) => normalise(-fn(co));
  }
}

exports.methods = methods;
