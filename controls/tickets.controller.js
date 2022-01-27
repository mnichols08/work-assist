var mongoose = require('mongoose');

const Ticket = require('../models/ticket.model')
const Note = require('../models/ticket.model')
const Customer = require('../models/customer.model')

module.exports.index = async (req, res) => res.json({status: 'success', method: 'read', data: await Ticket.find()})
module.exports.create = async (req, res) => {
	const ticket = await new Ticket(req.body)
	const customer = await Customer.findById(req.params.id)
	if (req.params.id) {
		ticket.origin = customer._id
		customer.tickets.push(ticket)
		customer.save()
	}
	ticket.save()
	res.json(ticket)
}
module.exports.read = async (req, res) => res.json( {status: 'success', method: 'read', data: await Ticket.findById(req.params.id)} )

module.exports.updateCustomer = async (req, res) => {
	const { id, customerID } = req.params
		const oldTicket = await Ticket.findById(id)
		const customers = await Customer.find()
		
		oldTicket.origin = undefined
		oldTicket.save()

		customers.map(async customerID => {
			const oldCustomer = await Customer.findById(customerID)
			if (oldCustomer.tickets.includes(id)) {
				oldCustomer.tickets.pull(id)
				oldCustomer.save()
			}	
		})	
		await Ticket.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
		const ticket = await Ticket.findById(id)
		ticket.origin = customerID
		ticket.save()
		
		const newCustomer = await Customer.findById(customerID)
		newCustomer.tickets.push(id)
		newCustomer.save()
		res.json({status: 'success', method: 'update ticket origin', data: ticket})
}

module.exports.update = async (req, res) => {
	if (req.params.customer) {
		const customer = await Customer.findById(req.params.customer)
		await Ticket.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
		const ticket = await Ticket.findById(req.params.id)
		ticket.origin = customer._id
		if (customer !== null) await Customer.findByIdAndUpdate(req.params.customer), { $push: { tickets: ticket._id}}
		customer.save()
		res.json({status: 'success', method: 'update ticket origin', data: ticket})
		}
	
	// const customer = Customer.findById(req.params.customer)
	// if (customer && customer !== null) {
	// 	ticket.origin = customer._id
	// 	await Customer.findByIdAndUpdate(req.params.customer, { $push: { tickets: ticket }})
	// 	await Ticket.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },ticket)
	// 	customer.tickets.push(ticket)
	// 	customer.save()
	// 	res.json(customer)
	// } else 
	
}

module.exports.remove = async (req, res) => {
const ticket = await Ticket.findById(req.params.id)
	if (ticket) {
		const customerID = ticket.origin
		await Customer.findByIdAndUpdate(customerID, { $pull: { tickets: req.params.id }})
		res.json({status: 'success', method: 'delete', data: ticket})
		await ticket.delete()
	}
	else {
		await Customer.updateMany({tickets: []})	
		res.json(await Ticket.deleteMany())
	}
	// if (req.params.id) {
	// 	const customer = await Ticket.findById(req.params.id)
	// 	const customerID = customer.origin
	// 	await Customer.findByIdAndUpdate(customerID, { $pull: { tickets: req.params.id }})
	// 	res.json({status: 'success', method: 'delete ticket', data: await Ticket.findByIdAndDelete(req.params.id) })
	// } else {
	// 	await Customer.updateMany({tickets: []})
	// 	res.json({status: 'success', method: "delete all tickets", data: await Ticket.deleteMany()})
	// }
}

// module.exports.remove = async function(req, res){
// 	if (req.params.id) {
// 		const customer = await Ticket.findById(req.params.id)
// 		const customerID = customer.origin
// 		await Customer.findByIdAndUpdate(customerID, { $pull: { tickets: req.params.id }})
// 		res.json({status: 'success', method: 'delete ticket', data: await Ticket.findByIdAndDelete(req.params.id) })
// 	} else {
// 		await Customer.updateMany({tickets: []})
// 		res.json({status: 'success', method: "delete all tickets", data: await Ticket.deleteMany()})
// 	}
// }