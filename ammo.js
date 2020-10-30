const move = require('./move');

const generatePlayerAmmo = (player) => {
  const x = player.pos.x;
  const y = player.pos.y;
  const playerAmmo = player.ammo;
  playerAmmo.push({ x: x, y: y });
};

const stepPlayerAmmo = (player) => {
  for (let i = 0; i < player.ammo.length; i++) {
    move.moveUp(player.ammo[i]);
  }
};

module.exports = {
  generatePlayerAmmo,
  stepPlayerAmmo
};
