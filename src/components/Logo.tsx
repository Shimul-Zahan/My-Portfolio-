import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
    const firstName = "Shimul".split("");
    const lastName = "Zahan".split("");

    return (
        <motion.div
            className="relative text-2xl font-bold cursor-pointer select-none"
            whileHover="hover"
            initial="initial"
        >
            {/* Main container with glass effect */}
            <motion.div
                className="relative z-10 px-4 py-2 rounded-lg backdrop-blur-sm"
                variants={{
                    initial: { backgroundColor: 'rgba(var(--color-secondary-rgb), 0.05)' },
                    hover: { backgroundColor: 'rgba(var(--color-secondary-rgb), 0.1)' }
                }}
            >
                <div className="flex flex-col items-center">
                    {/* First Name */}
                    <div className="flex items-center">
                        <motion.span
                            className="text-secondary mr-1 font-mono"
                            variants={{
                                initial: { opacity: 0.5, rotate: 0 },
                                hover: { opacity: 1, rotate: 90, scale: 1.1 }
                            }}
                        >
                            {'</>'}
                        </motion.span>

                        {firstName.map((letter, index) => (
                            <motion.span
                                key={`first-${index}`}
                                className="relative inline-block text-textPrimary"
                                variants={{
                                    initial: { y: 0 },
                                    hover: {
                                        y: [0, -4, 0],
                                        transition: {
                                            duration: 0.4,
                                            delay: index * 0.05,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }
                                    }
                                }}
                            >
                                {letter}
                                <motion.span
                                    className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary"
                                    variants={{
                                        initial: { scaleX: 0 },
                                        hover: {
                                            scaleX: 1,
                                            transition: {
                                                duration: 0.3,
                                                delay: index * 0.05
                                            }
                                        }
                                    }}
                                />
                            </motion.span>
                        ))}
                    </div>

                    {/* Last Name */}
                    <div className="flex items-center mt-1">
                        {lastName.map((letter, index) => (
                            <motion.span
                                key={`last-${index}`}
                                className="relative inline-block text-lg text-textSecondary"
                                variants={{
                                    initial: { x: 0 },
                                    hover: {
                                        x: [0, 2, -2, 0],
                                        transition: {
                                            duration: 0.5,
                                            delay: index * 0.07,
                                            repeat: Infinity,
                                            repeatType: "reverse"
                                        }
                                    }
                                }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                    className="absolute top-0 right-0 w-1.5 h-1.5 bg-secondary rounded-full"
                    variants={{
                        initial: { scale: 0, opacity: 0 },
                        hover: {
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 0.3 }
                        }
                    }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-1.5 h-1.5 bg-secondary rounded-full"
                    variants={{
                        initial: { scale: 0, opacity: 0 },
                        hover: {
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 0.3 }
                        }
                    }}
                />
            </motion.div>

            {/* Background glow effect */}
            <motion.div
                className="absolute -inset-1 bg-secondary/20 rounded-lg blur-xl"
                variants={{
                    initial: { opacity: 0 },
                    hover: {
                        opacity: [0.2, 0.4, 0.2],
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                        }
                    }
                }}
            />
        </motion.div>
    );
};

export default Logo; 