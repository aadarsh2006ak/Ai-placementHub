const { uploadToCloudinary } = require('../utils/cloudinaryUpload');

async function uploadFile(fileBuffer, folder, resourceType = 'auto') {
    return await uploadToCloudinary(fileBuffer, folder, resourceType);
}

module.exports = {
    uploadFile
};
