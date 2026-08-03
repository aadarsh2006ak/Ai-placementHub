const express = require('express');
const router = express.Router();
const studentController = require('../controllers/student.controller');
const { authUser } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const upload = require('../utils/upload');

// All student profile endpoints require login
router.use(authUser);

// Student get self profile or other profiles if admin/company
router.get('/profile', studentController.getStudentProfile);

// Update student profile (Student only)
router.put('/profile', authorize('student'), studentController.updateStudentProfile);

// Upload resume PDF/Docx (Student only)
router.post('/upload-resume', authorize('student'), upload.single('resume'), studentController.uploadResume);

module.exports = router;
