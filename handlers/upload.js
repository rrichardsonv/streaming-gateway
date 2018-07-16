const fs = require('fs');
const utilities = require('../utilities');

function createFile(filePath) {
  try {
    fs.createWriteStream(filePath).end();
    return true;
  } catch (err) {
    console.error('error in createFile for', filePath);
    return false;
  }
}

function handleUploadStart(msg) {
  const assetFile = createFile(utilities.getFilePath(msg.name, msg.fileType));
  let metaFile = null;
  if (!msg.noMeta) {
    metaFile = createFile(utilities.getMetaDataPath(msg.name));
  }

  if (!assetFile) {
    console.error(`${msg.fileType} file not created`);
    return false;
  }

  if (!metaFile) {
    console.log('metadata file not created');
  }

  return true;
}

function handleUploading(msg) {
  console.log(Object.keys(msg));
  const filePath = utilities.getFilePath(msg.name, msg.fileType);
  console.log(filePath);
  console.log(typeof filePath);
  fs.appendFile(filePath, new Buffer(msg.data), function(err) {
    console.error(err);
  });

  if (!msg.noMeta) {
    fs.appendFile(utilities.getMetaDataPath(msg.name), msg.metaData, function(err) {
      console.error(err);
    });
  }
}

function handleUploadEnd(msg) {
  if (!msg.notMeta) {
    fs.appendFile(
      utilities.getAssetManifest(),
      `${[msg.name, msg.fileType, msg.duration].join(',')}\n`,
      function(err) {
        console.error(err);
      }
    );
  }
  console.log('upload finished');
}

module.exports = {
  start: handleUploadStart,
  uploading: handleUploading,
  end: handleUploadEnd,
};
