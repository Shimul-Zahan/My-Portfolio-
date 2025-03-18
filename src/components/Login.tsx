import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'admin@gmail.com' && password === 'admin@gmail.com') {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin/blog/new');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="min-h-screen flex items-center justify-center px-4"
        >
            <div className="max-w-md w-full space-y-8 bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-secondary/20">
                <div>
                    <h2 className="text-3xl font-bold text-white text-center">Admin Login</h2>
                    <p className="mt-2 text-center text-textSecondary">Sign in to manage your blog</p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    {error && (
                        <div className="text-red-500 text-center">{error}</div>
                    )}
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-white mb-2">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-white mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                    >
                        Sign in
                    </button>
                </form>
            </div>
        </motion.div>
    );
};

export default Login; 