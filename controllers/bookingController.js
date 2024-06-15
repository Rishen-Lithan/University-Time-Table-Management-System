const Booking = require('../models/bookingModel');
const { getSessionTimeAndLocation } = require('../controllers/classSessionController');

const makeBooking = async(req, res) => {
    if(!req?.body?.time || !req?.body?.location || !req?.body?.reason || !req?.body?.day) {
        return res.status(400).json({ 'message': 'Enter the required input fields' });
    }

    try {
        const { time, location, day } = req.body;

        const existingSession = await getSessionTimeAndLocation(time, location, day);
        const existingBooking = await Booking.findOne({ time, location, day });
        if (existingBooking || existingSession) {
            return res.status(400).json({ message: 'Cannot have a booking at this date and time in this location' });
        } else {
            const result = await Booking.create({
                time: req.body.time,
                day: req.body.day,
                location: req.body.location,
                reason: req.body.reason,
            });
            res.status(201).json(result);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { makeBooking };