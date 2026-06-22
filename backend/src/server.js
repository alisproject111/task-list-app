import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pool from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Task List API is running...');
});

// DB Test Route
app.get('/api-test', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ 
            success: true, 
            message: 'Database is connected perfectly! ✅',
            time: result.rows[0].now 
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ 
            success: false, 
            message: 'Database connection error ❌', 
            error: err.message 
        });
    }
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

export default app;
