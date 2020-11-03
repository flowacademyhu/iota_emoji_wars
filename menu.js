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

const menu = () => {
  term.singleColumnMenu(items, function (_error, response) {
    term('\n');
    if (response.selectedText === 'GAME MODES') {
      term.singleColumnMenu(items2, function (_error, response) {
        term('\n');
        if (response.selectedText === 'TIME MODE') {
          term('\n');
          require('./index');
        }
        if (response.selectedText === 'SURVIVAL MODE') {
          term('\n');
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
};

menu();

module.exports = {
  name,
  menu
};
