import pool from '../config/db.js';

export const createTask = async (userId, title, description) => {
    const result = await pool.query(
        'INSERT INTO tasks (user_id, title, description) VALUES ($1, $2, $3) RETURNING *',
        [userId, title, description]
    );
    return result.rows[0];
};

export const getTasksByUserId = async (userId) => {
    const result = await pool.query(
        'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
    );
    return result.rows;
};
