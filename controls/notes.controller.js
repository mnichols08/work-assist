var mongoose = require('mongoose');

const Note = require('../models/note.model')
const Customer = require('../models/customer.model')

module.exports.index = async (req, res) => res.json(await Note.find())
module.exports.create = async (req, res) => {
	const note = await new Note(req.body)
	const customer = await Customer.findById(req.params.id)
	if (req.params.id) {
		note.origin = customer._id
		customer.notes.push(note)
		customer.save()
	}
	note.save()
	res.json(note)
}
module.exports.read = async (req, res) => res.json( await Note.findById(req.params.id) )

module.exports.updateCustomer = async (req, res) => {
	const { id, customerID } = req.params
		const oldNote = await Note.findById(id)
		const customers = await Customer.find()
		
		oldNote.origin = undefined
		oldNote.save()

		customers.map(async customerID => {
			const oldCustomer = await Customer.findById(customerID)
			if (oldCustomer.notes.includes(id)) {
				oldCustomer.notes.pull(id)
				oldCustomer.save()
			}	
		})	
		await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
		const note = await Note.findById(id)
		note.origin = customerID
		note.save()
		
		const newCustomer = await Customer.findById(customerID)
		newCustomer.notes.push(id)
		newCustomer.save()
		res.json({status: 'success', method: 'update note origin', data: note})
}

module.exports.update = async (req, res) => {
	if (req.params.customer) {
		const customer = await Customer.findById(req.params.customer)
		await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
		const note = await Note.findById(req.params.id)
		note.origin = customer._id
		if (customer !== null) await Customer.findByIdAndUpdate(req.params.customer), { $push: { notes: note._id}}
		customer.save()
		res.json({status: 'success', method: 'update note origin', data: note})
		}
	
	// const customer = Customer.findById(req.params.customer)
	// if (customer && customer !== null) {
	// 	note.origin = customer._id
	// 	await Customer.findByIdAndUpdate(req.params.customer, { $push: { notes: note }})
	// 	await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },note)
	// 	customer.notes.push(note)
	// 	customer.save()
	// 	res.json(customer)
	// } else 
	
}

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