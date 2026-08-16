const companyService = require('../services/company.service');
const uploadService = require('../services/upload.service');

async function getCompanyProfile(req, res, next) {
    try {
        const companyId = req.user.role === 'company' ? req.user._id : req.query.companyId;
        const profile = await companyService.getProfile(companyId);
        res.status(200).json({ success: true, profile });
    } catch (err) {
        next(err);
    }
}

async function updateCompanyProfile(req, res, next) {
    try {
        const profile = await companyService.updateProfile(req.user._id, req.body);
        res.status(200).json({ success: true, message: 'Profile updated successfully', profile });
    } catch (err) {
        next(err);
    }
}

async function uploadLogo(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResult = await uploadService.uploadFile(req.file.buffer, 'logos', 'image');
        
        await companyService.setLogo(req.user._id, uploadResult.secure_url);

        res.status(200).json({
            success: true,
            message: 'Logo uploaded successfully',
            logoUrl: uploadResult.secure_url
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getCompanyProfile,
    updateCompanyProfile,
    uploadLogo
};
