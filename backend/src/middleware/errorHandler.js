const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', err);

  // Default error
  let error = {
    success: false,
    message: err.message || 'Internal Server Error',
    statusCode: err.statusCode || 500
  };

  // PostgreSQL unique constraint error
  if (err.code === '23505') {
    error.message = 'Duplicate entry found';
    error.statusCode = 409;
  }

  // PostgreSQL foreign key constraint error
  if (err.code === '23503') {
    error.message = 'Referenced record not found';
    error.statusCode = 400;
  }

  // PostgreSQL not null constraint error
  if (err.code === '23502') {
    error.message = 'Required field is missing';
    error.statusCode = 400;
  }

  // Validation error
  if (err.name === 'ValidationError') {
    error.message = 'Validation failed';
    error.statusCode = 400;
  }

  res.status(error.statusCode).json({
    success: false,
    message: error.message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

const notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`);
  error.statusCode = 404;
  next(error);
};

module.exports = { errorHandler, notFound };