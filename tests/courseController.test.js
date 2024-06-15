const {
    getAllCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    getCourseCode
} = require('../controllers/courseController'); // Replace with the correct path to your controller file
const Course = require('../models/courseModel');

// Mocking the Course model and response object
jest.mock('../models/courseModel', () => ({
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    deleteOne: jest.fn()
}));

const mockReq = {
    body: {},
    params: {}
};

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

describe('getAllCourses', () => {
    it('should return all courses', async () => {
        const mockCourses = [{ title: 'Course 1' }, { title: 'Course 2' }];
        Course.find.mockResolvedValue(mockCourses);
        
        await getAllCourses(mockReq, mockRes);

        expect(Course.find).toHaveBeenCalledTimes(1);
        expect(mockRes.json).toHaveBeenCalledWith(mockCourses);
    });
});

describe('getCourse', () => {
    it('should return a course when given a valid ID', async () => {
        const mockCourse = { _id: 'mockCourseId', title: 'Test Course' };
        mockReq.params.id = 'mockCourseId';
        Course.findOne.mockResolvedValue(mockCourse);

        await getCourse(mockReq, mockRes);

        expect(Course.findOne).toHaveBeenCalledWith({ _id: 'mockCourseId' });
        expect(mockRes.json).toHaveBeenCalledWith(mockCourse);
    });

    it('should return a message when given an invalid ID', async () => {
        mockReq.params.id = 'invalidId';
        Course.findOne.mockResolvedValue(null);

        await getCourse(mockReq, mockRes);

        expect(Course.findOne).toHaveBeenCalledWith({ _id: 'invalidId' });
        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'No Course matches with ID invalidId' });
    });
});

describe('createCourse', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should return 400 if required input fields are missing', async () => {
        const missingReq = { ...mockReq };
        delete missingReq.body.title; // Removing a required field

        await createCourse(missingReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Enter the required input fields' });
        expect(Course.create).not.toHaveBeenCalled(); // Ensure Course.create is not called
    });
});

describe('updateCourse', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should update an existing course', async () => {
        const mockCourse = {
            _id: 'mockCourseId',
            title: 'Test Course',
            code: 'TEST123',
            description: 'This is a test course',
            credits: 3
        };
        const updatedCourse = { ...mockCourse, title: 'Updated Course' };
        mockReq.body.id = 'mockCourseId';
        mockReq.body.title = 'Updated Course';

        Course.findOne.mockResolvedValue(mockCourse);
        mockCourse.save = jest.fn().mockResolvedValue(updatedCourse);

        await updateCourse(mockReq, mockRes);

        expect(Course.findOne).toHaveBeenCalledWith({ _id: 'mockCourseId' });
        expect(mockCourse.save).toHaveBeenCalledTimes(1);
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith(updatedCourse);
    });

    it('should return 204 if no course matches the provided ID', async () => {
        mockReq.body.id = 'invalidId';
        Course.findOne.mockResolvedValue(null);

        await updateCourse(mockReq, mockRes);

        expect(Course.findOne).toHaveBeenCalledWith({ _id: 'invalidId' });
        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'No courses matches ID invalidId' });
    });
});

describe('deleteCourse', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should return 204 if no course matches the provided ID', async () => {
        const invalidId = 'invalidId';
        mockReq.body.id = invalidId;
        Course.findOne.mockResolvedValue(null);

        await deleteCourse(mockReq, mockRes);

        expect(Course.findOne).toHaveBeenCalledWith({ _id: invalidId });
        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.json).toHaveBeenCalledWith({ message: `No course matches with ID ${invalidId}` });
        expect(Course.deleteOne).not.toHaveBeenCalled();
    });
});