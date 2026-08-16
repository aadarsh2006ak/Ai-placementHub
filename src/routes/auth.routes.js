const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { registerValidator, loginValidator } = require('../validators/auth.validator');
const { authUser } = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');

router.post('/register', authLimiter, registerValidator, authController.registerUser);
router.post('/login', authLimiter, loginValidator, authController.loginUser);
router.post('/logout', authController.logoutUser);
router.post('/verify-email', authController.verifyEmail);
router.post('/resend-verification', authController.resendCode);
router.get('/me', authUser, authController.getMe);

module.exports = router;
