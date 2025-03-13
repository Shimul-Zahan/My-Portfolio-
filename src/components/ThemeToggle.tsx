import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const themes = [
        { id: 'light', name: 'Light', icon: '☀️' },
        { id: 'dark', name: 'Dark', icon: '🌙' },
        { id: 'system', name: 'System', icon: '⚙️' },
    ] as const;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-lg bg-tertiary hover:bg-tertiary/80 transition-colors duration-200"
                aria-label="Toggle theme"
            >
                <span className="text-xl">
                    {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '⚙️'}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 rounded-xl border border-secondary/10 bg-primary shadow-lg backdrop-blur-sm"
                    >
                        <div className="p-2">
                            {themes.map(({ id, name, icon }) => (
                                <button
                                    key={id}
                                    onClick={() => {
                                        setTheme(id as typeof theme);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-colors duration-200
                                        ${theme === id ? 'bg-secondary/10 text-secondary' : 'hover:bg-tertiary text-textPrimary'}`}
                                >
                                    <span className="text-lg">{icon}</span>
                                    <span className="font-medium">{name}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ThemeToggle; 