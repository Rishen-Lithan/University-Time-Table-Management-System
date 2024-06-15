const { assignFaculty } = require('../controllers/assignFacultyController');
const FacultyAssign = require('../models/assignFacultyModel');
const User = require('../models/userModel');

jest.mock('../models/assignFacultyModel', () => ({
    create: jest.fn(),
    findById: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis()
}));

jest.mock('../models/userModel', () => ({
    findOne: jest.fn()
}));

const mockReq = {
    body: {},
};

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

describe('assignFaculty', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should return 400 if required input fields are missing', async () => {
        mockReq.body = {};

        await assignFaculty(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Enter the required input fields' });
        expect(User.findOne).not.toHaveBeenCalled();
        expect(FacultyAssign.create).not.toHaveBeenCalled();
    });
});
