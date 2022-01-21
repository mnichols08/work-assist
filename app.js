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

var authRouter = require('./routes/auth');
var notesRouter = require('./routes/notes');
var customersRouter = require('./routes/customers');

var app = express();
require('dotenv').config();
const CLIENT_API = process.env.CLIENT_API

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkLoggedIn)

app.use('/users', authRouter);
app.use('/notes', notesRouter);
app.use('/customers', customersRouter);

function checkLoggedIn(req, res, next) { 
  const isLoggedIn = req.headers.authkey === CLIENT_API
  if (!isLoggedIn) {
    return res.status(401).json({
      error: 'You must log in!',
    });
  }
  next();
}

app.get('/secret', checkLoggedIn, (req, res) => {
  return res.json('Your personal secret value is 42!');
});



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
