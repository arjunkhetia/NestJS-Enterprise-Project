/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-base-to-string */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import * as winston from 'winston';
import 'winston-daily-rotate-file';

const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => {
    return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  }),
);

// Define JSON log format
const jsonLogFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.json(),
);

// Define Console log format (pretty print)
const consoleLogFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.colorize(),
  winston.format.printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `[${timestamp}] ${level}: ${message}\nStack Trace: ${stack}`
      : `[${timestamp}] ${level}: ${message}`;
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
  format: jsonLogFormat, // Store logs in JSON format
});

export const logger = winston.createLogger({
  level: 'silly',
  format: logFormat,
  transports: [
    // new winston.transports.Console(), // Console logging
    new winston.transports.Console({ format: consoleLogFormat }), // Console log (pretty)
    transport, // File logging with rotation
  ],
  exceptionHandlers: [
    new winston.transports.File({
      filename: 'logs/exceptions.log',
      format: jsonLogFormat,
    }),
  ],
  rejectionHandlers: [
    new winston.transports.File({
      filename: 'logs/rejections.log',
      format: jsonLogFormat,
    }),
  ],
});

// Middleware for structured logging in requests
export function requestLogger(req: any, res: any, next: any) {
  logger.info(`Incoming Request: ${req.method} ${req.url}`, {
    method: req.method,
    url: req.url,
    headers: req.headers,
  });
  next();
}
