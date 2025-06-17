// === src/components/fixed-income/HeroSection.jsx ===
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { BarChart, HandCoins } from 'lucide-react';

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
    <section className="relative bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white overflow-hidden">
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" aria-hidden="true" />

      <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center mb-4">
              <HandCoins size={28} className="text-red-200 mr-2" />
              <span className="text-red-200 font-semibold uppercase tracking-widest">
                Fixed Income Solutions
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
              Stable Returns, <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-amber-200">
                Predictable Income
              </span>
            </h1>
            <p className="text-lg md:text-xl text-red-100 mb-8 max-w-lg">
              Secure your future with diversified fixed-income investments. Earn consistent returns while safeguarding your capital.
            </p>
            <div className="flex flex-wrap gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white text-red-800 px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-lg shadow-lg hover:bg-red-50 transition"
              >
                Explore Investments
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition"
              >
                Schedule Consultation
              </motion.button>
            </div>
          </motion.div>

          {/* Calculator card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="backdrop-blur-sm bg-white/10 rounded-2xl p-6 md:p-8 border border-white/20 hover:shadow-xl transition-shadow"
          >
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center bg-red-600 w-14 h-14 rounded-full mb-3">
                <BarChart size={24} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-1">Fixed Income Calculator</h3>
              <p className="text-red-100 text-sm">Project your returns instantly</p>
            </div>
            
            <form className="space-y-5">
              {/* Amount */}
              <div>
                <label htmlFor="amount" className="block text-red-100 mb-1">
                  Investment Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-red-200">
                    $
                  </span>
                  <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-white/20 border border-white/30 rounded-lg px-12 py-3 text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-white transition"
                  />
                </div>
              </div>

              {/* Term */}
              <div>
                <label htmlFor="term" className="block text-red-100 mb-1">
                  Investment Term
                </label>
                <select
                  id="term"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                  className="w-full bg-white/20 border border-white/30 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-white transition appearance-none"
                >
                  {[1, 3, 5, 10].map((yrs) => (
                    <option key={yrs} value={yrs}>
                      {yrs} {yrs > 1 ? 'Years' : 'Year'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Yield slider */}
              <div>
                <label htmlFor="yield" className="block text-red-100 mb-1">
                  Estimated Yield
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
                    className="w-full h-2 bg-red-700 rounded-lg appearance-none cursor-pointer accent-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-300 transition"
                  />
                  <span className="ml-4 text-lg font-bold min-w-[50px]">
                    {yieldRate}%
                  </span>
                </div>
              </div>
            </form>

            {/* Results */}
            <div className="mt-6 pt-4 border-t border-white/20 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-red-100">Estimated Return</span>
                <span className="text-lg md:text-xl font-bold">${totalReturn}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-red-100">Total Interest</span>
                <span className="text-lg md:text-xl font-bold text-amber-300">
                  ${totalInterest}
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
