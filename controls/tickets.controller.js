var mongoose = require('mongoose');

const Ticket = require('../models/ticket.model')
const Note = require('../models/note.model')
const Customer = require('../models/customer.model')

module.exports.index = async (req, res) => res.json({status: 'success', method: 'read', data: await Ticket.find()})
module.exports.create = async (req, res) => {
	const ticket = await new Ticket(req.body)
	const customer = await Customer.findById(req.params.id)
	if (req.params.id) {
		ticket.origin = customer._id
		customer.tickets.push(ticket)
		customer.save()
		ticket.save()
		
		res.json({status: 'success', method: 'create ticket on customer with id of ' + req.params.id, customer, customerTickets: await Ticket.find({origin: customer._id}), tickets: await Ticket.find(), ticket})
	} else {
	ticket.save()
	res.json({status: 'success', method: 'create ticket', ticket: ticket})
	}
}
module.exports.read = async (req, res) => {
	const ticketID = req.params.id
	const ticket = await Ticket.findById(ticketID)
	let ticketCustomer
	if (ticket.origin) ticketCustomer = await Customer.findById({_id: ticket.origin})
	if (!ticket) {
		res.json( {status: 'fail', method: 'read', ticket} )
	} else res.json({status: 'success', method: 'get one ticket', ticketCustomer, ticket, ticketNotes: await Note.find({origin: ticketID})})
}

module.exports.updateTicket = async (req, res) => {
	const { id, noteID} = req.params
		const oldTicket = await Ticket.findById(id)
		const customers = await Customer.find()
		let oldTicketOrigin = oldTicket.origin
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
		let newCustomer
		ticket.origin = oldTicketOrigin
		if (noteID) {
			newCustomer = await Customer.findById(noteID)
			newCustomer.tickets.push(id)
			newCustomer.save()
			ticket.origin = noteID
			
		}
		
		ticket.save()
		console.log(oldTicketOrigin, noteID)
		res.json({status: 'success', method: 'update ticket origin', ticketOrigin: oldTicketOrigin, ticket: await Ticket.findById(id), data: await Ticket.find()})
}

module.exports.update = async (req, res) => {
	console.log(req.params)
	if (req.params.customer) {
		
		const customer = await Customer.findById(req.params.customer)
		console.log(customer.name)
		await Ticket.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
		const ticket = await Ticket.findById(req.params.id)
		ticket.origin = customer._id
		if (customer !== null) await Customer.findByIdAndUpdate(req.params.customer), { $push: { tickets: ticket._id}}
		customer.save()
		res.json({status: 'success', method: 'update ticket origin', ticket, data: await Ticket.find()})
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
		await ticket.delete()
		res.json({status: 'success', method: 'remove ticket with id of ' + req.params.id, customer: await Customer.findById(customerID), tickets: await Ticket.find()})
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