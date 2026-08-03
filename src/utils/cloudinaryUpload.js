const cloudinary = require('../config/cloudinary');

const uploadToCloudinary = (fileBuffer, folder, resourceType = 'auto') => {
    return new Promise((resolve, reject) => {
        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY) {
            return reject(new Error('Cloudinary configuration is missing in environment variables.'));
        }
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder: folder, resource_type: resourceType },
            (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result);
            }
        );
        uploadStream.end(fileBuffer);
    });
};

module.exports = { uploadToCloudinary };
