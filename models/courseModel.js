const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    courseName: {
        type: String,
        required: true
    }, 
    code: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    credits: {
        type: Number,
        required: true,
    },
    faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Courses', courseSchema);