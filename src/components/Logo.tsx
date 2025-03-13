import React from 'react';
import { motion } from 'framer-motion';

const Logo = () => {
    const letters = "Shimul".split("");

    return (
        <motion.div
            className="relative text-2xl font-bold cursor-pointer"
            whileHover="hover"
            initial="initial"
        >
            <div className="flex items-center">
                {/* Code brackets */}
                <motion.span
                    className="text-secondary mr-1"
                    variants={{
                        initial: { opacity: 0.5 },
                        hover: { opacity: 1, scale: 1.1 }
                    }}
                >
                    {'<'}
                </motion.span>

                {/* Letters */}
                {letters.map((letter, index) => (
                    <motion.span
                        key={index}
                        className="relative inline-block"
                        variants={{
                            initial: { y: 0 },
                            hover: {
                                y: [0, -5, 0],
                                transition: {
                                    duration: 0.3,
                                    delay: index * 0.1,
                                    repeat: Infinity,
                                    repeatType: "reverse"
                                }
                            }
                        }}
                    >
                        {letter}
                        {/* Underline effect */}
                        <motion.span
                            className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary"
                            variants={{
                                initial: { scaleX: 0 },
                                hover: {
                                    scaleX: 1,
                                    transition: {
                                        duration: 0.3,
                                        delay: index * 0.1
                                    }
                                }
                            }}
                        />
                    </motion.span>
                ))}

                {/* Code brackets */}
                <motion.span
                    className="text-secondary ml-1"
                    variants={{
                        initial: { opacity: 0.5 },
                        hover: { opacity: 1, scale: 1.1 }
                    }}
                >
                    {'/>'}
                </motion.span>
            </div>

            {/* Glowing effect */}
            <motion.div
                className="absolute -inset-2 bg-secondary/20 rounded-lg blur-lg"
                variants={{
                    initial: { opacity: 0 },
                    hover: {
                        opacity: 1,
                        transition: { duration: 0.3 }
                    }
                }}
            />

            {/* Decorative elements */}
            <motion.div
                className="absolute -top-2 -right-2 w-2 h-2 bg-secondary rounded-full"
                variants={{
                    initial: { scale: 0 },
                    hover: {
                        scale: 1,
                        transition: { duration: 0.3 }
                    }
                }}
            />
            <motion.div
                className="absolute -bottom-2 -left-2 w-2 h-2 bg-secondary rounded-full"
                variants={{
                    initial: { scale: 0 },
                    hover: {
                        scale: 1,
                        transition: { duration: 0.3 }
                    }
                }}
            />
        </motion.div>
    );
};

export default Logo; 