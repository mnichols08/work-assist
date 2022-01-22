if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser')

var notesRouter = require('./routes/notes.router');
var customersRouter = require('./routes/customers.router');

var app = express();
const CLIENT_API = process.env.CLIENT_API;
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/work-assist';
const secret = process.env.SECRET || 's3c$E7!';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {

}); 
if (process.env.NODE_ENV !== "production") app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkLoggedIn)


app.use('/customers/', customersRouter);
app.use('/notes/', notesRouter);


function checkLoggedIn(req, res, next) { 
  const isLoggedIn = req.headers.authkey === CLIENT_API
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must log in!',
    });
  }
  next();
}

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
  res.json({status: 'error', message: err.message});
});

module.exports = app;
