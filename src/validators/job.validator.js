const { body, param } = require('express-validator');
const { validate } = require('../middleware/validate');
const { ALL_JOB_TYPES } = require('../constants/status');

const createJobValidator = [
    body('title')
        .notEmpty()
        .withMessage('Job title is required')
        .trim(),
    body('description')
        .notEmpty()
        .withMessage('Job description is required')
        .trim(),
    body('requirements')
        .isArray({ min: 1 })
        .withMessage('At least one technical requirement is required'),
    body('location')
        .notEmpty()
        .withMessage('Job location is required')
        .trim(),
    body('jobType')
        .optional()
        .isIn(ALL_JOB_TYPES)
        .withMessage(`Job type must be one of: ${ALL_JOB_TYPES.join(', ')}`),
    body('experienceLevel')
        .notEmpty()
        .withMessage('Experience level is required')
        .trim(),
    validate
];

const applyJobValidator = [
    param('id')
        .isMongoId()
        .withMessage('Valid Job MongoDB ObjectId is required'),
    validate
];

module.exports = {
    createJobValidator,
    applyJobValidator
};
