import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const About = () => {
    return (
        <div className="min-h-screen bg-romantic-100 pt-20 pb-10 px-4">
            <Navbar />

            <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-xl">
                <motion.h1
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-4xl font-serif text-romantic-900 mb-8 text-center"
                >
                    About Us
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="prose prose-lg mx-auto text-gray-600"
                >
                    <p>
                        This website is a dedication to the most beautiful person in the world.
                        Every pixel, every animation, and every line of code was written with you in mind.
                    </p>
                    <p>
                        I wanted to create a place where we can store our memories, share sweet notes,
                        and where I can surprise you on special days.
                    </p>
                    <p className="text-center font-serif text-2xl text-romantic-500 mt-8">
                        I Love You ❤️
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
