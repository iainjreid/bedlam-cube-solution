"use strict";

// Dependencies
const methods = require('../methods');

module.exports = class Move {
  constructor(piece, coordinates) {
    this.uid = methods.generateUid();
    this.piece = piece;
    this.coordinates = coordinates;
  }

  /**
   * @description This method will mark this Move as possible.
   */
  markAsPossible() {
    this._isNotPossible = false;
  }

  /**
   * @description This method will mark the Move as not possible.
   */
  markAsNotPossible() {
    this._isNotPossible = true;
  }

  /**
   * @description This method will return a Boolean value determining whether or not this Move is possible.
   *
   * @returns {Boolean} Whether or not this Move is possible.
   */
  isPossible() {
    return !this._isNotPossible;
  }

  /**
   * @description This method will return a Boolean value determining whether or not this Move is not possible.
   * 
   * @returns {Boolean} Whether or not this Move is not possible.
   */
  isNotPossible() {
    return this._isNotPossible;
  }

  reserveCoordinates(cube) {
    for (let co of this.coordinates) {
      cube[co.x.toString() + co.y.toString() + co.z.toString()] = false;
    }
  }

  unreserveCoordinates(cube) {
    for (let co of this.coordinates) {
      cube[co.x.toString() + co.y.toString() + co.z.toString()] = true;
    }
  }

  /**
   * @description This method will perform a hard check against the cube provided to see whether or not this Move is
   *              possible, by confirming that each of the coordinates required by this Move are still vacant. In the
   *              event that the Move is either possible or no longer possible, this method will call the 
   *              "markAsPossible" method, or "markAsNotPossible" method respectively.
   *
   * @param {Object} cube - The cube to check against
   */
  updatePossibility(cube) {
    let isPossible = this.coordinates.every(co => {
      return cube[co.x.toString() + co.y.toString() + co.z.toString()];
    });

    if (isPossible) {
      this.markAsPossible();
    } else {
      this.markAsNotPossible();
    }
  }
};
