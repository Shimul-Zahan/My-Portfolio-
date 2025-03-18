import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCalendar, FaUser, FaTags, FaShare, FaBookmark, FaHeart } from 'react-icons/fa';
import blogData from '../data/blogs.json';

interface Blog {
    id: number;
    title: string;
    author: string;
    date: string;
    readTime: string;
    tags: string[];
    content: string;
    likes: number;
    comments: number;
    image: string;
    relatedPosts: {
        id: number;
        title: string;
        image: string;
        date: string;
    }[];
}

const BlogDetails = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState<Blog | null>(null);

    useEffect(() => {
        // Find the blog post with the matching ID
        const foundBlog = blogData.blogs.find(b => b.id === Number(id));
        setBlog(foundBlog || null);
    }, [id]);

    if (!blog) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-white text-xl">Blog post not found</div>
            </div>
        );
    }

    return (
        <article className="max-w-4xl mx-auto px-4 py-12">
            {/* Header Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8"
            >
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{blog.title}</h1>
                <div className="flex flex-wrap items-center gap-4 text-textSecondary">
                    <div className="flex items-center gap-2">
                        <FaUser className="text-secondary" />
                        <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaCalendar className="text-secondary" />
                        <span>{blog.date}</span>
                    </div>
                    <span className="text-secondary">{blog.readTime}</span>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                    {blog.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="px-3 py-1 bg-secondary/10 rounded-full text-sm text-secondary"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Featured Image */}
            {blog.image && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-8"
                >
                    <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-[400px] object-cover rounded-lg"
                    />
                </motion.div>
            )}

            {/* Content Section */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-invert max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Interaction Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center justify-between py-6 border-t border-secondary/20"
            >
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-textSecondary hover:text-secondary transition-colors">
                        <FaHeart className="text-xl" />
                        <span>{blog.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-textSecondary hover:text-secondary transition-colors">
                        <FaBookmark className="text-xl" />
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-textSecondary hover:text-secondary transition-colors">
                        <FaShare className="text-xl" />
                    </button>
                    <span className="text-textSecondary">{blog.comments} comments</span>
                </div>
            </motion.div>

            {/* Related Posts */}
            {blog.relatedPosts.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="mt-12"
                >
                    <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {blog.relatedPosts.map((post) => (
                            <motion.div
                                key={post.id}
                                whileHover={{ y: -5 }}
                                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-secondary/20"
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-48 object-cover"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-white mb-2">{post.title}</h3>
                                    <p className="text-textSecondary text-sm">{post.date}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            )}
        </article>
    );
};

export default BlogDetails; 