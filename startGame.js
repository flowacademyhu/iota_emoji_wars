const menu = require('./menu');
const timeModeModule = require('./index');
const survivalModeModule = require('./survival');

  const menuBackData = menu.startGameMenu();


if (menuBackData.gameMode === 'time') {
  timeModeModule.main();
}
if (menuBackData.gameMode === 'survival') {
  survivalModeModule.main();
};
