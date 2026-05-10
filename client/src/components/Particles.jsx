import React from 'react';
import { motion } from 'framer-motion';

const Particles = () => {
  const particles = Array.from({ length: 20 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            x: Math.random() * 100 + "vw",
            y: "110vh",
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: "-10vh",
            x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`,
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "linear",
          }}
          className="absolute text-rose-300/30"
          style={{ fontSize: Math.random() * 20 + 10 }}
        >
          {['❤️', '✨', '🌸'][Math.floor(Math.random() * 3)]}
        </motion.div>
      ))}
    </div>
  );
};

export default Particles;
