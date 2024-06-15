const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classSessionSchema = new Schema({
    batch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeTables'
    },
    day: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('ClassSessions', classSessionSchema)