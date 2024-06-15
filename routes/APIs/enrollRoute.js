const express = require('express');
const router = express.Router();
const enrollController = require('../../controllers/enrollController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(enrollController.studentEnrollment)
    .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), enrollController.getAllEnrollments)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), enrollController.updateEnrollment)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), enrollController.deleteEnrollment);

module.exports = router;