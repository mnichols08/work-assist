var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

const Note = require('../models/note.model')
const Customer = require('../models/customer.model')

router.get('/', async function(req, res){
  const notes = await Note.find({})
  res.json(notes)
})

router.get('/:id', async function(req, res){
  const { id } = req.params
  const note = await Note.findById(id)
  if (!note) {
    res.json({status: 'failure', method: 'read note', data: `not found.`})
  } else res.json(note)
})

router.delete('/:id', async function(req, res){
  const { id } = req.params
  const note = await Note.findById(id)
  if (!note) {
    res.json({status: 'failure', data: `not found.`})
  } else {
    await Note.findByIdAndDelete(id)
    res.json({status: 'success', method: 'delete note', data: note})
  }
})

router.post('/:id', async function(req, res){
  const customer = await Customer.findById(req.params.id)
  const note = new Note(req.body)
  customer.notes.push(note)
  note.origin = customer._id
  await customer.save()
  await note.save()
  res.json({status: 'success', method: 'create note', data: note})
})

router.post('/', async function(req, res){
  let customer
  if (!await Customer.findOne({name: 'Cash Account'})) {
    customer = new Customer({name: 'Cash Account'})
  } else customer = await Customer.findOne({name: 'Cash Account'})
  const note = new Note(req.body)
  note.origin = customer._id
  customer.notes.push(note)
  await customer.save()
  await note.save()
  res.json({status: 'success', method: 'create note', data: note})
})

router.patch('/:id', async function(req, res){
  const { id } = req.params
  const note = await Note.findById(id)
  if (!note) {
    res.json({status: 'failure', data: `not found.`})
  } else {
    await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
    res.json({status: 'success', method: "update note", data: await Note.findById(id)})
  }
})

router.delete('/', async function(req, res){
  const notes = await Note.find({})
  await Note.deleteMany()
  res.json({status: 'success', method: "delete all notes", data: notes})
})

module.exports = router;