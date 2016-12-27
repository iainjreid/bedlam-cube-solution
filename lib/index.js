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

for (let piece of pieces) {
  for (let coordinate in { '222': true }) {
    const [x, y, z] = Array.from(coordinate).map(x => parseInt(x));
    const positions = [];

    function invert(fn) {
      return (co) => -fn(co);
    }

    for (let i = 0; i < 4; i++) {
      let [coX, coY, coZ] = [({x}) => x, ({y}) => y, ({z}) => z];

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

          positions.push(piece.mapping
            .map(co => {
              return {
                x: x + __coX(co),
                y: y + __coY(co),
                z: z + __coZ(co)
              };
            })
            .sort((a, b) => {
              return methods.generateJSONHash(a) < methods.generateJSONHash(b);
            }));
        }
      }
    }

    console.log(piece.name, positions.filter((position, i) => {
      return !positions.map(methods.generateJSONHash).includes(methods.generateJSONHash(position), i + 1)
    }).length)

    moves.push(...positions
      // .filter(position => {
      //   return position.every(co => {
      //     return co.x <= 4 && co.x >= 1 && co.y <= 4 && co.y >= 1 && co.z <= 4 && co.z >= 1;
      //   });
      // })
      .filter((position, i) => {
        return !positions.map(methods.generateJSONHash).includes(methods.generateJSONHash(position), i + 1)
      })
      .map(x => new Move(piece.name, x)));
  }
}

exports.pieces = pieces;
exports.moves = moves;
exports.methods = methods;