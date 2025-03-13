import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, setIsSidebarOpen }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const navItems = [
        { id: 1, name: 'Home', icon: 'fa-solid fa-house', href: '#home' },
        { id: 2, name: 'About', icon: 'fa-solid fa-user', href: '#about' },
        { id: 3, name: 'Experience', icon: 'fa-solid fa-briefcase', href: '#experience' },
        { id: 4, name: 'Projects', icon: 'fa-solid fa-code', href: '#projects' },
        { id: 5, name: 'Research', icon: 'fa-solid fa-microscope', href: '#research' },
        { id: 6, name: 'Contact', icon: 'fa-solid fa-envelope', href: '#contact' },
    ];

    // Toggle drawer and sidebar based on screen size
    const handleToggleMenu = () => {
        if (window.innerWidth >= 768) {
            // For large screens, toggle sidebar
            setIsSidebarOpen(!isSidebarOpen);
        } else {
            // For small screens, toggle drawer
            setIsDrawerOpen(!isDrawerOpen);
        }
    };

    // Close drawer and sidebar
    const handleCloseMenu = () => {
        setIsDrawerOpen(false);
        setIsSidebarOpen(false);
    };

    // Handle screen resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                // Close drawer on large screens
                setIsDrawerOpen(false);
            } else {
                // Close sidebar on small screens
                setIsSidebarOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial check
        return () => window.removeEventListener('resize', handleResize);
    }, [setIsSidebarOpen]);

    // Handle escape key press
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseMenu();
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, []);

    return (
        <>
            {/* Main Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-30 bg-primary/80 backdrop-blur-md border-b border-secondary/20">
                <div className="w-full px-4 md:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Menu Button */}
                        <button
                            className="text-secondary p-2 hover:bg-secondary/10 rounded-lg transition-colors"
                            onClick={handleToggleMenu}
                        >
                            <i className={`fa-solid ${(isDrawerOpen || isSidebarOpen) ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
                        </button>

                        {/* Page Title */}
                        <h2 className="text-xl font-semibold text-secondary">Portfolio Dashboard</h2>

                        {/* Right side actions */}
                        <div className="flex items-center space-x-4">
                            <a
                                href="https://github.com/Shimul-Zahan"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-textSecondary hover:text-secondary transition-colors"
                            >
                                <i className="fa-brands fa-github text-xl"></i>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/random-agent/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-textSecondary hover:text-secondary transition-colors"
                            >
                                <i className="fa-brands fa-linkedin text-xl"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer - Only shown on small screens */}
            <AnimatePresence>
                {isDrawerOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={handleCloseMenu}
                        />

                        {/* Drawer */}
                        <motion.div
                            className="md:hidden fixed top-0 left-0 bottom-0 w-64 bg-primary border-r border-secondary/20 z-50"
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            {/* Drawer Header */}
                            <div className="p-4 border-b border-secondary/20">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-bold text-secondary">Menu</h2>
                                    <button
                                        className="text-secondary p-2 hover:bg-secondary/10 rounded-lg transition-colors"
                                        onClick={handleCloseMenu}
                                    >
                                        <i className="fa-solid fa-xmark text-xl"></i>
                                    </button>
                                </div>
                            </div>

                            {/* Navigation Links */}
                            <div className="py-4">
                                {navItems.map((item) => (
                                    <motion.a
                                        key={item.id}
                                        href={item.href}
                                        className="flex items-center gap-3 px-4 py-3 text-textSecondary hover:text-secondary hover:bg-secondary/10 transition-colors"
                                        onClick={handleCloseMenu}
                                        whileHover={{ x: 4 }}
                                    >
                                        <i className={`${item.icon} w-5`}></i>
                                        <span>{item.name}</span>
                                    </motion.a>
                                ))}
                            </div>

                            {/* Drawer Footer */}
                            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-secondary/20">
                                <div className="flex justify-center space-x-4">
                                    <motion.a
                                        href="https://github.com/Shimul-Zahan"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-textSecondary hover:text-secondary transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <i className="fa-brands fa-github text-xl"></i>
                                    </motion.a>
                                    <motion.a
                                        href="https://www.linkedin.com/in/random-agent/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-textSecondary hover:text-secondary transition-colors"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <i className="fa-brands fa-linkedin text-xl"></i>
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar; 