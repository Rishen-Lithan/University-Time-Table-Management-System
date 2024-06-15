const Course = require('../models/courseModel');

const getAllCourses = async(req, res) => {
    const courses = await Course.find();
    if(!courses) return res.status(204).json({ 'message' : 'No Courses Found' });
    res.json(courses);
}

const createCourse = async(req, res) => {
    if(!req?.body?.courseName || !req?.body?.code || !req?.body?.description || !req?.body?.credits) {
        return res.status(400).json({ message: 'Enter the required input fields' });
    }

    try {
        const result = await Course.create({
            courseName: req.body.courseName,
            code: req.body.code,
            description: req.body.description,
            credits: req.body.credits
        });

        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updateCourse = async(req, res) => {
    if(!req?.body?.id) {
        return res.status(400).json({ message : 'ID parameter is required'});
    }

    const course = await Course.findOne({ _id: req.body.id }); //.exec();
    if(!course) {
        return res.status(204).json({ 'message': `No courses matches ID ${req.body.id}`});
    }
    if(req.body?.courseName) course.courseName = req.body.courseName;
    if(req.body?.code) course.code = req.body.code;
    if(req.body?.description) course.description = req.body.description;
    if(req.body?.credits) course.credits = req.body.credits;
    
    const updatedCourse = await course.save();
    res.status(201).json(updatedCourse);
}

const deleteCourse = async(req, res) => {
    if(!req?.body?.id){
        return res.status(400).json({ 'message': 'ID parameter is required'});
    }

    try {
        const course = await Course.findOne({ _id: req.body.id }); //.exec();
        if(!course) {
            return res.status(204).json({ 'message': `No course matches with ID ${req.body.id}`});
        }
        const result = await course.deleteOne({ _id: req.body.id });
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getCourse = async(req, res) => {
    if(!req?.params?.id) return res.status(400).json({ 'message': 'ID parameter is required'});

    const course = await Course.findOne({ _id: req.params.id }); //.exec();
    if(!course) {
        return res.status(204).json({ 'message': `No Course matches with ID ${req.params.id}`});
    }
    res.json(course);
}

const getCourseCode = async (code) => {
    try {
        const courseCode = await Course.findOne({ code }).exec()
        console.log(courseCode);
        return courseCode;
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseCode
}