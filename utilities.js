const path = require('path');

const FILE_EXTENSIONS = {
  image: 'png',
  video: 'webv',
  metaData: 'json',
};

const appendExt = function(path, fileType) {
  return `${path}.${FILE_EXTENSIONS[fileType]}`;
};

const getFilePath = function(name, fileType) {
  return appendExt(path.join(__dirname, 'recordings', name), fileType);
};

const getVideoPath = function(name) {
  return getFilePath(name, 'video');
};

const getMetaDataPath = function(name) {
  return getFilePath(name, 'metaData');
};

const getThumbnailPath = function(name) {
  return getFilePath(name, 'image');
};

const getAssetManifest = function() {
  return path.join(__dirname, 'recordings', 'manifest.csv');
};

const getThumbUrl = function(id) {
  return `http://localhost:6001/thumbs/${id}`;
};

const getVideoUrl = function(id) {
  return `http://localhost:6001/videos/${id}`;
};

module.exports = {
  getFilePath: getFilePath,
  getVideoPath: getVideoPath,
  getMetaDataPath: getMetaDataPath,
  getAssetManifest: getAssetManifest,
  getThumbUrl: getThumbUrl,
  getVideoUrl: getVideoUrl,
};
