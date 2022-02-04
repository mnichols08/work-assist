var mongoose = require('mongoose');

const Note = require('../models/note.model')
const Ticket = require('../models/ticket.model')

module.exports.index = async (req, res) => res.json({status: 'success', method: 'index', data: await Note.find()})
module.exports.create = async (req, res) => {
	const note = await new Note(req.body)
	const ticket = await Ticket.findById(req.params.id)
	if (req.params.id) {
		note.origin = ticket._id
		ticket.notes.push(note)
		ticket.save()
	}
	note.save()
	res.json(note)
}
module.exports.read = async (req, res) => res.json({status: 'success', method: 'index', data: await Note.findById(req.params.id)} )

module.exports.updateNote = async (req, res) => {
	const { id, ticketID } = req.params
		const oldNote = await Note.findById(id)
		const tickets = await Ticket.find()
		
		oldNote.origin = undefined
		oldNote.save()

		tickets.map(async ticketID => {
			const oldTicket = await Ticket.findById(ticketID)
			if (oldTicket.notes.includes(id)) {
				oldTicket.notes.pull(id)
				oldTicket.save()
			}	
		})	
		await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
		const note = await Note.findById(id)
		note.origin = ticketID
		note.save()
		
		const newTicket = await Ticket.findById(ticketID)
		newTicket.notes.push(id)
		newTicket.save()
		res.json({status: 'success', method: 'update note origin', data: note})
}

module.exports.update = async (req, res) => {
	if (req.params.ticket) {
		const ticket = await Ticket.findById(req.params.ticket)
		await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },req.body)
		const note = await Note.findById(req.params.id)
		note.origin = ticket._id
		if (ticket !== null) await Ticket.findByIdAndUpdate(req.params.ticket), { $push: { notes: note._id}}
		ticket.save()
		res.json({status: 'success', method: 'update note origin', data: note})
		}
		else {
			
			await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) }, req.body) }
			const note = await Note.findById(req.params.id)
			if (note.origin !== null || note.origin !== undefined || note.origin !== '') {
			 await Ticket.findByIdAndUpdate(note.origin), { $push: { notes: note._id}
			}
			
			res.json({status: 'success', method: 'update note', note, notes: await Note.find(), ticketNotes: await Note.find({origin: note.origin})})
	}
	
	// const ticket = Ticket.findById(req.params.ticket)
	// if (ticket && ticket !== null) {
	// 	note.origin = ticket._id
	// 	await Ticket.findByIdAndUpdate(req.params.ticket, { $push: { notes: note }})
	// 	await Note.updateOne({ _id: mongoose.Types.ObjectId(req.params.id) },note)
	// 	ticket.notes.push(note)
	// 	ticket.save()
	// 	res.json(ticket)
	// } else 
		
}

module.exports.remove = async (req, res) => {
const note = await Note.findById(req.params.id)
	if (note) {
		const ticketID = note.origin
		await Ticket.findByIdAndUpdate(ticketID, { $pull: { notes: req.params.id }})
		res.json({status: 'success', method: 'delete', data: note})
		await note.delete()
	}
	else {
		await Ticket.updateMany({notes: []})	
		res.json(await Note.deleteMany())
	}
	// if (req.params.id) {
	// 	const ticket = await Note.findById(req.params.id)
	// 	const ticketID = ticket.origin
	// 	await Ticket.findByIdAndUpdate(ticketID, { $pull: { notes: req.params.id }})
	// 	res.json({status: 'success', method: 'delete note', data: await Note.findByIdAndDelete(req.params.id) })
	// } else {
	// 	await Ticket.updateMany({notes: []})
	// 	res.json({status: 'success', method: "delete all notes", data: await Note.deleteMany()})
	// }
}

// module.exports.remove = async function(req, res){
// 	if (req.params.id) {
// 		const ticket = await Note.findById(req.params.id)
// 		const ticketID = ticket.origin
// 		await Ticket.findByIdAndUpdate(ticketID, { $pull: { notes: req.params.id }})
// 		res.json({status: 'success', method: 'delete note', data: await Note.findByIdAndDelete(req.params.id) })
// 	} else {
// 		await Ticket.updateMany({notes: []})
// 		res.json({status: 'success', method: "delete all notes", data: await Note.deleteMany()})
// 	}
// }