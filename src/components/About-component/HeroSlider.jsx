// === src/components/about/HeroSlider.jsx ===
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import finaImg from '../../assets/fina.jpg';
import trustImg from '../../assets/trust.jpg';
import cutImg from '../../assets/cut.jpg';

const HeroSlider = () => {
  const slides = [
    {
      title: 'Your Financial Journey Starts Here',
      description:
        'We empower investors with innovative tools and personalized guidance to navigate markets confidently',
      cta: 'Explore Investments',
      bg: finaImg
    },
    {
      title: 'Trusted by Millions Worldwide',
      description:
        'Join our community of savvy investors growing their wealth through disciplined strategies',
      cta: 'Join Now',
      bg: trustImg
    },
    {
      title: 'Cutting-Edge Investment Technology',
      description:
        'AI-powered insights combined with human expertise for smarter decisions',
      cta: 'See How It Works',
      bg: cutImg
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const controls = useAnimation();
  const intervalRef = useRef(null);

  useEffect(() => {
    controls.set({ width: 0 });
    controls.start({
      width: '100%',
      transition: { duration: 5, ease: 'linear' }
    });
  }, [currentIndex, controls]);

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(i => (i + 1) % slides.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, slides.length]);

  const handleDragEnd = (e, info) => {
    if (info.offset.x < -100) setCurrentIndex(i => (i + 1) % slides.length);
    if (info.offset.x > 100) setCurrentIndex(i => (i - 1 + slides.length) % slides.length);
  };

  const goToIndex = idx => {
    setCurrentIndex(idx);
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentIndex(i => (i + 1) % slides.length);
    }, 5000);
  };

  return (
    <div
      className="relative h-[80vh] overflow-hidden rounded-2xl shadow-xl mx-4 mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((slide, idx) => (
        <AnimatePresence key={idx} initial={false}>
          {idx === currentIndex && (
            <motion.div
              className="absolute inset-0 bg-center bg-cover"
              style={{ backgroundImage: `url(${slide.bg})` }}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.1, opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="relative z-20 h-full flex flex-col justify-center items-start px-8 md:px-16 lg:px-24 text-white">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.1}
            onDragEnd={handleDragEnd}
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 leading-tight"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {slides[currentIndex].title}
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 opacity-90 max-w-xl"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {slides[currentIndex].description}
            </motion.p>
            <motion.button
              className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 rounded-full font-bold drop-shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {slides[currentIndex].cta}
              <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
                &rarr;
              </span>
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center space-x-3 z-30">
        {slides.map((_, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <button
              onClick={() => goToIndex(idx)}
              className={`w-4 h-4 rounded-full cursor-pointer transition-all ${
                currentIndex === idx ? 'scale-125 bg-white' : 'bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
            {currentIndex === idx && (
              <motion.div
                className="h-1 mt-1 bg-gradient-to-r from-red-500 to-red-600 rounded-full"
                initial={{ width: 0 }}
                animate={controls}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
