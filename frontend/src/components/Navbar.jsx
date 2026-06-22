import { Link, useNavigate } from 'react-router-dom';
import { CheckSquare, LogOut } from 'lucide-react';

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-sm border-b">
            <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2 text-blue-600 font-bold text-xl">
                    <CheckSquare size={24} />
                    <span>TaskFlow</span>
                </Link>
                
                <div>
                    {token && token !== 'undefined' && token !== 'null' ? (
                        <div className="flex items-center space-x-4">
                            <span className="text-sm text-gray-600">Welcome, <strong>{username}</strong></span>
                            <button 
                                onClick={handleLogout}
                                className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors"
                            >
                                <LogOut size={18} />
                                <span className="hidden sm:inline">Logout</span>
                            </button>
                        </div>
                    ) : (
                        <div className="space-x-4">
                            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium">Login</Link>
                            <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Sign Up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
