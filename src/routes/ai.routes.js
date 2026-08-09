const express = require('express');
const router = express.Router();
const aiController = require('../controllers/ai.controller');
const { authUser } = require('../middleware/auth');
const { resumeAnalysisValidator, mockQuestionsValidator } = require('../validators/ai.validator');

// All AI endpoints require authentication
router.use(authUser);

router.post('/analyze-resume', resumeAnalysisValidator, aiController.analyzeResume);
router.post('/skill-gap', resumeAnalysisValidator, aiController.analyzeSkillGap);
router.post('/mock-questions', mockQuestionsValidator, aiController.generateInterviewQuestions);

module.exports = router;
