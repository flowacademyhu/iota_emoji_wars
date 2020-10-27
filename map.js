const { table, getBorderCharacters } = require('table');

const generateMap = (height, width) => {
  const arr = new Array(height);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(width);
  }
  return arr;
};

const fillMap = (src, player) => {
  const playerX = player.pos.x;
  const playerY = player.pos.y;
  for (let i = 0; i < src.length; i++) {
    for (let k = 0; k < src[i].length; k++) {
      src[i][k] = ' ';
      if (k === 0 || k === src[i].length - 1) {
        src[i][k] = 'X';
      }
      if (playerX === i && playerY === k) {
        src[i][k] = '😷';
      }
    }
  } return src;
};

const addEnemy = (arr, num) => {
  for (let i = 0; i < num; i++) {
    const y = Math.floor(Math.random() * arr[0].length - 2) + 1;
    arr[0][y] = '*';
  }
  return arr;
};

const falling = (arr) => {
  for (let i = 0; i < arr[arr.length - 2].length; i++) {
    arr[arr.length - 2][i] = '';
  }
  for (let i = arr.length - 1; i > 0; i--) {
    for (let j = 0; j < arr[i].length; j++) {
      if (arr[i - 1][j] === '*') {
        arr[i][j] = arr[i - 1][j];
        arr[i - 1][j] = ' ';
      }
    }
  }
  return arr;
};

// const addPlayer = (src, player) => {

// };

const drawMap = (map) => {
  const output = table(map, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 0
    },
    drawHorizontalLine: () => {
      return false;
    }
  });

  console.log(output);
};

module.exports = {
  generateMap,
  fillMap,
  drawMap,
  addEnemy,
  falling
};
