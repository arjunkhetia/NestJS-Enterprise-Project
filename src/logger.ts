/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  }),
);

// Configure daily rotating log file
const transport = new winston.transports.DailyRotateFile({
  dirname: 'logs', // Folder where logs are stored
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true, // Compress old logs
  maxSize: '20m', // Max file size
  maxFiles: '14d', // Keep logs for 14 days
});

export const logger = winston.createLogger({
  level: 'silly',
  format: logFormat,
  transports: [
    new winston.transports.Console(), // Console logging
    transport, // File logging with rotation
  ],
});
