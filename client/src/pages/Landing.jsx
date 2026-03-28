import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Landing = () => {
    const navigate = useNavigate();
    const [showCodeInput, setShowCodeInput] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        if (!showCodeInput) {
            navigate('/home');
        }
    };

    const handleCodeSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);
        setError('');

        try {
            let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            API_URL = API_URL.replace(/\/+$/, ''); // Remove trailing slashes to prevent 308 CORS error
            const response = await fetch(`${API_URL}/api/shared-links/${code}`);
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Invalid code');
            }

            // Save to localStorage so Home page can pick it up
            localStorage.setItem('sharedLinkName', data.recipientName);
            localStorage.setItem('sharedLinkCode', code);

            if (data.backgroundImage) {
                let fullImageUrl = data.backgroundImage;
                if (fullImageUrl.startsWith('/')) {
                    fullImageUrl = `${API_URL}${fullImageUrl}`;
                }
                localStorage.setItem('sharedLinkImage', fullImageUrl);
            } else {
                localStorage.removeItem('sharedLinkImage');
            }

            navigate('/home');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
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
            <div className="relative z-10 text-center px-4 w-full max-w-lg">
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
                    className="text-2xl md:text-3xl text-romantic-800 font-light mb-8"
                >
                    A special place, just for you
                </motion.p>

                {/* Call to Action & Code Input */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                    className="space-y-4"
                >
                    {!showCodeInput ? (
                        <>
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="inline-block"
                            >
                                <div className="bg-white/50 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-romantic-400 shadow-lg mb-4">
                                    <p className="text-romantic-900 text-lg font-medium">
                                        Click anywhere to enter my heart✨
                                    </p>
                                </div>
                            </motion.div>

                            <div className="flex flex-col gap-3 items-center" onClick={(e) => e.stopPropagation()}>
                                <button
                                    onClick={() => setShowCodeInput(true)}
                                    className="text-romantic-700 hover:text-romantic-900 underline underline-offset-4 text-sm font-medium transition-colors"
                                >
                                    Have a special code?
                                </button>
                                <button
                                    onClick={() => navigate('/create')}
                                    className="text-romantic-600 hover:text-romantic-800 text-xs transition-colors bg-white/30 px-3 py-1 rounded-full"
                                >
                                    Create your own version 🎁
                                </button>
                            </div>
                        </>
                    ) : (
                        <div onClick={(e) => e.stopPropagation()} className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 animate-fadeIn">
                            <form onSubmit={handleCodeSubmit} className="space-y-4">
                                <h3 className="text-romantic-900 font-serif text-xl">Enter Your Code</h3>
                                <input
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    placeholder="Enter code here..."
                                    className="w-full px-4 py-2 rounded-lg border border-romantic-300 focus:border-romantic-500 outline-none bg-white/80"
                                    autoFocus
                                />
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowCodeInput(false);
                                            setError('');
                                            setCode('');
                                        }}
                                        className="flex-1 px-4 py-2 rounded-lg border border-romantic-300 text-romantic-700 hover:bg-romantic-50 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="flex-1 px-4 py-2 rounded-lg bg-romantic-500 text-white hover:bg-romantic-600 transition-colors shadow-md"
                                    >
                                        {loading ? 'Checking...' : 'Enter ❤️'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
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
            {!showCodeInput && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-romantic-700 text-sm pointer-events-none"
                >
                    Tap to continue
                </motion.div>
            )}
        </div>
    );
};

export default Landing;
