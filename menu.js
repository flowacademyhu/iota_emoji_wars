var term = require('terminal-kit').terminal;
term.cyan('EMOJI WARS \n');
const readlineSync = require('readline-sync');

var items = [
  'START',
  'Options',
  'Exit'
];
const name = readlineSync.question('Mi a neved?');
console.log('Hello', name);

term.singleColumnMenu(items, function (error, response) {
  term('\n').eraseLineAfter.green;
  if (response.selectedText === 'START') {
    require('./index');
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
