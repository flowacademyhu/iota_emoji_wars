
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
  lifeNum: 3,
  playerChar: '😀'
};
const gameMode = '';

module.exports = {
  height,
  width,
  player,
  gameMode
};
