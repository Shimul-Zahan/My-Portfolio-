import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Logo from './Logo';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission here
        console.log('Form submitted:', formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const socialLinks = [
        { name: 'GitHub', url: 'https://github.com/Shimul-Zahan', icon: 'fa-brands fa-github' },
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/random-agent/', icon: 'fa-brands fa-linkedin' },
        { name: 'Email', url: 'mailto:shimulzahan636@gmail.com', icon: 'fa-solid fa-envelope' }
    ];

    return (
        <section id="contact" className="py-20 bg-primary">
            <div className="container-width">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-secondary mb-4">Connect with Me</h2>
                    <p className="text-textSecondary max-w-2xl mx-auto">
                        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left Column - Social Links */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="text-center md:text-left">
                            <Logo />
                            <p className="mt-4 text-textSecondary">
                                Let's work together to bring your ideas to life.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                            {socialLinks.map((link) => (
                                <motion.a
                                    key={link.name}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center space-x-2 text-textSecondary hover:text-secondary transition-colors"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="w-8 h-8 flex items-center justify-center rounded-full bg-secondary/10">
                                        <i className={link.icon}></i>
                                    </span>
                                    <span>{link.name}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Column - Contact Form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, x: 20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-6"
                    >
                        <div>
                            <label htmlFor="name" className="block text-textSecondary mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg focus:outline-none focus:border-secondary text-textPrimary"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-textSecondary mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg focus:outline-none focus:border-secondary text-textPrimary"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-textSecondary mb-2">
                                Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                rows={4}
                                className="w-full px-4 py-2 bg-secondary/10 border border-secondary/20 rounded-lg focus:outline-none focus:border-secondary text-textPrimary"
                                required
                            ></textarea>
                        </div>
                        <motion.button
                            type="submit"
                            className="w-full py-3 bg-secondary text-primary font-semibold rounded-lg hover:bg-secondary/90 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Send Message
                        </motion.button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
};

export default Contact; 