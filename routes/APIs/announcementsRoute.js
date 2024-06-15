const express = require('express');
const router = express.Router();
const announcementController = require('../../controllers/announcementsController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(announcementController.getAllAnnouncements)
    .post(verifyRoles(ROLES_LIST.Faculty, ROLES_LIST.Admin), announcementController.createAnnouncement);

module.exports = router;