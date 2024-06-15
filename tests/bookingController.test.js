const { makeBooking } = require('../controllers/bookingController'); // Replace with the correct path to your controller file
const { getSessionTimeAndLocation } = require('../controllers/classSessionController');
const Booking = require('../models/bookingModel');

jest.mock('../controllers/classSessionController', () => ({
    getSessionTimeAndLocation: jest.fn()
}));

jest.mock('../models/bookingModel', () => ({
    create: jest.fn()
}));

const mockReq = {
    body: {},
};

const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn()
};

describe('makeBooking', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Clear mock calls after each test
    });

    it('should return 400 if required input fields are missing', async () => {
        // Missing required input fields
        mockReq.body = {};

        await makeBooking(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Enter the required input fields' });
        expect(getSessionTimeAndLocation).not.toHaveBeenCalled();
        expect(Booking.create).not.toHaveBeenCalled();
    });

    it('should handle errors', async () => {
        // Simulating an error during the execution
        const errorMessage = 'Test error message';
        const mockSessionTime = '10:00 AM';
        const mockSessionLocation = 'Test Location';
        const mockSessionDay = 'Monday';
        
        mockReq.body = {
            time: mockSessionTime,
            location: mockSessionLocation,
            day: mockSessionDay,
            reason: 'Test Reason'
        };

        // Mocking getSessionTimeAndLocation to throw an error
        getSessionTimeAndLocation.mockRejectedValue(new Error(errorMessage));

        await makeBooking(mockReq, mockRes);

        expect(getSessionTimeAndLocation).toHaveBeenCalledWith(mockSessionTime, mockSessionLocation, mockSessionDay);
        expect(mockRes.status).toHaveBeenCalledWith(500);
        expect(mockRes.json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
        expect(Booking.create).not.toHaveBeenCalled();
    });
});
