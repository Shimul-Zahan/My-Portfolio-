import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import Research from './components/Research';
import Blog from './components/Blog';
import BlogDetails from './components/BlogDetails';
import Experience from './components/Experience';
import Contact from './components/Contact';
import AdminBlogForm from './components/AdminBlogForm';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <ThemeProvider>
            <Router>
                <div className="min-h-screen bg-background text-textPrimary">
                    <Navigation />
                    <main className="md:ml-64">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/research" element={<Research />} />
                            <Route path="/blog" element={<Blog />} />
                            <Route path="/blog/:id" element={<BlogDetails />} />
                            <Route path="/experience" element={<Experience />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/admin/login" element={<Login />} />
                            <Route
                                path="/admin/blog/new"
                                element={
                                    <ProtectedRoute>
                                        <AdminBlogForm />
                                    </ProtectedRoute>
                                }
                            />
                        </Routes>
                    </main>
                </div>
            </Router>
        </ThemeProvider>
    );
};

export default App;