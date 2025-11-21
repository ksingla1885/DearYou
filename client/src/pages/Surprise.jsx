import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import API_URL from '../config/api';

const Surprise = () => {
    const [surprises, setSurprises] = useState([]);

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
                            className={`p-8 rounded-2xl shadow-lg text-center relative overflow-hidden ${item.unlocked ? 'bg-white' : 'bg-gray-200'
                                }`}
                        >
                            {item.unlocked ? (
                                <>
                                    <h2 className="text-2xl font-serif text-romantic-900 mb-4">{item.title}</h2>
                                    <p className="text-gray-700 mb-6">{item.content}</p>
                                    {item.image && (
                                        <img
                                            src={`${API_URL}${item.image}`}
                                            alt="Surprise"
                                            className="max-w-md mx-auto rounded-lg shadow-md"
                                        />
                                    )}
                                </>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-40">
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
