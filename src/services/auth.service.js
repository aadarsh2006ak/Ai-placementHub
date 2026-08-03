const userModel = require('../models/user.model');
const studentProfileModel = require('../models/studentProfile.model');
const companyProfileModel = require('../models/companyProfile.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { sendWelcomeEmail } = require('./email.service');

async function register({ name, email, password, role, companyName }) {
    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) {
        const error = new Error('User already exists');
        error.statusCode = 400;
        throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await userModel.create({
        name,
        email,
        passwordHash: hashedPassword,
        role: role || 'student'
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
        await sendWelcomeEmail(newUser);
    } catch (err) {
        // Silently catch email issues
    }

    const token = jwt.sign({ 
        id: newUser._id, 
        role: newUser.role 
    }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return { user: newUser, token };
}

async function login({ email, password }) {
    const user = await userModel.findOne({ email });
    if (!user) {
        const error = new Error('Invalid email or password');
        error.statusCode = 400;
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

module.exports = {
    register,
    login
};
