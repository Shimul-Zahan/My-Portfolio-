import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface ResearchPaper {
    id: number;
    title: string;
    authors: string;
    conference: string;
    year: number;
    abstract: string;
    link: string;
}

const researchPapers: ResearchPaper[] = [
    {
        id: 1,
        title: 'Advanced Neural Network Architectures for Image Recognition',
        authors: 'Your Name, Co-Author',
        conference: 'International Conference on Machine Learning',
        year: 2023,
        abstract: 'This paper presents novel neural network architectures that improve accuracy and efficiency in image recognition tasks.',
        link: 'https://example.com/paper1',
    },
    {
        id: 2,
        title: 'Natural Language Processing in Healthcare Applications',
        authors: 'Your Name, Co-Author',
        conference: 'Conference on Artificial Intelligence in Medicine',
        year: 2022,
        abstract: 'Exploring the applications of NLP techniques in healthcare data analysis and patient care.',
        link: 'https://example.com/paper2',
    },
];

const Research = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <section id="research" className="section-padding bg-tertiary">
            <div className="container-width">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="heading-2 text-center mb-12">Research Work</h2>
                    <div className="grid gap-8">
                        {researchPapers.map((paper, index) => (
                            <motion.div
                                key={paper.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.8, delay: index * 0.2 }}
                                className="bg-primary p-6 rounded-lg"
                            >
                                <h3 className="heading-3 text-secondary mb-2">{paper.title}</h3>
                                <p className="text-textSecondary mb-2">
                                    {paper.authors} • {paper.conference} • {paper.year}
                                </p>
                                <p className="paragraph">{paper.abstract}</p>
                                <a
                                    href={paper.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-secondary hover:text-secondary/80 transition-colors inline-flex items-center"
                                >
                                    Read Paper
                                    <svg
                                        className="w-4 h-4 ml-2"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                                        />
                                    </svg>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Research; 