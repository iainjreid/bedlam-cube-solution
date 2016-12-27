"use strict";

// Dependencies
const methods = require('../methods');

module.exports = class Move {
  constructor(piece, coordinates) {
    this.uid = methods.generateUid();
    this.piece = piece;
    this.coordinates = coordinates;
  }
};
