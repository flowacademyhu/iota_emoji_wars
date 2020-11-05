const CFonts = require('cfonts');
const readlineSync = require('readline-sync');
const playerModul = require('./player');

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
  let key;
  while (true) {
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
    key = readlineSync.keyIn();
  }
  return cursor;
};

const writeMenuForOptions = (menuNamesArr) => {
  let cursor = 0;
  let key;
  while (true) {
    console.clear();
    emojiWars();
    if (key === 'd') {
      break;
    }
    if (key === 's' && cursor < menuNamesArr.length - 1) {
      cursor++;
    } else if (key === 'w' && cursor > 0) {
      cursor--;
    }
    for (let i = 0; i < menuNamesArr.length; i++) {
      if (i === cursor) {
        console.log(menuNamesArr[i], '  <');
      } else {
        console.log(menuNamesArr[i]);
      }
    }
    key = readlineSync.keyIn();
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
  } else if (cursor === 2) {
    optionsMenu();
  } else if (cursor === 3) {
    process.exit();
  }
};

const optionsMenu = () => {
  const menuItems = [
    'Character',
    'Enemy',
    'Back'
  ];
  const cursor = writeMenu(menuItems);
  if (cursor === 0) {
    characterMenu();
  } else if (cursor === 1) {
    enemyMenu();
  } else if (cursor === 2) {
    startGameMenu();
  }
};

const characterMenu = () => {
  const players = [
    '😀',
    '😂',
    '🤩',
    '😷',
    '😎',
    '😠'
  ];
  const cursor = writeMenuForOptions(players);
  if (cursor === 0) {
    playerModul.player.playerChar = players[0];
    optionsMenu();
  } else if (cursor === 1) {
    playerModul.player.playerChar = players[1];
    optionsMenu();
  } else if (cursor === 2) {
    playerModul.player.playerChar = players[2];
    optionsMenu();
  } else if (cursor === 3) {
    playerModul.player.playerChar = players[3];
    optionsMenu();
  } else if (cursor === 4) {
    playerModul.player.playerChar = players[4];
    optionsMenu();
  } else if (cursor === 5) {
    playerModul.player.playerChar = players[5];
    optionsMenu();
  }
};

const enemyMenu = () => {
  const enemys = [
    '👽',
    '👾',
    '👻',
    '👁️',
    '🧚',
    '🩲'
  ];
  const cursor = writeMenuForOptions(enemys);
  if (cursor === 0) {
    optionsMenu();
    return {
      enemyChar: enemys[0]
    };
  } else if (cursor === 1) {
    optionsMenu();
    return {
      enemyChar: enemys[1]
    };
  } else if (cursor === 2) {
    optionsMenu();
    return {
      enemyChar: enemys[2]
    };
  } else if (cursor === 3) {
    optionsMenu();
    return {
      enemyChar: enemys[3]
    };
  } else if (cursor === 4) {
    optionsMenu();
    return {
      enemyChar: enemys[4]
    };
  } else if (cursor === 5) {
    optionsMenu();
    return {
      enemyChar: enemys[5]
    };
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
    playerModul.player.name = name;
    playerModul.gameMode = 'time';
  } else if (cursor === 1) {
    playerModul.player.name = name;
    playerModul.gameMode = 'survival';
  }
};

module.exports = {
  startGameMenu,
  writeMenu,
  optionsMenu
};
