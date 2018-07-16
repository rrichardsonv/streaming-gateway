const fs = require('fs');
const utilities = require('../utilities');

getLines = string => {
  string
    .split('\n')
    .map(l => l.split(','))
    .map(([id, duration]) => ({
      id,
      duration,
    }));
};

module.exports = function(_, res) {
  const lines = res.getLines(fs.readFileSync(utilities.getAssetManifest()));
  res.statusCode(200);
  res.end(JSON.stringify({ lines }));
};
