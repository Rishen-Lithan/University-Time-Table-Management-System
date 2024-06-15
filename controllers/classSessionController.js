const ClassSession = require('../models/classSessionModel');
const { makeAnnouncement } = require('../controllers/announcementsController');

const createSession = async(req, res) => {
    if(!req?.body?.batch || !req?.body?.time || !req?.body?.faculty || !req?.body?.location || !req?.body?.day) {
        return res.status(400).json({ 'message': 'Enter the required input fields' });
    }

    try {
        const result = await ClassSession.create({
            batch: req.body.batch,
            day: req.body.day,
            time: req.body.time,
            faculty: req.body.faculty,
            location: req.body.location
        });

        const populatedSession = await ClassSession.findById(result._id).populate('batch');
        console.log(populatedSession);
        res.status(201).json(populatedSession);
    } catch (err) {
        console.error(err);
    }
}

const updateSession = async(req, res) => {
    try {
        if (!req?.body?._id) {
            return res.status(400).json({ 'message': 'ID parameter is required' });
        }
    
        const session = await ClassSession.findOne({ _id: req.body._id }).exec();
        if (!session) {
            return res.status(204).json({ 'message': 'No Session found with that ID' });
        } else {
            if (req.body?.time) session.time = req.body.time;
            if (req.body?.day) session.day = req.body.day;
            if (req.body?.batch) session.batch = req.body.batch;
            if (req.body?.faculty) session.faculty = req.body.faculty;
            if (req.body?.location) session.location = req.body.location;
            
            await session.save();
            await makeAnnouncement();
            return res.status(200).json({ 'message': 'Class Session updated successfully' });
        }
    } catch (err) {
        console.error('Error updating class session:', err);
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
}

const deleteSession = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Session is ID required.' });

    const session = await ClassSession.findOne({ _id: req.body.id }); //.exec();
    if (!session) {
        return res.status(204).json({ "message": `No session matches ID ${req.body.id}` });
    }
    const result = await session.deleteOne({ _id: req.body.id });
    res.json(result);
}

const getSessionTimeAndLocation = async (time, location, day) => {
    try {
        const session = await ClassSession.findOne({ time, location, day }).exec();
        console.log('Class Session' + session);
        return session;
    } catch (err) {
        console.error(err);
    }
}

module.exports = { createSession, updateSession, deleteSession, getSessionTimeAndLocation }