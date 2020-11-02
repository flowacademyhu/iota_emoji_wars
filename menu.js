var term = require('terminal-kit').terminal;
term.cyan('EMOJI WARS \n');

var items = [
  'START',
  'Options',
  'Exit'
];

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
