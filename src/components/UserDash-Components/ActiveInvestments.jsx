import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ActiveInvestments = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [timeframe, setTimeframe] = useState('1y');
  
  // Mock investment data
  const investments = [
    {
      id: 1,
      name: 'Tech Growth Fund',
      type: 'Mutual Fund',
      amount: 12500,
      return: 18.7,
      duration: '3 years',
      status: 'active',
      progress: 65,
      startDate: '2022-05-15'
    },
    {
      id: 2,
      name: 'Renewable Energy ETF',
      type: 'ETF',
      amount: 8400,
      return: 22.3,
      duration: '5 years',
      status: 'active',
      progress: 42,
      startDate: '2023-01-10'
    },
    {
      id: 3,
      name: 'AI Innovation Stocks',
      type: 'Stock Portfolio',
      amount: 21500,
      return: 34.2,
      duration: 'Long-term',
      status: 'active',
      progress: 28,
      startDate: '2023-08-22'
    },
    {
      id: 4,
      name: 'Real Estate Trust',
      type: 'REIT',
      amount: 35000,
      return: 7.8,
      duration: '10 years',
      status: 'matured',
      progress: 100,
      startDate: '2018-11-05'
    },
    {
      id: 5,
      name: 'Blockchain Venture',
      type: 'Crypto Fund',
      amount: 9500,
      return: -5.2,
      duration: '2 years',
      status: 'active',
      progress: 75,
      startDate: '2022-09-30'
    },
    {
      id: 6,
      name: 'Healthcare Index',
      type: 'Index Fund',
      amount: 16700,
      return: 12.4,
      duration: '7 years',
      status: 'active',
      progress: 35,
      startDate: '2023-03-18'
    }
  ];

  // Filter investments based on active tab
  const filteredInvestments = investments.filter(investment => {
    if (activeTab === 'all') return true;
    return investment.status === activeTab;
  });

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // bnn

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Calculate total value
  const totalValue = investments
    .filter(i => i.status === 'active')
    .reduce((sum, investment) => sum + investment.amount, 0);

  // Calculate total return
  const totalReturn = investments
    .filter(i => i.status === 'active')
    .reduce((sum, investment) => sum + (investment.amount * (investment.return/100)), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-2">
            Active Investments
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Track and manage your investment portfolio with real-time performance data and insights
          </p>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Value</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalValue)}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 font-medium">↑ 12.4%</span>
              <span className="text-gray-500 text-sm ml-2">from last quarter</span>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border border-red-100">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Return</h3>
                <p className="text-2xl font-bold text-gray-900 mt-1">{formatCurrency(totalReturn)}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-green-600 font-medium">↑ 8.7%</span>
              <span className="text-gray-500 text-sm ml-2">annualized return</span>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl shadow-lg p-6 text-white">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-red-100 text-sm font-medium">Active Investments</h3>
                <p className="text-2xl font-bold mt-1">{investments.filter(i => i.status === 'active').length}</p>
              </div>
              <div className="bg-white bg-opacity-20 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="mt-4">
              <div className="w-full bg-white bg-opacity-30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full" 
                  style={{ width: '75%' }}
                ></div>
              </div>
              <p className="mt-2 text-sm text-red-100">5 investments performing above target</p>
            </div>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 rounded-xl shadow-sm border border-red-100">
          <div className="flex space-x-2 mb-4 sm:mb-0">
            {['all', 'active', 'matured'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize ${
                  activeTab === tab 
                    ? 'bg-red-600 text-white' 
                    : 'text-gray-600 hover:bg-red-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex space-x-3">
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-red-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm appearance-none bg-white"
              >
                <option value="recent">Most Recent</option>
                <option value="return">Highest Return</option>
                <option value="amount">Investment Amount</option>
              </select>
              <svg
                className="w-4 h-4 text-red-400 absolute left-3 top-2.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
            </div>
            
            <div className="flex bg-white rounded-lg shadow-sm p-1 border border-red-100">
              {['1m', '6m', '1y', 'all'].map((time) => (
                <button
                  key={time}
                  onClick={() => setTimeframe(time)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeframe === time 
                      ? 'bg-red-600 text-white' 
                      : 'text-gray-600 hover:bg-red-50'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Investments Grid */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredInvestments.map((investment) => (
            <motion.div
              key={investment.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100"
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{investment.name}</h3>
                    <div className="flex items-center mt-1">
                      <span className="text-gray-500 text-sm">{investment.type}</span>
                      <span className={`ml-3 px-2 py-1 rounded-full text-xs font-medium ${
                        investment.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {investment.status}
                      </span>
                    </div>
                  </div>
                  <div className="bg-red-100 rounded-full p-2">
                    <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">
                        {investment.name.charAt(0)}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-bold text-gray-900">{formatCurrency(investment.amount)}</span>
                  </div>
                  
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Return</span>
                    <span className={`font-bold ${investment.return >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {investment.return >= 0 ? '+' : ''}{investment.return.toFixed(1)}%
                    </span>
                  </div>
                  
                  <div className="flex justify-between mb-4">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">{investment.duration}</span>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">Progress</span>
                      <span className="font-medium text-gray-900">{investment.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-gradient-to-r from-red-500 to-red-600" 
                        style={{ width: `${investment.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-6 py-3 bg-gradient-to-r from-red-50 to-white border-t border-red-100">
                <div className="flex justify-between">
                  <div className="text-sm text-gray-500">
                    Started: {investment.startDate}
                  </div>
                  <div className="flex space-x-2">
                    <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                      Details
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium text-sm">
                      Manage
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Chart */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl shadow-xl p-6 border border-red-100"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">Portfolio Performance</h2>
            <div className="flex space-x-3">
              <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                Download Report
              </button>
            </div>
          </div>
          
          <div className="h-80 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-200 flex items-center justify-center flex-col">
            <div className="text-center">
              <div className="text-red-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700">Investment Performance Chart</h3>
              <p className="text-gray-500 max-w-md mt-2">
                This interactive chart shows the performance of your investments over time. 
                Hover to see detailed metrics and compare against market benchmarks.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Add Investment CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-r from-red-600 to-red-700 rounded-2xl shadow-xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-2">Start a New Investment</h3>
          <p className="text-red-100 max-w-2xl mx-auto mb-6">
            Grow your portfolio with our carefully curated investment opportunities across various asset classes.
          </p>
          <button className="bg-white text-red-600 font-bold px-6 py-3 rounded-full hover:bg-red-50 transition-all">
            Browse Investment Options
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default ActiveInvestments;