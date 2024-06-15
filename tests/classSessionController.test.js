const {
    createSession,
    updateSession,
    deleteSession,
} = require('../controllers/classSessionController'); // Replace with the correct path to your controller file
const ClassSession = require('../models/classSessionModel');

// Mocking the ClassSession model and response object
jest.mock('../models/classSessionModel', () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    findById: jest.fn().mockReturnThis(),
    populate: jest.fn().mockReturnThis(),
    save: jest.fn(),
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

describe('createSession', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should return 400 if required input fields are missing', async () => {
        const missingReq = { ...mockReq };
        delete missingReq.body.batch; // Removing a required field

        await createSession(missingReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Enter the required input fields' });
        expect(ClassSession.create).not.toHaveBeenCalled(); // Ensure ClassSession.create is not called
    });
});

describe('updateSession', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should return 400 if ID parameter is missing', async () => {
        await updateSession(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({ message: 'ID parameter is required' });
        expect(ClassSession.findOne).not.toHaveBeenCalled();
    });
});

describe('deleteSession', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should return 204 if no session matches the provided ID', async () => {
        const invalidId = 'invalidId';
        mockReq.body.id = invalidId;
        ClassSession.findOne.mockResolvedValue(null);

        await deleteSession(mockReq, mockRes);

        expect(ClassSession.findOne).toHaveBeenCalledWith({ _id: invalidId });
        expect(mockRes.status).toHaveBeenCalledWith(204);
        expect(mockRes.json).toHaveBeenCalledWith({ message: `No session matches ID ${invalidId}` });
        expect(ClassSession.deleteOne).not.toHaveBeenCalled();
    });
});
