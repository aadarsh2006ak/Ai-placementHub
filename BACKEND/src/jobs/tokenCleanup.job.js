const cron = require('node-cron');
const userModel = require('../models/user.model');
const logger = require('../config/logger');

function scheduleTokenCleanup() {
    // Run every day at midnight
    cron.schedule('0 0 * * *', async () => {
        logger.info('Running background job: tokenCleanup...');
        try {
            const cutoff = new Date();
            cutoff.setHours(cutoff.getHours() - 24); // 24 hours ago

            // Delete users who are not verified and created over 24 hours ago
            const result = await userModel.deleteMany({
                isVerified: false,
                createdAt: { $lt: cutoff }
            });

            logger.info(`Database cleanup finished. Removed ${result.deletedCount} expired unverified accounts.`);
        } catch (err) {
            logger.error('Error in tokenCleanup job:', err);
        }
    });
}

module.exports = scheduleTokenCleanup;
