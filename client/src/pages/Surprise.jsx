import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Countdown from '../components/Countdown';
import Particles from '../components/Particles';
import API_URL from '../config/api';

const Surprise = () => {
    const [surprises, setSurprises] = useState([]);
    const [openedMap, setOpenedMap] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchSurprises();
    }, []);

    const fetchSurprises = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/surprise`);
            setSurprises(res.data);
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching surprises:', err);
            setIsLoading(false);
        }
    };

    const handleOpenGift = (index) => {
        setOpenedMap(prev => ({ ...prev, [index]: true }));
        createSparkles();
    };

    const createSparkles = () => {
        const symbols = ['❤️', '✨', '💖', '🎁', '🎀'];
        for (let i = 0; i < 40; i++) {
            const el = document.createElement('div');
            el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
            el.className = 'fixed pointer-events-none z-[100] text-2xl';
            el.style.left = '50%';
            el.style.top = '50%';
            document.body.appendChild(el);

            const destinationX = (Math.random() - 0.5) * 600;
            const destinationY = (Math.random() - 0.5) * 600;

            const animation = el.animate([
                { transform: 'translate(-50%, -50%) scale(0)', opacity: 1 },
                { transform: `translate(${destinationX}px, ${destinationY}px) scale(1.5) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });

            animation.onfinish = () => el.remove();
        }
    };

    return (
        <div className="min-h-screen bg-[#fff5f6] relative overflow-hidden">
            <Particles />
            <Navbar />

            <div className="relative z-10 max-w-6xl mx-auto pt-28 pb-20 px-6">
                <header className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-block"
                    >
                        <span className="px-4 py-1.5 rounded-full bg-rose-100 text-rose-600 text-xs font-bold uppercase tracking-widest mb-4 inline-block shadow-sm">
                            Curated for You
                        </span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-6xl font-serif text-gray-900 mb-6"
                    >
                        Surprises & <span className="italic text-rose-500">Gifts</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-500 max-w-lg mx-auto text-lg"
                    >
                        A collection of moments and gifts that unlock over time. Each one is a piece of my heart.
                    </motion.p>
                </header>

                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-12 h-12 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {surprises.map((item, index) => (
                            <motion.div
                                key={index}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group"
                            >
                                <div className="h-full">
                                    <AnimatePresence mode="wait">
                                        {!openedMap[index] ? (
                                            <motion.div
                                                key="closed"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
                                                className={`relative h-80 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 ${item.unlocked 
                                                    ? 'cursor-pointer hover:shadow-2xl hover:-translate-y-2' 
                                                    : 'grayscale opacity-80'}`}
                                                onClick={() => item.unlocked && handleOpenGift(index)}
                                            >
                                                {/* Card Background */}
                                                <div className={`absolute inset-0 bg-gradient-to-br ${item.unlocked 
                                                    ? 'from-rose-400 via-rose-500 to-rose-600' 
                                                    : 'from-gray-300 to-gray-400'}`}>
                                                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                                                </div>

                                                {/* Content */}
                                                <div className="relative h-full flex flex-col items-center justify-center p-8 text-white text-center">
                                                    {item.unlocked ? (
                                                        <>
                                                            <motion.div 
                                                                animate={{ 
                                                                    y: [0, -10, 0],
                                                                    rotate: [0, -5, 5, 0]
                                                                }}
                                                                transition={{ 
                                                                    duration: 3, 
                                                                    repeat: Infinity,
                                                                    ease: "easeInOut" 
                                                                }}
                                                                className="text-7xl mb-6 drop-shadow-lg"
                                                            >
                                                                🎁
                                                            </motion.div>
                                                            <h3 className="text-2xl font-bold mb-2">Unwrap Surprise</h3>
                                                            <p className="text-rose-100 text-sm">A new memory is waiting for you</p>
                                                            
                                                            <div className="mt-8 px-6 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium hover:bg-white/30 transition-colors">
                                                                Click to Open
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="text-6xl mb-6 opacity-50">🔒</div>
                                                            <h3 className="text-xl font-bold mb-4">Locked</h3>
                                                            <Countdown targetDate={item.date} />
                                                        </>
                                                    )}
                                                </div>

                                                {/* Glow Effect on Hover */}
                                                {item.unlocked && (
                                                    <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-rose-600 rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
                                                )}
                                            </motion.div>
                                        ) : (
                                            <motion.div
                                                key="opened"
                                                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-rose-100 flex flex-col h-full"
                                            >
                                                <div className="p-1 bg-gradient-to-r from-rose-200 via-rose-300 to-rose-200"></div>
                                                
                                                {item.image ? (
                                                    <div className="h-48 overflow-hidden">
                                                        <img 
                                                            src={item.image.startsWith('http') ? item.image : `${API_URL}${item.image}`} 
                                                            alt={item.title}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className="h-20 bg-rose-50 flex items-center justify-center">
                                                        <span className="text-3xl">✨</span>
                                                    </div>
                                                )}

                                                <div className="p-8 flex-grow flex flex-col">
                                                    <h3 className="text-2xl font-serif text-gray-900 mb-4">{item.title}</h3>
                                                    <div className="w-12 h-1 bg-rose-200 mb-6"></div>
                                                    <p className="text-gray-600 italic leading-relaxed text-lg mb-6">
                                                        "{item.content}"
                                                    </p>
                                                    <div className="mt-auto">
                                                        <span className="text-xs font-bold text-rose-400 uppercase tracking-widest">
                                                            Unlocked on {new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {surprises.length === 0 && !isLoading && (
                    <div className="text-center py-20 bg-white/50 backdrop-blur-sm rounded-3xl border border-dashed border-rose-200">
                        <div className="text-5xl mb-4">🎈</div>
                        <h3 className="text-xl font-medium text-gray-500">No surprises planned yet.</h3>
                        <p className="text-gray-400 mt-2">Check back soon for magical moments!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Surprise;

