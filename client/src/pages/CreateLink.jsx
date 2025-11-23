import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CreateLink = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        recipientName: '',
        code: ''
    });
    const [generatedLink, setGeneratedLink] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setGeneratedLink('');

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/shared-links/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong');
            }

            setGeneratedLink(formData.code);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedLink);
        alert('Code copied to clipboard!');
    };

    return (
        <div className="min-h-screen bg-[#fff0f5] relative overflow-hidden font-sans">
            <Navbar />

            {/* Background Elements */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-romantic-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-romantic-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/50 w-full max-w-md"
                >
                    <h2 className="text-3xl font-serif text-romantic-900 mb-6 text-center">Create a Special Link 💝</h2>

                    {!generatedLink ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-gray-700 mb-2 font-medium">Recipient's Name</label>
                                <input
                                    type="text"
                                    name="recipientName"
                                    value={formData.recipientName}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-romantic-200 focus:border-romantic-500 focus:ring-2 focus:ring-romantic-200 outline-none transition-all bg-white/50"
                                    placeholder="e.g., My Love"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 mb-2 font-medium">Custom Code</label>
                                <input
                                    type="text"
                                    name="code"
                                    value={formData.code}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-xl border border-romantic-200 focus:border-romantic-500 focus:ring-2 focus:ring-romantic-200 outline-none transition-all bg-white/50"
                                    placeholder="e.g., LOVE2024"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">This code will be used to access the page.</p>
                            </div>

                            {error && (
                                <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-romantic-500 hover:bg-romantic-600 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-romantic-500/30 disabled:opacity-70"
                            >
                                {loading ? 'Creating...' : 'Create Link ✨'}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="text-5xl mb-4">🎉</div>
                            <h3 className="text-2xl font-serif text-romantic-800">Link Created!</h3>
                            <p className="text-gray-600">Share this code with your loved one:</p>

                            <div className="bg-white/80 p-4 rounded-xl border-2 border-dashed border-romantic-300 flex items-center justify-between gap-4">
                                <span className="text-xl font-bold text-romantic-600 tracking-wider">{generatedLink}</span>
                                <button
                                    onClick={copyToClipboard}
                                    className="text-gray-500 hover:text-romantic-500 transition-colors"
                                    title="Copy Code"
                                >
                                    📋
                                </button>
                            </div>

                            <p className="text-sm text-gray-500">
                                Tell them to visit the website and enter this code!
                            </p>

                            <button
                                onClick={() => {
                                    setGeneratedLink('');
                                    setFormData({ recipientName: '', code: '' });
                                }}
                                className="text-romantic-500 hover:text-romantic-700 font-medium"
                            >
                                Create Another
                            </button>
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default CreateLink;
