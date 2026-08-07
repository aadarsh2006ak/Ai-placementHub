const jobService = require('../services/job.service');
const applicationService = require('../services/application.service');
const notificationService = require('../services/notification.service');
const emailService = require('../services/email.service');
const logger = require('../config/logger');

async function createJob(req, res, next) {
    try {
        const job = await jobService.createJob(req.user._id, req.body);
        res.status(201).json({ success: true, message: 'Job posted successfully', job });
    } catch (err) {
        next(err);
    }
}

async function getJobs(req, res, next) {
    try {
        const jobs = await jobService.getJobs(req.query);
        res.status(200).json({ success: true, count: jobs.length, jobs });
    } catch (err) {
        next(err);
    }
}

async function getJobById(req, res, next) {
    try {
        const job = await jobService.getJobById(req.params.id);
        res.status(200).json({ success: true, job });
    } catch (err) {
        next(err);
    }
}

async function updateJob(req, res, next) {
    try {
        const job = await jobService.updateJob(req.params.id, req.user._id, req.user.role, req.body);
        res.status(200).json({ success: true, message: 'Job updated successfully', job });
    } catch (err) {
        next(err);
    }
}

async function deleteJob(req, res, next) {
    try {
        await jobService.deleteJob(req.params.id, req.user._id, req.user.role);
        res.status(200).json({ success: true, message: 'Job listing and applications deleted successfully' });
    } catch (err) {
        next(err);
    }
}

async function applyJob(req, res, next) {
    try {
        const application = await applicationService.applyJob(req.params.id, req.user._id);
        
        const jobDetails = await jobService.getJobById(req.params.id);
        
        try {
            await notificationService.createNotification({
                recipient: jobDetails.postedBy._id,
                sender: req.user._id,
                type: 'application_status',
                title: 'New Job Application',
                message: `${req.user.name} applied for the "${jobDetails.title}" job position.`
            });
        } catch (notifyErr) {
            // Silently swallow notification errors
        }

        res.status(201).json({ success: true, message: 'Applied successfully', application });
    } catch (err) {
        next(err);
    }
}

async function getJobApplications(req, res, next) {
    try {
        const applications = await applicationService.getJobApplications(req.params.id, req.user._id, req.user.role);
        res.status(200).json({ success: true, count: applications.length, applications });
    } catch (err) {
        next(err);
    }
}

async function getMyApplications(req, res, next) {
    try {
        const applications = await applicationService.getStudentApplications(req.user._id);
        res.status(200).json({ success: true, count: applications.length, applications });
    } catch (err) {
        next(err);
    }
}

async function updateApplicationStatus(req, res, next) {
    try {
        const { status, notes, interviewDate } = req.body;
        
        const application = await applicationService.updateStatus(
            req.params.applicationId, 
            req.user._id, 
            req.user.role, 
            status, 
            notes
        );

        if (interviewDate !== undefined) {
            application.interviewDate = interviewDate;
            await application.save();
        }

        try {
            let message = `Your application for "${application.job.title}" status has been updated to: ${status}.`;
            let type = 'application_status';
            if (status === 'shortlisted' && interviewDate) {
                message = `Congratulations! You have been shortlisted for "${application.job.title}". An interview is scheduled on ${new Date(interviewDate).toLocaleString()}.`;
                type = 'interview_schedule';

                // Send instant interview invitation email
                try {
                    await emailService.sendInterviewReminder(
                        application.student,
                        application.job.company,
                        application.job,
                        interviewDate
                    );
                } catch (emailErr) {
                    logger.error('Failed to send interview invitation email:', emailErr);
                }
            }

            await notificationService.createNotification({
                recipient: application.student._id || application.student,
                sender: req.user._id,
                type,
                title: `Application Status: ${status.toUpperCase()}`,
                message
            });
        } catch (notifyErr) {
            // Silently swallow
        }

        res.status(200).json({ success: true, message: 'Application status updated successfully', application });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    applyJob,
    getJobApplications,
    getMyApplications,
    updateApplicationStatus
};
