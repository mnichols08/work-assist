const mongoose = require('mongoose');
const Note = require('./note.model');

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    phone: Number,
    notes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
})

module.exports = mongoose.model('Customer', schema);