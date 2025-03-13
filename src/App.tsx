import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Research from './components/Research';
import Experience from './components/Experience';
import Contact from './components/Contact';
import BackgroundShapes from './components/BackgroundShapes';
import Analytics from './components/Analytics';
import './App.css';

const App = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const sections = [
        { id: 'home', name: 'Home', icon: 'fa-solid fa-house', component: <Hero /> },
        { id: 'about', name: 'About', icon: 'fa-solid fa-user', component: <About /> },
        { id: 'experience', name: 'Experience', icon: 'fa-solid fa-briefcase', component: <Experience /> },
        { id: 'projects', name: 'Projects', icon: 'fa-solid fa-code', component: <Projects /> },
        { id: 'research', name: 'Research', icon: 'fa-solid fa-microscope', component: <Research /> },
        { id: 'analytics', name: 'Analytics', icon: 'fa-solid fa-chart-line', component: <Analytics /> },
        { id: 'contact', name: 'Contact', icon: 'fa-solid fa-envelope', component: <Contact /> },
    ];

    const renderSection = () => {
        switch (activeSection) {
            case 'home':
                return <Hero />;
            case 'about':
                return <About />;
            case 'experience':
                return <Experience />;
            case 'projects':
                return <Projects />;
            case 'research':
                return <Research />;
            case 'analytics':
                return <Analytics />;
            case 'contact':
                return <Contact />;
            default:
                return <Hero />;
        }
    };

    return (
        <div className="bg-background text-textPrimary min-h-screen overflow-x-hidden">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="fixed top-4 left-4 z-50 md:hidden text-secondary"
            >
                <i className={`fa-solid ${isSidebarOpen ? 'fa-xmark' : 'fa-bars'} text-2xl`}></i>
            </button>

            {/* Sidebar */}
            <motion.div
                className={`w-64 bg-primary/90 backdrop-blur-md border-r border-secondary/20 p-4 fixed h-screen z-40
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300`}
                initial={{ x: -100 }}
                animate={{ x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-secondary">Shimul</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1">
                        <ul className="space-y-2">
                            {sections.map((section) => (
                                <motion.li
                                    key={section.id}
                                    whileHover={{ x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <button
                                        onClick={() => {
                                            setActiveSection(section.id);
                                            setIsSidebarOpen(false);
                                        }}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeSection === section.id
                                            ? 'bg-secondary text-primary'
                                            : 'text-textSecondary hover:bg-secondary/10'
                                            }`}
                                    >
                                        <i className={`${section.icon} w-5`}></i>
                                        <span>{section.name}</span>
                                    </button>
                                </motion.li>
                            ))}
                        </ul>
                    </nav>

                    {/* Footer */}
                    <div className="pt-4 border-t border-secondary/20">
                        <p className="text-sm text-textSecondary text-center">
                            © {new Date().getFullYear()} Shimul
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Main Content */}
            <div className="w-full md:pl-64">
                <Navbar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                <BackgroundShapes />
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeSection}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 md:p-8 mt-16"
                    >
                        {renderSection()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default App; 