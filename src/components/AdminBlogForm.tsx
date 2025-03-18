import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaTrash, FaImage, FaSave } from 'react-icons/fa';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface BlogFormData {
    title: string;
    author: string;
    date: string;
    readTime: string;
    tags: string[];
    content: string;
    image: string;
    relatedPosts: {
        id: number;
        title: string;
        image: string;
        date: string;
    }[];
}

const AdminBlogForm = () => {
    const [formData, setFormData] = useState<BlogFormData>({
        title: '',
        author: '',
        date: new Date().toISOString().split('T')[0],
        readTime: '',
        tags: [],
        content: '',
        image: '',
        relatedPosts: []
    });

    const [newTag, setNewTag] = useState('');
    const [newRelatedPost, setNewRelatedPost] = useState({
        title: '',
        image: '',
        date: new Date().toISOString().split('T')[0]
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddTag = (e: React.FormEvent) => {
        e.preventDefault();
        if (newTag && !formData.tags.includes(newTag)) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleAddRelatedPost = (e: React.FormEvent) => {
        e.preventDefault();
        if (newRelatedPost.title && newRelatedPost.image) {
            setFormData(prev => ({
                ...prev,
                relatedPosts: [
                    ...prev.relatedPosts,
                    {
                        ...newRelatedPost,
                        id: prev.relatedPosts.length + 1
                    }
                ]
            }));
            setNewRelatedPost({
                title: '',
                image: '',
                date: new Date().toISOString().split('T')[0]
            });
        }
    };

    const handleRemoveRelatedPost = (id: number) => {
        setFormData(prev => ({
            ...prev,
            relatedPosts: prev.relatedPosts.filter(post => post.id !== id)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formData);
        // Reset form or show success message
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4 py-12"
        >
            <h1 className="text-3xl font-bold text-white mb-8">Create New Blog Post</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-white mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-white mb-2">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-white mb-2">Date</label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-white mb-2">Read Time</label>
                        <input
                            type="text"
                            name="readTime"
                            value={formData.readTime}
                            onChange={handleInputChange}
                            placeholder="e.g., 5 min read"
                            className="w-full px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                            required
                        />
                    </div>
                </div>

                {/* Tags */}
                <div>
                    <label className="block text-white mb-2">Tags</label>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {formData.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="px-3 py-1 bg-secondary/10 rounded-full text-sm text-secondary flex items-center gap-2"
                            >
                                {tag}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveTag(tag)}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    <FaTrash className="text-xs" />
                                </button>
                            </span>
                        ))}
                    </div>
                    <form onSubmit={handleAddTag} className="flex gap-2">
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Add a tag"
                            className="flex-1 px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                        />
                        <button
                            type="submit"
                            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                        >
                            <FaPlus />
                        </button>
                    </form>
                </div>

                {/* Featured Image */}
                <div>
                    <label className="block text-white mb-2">Featured Image URL</label>
                    <div className="flex gap-4">
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            placeholder="Enter image URL"
                            className="flex-1 px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                        />
                        <button
                            type="button"
                            className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors"
                        >
                            <FaImage />
                        </button>
                    </div>
                </div>

                {/* Content Editor */}
                <div>
                    <label className="block text-white mb-2">Content</label>
                    <div className="bg-white/5 border border-secondary/20 rounded-lg overflow-hidden">
                        <ReactQuill
                            value={formData.content}
                            onChange={(content) => setFormData(prev => ({ ...prev, content }))}
                            className="text-white"
                            modules={{
                                toolbar: [
                                    [{ 'header': [1, 2, 3, false] }],
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                                    ['link', 'image', 'code-block']
                                ]
                            }}
                        />
                    </div>
                </div>

                {/* Related Posts */}
                <div>
                    <label className="block text-white mb-2">Related Posts</label>
                    <div className="space-y-4">
                        {formData.relatedPosts.map((post) => (
                            <div
                                key={post.id}
                                className="flex items-center gap-4 p-4 bg-white/5 border border-secondary/20 rounded-lg"
                            >
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-20 h-20 object-cover rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="text-white font-medium">{post.title}</h3>
                                    <p className="text-textSecondary text-sm">{post.date}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveRelatedPost(post.id)}
                                    className="text-red-500 hover:text-red-400"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}
                        <form onSubmit={handleAddRelatedPost} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input
                                    type="text"
                                    value={newRelatedPost.title}
                                    onChange={(e) => setNewRelatedPost(prev => ({ ...prev, title: e.target.value }))}
                                    placeholder="Post title"
                                    className="px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                                />
                                <input
                                    type="text"
                                    value={newRelatedPost.image}
                                    onChange={(e) => setNewRelatedPost(prev => ({ ...prev, image: e.target.value }))}
                                    placeholder="Image URL"
                                    className="px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                                />
                                <input
                                    type="date"
                                    value={newRelatedPost.date}
                                    onChange={(e) => setNewRelatedPost(prev => ({ ...prev, date: e.target.value }))}
                                    className="px-4 py-2 bg-white/5 border border-secondary/20 rounded-lg text-white focus:outline-none focus:border-secondary"
                                />
                            </div>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2"
                            >
                                <FaPlus />
                                Add Related Post
                            </button>
                        </form>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors flex items-center gap-2"
                    >
                        <FaSave />
                        Publish Blog Post
                    </button>
                </div>
            </form>
        </motion.div>
    );
};

export default AdminBlogForm; 