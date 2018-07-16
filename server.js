'use strict';

const express = require('express');
const httpServer = require('http').Server;
const socketIO = require('socket.io');
const fs = require('fs');
const path = require('path');
const routes = require('./routes');
const uploadHandlers = require('./handlers/upload');
const middleware = require('./middleware');
// const ffmpeg = require('fluent-ffmpeg');
const cors = require('cors');

const app = express();
const http = httpServer(app);
const io = socketIO();

io.serveClient(false);
io.attach(http);

app.use(cors({ origin: ['*'] }));
app.use(middleware.contentSecurityPolicy);
app.use(middleware.requestLogging);

app.use(routes);

io.of('/uploads')
  .on('connection', function(socket) {
    console.log('connection established');
    socket.on('uploadstart', uploadHandlers.start);
    socket.on('upload', uploadHandlers.uploading);
    socket.on('uploadend', uploadHandlers.end);
  })
  .on('disconnection', function() {
    console.log('connection ended');
  });

http.listen(6001, function() {
  console.log('Simple server started on port 6001');
});
