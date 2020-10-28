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

const generateEnemy = (width, enemyArr, n) => {
  for (let i = 0; i < n; i++) {
    enemyArr.push({ x: Math.floor(Math.random() * (width - 2) + 1), y: 0 });
  }
};

const generateAmmo = (player) => {
  const x = player.pos.x;
  const y = player.pos.y - 1;
  const playerAmmo = player.ammo;
  playerAmmo.push({ x: x, y: y });
};

const stepAmmo = (playerAmmo) => {
  for (let i = 0; i < playerAmmo.length; i++) {
    playerAmmo[i].y--;
  }
};

const stepEnemy = (enemyArr) => {
  for (let i = 0; i < enemyArr.length; i++) {
    enemyArr[i].y++;
  }
};

const drawMap = (height, width, player, enemyArr) => {
  const terkep = fillMap(generateMap(height, width));
  for (let sor = 0; sor < terkep.length; sor++) {
    for (let oszlop = 0; oszlop < terkep[sor].length; oszlop++) {
      if (player.pos.x === oszlop && player.pos.y === sor) {
        terkep[sor][oszlop] = 'P';
      }
      for (let i = 0; i < enemyArr.length; i++) {
        if (enemyArr[i].x === oszlop && enemyArr[i].y === sor) {
          terkep[sor][oszlop] = 'E';
        }
      }
      for (let i = 0; i < player.ammo.length; i++) {
        if (player.ammo[i].x === oszlop && player.ammo[i].y === sor) {
          terkep[sor][oszlop] = 'I';
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
  generateEnemy,
  stepEnemy,
  generateAmmo,
  stepAmmo
};
