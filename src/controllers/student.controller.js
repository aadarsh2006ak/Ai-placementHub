const studentService = require('../services/student.service');
const uploadService = require('../services/upload.service');

async function getStudentProfile(req, res, next) {
    try {
        const studentId = req.user.role === 'student' ? req.user._id : req.query.studentId;
        const profile = await studentService.getProfile(studentId);
        res.status(200).json({ success: true, profile });
    } catch (err) {
        next(err);
    }
}

async function updateStudentProfile(req, res, next) {
    try {
        const profile = await studentService.updateProfile(req.user._id, req.body);
        res.status(200).json({ success: true, message: 'Profile updated successfully', profile });
    } catch (err) {
        next(err);
    }
}

async function uploadResume(req, res, next) {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No file uploaded' });
        }

        const uploadResult = await uploadService.uploadFile(req.file.buffer, 'resumes', 'auto');
        
        await studentService.setResume(req.user._id, uploadResult.secure_url);

        res.status(200).json({
            success: true,
            message: 'Resume uploaded successfully',
            resumeUrl: uploadResult.secure_url
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getStudentProfile,
    updateStudentProfile,
    uploadResume
};
