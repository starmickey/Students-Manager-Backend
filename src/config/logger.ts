import winston from 'winston';
import fs from 'fs';

const { combine, timestamp, printf, errors, colorize } = winston.format;

class Logger {
  private static instance: winston.Logger;

  private static buildLogger(): winston.Logger {
    const isDevelopment = process.env.NODE_ENV !== 'production';

    // Ensure logs directory exists
    fs.mkdirSync('logs', { recursive: true });

    const logFormat = printf(({ level, message, timestamp, stack }) => {
      if (stack) {
        return `${timestamp} [${level}]: ${stack}`;
      }
      return `${timestamp} [${level}]: ${message}`;
    });

    const consoleFormat = combine(
      colorize({ all: true }),
      timestamp(),
      errors({ stack: true }),
      logFormat
    );

    const fileFormat = combine(
      timestamp(),
      errors({ stack: true }),
      logFormat
    );

    const transports: winston.transport[] = [
      // 1️⃣ Console — colored, log everything
      new winston.transports.Console({
        level: 'silly',
        format: consoleFormat
      }),

      // 2️⃣ Info file
      new winston.transports.File({
        filename: 'logs/info.log',
        level: 'info',
        format: fileFormat
      }),

      // 3️⃣ Error file
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        format: fileFormat
      })
    ];

    // 4️⃣ Debug file only in development
    if (isDevelopment) {
      transports.push(
        new winston.transports.File({
          filename: 'logs/debug.log',
          level: 'debug',
          format: fileFormat
        })
      );
    }

    return winston.createLogger({
      level: 'silly',
      transports
    });
  }

  public static getInstance(): winston.Logger {
    if (!Logger.instance) {
      Logger.instance = Logger.buildLogger();
    }

    return Logger.instance;
  }
}

export const logger = Logger.getInstance();


export const initLogger = () => Logger.getInstance();
