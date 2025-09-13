const express = require('express');
const router = express.Router();
const userRoutes = require('./userRoutes');

// Health check endpoint
router.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API is healthy',
    timestamp: new Date().toISOString()
  });
});

// User routes
router.use('/users', userRoutes);

module.exports = router;