const menu = require('./menu');
const timeModeModule = require('./index');
const survivalModeModule = require('./survival');

const menuBackData = menu.startGameMenu();
console.log('LEFUTOTT');

if (menuBackData.gameMode === 'time') {
  timeModeModule.main();
}
if (menuBackData.gameMode === 'survival') {
  console.log(survivalModeModule.main());
}
