const express = require('express');
const router = express.Router();
const courseController = require('../../controllers/courseController');
const ROLES_LIST= require('../../config/roles_list');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('/')
    .get(courseController.getAllCourses)
    .post(verifyRoles(ROLES_LIST.Admin), courseController.createCourse)
    .put(verifyRoles(ROLES_LIST.Admin, ROLES_LIST.Faculty), courseController.updateCourse)
    .delete(verifyRoles(ROLES_LIST.Admin), courseController.deleteCourse);

router.route('/:id').get(courseController.getCourse);

module.exports = router;