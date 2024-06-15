const { handleLogout } = require('../controllers/logoutController');
const User = require('../models/userModel');

jest.mock('../models/userModel');

describe('handleLogout', () => {
    let req, res;

    beforeEach(() => {
        req = {
            cookies: {
                jwt: 'mockedRefreshToken'
            }
        };
        res = {
            status: jest.fn().mockReturnThis(),
            sendStatus: jest.fn(),
            clearCookie: jest.fn()
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should return 204 if jwt cookie is missing', async () => {
        req.cookies = {};
        await handleLogout(req, res);
        expect(res.sendStatus).toHaveBeenCalledWith(204);
        expect(res.clearCookie).not.toHaveBeenCalled();
    });

    it('should clear jwt cookie and return 204 if no user found with provided refresh token', async () => {
        User.findOne.mockResolvedValueOnce(null);
        await handleLogout(req, res);
        expect(User.findOne).toHaveBeenCalledWith({ refreshToken: 'mockedRefreshToken' });
        expect(res.clearCookie).toHaveBeenCalledWith('jwt', { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });
        expect(res.sendStatus).toHaveBeenCalledWith(204);
    });

    it('should clear refreshToken in db, clear jwt cookie, and return 204', async () => {
        const foundUser = { refreshToken: 'mockedRefreshToken', save: jest.fn() };
        User.findOne.mockResolvedValueOnce(foundUser);
        await handleLogout(req, res);
        expect(foundUser.refreshToken).toBe('');
        expect(foundUser.save).toHaveBeenCalled();
        expect(res.clearCookie).toHaveBeenCalledWith('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        expect(res.sendStatus).toHaveBeenCalledWith(204);
    });
});
