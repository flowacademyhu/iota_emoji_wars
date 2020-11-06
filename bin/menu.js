const CFonts = require('cfonts');
const readlineSync = require('readline-sync');
const playerModul = require('./player');
const gameEndModule = require('./gameEnd');

let pauseMenuFlag = false;

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
    } else if (key === 'w' && cursor > 0) {
      cursor--;
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
  } else if (cursor === 1) {
    highScoresMenu();
  }
  if (cursor === 2) {
    optionsMenu();
  } else if (cursor === 3) {
    process.exit();
  }
};

const highScoresMenu = () => {
  const menuItems = [
    'TIME MODE',
    'SURVIVAL MODE',
    'BACK'
  ];

  const cursor = writeMenu(menuItems);
  if (cursor === 0) {
    writeScoreBoardMenu('time');
  } else if (cursor === 1) {
    writeScoreBoardMenu('survival');
  } else if (cursor === 2) {
    if (pauseMenuFlag === true) {
      pauseMenu();
    } else {
      startGameMenu();
    }
  }
};

const writeScoreBoardMenu = (gameMode) => {
  let key;
  while (true) {
    console.clear();
    emojiWars();
    if (key === 'd') {
      highScoresMenu();
      break;
    }
    gameEndModule.scoreboard(playerModul.player.name, playerModul.player.score, gameMode);
    CFonts.say('BACK', choosedWordConfig);
    key = readlineSync.keyIn();
  }
};
// CFonts.say(menuNamesArr[i], choosedWordConfig);
// gameEndModule.scoreboard(playerModul.player.name, playerModul.player.score, gameMode);
const optionsMenu = () => {
  const menuItems = [
    'Character',
    'Enemy',
    'Ammo',
    'Back'
  ];
  const cursor = writeMenu(menuItems);
  if (cursor === 0) {
    characterMenu();
  } else if (cursor === 1) {
    enemyMenu();
  } else if (cursor === 2) {
    ammoMenu();
  } else if (cursor === 3) {
    if (pauseMenuFlag === true) {
      pauseMenu();
    } else {
      startGameMenu();
    }
  }
};

const pauseMenu = (gameMode) => {
  pauseMenuFlag = true;
  const menuItems = [
    'RESUME',
    'HIGHSCORES',
    'OPTIONS',
    'QUIT'
  ];
  const cursor = writeMenu(menuItems);
  if (cursor === 0) {
    return 0;
  }
  if (cursor === 1) {
    highScoresMenu();
  }
  if (cursor === 2) {
    optionsMenu();
  }
  if (cursor === 3) {
    process.exit(0);
  }
};

const characterMenu = () => {
  const players = [
    '😀',
    '😁',
    '😇',
    '👨‍🚀',
    '🤯',
    '😠',
    '😷'
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
  } else if (cursor === 6) {
    playerModul.player.playerChar = players[6];
    optionsMenu();
  }
};

const enemyMenu = () => {
  const enemys = [
    '👽',
    '💀',
    '👾',
    '👻',
    '🧚',
    '🩲',
    '🚽',
    '😈',
    '🤧'
  ];
  const cursor = writeMenuForOptions(enemys);
  if (cursor === 0) {
    playerModul.enemyChar.enemyC = enemys[0];
    optionsMenu();
  } else if (cursor === 1) {
    playerModul.enemyChar.enemyC = enemys[1];
    optionsMenu();
  } else if (cursor === 2) {
    playerModul.enemyChar.enemyC = enemys[2];
    optionsMenu();
  } else if (cursor === 3) {
    playerModul.enemyChar.enemyC = enemys[3];
    optionsMenu();
  } else if (cursor === 4) {
    playerModul.enemyChar.enemyC = enemys[4];
    optionsMenu();
  } else if (cursor === 5) {
    playerModul.enemyChar.enemyC = enemys[5];
    optionsMenu();
  } else if (cursor === 6) {
    playerModul.enemyChar.enemyC = enemys[6];
    optionsMenu();
  } else if (cursor === 7) {
    playerModul.enemyChar.enemyC = enemys[7];
    optionsMenu();
  } else if (cursor === 8) {
    playerModul.enemyChar.enemyC = enemys[8];
    optionsMenu();
  }
};

const ammoMenu = () => {
  const players = [
    '🔺',
    '🤖',
    '💩',
    '🩸',
    '👌',
    '✨',
    '💊'
  ];
  const cursor = writeMenuForOptions(players);
  if (cursor === 0) {
    playerModul.ammoChar.ammoC = players[0];
    optionsMenu();
  } else if (cursor === 1) {
    playerModul.ammoChar.ammoC = players[1];
    optionsMenu();
  } else if (cursor === 2) {
    playerModul.ammoChar.ammoC = players[2];
    optionsMenu();
  } else if (cursor === 3) {
    playerModul.ammoChar.ammoC = players[3];
    optionsMenu();
  } else if (cursor === 4) {
    playerModul.ammoChar.ammoC = players[4];
    optionsMenu();
  } else if (cursor === 5) {
    playerModul.ammoChar.ammoC = players[5];
    optionsMenu();
  } else if (cursor === 6) {
    playerModul.ammoChar.ammoC = players[6];
    optionsMenu();
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
    playerModul.gameMode.gameM = 'time';
  } else if (cursor === 1) {
    playerModul.player.name = name;
    playerModul.gameMode.gameM = 'survival';
  }
};

module.exports = {
  startGameMenu,
  writeMenu,
  optionsMenu,
  pauseMenu,
  writeScoreBoardMenu
};
