const { table, getBorderCharacters } = require('table');

const generateMap = (height, width) => {
  const arr = new Array(height);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(width);
  }
  return arr;
};

const fillMap = (src) => {
  for (let i = 0; i < src.length; i++) {
    for (let k = 0; k < src[i].length; k++) {
      src[i][k] = ' ';
      if (k === 0 || k === src[i].length - 1) {
        src[i][k] = 'X';
      }
    }
  } return src;
};

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
  drawMap
};
