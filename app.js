const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors  = require ('cors')

const indexRouter = require('./app/routes/index');
const usersRouter = require('./app/routes/users');
const usersAuthRouter = require('./app/routes/users-auth/users-router');
const presensiRouter = require('./app/routes/presensi/presensi-router');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, '/app/views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let whiteList = [
  'http://localhost:3000'
]

let corsOptions = {
  origin: function (origin, callBack) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callBack(null, true)
    } else {
      callBack(new Error('Not Allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/presensi', presensiRouter);
app.use('/user', usersAuthRouter);

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
