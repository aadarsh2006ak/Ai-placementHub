const express = require('express');
const router = express.Router();
const companyController = require('../controllers/company.controller');
const { authUser } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const upload = require('../utils/upload');

// All company profile endpoints require login
router.use(authUser);

// Company get self profile or other profiles if admin/student
router.get('/profile', companyController.getCompanyProfile);

// Update company profile (Company only)
router.put('/profile', authorize('company'), companyController.updateCompanyProfile);

// Upload logo image (Company only)
router.post('/upload-logo', authorize('company'), upload.single('logo'), companyController.uploadLogo);

module.exports = router;
