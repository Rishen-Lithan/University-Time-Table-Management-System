const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const timeTableSchema = new Schema({
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    },
    year: {
        type: String,
        required: true,
    }
})

module.exports = mongoose.model('TimeTables', timeTableSchema);