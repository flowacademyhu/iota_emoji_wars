const moveLeft = (obj) => {
  if (obj.x > 1) {
    obj.x--;
  }
};

const moveRight = (obj, width) => {
  if (obj.x < width - 2) {
    obj.x++;
  }
};

const moveUp = (obj) => {
  if (obj.y > 0) {
    obj.y--;
  }
};

const moveDown = (obj, height) => {
  if (obj.y < height - 1) {
    obj.y++;
  }
};

module.exports = {
  moveDown,
  moveLeft,
  moveRight,
  moveUp
};
