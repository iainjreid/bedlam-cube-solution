"use strict";

// Dependencies
const methods = require('../methods');

module.exports = class Piece {
  constructor(name, mapping) {
    this.uid = methods.generateUid();
    this.name = name;
    this.mapping = mapping;
  }

  markAsPlaced() {
    this._hasBeenPlaced = true;
  }

  markAsNotPlaced() {
    this._hasBeenPlaced = false;
  }

  hasBeenPlaced() {
    return this._hasBeenPlaced;
  }

  hasNotBeenPlaced() {
    return !this._hasBeenPlaced;
  }

  getAvailableMoves(moves, cube) {
    return moves
      .filter(move => {
        return move.piece === this && move.isPossible();
      });
  }
};
