var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const utilsHelper = require("./helpers/utils.helper");

var indexRouter = require('./routes/index');

//Create a new app with Express framework
var app = express();

//
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Initialize Routes */
app.use('/api', indexRouter);

// catch 404 and forard to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.statusCode = 404;
  next(err);
});

/* Initialize Error Handling */
app.use((err, req, res, next) => {
  if (err.statusCode === 404) {
    return utilsHelper.sendResponse(res, 404, false, null, err, null);
  } else {
    console.log("ERROR", err.message);
    return utilsHelper.sendResponse(res, 500, false, null, err, null);
  }
});

module.exports = app;
