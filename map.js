const { table, getBorderCharacters } = require('table');
const chalk = require('chalk');

const generateMap = (height, width) => {
  const arr = new Array(height);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(width);
  }
  return arr;
};

const fillMap = (src) => {
  for (let row = 0; row < src.length; row++) {
    for (let column = 0; column < src[row].length; column++) {
      src[row][column] = chalk.green('  ');
      if (column === 0 || column === src[row].length - 1) {
        src[row][column] = chalk.rgb(255, 131, row)('X');
      }
    }
  } return src;
};

const drawMap = (height, width, player, enemy, playerChar, enemyChar, ammoChar) => {
  console.clear();
  console.log('======');
  console.clear();
  const gameMap = fillMap(generateMap(height, width));
  for (let row = 0; row < gameMap.length; row++) {
    for (let column = 0; column < gameMap[row].length; column++) {
      if (player.pos.x === column && player.pos.y === row) {
        gameMap[row][column] = playerChar;
      }
      for (let i = 0; i < enemy.length; i++) {
        if (enemy[i].x === column && enemy[i].y === row) {
          gameMap[row][column] = enemyChar;
        }
      }
      for (let i = 0; i < player.ammo.length; i++) {
        if (player.ammo[i].x === column && player.ammo[i].y === row) {
          gameMap[row][column] = ammoChar;
        }
      }
    }
  }
  const output = table(gameMap, {
    border: getBorderCharacters('void'),
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 0,
      width: 10
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
