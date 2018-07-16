const fs = require('fs');
const utilities = require('../utilities');

function createFile(filePath) {
  try {
    fs.createWriteStream(filePath).end();
  } catch (err) {
    console.error('error in createFile for', filePath);
    throw err;
  }
}

function handleUploadStart(msg) {
  const vidFile = createFile(utilities.getFilePath(msg.name));
  const metaFile = createFile(utilities.getMetaDataPath(msg.name));
  // const thumbFile = createFile(utilities.getThumbPath(msg.name));

  if (!vidFile) {
    console.error('video file not created');
    return false;
  }

  if (!metaFile) {
    console.warn('metadata file not created');
  }

  return true;
}

function handleUploading(msg) {
  fs.appendFile(utilities.getVideoPath(msg.name), new Buffer(msg.data), function(err) {
    console.error(err);
  });

  fs.appendFile((utilities.getMetaDataPath(msg.name), msg.metaData), function(err) {
    console.error(err);
  });
}

function handleUploadEnd(msg) {
  fs.appendFile(utilities.getAssetManifest(), `${[msg.name, msg.duration].join(',')}\n`, function(
    err
  ) {
    console.error(err);
  });
  console.log('upload finished');
}

module.exports = {
  start: handleUploadStart,
  uploading: handleUploading,
  end: handleUploadEnd,
};
