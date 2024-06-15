const express = require('express');
const router = express.Router();
const sessionController = require('../../controllers/classSessionController');
const ROLES_LIST = require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .post(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), sessionController.createSession)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), sessionController.updateSession)
    .delete(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), sessionController.deleteSession);

// router.route('/:id')
//     .get(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), sessionController.getSessionTimeAndLocation)

module.exports = router;