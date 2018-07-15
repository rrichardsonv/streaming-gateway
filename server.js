'use strict';

const express = require('express');
const httpServer = require('http').Server;
const socketIO = require('socket.io');
const fs = require('fs');
const path = require('path');

const cors = require('cors');
const routes = require('./routes');

const app = express();
const http = httpServer(app);
const io = socketIO();

io.serveClient(false);
io.attach(http);
io.origins(['localhost:*']);

const contentSecurityPolicyMiddleware = function(req, res, next) {
  res.setHeader('Content-Security-Policy', "media-src 'self' http://localhost:8000");
  return next();
};

app.use(cors({ origin: ['http://localhost:*'] }));
app.use(contentSecurityPolicyMiddleware);
app.use(routes);

const getFilePath = function(name) {
  return path.join(__dirname, 'assets', 'videos', `${name}.webv`);
};

io.of('/uploads').on('connection', function(socket) {
  console.log('connection established');
  socket.on('uploadstart', function(data) {
    const filePath = getFilePath(data.name);
    const wstream = fs.createWriteStream(filePath);
    wstream.close();
    console.log('created file at', filePath);
  });
  socket.on('upload', function(data) {
    const result = fs.appendFile(getFilePath(data.name), new Buffer(data.data));
    console.log('wrote to file with result:', result);
  });
  socket.on('uploadend', function(data) {
    console.log('upload finished');
  });
});

http.listen(6001, function() {
  console.log('Simple server started on port 6001');
});
