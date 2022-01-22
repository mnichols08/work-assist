const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    title: String,
    context: String
});

NoteSchema.post('findOneAndDelete', async function(doc){
    if (doc) {
        await Note.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
});

module.exports = mongoose.model('Note', NoteSchema);