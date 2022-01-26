const mongoose = require('mongoose');
const Ticket = require('./note.model');
const Note = require('./note.model');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: Number,
    tickets: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Ticket'
        }
    ]
})

module.exports = mongoose.model('Customer', schema);