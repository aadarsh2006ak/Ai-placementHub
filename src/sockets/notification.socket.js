const logger = require('../config/logger');

module.exports = (io, socket) => {
    logger.info(`User authenticated and connected to socket: ${socket.userId} (socketId: ${socket.id})`);

    // Join a private room with user's ID
    socket.join(socket.userId.toString());

    // If admin, join the admins room
    if (socket.role === 'admin') {
        socket.join('admins');
        logger.info(`User ${socket.userId} joined admins socket room.`);
    }

    socket.on('disconnect', () => {
        logger.info(`User disconnected: ${socket.userId} (socketId: ${socket.id})`);
    });
};
