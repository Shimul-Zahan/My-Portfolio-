import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Project {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    category: 'web' | 'ml' | 'research';
    image: string;
    link: string;
    github: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: 'AI Image Recognition Platform',
        description: 'A full-stack application that uses deep learning to identify and classify objects in images.',
        technologies: ['React', 'Python', 'TensorFlow', 'FastAPI'],
        category: 'ml',
        image: '/project1.svg',
        link: 'https://project1.com',
        github: 'https://github.com/yourusername/project1',
    },
    {
        id: 2,
        title: 'Research Paper Analysis Tool',
        description: 'An ML-powered tool that helps researchers analyze and summarize academic papers.',
        technologies: ['Python', 'PyTorch', 'NLP', 'React'],
        category: 'research',
        image: '/project2.svg',
        link: 'https://project2.com',
        github: 'https://github.com/yourusername/project2',
    },
    {
        id: 3,
        title: 'E-commerce Platform',
        description: 'A modern e-commerce platform with real-time inventory management and analytics.',
        technologies: ['Next.js', 'Node.js', 'MongoDB', 'Redux'],
        category: 'web',
        image: '/project3.svg',
        link: 'https://project3.com',
        github: 'https://github.com/yourusername/project3',
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
                    <h2 className="heading-2 text-center mb-12 text-4xl font-bold text-textPrimary">Featured Projects</h2>

                    <div className="flex justify-center gap-4 mb-12">
                        {['all', 'web', 'ml', 'research'].map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category as typeof activeCategory)}
                                className={`px-4 py-2 rounded-md capitalize transition-all duration-300 font-medium ${
                                    activeCategory === category
                                        ? 'bg-secondary text-primary shadow-lg shadow-secondary/30'
                                        : 'text-textPrimary hover:text-secondary hover:bg-secondary/10'
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
                                className="bg-primary/30 backdrop-blur-sm rounded-lg overflow-hidden border border-secondary/20 shadow-xl hover:shadow-secondary/20 transition-all duration-300"
                            >
                                <div className="aspect-video bg-primary/50">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                        onError={handleImageError}
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-textPrimary mb-2">{project.title}</h3>
                                    <p className="text-textSecondary mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="flex gap-4">
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-secondary hover:text-secondary/80 transition-colors font-medium flex items-center gap-2"
                                        >
                                            <span>Live Demo</span>
                                            <i className="fas fa-external-link-alt text-sm"></i>
                                        </a>
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-secondary hover:text-secondary/80 transition-colors font-medium flex items-center gap-2"
                                        >
                                            <span>GitHub</span>
                                            <i className="fab fa-github text-sm"></i>
                                        </a>
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