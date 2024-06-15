const express = require('express');
const router = express.Router();
const bookingController = require('../../controllers/bookingController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Faculty), bookingController.makeBooking);

module.exports = router;