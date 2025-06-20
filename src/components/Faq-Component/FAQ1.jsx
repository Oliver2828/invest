import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  FiHelpCircle,
  FiLock,
  FiTrendingUp,
  FiShield,
  FiDollarSign,
} from 'react-icons/fi';

const faqData = [
  {
    question: "What is investnow.com?",
    answer:
      "investnow.com is a global investment firm that offers clients easy access to cryptocurrency, stocks, real estate, bonds, indices, and metaverse investment opportunities.",
    icon: <FiHelpCircle className="text-red-500 text-xl" />,
  },
  {
    question: "Is investnow.com regulated?",
    answer:
      "Yes, we follow strict compliance and security protocols across all regions we operate in. Our services are aligned with international financial regulations and we're licensed in over 30 jurisdictions.",
    icon: <FiLock className="text-red-500 text-xl" />,
  },
  {
    question: "How do I start investing?",
    answer:
      "Simply sign up on our platform, choose your preferred investment package, and fund your account. Our intuitive dashboard guides you through every step with personalized recommendations based on your goals.",
    icon: <FiTrendingUp className="text-red-500 text-xl" />,
  },
  {
    question: "Are my funds safe?",
    answer:
      "Absolutely. All transactions are encrypted with bank-level security. We maintain top-tier risk management standards and keep 95% of client funds in cold storage with multi-signature wallets.",
    icon: <FiShield className="text-red-500 text-xl" />,
  },
  {
    question: "What is the minimum investment amount?",
    answer:
      "Our minimum investment starts at just $100 to allow anyone to begin their investment journey. We also offer micro-investing options starting at $5 for fractional shares.",
    icon: <FiDollarSign className="text-red-500 text-xl" />,
  },
];

export default function FAQ1() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-white py-12 px-6 md:px-24">
      <h2 className="text-3xl font-bold text-center mb-8 text-red-400">
        Frequently Asked Questions
      </h2>
      <div className="space-y-4">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-lg shadow-sm"
          >
            <button
              onClick={() => toggleFaq(index)}
              className="w-full text-left px-4 py-4 font-medium text-gray-800 hover:bg-blue-50 flex justify-between items-center transition-colors duration-300"
            >
              <span className="flex items-center gap-2">
                {item.icon}
                {item.question}
              </span>
              <span className="text-2xl text-blue-600">
                {openIndex === index ? '−' : '+'}
              </span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden px-4 pb-4 text-gray-600"
                >
                  <p>{item.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
