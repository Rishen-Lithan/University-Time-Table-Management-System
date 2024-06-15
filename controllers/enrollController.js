const Enrollment = require('../models/enrollModel');
const { getCourseCode } = require('../controllers/courseController');

const studentEnrollment = async (req, res) => {
    if(!req?.body?.courseCode || !req?.body?.username) {
        return res.status(400).json({ 'message': 'Enter the required input fields' });
    }

    try {
        const { courseCode, username } = req.body;

        const existingCourse = await getCourseCode(courseCode);
        if (existingCourse) {
            const findUser = await Enrollment.findOne({ username: username }); //.exec();
            if (findUser) {
                return res.status(400).json({ message: 'You have already enroll for the course' });
            } else {
                const result = await Enrollment.create({
                    courseCode: req.body.courseCode,
                    username: req.body.username,
                });
                res.status(201).json(result);
            }
        } else {
            return res.status(400).json({ message: 'There is no Course available with this course code' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const getAllEnrollments = async (req, res) => {
    const enrollments = await Enrollment.find();
    if(!enrollments) return res.status(204).json({ 'message' : 'No Enrollments Found' });
    res.json(enrollments);
}

const updateEnrollment = async (req, res) => {
    if(!req?.body?.id) {
        return res.status(400).json({ 'message' : 'ID parameter is required'});
    }

    const enrollment = await Enrollment.findOne({ _id: req.body.id }); //.exec();
    if(!enrollment) {
        return res.status(204).json({ 'message': `No enrollment matches ID ${req.body.id}`});
    }
    if(req.body?.courseCode) enrollment.courseCode = req.body.courseCode;
    if(req.body?.username) enrollment.username = req.body.username;
    
    const updateEnrollment = await enrollment.save();
    res.status(201).json(updateEnrollment);
}

const deleteEnrollment = async (req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({ 'message': 'ID parameter is required'});
    }

    const enrollment = await Enrollment.findOne({ _id: req.body.id }); //.exec();
    if(!enrollment) {
        return res.status(204).json({ 'message': `No Enrollment matches with ID ${req.body.id}`});
    }
    const deleteEnrollment = await enrollment.deleteOne({ _id: req.body.id });
    res.json(deleteEnrollment);
}

module.exports = { studentEnrollment, getAllEnrollments, updateEnrollment, deleteEnrollment };