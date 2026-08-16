const { body } = require('express-validator');
const { validate } = require('../middleware/validate');

const updateProfileValidator = [
    body('phone')
        .optional()
        .trim(),
    body('department')
        .optional()
        .trim(),
    body('cgpa')
        .optional()
        .isFloat({ min: 0, max: 10 })
        .withMessage('CGPA must be a valid number between 0.0 and 10.0'),
    body('graduationYear')
        .optional()
        .isInt({ min: 2020, max: 2035 })
        .withMessage('Graduation year must be a valid year'),
    body('skills')
        .optional()
        .isArray()
        .withMessage('Skills must be an array of strings'),
    validate
];

module.exports = {
    updateProfileValidator
};
