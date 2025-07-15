// === src/components/HeroSection.jsx ===
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import { FiArrowUpRight, FiArrowDownRight, FiRefreshCw } from 'react-icons/fi';
import InvestorAlert from './InvestorAlerts';

// Import the video asset
import invesVideo from '../assets/inves.mp4';
import gridPattern from '../assets/grid-pattern.svg';

const HeroSection = () => {
  const [activeTab, setActiveTab] = useState('btc');
  const [timeframe, setTimeframe] = useState('24h');
  const videoRef = useRef(null);

  // Mock data for demonstration
  const btcData = [
    { time: '00:00', price: 62000 },
    { time: '04:00', price: 62500 },
    { time: '08:00', price: 61800 },
    { time: '12:00', price: 62200 },
    { time: '16:00', price: 62800 },
    { time: '20:00', price: 63200 },
    { time: '23:00', price: 63000 },
  ];
  const priceChange = { value: 1000, percentage: 1.62 };
  const currentPrice = 63000;
  const isLoading = false;
  const useMockData = true;

  const tradesData = [
    { id: 1, asset: 'BTC', type: 'Buy', amount: 0.5, value: '31,500', time: '10:30 AM' },
    { id: 2, asset: 'ETH', type: 'Sell', amount: 2.1, value: '6,500', time: '11:15 AM' },
    { id: 3, asset: 'AAPL', type: 'Buy', amount: 10, value: '18,200', time: '11:45 AM' },
    { id: 4, asset: 'TSLA', type: 'Sell', amount: 5, value: '12,500', time: '12:30 PM' },
    { id: 5, asset: 'SOL', type: 'Buy', amount: 25, value: '7,500', time: '1:15 PM' },
  ];

  const stocksData = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.52, change: '+1.2%', volume: '45.2M' },
    { symbol: 'MSFT', name: 'Microsoft', price: 340.21, change: '+0.8%', volume: '32.1M' },
    { symbol: 'GOOGL', name: 'Alphabet', price: 135.87, change: '-0.3%', volume: '18.9M' },
    { symbol: 'AMZN', name: 'Amazon', price: 128.45, change: '+2.1%', volume: '29.7M' },
    { symbol: 'TSLA', name: 'Tesla', price: 250.67, change: '-1.5%', volume: '62.3M' },
    { symbol: 'NVDA', name: 'NVIDIA', price: 426.92, change: '+3.7%', volume: '41.8M' },
  ];

  const marketIndices = [
    { name: 'S&P 500', value: 4522.79, change: '+0.45%' },
    { name: 'NASDAQ', value: 14017.85, change: '+0.62%' },
    { name: 'DOW JONES', value: 35281.40, change: '+0.28%' },
    { name: 'CRYPTO', value: 1240000000000, change: '+1.82%' },
  ];

  const priceChangeColor = priceChange.percentage >= 0 ? 'text-green-400' : 'text-red-400';
  const priceChangeIcon = priceChange.percentage >= 0
    ? <FiArrowUpRight className="inline" />
    : <FiArrowDownRight className="inline" />;

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={invesVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30"></div>
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-10 mix-blend-soft-light"
          style={{ backgroundImage: `url(${gridPattern})` }}
        ></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <InvestorAlert />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            {/* Hero Text & CTAs */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="block mb-3">Intelligent Investing</span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-amber-500">
                  Where Markets Meet Opportunity
                </span>
              </h1>
              <p className="text-lg text-gray-200 mb-8 max-w-lg leading-relaxed">
                Harness real-time market intelligence, sophisticated analytics, and institutional-grade trading tools.
                Our platform transforms complex market data into actionable insights for investors at every level.
              </p>
              <div className="flex flex-wrap gap-4 mb-6">
                <motion.button
                  className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-600 to-amber-700 hover:from-red-700 hover:to-amber-800 transition-all shadow-lg shadow-red-900/30 flex items-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>Start Trading Today</span>
                  <FiArrowUpRight className="group-hover:translate-x-1 transition-transform" />
                </motion.button>
                <motion.button
                  className="px-8 py-4 rounded-xl border border-red-500/50 text-red-100 hover:bg-red-900/20 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Investment Solutions
                </motion.button>
              </div>
            </motion.div>

            {/* Live Trades */}
            <motion.div
              className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-red-500/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {tradesData.map((trade) => (
                  <motion.div
                    key={trade.id}
                    className={`p-4 rounded-xl flex justify-between items-center backdrop-blur-sm ${
                      trade.type === 'Buy'
                        ? 'bg-green-900/20 border border-green-500/30'
                        : 'bg-red-900/20 border border-red-500/30'
                    }`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <div className="font-bold text-lg">{trade.asset}</div>
                      <div className="text-sm text-gray-400">{trade.time}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold text-lg ${trade.type === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.type} {trade.amount}
                      </div>
                      <div className="text-sm">${trade.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column (Charts & Stocks) */}
          <div>
            {/* Chart Tabs */}
            <motion.div
              className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-red-500/20"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex justify-between items-center mb-6 flex-wrap">
                <div className="flex space-x-2 mb-4 sm:mb-0">
                  {['btc', 'eth', 'stocks'].map((tab) => (
                    <button
                      key={tab}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        activeTab === tab
                          ? 'bg-gradient-to-r from-red-600 to-amber-700 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>
                <div className="flex space-x-2">
                  {['1h', '24h', '7d', '30d', '90d'].map((time) => (
                    <button
                      key={time}
                      className={`px-3 py-1.5 rounded-lg text-xs ${
                        timeframe === time
                          ? 'bg-amber-700 text-white'
                          : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      }`}
                      onClick={() => setTimeframe(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="h-80 relative">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="text-red-400"
                    >
                      <FiRefreshCw size={40} />
                    </motion.div>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={btcData}>
                      <defs>
                        <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="time" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" domain={['auto', 'auto']} />
                      <Tooltip
                        contentStyle={{
                          background: '#1f2937',
                          borderColor: '#ef4444',
                          borderRadius: '8px',
                          boxShadow: '0 4px 20px rgba(239, 68, 68, 0.25)'
                        }}
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                      />
                      <Area
                        type="monotone"
                        dataKey="price"
                        stroke="#ef4444"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorPrice)"
                        activeDot={{ r: 6, fill: '#dc2626' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>

              {/* Price Info */}
              <div className="flex justify-between items-center mt-6">
                <div>
                  <div className="text-3xl font-bold">
                    {currentPrice ? `$${currentPrice.toLocaleString()}` : 'Loading...'}
                  </div>
                  <div className="flex items-center mt-1">
                    <span className={`${priceChangeColor} font-medium flex items-center`}>
                      {priceChangeIcon} {priceChange.percentage.toFixed(2)}%
                      <span className="text-gray-400 ml-2 text-sm">(24h change)</span>
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400">24h Volume</div>
                  <div className="font-bold text-xl">
                    $42.8B
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stocks Section */}
            <motion.div
              className="bg-gray-900/60 backdrop-blur-sm rounded-xl p-6 border border-red-500/20 mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-red-300 mb-4">EQUITIES MARKET LEADERS</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm">
                      <th className="pb-3">SYMBOL</th>
                      <th className="pb-3">COMPANY</th>
                      <th className="pb-3 text-right">PRICE</th>
                      <th className="pb-3 text-right">CHANGE</th>
                      <th className="pb-3 text-right">VOLUME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocksData.map((stock) => (
                      <tr
                        key={stock.symbol}
                        className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="py-3 font-bold">{stock.symbol}</td>
                        <td className="py-3 text-gray-300">{stock.name}</td>
                        <td className="py-3 text-right font-mono">${stock.price.toFixed(2)}</td>
                        <td className={`py-3 text-right font-bold ${
                          stock.change.includes('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {stock.change}
                        </td>
                        <td className="py-3 text-right text-gray-400 font-mono">{stock.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
