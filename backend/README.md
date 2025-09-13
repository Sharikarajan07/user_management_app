# User Management Backend API

This is the backend API for the User Management Application built with Node.js, Express.js, and PostgreSQL.

## Features

- ✅ Complete CRUD operations for users
- ✅ Input validation and sanitization
- ✅ Search functionality with pagination
- ✅ User statistics endpoint
- ✅ Error handling middleware
- ✅ CORS configuration
- ✅ Security headers with Helmet
- ✅ Request logging
- ✅ Database connection pooling
- ✅ Auto-updating timestamps

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables by creating a `.env` file:
   ```env
   PORT=5000
   NODE_ENV=development
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=userdb
   DB_USER=postgres
   DB_PASSWORD=SRI#1212
   API_PREFIX=/api/v1
   ```

4. Make sure PostgreSQL is running and create the database:
   ```sql
   CREATE DATABASE userdb;
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Base URL
`http://localhost:5000/api/v1`

### User Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users with optional search and pagination |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |
| GET | `/users/stats` | Get user statistics |

### Query Parameters for GET /users

- `search` (string): Search term for username, full name, email, or location
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)

### Request Body for POST/PUT /users

```json
{
  "username": "john_doe",
  "fullName": "John Doe",
  "email": "john@example.com",
  "phoneNumber": "+1234567890",
  "location": "New York, USA"
}
```

### Response Format

All API responses follow this format:

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

For errors:

```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ] // For validation errors
}
```

## Database Schema

### Users Table

| Column | Type | Constraints |
|--------|------|-------------|
| id | SERIAL | PRIMARY KEY |
| username | VARCHAR(50) | UNIQUE, NOT NULL |
| full_name | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | UNIQUE, NOT NULL |
| phone_number | VARCHAR(20) | NOT NULL |
| location | VARCHAR(100) | NOT NULL |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |
| updated_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP, AUTO-UPDATE |

## Scripts

- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm test` - Run tests (to be implemented)

## Security Features

- CORS configuration for cross-origin requests
- Helmet for security headers
- Input validation and sanitization
- SQL injection prevention with parameterized queries
- Error handling without exposing sensitive information

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment mode | development |
| DB_HOST | Database host | localhost |
| DB_PORT | Database port | 5432 |
| DB_NAME | Database name | userdb |
| DB_USER | Database username | postgres |
| DB_PASSWORD | Database password | - |
| API_PREFIX | API route prefix | /api/v1 |

## Error Codes

- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 404: Not Found
- 409: Conflict (duplicate entry)
- 500: Internal Server Error