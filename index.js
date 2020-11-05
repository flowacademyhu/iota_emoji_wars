const map = require('./map');
const move = require('./move');
const enemyModule = require('./enemy');
const ammoModule = require('./ammo');
const gameEnd = require('./gameEnd');
const menu = require('./menu');
const { playerChar } = require('./player');
// Pálya méretei
const height = 20;
const width = 10;
// max játékidő
let playTIme = 30;
const gameMode = 'time';

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
    enemyModule.stepEnemy(enemy, height, width);
    enemyModule.generateEnemy(width, enemy, enemyNum);
    playTIme--;
    console.log(playTIme);
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
    if (enemyModule.finalRow(enemy, height) || playTIme === 0) {
      console.clear();
      gameEnd.scoreboard(player.name, player.score, gameMode);
      process.exit(0);
    }
  }, 100);

  setInterval(() => {
    enemyNum++;
  }, 3000);

  // térkép generálás
  setInterval(() => {
    console.clear();
    map.drawMap(height, width, player, enemy, playerChar);
    gameEnd.drawHead(player.name, player.score, gameMode, playTIme, player.lifeNum);
  }, 200);

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
      console.clear();
      gameEnd.scoreboard(player.name, player.score, gameMode);
      menu.menu();
      process.exit(0);
    }
  });
};

player.name = menu.name;

module.exports = { main };
