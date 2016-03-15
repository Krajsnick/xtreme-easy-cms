var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var mongoose = require('mongoose');

var routes = require('./routes/index');

var app = express();

// Database
mongoose.connect('mongodb://localhost/xtreme-easy-cms');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(function(req, res, next) {
  // TODO Middleware manipulate request or response objects
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false, limit: '250kb' }));
app.use(cookieParser());
app.use(stylus.middleware({
  src: path.join(__dirname, 'views'),
  dest: path.join(__dirname, 'public'),
  compile: function(str, path) {
    return stylus(str)
    .set('filename', path)
    .use(require('jeet')())
    .use(require('rupture')())
    .import('jeet')
  }
}));
app.use(express.static(path.join(__dirname, 'public')));

//app.locals.articles = [{slug: "test1"}, {slug: "test2"}];

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
      requestedURL: req.url
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
    requestedURL: req.url
  });
});

module.exports = app;
