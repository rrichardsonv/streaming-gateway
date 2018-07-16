module.exports = {
  contentSecurityPolicy: function(_, res, next) {
    res.setHeader('Content-Security-Policy', "media-src 'self' *");
    return next();
  },

  requestLogging: function(req, _, next) {
    const reqLog = [req.method, req.path].join(' ');
    console.log(reqLog);
    next();
  },
};
