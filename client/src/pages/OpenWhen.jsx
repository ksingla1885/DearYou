import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import API_URL from '../config/api';

const OpenWhen = () => {
    const [letters, setLetters] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLetters();
    }, []);

    const fetchLetters = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/open-when`);
            setLetters(res.data);
        } catch (err) {
            console.error('Error fetching letters:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-romantic-100 pt-20 pb-10 px-4">
            <Navbar />

            <div className="max-w-6xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-serif text-romantic-900 text-center mb-12"
                >
                    Open When...
                </motion.h1>

                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-romantic-500 mx-auto"></div>
                        <p className="mt-4 text-romantic-600">Preparing your letters...</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {letters.map((letter, index) => (
                            <motion.div
                                key={letter._id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, rotate: 1 }}
                                onClick={() => setSelectedLetter(letter)}
                                className={`cursor-pointer relative group perspective-1000`}
                            >
                                {/* Envelope Look */}
                                <div className={`${letter.color || 'bg-white'} p-8 rounded-xl shadow-md border-2 border-romantic-200 h-64 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:shadow-xl`}>
                                    <div className="text-6xl mb-4 transform transition-transform group-hover:scale-110">{letter.icon}</div>
                                    <h3 className="text-xl font-serif font-bold text-gray-800">{letter.title}</h3>
                                    <p className="text-sm text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">Click to open</p>

                                    {/* Envelope Flap Effect (Visual only) */}
                                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden rounded-xl pointer-events-none">
                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-white/20 rotate-45 transform"></div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Letter Modal */}
            <AnimatePresence>
                {selectedLetter && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedLetter(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.5, y: 100, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white max-w-2xl w-full rounded-2xl shadow-2xl overflow-hidden relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className={`${selectedLetter.color || 'bg-romantic-100'} p-6 border-b border-gray-100 flex justify-between items-center`}>
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl">{selectedLetter.icon}</span>
                                    <h2 className="text-2xl font-serif font-bold text-gray-800">{selectedLetter.title}</h2>
                                </div>
                                <button
                                    onClick={() => setSelectedLetter(null)}
                                    className="text-gray-500 hover:text-gray-800 transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-8 max-h-[60vh] overflow-y-auto">
                                <p className="text-lg text-gray-700 leading-relaxed font-serif whitespace-pre-line">
                                    {selectedLetter.content}
                                </p>
                            </div>

                            {/* Footer */}
                            <div className="p-4 bg-gray-50 text-center border-t border-gray-100">
                                <p className="text-romantic-500 font-medium text-sm">With all my love ❤️</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OpenWhen;
