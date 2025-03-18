import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const Navigation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', label: 'Home', icon: '🏠' },
        { path: '/about', label: 'About', icon: '👤' },
        { path: '/projects', label: 'Projects', icon: '💻' },
        { path: '/research', label: 'Research', icon: '🔬' },
        { path: '/blog', label: 'Blog', icon: '📝' },
        { path: '/contact', label: 'Contact', icon: '📧' },
    ];

    const NavLink = ({ path, label, icon }: { path: string; label: string; icon: string }) => (
        <Link
            to={path}
            onClick={() => setIsOpen(false)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${location.pathname === path
                ? 'bg-secondary/20 text-secondary'
                : 'text-textSecondary hover:text-secondary hover:bg-secondary/10'
                }`}
        >
            <span className="text-xl">{icon}</span>
            <span className="font-medium">{label}</span>
        </Link>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary/80 backdrop-blur-sm md:hidden"
            >
                <svg
                    className="w-6 h-6 text-secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 20 }}
                            className="fixed top-0 left-0 h-full w-64 bg-primary/95 backdrop-blur-md border-r border-secondary/20 p-4 z-50 md:hidden"
                        >
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-2xl font-bold text-secondary">SHIMUL</span>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg hover:bg-secondary/10"
                                >
                                    <svg
                                        className="w-6 h-6 text-secondary"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <nav className="space-y-2">
                                {navItems.map((item) => (
                                    <NavLink key={item.path} {...item} />
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Desktop Sidebar */}
            <div className="hidden md:block fixed top-0 left-0 h-full w-64 bg-primary/95 backdrop-blur-md border-r border-secondary/20 p-4">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-2xl font-bold text-secondary">SHIMUL</span>
                    <ThemeToggle />
                </div>
                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <NavLink key={item.path} {...item} />
                    ))}
                </nav>
            </div>

            {/* Mobile Theme Toggle */}
            <div className="fixed top-4 right-4 z-50 md:hidden">
                <ThemeToggle />
            </div>
        </>
    );
};

export default Navigation;