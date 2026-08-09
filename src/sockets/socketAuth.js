const jwt = require('jsonwebtoken');

module.exports = (socket, next) => {
    let token = socket.handshake.auth?.token || socket.handshake.query?.token;

    // Also check cookies from socket handshake headers if available
    if (!token && socket.handshake.headers?.cookie) {
        const rawCookies = socket.handshake.headers.cookie.split(';');
        for (const cookie of rawCookies) {
            const [key, value] = cookie.trim().split('=');
            if (key === 'token') {
                token = decodeURIComponent(value);
                break;
            }
        }
    }
    
    if (!token) {
        return next(new Error('Authentication error: Token not provided.'));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.userId = decoded.id;
        socket.role = decoded.role;
        next();
    } catch (err) {
        next(new Error('Authentication error: Invalid or expired token.'));
    }
};
