const express = require('express');
const router = express.Router();
const assignFacultyController = require('../../controllers/assignFacultyController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin), assignFacultyController.assignFaculty);

module.exports = router;