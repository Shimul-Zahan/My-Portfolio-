import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface Skill {
    id: number;
    name: string;
    x: number;
    y: number;
    color: string;
    icon: string;
}

const skills: Skill[] = [
    // Frontend
    { id: 1, name: 'React', x: 100, y: 100, color: '#61DAFB', icon: '⚛️' },
    { id: 2, name: 'TypeScript', x: 250, y: 100, color: '#3178C6', icon: '📘' },
    { id: 3, name: 'Next.js', x: 400, y: 100, color: '#000000', icon: '▲' },

    // Backend
    { id: 4, name: 'Node.js', x: 100, y: 200, color: '#339933', icon: '🟢' },
    { id: 5, name: 'Python', x: 250, y: 200, color: '#3776AB', icon: '🐍' },
    { id: 6, name: 'FastAPI', x: 400, y: 200, color: '#009688', icon: '⚡' },

    // ML/AI
    { id: 7, name: 'TensorFlow', x: 100, y: 300, color: '#FF6F00', icon: '🧠' },
    { id: 8, name: 'PyTorch', x: 250, y: 300, color: '#EE4C2C', icon: '🔥' },
    { id: 9, name: 'Scikit-learn', x: 400, y: 300, color: '#F7931E', icon: '📊' },

    // Cloud & DevOps
    { id: 10, name: 'AWS', x: 175, y: 400, color: '#FF9900', icon: '☁️' },
    { id: 11, name: 'Docker', x: 325, y: 400, color: '#2496ED', icon: '🐳' },
    { id: 12, name: 'Kubernetes', x: 475, y: 400, color: '#326CE5', icon: '⚙️' },
];

// Generate all possible connections between skills
const paths: string[] = [];
for (let i = 0; i < skills.length; i++) {
    for (let j = i + 1; j < skills.length; j++) {
        const start = skills[i];
        const end = skills[j];
        paths.push(`M${start.x},${start.y} L${end.x},${end.y}`);
    }
}

// Add some curved paths for variety
const curvedPaths: string[] = [
    // Curved connections between frontend and backend
    `M100,100 Q175,150 100,200`,
    `M250,100 Q175,150 250,200`,
    `M400,100 Q325,150 400,200`,

    // Curved connections between backend and ML/AI
    `M100,200 Q175,250 100,300`,
    `M250,200 Q175,250 250,300`,
    `M400,200 Q325,250 400,300`,

    // Curved connections between ML/AI and Cloud
    `M100,300 Q175,350 175,400`,
    `M250,300 Q250,350 325,400`,
    `M400,300 Q325,350 475,400`,
];

// Combine straight and curved paths
const allPaths = [...paths, ...curvedPaths];

