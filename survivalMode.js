const map = require('./map');
const move = require('./move');
const enemyModule = require('./enemy');
const ammoModule = require('./ammo');
const gameEnd = require('./gameEnd');
const menu = require('./menu');
const playerModul = require('./player');

// Pálya méretei
const height = playerModul.height;
const width = playerModul.width;

const player = playerModul.player;
const enemyChar = playerModul.enemyChar;
const ammoChar = playerModul.ammoChar;

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
    enemyModule.stepEnemy(enemy, height, width);
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
      process.stdin.removeAllListeners('data');
      process.stdin.removeAllListeners('keypress');
      process.stdin.setRawMode(false);
      process.stdin.resume();
      process.stdin.end();
      menu.pauseMenu();
      stdin.setRawMode(true);
      stdin.resume();
      stdin.setEncoding('utf8');
      stdin.on('data', button);
    }
  };

  // térkép generálás
  setInterval(() => {
    console.clear();
    map.drawMap(height, width, player, enemy, playerModul.player.playerChar, enemyChar.enemyC, ammoChar.ammoC);
    gameEnd.drawHead(player.name, player.score, gameMode, time, player.lifeNum);
  }, 200);

  // játékos irányítása
  stdin.setEncoding('utf8');
  stdin.on('data', button);
};

// játékos nevének importálása
player.name = menu.name;

module.exports = {
  main
};
