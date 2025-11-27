const express = require("express");
const requestId = require("./middleware/requestId");
const cors = require("cors"); 
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");
const logger = require('./utils/logger');

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://requestmaneger.vercel.app",
  "https://requestmaneger.vercel.app/",
];

app.use(requestId);
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`, { requestId: req.requestId });
  next();
});


app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
