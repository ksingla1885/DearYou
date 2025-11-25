import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = React.useState(false);

    const links = [
        { path: '/home', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/gallery', label: 'Gallery' },
        { path: '/messages', label: localStorage.getItem('sharedLinkCode') ? 'Leave a Message' : 'Messages' },
        { path: '/open-when', label: 'Open When' },
        { path: '/birthday', label: 'Birthday' },
        { path: '/surprise', label: 'Surprise' },
    ].filter(Boolean);

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-serif text-romantic-900 font-bold flex items-center gap-2">
                            DearYou <span className="text-red-500">❤️</span>
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            {links.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    className={`text-sm font-medium transition-colors duration-300 hover:text-romantic-500 ${location.pathname === link.path
                                        ? 'text-romantic-600 font-bold border-b-2 border-romantic-400'
                                        : 'text-gray-600'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}

                            {localStorage.getItem('sharedLinkCode') && (
                                <button
                                    onClick={() => {
                                        localStorage.removeItem('sharedLinkCode');
                                        localStorage.removeItem('sharedLinkName');
                                        localStorage.removeItem('sharedLinkImage');
                                        window.location.href = '/home';
                                    }}
                                    className="text-sm font-medium text-red-500 hover:text-red-700 transition-colors border border-red-200 px-3 py-1 rounded-full hover:bg-red-50"
                                >
                                    Exit View
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-romantic-900 hover:text-romantic-600 focus:outline-none"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isOpen ? (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden bg-white/95 backdrop-blur-lg border-b border-gray-100 absolute w-full"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 shadow-lg">
                        {links.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className={`block px-3 py-3 rounded-md text-base font-medium text-center ${location.pathname === link.path
                                    ? 'text-romantic-600 bg-romantic-50'
                                    : 'text-gray-700 hover:text-romantic-500 hover:bg-gray-50'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {localStorage.getItem('sharedLinkCode') && (
                            <button
                                onClick={() => {
                                    localStorage.removeItem('sharedLinkCode');
                                    localStorage.removeItem('sharedLinkName');
                                    localStorage.removeItem('sharedLinkImage');
                                    window.location.href = '/home';
                                }}
                                className="block w-full px-3 py-3 rounded-md text-base font-medium text-center text-red-500 hover:bg-red-50"
                            >
                                Exit View
                            </button>
                        )}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
