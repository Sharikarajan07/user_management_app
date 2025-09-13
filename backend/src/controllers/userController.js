const pool = require('../config/database');
const { validationResult } = require('express-validator');

class UserController {
  // Get all users with optional search and pagination
  async getAllUsers(req, res) {
    try {
      const { search = '', page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      let query = `
        SELECT 
          id, 
          username, 
          full_name as "fullName", 
          email, 
          phone_number as "phoneNumber", 
          location, 
          created_at as "createdAt",
          updated_at as "updatedAt"
        FROM users
      `;
      let countQuery = 'SELECT COUNT(*) FROM users';
      let queryParams = [];
      let countParams = [];

      if (search) {
        const searchCondition = `
          WHERE 
            username ILIKE $1 OR 
            full_name ILIKE $1 OR 
            email ILIKE $1 OR 
            location ILIKE $1
        `;
        query += searchCondition;
        countQuery += searchCondition;
        queryParams.push(`%${search}%`);
        countParams.push(`%${search}%`);
      }

      query += ` ORDER BY created_at DESC LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`;
      queryParams.push(limit, offset);

      const [usersResult, countResult] = await Promise.all([
        pool.query(query, queryParams),
        pool.query(countQuery, countParams)
      ]);

      const users = usersResult.rows;
      const totalUsers = parseInt(countResult.rows[0].count);
      const totalPages = Math.ceil(totalUsers / limit);

      res.json({
        success: true,
        data: {
          users,
          pagination: {
            currentPage: parseInt(page),
            totalPages,
            totalUsers,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
          }
        }
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch users',
        error: error.message
      });
    }
  }

  // Get single user by ID
  async getUserById(req, res) {
    try {
      const { id } = req.params;

      const query = `
        SELECT 
          id, 
          username, 
          full_name as "fullName", 
          email, 
          phone_number as "phoneNumber", 
          location, 
          created_at as "createdAt",
          updated_at as "updatedAt"
        FROM users 
        WHERE id = $1
      `;

      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user',
        error: error.message
      });
    }
  }

  // Create new user
  async createUser(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { username, fullName, email, phoneNumber, location } = req.body;

      // Check if username or email already exists
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE username = $1 OR email = $2',
        [username, email]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Username or email already exists'
        });
      }

      const query = `
        INSERT INTO users (username, full_name, email, phone_number, location)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING 
          id, 
          username, 
          full_name as "fullName", 
          email, 
          phone_number as "phoneNumber", 
          location, 
          created_at as "createdAt",
          updated_at as "updatedAt"
      `;

      const result = await pool.query(query, [username, fullName, email, phoneNumber, location]);

      res.status(201).json({
        success: true,
        message: 'User created successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create user',
        error: error.message
      });
    }
  }

  // Update user
  async updateUser(req, res) {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const { username, fullName, email, phoneNumber, location } = req.body;

      // Check if user exists
      const userExists = await pool.query('SELECT id FROM users WHERE id = $1', [id]);
      if (userExists.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      // Check if username or email already exists for other users
      const existingUser = await pool.query(
        'SELECT id FROM users WHERE (username = $1 OR email = $2) AND id != $3',
        [username, email, id]
      );

      if (existingUser.rows.length > 0) {
        return res.status(409).json({
          success: false,
          message: 'Username or email already exists'
        });
      }

      const query = `
        UPDATE users 
        SET username = $1, full_name = $2, email = $3, phone_number = $4, location = $5
        WHERE id = $6
        RETURNING 
          id, 
          username, 
          full_name as "fullName", 
          email, 
          phone_number as "phoneNumber", 
          location, 
          created_at as "createdAt",
          updated_at as "updatedAt"
      `;

      const result = await pool.query(query, [username, fullName, email, phoneNumber, location, id]);

      res.json({
        success: true,
        message: 'User updated successfully',
        data: result.rows[0]
      });
    } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update user',
        error: error.message
      });
    }
  }

  // Delete user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      // Check if user exists
      const userExists = await pool.query('SELECT id FROM users WHERE id = $1', [id]);
      if (userExists.rows.length === 0) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      await pool.query('DELETE FROM users WHERE id = $1', [id]);

      res.json({
        success: true,
        message: 'User deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete user',
        error: error.message
      });
    }
  }

  // Get user statistics
  async getUserStats(req, res) {
    try {
      const statsQuery = `
        SELECT 
          COUNT(*) as total_users,
          COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '7 days' THEN 1 END) as new_users_this_week,
          COUNT(CASE WHEN created_at >= CURRENT_DATE - INTERVAL '30 days' THEN 1 END) as new_users_this_month
        FROM users
      `;

      const result = await pool.query(statsQuery);
      const stats = result.rows[0];

      res.json({
        success: true,
        data: {
          totalUsers: parseInt(stats.total_users),
          newUsersThisWeek: parseInt(stats.new_users_this_week),
          newUsersThisMonth: parseInt(stats.new_users_this_month)
        }
      });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user statistics',
        error: error.message
      });
    }
  }
}

module.exports = new UserController();