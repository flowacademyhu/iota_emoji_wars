const CFonts = require('cfonts');
const readlineSync = require('readline-sync');

const emojiWars = () => {
  CFonts.say('EMOJI|WARS!', {
    font: 'block', // define the font face
    align: 'center', // define text alignment
    colors: ['red', 'blue', 'green'], // define all colors
    background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1, // define letter spacing
    lineHeight: 1, // define the line height
    space: true, // define if the output text should have empty lines on top and on the bottom
    maxLength: '0', // define how many character can be on one line
    gradient: ['red', 'blue'], // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: true, // define if this is a transition between colors directly
    env: 'node' // define the environment CFonts is being executed in
  });
};

const letterConfig = {
  font: 'tiny', // define the font face
  align: 'center', // define text alignment
  colors: ['red', 'blue', 'green'], // define all colors
  background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 1, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: '0', // define how many character can be on one line
  gradient: false, // define your two gradient colors
  independentGradient: false, // define if you want to recalculate the gradient for each new line
  transitionGradient: true, // define if this is a transition between colors directly
  env: 'node' // define the environment CFonts is being executed in
};

const choosedWordConfig = {
  ont: 'tiny', // define the font face
  align: 'center', // define text alignment
  colors: ['red', 'blue', 'green'], // define all colors
  background: 'transparent', // define the background color, you can also use `backgroundColor` here as key
  letterSpacing: 2, // define letter spacing
  lineHeight: 1, // define the line height
  space: true, // define if the output text should have empty lines on top and on the bottom
  maxLength: '0', // define how many character can be on one line
  gradient: ['red', 'blue'], // define your two gradient colors
  independentGradient: false, // define if you want to recalculate the gradient for each new line
  transitionGradient: true, // define if this is a transition between colors directly
  env: 'node' // define the environment CFonts is being executed in
};

const writeMenu = (menuNamesArr) => {
  let cursor = 0;
  while (true) {
    const key = readlineSync.keyIn();
    console.clear();
    emojiWars();
    if (key === 'd') {
      break;
    }
    if (key === 's' && cursor < menuNamesArr.length - 1) {
      cursor++;
      console.log(cursor);
    } else if (key === 'w' && cursor > 0) {
      cursor--;
      console.log(cursor);
    }
    for (let i = 0; i < menuNamesArr.length; i++) {
      if (i === cursor) {
        CFonts.say(menuNamesArr[i], choosedWordConfig);
      } else {
        CFonts.say(menuNamesArr[i], letterConfig);
      }
    }
  }
  return cursor;
};

const startGameMenu = () => {
  const menuItems = [
    'NEW GAME',
    'HIGHSCORES',
    'OPTIONS',
    'QUIT'
  ];

  const cursor = writeMenu(menuItems);
  if (cursor === 0) {
    return newGameMenu();
  }
};

const newGameMenu = () => {
  const menuItems = [
    'TIME MODE',
    'SURVIVAL MODE'
  ];
  const name = readlineSync.question(CFonts.say('Mi a neved?', choosedWordConfig));
  const cursor = writeMenu(menuItems);
  if (cursor === 0) {
    return {
      name: name,
      gameMode: 'time'
    };
  } else if (cursor === 1) {
    return {
      name: name,
      gameMode: 'survival'
    };
  }
};

module.exports = {
  startGameMenu
};
