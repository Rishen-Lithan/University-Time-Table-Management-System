const Announcement = require('../models/announcementsModel');

const getAllAnnouncements = async (req, res) => {
    const announcements = await Announcement.find();
    if(!announcements) return res.status(204).json({ 'message' : 'No Announcements Found' });
    res.json(announcements);
}

const createAnnouncement = async(req, res) => {
    if(!req?.body?.title || !req?.body?.description) {
        return res.status(400).json({ message: 'Enter the required input fields' });
    }

    try {
        const result = await Announcement.create({
            title: req.body.title,
            description: req.body.description,
        });

        res.status(201).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const makeAnnouncement = async (title, description) => {
    if (!title || !description) {
        title = title || 'Announcements';
        description = description || 'Time Tables have updated. Checks for the updated time table';
    }

    try {
        const result = await Announcement.create({
            title,
            description,
        });
        
        console.log(result);
        return result;
    } catch (error) {
        throw error;
    }
};


module.exports = { getAllAnnouncements, createAnnouncement, makeAnnouncement };