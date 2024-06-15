const FacultyAssign = require('../models/assignFacultyModel');
const User = require('../models/userModel');

const assignFaculty = async (req, res) => {
    if(!req?.body?.courseCode || !req?.body?.facultyUser) {
        return res.status(400).json({ 'message': 'Enter the required input fields' });
    }

    try {
        const user = await User.findOne({ user: req.body.username });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const result = await FacultyAssign.create({
            courseCode: req.body.courseCode,
            facultyUser: req.body.facultyUser,
        });

        const populatedAssignFaculty = await FacultyAssign.findById(result._id).populate('courseCode');
        console.log(populatedAssignFaculty);
        res.status(201).json(populatedAssignFaculty);
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { assignFaculty };