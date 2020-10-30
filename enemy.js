const move = require('./move');

const stepEnemy = (enemy, height) => {
  for (let i = 0; i < enemy.length; i++) {
    move.moveDown(enemy[i], height);
  }
};

const generateEnemy = (width, enemy, n) => {
  for (let i = 0; i < n; i++) {
    enemy.push({ x: Math.floor(Math.random() * (width - 2) + 1), y: 0 });
  }
};

const finalRow = (enemy, height) => {
  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i].y >= height - 1) {
      process.exit(0);
    }
  }
};

const deathEnemy = (enemy, player) => {
  const arr = [];
  const arr2 = [];
  for (let i = 0; i < enemy.length; i++) {
    let hit = false;
    for (let k = 0; k < player.ammo.length; k++) {
      if (enemy[i].x === player.ammo[k].x && enemy[i].y === player.ammo[k].y) {
        hit = true;
      }
    }
    if (!hit) {
      arr.push(enemy[i]);
    }
  }
  for (let i = 0; i < player.ammo.length; i++) {
    let hit = false;
    for (let k = 0; k < enemy.length; k++) {
      if (enemy[k].x === player.ammo[i].x && enemy[k].y === player.ammo[i].y) {
        hit = true;
      }
    }
    if (!hit) {
      arr2.push(player.ammo[i]);
    }
  }
  return {
    enemy: arr,
    player: arr2
  };
};

module.exports = {
  stepEnemy,
  generateEnemy,
  deathEnemy,
  finalRow
};
