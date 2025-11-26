function errorHandler(err, req, res, next) {
  console.error(err); // plug in winston/pino here if you want
  if (res.headersSent) return next(err);

  const status = err.status || 500;
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
}

module.exports = { errorHandler };
