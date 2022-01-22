const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    context: String,
    origin: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    }
});

module.exports = mongoose.model('Note', NoteSchema);