import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MarketData = () => {
  const [activeTab, setActiveTab] = useState('stocks');
  const [timeframe, setTimeframe] = useState('1d');
  const [isLoading, setIsLoading] = useState(true);
  const [marketData, setMarketData] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);
  const [marketSummary, setMarketSummary] = useState({});

  // Generate realistic market data
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Market summary data
      setMarketSummary({
        sp500: { value: 4545.67, change: 1.23 },
        dow: { value: 34567.89, change: -0.45 },
        nasdaq: { value: 14234.56, change: 2.34 },
        fearGreed: 34, // Fear
        vix: 19.45
      });
      
      // Stock market data
      const stocks = [
        { 
          id: 1, 
          symbol: 'AAPL', 
          name: 'Apple Inc.', 
          price: 182.52, 
          open: 180.34, 
          high: 183.45, 
          low: 179.87, 
          change: +2.34, 
          changePercent: +1.30, 
          volume: '32.1M',
          trend: [182.1, 181.8, 182.4, 182.9, 183.2, 182.7, 182.5],
          sector: 'Technology'
        },
        { 
          id: 2, 
          symbol: 'MSFT', 
          name: 'Microsoft Corp.', 
          price: 407.54, 
          open: 408.21, 
          high: 409.33, 
          low: 406.12, 
          change: -1.23, 
          changePercent: -0.30, 
          volume: '18.7M',
          trend: [407.8, 408.1, 407.6, 407.2, 406.9, 407.3, 407.5],
          sector: 'Technology'
        },
        { 
          id: 3, 
          symbol: 'GOOGL', 
          name: 'Alphabet Inc.', 
          price: 138.45, 
          open: 137.89, 
          high: 139.12, 
          low: 137.45, 
          change: +0.87, 
          changePercent: +0.63, 
          volume: '15.3M',
          trend: [137.9, 138.2, 138.5, 138.7, 138.4, 138.3, 138.4],
          sector: 'Technology'
        },
        { 
          id: 4, 
          symbol: 'AMZN', 
          name: 'Amazon.com Inc.', 
          price: 178.22, 
          open: 175.45, 
          high: 178.95, 
          low: 175.12, 
          change: +3.21, 
          changePercent: +1.83, 
          volume: '42.5M',
          trend: [175.8, 176.4, 177.1, 177.8, 178.0, 178.3, 178.2],
          sector: 'Consumer Cyclical'
        },
        { 
          id: 5, 
          symbol: 'TSLA', 
          name: 'Tesla Inc.', 
          price: 246.39, 
          open: 250.12, 
          high: 251.45, 
          low: 245.67, 
          change: -5.67, 
          changePercent: -2.25, 
          volume: '78.9M',
          trend: [250.5, 249.8, 248.6, 247.3, 246.8, 246.5, 246.4],
          sector: 'Automotive'
        },
        { 
          id: 6, 
          symbol: 'META', 
          name: 'Meta Platforms Inc.', 
          price: 504.29, 
          open: 498.76, 
          high: 505.34, 
          low: 497.89, 
          change: +7.34, 
          changePercent: +1.48, 
          volume: '22.4M',
          trend: [499.2, 500.5, 502.1, 503.4, 504.0, 504.5, 504.3],
          sector: 'Technology'
        },
      ];
      
      // Cryptocurrency data
      const crypto = [
        { 
          id: 1, 
          symbol: 'BTC', 
          name: 'Bitcoin', 
          price: 61234.78, 
          open: 60890.45, 
          high: 61567.89, 
          low: 60543.21, 
          change: +344.33, 
          changePercent: +0.56, 
          volume: '$28.4B',
          trend: [61000, 61120, 61200, 61250, 61300, 61280, 61235],
          marketCap: '$1.2T'
        },
        { 
          id: 2, 
          symbol: 'ETH', 
          name: 'Ethereum', 
          price: 3421.56, 
          open: 3402.78, 
          high: 3456.34, 
          low: 3398.45, 
          change: +18.78, 
          changePercent: +0.55, 
          volume: '$14.2B',
          trend: [3405, 3410, 3418, 3422, 3425, 3423, 3421],
          marketCap: '$410.5B'
        },
        { 
          id: 3, 
          symbol: 'SOL', 
          name: 'Solana', 
          price: 142.67, 
          open: 138.45, 
          high: 144.56, 
          low: 137.89, 
          change: +4.22, 
          changePercent: +3.05, 
          volume: '$3.2B',
          trend: [138.5, 139.2, 140.5, 141.8, 142.3, 142.6, 142.7],
          marketCap: '$63.4B'
        },
        { 
          id: 4, 
          symbol: 'ADA', 
          name: 'Cardano', 
          price: 0.4567, 
          open: 0.4523, 
          high: 0.4598, 
          low: 0.4498, 
          change: +0.0044, 
          changePercent: +0.97, 
          volume: '$560M',
          trend: [0.452, 0.453, 0.454, 0.455, 0.456, 0.4565, 0.4567],
          marketCap: '$16.2B'
        },
        { 
          id: 5, 
          symbol: 'DOGE', 
          name: 'Dogecoin', 
          price: 0.1289, 
          open: 0.1298, 
          high: 0.1302, 
          low: 0.1276, 
          change: -0.0009, 
          changePercent: -0.69, 
          volume: '$480M',
          trend: [0.1295, 0.1292, 0.1290, 0.1288, 0.1287, 0.1288, 0.1289],
          marketCap: '$18.5B'
        },
        { 
          id: 6, 
          symbol: 'DOT', 
          name: 'Polkadot', 
          price: 6.78, 
          open: 6.72, 
          high: 6.83, 
          low: 6.68, 
          change: +0.06, 
          changePercent: +0.89, 
          volume: '$320M',
          trend: [6.72, 6.74, 6.75, 6.76, 6.77, 6.775, 6.78],
          marketCap: '$9.8B'
        },
      ];
      
      setMarketData(stocks);
      setCryptoData(crypto);
      setIsLoading(false);
    }, 1500);
    
    // Simulate real-time updates
    const interval = setInterval(() => {
      setMarketData(prevData => prevData.map(item => {
        const change = (Math.random() - 0.5) * 2;
        const newPrice = item.price + change;
        const newChange = item.change + change;
        const newChangePercent = (newChange / (item.price - item.change)) * 100;
        const newTrend = [...item.trend.slice(1), newPrice];
        
        return {
          ...item,
          price: parseFloat(newPrice.toFixed(2)),
          change: parseFloat(newChange.toFixed(2)),
          changePercent: parseFloat(newChangePercent.toFixed(2)),
          trend: newTrend
        };
      }));
      
      setCryptoData(prevData => prevData.map(item => {
        const change = (Math.random() - 0.5) * (item.price > 100 ? 50 : 0.1);
        const newPrice = item.price + change;
        const newChange = item.change + change;
        const newChangePercent = (newChange / (item.price - item.change)) * 100;
        const newTrend = [...item.trend.slice(1), newPrice];
        
        return {
          ...item,
          price: parseFloat(newPrice.toFixed(item.price > 10 ? 2 : 4)),
          change: parseFloat(newChange.toFixed(4)),
          changePercent: parseFloat(newChangePercent.toFixed(2)),
          trend: newTrend
        };
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  // Render trend sparkline
  const renderTrend = (trend, isPositive) => {
    const max = Math.max(...trend);
    const min = Math.min(...trend);
    const range = max - min || 1;
    
    return (
      <div className="h-10 w-24">
        <svg viewBox="0 0 100 40" className="w-full h-full">
          <polyline 
            fill="none" 
            stroke={isPositive ? "#22c55e" : "#ef4444"} 
            strokeWidth="2" 
            points={
              trend.map((val, i) => {
                const x = (i / (trend.length - 1)) * 100;
                const y = 40 - ((val - min) / range) * 35;
                return `${x},${y}`;
              }).join(' ')
            } 
          />
        </svg>
      </div>
    );
  };

  // Current data based on active tab
  const currentData = activeTab === 'crypto' ? cryptoData : marketData;
  
  // Format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-50 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-1">
              Market Dashboard
            </h1>
            <p className="text-gray-600">
              Real-time market data for stocks and cryptocurrencies
            </p>
          </div>
          
          <div className="mt-4 sm:mt-0 flex items-center">
            <div className="mr-4">
              <div className="flex space-x-3 mt-1">
                <div className="text-sm bg-white px-3 py-2 rounded-lg shadow-sm border border-red-100">
                  <span className="font-medium text-gray-900">S&P 500: </span>
                  <span className={marketSummary.sp500?.change >= 0 ? 'text-green-600' : 'text-red-500'}>
                    {marketSummary.sp500?.value ? formatNumber(marketSummary.sp500.value) : 'Loading...'} 
                    {marketSummary.sp500?.change !== undefined && (
                      marketSummary.sp500.change >= 0 ? ' ↑' : ' ↓'
                    )}
                  </span>
                </div>
                <div className="text-sm bg-white px-3 py-2 rounded-lg shadow-sm border border-red-100">
                  <span className="font-medium text-gray-900">DOW: </span>
                  <span className={marketSummary.dow?.change >= 0 ? 'text-green-600' : 'text-red-500'}>
                    {marketSummary.dow?.value ? formatNumber(marketSummary.dow.value) : 'Loading...'} 
                    {marketSummary.dow?.change !== undefined && (
                      marketSummary.dow.change >= 0 ? ' ↑' : ' ↓'
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-sm px-3 py-2 border border-red-100">
              <span className="text-sm text-gray-500">Live</span>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse mr-1"></div>
                <span className="text-sm font-medium">Real-time</span>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Market Sentiment */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6"
        >
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-4 text-white shadow-lg">
            <div className="text-sm opacity-90">Fear & Greed Index</div>
            <div className="text-2xl font-bold mt-1">Fear</div>
            <div className="text-3xl font-bold mt-2">34</div>
            <div className="h-2 bg-red-400 rounded-full mt-3">
              <div className="h-2 bg-white rounded-full" style={{ width: '34%' }}></div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg border border-red-100">
            <div className="text-sm text-gray-500">VIX Volatility</div>
            <div className="text-2xl font-bold mt-1 text-gray-900">
              {marketSummary.vix || '19.45'}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="text-green-600">-2.1%</span> from yesterday
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-4 shadow-lg border border-red-100">
            <div className="text-sm text-gray-500">Total Market Cap</div>
            <div className="text-2xl font-bold mt-1 text-gray-900">
              $108.42T
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <span className="text-green-600">+1.4%</span> today
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-xl p-4 text-white shadow-lg">
            <div className="text-sm opacity-90">Crypto Market Cap</div>
            <div className="text-2xl font-bold mt-1">$2.48T</div>
            <div className="mt-2 text-sm opacity-90">
              <span className="text-green-300">+3.2%</span> in 24h
            </div>
          </div>
        </motion.div>
        
        {/* Tabs */}
        <div className="flex border-b border-red-100 mb-6">
          {['stocks', 'crypto', 'forex', 'commodities'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium text-sm capitalize relative ${
                activeTab === tab ? 'text-red-600' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="tabIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                  initial={false}
                  animate={{ transition: { duration: 0.3 } }}
                />
              )}
            </button>
          ))}
        </div>
        
        {/* Timeframe Selector */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {activeTab === 'crypto' ? 'Top Cryptocurrencies' : 'Top Market Movers'}
          </h2>
          <div className="flex bg-white rounded-lg shadow-sm p-1 border border-red-100">
            {['1h', '1d', '1w', '1m', '1y'].map((time) => (
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

        {/* Loading Skeleton */}
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map((id) => (
              <div key={id} className="bg-white rounded-xl shadow-md overflow-hidden border border-red-100 animate-pulse">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    </div>
                    <div className="bg-gray-200 rounded-full w-12 h-12"></div>
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-5 bg-gray-100 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-between">
                    <div className="h-6 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Market Cards */}
        {!isLoading && (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {currentData.map((item) => (
              <motion.div
                key={item.id}
                variants={item}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-red-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 flex items-center">
                        {item.symbol}
                        <span className="ml-2 text-sm font-normal text-gray-500">
                          {item.name}
                        </span>
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {activeTab === 'crypto' ? item.marketCap : item.sector}
                      </p>
                    </div>
                    <div className={`rounded-full p-2 ${activeTab === 'crypto' ? 'bg-purple-100' : 'bg-red-100'}`}>
                      <div className={`${activeTab === 'crypto' ? 'bg-purple-500' : 'bg-red-500'} w-10 h-10 rounded-full flex items-center justify-center`}>
                        <span className="text-white font-bold text-sm">
                          {item.symbol.charAt(0)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="flex justify-between items-end">
                      <p className="text-2xl font-bold text-gray-900">
                        {activeTab === 'crypto' ? '$' : ''}
                        {item.price.toFixed(activeTab === 'crypto' && item.price < 1 ? 4 : 2)}
                        {activeTab === 'crypto' && item.price > 1000 && 
                          <span className="text-sm text-gray-500"> USD</span>
                        }
                      </p>
                      {renderTrend(item.trend, item.change >= 0)}
                    </div>
                    
                    <div className={`flex items-center mt-2 ${item.change >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                      <span className="font-medium">
                        {item.change >= 0 ? '↑' : '↓'} 
                        {activeTab === 'crypto' ? '$' : ''}
                        {Math.abs(item.change).toFixed(activeTab === 'crypto' && item.change < 1 ? 4 : 2)}
                      </span>
                      <span className="ml-2 bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs font-medium">
                        {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-500">Open</span>
                        <span className="font-medium">
                          {activeTab === 'crypto' ? '$' : ''}
                          {item.open.toFixed(activeTab === 'crypto' && item.open < 1 ? 4 : 2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-500">High</span>
                        <span className="font-medium">
                          {activeTab === 'crypto' ? '$' : ''}
                          {item.high.toFixed(activeTab === 'crypto' && item.high < 1 ? 4 : 2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-500">Low</span>
                        <span className="font-medium">
                          {activeTab === 'crypto' ? '$' : ''}
                          {item.low.toFixed(activeTab === 'crypto' && item.low < 1 ? 4 : 2)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-gray-100 pb-1">
                        <span className="text-gray-500">
                          {activeTab === 'crypto' ? 'Volume' : 'Volume'}
                        </span>
                        <span className="font-medium">{item.volume}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-3 bg-gradient-to-r from-red-50 to-white border-t border-red-100">
                  <div className="flex justify-between">
                    <button className="text-red-600 hover:text-red-800 font-medium text-sm flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Details
                    </button>
                    <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm font-medium transition-all flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {activeTab === 'crypto' ? 'Buy' : 'Trade'}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Market Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-white rounded-2xl shadow-xl p-6 border border-red-100"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              {activeTab === 'crypto' ? 'Crypto Market Overview' : 'Market Overview'}
            </h2>
            <div className="flex space-x-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder={activeTab === 'crypto' ? "Search cryptocurrencies..." : "Search stocks..."}
                  className="border border-red-200 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-red-300 text-sm"
                />
                <svg
                  className="w-4 h-4 text-red-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <button className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
                </svg>
                Filter
              </button>
            </div>
          </div>
          
          <div className="h-80 bg-gradient-to-r from-red-50 to-white rounded-xl border border-red-200 flex items-center justify-center flex-col">
            <div className="text-center p-6">
              <div className="text-red-400 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700">
                {activeTab === 'crypto' ? 'Cryptocurrency Market Trends' : 'Stock Market Trends'}
              </h3>
              <p className="text-gray-500 max-w-md mt-2">
                {activeTab === 'crypto' 
                  ? "Interactive chart showing cryptocurrency market trends, trading volume, and market dominance."
                  : "Interactive chart showing market trends, sector performance, and technical indicators."
                }
              </p>
            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center text-gray-500 text-sm"
        >
          <p>Market data updates every 5 seconds • Data provided by Financial Data API</p>
          <p className="mt-2">© 2023 Market Dashboard. All rights reserved.</p>
        </motion.div>
      </div>
    </div>
  );
};

export default MarketData;