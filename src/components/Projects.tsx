import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    category: 'web' | 'ml' | 'research';
    image: string;
    link: string;
    github: string;
    features: string[];
    demo: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "WhatsApp Clone",
        description: "A full-stack WhatsApp-like chat application with real-time messaging, voice/video calls, and advanced features.",
        technologies: [
            "React", "Node.js", "MongoDB", "WebSocket", "WebRTC",
            "Firebase", "Redux", "JWT", "Socket.io"
        ],
        category: 'web',
        image: "/images/whatsapp-clone.svg",
        link: "https://github.com/Shimul-Zahan/MVC-Client",
        github: "https://github.com/Shimul-Zahan/MVC-Server",
        features: [],
        demo: "https://github.com/Shimul-Zahan/MVC-Client"
    },
    {
        id: 2,
        title: "GO-FIRM Groceries",
        description: "A modern and efficient grocery e-commerce platform with user authentication, personalized dashboards, and seamless billing details.",
        technologies: [
            "React.js", "Node.js", "MongoDB", "Express.js", "React Router",
            "CSS Modules", "JWT", "Redux"
        ],
        category: 'web',
        image: "https://github.com/Shimul-Zahan/GO-FIRM/blob/main/image.png",
        link: "https://github.com/Shimul-Zahan/GO-FIRM",
        github: "https://github.com/Shimul-Zahan/GOFIRM-Server",
        features: [],
        demo: "https://go-firm-grocerries.netlify.app"
    },
    {
        id: 3,
        title: 'Research Paper Analysis Tool',
        description: 'An ML-powered tool that helps researchers analyze and summarize academic papers.',
        technologies: ['Python', 'PyTorch', 'NLP', 'React'],
        category: 'research',
        image: '/project2.svg',
        link: 'https://project2.com',
        github: 'https://github.com/yourusername/project2',
        features: [],
        demo: ''
    },
    {
        id: 4,
        title: 'E-commerce Platform',
        description: 'A modern e-commerce platform with real-time inventory management and analytics.',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'Redux'],
        category: 'web',
        image: '/project3.svg',
        link: 'https://project3.com',
        github: 'https://github.com/yourusername/project3',
        features: [],
        demo: ''
    },
];

const Projects = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const [activeCategory, setActiveCategory] = useState<'all' | 'web' | 'ml' | 'research'>('all');

    const filteredProjects = activeCategory === 'all'
        ? projects
        : projects.filter(project => project.category === activeCategory);

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.src = 'https://via.placeholder.com/400x300?text=Project+Image';
    };

    return (
        <section id="projects" className="section-padding">
            <div className="container-width">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="heading-2 text-center mb-12 text-4xl font-bold text-white">Featured Projects</h2>

                    <div className="flex justify-center gap-4 mb-12">
                        {['all', 'web', 'ml', 'research'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category as typeof activeCategory)}
                                className={`px-4 py-2 rounded-md capitalize transition-all duration-300 font-semibold ${activeCategory === category
                                    ? 'bg-secondary text-white shadow-lg shadow-secondary/30'
                                    : 'text-white hover:text-secondary hover:bg-secondary/10'
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-secondary/20 shadow-xl hover:shadow-secondary/20 transition-all duration-300"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover"
                                        onError={handleImageError}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                    <div className="absolute bottom-4 left-4 right-4">
                                        <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                                        <p className="text-white/80 text-sm">{project.description}</p>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-3 py-1 bg-secondary/10 rounded-full text-sm text-secondary"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="space-y-2 mb-6">
                                        {project.features.map((feature, featureIndex) => (
                                            <div key={featureIndex} className="flex items-center gap-2 text-textSecondary">
                                                <span className="text-secondary">•</span>
                                                <span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <Link
                                            to={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center py-2 px-4 bg-secondary/10 text-secondary rounded-lg hover:bg-secondary/20 transition-colors duration-300"
                                        >
                                            GitHub
                                        </Link>
                                        <Link
                                            to={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 text-center py-2 px-4 bg-secondary text-white rounded-lg hover:bg-secondary/90 transition-colors duration-300"
                                        >
                                            Live Demo
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects; 