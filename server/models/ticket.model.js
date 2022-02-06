const mongoose = require('mongoose')
const Customer = require('./customer.model')
const Note = require('./customer.model')

const schema = new mongoose.Schema({
    title: String,
    description: String,
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        origin: {
           type: mongoose.Schema.Types.ObjectId,
             ref: 'Ticket' 
        }
    }]
})


module.exports = mongoose.model('Ticket', schema)