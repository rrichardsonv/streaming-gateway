const fs = require('fs');
const utilities = require('../utilities');

module.exports = function(req, res) {
  const path = utilities.getFilePath(req.params.id, 'image');
  const stat = fs.statSync(path);
  const fileSize = stat.size;

  const head = {
    'Content-Length': fileSize,
    'Content-Type': 'image/png',
  };
  res.writeHead(200, head);
  fs.createReadStream(path).pipe(res);
};
