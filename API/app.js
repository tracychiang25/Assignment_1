var createError = require('http-errors');
const express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const connectDB = require('./db');
require('dotenv').config();
const cors = require('cors');
const fs = require('fs')

connectDB();

createFolderIfNotExists(path.join(__dirname, 'public', 'gifs'))

// route handlers for different parts of the applicaiton
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const gifsRouter = require('./routes/gifs');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// app.use('/', indexRouter);
app.use('/', gifsRouter);
app.use('/users', usersRouter);
app.use('/gifs', express.static(path.join(__dirname, 'public/gifs')));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

function createFolderIfNotExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Folder created: ${folderPath}`);
  } else {
    console.log(`Folder already exists: ${folderPath}`);
  }
}