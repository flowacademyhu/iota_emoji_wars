var term = require('terminal-kit').terminal;
term.cyan('EMOJI WARS \n');
const readlineSync = require('readline-sync');

var items = [
  'GAME MODES',
  'Options',
  'Exit'
];
var items2 = [
  'TIME MODE',
  'SURVIVAL MODE'
];
const name = readlineSync.question('Mi a neved?');
console.log('Hello', name);

term.singleColumnMenu(items, function (error, response) {
  term('\n').eraseLineAfter.green;
  if (response.selectedText === 'GAME MODES') {
    term.singleColumnMenu(items2, function (error, response) {
      term('\n').eraseLineAfter.green;
      if (response.selectedText === 'TIME MODE') {
        term('\n').eraseLineAfter.green;
        require('./index');
      }
      if (response.selectedText === 'SURVIVAL MODE') {
        term('\n').eraseLineAfter.green;
        require('./survival');
      }
    });
  } else if (response.selectedText === 'Options') {
    console.log('NANANANAN');
    process.exit(0);
  } else if (response.selectedText === 'Exit') {
    console.log('VAKATAKA');
    process.exit(0);
  }
});

module.exports = {
  name
};
