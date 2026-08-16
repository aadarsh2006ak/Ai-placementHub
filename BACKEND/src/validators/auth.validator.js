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
        .normalizeEmail()
        .custom((value) => {
            const disposableDomains = [
                'mailinator.com', 'yopmail.com', 'tempmail.com', 'guerrillamail.com',
                'dispostable.com', 'getairmail.com', 'sharklasers.com', '10minutemail.com',
                'temp-mail.org', 'tempmailaddress.com', 'burnermail.io'
            ];
            const domain = value.split('@')[1];
            if (disposableDomains.includes(domain)) {
                throw new Error('Disposable/Temporary email addresses are not permitted');
            }
            return true;
        }),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)'),
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
