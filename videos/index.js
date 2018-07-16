const fs = require('fs');
const utilities = require('../utilities');

getLines = string => {
  return string
    .split('\n')
    .map(l => l.split(','))
    .map(([id, type, duration]) => ({
      id,
      type,
      duration,
      thumb_url: utilities.getThumbUrl(id),
      video_url: utilities.getVideoUrl(id),
    }));
};

module.exports = function(_, res) {
  const lines = fs.readFile(utilities.getAssetManifest(), function(err, data) {
    if (err) {
      res.status(500);
      res.end();
    }
    res.status(200);
    res.end(JSON.stringify({ lines: getLines(data.toString()) }));
  });
};
