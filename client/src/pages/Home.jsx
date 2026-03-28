import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Hero3D from '../components/Hero3D';
import Navbar from '../components/Navbar';

const Section = ({ children, className }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8 }}
    className={`py-20 px-4 ${className}`}
  >
    {children}
  </motion.div>
);

const Home = () => {
  const [nickname, setNickname] = useState(localStorage.getItem('sharedLinkName') || 'Chahat');
  const [customBackground, setCustomBackground] = useState(localStorage.getItem('sharedLinkImage') || null);

  useEffect(() => {
    // Fetch custom background if available
    const sharedLinkCode = localStorage.getItem('sharedLinkCode');

    if (sharedLinkCode) {
      let API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      API_URL = API_URL.replace(/\/+$/, ''); // Remove trailing slashes to prevent double slashes

      fetch(`${API_URL}/api/shared-links/${sharedLinkCode}`)
        .then(res => res.json())
        .then(data => {
          if (data.backgroundImage) {
            let fullImageUrl = data.backgroundImage;
            // Only prepend API_URL if it's a relative path (starts with /)
            if (fullImageUrl.startsWith('/')) {
              fullImageUrl = `${API_URL}${fullImageUrl}`;
            }
            setCustomBackground(fullImageUrl);
          }
        })
        .catch(err => console.error('Error fetching background:', err));
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#fff0f5] relative overflow-hidden font-sans">
      <Navbar />

      {/* Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-romantic-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-romantic-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-romantic-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center items-center relative">
          {/* Background Photo Overlay */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-35"
              style={{
                backgroundImage: `url(${customBackground || '/couple-photo.jpg'})`,
                filter: 'blur(1px) brightness(1.2)',
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#fff0f5]/80 via-[#fff0f5]/60 to-[#fff0f5]/90" />
          </div>

          {/* 3D Heart */}
          <div className="absolute inset-0 z-0">
            <Hero3D />
          </div>

          <div className="z-10 text-center mt-20">
            <motion.h1
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-6xl md:text-8xl font-serif text-romantic-900 mb-4 tracking-tight drop-shadow-sm"
            >
              Welcome, <span className="text-romantic-500 italic">{nickname}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-gray-600 font-light"
            >
              My heart beats only for you.
            </motion.p>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 2, duration: 2, repeat: Infinity }}
            className="absolute bottom-10 text-romantic-400 text-sm"
          >
            Scroll Down ↓
          </motion.div>
        </section>

        {/* Love Letter Section */}
        <Section className="max-w-4xl mx-auto">
          <div className="relative bg-white/70 backdrop-blur-sm p-12 rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${customBackground || '/couple-photo.jpg'})`, filter: 'blur(2px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl font-serif text-romantic-900 mb-8 text-center">A Letter to You</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p className="first-letter:text-6xl first-letter:font-serif first-letter:text-romantic-500 first-letter:float-left first-letter:mr-3">
                  Every moment with you feels like a dream I never want to wake up from.
                  Your presence lights up my darkest days, and your smile is the reason my heart still believes in magic.
                </p>
                <p>
                  I never knew what true happiness was until I met you. You've shown me that love isn't just a word—it's
                  a feeling that wraps around your soul and makes everything beautiful.
                </p>
                <p className="text-center italic text-romantic-900 font-medium">
                  "In a world full of temporary things, you are my forever."
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* Our Story / Timeline */}
        <Section className="max-w-4xl mx-auto text-center relative">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-5 bg-cover bg-center rounded-3xl" style={{ backgroundImage: `url(${customBackground || '/couple-photo.jpg'})`, filter: 'blur(3px)' }} />
          <div className="relative z-10">
            <h2 className="text-4xl font-serif text-romantic-900 mb-12">Our Journey</h2>
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-romantic-300 before:to-transparent">
              {[
                { title: "The Beginning", text: "The day our paths crossed, I knew something changed forever.", emoji: "✨" },
                { title: "First Smile", text: "That smile of yours lit up my entire world.", emoji: "😊" },
                { title: "Growing Closer", text: "Every conversation, every laugh, brought us here.", emoji: "💬" },
                { title: "First Memory", text: "The moment I realized you were special to me.", emoji: "🌟" },
                { title: "Today", text: "I love you more than yesterday, but less than tomorrow.", emoji: "❤️" }
              ].map((item, index) => (
                <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-romantic-100 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    {item.emoji}
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white/50 backdrop-blur-sm p-6 rounded-xl shadow-sm border border-white/50">
                    <h3 className="font-serif text-xl text-romantic-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* Special Moments Grid */}
        <Section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-romantic-900 mb-12 text-center">Special Moments</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "First Conversation",
                description: "I still remember every word we said. It felt like talking to someone I'd known forever.",
                icon: "💭"
              },
              {
                title: "Your Laughter",
                description: "The sound that makes my heart skip a beat every single time.",
                icon: "😄"
              },
              {
                title: "Late Night Talks",
                description: "When the world sleeps, we create our own universe of dreams and secrets.",
                icon: "🌙"
              },
              {
                title: "Little Things",
                description: "The way you care, the way you listen, the way you make everything better.",
                icon: "🌸"
              }
            ].map((moment, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50"
              >
                <div className="text-5xl mb-4">{moment.icon}</div>
                <h3 className="text-2xl font-serif text-romantic-900 mb-3">{moment.title}</h3>
                <p className="text-gray-600 leading-relaxed">{moment.description}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Why I Love You Cards */}
        <Section className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-serif text-romantic-900 mb-12 text-center">Why You?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { emoji: "✨", title: "Your Soul", text: "Pure, kind, and beautiful inside out." },
              { emoji: "😊", title: "Your Smile", text: "It has the power to heal my worst days." },
              { emoji: "👀", title: "Your Eyes", text: "I could get lost in them for eternity." },
              { emoji: "💝", title: "Your Heart", text: "The most precious thing I've ever known." },
              { emoji: "🌺", title: "Your Presence", text: "Makes every moment worth living." },
              { emoji: "🎵", title: "Your Voice", text: "My favorite melody in this chaotic world." }
            ].map((card, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-white/50 text-center"
              >
                <div className="text-6xl mb-4">{card.emoji}</div>
                <h3 className="text-2xl font-serif text-romantic-900 mb-2">{card.title}</h3>
                <p className="text-gray-600">{card.text}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        {/* Love Quotes Section - Only show if NOT using a shared link */}
        {!localStorage.getItem('sharedLinkCode') && (
          <Section className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-serif text-romantic-900 mb-12 text-center">Words from My Heart</h2>
            <div className="space-y-8">
              {[
                "You are my today and all of my tomorrows.",
                "In your arms, I've found my home.",
                "Every love song makes sense when I think of you.",
                "You're the reason I believe in forever."
              ].map((quote, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-romantic-100 to-romantic-200 p-8 rounded-2xl shadow-md"
                >
                  <p className="text-2xl font-serif text-romantic-900 text-center italic">
                    "{quote}"
                  </p>
                </motion.div>
              ))}
            </div>
          </Section>
        )}

        {/* Final Promise */}
        <Section className="text-center pb-32">
          <div className="bg-gradient-to-r from-romantic-100 to-romantic-200 p-12 rounded-3xl shadow-xl max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif text-romantic-900 mb-6">My Promise</h2>
            <p className="text-lg text-gray-700 leading-relaxed italic mb-6">
              "To always be there, to always care, and to always love you.
              No matter where life takes us, you will always be my {nickname}."
            </p>
            <div className="flex justify-center gap-4 text-4xl">
              🌹 💕 ✨
            </div>
          </div>
        </Section>

      </main>
    </div>
  );
};

export default Home;
