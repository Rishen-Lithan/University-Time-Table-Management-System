const express = require('express');
const router = express.Router();
const timeTableController = require('../../controllers/timeTableController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), timeTableController.addTimeTable)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), timeTableController.updateTimeTable);

module.exports = router;
