var mongoose = require('mongoose');

const Note = require('../models/note.model')
const Customer = require('../models/customer.model')

module.exports.index = async (req, res) => res.json(await Note.find())
module.exports.read = async (req, res) => await Note.findById(req.params) ?
	res.json(await Note.findById(req.params)) :
	res.json({status: 'failure', method: 'read note', data: `not found.`})

// router.get('/:id', async function(req, res){
//   const { id } = req.params
//   const note = await Note.findById(id)
//   if (!note) {
//     res.json({status: 'failure', method: 'read note', data: `not found.`})
//   } else res.json(note)
// })

// router.delete('/:id', async function(req, res){
//   const { id } = req.params
//   const note = await Note.findById(id)
//   if (!note) {
//     res.json({status: 'failure', data: `not found.`})
//   } else {
//     await Note.findByIdAndDelete(id)
//     res.json({status: 'success', method: 'delete note', data: note})
//   }
// })

// router.post('/:id', async function(req, res){
//   const customer = await Customer.findById(req.params.id)
//   const note = new Note(req.body)
//   customer.notes.push(note)
//   note.origin = customer._id
//   await customer.save()
//   await note.save()
//   res.json({status: 'success', method: 'create note', data: note})
// })

// router.post('/', async function(req, res){
//   let customer
//   if (!await Customer.findOne({name: 'Cash Account'})) {
//     customer = new Customer({name: 'Cash Account'})
//   } else customer = await Customer.findOne({name: 'Cash Account'})
//   const note = new Note(req.body)
//   note.origin = customer._id
//   customer.notes.push(note)
//   await customer.save()
//   await note.save()
//   res.json({status: 'success', method: 'create note', data: note})
// })

// router.patch('/:id', async function(req, res){
//   const { id } = req.params
//   const note = await Note.findById(id)
//   if (!note) {
//     res.json({status: 'failure', data: `not found.`})
//   } else {
//     await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
//     res.json({status: 'success', method: "update note", data: await Note.findById(id)})
//   }
// })

// router.delete('/', async function(req, res){
//   const notes = await Note.find({})
//   await Note.deleteMany()
//   res.json({status: 'success', method: "delete all notes", data: notes})
// })

// module.exports = router;