/*
  App to collect data from user that will store it in a database and allow user to view

  This will be the server that returns raw data to a client

  Routing PLan
    '/' -> Home Page
    '/login' -> authenticate yourself with server
    '/register' -> create an account
    '/customers' -> returns a list of all customers by name
      -> '/:id' -> returns customer with provided id
      -> DELETE '/:id' deletes customer based upon ID
      -> PATCH '/merge/:id1/:id2' merge customers based up on ID
      -> '/add' -> creates a new customer in db

*/

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var notesRouter = require('./routes/notes');
var customersRouter = require('./routes/customers');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/notes', notesRouter);
app.use('/customers', customersRouter);

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
