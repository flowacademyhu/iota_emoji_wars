const map = require('./map');
const move = require('./move');
const enemyModule = require('./enemy');
const ammoModule = require('./ammo');
const gameEnd = require('./gameEnd');
const menu = require('./menu');
const pauseMenu = require('./pauseMenu');

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
  name: '',
  lifeNum: 3
};

let time = 0;
let enemy = [];

let enemyNum = 1;
let timeGenerateAndStepEnemy = 1000;
const gameMode = 'survival';

const main = () => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  // játékmenet nehezítés
  setInterval(() => {
    timeGenerateAndStepEnemy -= 100;
  }, 3000);

  // idő számlálás
  setInterval(() => {
    time++;
  }, 1000);
  // generate enemy
  setInterval(() => {
    enemyModule.stepEnemy(enemy, height);
    enemyModule.generateEnemy(width, enemy, enemyNum);
  }, timeGenerateAndStepEnemy);

  setInterval(() => {
    // játékos lövedékének léptetése
    ammoModule.stepPlayerAmmo(player);
    // játékos lövedékének és az enemy pozíciójának összehasonlítása
    const newPlayer = enemyModule.compareCordinates(player.ammo, enemy);
    const newEnemy = enemyModule.compareCordinates(enemy, player.ammo).arr;
    // adatátadás
    enemy = newEnemy;
    player.ammo = newPlayer.arr;
    player.score += newPlayer.score;
    if (enemyModule.finalRow(enemy, height)) {
      player.lifeNum--;
      enemy = [];
      if (player.lifeNum === 0) {
        console.clear();
        gameEnd.scoreboard(player.name, player.score, gameMode);
        process.exit(0);
      }
    }
  }, 100);

  // enemy számának növelése
  setInterval(() => {
    enemyNum++;
  }, 3000);

  const button = (key) => {
    console.log(key);
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
    if (key === 's') {
      ammoModule.generatePlayerAmmo(player); // lövés az s gombbal
    }

    if (key === 'q') {
      console.clear();
      gameEnd.scoreboard(player.name, player.score, gameMode);
      process.stdin.removeAllListeners('data');
      process.stdin.removeAllListeners('keypress');
      process.stdin.setRawMode(false);
      process.stdin.resume();
      process.stdin.end();
      pauseMenu.pauseMenu();
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
      stdin.on('data', button);
    }
  };

  // térkép generálás
  setInterval(() => {
    console.clear();
    map.drawMap(height, width, player, enemy);
    gameEnd.drawHead(player.name, player.score, gameMode, time, player.lifeNum);
  }, 200);

  // játékos irányítása
  stdin.setEncoding('utf8');
  stdin.on('data', button);
  // stdin.on('data', (key) => {
  //   if (key === 'd') {
  //     if (player.pos.x < width - 2) {
  //       move.moveRight(player.pos, width);
  //     }
  //   }
  //   if (key === 'a') {
  //     if (player.pos.x > 1) {
  //       move.moveLeft(player.pos);
  //     }
  //   }
  //   if (key === 's') {
  //     ammoModule.generatePlayerAmmo(player); // lövés az s gombbal
  //   }

  //   if (key === 'q') {
  //     console.clear();
  //     gameEnd.scoreboard(player.name, player.score, gameMode);
  //     console.log(stdin.eventNames());
  //     stdin.removeAllListeners('data');
  //     console.log(stdin.eventNames());
  //     stdin.removeAllListeners('end');
  //     console.log(stdin.eventNames());
  //     stdin.removeAllListeners('pause');
  //   }
  // });
};

// játékos nevének importálása
player.name = menu.name;

module.exports = {
  main
};
