const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const enrollmentSchema = new Schema({
    courseCode: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Enrollments', enrollmentSchema);