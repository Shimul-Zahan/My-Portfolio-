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
            title: "Full Stack Developer",
            company: "Systech Digital Limited",
            period: "Feb 2024 - Feb 2025",
            description: "Full-stack development, MEAN stack, +6 additional skills",
            technologies: ["MEAN Stack", "NestJS", "React.js", "MongoDB", "Node.js", "Express.js", "Angular"]
        },
        {
            title: "Jr. Full Stack Developer",
            company: "Systech Digital Limited",
            period: "Feb 2024 - Feb 2024",
            description: "Worked with NestJS, React.js, and +5 additional skills",
            technologies: ["NestJS", "React.js", "TypeScript", "MongoDB", "Node.js", "Express.js"]
        }

    ];

    return (
        <section id="experience" className="py-20 px-16 bg-primary" ref={ref}>
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
                        className="absolute left-1/2 transform -translate-x-1/2 w-[3px] bg-gradient-to-b from-secondary/30 via-secondary to-secondary/30"
                        style={{
                            height: '100%',
                            originY: 0,
                            scaleY,
                            filter: 'drop-shadow(0 0 10px var(--color-secondary))',
                            boxShadow: '0 0 15px var(--color-secondary)',
                            zIndex: 1
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
                                <motion.div
                                    className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-secondary rounded-full z-10"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                        delay: index * 0.2
                                    }}
                                    style={{
                                        boxShadow: '0 0 10px var(--color-secondary)'
                                    }}
                                />

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