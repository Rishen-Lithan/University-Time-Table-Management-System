const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const assignFacultySchema = new Schema({
    courseCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Courses'
    },
    facultyUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('AssignFaculty', assignFacultySchema);