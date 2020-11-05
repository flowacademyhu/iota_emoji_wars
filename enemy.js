const move = require('./move');

const stepEnemy = (enemy, height) => {
  for (let i = 0; i < enemy.length; i++) {
    move.moveDown(enemy[i], height);
  }
};




const generateEnemy = (width, enemy, n) => {
  for (let i = 0; i < n; i++) {
    objectEnemy = { x: Math.floor(Math.random() * (width - 2) + 1), y: 0 }
while (checkEnemyPos(enemy, objectEnemy)) {
  objectEnemy = { x: Math.floor(Math.random() * (width - 2) + 1), y: 0 }
}
enemy.push(objectEnemy);
  }
};

const checkEnemyPos = (enemy, objectEnemy) => {
  for (i = 0; i < enemy.length; i++) {
    if (objectEnemy.x === enemy[i].x && objectEnemy.y === enemy[i].y) {
      return true
    }
  }
  return false
}














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
