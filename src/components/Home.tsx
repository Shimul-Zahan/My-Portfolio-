import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                    Welcome to My Portfolio
                </h1>
                <p className="text-xl md:text-2xl text-textSecondary mb-8 max-w-2xl mx-auto">
                    I'm a passionate developer creating innovative solutions through code.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link
                        to="/projects"
                        className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                    >
                        View Projects
                    </Link>
                    <Link
                        to="/contact"
                        className="px-6 py-3 border border-secondary text-white rounded-lg hover:bg-secondary/10 transition-colors"
                    >
                        Contact Me
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default Home; 