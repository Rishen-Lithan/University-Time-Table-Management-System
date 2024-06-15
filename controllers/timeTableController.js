const TimeTable = require('../models/timeTableModel');

const addTimeTable = async(req, res) => {
    if(!req?.body?.course || !req?.body?.year) {
        return res.status(400).json({ 'message': 'Enter the required input fields' });
    }

    try {
        const result = await TimeTable.create({
            course: req.body.course,
            year: req.body.year,
        });

        const populatedTimeTable = await TimeTable.findById(result._id).populate('course');
        console.log(populatedTimeTable);

        res.status(201).json(populatedTimeTable);
    } catch (err) {
        console.error(err);
    }
}

const updateTimeTable = async(req, res) => {
    try {
        if (!req?.body?._id) {
            return res.status(400).json({ 'message': 'ID parameter is required' });
        }
    
        const timeTable = await TimeTable.findOne({ _id: req.body._id }); //.exec();
        if (!timeTable) {
            return res.status(204).json({ 'message': 'No time table found with that ID' });
        } else {
            if (req.body?.course) timeTable.course = req.body.course;
            if (req.body?.year) timeTable.year = req.body.year;

            await timeTable.save();
            return res.status(200).json({ 'message': 'Time Table updated successfully' });
        }
    } catch (err) {
        console.error('Error updating time table:', err);
        return res.status(500).json({ 'message': 'Internal Server Error' });
    }
}

module.exports = { addTimeTable, updateTimeTable };