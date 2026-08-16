const authService = require('../services/auth.service');

async function registerUser(req, res, next) {
    try {
        const { name, email, password, role, companyName } = req.body;
        const { user } = await authService.register({ name, email, password, role, companyName });

        res.status(201).json({ 
            success: true,
            message: 'Registration initiated. A 6-digit verification code has been sent to your email.',
            email: user.email
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
        if (err.needsVerification) {
            return res.status(403).json({
                success: false,
                needsVerification: true,
                email: req.body.email,
                message: err.message
            });
        }
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

async function verifyEmail(req, res, next) {
    try {
        const { email, code } = req.body;
        if (!email || !code) {
            const error = new Error('Email and verification code are required');
            error.statusCode = 400;
            throw error;
        }

        const { user, token } = await authService.verifyEmailCode({ email, code });

        const cookieOptions = {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        };
        res.cookie('token', token, cookieOptions);

        res.status(200).json({
            success: true,
            message: 'Email successfully verified and login successful',
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

async function resendCode(req, res, next) {
    try {
        const { email } = req.body;
        if (!email) {
            const error = new Error('Email is required');
            error.statusCode = 400;
            throw error;
        }

        await authService.resendCode({ email });

        res.status(200).json({
            success: true,
            message: 'A new verification code has been sent to your email.'
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    verifyEmail,
    resendCode
};