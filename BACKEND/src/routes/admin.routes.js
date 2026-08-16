const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const { authUser } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

// All admin routes require login and the 'admin' role
router.use(authUser, authorize('admin'));

// Admin dashboard statistics
router.get('/dashboard-stats', adminController.getDashboardStats);

// Manage users (students/companies/admins)
router.get('/users', adminController.getAllUsers);
router.delete('/users/:id', adminController.deleteUser);

module.exports = router;
