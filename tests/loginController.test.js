const { handleLogin } = require('../controllers/loginController');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel');
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('handleLogin', () => {
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
            sendStatus: jest.fn(),
            json: jest.fn(),
            cookie: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if username or password is missing', async () => {
        req.body = {};
        await handleLogin(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ 'message': 'Username and password are required.' });
    });

    it('should return 401 if no user found with provided username', async () => {
        User.findOne.mockResolvedValueOnce(null);
        await handleLogin(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 401 if password does not match', async () => {
        User.findOne.mockResolvedValueOnce({ username: 'testuser', password: 'hashedpassword' });
        bcrypt.compare.mockResolvedValueOnce(false);
        await handleLogin(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(401);
    });
});
