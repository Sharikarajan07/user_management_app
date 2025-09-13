-- User Management Database Setup Script

-- Create database (run this first if database doesn't exist)
-- CREATE DATABASE userdb;

-- Connect to the userdb database and run the following:

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    location VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- Create function to auto-update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert some sample data (optional)
INSERT INTO users (username, full_name, email, phone_number, location) VALUES 
('john_doe', 'John Doe', 'john@example.com', '+1234567890', 'New York, USA'),
('jane_smith', 'Jane Smith', 'jane@example.com', '+1987654321', 'Los Angeles, USA'),
('mike_johnson', 'Mike Johnson', 'mike@example.com', '+1555123456', 'Chicago, USA')
ON CONFLICT (username) DO NOTHING;

-- Verify the setup
SELECT 'Users table created successfully' as status;
SELECT COUNT(*) as total_users FROM users;