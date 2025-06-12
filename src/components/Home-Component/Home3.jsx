import React from "react";
import { motion } from "framer-motion";

const forexData = [
  { pair: "GBP / USD", flag1: "🇬🇧", flag2: "🇺🇸", change: "+0.00%", trend: "up" },
  { pair: "USD / JPY", flag1: "🇺🇸", flag2: "🇯🇵", change: "-0.01%", trend: "down" },
  { pair: "EUR / USD", flag1: "🇪🇺", flag2: "🇺🇸", change: "+0.07%", trend: "up" },
  { pair: "AUD / USD", flag1: "🇦🇺", flag2: "🇺🇸", change: "-0.04%", trend: "down" },
];

export default function Home3() {
  return (
    <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 text-white py-6 px-4 min-h-[500px]">
      <h2 className="text-center text-2xl font-semibold mb-4 max-w-4xl mx-auto">
        You don’t need to be an expert to build your Real Estate portfolio and digital wealth
      </h2>

      <div className="bg-white text-black rounded-xl p-6 mt-6 max-w-6xl mx-auto shadow-lg">
        {/* Tabs */}
        <div className="flex space-x-4 border-b mb-4">
          <button className="bg-red-600 text-white px-4 py-2 rounded-t">FOREX CFDS</button>
          <button className="text-gray-600 px-4 py-2">COMMODITIES CFDS</button>
          <button className="text-gray-600 px-4 py-2">INDICES CFDS</button>
          <button className="text-gray-600 px-4 py-2">SHARE CFDS</button>
        </div>

        {/* Left and Right Sections */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Text */}
          <div className="flex-1">
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Do you still have doubts? <br /> We can make it clear.
            </h3>
            <p className="text-sm text-gray-600">
              Investing in Real Estate can be intimidating, especially for beginners.
              Sometimes managing a Real Estate investment is daunting due to the
              uncertainty and volatility of the market, as well as the time investment
              needed to be successful.
            </p>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full mt-4">
              INVEST NOW
            </button>
          </div>

          {/* Right Table with motion */}
          <div className="flex-1">
            {forexData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.4 }}
                className="flex items-center justify-between py-3 border-b last:border-none"
              >
                {/* Currency pair and flags */}
                <span className="flex items-center gap-3 font-medium">
                  <span className="text-xl">{item.flag1}</span>
                  <span>{item.pair}</span>
                  <span className="text-xl">{item.flag2}</span>
                </span>

                {/* Change percentage */}
                <span className={`font-semibold ${item.change.includes("-") ? "text-red-500" : "text-green-600"}`}>
                  {item.change}
                </span>

                {/* Trend line */}
                <span>
                  <svg width="40" height="20">
                    <path
                      d={
                        item.trend === "up"
                          ? "M0,15 L10,10 L20,12 L30,8 L40,5"
                          : "M0,5 L10,10 L20,8 L30,12 L40,15"
                      }
                      stroke={item.trend === "up" ? "green" : "red"}
                      strokeWidth="2"
                      fill="none"
                    />
                  </svg>
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
