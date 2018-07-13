const fs = require('fs');

const getFileName = function() {
  // return `../assets/videos/${(function() {
  //   return new Date().getTime();
  // })()}.webm`;
  return 'test.webm';
};

module.exports = function(req, res) {
  console.log(req.socket.read());
  // const fileName = getFileName();
  // fs.writeFileSync(fileName, '');
  // const writeStream = fs.createWriteStream(fileName);
  // req.socket._readableState.pipe(writeStream);
  // res.send('Im a create route');
};
