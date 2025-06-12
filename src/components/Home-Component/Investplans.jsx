// === src/components/Investplans.jsx ===
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiCheck, FiTrendingUp, FiShield, FiBarChart2, FiClock } from 'react-icons/fi';

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

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const tabHover = {
    scale: 1.05,
    backgroundColor: "rgba(239, 68, 68, 0.1)",
    transition: { duration: 0.2 }
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Investment Plans
          </motion.h2>
          <motion.p 
            className="text-gray-600 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Discover investment strategies tailored to your financial goals and risk tolerance. 
            Start building your wealth today with our expertly crafted portfolios.
          </motion.p>
        </div>

        {/* Category Tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeTab === category.id
                  ? 'bg-gradient-to-r from-red-600 to-red-800 text-white shadow-lg shadow-red-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
              onClick={() => setActiveTab(category.id)}
              whileHover={tabHover}
              variants={item}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Stats Overview */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          initial="hidden"
          animate="visible"
          variants={container}
        >
          {[
            { icon: <FiTrendingUp className="text-2xl" />, value: "12.4%", label: "Avg. Annual Return" },
            { icon: <FiShield className="text-2xl" />, value: "98%", label: "Client Retention" },
            { icon: <FiBarChart2 className="text-2xl" />, value: "15,000+", label: "Active Portfolios" },
            { icon: <FiClock className="text-2xl" />, value: "24/7", label: "Portfolio Monitoring" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="bg-white p-6 rounded-xl shadow-md border border-gray-100"
              variants={item}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="text-red-500 mb-3">{stat.icon}</div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Investment Plans Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          {filteredPlans.map((plan) => (
            <motion.div
              key={plan.id}
              className={`bg-gradient-to-br ${plan.color} text-white rounded-2xl overflow-hidden shadow-xl`}
              variants={item}
              whileHover={{ 
                y: -10,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)"
              }}
            >
              <div className="p-6 relative">
                {plan.popular && (
                  <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold">
                    MOST POPULAR
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                <p className="text-gray-200 mb-6">{plan.description}</p>
                
                <div className="flex justify-between mb-6">
                  <div>
                    <div className="text-sm text-gray-300">Min. Investment</div>
                    <div className="text-xl font-bold">${plan.minAmount.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Est. Returns</div>
                    <div className="text-xl font-bold">{plan.returnRate}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-300">Duration</div>
                    <div className="text-xl font-bold">{plan.duration}</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="text-sm font-medium mb-3">KEY FEATURES:</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-green-400 mt-1 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <motion.button
                  className="w-full py-3 bg-white text-gray-900 rounded-lg font-bold flex items-center justify-center group"
                  whileHover={{ 
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Invest Now
                  <FiArrowUpRight className="ml-2 transition-transform group-hover:translate-x-1" />
                </motion.button>
              </div>
              
              <div className="bg-black/10 p-4 text-center text-sm">
                <span className="text-gray-300">All investments are protected by our </span>
                <span className="text-yellow-400 font-medium">$250,000 insurance policy</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Comparison Banner */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-red-900 to-red-700 rounded-2xl p-8 text-white"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-2">Not sure which plan is right for you?</h3>
              <p className="text-red-100 max-w-xl">
                Take our 2-minute assessment and we'll recommend the perfect investment strategy 
                based on your financial goals and risk tolerance.
              </p>
            </div>
            <motion.button
              className="px-8 py-3 bg-white text-red-700 rounded-lg font-bold flex items-center group"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                scale: 1.05
              }}
              whileTap={{ scale: 0.95 }}
            >
              Take Assessment
              <FiArrowUpRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Investplans;