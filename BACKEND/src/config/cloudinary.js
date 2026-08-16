const cloudinary = require('cloudinary').v2;
const logger = require('./logger');

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
    logger.warn('Cloudinary environment variables are not fully configured. File uploads will fail.');
} else {
    cloudinary.config({
        cloud_name: cloudName,
        api_key: apiKey,
        api_secret: apiSecret
    });
    logger.info('Cloudinary configured successfully.');
}

module.exports = cloudinary;
