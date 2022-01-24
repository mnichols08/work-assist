var mongoose = require('mongoose');

const Note = require('../models/note.model')
const Customer = require('../models/customer.model')

module.exports.index = async (req, res) => res.json(await Note.find())
module.exports.create = async (req, res) => {
	const note = await new Note(req.body)
	const customer = await Customer.findById(req.params.id)
	if (req.params.id) {
		customer.notes.push(note)
		note.origin = customer._id
		customer.save()
	}
	note.save()
	res.json(note)
}
module.exports.read = async (req, res) => res.json( await Note.findById(req.params.id) )
module.exports.update = async (req, res) => res.json(await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body))

module.exports.remove = async (req, res) => {
const note = await Note.findById(req.params.id)
	if (note) {
		const customerID = note.origin
		await Customer.findByIdAndUpdate(customerID, { $pull: { notes: req.params.id }})
		res.json({status: 'success', method: 'delete', data: note})
		await note.delete()
	}
	else {
		await Customer.updateMany({notes: []})	
		res.json(await Note.deleteMany())
	}
	// if (req.params.id) {
	// 	const customer = await Note.findById(req.params.id)
	// 	const customerID = customer.origin
	// 	await Customer.findByIdAndUpdate(customerID, { $pull: { notes: req.params.id }})
	// 	res.json({status: 'success', method: 'delete note', data: await Note.findByIdAndDelete(req.params.id) })
	// } else {
	// 	await Customer.updateMany({notes: []})
	// 	res.json({status: 'success', method: "delete all notes", data: await Note.deleteMany()})
	// }
}

// module.exports.remove = async function(req, res){
// 	if (req.params.id) {
// 		const customer = await Note.findById(req.params.id)
// 		const customerID = customer.origin
// 		await Customer.findByIdAndUpdate(customerID, { $pull: { notes: req.params.id }})
// 		res.json({status: 'success', method: 'delete note', data: await Note.findByIdAndDelete(req.params.id) })
// 	} else {
// 		await Customer.updateMany({notes: []})
// 		res.json({status: 'success', method: "delete all notes", data: await Note.deleteMany()})
// 	}
// }