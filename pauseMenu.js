const menu = require('./menu');

const pauseMenu = (gameMode) => {
  const menuItems = [
    'RESUME',
    'HIGHSCORES',
    'OPTIONS',
    'QUIT'
  ];
  const cursor = menu.writeMenu(menuItems);
  if (cursor === 0) {
    return 0;
  }
  if (cursor === 1) {

  }
  if (cursor === 3) {
    process.exit(0);
  }
};

module.exports = {
  pauseMenu
};
