import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/fonts.css';
import ThemeToggle from './ThemeToggle';

// Blog post type definition
interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
}

// Sample blog data
const blogPosts: BlogPost[] = [
    {
        id: "1",
        title: "The Future of Web Development: What's Next in 2024",
        excerpt: "Exploring upcoming trends in web development, from AI integration to advanced animations.",
        content: "Full blog content here...",
        image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop",
        category: "Web Development",
        date: "March 10, 2024",
        readTime: "5 min read"
    },
    {
        id: '2',
        title: 'Mastering TypeScript: Advanced Tips and Tricks',
        excerpt: 'Deep dive into TypeScript features that will level up your development game.',
        content: 'Full blog content here...',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
        category: 'TypeScript',
        date: 'March 8, 2024',
        readTime: '7 min read'
    },
    {
        id: '3',
        title: 'Building Scalable React Applications',
        excerpt: 'Learn the best practices for creating maintainable and scalable React apps.',
        content: 'Full blog content here...',
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=2070&auto=format&fit=crop',
        category: 'React',
        date: 'March 5, 2024',
        readTime: '6 min read'
    },
    {
        id: '4',
        title: 'The Art of UI/UX Design',
        excerpt: 'Understanding the principles behind creating engaging user experiences.',
        content: 'Full blog content here...',
        image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2071&auto=format&fit=crop',
        category: 'Design',
        date: 'March 3, 2024',
        readTime: '4 min read'
    },
    {
        id: '5',
        title: 'Modern CSS Techniques',
        excerpt: 'Exploring the latest CSS features and how to use them effectively.',
        content: 'Full blog content here...',
        image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop',
        category: 'CSS',
        date: 'March 1, 2024',
        readTime: '5 min read'
    },
    {
        id: '6',
        title: 'Getting Started with Next.js',
        excerpt: 'A comprehensive guide to building applications with Next.js.',
        content: 'Full blog content here...',
        image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop',
        category: 'Next.js',
        date: 'February 28, 2024',
        readTime: '8 min read'
    }
];

// Available categories for filtering
const categories = ['All', ...new Set(blogPosts.map(post => post.category))];

const BlogList = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    // Filter posts based on category and search query
    const filteredPosts = blogPosts.filter(post => {
        const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
        const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-20 bg-primary min-h-screen transition-colors duration-300">
            <div className="container-width px-4">
                {/* Theme Toggle */}
                {/* <div className="flex justify-end mb-8">
                    <ThemeToggle />
                </div> */}

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <span className="font-sans text-secondary text-sm font-medium tracking-wider uppercase mb-3 inline-block">
                        Welcome to My Blog
                    </span>
                    <h2 className="font-heading text-4xl md:text-5xl font-bold text-textPrimary mb-6 leading-tight tracking-tight">
                        Insights & <span className="font-display text-secondary">Perspectives</span>
                    </h2>
                    <p className="font-sans text-textSecondary max-w-2xl mx-auto text-lg leading-relaxed">
                        Exploring the frontiers of web development, sharing insights, and documenting my journey through the ever-evolving tech landscape.
                    </p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-16"
                >
                    <div className="flex flex-col md:flex-row gap-6 justify-between items-center bg-tertiary/50 backdrop-blur-sm p-6 rounded-xl border border-secondary/10">
                        {/* Category Filter */}
                        <div className="flex flex-wrap gap-3 justify-center">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`font-sans px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${selectedCategory === category
                                        ? 'bg-secondary text-primary shadow-lg shadow-secondary/20'
                                        : 'bg-primary/50 text-secondary border border-secondary/20 hover:border-secondary hover:bg-secondary/5'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Search Bar */}
                        <div className="relative w-full md:w-72">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="font-sans w-full px-5 py-3 bg-primary/50 border border-secondary/20 rounded-lg text-textPrimary placeholder-textSecondary/50 focus:outline-none focus:border-secondary/50 focus:ring-2 focus:ring-secondary/10 transition-all duration-300"
                            />
                            <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 text-secondary/50"></i>
                        </div>
                    </div>
                </motion.div>

                {/* Blog Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 * index }}
                            className="group"
                        >
                            <div className="h-full bg-tertiary/50 backdrop-blur-sm rounded-xl border border-secondary/10 overflow-hidden hover:border-secondary/30 transition-all duration-300">
                                {/* Blog Image */}
                                <Link to={`/blog/${post.id}`} className="block relative overflow-hidden aspect-video">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </Link>

                                {/* Blog Content */}
                                <div className="p-7">
                                    <div className="flex items-center gap-4 text-sm text-textSecondary mb-4">
                                        <time className="font-sans flex items-center gap-2">
                                            <i className="fa-regular fa-calendar text-secondary/70"></i>
                                            {post.date}
                                        </time>
                                        <span>•</span>
                                        <span className="font-sans flex items-center gap-2">
                                            <i className="fa-regular fa-clock text-secondary/70"></i>
                                            {post.readTime}
                                        </span>
                                    </div>

                                    <Link to={`/blog/${post.id}`}>
                                        <h3 className="font-heading text-xl font-bold text-textPrimary mb-3 hover:text-secondary transition-colors duration-300 line-clamp-2">
                                            {post.title}
                                        </h3>
                                    </Link>

                                    <p className="font-sans text-textSecondary mb-5 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <span className="font-sans px-4 py-1.5 bg-secondary/5 text-secondary text-sm font-medium rounded-full border border-secondary/10">
                                            {post.category}
                                        </span>
                                        <Link
                                            to={`/blog/${post.id}`}
                                            className="font-sans inline-flex items-center gap-2 text-secondary hover:text-secondary/80 transition-colors duration-300 font-medium group-hover:gap-3"
                                        >
                                            Read More
                                            <i className="fa-solid fa-arrow-right text-sm transition-all duration-300 group-hover:translate-x-1"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Empty State */}
                {filteredPosts.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-16 bg-tertiary/50 backdrop-blur-sm rounded-xl border border-secondary/10"
                    >
                        <i className="fa-solid fa-face-sad-tear text-5xl text-secondary/50 mb-4"></i>
                        <h3 className="font-heading text-2xl font-bold text-textPrimary mb-3">No Posts Found</h3>
                        <p className="font-sans text-textSecondary text-lg max-w-md mx-auto">
                            We couldn't find any posts matching your criteria. Try adjusting your search or filter settings.
                        </p>
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default BlogList; 