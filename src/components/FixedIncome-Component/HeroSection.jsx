// === src/components/fixed-income/HeroSection.jsx ===
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, HandCoins, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  // State for inputs
  const [amount, setAmount] = useState(10000);
  const [term, setTerm] = useState(5);
  const [yieldRate, setYieldRate] = useState(5.5);

  // Compute returns
  const totalReturn = useMemo(() => {
    return (amount * (1 + (yieldRate / 100) * term)).toFixed(2);
  }, [amount, term, yieldRate]);

  const totalInterest = useMemo(() => {
    return (totalReturn - amount).toFixed(2);
  }, [amount, totalReturn]);

  return (
    <section className="relative bg-[url(./assets/tab.jpg)] bg-no-repeat bg-center bg-cover text-white overflow-hidden">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-red-900/50" aria-hidden="true" />
      
      {/* Subtle texture */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-soft-light" />

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-red-500/20 p-2 rounded-lg mr-3">
                <HandCoins size={28} className="text-red-300" />
              </div>
              <span className="text-red-300 font-semibold uppercase tracking-widest text-sm">
                Fixed Income Solutions
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Stable Returns, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-300 to-red-100">
                Predictable Income
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg">
              Secure your future with diversified fixed-income investments. Earn consistent returns while safeguarding your capital.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 bg-red-500 text-gray-900 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-red-400 transition group"
              >
                Explore Investments
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border-2 border-red-400 text-amber-100 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-lg hover:bg-red-400/10 transition"
              >
                Schedule Consultation
              </motion.button>
            </div>
            
           
            
          </motion.div>

          {/* Calculator card - Enhanced for better contrast */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="backdrop-blur-md bg-gray-900/70 rounded-2xl p-6 md:p-8 border border-red-500/30 hover:shadow-xl transition-shadow shadow-2xl shadow-red-900/30"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center bg-gradient-to-br from-red-500 to-red-700 w-14 h-14 rounded-full mb-3">
                <BarChart size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1 text-red-100">Fixed Income Calculator</h3>
              <p className="text-red-300/80 text-sm">Project your returns instantly</p>
            </div>
            
            <form className="space-y-5">
              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-red-200 mb-1 text-sm">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-400">
                    $
                  </span>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-gray-800/60 border border-red-500/40 rounded-lg px-12 py-3 text-white placeholder-red-400/50 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
                  />
                </div>
              </div>

              {/* Term */}
              <div>
                <label htmlFor="term" className="block text-red-200 mb-1 text-sm">
                  Investment Term
                </label>
                <select
                  id="term"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full bg-gray-800/60 border border-red-500/40 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500 transition appearance-none"
                >
                  {[1, 3, 5, 10].map((yrs) => (
                    <option key={yrs} value={yrs} className="bg-gray-900">
                      {yrs} {yrs > 1 ? 'Years' : 'Year'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Yield slider */}
              <div>
                <label htmlFor="yield" className="block text-red-200 mb-1 text-sm">
                  Estimated Yield: <span className="font-bold text-red-300">{yieldRate}%</span>
                </label>
                <div className="flex items-center">
                  <input
                    id="yield"
                    type="range"
                    min="3"
                    max="10"
                    step="0.1"
                    value={yieldRate}
                    onChange={(e) => setYieldRate(Number(e.target.value))}
                    className="w-full h-2 bg-gradient-to-r from-gray-700 via-red-600 to-red-400 rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-amber-300 transition"
                  />
                </div>
                <div className="flex justify-between text-xs text-red-400/80 mt-1">
                  <span>3%</span>
                  <span>10%</span>
                </div>
              </div>
            </form>

            {/* Results */}
            <div className="mt-6 pt-4 border-t border-amber-500/30 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-red-200">Estimated Return</span>
                <span className="text-xl font-bold text-white">${Number(totalReturn).toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-200">Total Interest</span>
                <span className="text-xl font-bold text-red-300">
                  ${Number(totalInterest).toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;