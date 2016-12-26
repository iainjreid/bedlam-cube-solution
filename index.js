"use strict";

const cube = {};

/**
 * Generate the available points within the cube
 */
for (let i = 1, j = 1, k = 1; k <= 4; ++i > 4 && (i = 1, ++j > 4 && (j = 1, k++))) {
  cube[i.toString() + j.toString() + k.toString()] = true;
}

class Piece {
  constructor(name, ...coordinates) {
    this.name = name;
    this.coordinates = coordinates.map(coordinate => {
      return {
        x: coordinate[0],
        y: coordinate[1],
        z: coordinate[2]
      };
    });
  }

  getAvailableMoves() {
    const moves = [];

    for (let position in cube) {
      if (cube[position]) {
        this.getRotationsForPosition(...position)
      }
    }
  }

  getRotationsForPosition(x, y, z) {
    x = parseInt(x);
    y = parseInt(y);
    z = parseInt(z);

    const rotations = [];

    for (let i = 0; i < 8; i++) {
      rotations.push(this.coordinates.map(coordinate => {
        return {
          x: x + (i % 2 ? coordinate.x : -coordinate.x),
          y: y + (i % 3 ? coordinate.y : -coordinate.y),
          z: z + (i % 4 ? coordinate.z : -coordinate.z)
        };
      }));
    }

    for (let i = 0; i < 8; i++) {
      rotations.push(this.coordinates.map(coordinate => {
        return {
          x: x + (i % 2 ? coordinate.y : -coordinate.y),
          y: y + (i % 3 ? coordinate.z : -coordinate.z),
          z: z + (i % 4 ? coordinate.x : -coordinate.x)
        };
      }));
    }

    for (let i = 0; i < 8; i++) {
      rotations.push(this.coordinates.map(coordinate => {
        return {
          x: x + (i % 2 ? coordinate.z : -coordinate.z),
          y: y + (i % 3 ? coordinate.x : -coordinate.x),
          z: z + (i % 4 ? coordinate.y : -coordinate.y)
        };
      }));
    }

    return rotations.filter(position => {
      return position.every(co => {
        return co.x <= 4 && co.x >= 1 && co.y <= 4 && co.y >= 1 && co.z <= 4 && co.z >= 1;
      });
    });
  }
}

const pieces = [
  { name: 'Red - Tall', mapping: [[0, 0, 0], [1, 0, 0], [0, 0, -1], [0, 1, 0], [0, 2, 0]] },
  { name: 'Red - Star', mapping: [[0, 0, 0], [-1, 0, 0], [1, 0, 0], [0, 1, 0], [0, -1, 0]] },
  { name: 'Red - Squiggly 1', mapping: [[0, 0, 0], [1, 0, 0], [1, 1, 0], [2, 1, 0], [0, 0, -1]] },
  { name: 'Red - Squiggly 2', mapping: [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, -1], [2, 1, 0]] },
  { name: 'Yellow - Short', mapping: [[0, 0, 0], [0, 1, 0], [1, 0, 0], [1, 0, -1]] },
  { name: 'Yellow - Tall 1', mapping: [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 2, 0], [0, 0, -1]] },
  { name: 'Yellow - Tall 2', mapping: [[0, 0, 0], [1, 0, 0], [2, 0, 0], [2, 1, 0], [0, 0, -1]] },
  { name: 'Yellow - Diagonal', mapping: [[0, 0, 0], [1, 0, 0], [1, 1, 0], [2, 1, 0], [2, 2, 0]] },
  { name: 'Yellow - T-Shaped', mapping: [[0, 0, 0], [1, 0, 0], [1, 1, 0], [2, 0, 0], [1, 0, -1]] },
  { name: 'Blue - L-Shaped', mapping: [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 2, 0], [-1, 1, 0]] },
  { name: 'Blue - Squiggly', mapping: [[0, 0, 0], [1, 0, 0], [1, 1, 0], [1, 1, -1], [2, 1, -1]] },
  { name: 'Blue - T-Shaped 1', mapping: [[0, 0, 0], [1, 0, 0], [1, 1, 0], [2, 0, 0], [1, 1, -1]] },
  { name: 'Blue - T-Shaped 2', mapping: [[0, 0, 0], [1, 0, 0], [1, 1, 0], [2, 0, 0], [0, 0, -1]] }
].map(x => new Piece(x.name, ...x.mapping));

console.log(pieces[0].getRotationsForPosition(1, 1, 1));
