import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faker } from '@faker-js/faker';

const InvestorAlerts = () => {
  const [currentAlert, setCurrentAlert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Generate random investor data with USD or EUR
  const generateInvestor = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    
    // Randomly choose between USD and EUR
    const currency = Math.random() > 0.5 ? 'USD' : 'EUR';
    const symbol = currency === 'USD' ? '$' : '€';
    
    // Generate amount between 50,000 and 2,000,000
    const amount = faker.number.float({ min: 50000, max: 2000000, precision: 0.01 });
    
    // Format amount with commas and 2 decimal places
    const formattedAmount = amount.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const growth = faker.finance.amount(5, 45, 1) + '%';
    
    return {
      name: `${firstName} ${lastName}`,
      amount: `${symbol}${formattedAmount}`,
      currency: currency,
      time: `${time} Today`,
      growth: growth,
      location: `${faker.location.city()}, ${currency === 'USD' ? 'USA' : 'Germany'}`,
      avatar: `https://i.pravatar.cc/100?u=${firstName}${lastName}`
    };
  };

  useEffect(() => {
    // Initial delay
    const initialTimeout = setTimeout(() => {
      setCurrentAlert(generateInvestor());
      setIsVisible(true);
    }, 3000);

    const interval = setInterval(() => {
      setIsVisible(false);
      
      setTimeout(() => {
        setCurrentAlert(generateInvestor());
        setIsVisible(true);
      }, 500);
    }, 5000 + Math.random() * 2000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  if (!currentAlert) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key={currentAlert.name + currentAlert.time}
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.8 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-4 border border-red-700/50 shadow-2xl shadow-red-900/30 backdrop-blur-sm w-80">
            <div className="flex justify-between items-start">
              <div className="flex items-center">
                <div className="relative mr-3">
                  <img 
                    src={currentAlert.avatar} 
                    alt={currentAlert.name}
                    className="w-10 h-10 rounded-full border-2 border-red-600"
                  />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-gray-800">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div>
                  <div className="text-green-400 font-bold text-sm">NEW INVESTMENT</div>
                  <div className="text-white font-bold">{currentAlert.name}</div>
                  <div className="text-xs text-gray-400">{currentAlert.location}</div>
                </div>
              </div>
              <div className="bg-red-800/30 text-red-300 px-2 py-1 rounded text-xs flex items-center">
                <span className="flex h-2 w-2 mr-1">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                LIVE
              </div>
            </div>
            
            <div className="mt-3 flex justify-between items-end">
              <div>
                <div className="text-gray-400 text-xs">Investment Amount</div>
                <div className="text-xl font-bold text-white">{currentAlert.amount}</div>
              </div>
              <div className="text-right">
                <div className="text-gray-400 text-xs">Portfolio Growth</div>
                <div className="text-green-400 font-bold">+{currentAlert.growth}</div>
              </div>
            </div>
            
            <div className="mt-3 flex justify-between items-center">
              <div className="text-xs text-gray-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {currentAlert.time}
              </div>
              
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-6 h-6 rounded-full bg-gradient-to-br from-red-700 to-red-900 border-2 border-gray-800 -ml-2 flex items-center justify-center text-xs">
                    {i === 4 ? (
                      <span className="text-gray-300">+3</span>
                    ) : (
                      <img 
                        src={`https://i.pravatar.cc/100?u=${faker.string.uuid()}`} 
                        alt="Investor"
                        className="rounded-full"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rotate-45 border-b border-r border-red-700/50"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InvestorAlerts;