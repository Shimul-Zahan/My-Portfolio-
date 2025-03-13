import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

const Experience = () => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end end"]
    });

    // Smooth out the scroll progress
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const experiences = [
        {
            title: "Senior FullStack Developer",
            company: "Tech Company",
            period: "2022 - Present",
            description: "Led development of full-stack applications using React, Node.js, and Python. Implemented ML models for predictive analytics.",
            technologies: ["React", "Node.js", "Python", "TensorFlow", "AWS"],
            icon: "fa-solid fa-code"
        },
        {
            title: "ML Engineer",
            company: "AI Research Lab",
            period: "2021 - 2022",
            description: "Developed and deployed machine learning models for computer vision applications. Optimized model performance and reduced inference time.",
            technologies: ["PyTorch", "OpenCV", "Docker", "Kubernetes"],
            icon: "fa-solid fa-brain"
        },
        {
            title: "FullStack Developer",
            company: "Startup",
            period: "2020 - 2021",
            description: "Built scalable web applications using modern technologies. Implemented CI/CD pipelines and automated testing.",
            technologies: ["Next.js", "TypeScript", "MongoDB", "GitHub Actions"],
            icon: "fa-solid fa-rocket"
        }
    ];

    return (
        <section id="experience" className="py-20 bg-primary" ref={ref}>
            <div className="container-width">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl font-bold text-secondary mb-4">Experience</h2>
                    <p className="text-textSecondary max-w-2xl mx-auto">
                        My professional journey in software development and machine learning.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Animated Timeline line */}
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-secondary/20"
                        style={{
                            height: '100%',
                            originY: 0,
                            scaleY
                        }}
                    />

                    {/* Glowing dot that follows scroll */}
                    <motion.div
                        className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full z-20"
                        style={{
                            top: 0,
                            y: useTransform(scrollYProgress, [0, 1], [0, ref.current ? ref.current.offsetHeight - 32 : 0]),
                            boxShadow: '0 0 10px rgba(var(--color-secondary), 0.5)'
                        }}
                    />

                    <div className="space-y-12">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 w-3 h-3 bg-secondary/50 rounded-full z-10"></div>

                                {/* Content */}
                                <div className={`w-full md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                                    <motion.div
                                        className="bg-secondary/10 p-6 rounded-lg border border-secondary/20"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <i className={`${exp.icon} text-secondary text-xl`}></i>
                                            <h3 className="text-xl font-semibold text-secondary">{exp.title}</h3>
                                        </div>
                                        <h4 className="text-lg text-textPrimary mb-2">{exp.company}</h4>
                                        <p className="text-textSecondary mb-4">{exp.period}</p>
                                        <p className="text-textSecondary mb-4">{exp.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {exp.technologies.map((tech, techIndex) => (
                                                <motion.span
                                                    key={techIndex}
                                                    className="px-3 py-1 bg-secondary/20 rounded-full text-sm text-secondary"
                                                    whileHover={{ scale: 1.05 }}
                                                    transition={{ duration: 0.2 }}
                                                >
                                                    {tech}
                                                </motion.span>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="mt-12 p-6 bg-primary/50 rounded-lg border border-secondary/20"
                >
                    <h3 className="text-xl font-semibold text-secondary mb-4">Experience Highlights</h3>
                    <ul className="space-y-4 text-textSecondary">
                        <li>• Full-stack development with modern technologies</li>
                        <li>• Machine learning and AI model development</li>
                        <li>• Cloud infrastructure and deployment</li>
                        <li>• Data analysis and visualization</li>
                        <li>• Agile development methodologies</li>
                        <li>• Team leadership and project management</li>
                    </ul>
                </motion.div>
            </div>
        </section>
    );
};

export default Experience;