const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    time: {
        type: String,
        required: true
    },
    day: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Bookings', bookingSchema);