const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors, json, colorize } = format;
const DailyRotateFile = require("winston-daily-rotate-file");

// Custom console format (color + requestId)
const logFormat = printf(({ level, message, timestamp, requestId, stack }) => {
  return `${timestamp} [${level}] [REQ-ID: ${requestId ?? "N/A"}] : ${
    stack || message
  }`;
});

// Create Logger
const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }), // capture stack trace
    json()
  ),
  transports: [
    new transports.File({
      filename: "logs/combined.log",
    }),
    new transports.File({
      filename: "logs/error.log",
      level: "error",
    }),

    // Daily rotate
    new DailyRotateFile({
      dirname: "logs/daily",
      filename: "app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
  ],
});

// Console output only in dev
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: combine(colorize(), logFormat),
    })
  );
}

module.exports = logger;
