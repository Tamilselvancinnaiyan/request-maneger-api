const { createLogger, format, transports } = require("winston");
const { combine, timestamp, printf, errors, colorize, json } = format;
const DailyRotateFile = require("winston-daily-rotate-file");
const fs = require("fs");
const path = require("path");

const isVercel = process.env.VERCEL === true;

const logFormat = printf(({ level, message, timestamp, requestId, stack }) => {
  return `${timestamp} [${level}] [REQ-ID: ${requestId ?? "N/A"}] : ${
    stack || message
  }`;
});

const logger = createLogger({
  level: "info",
  format: combine(
    timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    errors({ stack: true }),
    json()
  ),
  transports: [],
});

if (!isVercel ) {
  const logDir = path.join(__dirname, "../../logs");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  logger.add(
    new transports.File({
      filename: path.join(logDir, "combined.log"),
    })
  );

  logger.add(
    new transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
    })
  );

  logger.add(
    new DailyRotateFile({
      dirname: path.join(logDir, "daily"),
      filename: "app-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
  );
}

logger.add(
  new transports.Console({
    format: combine(colorize(), logFormat),
  })
);

module.exports = logger;
