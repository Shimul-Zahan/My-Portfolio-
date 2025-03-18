import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';

const Blog = () => {
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsAdmin(localStorage.getItem('isAdmin') === 'true');
    }, []);

    const handleAddBlog = () => {
        if (isAdmin) {
            navigate('/admin/blog/new');
        } else {
            navigate('/admin/login');
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold text-white">Blog</h1>
                <button
                    onClick={handleAddBlog}
                    className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2"
                >
                    <FaPlus />
                    Add Blog
                </button>
            </div>
            {/* Rest of your blog component code */}
        </div>
    );
};

export default Blog; 