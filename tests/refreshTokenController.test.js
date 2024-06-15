const { handleRefreshToken } = require('../controllers/refreshTokenController');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

jest.mock('../models/userModel');
jest.mock('jsonwebtoken');

describe('handleRefreshToken', () => {
    let req, res;

    beforeEach(() => {
        req = {
            cookies: {
                jwt: 'mockedRefreshToken'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
            sendStatus: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 401 if jwt cookie is missing', async () => {
        req.cookies = {};
        await handleRefreshToken(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(401);
    });

    it('should return 403 if no user found with provided refresh token', async () => {
        User.findOne.mockResolvedValueOnce(null);
        await handleRefreshToken(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(403);
    });

    it('should return 403 if provided refresh token is invalid', async () => {
        User.findOne.mockResolvedValueOnce({ refreshToken: 'mockedRefreshToken', username: 'testuser' });
        jwt.verify.mockImplementationOnce((token, secret, callback) => {
            callback(new Error('Invalid token'));
        });
        await handleRefreshToken(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(403);
    });
});
