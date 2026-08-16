const userModel = require('../models/user.model');
const studentProfileModel = require('../models/studentProfile.model');
const companyProfileModel = require('../models/companyProfile.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendWelcomeEmail, sendVerificationEmail } = require('./email.service');

async function register({ name, email, password, role, companyName }) {
    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate 6-digit OTP code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verificationCodeExpire = Date.now() + 15 * 60 * 1000; // 15 mins

    const newUser = await userModel.create({
        name,
        email,
        passwordHash: hashedPassword,
        role: role || 'student',
        isVerified: false,
        verificationCode,
        verificationCodeExpire
    });

    if (newUser.role === 'student') {
        const studentProfile = new studentProfileModel({
            user: newUser._id,
        });
        await studentProfile.save();
    } else if (newUser.role === 'company') {
        if (!companyName) {
            await userModel.findByIdAndDelete(newUser._id);
            const error = new Error('Company name is required for company role');
            error.statusCode = 400;
            throw error;
        }
        const companyProfile = new companyProfileModel({
            user: newUser._id,
            companyName
        });
        await companyProfile.save();
    }

    try {
        await sendVerificationEmail(newUser, verificationCode);
    } catch (err) {
        // Silently log mail transporter errors
    }

    return { user: newUser };
}

async function login({ email, password }) {
    const user = await userModel.findOne({ email });
    if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 400;
        throw error;
    }

    // Block login if email is not yet verified
    if (!user.isVerified) {
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verificationCode = verificationCode;
        user.verificationCodeExpire = Date.now() + 15 * 60 * 1000;
        await user.save();

        try {
            await sendVerificationEmail(user, verificationCode);
        } catch (err) {}

        const error = new Error('Please verify your email address before logging in. A new 6-digit code has been sent.');
        error.statusCode = 403;
        error.needsVerification = true;
        throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
        const error = new Error('Invalid email or password');
        error.statusCode = 400;
        throw error;
    }

    const token = jwt.sign({ 
        id: user._id, 
        role: user.role 
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return { user, token };
}

async function verifyEmailCode({ email, code }) {
    const user = await userModel.findOne({ email });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    if (user.isVerified) {
        const error = new Error('Account is already verified');
        error.statusCode = 400;
        throw error;
    }

    if (user.verificationCode !== code) {
        const error = new Error('Invalid verification code');
        error.statusCode = 400;
        throw error;
    }

    if (new Date() > new Date(user.verificationCodeExpire)) {
        const error = new Error('Verification code has expired. Please request a new one.');
        error.statusCode = 400;
        throw error;
    }

    user.isVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;
    await user.save();

    try {
        await sendWelcomeEmail(user);
    } catch (err) {}

    const token = jwt.sign({ 
        id: user._id, 
        role: user.role 
    }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return { user, token };
}

async function resendCode({ email }) {
    const user = await userModel.findOne({ email });
    if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
    }

    if (user.isVerified) {
        const error = new Error('Account is already verified');
        error.statusCode = 400;
        throw error;
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = verificationCode;
    user.verificationCodeExpire = Date.now() + 15 * 60 * 1000;
    await user.save();

    await sendVerificationEmail(user, verificationCode);
    return { success: true };
}

module.exports = {
    register,
    login,
    verifyEmailCode,
    resendCode
};
