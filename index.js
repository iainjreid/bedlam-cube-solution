"use strict";

// Lib
const lib = require('./lib');

console.log(lib.moves.length);

const deadends = [];

(function attemptSolution() {
  // Generate the cube
  const cube = lib.methods.generateCube();

  // Setup some scoped variables
  let possibleMoves = [];

  while (calculatePossibleMoves()) {
    let move = retrieveRandomIndex(availableMoves);

    for (let co of move.coordinates) {
      cube[co.x.toString() + co.y.toString() + co.z.toString()] = false;
    }

    moves.push(move);
  }

  function calculatePossibleMoves() {
    // Clear the previously possible moves
    possibleMoves.length = 0;

    for (let piece of pieces) {
      if (!piece.hasBeenPlaced) {
        let m = piece.getAvailableMoves();

        if (!m.length) {
          handleFailure();
          return false;
        } else {
          possibleMoves.push(...m);
        }
      }
    }

    return true;
  }

  function handleBlockage() {
    this.attempts = this.attempts || 1;
    conosle.log('%s attempts', this.attempts++);

    // Mark the point as impassable
    deadends.push(hashMoves);

    // Queue another solution attempt
    setTimeout(attemptSolution);
  }
})();
