import React from 'react';
import { motion } from 'framer-motion';

const techIcons = [
    '⚛️', '📘', '🐍', '🧠', '⚡', '☁️', '🐳', '⚙️', '🔷', '🎯',
    '💻', '🔮', '🚀', '⚡', '🎨', '🔧', '📱', '🌐', '💾', '🔌'
];

const BackgroundShapes = () => {
    return (
        <div className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b from-primary/90 via-primary to-primary/90">
            {/* Animated Tech Icons */}
            {techIcons.map((icon, index) => (
                <motion.div
                    key={index}
                    className="absolute text-2xl opacity-5"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                        rotate: [0, 360],
                        opacity: [0.05, 0.1, 0.05],
                    }}
                    transition={{
                        duration: 15 + Math.random() * 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: Math.random() * 5,
                    }}
                >
                    {icon}
                </motion.div>
            ))}

            {/* Animated Shapes */}
            <motion.div
                className="absolute top-20 left-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            <motion.div
                className="absolute top-40 right-20 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl"
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.05, 0.1, 0.05],
                }}
                transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />

            {/* Animated Lines */}
            <div className="absolute inset-0">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute h-[1px] bg-secondary/5"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${100 + Math.random() * 200}px`,
                            transform: `rotate(${Math.random() * 360}deg)`,
                        }}
                        animate={{
                            opacity: [0.05, 0.1, 0.05],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 8 + Math.random() * 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Animated Dots */}
            <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-secondary/10 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.1, 0.2, 0.1],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 3,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Subtle Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>
    );
};

export default BackgroundShapes; 