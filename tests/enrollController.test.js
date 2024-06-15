const { studentEnrollment, getAllEnrollments, updateEnrollment, deleteEnrollment } = require('../controllers/enrollController');
const Enrollment = require('../models/enrollModel');
const { getCourseCode } = require('../controllers/courseController');

jest.mock('../models/enrollModel');
jest.mock('../controllers/courseController');

describe('studentEnrollment', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if courseCode or username is missing', async () => {
        await studentEnrollment(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'Enter the required input fields' });
    });

    it('should return 400 if user is already enrolled in the course', async () => {
        req.body = { courseCode: 'TEST123', username: 'testuser' };
        getCourseCode.mockResolvedValueOnce({});
        Enrollment.findOne.mockResolvedValueOnce({ username: 'testuser' });
        await studentEnrollment(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'You have already enroll for the course' });
    });

    it('should return 400 if no course found with provided courseCode', async () => {
        req.body = { courseCode: 'TEST123', username: 'testuser' };
        getCourseCode.mockResolvedValueOnce(null);
        await studentEnrollment(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: 'There is no Course available with this course code' });
    });

    it('should create new enrollment and return it', async () => {
        req.body = { courseCode: 'TEST123', username: 'testuser' };
        getCourseCode.mockResolvedValueOnce({});
        Enrollment.findOne.mockResolvedValueOnce(null);
        const createdEnrollment = { _id: '123456', courseCode: 'TEST123', username: 'testuser' };
        Enrollment.create.mockResolvedValueOnce(createdEnrollment);
        await studentEnrollment(req, res);
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(createdEnrollment);
    });
});

describe('getAllEnrollments', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return all enrollments', async () => {
        const enrollments = [{ _id: '123', courseCode: 'TEST123', username: 'testuser' }];
        Enrollment.find.mockResolvedValueOnce(enrollments);
        await getAllEnrollments(req, res);
        expect(res.json).toHaveBeenCalledWith(enrollments);
    });

    it('should return 204 if no enrollments found', async () => {
        Enrollment.find.mockResolvedValueOnce('');
        await getAllEnrollments(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'No Enrollments Found' });
    });

    it('should return 204 if find() method returns null', async () => {
        Enrollment.find.mockResolvedValueOnce(null);
        await getAllEnrollments(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'No Enrollments Found' });
    });
});

describe('updateEnrollment', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if id is missing', async () => {
        await updateEnrollment(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'ID parameter is required' });
    });

    it('should return 204 if no enrollment found with provided id', async () => {
        req.body.id = '123';
        Enrollment.findOne.mockResolvedValueOnce(null);
        await updateEnrollment(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ 'message': `No enrollment matches ID 123` });
    });

    it('should update enrollment and return it', async () => {
        req.body.id = '123';
        req.body.courseCode = 'NEWCOURSE';
        req.body.username = 'newuser';
        const updatedEnrollment = { _id: '123', courseCode: 'NEWCOURSE', username: 'newuser' };
        const saveMock = jest.fn().mockResolvedValueOnce(updatedEnrollment);
        const findOneMock = jest.fn().mockResolvedValueOnce({ save: saveMock });
        Enrollment.findOne.mockImplementationOnce(findOneMock);
        await updateEnrollment(req, res);
        expect(findOneMock).toHaveBeenCalledWith({ _id: '123' });
        expect(saveMock).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(updatedEnrollment);
    });
});

describe('deleteEnrollment', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if id is missing', async () => {
        await deleteEnrollment(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'ID parameter is required' });
    });

    it('should return 204 if no enrollment found with provided id', async () => {
        req.body.id = '123';
        Enrollment.findOne.mockResolvedValueOnce(null);
        await deleteEnrollment(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ 'message': `No Enrollment matches with ID 123` });
    });

    it('should delete enrollment and return deletion result', async () => {
        req.body.id = '123';
        const deleteResult = { n: 1, ok: 1, deletedCount: 1 };
        const deleteOneMock = jest.fn().mockResolvedValueOnce(deleteResult);
        const findOneMock = jest.fn().mockResolvedValueOnce({ deleteOne: deleteOneMock });
        Enrollment.findOne.mockImplementationOnce(findOneMock);
        await deleteEnrollment(req, res);
        expect(findOneMock).toHaveBeenCalledWith({ _id: '123' });
        expect(deleteOneMock).toHaveBeenCalledWith({ _id: '123' });
        expect(res.json).toHaveBeenCalledWith(deleteResult);
    });
});