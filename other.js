const menu = require('./menu');

const pauseMenu = () => {
  const menuItems = [
    'RESUME',
    'HIGHSCORES',
    'OPTIONS',
    'QUIT'
  ];
  const cursor = menu.writeMenu(menuItems);
  if (cursor === 0) {
    console.log('newgame');
  }
};

module.exports = {
  pauseMenu
};
