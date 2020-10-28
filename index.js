const { drawMap } = require('./map');
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
  drawMap(height, width);
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
