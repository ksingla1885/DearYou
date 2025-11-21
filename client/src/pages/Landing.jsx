import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/home');
    };

    return (
        <div
            onClick={handleClick}
            className="min-h-screen bg-gradient-to-br from-romantic-100 via-romantic-200 to-romantic-300 flex items-center justify-center cursor-pointer relative overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-10 left-10 w-32 h-32 bg-romantic-400/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [360, 180, 0],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-10 right-10 w-40 h-40 bg-romantic-500/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        y: [0, -30, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/2 left-1/4 w-24 h-24 bg-romantic-300/30 rounded-full blur-2xl"
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4">
                {/* Animated Heart */}
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                        duration: 1,
                        type: "spring",
                        stiffness: 200
                    }}
                    className="mb-8"
                >
                    <motion.div
                        animate={{
                            scale: [1, 1.1, 1],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="text-9xl"
                    >
                        ❤️
                    </motion.div>
                </motion.div>

                {/* Title */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-serif text-romantic-900 mb-6 tracking-tight"
                >
                    DearYou
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-2xl md:text-3xl text-romantic-800 font-light mb-12"
                >
                    A special place, just for you
                </motion.p>

                {/* Call to Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="inline-block"
                    >
                        <div className="bg-white/50 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-romantic-400 shadow-lg">
                            <p className="text-romantic-900 text-lg font-medium">
                                Click anywhere to enter my heart✨
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Floating Hearts */}
                {[...Array(6)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            opacity: 0,
                            y: 100,
                            x: Math.random() * 200 - 100
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            y: -100,
                            x: Math.random() * 100 - 50
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.8,
                            ease: "easeOut"
                        }}
                        className="absolute bottom-0 text-4xl pointer-events-none"
                        style={{ left: `${15 + i * 15}%` }}
                    >
                        💕
                    </motion.div>
                ))}
            </div>

            {/* Hint Text */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-romantic-700 text-sm"
            >
                Tap to continue
            </motion.div>
        </div>
    );
};

export default Landing;
