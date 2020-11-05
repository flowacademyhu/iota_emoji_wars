const move = require('./move');

const stepEnemy = (enemy, height, width) => {
  for (let i = 0; i < enemy.length; i++) {
    move.moveDown(enemy[i], height);
    if (enemy[i].z === 0) {
      move.moveRight(enemy[i], width)
      enemy[i].z = 1
    } else {
      move.moveLeft(enemy[i])
      enemy[i].z = 0
    }
  }
};

const generateEnemy = (width, enemy, n) => {
  for (let i = 0; i < n; i++) {
    enemy.push({ x: Math.floor(Math.random() * (width - 3) + 1), y: 1 , z: 0 });
  }
};

const finalRow = (enemy, height) => {
  for (let i = 0; i < enemy.length; i++) {
    if (enemy[i].y >= height - 1) {
      return true;
    }
  }
};

// const deathEnemy = (enemy, player) => {
const compareCordinates = (objOne, objTwo) => {
  const arr = [];
  let score = 0;
  for (let i = 0; i < objOne.length; i++) {
    let hit = false;
    for (let k = 0; k < objTwo.length; k++) {
      if (objOne[i].x === objTwo[k].x && objOne[i].y === objTwo[k].y) {
        hit = true;
        score++;
      }
    }
    if (!hit) {
      arr.push(objOne[i]);
    }
  }
  return {
    arr,
    score
  };
};

module.exports = {
  stepEnemy,
  generateEnemy,
  compareCordinates,
  // deathEnemy,
  finalRow

};
