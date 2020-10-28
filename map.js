const { table, getBorderCharacters } = require('table');

const generateMap = (height, width) => {
  const arr = new Array(height);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(width);
  }
  return arr;
};

const fillMap = (src) => {
  for (let sor = 0; sor < src.length; sor++) {
    for (let oszlop = 0; oszlop < src[sor].length; oszlop++) {
      src[sor][oszlop] = ' ';
      if (oszlop === 0 || oszlop === src[sor].length - 1) {
        src[sor][oszlop] = 'X';
      }
    }
  } return src;
};

const generateEnemy = (map, enemyArr, n) => {
  for (let i = 0; i < n; i++) {
    enemyArr.push({ x: Math.floor(Math.random) * map.length - 2 + 1, y: 0 });
  }
};

const drawMap = (height, width) => {
  const map = fillMap(generateMap(height, width));
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
  generateEnemy
};
