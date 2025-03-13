import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useScroll } from 'framer-motion';

interface ExperienceBarProps {
    title: string;
    level: number; // 0-100
    color?: string;
}

const ExperienceBar: React.FC<ExperienceBarProps> = ({ title, level, color = '#00ff00' }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px" });
    const controls = useAnimation();
    const [height, setHeight] = useState(0);
    const { scrollY } = useScroll();

    useEffect(() => {
        const updateHeight = () => {
            if (!isInView) return;

            // Get the element's position relative to the viewport
            const element = ref.current as HTMLElement | null;
            if (!element) return;

            const rect = element.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const elementCenter = rect.top + rect.height / 2;
            const scrollProgress = 1 - (elementCenter / viewportHeight);

            // Calculate height based on scroll position and level
            const targetHeight = Math.min(Math.max(scrollProgress * level, 0), level);
            setHeight(targetHeight);
        };

        // Update height when scroll changes
        const unsubscribe = scrollY.on("change", updateHeight);

        // Initial update
        updateHeight();

        return () => unsubscribe();
    }, [isInView, scrollY, level]);

    return (
        <div className="mb-6" ref={ref}>
            <div className="flex justify-between mb-2">
                <span className="text-textSecondary">{title}</span>
                <span className="text-secondary">{Math.round(height)}%</span>
            </div>
            <div className="h-32 w-full bg-secondary/10 rounded-lg overflow-hidden relative">
                <motion.div
                    className="absolute bottom-0 w-full rounded-lg"
                    style={{
                        backgroundColor: color,
                        height: `${height}%`,
                        transition: 'height 0.1s linear'
                    }}
                />
            </div>
        </div>
    );
};

export default ExperienceBar; 