var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// session part
var session = require('express-session');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var readRouter = require('./routes/read');
var writeRouter = require('./routes/write');
var updateRouter = require('./routes/update');
var searchRouter = require('./routes/search');
var show_memberRouter = require('./routes/show_member');
var show_normalRouter = require('./routes/show_normal');
var deleteRouter = require('./routes/delete');
// join page
var joinRouter = require('./routes/join');
var sessionRouter = require('./routes/session');
// var logoutRouter = require('./routes/logout');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// session part
app.use(session({secret : 'my key' , resave : true, saveUninitialized : true}));

//주소 등록
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/read', readRouter);
app.use('/write', writeRouter);
app.use('/update', updateRouter);
app.use('/search', searchRouter);
app.use('/show_member', show_memberRouter);
app.use('/show_normal', show_normalRouter);
app.use('/delete', deleteRouter);
app.use('/join', joinRouter);
app.use('/session' ,sessionRouter);
// app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
