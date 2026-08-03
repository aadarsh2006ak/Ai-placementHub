const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const { body } = require("express-validator");
const { validate } = require("../middleware/validate");
const { authUser } = require("../middleware/auth");
const { authLimiter } = require("../middleware/rateLimiter");

const validateRegister = [
    body("name").notEmpty().withMessage("Name is required").trim(),
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("role").isIn(["student", "company"]).withMessage("Role must be either 'student' or 'company'"),
    body("companyName").if(body("role").equals("company")).notEmpty().withMessage("Company name is required for company role").trim(),
    validate
];

const validateLogin = [
    body("email").isEmail().withMessage("Valid email is required").normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required"),
    validate
];

router.post("/register", authLimiter, validateRegister, authController.registerUser);
router.post("/login", authLimiter, validateLogin, authController.loginUser);
router.post("/logout", authController.logoutUser);
router.get("/me", authUser, authController.getMe);

module.exports = router;
