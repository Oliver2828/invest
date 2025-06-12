// === src/components/Investplans.jsx ===
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowUpRight,
  FiCheck,
  FiTrendingUp,
  FiShield,
  FiBarChart2,
  FiClock
} from 'react-icons/fi';

const Investplans = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const plans = [
    {
      id: 1,
      title: "Starter Portfolio",
      description: "Low-risk investment for beginners with steady returns",
      category: "conservative",
      minAmount: 500,
      returnRate: "4-6%",
      duration: "12-24 months",
      features: [
        "Diversified bonds & treasuries",
        "Capital protection",
        "Monthly dividends",
        "24/7 portfolio monitoring"
      ],
      popular: false,
      color: "from-blue-600 to-blue-800"
    },
    {
      id: 2,
      title: "Growth Accelerator",
      description: "Balanced growth portfolio with moderate risk",
      category: "balanced",
      minAmount: 2000,
      returnRate: "7-9%",
      duration: "24-36 months",
      features: [
        "Mix of stocks and bonds",
        "Tech & renewable energy focus",
        "Quarterly rebalancing",
        "Tax optimization"
      ],
      popular: true,
      color: "from-emerald-600 to-emerald-800"
    },
    {
      id: 3,
      title: "Wealth Builder",
      description: "Aggressive growth for long-term wealth accumulation",
      category: "aggressive",
      minAmount: 5000,
      returnRate: "10-12%",
      duration: "5+ years",
      features: [
        "Global stock portfolio",
        "Crypto & alternative assets",
        "AI-powered investments",
        "Priority support"
      ],
      popular: false,
      color: "from-amber-600 to-amber-800"
    },
    {
      id: 4,
      title: "Retirement Gold",
      description: "Long-term retirement planning with stable returns",
      category: "conservative",
      minAmount: 10000,
      returnRate: "5-7%",
      duration: "10+ years",
      features: [
        "Tax-advantaged accounts",
        "Automatic rebalancing",
        "Retirement planning tools",
        "Legacy planning"
      ],
      popular: false,
      color: "from-violet-600 to-violet-800"
    },
    {
      id: 5,
      title: "Crypto Frontier",
      description: "High-risk cryptocurrency portfolio for maximum growth",
      category: "aggressive",
      minAmount: 2500,
      returnRate: "15-30%",
      duration: "3-5 years",
      features: [
        "Top 10 cryptocurrencies",
        "Staking rewards",
        "DeFi exposure",
        "Cold storage security"
      ],
      popular: true,
      color: "from-purple-600 to-purple-800"
    },
    {
      id: 6,
      title: "Sustainable Future",
      description: "ESG-focused investments for ethical growth",
      category: "balanced",
      minAmount: 3000,
      returnRate: "8-10%",
      duration: "3-5 years",
      features: [
        "Green energy companies",
        "Social impact investments",
        "ESG screening",
        "Impact reports"
      ],
      popular: false,
      color: "from-teal-600 to-teal-800"
    }
  ];

  const categories = [
    { id: 'all', name: 'All Plans' },
    { id: 'conservative', name: 'Conservative' },
    { id: 'balanced', name: 'Balanced' },
    { id: 'aggressive', name: 'Aggressive' }
  ];

  const filteredPlans = activeTab === 'all'
    ? plans
    : plans.filter(plan => plan.category === activeTab);

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  const item = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
  };
  const featureItem = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.3 } }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <motion.h2
            className="text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Investment Plans
          </motion.h2>
          <motion.p
            className="text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Discover investment strategies tailored to your goals. Build your wealth with confidence.
          </motion.p>
        </div>

        <div className="relative mb-12">
          <motion.div
            className="flex justify-center space-x-4"
            initial="hidden"
            animate="visible"
            variants={container}
          >
            {categories.map(cat => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`py-2 font-medium transition-colors ${
                  activeTab === cat.id
                    ? 'text-red-700'
                    : 'text-gray-600 hover:text-red-700'
                }`}
                variants={item}
              >
                {cat.name}
              </motion.button>
            ))}
          </motion.div>
          <motion.div
            className="absolute bottom-0 h-1 bg-red-700 rounded-full"
            layout
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              width: `${100 / categories.length}%`,
              left: `${categories.findIndex(c => c.id === activeTab) * (100 / categories.length)}%`
            }}
          />
        </div>

        {/* Stats Overview */}
<motion.div
  className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.3 }}
  variants={container}  // reuse your existing container variant
>
  {[
    { icon: <FiTrendingUp />, value: "12.4%", label: "Avg Return" },
    { icon: <FiShield />,      value: "98%",   label: "Retention" },
    { icon: <FiBarChart2 />,   value: "15,000+", label: "Portfolios" },
    { icon: <FiClock />,       value: "24/7",  label: "Monitoring" }
  ].map((stat, index) => (
    <motion.div
      key={index}
      className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={item}      // reuse your existing item variant
      whileHover={{ scale: 1.03 }}
    >
      {/* Icon */}
      <motion.div
        className="text-red-600 mb-3 text-2xl"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ delay: index * 0.2, type: "spring", stiffness: 300 }}
        viewport={{ once: true }}
      >
        {stat.icon}
      </motion.div>

      {/* Number */}
      <motion.div
        className="text-3xl font-bold mb-1"
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {stat.value}
      </motion.div>

      {/* Label */}
      <motion.div
        className="text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 + index * 0.2, duration: 0.6 }}
        viewport={{ once: true }}
      >
        {stat.label}
      </motion.div>
    </motion.div>
  ))}
</motion.div>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          <AnimatePresence>
            {filteredPlans.map(plan => (
              <motion.div
                key={plan.id}
                className={`relative bg-gradient-to-br ${plan.color} text-white rounded-2xl overflow-hidden`}
                variants={item}
                whileHover={{ y: -8, boxShadow: "0 15px 30px rgba(0,0,0,0.15)" }}
                layout
              >
                <div className="p-6 space-y-4">
                  {plan.popular && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                      POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl font-bold">{plan.title}</h3>
                  <p className="text-gray-200">{plan.description}</p>

                  <div className="flex justify-between text-sm">
                    <div>
                      <div>Min Invest</div>
                      <div className="font-semibold">${plan.minAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div>Returns</div>
                      <div className="font-semibold">{plan.returnRate}</div>
                    </div>
                    <div>
                      <div>Duration</div>
                      <div className="font-semibold">{plan.duration}</div>
                    </div>
                  </div>

                  <div>
                    <div className="uppercase text-xs mb-2">Key Features</div>
                    <ul className="space-y-1">
                      {plan.features.map((f, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start text-sm"
                          variants={featureItem}
                        >
                          <FiCheck className="mt-1 mr-2 text-green-300" />
                          {f}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <motion.button
                    className="w-full py-2 mt-4 bg-white text-gray-900 rounded-lg font-bold flex justify-center items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Invest Now
                    <FiArrowUpRight className="ml-1" />
                  </motion.button>
                </div>

                <div className="bg-black/10 p-3 text-center text-xs">
                  Protected by $250k insurance
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-16 bg-gradient-to-r from-red-900 to-red-700 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="mb-4 md:mb-0">
            <h3 className="text-2xl font-bold mb-2">Not sure which plan?</h3>
            <p>Take our quick assessment to find your perfect match.</p>
          </div>
          <motion.button
            className="px-6 py-2 bg-white text-red-700 rounded-lg font-bold flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Take Assessment
            <FiArrowUpRight className="ml-2" />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default Investplans;
