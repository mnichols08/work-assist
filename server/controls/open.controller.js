var mongoose = require('mongoose');

const Ticket = require('../models/ticket.model')
const Note = require('../models/note.model')
const Customer = require('../models/customer.model')

module.exports.index = async (req, res) => {
	const customers = await Customer.find()
	const tickets = await Ticket.find()
	const notes = await Note.find()
const state = {customers, tickets, notes}
	res.json({status: 'success', method: 'read', state})
}
