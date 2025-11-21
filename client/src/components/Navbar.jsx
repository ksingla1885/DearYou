import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();

    const links = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/messages', label: 'Messages' },
        { path: '/surprise', label: 'Surprise' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-serif text-romantic-900 font-bold">
                            DearYou ❤️
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/home" className="text-romantic-900 hover:text-romantic-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link to="/about" className="text-romantic-900 hover:text-romantic-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                About
                            </Link>
                            <Link to="/gallery" className="text-romantic-900 hover:text-romantic-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Gallery
                            </Link>
                            <Link to="/messages" className="text-romantic-900 hover:text-romantic-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Messages
                            </Link>
                            <Link to="/surprise" className="text-romantic-900 hover:text-romantic-500 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Surprise
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
