const menu = require('./bin/menu');
const timeModeModule = require('./bin/timeMode');
const survivalModeModule = require('./bin/survivalMode');
const playerModule = require('./bin/player');

// const menuBackData = menu.startGameMenu();
menu.startGameMenu();

if (playerModule.gameMode.gameM === 'time') {
  timeModeModule.main();
}
if (playerModule.gameMode.gameM === 'survival') {
  survivalModeModule.main();
}
