// === src/components/about/HeroSlider.jsx ===
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

const HeroSlider = () => {
  const slides = [
    {
      title: 'Your Financial Journey Starts Here',
      description: 'We empower investors with innovative tools and personalized guidance',
      cta: 'Explore Investments',
      bg: '/src/assets/fina.jpg'
    },
    {
      title: 'Trusted by Millions Worldwide',
      description: 'Join our community of savvy investors growing their wealth',
      cta: 'Join Now',
      bg: '/src/assets/trust.jpg'
    },
    {
      title: 'Cutting-Edge Investment Technology',
      description: 'AI-powered insights combined with human expertise',
      cta: 'See How It Works',
      bg: '/src/assets/cut.jpg'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const controls = useAnimation();
  const progressRef = useRef(null);

  // Kick off the progress‐bar animation whenever the slide changes:
  useEffect(() => {
    controls.set({ width: 0 });
    controls.start({
      width: '100%',
      transition: { duration: 4, ease: 'linear' }
    });
  }, [currentIndex, controls]);

  // setInterval for auto‑swipe
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCurrentIndex(i => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, slides.length]);

  // Swipe handlers
  const handleDragEnd = (e, info) => {
    if (info.offset.x < -100) {
      setCurrentIndex(i => (i + 1) % slides.length);
    }
    if (info.offset.x > 100) {
      setCurrentIndex(i => (i - 1 + slides.length) % slides.length);
    }
  };

  return (
    <div
      className="relative h-[75vh] overflow-hidden rounded-2xl shadow-xl mx-4 mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides with parallax */}
      {slides.map((s, idx) => (
        <AnimatePresence key={idx} initial={false}>
          {idx === currentIndex && (
            <motion.div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${s.bg})` }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 1 }}
            />
          )}
        </AnimatePresence>
      ))}

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 text-white">
        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="max-w-lg"
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold mb-4 leading-tight">
              {slides[currentIndex].title}
            </h1>
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              {slides[currentIndex].description}
            </p>
            <button className="bg-gradient-to-r from-red-600 to-red-500 px-8 py-3 rounded-full font-semibold drop-shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300">
              {slides[currentIndex].cta}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators & progress bar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-30">
        {slides.map((_, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div
              onClick={() => setCurrentIndex(idx)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-transform ${
                currentIndex === idx
                  ? 'scale-125 bg-white'
                  : 'bg-white/50 hover:bg-white'
              }`}
            />
            {currentIndex === idx && (
              <motion.div
                className="h-1 mt-1 bg-white rounded-full"
                ref={progressRef}
                initial={{ width: 0 }}
                animate={controls}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
  // bbbb
};

export default HeroSlider;
