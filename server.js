require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbConn');

const app = express();

connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
// app.use(cors());

app.use('/register', require('./routes/registerRoute'));
app.use('/login', require('./routes/loginRoute'));
app.use('/refresh', require('./routes/refreshRoute'));
app.use('/logout', require('./routes/logoutRoute'));

app.use(verifyJWT);
app.use('/course', require('./routes/APIs/courseRoute'));
app.use('/assign', require('./routes/APIs/assignFacultyRoute'));
app.use('/schedule', require('./routes/APIs/timeTableRoute'));
app.use('/session', require('./routes/APIs/classSessionRoute'));
app.use('/book', require('./routes/APIs/bookingRoute'));
app.use('/enroll', require('./routes/APIs/enrollRoute'));
app.use('/announce', require('./routes/APIs/announcementsRoute'));

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});