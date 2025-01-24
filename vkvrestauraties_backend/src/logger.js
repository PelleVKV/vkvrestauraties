const winston = require('winston');

const logger = winston.createLogger({
    level: 'info', // Set the default log level (info, debug, warn, error)
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
            return `${timestamp} [${level}]: ${message}`;
        })
    ),
    transports: [
        // Log to the console
        new winston.transports.Console(),
        // Optionally, log to a file
        new winston.transports.File({ filename: 'logs/app.log' })
    ]
});

module.exports = logger;
