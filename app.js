var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('express-session');//使用session需要使用这个模块
var cookieParser = require('cookie-parser');//session需要cookie-parser这个模块
var mongoStore = require('connect-mongo')(session);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
var dbUrl = 'mongodb://127.0.0.1:27017/test1';
// view engine setup
app.set('views', path.join(__dirname,'./app/views'));
app.set('view engine', 'jade');
mongoose.connect(dbUrl);
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.locals.moment = require('moment');
app.use(logger('dev'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'test',
    store: new mongoStore({
      url: dbUrl,
      collection: 'sessions'
    })
}));
app.use(express.static(path.join(__dirname, 'public')));

require('./config/routes')(app);

app.listen(4000);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//判断线上环境和开发环境是否一致,打印数据库操作日志
if (app.get('env') === 'development') {
  app.set('showStackError',true);
  app.use(logger(':method :url :status'));
  app.locals.pretty = true;
  mongoose.set('debug',true);
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
