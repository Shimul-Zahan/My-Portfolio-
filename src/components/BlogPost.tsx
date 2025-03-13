import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Sample blog post content (you can replace this with your actual content)
const blogContent = `
# The Future of Web Development: What's Next in 2024

As we dive into 2024, the web development landscape continues to evolve at a rapid pace. New technologies, frameworks, and methodologies are emerging, reshaping how we build and interact with web applications. Let's explore some of the most exciting trends and developments that are set to define the future of web development.

## 1. AI-Powered Development Tools

Artificial Intelligence is revolutionizing how we write and debug code. From intelligent code completion to automated testing, AI tools are becoming an integral part of the development workflow. Some key developments include:

- **AI Code Assistants**: Enhanced capabilities for code generation and refactoring
- **Automated Testing**: AI-driven test case generation and bug detection
- **Performance Optimization**: Smart suggestions for improving application performance

## 2. WebAssembly and Edge Computing

WebAssembly (Wasm) continues to gain traction, enabling high-performance code execution in the browser. Combined with edge computing, this creates new possibilities for:

- Running compute-intensive tasks directly in the browser
- Improved application performance and reduced latency
- Better user experiences for complex web applications

## 3. Enhanced Developer Experience

The focus on developer experience (DX) is stronger than ever, with new tools and frameworks designed to make development more efficient and enjoyable:

- **Next.js and Similar Frameworks**: Continued evolution of full-stack frameworks
- **TypeScript Adoption**: Increased type safety and better tooling support
- **Dev Containers**: Standardized development environments

## 4. Web Components and Micro-Frontends

Component-based architecture is evolving with:

- Better support for Web Components across browsers
- Micro-frontend architectures for large-scale applications
- Improved tooling for component development and testing

## Looking Ahead

The future of web development is exciting, with new possibilities emerging regularly. Staying updated with these trends while focusing on fundamentals will be key to success in 2024 and beyond.

Remember to:
- Keep learning and experimenting with new technologies
- Focus on performance and user experience
- Build accessible and inclusive web applications
- Consider sustainability in web development

The web platform continues to evolve, and with it comes new opportunities to create better, more engaging experiences for users worldwide.
`;

interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    image: string;
    category: string;
    date: string;
    readTime: string;
    author: {
        name: string;
        avatar: string;
    };
}

const samplePost: BlogPost = {
    id: "1",
    title: "The Future of Web Development: What's Next in 2024",
    excerpt: "Exploring upcoming trends in web development, from AI integration to advanced animations.",
    content: blogContent,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2074&auto=format&fit=crop",
    category: "Web Development",
    date: "March 10, 2024",
    readTime: "5 min read",
    author: {
        name: "Shimul Zahan",
        avatar: "https://avatars.githubusercontent.com/u/123710297?v=4"
    }
};

const BlogPost = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API call to fetch blog post
        const fetchPost = async () => {
            try {
                // In a real app, you would fetch the post from an API
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
                setPost(samplePost);
            } catch (error) {
                console.error('Error fetching blog post:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPost();
    }, [id]);

    if (isLoading) {
        return (
            <section className="py-20 bg-primary min-h-screen">
                <div className="container-width px-4">
                    <div className="animate-pulse">
                        <div className="h-8 bg-secondary/20 rounded w-3/4 mb-4"></div>
                        <div className="h-4 bg-secondary/20 rounded w-1/2 mb-8"></div>
                        <div className="h-96 bg-secondary/20 rounded mb-8"></div>
                        <div className="space-y-4">
                            <div className="h-4 bg-secondary/20 rounded w-full"></div>
                            <div className="h-4 bg-secondary/20 rounded w-5/6"></div>
                            <div className="h-4 bg-secondary/20 rounded w-4/6"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (!post) {
        return (
            <section className="py-20 bg-primary min-h-screen">
                <div className="container-width px-4 text-center">
                    <i className="fa-solid fa-triangle-exclamation text-4xl text-red-500 mb-4"></i>
                    <h2 className="text-2xl font-bold text-red-500 mb-4">Blog Post Not Found</h2>
                    <Link to="/blog" className="text-secondary hover:text-secondary/80 transition-colors">
                        <i className="fa-solid fa-arrow-left mr-2"></i>
                        Back to Blog List
                    </Link>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-primary min-h-screen">
            <div className="container-width px-4">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto mb-8"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <Link
                            to="/blog"
                            className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors"
                        >
                            <i className="fa-solid fa-arrow-left mr-2"></i>
                            Back to Blog List
                        </Link>
                        <span className="text-textSecondary">•</span>
                        <Link
                            to="/"
                            className="inline-flex items-center text-secondary hover:text-secondary/80 transition-colors"
                        >
                            <i className="fa-solid fa-home mr-2"></i>
                            Home
                        </Link>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-4">
                        {post.title}
                    </h1>

                    <div className="flex items-center gap-6 text-textSecondary mb-8">
                        <div className="flex items-center gap-2">
                            <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-10 h-10 rounded-full"
                            />
                            <span>{post.author.name}</span>
                        </div>
                        <span>•</span>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                    </div>
                </motion.div>

                {/* Featured Image */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="max-w-4xl mx-auto mb-12"
                >
                    <div className="relative aspect-video rounded-lg overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </motion.div>

                {/* Content */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="max-w-4xl mx-auto prose prose-invert prose-secondary"
                >
                    {post.content.split('\n').map((paragraph, index) => {
                        if (paragraph.startsWith('# ')) {
                            return <h1 key={index} className="text-3xl font-bold mb-6">{paragraph.slice(2)}</h1>;
                        }
                        if (paragraph.startsWith('## ')) {
                            return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{paragraph.slice(3)}</h2>;
                        }
                        if (paragraph.startsWith('- ')) {
                            return <li key={index} className="ml-6">{paragraph.slice(2)}</li>;
                        }
                        if (paragraph.startsWith('**')) {
                            const text = paragraph.replace(/\*\*/g, '');
                            return <strong key={index} className="font-bold">{text}</strong>;
                        }
                        return paragraph ? <p key={index} className="mb-4">{paragraph}</p> : null;
                    })}
                </motion.article>

                {/* Share and Navigation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="max-w-4xl mx-auto mt-12 pt-8 border-t border-secondary/20"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex items-center gap-4">
                            <span className="text-textSecondary">Share:</span>
                            <a
                                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary hover:text-secondary/80 transition-colors"
                            >
                                <i className="fa-brands fa-twitter text-xl"></i>
                            </a>
                            <a
                                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(post.title)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-secondary hover:text-secondary/80 transition-colors"
                            >
                                <i className="fa-brands fa-linkedin text-xl"></i>
                            </a>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                to={`/blog/${parseInt(post.id) - 1}`}
                                className={`text-secondary hover:text-secondary/80 transition-colors ${parseInt(post.id) <= 1 ? 'pointer-events-none opacity-50' : ''}`}
                            >
                                <i className="fa-solid fa-arrow-left mr-2"></i>
                                Previous Post
                            </Link>
                            <Link
                                to={`/blog/${parseInt(post.id) + 1}`}
                                className="text-secondary hover:text-secondary/80 transition-colors"
                            >
                                Next Post
                                <i className="fa-solid fa-arrow-right ml-2"></i>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default BlogPost; 