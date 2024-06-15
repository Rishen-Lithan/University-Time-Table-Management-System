const { handleNewUser } = require('../controllers/registerController');
const bcrypt = require('bcrypt');
const User = require('../models/userModel');

jest.mock('../models/userModel');
jest.mock('bcrypt');

describe('handleNewUser', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                user: 'testuser',
                pwd: 'testpassword'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            sendStatus: jest.fn(), // Mocking sendStatus function
            json: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if username or password is missing', async () => {
        req.body = {};
        await handleNewUser(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'Username and password are required' });
    });

    it('should return 409 if username already exists', async () => {
        User.findOne.mockResolvedValueOnce(true);
        await handleNewUser(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(409);
    });

    it('should create a new user and return success message', async () => {
        User.findOne.mockResolvedValueOnce(false);
        bcrypt.hash.mockResolvedValueOnce('hashedPassword');
        User.create.mockResolvedValueOnce({ username: 'testuser' });
        await handleNewUser(req, res);
        expect(User.create).toHaveBeenCalledWith({
            "username": 'testuser',
            "password": 'hashedPassword'
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ 'success': 'New user testuser created!' });
    });
});
