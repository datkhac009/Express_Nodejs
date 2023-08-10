import winston from 'winston';
import dotenv from 'dotenv';

dotenv.config();

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
}

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'orange'
}

const transports = [
    new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.simple()
        )
    }),

    new winston.transports.File({
        filename: 'logs/errors.log',
        level: 'error',
    }),

    new winston.transports.File({
        filename: 'logs/warn.log',
        level: 'warn',
    }),

    new winston.transports.File({
        filename: 'logs/info.log',
        level: 'info',
    }),

    new winston.transports.File({
        filename: 'logs/combined.log'
    })
];

const logger = winston.createLogger({
    levels,
    level: 'info',
    format: winston.format.json(),
    transports,
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.colorize({ all: true }),
            winston.format.simple()
        ),
    }));
};

export default logger;