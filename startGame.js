const menu = require('./menu');
const timeModeModule = require('./index');
const survivalModeModule = require('./survival');
const playerModule = require('./player');

// const menuBackData = menu.startGameMenu();
menu.startGameMenu();

if (playerModule.gameMode.gameM === 'time') {
  timeModeModule.main();
}
if (playerModule.gameMode.gameM === 'survival') {
  survivalModeModule.main();
}
