const { registerValidator, loginValidator } = require('./auth.validator');
const { createJobValidator, applyJobValidator } = require('./job.validator');
const { updateProfileValidator } = require('./student.validator');
const { resumeAnalysisValidator, mockQuestionsValidator } = require('./ai.validator');

module.exports = {
    registerValidator,
    loginValidator,
    createJobValidator,
    applyJobValidator,
    updateProfileValidator,
    resumeAnalysisValidator,
    mockQuestionsValidator
};
