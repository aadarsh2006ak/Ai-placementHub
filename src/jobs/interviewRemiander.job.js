const cron = require('node-cron');
const applicationModel = require('../models/application.model');
const { sendInterviewReminder } = require('../services/email.service');
const { createNotification } = require('../services/notification.service');
const logger = require('../config/logger');

function scheduleInterviewReminders() {
    // Run every day at 8:00 AM
    cron.schedule('0 8 * * *', async () => {
        logger.info('Running cron job: Scanning for tomorrows interviews...');
        try {
            const startOfTomorrow = new Date();
            startOfTomorrow.setDate(startOfTomorrow.getDate() + 1);
            startOfTomorrow.setHours(0, 0, 0, 0);

            const endOfTomorrow = new Date();
            endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);
            endOfTomorrow.setHours(23, 59, 59, 999);

            const applications = await applicationModel.find({
                interviewDate: {
                    $gte: startOfTomorrow,
                    $lte: endOfTomorrow
                }
            }).populate('student').populate({
                path: 'job',
                populate: { path: 'company' }
            });

            logger.info(`Found ${applications.length} interviews scheduled for tomorrow.`);

            for (const app of applications) {
                if (!app.student || !app.job || !app.job.company) {
                    logger.warn(`Skipping reminder for application ${app._id} due to missing student, job, or company profile.`);
                    continue;
                }
                try {
                    await sendInterviewReminder(app.student, app.job.company, app.job, app.interviewDate);

                    await createNotification({
                        recipient: app.student._id,
                        type: 'interview_schedule',
                        title: 'Upcoming Interview Reminder',
                        message: `Reminder: You have an interview with ${app.job.company.companyName} for ${app.job.title} tomorrow at ${new Date(app.interviewDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}.`
                    });
                } catch (notifyErr) {
                    logger.error(`Failed to send reminder to student for app ${app._id}:`, notifyErr);
                }
            }
        } catch (err) {
            logger.error('Error in interviewReminder cron job:', err);
        }
    });
}

module.exports = scheduleInterviewReminders;
