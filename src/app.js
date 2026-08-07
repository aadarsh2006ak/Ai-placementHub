const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const logger = require('./config/logger');
const errorHandler = require('./middleware/errorHandler');
const { apiLimiter } = require('./middleware/rateLimiter');

const authRoutes = require('./routes/auth.routes');
const studentRoutes = require('./routes/student.routes');
const companyRoutes = require('./routes/company.routes');
const adminRoutes = require('./routes/admin.routes');
const jobRoutes = require('./routes/job.routes');

const app = express();

// Security Headers
app.use(helmet());

// CORS Configuration
app.use(cors({
    origin: process.env.CLIENT_URL
        ? (process.env.CLIENT_URL.includes(',') ? process.env.CLIENT_URL.split(',').map(url => url.trim()) : process.env.CLIENT_URL)
        : ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Request parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// HTTP Request Logger
const morganFormat = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
app.use(morgan(morganFormat, {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

// Global Rate Limiting
app.use(apiLimiter);

// API Routes
const API_V1 = '/api/v1';
app.use(`${API_V1}/auth`, authRoutes);
app.use(`${API_V1}/students`, studentRoutes);
app.use(`${API_V1}/companies`, companyRoutes);
app.use(`${API_V1}/admins`, adminRoutes);
app.use(`${API_V1}/jobs`, jobRoutes);

// Base Route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Welcome to the Placement Hub API. Access /api/v1 for backend services.'
    });
});

// 404 Route handler
app.use((req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

// Centralized Error Handler Middleware
app.use(errorHandler);

module.exports = app;