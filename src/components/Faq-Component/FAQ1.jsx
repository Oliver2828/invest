import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiHelpCircle, FiLock, FiDollarSign, FiShield, FiTrendingUp } from 'react-icons/fi';

const faqData = [
  {
    question: "What is investnow.com?",
    answer: "investnow.com is a global investment firm that offers clients easy access to cryptocurrency, stocks, real estate, bonds, indices, and metaverse investment opportunities.",
    icon: <FiHelpCircle className="text-red-500" />
  },
  {
    question: "Is investnow.com regulated?",
    answer: "Yes, we follow strict compliance and security protocols across all regions we operate in. Our services are aligned with international financial regulations and we're licensed in over 30 jurisdictions.",
    icon: <FiLock className="text-red-500" />
  },
  {
    question: "How do I start investing?",
    answer: "Simply sign up on our platform, choose your preferred investment package, and fund your account. Our intuitive dashboard guides you through every step with personalized recommendations based on your goals.",
    icon: <FiTrendingUp className="text-red-500" />
  },
  {
    question: "Are my funds safe?",
    answer: "Absolutely. All transactions are encrypted with bank-level security. We maintain top-tier risk management standards and keep 95% of client funds in cold storage with multi-signature wallets.",
    icon: <FiShield className="text-red-500" />
  },
  {
    question: "What is the minimum investment amount?",
    answer: "Our minimum investment starts at just $100 to allow anyone to begin their investment journey. We also offer micro-investing options starting at $5 for fractional shares.",
    icon: <FiDollarSign className="text-red-500" />
  },
];

export default function FAQ1() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[url(./assets/faq.jpg)] bg-center bg-no-repeat bg-cover py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5">
        <div className="absolute top-20 left-10 w-40 h-40 bg-red-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-20 w-60 h-60 bg-red-600 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-red-700 rounded-full blur-3xl"></div>
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-extrabold mb-4 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-100 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Everything you need to know about investing with our platform
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-red-500 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ 
                y: -5,
                borderColor: '#ef4444',
                boxShadow: "0 20px 25px -5px rgba(239, 68, 68, 0.1), 0 10px 10px -5px rgba(239, 68, 68, 0.05)"
              }}
              layout
            >
              <motion.button
                layout
                onClick={() => toggleFaq(index)}
                className={`w-full text-left px-8 py-6 flex items-start transition-all duration-300 ${
                  openIndex === index 
                    ? 'bg-gradient-to-r from-red-900/20 to-red-800/10' 
                    : 'group-hover:bg-gray-800/50'
                }`}
                aria-expanded={openIndex === index}
                aria-controls={`faq-content-${index}`}
              >
                <div className="mr-4 mt-1">
                  {item.icon}
                </div>
                
                <div className="flex-1">
                  <motion.span 
                    layout="position" 
                    className={`pr-4 font-bold text-lg ${
                      openIndex === index ? 'text-red-400' : 'text-white group-hover:text-red-300'
                    }`}
                  >
                    {item.question}
                  </motion.span>
                </div>
                
                <motion.span
                  className="text-red-500 min-w-[24px] flex justify-center mt-1"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="h-6 w-6" />
                </motion.span>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    layout
                    id={`faq-content-${index}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ 
                      opacity: 1, 
                      height: "auto",
                      transition: { 
                        opacity: { duration: 0.3 },
                        height: { duration: 0.4 }
                      }
                    }}
                    exit={{ 
                      opacity: 0, 
                      height: 0,
                      transition: { 
                        opacity: { duration: 0.2 },
                        height: { duration: 0.3 }
                      }
                    }}
                    className="px-8 overflow-hidden"
                  >
                    <div className="pb-7 pt-1 text-gray-300 text-lg">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-400 mb-6">Still have questions?</p>
          <button className="bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 rounded-full font-bold text-white shadow-xl shadow-red-900/30 hover:shadow-2xl transition-all hover:scale-[1.02] group">
            Contact Support
            <span className="ml-2 inline-block group-hover:translate-x-1 transition-transform">
              &rarr;
            </span>
          </button>
        </motion.div>
      </div>
    </div>
  );
}