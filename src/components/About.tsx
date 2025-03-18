import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const skills = {
        frontend: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
        backend: ['Node.js', 'Python', 'FastAPI', 'MongoDB'],
        ml: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'NLP'],
        tools: ['Git', 'Docker', 'AWS', 'CI/CD'],
    };

    return (
        <section id="about" className="section-padding lg:pl-16">
            <div className="container-width">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="section-title text-center mb-12">About Me</h2>
                    <div className="grid md:grid-cols-2 gap-12">
                        <div>
                            <p className="paragraph">
                                I'm a passionate FullStack Developer and ML Engineer with a strong foundation in both software engineering and artificial intelligence. My journey in tech has been driven by a curiosity to solve complex problems and create innovative solutions.
                            </p>
                            <p className="paragraph">
                                With experience in developing full-stack applications and implementing machine learning models, I bridge the gap between traditional software development and cutting-edge AI technologies.
                            </p>
                        </div>
                        <div>
                            <h3 className="heading-3 mb-6">Skills & Expertise</h3>
                            <div className="grid grid-cols-2 gap-6">
                                {Object.entries(skills).map(([category, items]) => (
                                    <div key={category}>
                                        <h4 className="title-highlight text-lg text-secondary mb-3 capitalize">
                                            {category}
                                        </h4>
                                        <ul className="space-y-2">
                                            {items.map((skill) => (
                                                <li key={skill} className="text-textSecondary">
                                                    {skill}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About; 