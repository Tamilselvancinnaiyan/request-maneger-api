const express = require("express");
const morgan = require("morgan");
const cors = require("cors"); 
const routes = require("./routes");
const { errorHandler } = require("./middleware/errorHandler");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://requestmaneger.vercel.app",
];

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
app.use(morgan("dev"));

app.use("/api", routes);

app.use(errorHandler);

module.exports = app;
