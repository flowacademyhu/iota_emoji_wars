const { drawMap } = require('./map');
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

const enemyNum = 5;

// const generatedMap = map.generateMap(height, width);
// const filledMap = map.fillMap(generatedMap, player);

const main = () => {
  const generatedMap = map.generateMap(height, width);
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.resume();
  stdin.setEncoding('utf8');
  stdin.on('data', (key) => {
    // console.clear();
    const filledMap = map.fillMap(generatedMap, player);
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
    // console.clear();
    const addedEnemy = map.addEnemy(filledMap, enemyNum);
    const fallEnemy = map.falling(addedEnemy);
    drawMap(fallEnemy);
  });
};

main();
