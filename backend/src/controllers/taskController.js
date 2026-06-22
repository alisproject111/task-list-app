import { createTask, getTasksByUserId } from '../models/taskModel.js';

export const addTask = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }

        const task = await createTask(req.user.id, title, description);
        res.status(201).json(task);
    } catch (error) {
        console.error('Create task error:', error);
        res.status(500).json({ message: 'Server error creating task' });
    }
};

export const getTasks = async (req, res) => {
    try {
        const tasks = await getTasksByUserId(req.user.id);
        res.json(tasks);
    } catch (error) {
        console.error('Get tasks error:', error);
        res.status(500).json({ message: 'Server error fetching tasks' });
    }
};
