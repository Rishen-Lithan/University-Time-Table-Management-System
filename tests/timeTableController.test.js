const { addTimeTable, updateTimeTable } = require('../controllers/timeTableController');
const TimeTable = require('../models/timeTableModel');

jest.mock('../models/timeTableModel');

describe('addTimeTable', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                course: 'Test Course',
                year: '2024'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if course or year is missing', async () => {
        req.body = {};
        await addTimeTable(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'Enter the required input fields' });
    });   
});

describe('updateTimeTable', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                _id: '123456',
                course: 'Updated Course',
                year: '2025'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if _id parameter is missing', async () => {
        req.body._id = undefined;
        await updateTimeTable(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'ID parameter is required' });
    });

    it('should return 204 if no time table found with given _id', async () => {
        TimeTable.findOne.mockResolvedValueOnce(null);
        await updateTimeTable(req, res);
        expect(res.status).toHaveBeenCalledWith(204);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'No time table found with that ID' });
    });  

    it('should return 500 if any error occurs', async () => {
        TimeTable.findOne.mockRejectedValueOnce(new Error('Database error'));
        await updateTimeTable(req, res);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'Internal Server Error' });
    });
});
