const menu = require('./menu');
const timeModeModule = require('./timeMode');
const survivalModeModule = require('./survivalMode');
const playerModule = require('./player');

// const menuBackData = menu.startGameMenu();
menu.startGameMenu();

if (playerModule.gameMode.gameM === 'time') {
  timeModeModule.main();
}
if (playerModule.gameMode.gameM === 'survival') {
  survivalModeModule.main();
}
