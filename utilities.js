const path = require('path');

const FILE_EXTENSIONS = {
  image: '.png',
  video: '.webv',
};

const getFilePath = function(name, fileType) {
  const fileName = [name, FILE_EXTENSIONS[fileType]].join('.');
  return path.join(__dirname, 'recordings', name);
};

const getVideoPath = function(name) {
  return `${getFilePath(name)}.webv`;
};

const getMetaDataPath = function(name) {
  return `${getFilePath(name)}.json`;
};

const getAssetManifest = function() {
  return path.join(__dirname, 'recordings', 'manifest.csv');
};

module.exports = {
  getFilePath: getFilePath,
  getVideoPath: getVideoPath,
  getMetaDataPath: getMetaDataPath,
  getAssetManifest: getAssetManifest,
};
