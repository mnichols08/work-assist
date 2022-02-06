const mongoose = require('mongoose')
const Customer = require('./customer.model')

const schema = new mongoose.Schema({
    title: String,
    context: String,
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
})


module.exports = mongoose.model('Note', schema)