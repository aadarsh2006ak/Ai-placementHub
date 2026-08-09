const cron = require('node-cron');
const jobModel = require('../models/job.model');
const studentProfileModel = require('../models/studentProfile.model');
const { sendJobAlert } = require('../services/email.service');
const { createNotification } = require('../services/notification.service');
const logger = require('../config/logger');

function scheduleJobAlerts() {
    // Run every day at 9:00 AM
    cron.schedule('0 9 * * *', async () => {
        logger.info('Running cron job: Scanning for new job alerts matching student profiles...');
        try {
            const cutoff = new Date();
            cutoff.setHours(cutoff.getHours() - 24); // Jobs posted in last 24 hours

            const newJobs = await jobModel.find({
                active: true,
                createdAt: { $gte: cutoff }
            }).populate('company');

            if (newJobs.length === 0) {
                logger.info('No new jobs posted in the last 24 hours. Skipping alerts.');
                return;
            }

            logger.info(`Found ${newJobs.length} new jobs to match.`);

            const students = await studentProfileModel.find().populate('user');

            for (const student of students) {
                if (!student.user || !student.skills || !Array.isArray(student.skills)) continue;

                for (const job of newJobs) {
                    if (!job.requirements || !Array.isArray(job.requirements)) continue;

                    const hasMatchingSkill = job.requirements.some((skill) =>
                        student.skills.some(
                            (s) => s && skill && s.toLowerCase().trim() === skill.toLowerCase().trim()
                        )
                    );

                    if (hasMatchingSkill) {
                        const companyName = job.company?.companyName || 'Hiring Partner';
                        try {
                            await sendJobAlert(student.user, job, job.company || { companyName });

                            await createNotification({
                                recipient: student.user._id,
                                type: 'job_alert',
                                title: 'New Matching Job Listed',
                                message: `${job.title} at ${companyName} matches your profile skills.`
                            });
                        } catch (notifyErr) {
                            logger.error(`Failed to send job alert for job ${job._id} to student ${student.user._id}:`, notifyErr.message || notifyErr);
                        }
                    }
                }
            }
        } catch (err) {
            logger.error('Error in jobAlert cron job:', err.message || err);
        }
    });
}

module.exports = scheduleJobAlerts;
