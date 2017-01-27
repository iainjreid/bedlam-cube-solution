"use strict";

// Lib
const lib = require('./lib');

// Setup some scoped variables
let move;
let deadends = [];
let previousMoves = [];
let availableMoves = [];

// Generate the cube
const cube = lib.methods.generateCube();
const moves = lib.resetMoves();
const pieces = lib.resetPieces();

(function attemptSolution() {
  while (prepareMoves()) {
    move = lib.methods.retrieveRandomIndex(availableMoves);

    move.reserveCoordinates(cube);
    move.piece.markAsPlaced();

    previousMoves[previousMoves.length] = move;
  }

  function prepareMoves() {
    availableMoves.length = 0;

    // Check each move to see whether or not it is still possible
    for (let move of moves) {
      if (move.isPossible()) {
        move.updatePossibility(cube);
      }
    }

    // Check each piece to see whether or not it is blocked
    for (let piece of pieces) {
      if (piece.hasNotBeenPlaced()) {
        let pieceMoves = piece
          .getAvailableMoves(moves, cube)
          .filter(move => {
            return !deadends.includes(hashMoves([...previousMoves, move]));
          });

        // If the piece is unable to be placed, mark the cube as blocked
        if (!pieceMoves.length) {
          processBlockage();
          return false;
        } else {
          piece.totalMoves = pieceMoves.length;
          availableMoves = [...availableMoves, ...pieceMoves];
        }
      }
    }

    availableMoves = availableMoves.sort(move => move.piece.totalMoves).reverse().slice(0, 200);

    return availableMoves.length;
  }

  function processBlockage() {
    let isComplete = pieces.every(piece => {
      return piece.hasBeenPlaced();
    });

    // Check to see whether or not the cube is complete
    if (isComplete) {
      // Log the moves that were made
      previousMoves.forEach(move => {
        console.log(move.piece.name);
      });

      console.log('\nDone!');
    } else {
      var hash = hashMoves(previousMoves);
      deadends[deadends.length] = hash;

      while (deadends.includes(hash)) {
        reverseLastMove();
        hash = hashMoves(previousMoves);
      }

      for (let move of moves) {
        move.updatePossibility(cube);
      }

      console.log('Deadends: %s, Previous moves: %s', deadends.length, previousMoves.length)

      // Queue another solution attempt
      setTimeout(attemptSolution);
    }
  }

  function reverseLastMove() {
    // Clear and reset the last move
    const move = previousMoves.pop();

    move.unreserveCoordinates(cube);
    move.piece.markAsNotPlaced();
  }

  function hashMoves(moves) {
    return lib.methods.generateJSONHash(moves
      .sort((a, b) => {
        return a.piece.uid > b.piece.uid;
      })
      .map(move => {
        return move.uid;
      }));
  }
})();
