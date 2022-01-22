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
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var authRouter = require('./routes/auth');
var notesRouter = require('./routes/notes');
var customersRouter = require('./routes/customers');

var app = express();
require('dotenv').config();
const CLIENT_API = process.env.CLIENT_API;

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/work-assist';
const secret = process.env.SECRET || 's3c$E7!';

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection; 
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {

}); 



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkLoggedIn)

app.get('/notes', async function(req, res){
  const Note = require('./models/note.model')
  const notes = await Note.find({})
  res.json(notes)
})

app.get('/notes/:id', async function(req, res){
  const Note = require('./models/note.model')
  const { id } = req.params
  const note = await Note.findById(id)
  if (!note) {
    res.json({status: 'failure', method: 'read note', data: `not found.`})
  } else res.json(note)
})

app.delete('/notes/:id', async function(req, res){
  const Note = require('./models/note.model')
  const { id } = req.params
  const note = await Note.findById(id)
  if (!note) {
    res.json({status: 'failure', data: `not found.`})
  } else {
    await Note.findByIdAndDelete(id)
    res.json({status: 'success', method: 'delete note', data: note})
  }
})

app.post('/notes', async function(req, res){
  const Note = require('./models/note.model')
  const note = new Note(req.body)
  await note.save()
  res.json({status: 'success', method: 'create note', data: note})
})

app.patch('/notes/:id', async function(req, res){
  const Note = require('./models/note.model')
  const { id } = req.params
  const note = await Note.findById(id)
  if (!note) {
    res.json({status: 'failure', data: `not found.`})
  } else {
    await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
    res.json({status: 'success', method: "update note", data: await Note.findById(id)})
  }
})

app.delete('/notes/', async function(req, res){
  const Note = require('./models/note.model')
  const notes = await Note.find({})
  await Note.deleteMany()
  res.json({status: 'success', method: "delete all notes", data: notes})
})

app.get('/customers', async function(req, res){
  const Customer = require('./models/customer.model')
  const customers = await Customer.find({})
  res.json(customers)
})

app.post('/customers', async function(req, res){
  const Customer = require('./models/customer.model')
  const customer = new Customer(req.body)
  await customer.save()
  res.json({status: 'success', method: 'create customer', data: customer})
})

app.get('/customers/:id', async function(req, res){
  const Customer = require('./models/customer.model')
  const { id } = req.params
  const customer = await Customer.findById(id)
  if (!customer) {
    res.json({status: 'failure', method: 'get customer', data: `not found.`})
  } else res.json(customer)
})

app.patch('/customers/:id', async function(req, res){
  const Customer = require('./models/customer.model')
  const { id } = req.params
  if (!await Customer.findById(id)) {
    res.json({status: 'failure', data: `not found.`})
  } else {
    await Customer.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
    res.json({status: 'success', method: "update customer", data: await Customer.findById(id)})
  }
})

app.delete('/customers/:id', async function(req, res){
  const Customer = require('./models/customer.model')
  const { id } = req.params
  const customer = await Customer.findById(id)
  if (!customer) {
    res.json({status: 'failure', data: `not found.`})
  } else {
    await Customer.findByIdAndDelete(id)
    res.json({status: 'success', method: 'delete customer', data: customer})
  }
})

app.delete('/customers', async function(req, res){
  const Customer = require('./models/customer.model')
  const customers = await Customer.find({})
  await Customer.deleteMany()
  res.json({status: 'success', method: "delete all customers", data: customers})
})

app.use('/users', authRouter);
//app.use('/notes', notesRouter);
//app.use('/customers', customersRouter);

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
  res.json({status: 'error', message: err.message});
});

module.exports = app;
