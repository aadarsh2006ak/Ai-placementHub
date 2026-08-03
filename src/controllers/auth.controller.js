const authService = require('../services/auth.service');

async function registerUser(req, res, next) {
    try {
        const { name, email, password, role, companyName } = req.body;
        const { user, token } = await authService.register({ name, email, password, role, companyName });

        const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days matching token expiration
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Set secure flag in production
            sameSite: 'strict' // Prevent CSRF
        };
        res.cookie('token', token, cookieOptions);

        res.status(201).json({ 
            success: true,
            message: 'Account successfully created',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
}

async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.login({ email, password });

        const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };
        res.cookie('token', token, cookieOptions);

        res.status(200).json({ 
            success: true,
            message: 'Login successful',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (err) {
        next(err);
    }
}

async function logoutUser(req, res, next) {
    try {
        res.status(200).cookie('token', '', {
            expires: new Date(0), // Set the cookie to expire immediately
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        }).json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (err) {
        next(err);
    }
}

async function getMe(req, res, next) {
    try {
        res.status(200).json({
            success: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                role: req.user.role,
                isVerified: req.user.isVerified
            }
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe
};