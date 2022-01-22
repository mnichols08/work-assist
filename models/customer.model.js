const mongoose = require('mongoose');
const Note = require('./note.model');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: String,
    phone: String,
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});

CustomerSchema.post('findOneAndDelete', async function(doc){
    if (doc) {
        await Note.deleteMany({
            _id: {
                $in: doc.notes
            }
        })
    }
})

module.exports = mongoose.model('Customer', CustomerSchema);