import pool from './db.js';

const createTables = async () => {
    const usersTable = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const tasksTable = `
        CREATE TABLE IF NOT EXISTS tasks (
            id SERIAL PRIMARY KEY,
            user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            is_completed BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    try {
        console.log('Connecting to database...');
        await pool.query(usersTable);
        console.log('Users table created or already exists.');
        
        await pool.query(tasksTable);
        console.log('Tasks table created or already exists.');
        
        console.log('Database setup completed successfully.');
    } catch (err) {
        console.error('Error creating tables. Make sure your PostgreSQL server is running and the database exists:', err);
    } finally {
        // Close the database connection
        pool.end();
    }
};

createTables();
