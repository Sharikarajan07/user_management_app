const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateUserId, validatePagination } = require('../middleware/validation');

// GET /api/v1/users - Get all users with optional search and pagination
router.get('/', validatePagination, userController.getAllUsers);

// GET /api/v1/users/stats - Get user statistics (must be before /:id)
router.get('/stats', userController.getUserStats);

// GET /api/v1/users/:id - Get single user by ID
router.get('/:id', validateUserId, userController.getUserById);

// POST /api/v1/users - Create new user
router.post('/', validateUser, userController.createUser);

// PUT /api/v1/users/:id - Update user
router.put('/:id', validateUserId, validateUser, userController.updateUser);

// DELETE /api/v1/users/:id - Delete user
router.delete('/:id', validateUserId, userController.deleteUser);

module.exports = router;