
const logger = require('../config/logger');

function errorHandler(err, req, res, next) {
    logger.error(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = [];

    // Mongoose bad ObjectId (CastError)
    if (err.name === 'CastError') {
        statusCode = 400;
        message = `Resource not found with id of ${err.value}`;
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        statusCode = 400;
        const duplicateField = Object.keys(err.keyValue)[0];
        message = `Duplicate value entered for ${duplicateField} field.`;
    }

    // Mongoose validation error
    if (err.name === 'ValidationError') {
        statusCode = 400;
        errors = Object.values(err.errors).map(val => ({
            field: val.path,
            message: val.message
        }));
        message = 'Validation failed';
    }

    // JWT verification errors
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid authentication token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Authentication token expired';
    }

    // Multer file upload errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        statusCode = 400;
        message = 'File size is too large. Max limit is 5MB.';
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(errors.length > 0 && { errors }),
        ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
    });
}

module.exports = errorHandler;
