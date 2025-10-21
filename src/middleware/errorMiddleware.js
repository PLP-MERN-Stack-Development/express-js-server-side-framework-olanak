// src/middleware/errorMiddleware.js

function globalErrorHandler(err, req, res, next) {
  // Default values
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log error for development
  console.error(err);

  res.status(statusCode).json({
    status: err.status || 'error',
    message,
  });
}

module.exports = globalErrorHandler;
