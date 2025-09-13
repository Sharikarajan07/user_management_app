const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

// Load environment variables from the backend directory
require('dotenv').config({ path: path.join(__dirname, '.env') });

const routes = require('./src/routes');
const { errorHandler, notFound } = require('./src/middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// Only initialize database if we can connect
const initDB = async () => {
  try {
    const { initializeDatabase } = require('./src/models/User');
    await initializeDatabase();
  } catch (error) {
    console.log('⚠️  Starting server without database initialization');
  }
};

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] // Replace with your production domain
    : ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:4028'], // React dev server ports
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Logging middleware
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use(process.env.API_PREFIX || '/api/v1', routes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'User Management API',
    version: '1.0.0',
    endpoints: {
      health: `${process.env.API_PREFIX || '/api/v1'}/health`,
      users: `${process.env.API_PREFIX || '/api/v1'}/users`,
      userStats: `${process.env.API_PREFIX || '/api/v1'}/users/stats`
    },
    documentation: 'See README.md for API documentation'
  });
});

// Error handling middleware (must be last)
app.use(notFound);
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API Base URL: http://localhost:${PORT}${process.env.API_PREFIX || '/api/v1'}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📖 Visit http://localhost:${PORT} for API information`);
  
  // Initialize database after server starts
  initDB();
});

module.exports = app;