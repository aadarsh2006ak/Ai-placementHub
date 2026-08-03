const notificationModel = require('../models/notification.model');
const { getIO } = require('../sockets');
const logger = require('../config/logger');

async function createNotification({ recipient, sender, type, title, message }) {
    try {
        const notification = new notificationModel({
            recipient,
            sender,
            type,
            title,
            message
        });
        await notification.save();

        const io = getIO();
        if (io) {
            io.to(recipient.toString()).emit('notification', notification);
            logger.info(`Real-time notification emitted to user: ${recipient}`);
        } else {
            logger.debug(`Socket.IO not initialized. Skipping real-time emission.`);
        }

        return notification;
    } catch (err) {
        logger.error('Error creating notification:', err);
        throw err;
    }
}

async function getNotifications(userId) {
    return await notificationModel.find({ recipient: userId }).sort({ createdAt: -1 });
}

async function markAsRead(notificationId, userId) {
    const notification = await notificationModel.findOne({ _id: notificationId, recipient: userId });
    if (!notification) {
        const error = new Error('Notification not found');
        error.statusCode = 404;
        throw error;
    }
    notification.read = true;
    await notification.save();
    return notification;
}

module.exports = {
    createNotification,
    getNotifications,
    markAsRead
};
