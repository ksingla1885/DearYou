import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import API_URL from '../config/api';

const Surprise = () => {
    const [surprises, setSurprises] = useState([]);
    const [openedMap, setOpenedMap] = useState({}); // Track which gifts are opened

    useEffect(() => {
        fetchSurprises();
    }, []);

    const fetchSurprises = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/surprise`);
            setSurprises(res.data);
        } catch (err) {
            console.error('Error fetching surprises:', err);
        }
    };

    const handleOpenGift = (index) => {
        setOpenedMap(prev => ({ ...prev, [index]: true }));
        // Simple confetti effect using emojis
        createConfetti();
    };

    const createConfetti = () => {
        const colors = ['#ff69b4', '#ff1493', '#ffb6c1', '#ffd700'];
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.innerText = ['❤️', '✨', '🌹', '🎁'][Math.floor(Math.random() * 4)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-5vh';
            confetti.style.fontSize = Math.random() * 20 + 10 + 'px';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.transition = 'transform 3s ease-in, opacity 3s ease-in';
            document.body.appendChild(confetti);

            setTimeout(() => {
                confetti.style.transform = `translateY(105vh) rotate(${Math.random() * 360}deg)`;
                confetti.style.opacity = '0';
            }, 100);

            setTimeout(() => {
                document.body.removeChild(confetti);
            }, 3000);
        }
    };

    return (
        <div className="min-h-screen bg-romantic-100 pt-20 pb-10 px-4">
            <Navbar />

            <div className="max-w-5xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-serif text-romantic-900 text-center mb-12"
                >
                    Special Surprises
                </motion.h1>

                <div className="grid gap-8">
                    {surprises.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            className="relative"
                        >
                            {item.unlocked ? (
                                openedMap[index] ? (
                                    // OPENED CONTENT
                                    <motion.div
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="p-8 rounded-2xl shadow-lg text-center bg-white border-2 border-romantic-200"
                                    >
                                        <h2 className="text-2xl font-serif text-romantic-900 mb-4">{item.title}</h2>
                                        <p className="text-gray-700 mb-6 text-lg italic">"{item.content}"</p>
                                        {item.image && (
                                            <img
                                                src={`${API_URL}${item.image}`}
                                                alt="Surprise"
                                                className="max-w-md mx-auto rounded-lg shadow-md"
                                            />
                                        )}
                                    </motion.div>
                                ) : (
                                    // UNLOCKED BUT CLOSED GIFT BOX
                                    <motion.div
                                        whileHover={{ scale: 1.05, rotate: [0, -2, 2, -2, 0] }}
                                        onClick={() => handleOpenGift(index)}
                                        className="p-12 rounded-2xl shadow-lg text-center bg-gradient-to-br from-romantic-400 to-romantic-600 cursor-pointer text-white flex flex-col items-center justify-center h-64"
                                    >
                                        <div className="text-6xl mb-4 animate-bounce">🎁</div>
                                        <h2 className="text-2xl font-serif font-bold">A Surprise Awaits!</h2>
                                        <p className="opacity-90 mt-2">Tap to unwrap your gift</p>
                                    </motion.div>
                                )
                            ) : (
                                // LOCKED STATE
                                <div className="p-8 rounded-2xl shadow-inner text-center bg-gray-200 opacity-75 flex flex-col items-center justify-center h-48">
                                    <span className="text-4xl mb-4">🔒</span>
                                    <h2 className="text-xl font-medium text-gray-500">Locked</h2>
                                    <p className="text-gray-400 text-sm mt-2">Available on {item.date}</p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Surprise;
