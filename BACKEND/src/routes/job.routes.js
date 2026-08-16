const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const { authUser } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const { createJobValidator, applyJobValidator } = require('../validators/job.validator');

// Public routes
router.get('/', jobController.getJobs);
router.get('/:id', jobController.getJobById);

// Protected routes require login
router.use(authUser);

// Student job application endpoints
router.post('/:id/apply', authorize('student'), applyJobValidator, jobController.applyJob);
router.get('/my/applications', authorize('student'), jobController.getMyApplications);

// Company job management endpoints
router.post('/', authorize('company'), createJobValidator, jobController.createJob);
router.put('/:id', authorize('company', 'admin'), jobController.updateJob);
router.delete('/:id', authorize('company', 'admin'), jobController.deleteJob);

// Applications status routing
router.get('/:id/applications', authorize('company', 'admin'), jobController.getJobApplications);
router.put('/applications/:applicationId/status', authorize('company', 'admin'), jobController.updateApplicationStatus);

module.exports = router;
