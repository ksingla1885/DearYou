import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import API_URL from '../config/api';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/messages`);
            setMessages(res.data);
            setError(null);
        } catch (err) {
            console.error('Error fetching messages:', err);
            setError('Failed to load messages. Please check your connection.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this note?')) return;

        try {
            await axios.delete(`${API_URL}/api/messages/${id}`);
            setMessages(messages.filter(msg => msg._id !== id));
            alert('Note deleted successfully!');
        } catch (err) {
            console.error('Error deleting message:', err);
            alert('Failed to delete message. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await axios.post(`${API_URL}/api/messages`, {
                content: newMessage,
                author: author || 'Anonymous'
            });
            setNewMessage('');
            setAuthor('');
            fetchMessages();
            alert('Note posted successfully! ❤️');
        } catch (err) {
            console.error('Error posting message:', err);
            alert('Failed to post note. Please check your connection and try again.');
        }
    };

    return (
        <div className="min-h-screen bg-romantic-100 pt-20 pb-10 px-4">
            <Navbar />

            <div className="max-w-4xl mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-4xl font-serif text-romantic-900 text-center mb-8"
                >
                    Love Notes
                </motion.h1>

                {/* Input Form */}
                <div className="bg-white p-6 rounded-xl shadow-md mb-10">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Write a sweet note..."
                            className="w-full p-4 border border-romantic-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-romantic-300 resize-none h-32"
                        />
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Your Name (Optional)"
                                className="w-full sm:w-auto flex-grow p-2 border border-romantic-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-romantic-300"
                            />
                            <button
                                type="submit"
                                className="w-full sm:w-auto bg-romantic-500 text-white px-8 py-2 rounded-full font-medium hover:bg-romantic-900 transition-colors"
                            >
                                Post Note
                            </button>
                        </div>
                    </form>
                </div>

                {/* Messages List */}
                {loading ? (
                    <div className="text-center py-10">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-romantic-500 mx-auto"></div>
                        <p className="mt-4 text-romantic-600">Loading sweet notes...</p>
                    </div>
                ) : error ? (
                    <div className="text-center py-10 bg-red-50 rounded-xl border border-red-200">
                        <p className="text-red-500 font-medium">{error}</p>
                        <button
                            onClick={fetchMessages}
                            className="mt-4 px-4 py-2 bg-white border border-red-200 rounded-lg text-red-500 hover:bg-red-50"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {messages.length === 0 ? (
                            <div className="text-center py-10 bg-white/50 rounded-xl border border-white">
                                <p className="text-gray-500 italic text-lg">No notes yet. Be the first to write one! ❤️</p>
                            </div>
                        ) : (
                            messages.map((msg, index) => (
                                <motion.div
                                    key={msg._id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-romantic-300"
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-gray-800 text-lg mb-2 font-serif italic flex-grow">"{msg.content}"</p>
                                        <button
                                            onClick={() => handleDelete(msg._id)}
                                            className="text-romantic-300 hover:text-red-500 ml-4 p-1 transition-colors"
                                            title="Delete note"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="text-right text-sm text-romantic-500 font-medium">
                                        - {msg.author}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
