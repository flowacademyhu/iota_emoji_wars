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
