import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [author, setAuthor] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/messages');
            setMessages(res.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        try {
            await axios.post('http://localhost:5000/api/messages', {
                content: newMessage,
                author: author || 'Anonymous'
            });
            setNewMessage('');
            setAuthor('');
            fetchMessages();
        } catch (err) {
            console.error('Error posting message:', err);
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
                        <div className="flex items-center justify-between">
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Your Name (Optional)"
                                className="p-2 border border-romantic-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-romantic-300"
                            />
                            <button
                                type="submit"
                                className="bg-romantic-500 text-white px-8 py-2 rounded-full font-medium hover:bg-romantic-900 transition-colors"
                            >
                                Post Note
                            </button>
                        </div>
                    </form>
                </div>

                {/* Messages List */}
                <div className="grid gap-6">
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-romantic-300"
                        >
                            <p className="text-gray-800 text-lg mb-2 font-serif italic">"{msg.content}"</p>
                            <div className="text-right text-sm text-romantic-500 font-medium">
                                - {msg.author}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Messages;
