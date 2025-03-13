import React from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    return (
        <motion.nav
            className="fixed top-0 right-0 left-0 md:left-64 z-30 bg-primary/80 backdrop-blur-md border-b border-secondary/20 w-full md:w-[calc(100%-16rem)]"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="w-full px-4 md:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Page Title */}
                    <h2 className="text-xl font-semibold text-secondary">Portfolio Dashboard</h2>

                    {/* Right side actions */}
                    <div className="flex items-center space-x-4">
                        <motion.a
                            href="https://github.com/Shimul-Zahan"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-textSecondary hover:text-secondary transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-brands fa-github text-xl"></i>
                        </motion.a>
                        <motion.a
                            href="https://www.linkedin.com/in/random-agent/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-textSecondary hover:text-secondary transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="fa-brands fa-linkedin text-xl"></i>
                        </motion.a>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar; 