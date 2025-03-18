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
        { id: 'light', name: 'Light', icon: '☀️', description: 'Professional light theme' },
        { id: 'dark', name: 'Dark', icon: '🌙', description: 'Deep black theme' },
        { id: 'system', name: 'System', icon: '⚙️', description: 'Match system preference' },
    ] as const;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-xl bg-tertiary hover:bg-tertiary/80 transition-all duration-300
                          shadow-sm hover:shadow-md active:scale-95"
                aria-label="Toggle theme"
            >
                <span className="text-xl">
                    {theme === 'light' ? '☀️' : theme === 'dark' ? '🌙' : '⚙️'}
                </span>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-1/2 -translate-x-1/2 mt-2 w-64 min-w-max rounded-xl border border-secondary/10 bg-primary shadow-lg backdrop-blur-md"
                    >
                        <div className="p-2">
                            {themes.map(({ id, name, icon, description }) => (
                                <button
                                    key={id}
                                    onClick={() => {
                                        setTheme(id as typeof theme);
                                        setIsOpen(false);
                                    }}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200
                                        ${theme === id
                                            ? 'bg-secondary/10 text-secondary'
                                            : 'hover:bg-tertiary text-textPrimary hover:shadow-sm'
                                        }`}
                                >
                                    <span className="text-lg">{icon}</span>
                                    {/* Show text only on larger screens */}
                                    <span className="font-medium hidden sm:flex">{name}</span>
                                    <span className="text-xs text-textSecondary hidden sm:flex">{description}</span>
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
