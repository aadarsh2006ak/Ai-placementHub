const { Server } = require('socket.io');
const socketAuth = require('./socketAuth');
const registerNotificationHandlers = require('./notification.socket');
const logger = require('../config/logger');

let io = null;

function initSocket(server) {
    io = new Server(server, {
        cors: {
            origin: process.env.CLIENT_URL || ['http://localhost:5173', 'http://localhost:5174'],
            credentials: true,
            methods: ['GET', 'POST']
        }
    });

    io.use(socketAuth);

    io.on('connection', (socket) => {
        registerNotificationHandlers(io, socket);
    });

    logger.info('Socket.IO initialized successfully.');
    return io;
}

function getIO() {
    return io;
}

module.exports = {
    initSocket,
    getIO
};
