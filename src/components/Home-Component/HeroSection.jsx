// === src/components/HeroSection.jsx ===
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from "react-i18next";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { FiArrowUpRight, FiArrowDownRight, FiRefreshCw } from 'react-icons/fi';
// import InvestorAlert from './InvestorAlerts'

// CORS proxy URL - replace with your own if needed
const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const BINANCE_API = "https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1h&limit=24";
const WS_URL = "wss://stream.binance.com:9443/ws/btcusdt@trade";

// Mock data fallback
const mockBtcData = [
  { time: '00:00', price: 62000 },
  { time: '04:00', price: 62500 },
  { time: '08:00', price: 61800 },
  { time: '12:00', price: 62200 },
  { time: '16:00', price: 62800 },
  { time: '20:00', price: 63200 },
  { time: '23:00', price: 63000 },
];

const useBinanceData = () => {
  const [btcData, setBtcData] = useState([]);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChange, setPriceChange] = useState({ value: 0, percentage: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useMockData, setUseMockData] = useState(false);
  const ws = useRef(null);
  const reconnectAttempts = useRef(0);

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(CORS_PROXY + BINANCE_API);
      const data = await response.json();
      
      const formattedData = data.map(item => ({
        time: new Date(item[0]).getHours() + ':00',
        price: parseFloat(item[4]),
        open: parseFloat(item[1]),
        high: parseFloat(item[2]),
        low: parseFloat(item[3]),
      }));
      
      setBtcData(formattedData);
      
      if (formattedData.length > 1) {
        const firstPrice = formattedData[0].price;
        const lastPrice = formattedData[formattedData.length - 1].price;
        const changeValue = lastPrice - firstPrice;
        const changePercentage = (changeValue / firstPrice) * 100;
        
        setPriceChange({
          value: changeValue,
          percentage: changePercentage
        });
        
        setCurrentPrice(lastPrice);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching historical data:", err);
      setError(err);
      setIsLoading(false);
      setUseMockData(true);
      setBtcData(mockBtcData);
      setCurrentPrice(63000);
      setPriceChange({
        value: 1000,
        percentage: 1.62
      });
    }
  };

  const setupWebSocket = () => {
    if (ws.current) {
      ws.current.close();
    }

    ws.current = new WebSocket(WS_URL);
    
    ws.current.onopen = () => {
      console.log("WebSocket connected");
      reconnectAttempts.current = 0;
    };
    
    ws.current.onmessage = (event) => {
      const tradeData = JSON.parse(event.data);
      const price = parseFloat(tradeData.p);
      
      setCurrentPrice(price);
      
      setBtcData(prev => {
        if (prev.length === 0) return prev;
        
        const newData = [...prev];
        const lastIndex = newData.length - 1;
        
        newData[lastIndex] = {
          ...newData[lastIndex],
          price: price,
          high: Math.max(newData[lastIndex].high, price),
          low: Math.min(newData[lastIndex].low, price)
        };
        
        return newData;
      });
    };

    ws.current.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    ws.current.onclose = (e) => {
      console.log("WebSocket closed. Reconnecting...");
      if (reconnectAttempts.current < 5) {
        setTimeout(() => {
          reconnectAttempts.current += 1;
          setupWebSocket();
        }, 3000 * reconnectAttempts.current);
      }
    };
  };

  useEffect(() => {
    fetchHistoricalData();
    setupWebSocket();

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  return { btcData, currentPrice, priceChange, isLoading, error, useMockData };
};

function HeroSection() {
  const [activeTab, setActiveTab] = useState('btc');
  const [timeframe, setTimeframe] = useState('24h');
  const { btcData, currentPrice, priceChange, isLoading, useMockData } = useBinanceData();

  const tradesData = [
    { id: 1, asset: 'BTC', type: 'Buy', amount: 0.5, value: currentPrice ? (0.5 * currentPrice).toFixed(2) : '0', time: '10:30 AM' },
    { id: 2, asset: 'ETH', type: 'Sell', amount: 2.1, value: '6500', time: '11:15 AM' },
    { id: 3, asset: 'AAPL', type: 'Buy', amount: 10, value: '18200', time: '11:45 AM' },
    { id: 4, asset: 'TSLA', type: 'Sell', amount: 5, value: '12500', time: '12:30 PM' },
    { id: 5, asset: 'SOL', type: 'Buy', amount: 25, value: '7500', time: '1:15 PM' },
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

  const priceChangeColor = priceChange.percentage >= 0 ? 'text-green-400' : 'text-red-400';
  const priceChangeIcon = priceChange.percentage >= 0 ? 
    <FiArrowUpRight className="inline" /> : 
    <FiArrowDownRight className="inline" />;

  return (
    <div className="bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen text-white"> {/* Updated background gradient */}
      <div className="container mx-auto px-4 py-12">
        {/* <InvestorAlert /> */}
        {/* Market Indices Ticker */}
        <motion.div 
          className="bg-gradient-to-r from-red-900/50 to-red-800/50 rounded-xl p-4 mb-8 overflow-hidden"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-between">
            {marketIndices.map((index, i) => (
              <motion.div 
                key={index.name}
                className="flex items-center m-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="font-bold mr-2">{index.name}:</span>
                <span className="mr-1">${index.value.toLocaleString()}</span>
                <span className={`${index.change.includes('+') ? 'text-green-400' : 'text-red-400'}`}>
                  {index.change}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-200">
                Smart Investments, <br />Brighter Future
              </h1>
              <p className="text-gray-300 mb-8 text-lg max-w-lg">
                Real-time market data, advanced trading tools, and personalized portfolio management - 
                all in one powerful platform.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-12">
                <motion.button
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 transition-all shadow-lg shadow-red-900/30"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Trading
                </motion.button>
                <motion.button
                  className="px-6 py-3 rounded-lg border border-red-700 text-red-300 hover:bg-red-900/50 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Markets
                </motion.button>
              </div>
            </motion.div>

            {/* Live Trades Section */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-red-300">Recent Trades</h2>
                <span className="text-green-400 text-sm flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  LIVE
                </span>
              </div>
              
              <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                {tradesData.map((trade) => (
                  <motion.div 
                    key={trade.id}
                    className={`p-3 rounded-lg flex justify-between items-center ${
                      trade.type === 'Buy' 
                        ? 'bg-green-900/20 border-l-4 border-green-500' 
                        : 'bg-red-900/20 border-l-4 border-red-500'
                    }`}
                    variants={item}
                    initial="hidden"
                    animate="show"
                  >
                    <div>
                      <div className="font-bold">{trade.asset}</div>
                      <div className="text-sm text-gray-400">{trade.time}</div>
                    </div>
                    <div className="text-right">
                      <div className={`font-bold ${trade.type === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>
                        {trade.type} {trade.amount}
                      </div>
                      <div className="text-sm">${trade.value}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div>
            {/* Chart Tabs */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
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
                          ? 'bg-red-700 text-white'
                          : 'bg-gray-700/50 text-gray-300 hover:bg-gray-700'
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
                      className={`px-3 py-1 rounded text-xs ${
                        timeframe === time
                          ? 'bg-red-800 text-white'
                          : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      }`}
                      onClick={() => setTimeframe(time)}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart */}
              <div className="h-80">
                {isLoading ? (
                  <div className="h-full flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#444" />
                      <XAxis dataKey="time" stroke="#999" />
                      <YAxis stroke="#999" domain={['auto', 'auto']} />
                      <Tooltip 
                        contentStyle={{ 
                          background: '#1f2937', 
                          borderColor: '#7f1d1d',
                          borderRadius: '8px'
                        }} 
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#ef4444" 
                        fillOpacity={1} 
                        fill="url(#colorPrice)" 
                        activeDot={{ r: 6, fill: '#dc2626' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
                {useMockData && (
                  <div className="absolute top-4 right-4 bg-yellow-500/90 text-black px-3 py-1 rounded-full text-xs font-bold">
                    Using Mock Data
                  </div>
                )}
              </div>
              
              {/* BTC Price Info */}
              <div className="flex justify-between items-center mt-4">
                <div>
                  <div className="text-2xl font-bold">
                    {currentPrice ? `$${currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 'Loading...'}
                  </div>
                  <div className="flex items-center">
                    <span className={`${priceChangeColor} mr-2`}>
                      {priceChangeIcon} {priceChange.percentage.toFixed(2)}%
                    </span>
                    <span className="text-gray-400 text-sm">24h change</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400">24h Volume</div>
                  <div className="font-bold">
                    $42.8B
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stocks Section */}
            <motion.div 
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700 mt-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-xl font-bold text-red-300 mb-4">Top Stocks</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-gray-400 text-sm">
                      <th className="pb-3">Symbol</th>
                      <th className="pb-3">Name</th>
                      <th className="pb-3 text-right">Price</th>
                      <th className="pb-3 text-right">Change</th>
                      <th className="pb-3 text-right">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stocksData.map((stock) => (
                      <tr key={stock.symbol} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                        <td className="py-3 font-bold">{stock.symbol}</td>
                        <td className="py-3 text-gray-300">{stock.name}</td>
                        <td className="py-3 text-right">${stock.price}</td>
                        <td className={`py-3 text-right ${
                          stock.change.includes('+') ? 'text-green-400' : 'text-red-400'
                        }`}>
                          {stock.change}
                        </td>
                        <td className="py-3 text-right text-gray-400">{stock.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Market Overview */}
        <motion.div 
          className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-red-200">
            Market Overview
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Crypto Market Cap */}
            <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 p-5 rounded-xl border border-red-900/50">
              <div className="text-lg font-bold mb-2">Crypto Market Cap</div>
              <div className="text-3xl font-bold mb-1">$2.38T</div>
              <div className="flex items-center text-green-400">
                <span>+1.82%</span>
                <span className="ml-2 text-sm text-gray-300">24h change</span>
              </div>
              <ResponsiveContainer width="100%" height={100}>
                <AreaChart data={btcData}>
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#ef4444" 
                    fill="url(#colorPrice)" 
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Fear & Greed Index */}
            <div className="bg-gradient-to-br from-amber-900/30 to-amber-800/30 p-5 rounded-xl border border-amber-900/50">
              <div className="text-lg font-bold mb-2">Fear & Greed Index</div>
              <div className="flex items-end mb-2">
                <div className="text-3xl font-bold text-amber-400 mr-2">74</div>
                <div className="text-amber-400 font-medium">Greed</div>
              </div>
              <div className="w-full bg-gray-700 h-3 rounded-full mb-1">
                <div 
                  className="bg-gradient-to-r from-green-500 via-amber-400 to-red-500 h-3 rounded-full" 
                  style={{ width: '74%' }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>Extreme Fear</span>
                <span>Neutral</span>
                <span>Extreme Greed</span>
              </div>
            </div>
            
            {/* Top Gainers */}
            <div className="bg-gradient-to-br from-emerald-900/30 to-emerald-800/30 p-5 rounded-xl border border-emerald-900/50">
              <div className="text-lg font-bold mb-2">Top Gainers</div>
              <div className="space-y-3">
                {stocksData.filter(s => s.change.includes('+')).slice(0, 3).map(stock => (
                  <div key={stock.symbol} className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{stock.symbol}</div>
                      <div className="text-sm text-gray-300">{stock.name}</div>
                    </div>
                    <div className="text-green-400 font-bold">{stock.change}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default HeroSection;