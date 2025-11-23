import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

const Birthday = () => {
    const [candlesBlown, setCandlesBlown] = useState(false);
    const [showWishes, setShowWishes] = useState(false);

    useEffect(() => {
        createConfetti();
    }, []);

    const createConfetti = () => {
        const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffd700', '#87ceeb'];
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement('div');
            confetti.innerText = ['🎉', '🎂', '🎈', '✨', '❤️'][Math.floor(Math.random() * 5)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10vh';
            confetti.style.fontSize = Math.random() * 25 + 15 + 'px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.transition = 'transform 5s ease-in, opacity 5s ease-in';
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.transform = `translateY(110vh) rotate(${Math.random() * 720}deg)`;
                confetti.style.opacity = '0';
            }, 100);

            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 5000);
        }
    };

    const handleBlowCandles = () => {
        if (!candlesBlown) {
            setCandlesBlown(true);
            createConfetti();
            setTimeout(() => setShowWishes(true), 1500);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 pt-20 pb-10 px-4 overflow-hidden relative">
            <Navbar />

            {/* Floating Balloons Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: '120vh', x: Math.random() * 100 + 'vw' }}
                        animate={{ y: '-20vh' }}
                        transition={{
                            duration: Math.random() * 10 + 15,
                            repeat: Infinity,
                            delay: Math.random() * 20,
                            ease: "linear"
                        }}
                        className="absolute text-6xl opacity-30"
                    >
                        🎈
                    </motion.div>
                ))}
            </div>

            <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center justify-center min-h-[80vh]">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, y: 50 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ duration: 1, type: "spring" }}
                    className="mb-16"
                >
                    <h1 className="text-6xl md:text-8xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-6 drop-shadow-sm">
                        Happy Birthday!
                    </h1>
                    <p className="text-2xl text-gray-600 font-light tracking-wide">Make a wish, my love ✨</p>
                </motion.div>

                {/* Premium Cake Section */}
                <div className="relative mb-20 group cursor-pointer" onClick={handleBlowCandles}>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative"
                    >
                        {/* Cake Tier 2 (Bottom) */}
                        <div className="w-64 h-24 bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg relative shadow-2xl border-b-8 border-pink-300/50 mx-auto">
                            <div className="absolute -top-2 w-full h-4 bg-white/80 rounded-full blur-sm"></div>
                        </div>

                        {/* Cake Tier 1 (Top) */}
                        <div className="w-48 h-20 bg-gradient-to-r from-pink-300 to-pink-400 rounded-lg relative shadow-xl border-b-8 border-pink-400/50 mx-auto -mt-4">
                            <div className="absolute -top-2 w-full h-4 bg-white/80 rounded-full blur-sm"></div>
                            {/* Icing Drips */}
                            <div className="absolute top-0 w-full flex justify-around">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className="w-4 h-8 bg-white/90 rounded-b-full shadow-sm"></div>
                                ))}
                            </div>
                        </div>

                        {/* Candles */}
                        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 flex gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="relative flex flex-col items-center">
                                    {/* Flame with Glow */}
                                    <motion.div
                                        animate={candlesBlown ? { opacity: 0, scale: 0 } : { opacity: [0.8, 1, 0.8], scale: [1, 1.2, 1], y: [0, -2, 0] }}
                                        transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity }}
                                        className="w-4 h-6 bg-gradient-to-t from-orange-400 to-yellow-200 rounded-full shadow-[0_0_20px_#ffeb3b] mb-1 origin-bottom z-20"
                                    ></motion.div>
                                    {/* Candle Stick */}
                                    <div className="w-3 h-10 bg-gradient-to-b from-blue-200 to-blue-400 rounded-sm shadow-sm z-10"></div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {!candlesBlown && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap"
                        >
                            <span className="bg-white/80 backdrop-blur px-4 py-2 rounded-full text-pink-500 text-sm font-bold shadow-sm border border-pink-100">
                                Tap to blow candles 💨
                            </span>
                        </motion.div>
                    )}
                </div>

                {/* Enhanced Wish Card */}
                <AnimatePresence>
                    {showWishes && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                            className="relative max-w-2xl w-full"
                        >
                            <div className="bg-white/60 backdrop-blur-xl p-10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-white/50 relative overflow-hidden">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"></div>
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                                <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                                <h2 className="text-4xl font-serif text-gray-800 mb-6 relative z-10">My Wish For You ❤️</h2>
                                <p className="text-xl text-gray-600 leading-relaxed italic mb-8 font-serif relative z-10">
                                    "On this special day, I wish you all the happiness your heart can hold.
                                    May your year be filled with laughter, love, and endless adventures.
                                    You deserve the world and more. I'm so lucky to celebrate you today and every day."
                                </p>

                                <div className="flex justify-center gap-6 text-5xl relative z-10">
                                    <motion.span whileHover={{ scale: 1.2, rotate: 10 }}>🎁</motion.span>
                                    <motion.span whileHover={{ scale: 1.2, rotate: -10 }}>�</motion.span>
                                    <motion.span whileHover={{ scale: 1.2, rotate: 10 }}>💖</motion.span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default Birthday;
