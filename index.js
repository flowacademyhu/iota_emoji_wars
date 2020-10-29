const map = require('./map');
const move = require('./move');
const enemyModule = require('./enemy');
const ammoModule = require('./ammo');

// Pálya méretei
const height = 20;
const width = 50;

const player = {
  pos: {
    x: Math.floor(width / 2),
    y: height - 1
  },
  ammo: []
};
let enemy = [];

const enemyNum = 5;

const main = () => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  // enemy generalás
  setInterval(() => {
    ammoModule.generatePlayerAmmo(player);
    ammoModule.stepPlayerAmmo(player);
    const asd = enemyModule.deathEnemy(enemy, player);
    player.ammo = asd.player;
    enemy = asd.enemy;
    enemyModule.stepEnemy(enemy, height);
    enemyModule.generateEnemy(width, enemy, enemyNum);
  }, 1000);

  // térkép generálás
  setInterval(() => {
    console.clear();
    map.drawMap(height, width, player, enemy);
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
      process.exit(0);
    }
  });
};

main();
