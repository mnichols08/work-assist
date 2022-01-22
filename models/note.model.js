const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    context: String
});

module.exports = mongoose.model('Note', NoteSchema);