const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: String,
    phone: String,
    notes: Array
});

module.exports = mongoose.model('Customer', CustomerSchema);