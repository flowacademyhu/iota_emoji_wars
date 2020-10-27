const map = require('./map');

// Pálya méretei
const height = 20;
const width = 49;

const player = {
  pos: {
    x: height - 1,
    y: Math.floor(width / 2)
  }
};

map.drawMap(map.fillMap(map.generateMap(height, width), player));

const stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');
stdin.on('data', (key) => {
  console.clear();

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
  console.clear();
  map.drawMap(map.fillMap(map.generateMap(height, width), player));
});
