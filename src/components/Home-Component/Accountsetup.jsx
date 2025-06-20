// === src/components/InvestmentSteps.jsx ===
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSearch, FiDollarSign, FiTrendingUp, FiArrowRight } from 'react-icons/fi';

const steps = [
  {
    id: 1,
    title: "Explore Investments",
    description:
      "Browse our curated selection of investment options and find opportunities that match your goals.",
    icon: <FiSearch size={24} />,
    color: "from-red-500 to-red-700",
  },
  {
    id: 2,
    title: "Fund Your Account",
    description:
      "Securely add funds to your investment wallet using bank transfer or credit card.",
    icon: <FiDollarSign size={24} />,
    color: "from-red-600 to-red-800",
  },
  {
    id: 3,
    title: "Start Investing",
    description:
      "Execute your investment strategy with single-click purchases and real-time tracking.",
    icon: <FiTrendingUp size={24} />,
    color: "from-red-700 to-red-900",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 120 } },
  hover: { rotate: -2, scale: 1.03, transition: { type: 'spring', stiffness: 300 } }
};

const iconVariants = {
  pulse: {
    scale: [1, 1.2, 1],
    transition: { duration: 2, repeat: Infinity }
  }
};

export default function InvestmentSteps() {
  return (
    <div className="relative min-h-screen bg-[url(./assets/start.jpg)] bg-no-repeat bg-center bg-cover py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Start Investing in 3 Simple Steps
        </motion.h2>
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Begin your investment journey today. No complex setup needed—just follow these easy steps to start growing your wealth.
        </motion.p>
      </div>

      {/* Connector Line */}
      <div className="hidden md:block absolute top-1/2 left-1/12 right-1/12 h-1 bg-red-200"></div>

      {/* Steps */}
      <AnimatePresence>
        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-3 gap-12"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              className="relative z-10"
              variants={cardVariants}
              whileHover="hover"
            >
              {/* Step Circle */}
              <div
                className={`absolute -top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-xl font-bold shadow-2xl`}
              >
                {step.id}
              </div>

              {/* Card */}
              <div className="pt-10 pb-6 px-6 bg-white rounded-3xl shadow-xl flex flex-col h-full">
                {/* Icon */}
                <motion.div
                  className={`w-12 h-12 mb-4 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center mx-auto text-white`}
                  variants={iconVariants}
                  animate="pulse"
                >
                  {step.icon}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
                <p className="text-gray-600 flex-grow">{step.description}</p>

                {/* Progress Ring */}
                <div className="mt-6 flex justify-center">
                  <svg width="60" height="60" viewBox="0 0 36 36">
                    <path
                      className="text-gray-200"
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="2"
                    />
                    <motion.path
                      className="text-red-600"
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      strokeWidth="2"
                      strokeDasharray="80,100"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 0.8 }}
                      transition={{ duration: 1, ease: 'easeOut', delay: 0.4 + i * 0.2 }}
                    />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* CTA */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
      >
        <motion.button
          className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full text-lg font-semibold shadow-lg"
          whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(220,38,38,0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          Get Started Now
          <FiArrowRight className="ml-2" />
        </motion.button>
        <p className="text-gray-200 mt-4 text-sm">
          Already have an account?
          <a href="#" className="text-red-600 font-medium ml-1 hover:underline">
            Sign in to invest
          </a>
        </p>
      </motion.div>
    </div>
  );
}
