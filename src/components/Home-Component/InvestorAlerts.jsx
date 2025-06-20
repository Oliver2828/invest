import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faker } from '@faker-js/faker';

const InvestorAlerts = () => {
  const [currentAlert, setCurrentAlert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(100);

  // Generate random investor data with USD only
  const generateAlert = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    const currency = 'USD';
    const symbol = '$';
    
    // Generate realistic amounts from $100 to $10,000
    const amount = faker.number.float({ 
      min: 100, 
      max: 10000, 
      precision: 0.01 
    });
    
    // Format amount with commas and 2 decimal places
    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const growth = faker.finance.amount(1, 15, 1) + '%';  // More realistic growth percentages
    
    // Randomly decide if it's an investment or withdrawal (25% withdrawal chance)
    const isWithdrawal = Math.random() < 0.25;
    
    // Generate financial instruments
    const instruments = ['Stocks', 'ETF', 'Crypto', 'Bonds', 'Mutual Funds'];
    const instrument = instruments[Math.floor(Math.random() * instruments.length)];
    
    // Generate specific assets
    const assets = {
      Stocks: ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'NVDA', 'META', 'NFLX'],
      ETF: ['SPY', 'VOO', 'QQQ', 'ARKK', 'VTI', 'IVV'],
      Crypto: ['BTC', 'ETH', 'SOL', 'XRP', 'ADA', 'DOGE'],
      Bonds: ['Corporate Bond', 'Municipal Bond', 'Treasury Bond'],
      'Mutual Funds': ['VTSAX', 'VFIAX', 'FBGRX', 'FMAGX']
    };
    
    const asset = assets[instrument][Math.floor(Math.random() * assets[instrument].length)];
    
    return {
      name: `${firstName} ${lastName}`,
      amount: `${symbol}${formattedAmount}`,
      currency: currency,
      time: `${time} Today`,
      growth: growth,
      location: `${faker.location.city()}, ${faker.location.country()}`,
      avatar: `https://i.pravatar.cc/100?u=${firstName}${lastName}`,
      type: isWithdrawal ? 'withdrawal' : 'investment',
      instrument: instrument,
      asset: asset,
      id: faker.string.uuid()
    };
  };

  useEffect(() => {
    // Initial delay
    const initialTimeout = setTimeout(() => {
      setCurrentAlert(generateAlert());
      setIsVisible(true);
      setProgress(100);
    }, 3000);

    let interval;
    let progressInterval;

    const startAlertCycle = () => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentAlert(generateAlert());
        setIsVisible(true);
        setProgress(100);
        
        // Start progress bar
        progressInterval = setInterval(() => {
          setProgress(prev => Math.max(prev - 1, 0));
        }, 50);
        
      }, 500);
    };

    interval = setInterval(startAlertCycle, 5000 + Math.random() * 2000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, []);

  if (!currentAlert) return null;

  // Determine styling based on alert type
  const isWithdrawal = currentAlert.type === 'withdrawal';
  const headerColor = isWithdrawal ? 'text-red-400' : 'text-green-400';
  const headerText = isWithdrawal ? 'WITHDRAWAL PROCESSED' : 'NEW INVESTMENT';
  const borderColor = isWithdrawal ? 'border-red-700' : 'border-green-700';
  const iconBg = isWithdrawal ? 'bg-red-500' : 'bg-green-500';
  const amountColor = isWithdrawal ? 'text-red-300' : 'text-white';
  const bgGradient = isWithdrawal 
    ? 'bg-gradient-to-r from-gray-800 to-red-900/20' 
    : 'bg-gradient-to-r from-gray-800 to-green-900/20';
  
  const icon = isWithdrawal ? (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={currentAlert.id}
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className={`${bgGradient} rounded-xl p-4 border ${borderColor} shadow-2xl shadow-gray-900/30 backdrop-blur-sm w-80 relative overflow-hidden`}>
            {/* Progress bar */}
            <motion.div 
              className={`absolute top-0 left-0 h-1 ${isWithdrawal ? 'bg-red-500' : 'bg-green-500'}`}
              initial={{ width: '100%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
            
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <img 
                    src={currentAlert.avatar} 
                    alt={currentAlert.name}
                    className="w-10 h-10 rounded-full border-2 border-white/20"
                  />
                  <div className={`absolute -bottom-1 -right-1 ${iconBg} rounded-full p-1 border-2 border-gray-800`}>
                    {icon}
                  </div>
                </div>
                <div>
                  <div className={`${headerColor} font-bold text-xs tracking-widest`}>
                    {headerText}
                  </div>
                  <div className="text-white font-bold">{currentAlert.name}</div>
                  <div className="text-xs text-gray-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {currentAlert.location}
                  </div>
                </div>
              </div>
              {/* <div className="bg-red-800/30 text-red-300 px-2 py-1 rounded text-xs flex items-center">
                <span className="flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                LIVE
              </div> */}
            </div>
            
            {/* Asset information */}
            {/* <div className="mt-3 flex items-center bg-black/20 p-2 rounded-lg border border-white/10">
              <div className="mr-3">
                <div className="text-gray-400 text-xs">Asset</div>
                <div className="text-white font-medium">{currentAlert.asset}</div>
              </div>
              <div className="border-l border-white/10 pl-3">
                <div className="text-gray-400 text-xs">Instrument</div>
                <div className="text-white font-medium">{currentAlert.instrument}</div>
              </div>
            </div> */}
            
            <div className="mt-3 flex justify-between items-end">
              <div>
                <div className="text-gray-400 text-xs">
                  {isWithdrawal ? 'Withdrawal Amount' : 'Investment Amount'}
                </div>
                <div className={`text-xl font-bold ${amountColor}`}>
                  {isWithdrawal ? '-' : ''}{currentAlert.amount}
                </div>
              </div>
              {!isWithdrawal && (
                <div className="text-right">
                  <div className="text-gray-400 text-xs">Portfolio Growth</div>
                  <div className="text-green-400 font-bold flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    +{currentAlert.growth}
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              {/* <div className="text-xs text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {currentAlert.time}
              </div> */}
              
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <motion.div 
                    key={i}
                    className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border-2 border-gray-800 -ml-2 flex items-center justify-center text-xs"
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.1 }}
                  >
                    {i === 4 ? (
                      <span className="text-gray-300">+3</span>
                    ) : (
                      <img 
                        src={`https://i.pravatar.cc/100?u=${faker.string.uuid()}`} 
                        alt="Investor"
                        className="rounded-full"
                      />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            {/* Close button */}
            <button 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-300 transition-colors"
              onClick={() => setIsVisible(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <motion.div 
            className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45 border-b border-r border-red-700/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InvestorAlerts;