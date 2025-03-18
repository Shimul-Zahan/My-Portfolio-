import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Research from './components/Research';
import BlogList from './components/BlogList';
import Contact from './components/Contact';

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <div className="min-h-screen bg-background text-textPrimary">
                    <Navigation />
                    <main className="md:ml-64">
                        <Routes>
                            <Route path="/" element={<Hero />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/research" element={<Research />} />
                            <Route path="/blog" element={<BlogList />} />
                            <Route path="/contact" element={<Contact />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;