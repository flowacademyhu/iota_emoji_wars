const fs = require('fs');
const { table, getBorderCharacters } = require('table');
const timeScoreFile = require('./timeScoreboard.json');
const scoreSurvivalFile = require('./survivalScoreboard.json');

const writeFile = (obj, gameMode) => {
  let jsonFile;
  const data = JSON.stringify(obj);
  if (gameMode === 'time') {
    jsonFile = 'timeScoreboard.json';
  } else if (gameMode === 'survival') {
    jsonFile = 'survivalScoreboard.json';
  }
  fs.writeFileSync(jsonFile, data);
};

const writeOutScoreboard = (dataTable, playerScore, playerName, gameMode) => {
  const dataArr = [];

  // az objekt tömbberendezése módosításhoz
  for (let i = 0; i < dataTable.length; i++) {
    dataArr[i] = [];
    dataArr[i][0] = dataTable[i].name;
    dataArr[i][1] = dataTable[i].score;
    dataArr[i][2] = dataTable[i].datum;
  }
  // sorba rendezés
  for (let i = dataArr.length - 1; i > 0; i--) {
    for (let k = 0; k < i; k++) {
      if (dataArr[k][1] < dataArr[k + 1][1]) {
        const temp = dataArr[k];
        dataArr[k] = dataArr[k + 1];
        dataArr[k + 1] = temp;
      }
    }
  }
  const top10 = [['Név', 'Eredmény', 'Dátum']];
  for (let i = 1; i < 11; i++) {
    if (dataArr[i - 1] !== undefined) {
      top10[i] = dataArr[i - 1];
    }
  }

  const config = {
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 0,
      width: 30,
      alignment: 'center'
    },
    border: getBorderCharacters('honeywell')
  };
  const writeScore = [['A JÁTÉK VÉGE'], ['AZ ÖN EREDMÉNYE'], [playerName], [playerScore]];
  console.log(table(writeScore, {
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 0,
      width: 90,
      alignment: 'center'
    },
    singleLine: true
  }));
  const title = [['HIGHSCORES'], [gameMode]];
  const output = table(top10, config);
  console.log(table(title, {
    columns: {
      0: {
        alignment: 'center',
        width: 90
      },
      singleLine: true
    }
  }));
  console.log(output);
};

const scoreboard = (playerName, playerScore, gameMode) => {
  let jsonFile;
  if (gameMode === 'time') {
    jsonFile = timeScoreFile;
  } else if (gameMode === 'survival') {
    jsonFile = scoreSurvivalFile;
  }
  const exportData = jsonFile;
  const d = new Date();
  let datum = '';
  datum += d.getFullYear();
  datum += d.getMonth();
  datum += d.getDate();
  jsonFile.push({ name: playerName, score: playerScore, datum: datum });
  writeFile(exportData, gameMode);
  writeOutScoreboard(exportData, playerScore, playerName);
};

const drawHead = (playerName, playerScore, gameMode, time, life) => {
  const arr = [];
  arr[0] = [];
  arr[1] = [];
  arr[0][0] = 'Játékos: ';
  arr[1][0] = playerName;
  arr[0][1] = 'Pontszám';
  arr[1][1] = playerScore;
  arr[0][2] = 'Játék mód: ';
  if (gameMode === 'time') {
    arr[1][2] = 'TIME MODE';
    arr[0][3] = 'Hátralévő idő: ';
    arr[1][3] = time;
  } else if (gameMode === 'survival') {
    arr[1][2] = 'SURVIVAL MODE';
    arr[0][3] = 'Hátralévő élet: ';
    if (life === 3) {
      arr[1][3] = '❤️ ❤️ ❤️';
    } else if (life === 2) {
      arr[1][3] = '❤️ ❤️';
    } else if (life === 1) {
      arr[1][3] = '❤️';
    }
  }
  console.log(table(arr, {
    columnDefault: {
      paddingLeft: 0,
      paddingRight: 0,
      width: 22,
      alignment: 'center'
    },
    singleLine: true
  }));
};

module.exports = {
  writeFile,
  scoreboard,
  drawHead
};
