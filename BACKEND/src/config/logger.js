const winston = require('winston');
const path = require('path');

const logFormat = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json()
);

const logger = winston.createLogger({
    level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
    format: logFormat,
    defaultMeta: { service: 'placement-hub-backend' },
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple()
            )
        })
    ]
});

if (process.env.NODE_ENV === 'production') {
    try {
        const fs = require('fs');
        const logDir = path.join(__dirname, '../../logs');
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        logger.add(new winston.transports.File({ filename: path.join(logDir, 'error.log'), level: 'error' }));
        logger.add(new winston.transports.File({ filename: path.join(logDir, 'combined.log') }));
    } catch (err) {
        console.error('Failed to initialize file logging', err);
    }
}

module.exports = logger;
