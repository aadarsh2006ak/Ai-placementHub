const { body } = require('express-validator');
const { validate } = require('../middleware/validate');

const resumeAnalysisValidator = [
    body('jobId')
        .optional()
        .isMongoId()
        .withMessage('Valid Job ObjectId required if provided'),
    body('jobDescription')
        .optional()
        .isString()
        .trim(),
    validate
];

const mockQuestionsValidator = [
    body('jobTitle')
        .notEmpty()
        .withMessage('Job title is required')
        .trim(),
    body('jobDescription')
        .optional()
        .isString()
        .trim(),
    body('numQuestions')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('numQuestions must be between 1 and 10'),
    validate
];

module.exports = {
    resumeAnalysisValidator,
    mockQuestionsValidator
};
