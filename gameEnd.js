const fs = require('fs');
const { table, getBorderCharacters } = require('table');
const scoreFile = require('./scoreboard.json');

const writeFile = (obj) => {
  const data = JSON.stringify(obj);
  fs.writeFileSync('scoreboard.json', data);
};

const writeOutScoreboard = (dataTable, playerScore, playerName) => {
  const d = new Date();
  console.log(d.getDate());
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
    top10[i] = dataArr[i - 1];
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
  const title = [['HIGHSCORES']];
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

const scoreboard = (playerName, playerScore) => {
  const exportData = scoreFile;
  const d = new Date();
  let datum = '';
  datum += d.getFullYear();
  datum += d.getMonth();
  datum += d.getDate();
  scoreFile.push({ name: playerName, score: playerScore, datum: datum });
  writeFile(exportData);
  writeOutScoreboard(exportData, playerScore, playerName);
};

module.exports = {
  writeFile,
  scoreboard
};
