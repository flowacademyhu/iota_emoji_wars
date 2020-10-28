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

const drawMap = (height, width, player, enemyArr) => {
  const terkep = fillMap(generateMap(height, width));
  for (let sor = 0; sor < terkep.length; sor++) {
    for (let oszlop = 0; oszlop < terkep[sor].length; oszlop++) {
      if (player.pos.x === sor && player.pos.y === oszlop) {
        terkep[sor][oszlop] = 'P';
      }
      for (let i = 0; i < enemyArr.length; i++) {
        if (enemyArr[i].pos.x === sor && enemyArr[i].pos.y === oszlop) {
          terkep[sor][oszlop] = 'E';
        }
      }
    }
  }
  const output = table(terkep, {
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
