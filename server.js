'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes');

const contentSecurityPolicyMiddleware = function(req, res, next) {
  res.setHeader('Content-Security-Policy', "media-src 'self' http://localhost:8000");
  return next();
};

app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:8000'] }));
app.use(contentSecurityPolicyMiddleware);
app.use(routes);

app.listen(6001, function() {
  console.log('Simple server started on port 6001');
});
