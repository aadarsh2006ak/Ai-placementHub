const applicationModel = require('../models/application.model');
const jobModel = require('../models/job.model');
const studentProfileModel = require('../models/studentProfile.model');

async function applyJob(jobId, studentId) {
    const job = await jobModel.findById(jobId);
    if (!job || !job.active) {
        const error = new Error('Job not found or is no longer active');
        error.statusCode = 404;
        throw error;
    }

    const studentProfile = await studentProfileModel.findOne({ user: studentId });
    if (!studentProfile) {
        const error = new Error('Student profile not found. Complete your profile first.');
        error.statusCode = 400;
        throw error;
    }

    if (!studentProfile.resume) {
        const error = new Error('Please upload a resume in your profile before applying');
        error.statusCode = 400;
        throw error;
    }

    const alreadyApplied = await applicationModel.findOne({
        job: jobId,
        student: studentId
    });

    if (alreadyApplied) {
        const error = new Error('You have already applied for this job listing');
        error.statusCode = 400;
        throw error;
    }

    const newApplication = new applicationModel({
        job: jobId,
        student: studentId,
        resume: studentProfile.resume,
        status: 'applied'
    });

    await newApplication.save();
    return newApplication;
}

async function getJobApplications(jobId, userId, role) {
    const job = await jobModel.findById(jobId);
    if (!job) {
        const error = new Error('Job not found');
        error.statusCode = 404;
        throw error;
    }

    if (job.postedBy.toString() !== userId.toString() && role !== 'admin') {
        const error = new Error('Not authorized to view candidates for this job');
        error.statusCode = 403;
        throw error;
    }

    return await applicationModel.find({ job: jobId })
        .populate('student', 'name email')
        .sort({ createdAt: -1 });
}

async function getStudentApplications(studentId) {
    return await applicationModel.find({ student: studentId })
        .populate({
            path: 'job',
            populate: {
                path: 'company',
                select: 'companyName logo location industry'
            }
        })
        .sort({ createdAt: -1 });
}

async function updateStatus(applicationId, userId, role, status, notes) {
    const application = await applicationModel.findById(applicationId)
        .populate({
            path: 'job',
            populate: { path: 'company' }
        })
        .populate('student', 'name email');
    if (!application) {
        const error = new Error('Application not found');
        error.statusCode = 404;
        throw error;
    }

    if (application.job.postedBy.toString() !== userId.toString() && role !== 'admin') {
        const error = new Error('Not authorized to update status for this job application');
        error.statusCode = 403;
        throw error;
    }

    application.status = status;
    if (notes !== undefined) {
        application.notes = notes;
    }

    await application.save();
    return application;
}

module.exports = {
    applyJob,
    getJobApplications,
    getStudentApplications,
    updateStatus
};