const Hero: React.FC = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="home" className="h-screen flex items-center justify-center pt-16">
            <div className="container-width">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <motion.div
                        ref={ref}
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={inView ? {
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 15
                            }
                        } : {}}
                        className="text-center md:text-left"
                    >
                        <motion.h1
                            className="heading-1"
                            initial={{ opacity: 0, x: -50 }}
                            animate={inView ? {
                                opacity: 1,
                                x: 0,
                                transition: { delay: 0.2 }
                            } : {}}
                        >
                            Hi, I'm <span className="name-highlight">Shimul Zahan</span>
                        </motion.h1>
                        <motion.h2
                            className="title-highlight text-2xl sm:text-3xl text-textSecondary mb-8"
                            initial={{ opacity: 0, x: -50 }}
                            animate={inView ? {
                                opacity: 1,
                                x: 0,
                                transition: { delay: 0.4 }
                            } : {}}
                        >
                            FullStack Developer | ML Engineer | AI Researcher
                        </motion.h2>
                        <motion.p
                            className="paragraph max-w-2xl mx-auto md:mx-0 mb-8"
                            initial={{ opacity: 0, x: -50 }}
                            animate={inView ? {
                                opacity: 1,
                                x: 0,
                                transition: { delay: 0.6 }
                            } : {}}
                        >
                            I build innovative solutions using cutting-edge technologies and help organizations leverage the power of artificial intelligence.
                        </motion.p>
                        <motion.div
                            className="flex justify-center md:justify-start gap-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? {
                                opacity: 1,
                                y: 0,
                                transition: { delay: 0.8 }
                            } : {}}
                        >
                            <motion.button
                                onClick={() => {
                                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="bg-secondary hover:bg-secondary/80 text-white font-semibold px-6 py-3 rounded-md transition-all duration-300 shadow-lg hover:shadow-secondary/50 flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>View Projects</span>
                                <i className="fas fa-arrow-right"></i>
                            </motion.button>
                            <motion.button
                                onClick={() => {
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                                className="border-2 border-secondary text-secondary hover:bg-secondary/10 px-6 py-3 rounded-md font-semibold transition-all duration-300 flex items-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>Contact Me</span>
                                <i className="fas fa-envelope"></i>
                            </motion.button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                        animate={inView ? {
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                                delay: 0.2
                            }
                        } : {}}
                        className="hidden md:block"
                    >
                        <div className="relative">
                            <svg width="700" height="450" className="relative">
                                {/* Animated Connection Lines */}
                                {allPaths.map((path, index) => (
                                    <motion.path
                                        key={index}
                                        d={path}
                                        stroke="url(#gradient)"
                                        strokeWidth="2"
                                        fill="transparent"
                                        strokeDasharray="300"
                                        strokeDashoffset="300"
                                        animate={{
                                            strokeDashoffset: [300, 0, 300],
                                            opacity: [0.3, 0.8, 0.3]
                                        }}
                                        transition={{
                                            duration: 3,
                                            ease: "easeInOut",
                                            delay: index * 0.2,
                                            repeat: Infinity
                                        }}
                                    />
                                ))}

                                {/* Gradient Definition */}
                                <defs>
                                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#64ffda" stopOpacity="0.3" />
                                        <stop offset="50%" stopColor="#64ffda" stopOpacity="0.8" />
                                        <stop offset="100%" stopColor="#64ffda" stopOpacity="0.3" />
                                    </linearGradient>
                                </defs>

                                {/* Skill Nodes */}
                                {skills.map((skill, index) => (
                                    <motion.g
                                        key={skill.id}
                                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1,
                                            rotate: 0,
                                            transition: {
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 15,
                                                delay: index * 0.1
                                            }
                                        }}
                                        whileHover={{
                                            scale: 1.2,
                                            transition: { type: "spring", stiffness: 300 }
                                        }}
                                    >
                                        <motion.circle
                                            cx={skill.x}
                                            cy={skill.y}
                                            r="30"
                                            fill={skill.color}
                                            stroke="#fff"
                                            strokeWidth="2"
                                            filter="drop-shadow(0 0 8px rgba(255,255,255,0.3))"
                                            whileHover={{
                                                filter: "drop-shadow(0 0 12px rgba(255,255,255,0.5))"
                                            }}
                                        />
                                        <motion.text
                                            x={skill.x}
                                            y={skill.y + 45}
                                            fill="white"
                                            fontSize="12"
                                            textAnchor="middle"
                                            className="font-medium"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                transition: { delay: index * 0.1 + 0.5 }
                                            }}
                                        >
                                            {skill.name}
                                        </motion.text>
                                        <motion.foreignObject
                                            x={skill.x - 15}
                                            y={skill.y - 15}
                                            width="30"
                                            height="30"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{
                                                opacity: 1,
                                                scale: 1,
                                                transition: { delay: index * 0.1 + 0.3 }
                                            }}
                                        >
                                            <div className="text-2xl text-white">{skill.icon}</div>
                                        </motion.foreignObject>
                                    </motion.g>
                                ))}
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Hero; 