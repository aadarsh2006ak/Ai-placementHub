const { body } = require('express-validator');
const { validate } = require('../middleware/validate');
const { ALL_ROLES } = require('../constants/roles');

const registerValidator = [
    body('name')
        .notEmpty()
        .withMessage('Name is required')
        .trim()
        .isLength({ min: 2, max: 60 })
        .withMessage('Name must be between 2 and 60 characters'),
    body('email')
        .isEmail()
        .withMessage('Valid email address is required')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('role')
        .isIn(ALL_ROLES)
        .withMessage(`Role must be one of: ${ALL_ROLES.join(', ')}`),
    body('companyName')
        .if(body('role').equals('company'))
        .notEmpty()
        .withMessage('Company name is required for recruiter accounts')
        .trim(),
    validate
];

const loginValidator = [
    body('email')
        .isEmail()
        .withMessage('Valid email address is required')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    validate
];

module.exports = {
    registerValidator,
    loginValidator
};
