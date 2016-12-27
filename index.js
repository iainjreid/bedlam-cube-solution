"use strict";

// Lib
const lib = require('./lib');

console.log(lib.moves.length)

const deadends = [];

// (function attemptSolution() {
//   // Bootstrap the cube
//   const cube = bootstrapCube();

//   // Setup some scoped variables
//   let possibleMoves = [];

//   while (calculatePossibleMoves()) {
//     let move = retrieveRandomIndex(availableMoves);

//     for (let co of move.coordinates) {
//       cube[co.x.toString() + co.y.toString() + co.z.toString()] = false;
//     }

//     moves.push(move);
//   }

//   function bootstrapCube() {

//   }

//   function calculatePossibleMoves() {
//     // Clear the previously possible moves
//     possibleMoves.length = 0;

//     for (let piece of pieces) {
//       if (!piece.hasBeenPlaced) {
//         let m = piece.getAvailableMoves();

//         if (!m.length) {
//           handleFailure();
//           return false;
//         } else {
//           possibleMoves.push(...m);
//         }
//       }
//     }

//     return true;
//   }

//   function retrieveRandomIndex(arr) {
//     return arr[Math.floor(Math.random() * arr.length)];
//   }

//   function generateMoveHistoryHash(...moves) {
//     return moves.map(move => move.hash);
//   }

//   /**
//    * Generate the available points within the cube
//    */
//   function bootstrapCube() {
//     let cube = {};

//     for (let i = 1, j = 1, k = 1; k <= 4; ++i > 4 && (i = 1, ++j > 4 && (j = 1, k++))) {
//       cube[i.toString() + j.toString() + k.toString()] = true;
//     }

//     return cube;
//   }

//   function handleBlockage() {
//     this.attempts = this.attempts || 1;
//     conosle.log('%s attempts', this.attempts++);

//     // Mark the point as impassable
//     deadends.push(hashMoves);

//     // Queue another solution attempt
//     setTimeout(attemptSolution);
//   }
// })();
