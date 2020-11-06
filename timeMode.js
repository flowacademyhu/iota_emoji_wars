const map = require('./map');
const move = require('./move');
const enemyModule = require('./enemy');
const ammoModule = require('./ammo');
const gameEnd = require('./gameEnd');
const menu = require('./menu');
const playerModul = require('./player');
// Pálya méretei
const height = 20;
const width = 10;
// max játékidő
let playTIme = 30;
const player = playerModul.player;
const enemyChar = playerModul.enemyChar;
const ammoChar = playerModul.ammoChar;

let enemy = [];

let enemyNum = 1;
const timeGenerateAndStepEnemy = 1000;
const gameMode = 'survival';

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
  }, timeGenerateAndStepEnemy);
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
  setInterval(() => {
    console.clear();
    map.drawMap(height, width, player, enemy, playerModul.player.playerChar, enemyChar.enemyC, ammoChar.ammoC);
    gameEnd.drawHead(player.name, player.score, gameMode, playTIme, player.lifeNum);
  }, 200);
  stdin.setEncoding('utf8');
  stdin.on('data', button);
};

player.name = menu.name;

module.exports = { main };
