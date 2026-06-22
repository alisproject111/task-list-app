import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';
import { Plus } from 'lucide-react';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState({ title: '', description: '' });
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await axiosInstance.get('/tasks');
            setTasks(res.data);
        } catch (error) {
            toast.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleCreateTask = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/tasks', newTask);
            setTasks([res.data, ...tasks]);
            setNewTask({ title: '', description: '' });
            toast.success('Task added!');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to create task');
        }
    };

    if (loading) return <div className="text-center mt-10">Loading tasks...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 border rounded-lg shadow-sm mb-8">
                <h2 className="text-xl font-bold mb-4">Add New Task</h2>
                <form onSubmit={handleCreateTask} className="space-y-4">
                    <div>
                        <input 
                            type="text" 
                            placeholder="Task Title"
                            required
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={newTask.title}
                            onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        />
                    </div>
                    <div>
                        <textarea 
                            placeholder="Task Description (Optional)"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="3"
                            value={newTask.description}
                            onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        ></textarea>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center space-x-2">
                        <Plus size={18} />
                        <span>Add Task</span>
                    </button>
                </form>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-4">Your Tasks ({tasks.length})</h2>
                {tasks.length === 0 ? (
                    <div className="text-center py-10 bg-white border rounded-lg text-gray-500">
                        No tasks yet. Create one above!
                    </div>
                ) : (
                    <div className="grid gap-4 md:grid-cols-2">
                        {tasks.map(task => (
                            <div key={task.id} className="bg-white p-5 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-semibold text-lg">{task.title}</h3>
                                    <span className="text-xs text-gray-400">{new Date(task.created_at).toLocaleDateString()}</span>
                                </div>
                                <p className="text-gray-600 text-sm whitespace-pre-wrap">{task.description}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Tasks;
