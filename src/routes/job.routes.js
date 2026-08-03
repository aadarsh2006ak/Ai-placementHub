const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { authUser } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { body } = require('express-validator');
const { validate } = require('../middleware/validate');

// Public routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

// Protected routes require login
router.use(authUser);

// Student job application endpoints
router.post('/:id/apply', authorize('student'), jobController.applyJob);
router.get('/my/applications', authorize('student'), jobController.getMyApplications);

// Company job management endpoints
const validateJobCreation = [
    body('title').notEmpty().withMessage('Job title is required').trim(),
    body('description').notEmpty().withMessage('Job description is required').trim(),
    body('requirements').notEmpty().withMessage('Requirements (comma separated or array) are required'),
    body('location').notEmpty().withMessage('Location is required').trim(),
    body('jobType').isIn(['Full-time', 'Part-time', 'Contract', 'Internship']).withMessage('Invalid job type'),
    body('experienceLevel').notEmpty().withMessage('Experience level is required').trim(),
    validate
];

router.post('/', authorize('company'), validateJobCreation, jobController.createJob);
router.put('/:id', authorize('company', 'admin'), jobController.updateJob);
router.delete('/:id', authorize('company', 'admin'), jobController.deleteJob);

// Applications status routing
router.get('/:id/applications', authorize('company', 'admin'), jobController.getJobApplications);
router.put('/applications/:applicationId/status', authorize('company', 'admin'), jobController.updateApplicationStatus);

module.exports = router;
