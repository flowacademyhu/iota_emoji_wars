const fs = require('fs');
const { table } = require('table');
const scoreFile = require('./scoreboard.json');

const writeFile = (obj) => {
  const data = JSON.stringify(obj);
  fs.writeFileSync('scoreboard.json', data);
};

const writeOutScoreboard = (dataTable) => {
  const d = new Date();
  console.log(d.getDate());
  const dataArr = [];

  for (let i = 0; i < dataTable.length; i++) {
    dataArr[i] = [];
    dataArr[i][0] = dataTable[i].name;
    dataArr[i][1] = dataTable[i].score;
    dataArr[i][2] = dataTable[i].datum;
  }

  const config = {
    columns: {
      0: {
        alignment: 'left',
        width: 10
      },
      1: {
        alignment: 'center',
        width: 10
      },
      2: {
        alignment: 'right',
        width: 10
      }
    }
  };

  const output = table(dataArr, config);

  console.log(output);
};

const scoreboard = (playerName, playerScore) => {
  const exportData = scoreFile;
  const d = new Date();
  let datum = '';
  datum += d.getFullYear();
  datum += d.getMonth();
  datum += d.getDate();
  console.log(datum);
  scoreFile.push({ name: playerName, score: playerScore, datum: datum });
  writeFile(exportData);
  console.log('Gratulálunk ', playerName, ',az Ön pontszáma: ', playerScore);
  writeOutScoreboard(exportData);
};

module.exports = {
  writeFile,
  scoreboard
};
