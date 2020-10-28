const map = require('./map');

// Pálya méretei
const height = 20;
const width = 50;

const player = {
  pos: {
    x: height - 1,
    y: Math.floor(width / 2)
  }
};
const enemy = [];

const enemyNum = 5;

const main = () => {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  // enemy generalás
  setInterval(() => {
    map.stepEnemy(enemy);
    map.generateEnemy(width, enemy, enemyNum);
  }, 1000);

  // térkép generálás
  setInterval(() => {
    console.clear();
    map.drawMap(height, width, player, enemy);
  }, 200);

  stdin.setEncoding('utf8');
  stdin.on('data', (key) => {
    if (key === 'd') {
      if (player.pos.y < width - 2) {
        player.pos.y++;
      }
    }
    if (key === 'a') {
      if (player.pos.y > 1) {
        player.pos.y--;
      }
    }

    if (key === 'q') {
      process.exit(0);
    }
  });
};

main();
