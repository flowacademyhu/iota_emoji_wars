const map = require('./map');
const move = require('./move');
const enemyModule = require('./enemy');
const ammoModule = require('./ammo');
const gameEnd = require('./gameEnd');
const readlineSync = require('readline-sync');
// Pálya méretei
const height = 20;
const width = 10;

const player = {
  pos: {
    x: Math.floor(width / 2),
    y: height - 1
  },
  ammo: [],
  score: 0,
  name: ''
};
let enemy = [];

let enemyNum = 1;

const main = () => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  // enemy generalás
  setInterval(() => {
    // ammoModule.generatePlayerAmmo(player);
    enemyModule.stepEnemy(enemy, height);
    enemyModule.generateEnemy(width, enemy, enemyNum);
  }, 1000);
  setInterval(() => {
    ammoModule.generatePlayerAmmo(player);
  }, 500);
  setInterval(() => {
    // léptetés
    ammoModule.stepPlayerAmmo(player);
    // összehasonlítás
    const newPlayer = enemyModule.compareCordinates(player.ammo, enemy);
    const newEnemy = enemyModule.compareCordinates(enemy, player.ammo).arr;
    // adatok átadása
    enemy = newEnemy;
    player.ammo = newPlayer.arr;
    player.score += newPlayer.score;
    if (player.score === 1 || enemyModule.finalRow(enemy, height)) {
      console.clear();
      gameEnd.scoreboard(player.name, player.score);
      process.exit(0);
    }
  }, 100);

  setInterval(() => {
    enemyNum++;
  }, 30000);

  // térkép generálás
  setInterval(() => {
    console.clear();
    map.drawMap(height, width, player, enemy);
    console.log('Pontszám:', player.score);
  }, 200);

  if (player.score > 10) {
    console.clear();
    console.log('Game over az Ön pontszáma: ', player.score);
  }

  stdin.setEncoding('utf8');
  stdin.on('data', (key) => {
    if (key === 'd') {
      if (player.pos.x < width - 2) {
        move.moveRight(player.pos, width);
      }
    }
    if (key === 'a') {
      if (player.pos.x > 1) {
        move.moveLeft(player.pos);
      }
    }

    if (key === 'q') {
      process.exit(0);
    }
  });
};

player.name = readlineSync.question('Mi a neved?');

module.exports = main();


