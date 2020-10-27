const map = require('./map');

const height = 20;
const width = 30;

map.drawMap(map.fillMap(map.generateMap(height, width)));
