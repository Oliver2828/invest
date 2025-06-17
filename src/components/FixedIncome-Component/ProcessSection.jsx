// === src/components/fixed-income/ProcessSection.jsx ===
import React from 'react';
import { motion } from 'framer-motion';

const ProcessSection = () => {
  const testimonials = [
    {
      quote: "The fixed income options helped me create a stable retirement income stream with minimal risk.",
      author: "Robert K.",
      role: "Retired Educator"
    },
    {
      quote: "I appreciate the transparency and competitive yields. It's become a core part of my investment strategy.",
      author: "Michelle T.",
      role: "Business Owner"
    },
    {
      quote: "As a conservative investor, the treasury bonds give me peace of mind while still providing solid returns.",
      author: "David P.",
      role: "Healthcare Professional"
    }
  ];

  return (
    <div className="bg-white">
      {/* How It Works */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">Getting Started is Simple</h2>
              <div className="w-24 h-1 bg-red-600 mx-auto mb-6" />
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Begin your fixed income investment journey in just a few easy steps
              </p>
            </motion.div>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between relative">
              {/* Vertical line */}
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
              {/* Step 1 */}
              <motion.div 
                className="relative mb-10 md:mb-0 md:w-5/12 flex flex-col items-end text-right"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl absolute right-0 top-0 md:right-[-24px] z-10">
                  1
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl shadow-md w-full">
                  <h3 className="text-xl font-bold mb-3">Create Your Account</h3>
                  <p className="text-gray-600 mb-4">
                    Sign up for an InvestNow account and complete our quick verification process.
                  </p>
                  <button className="text-red-600 font-semibold hover:underline">
                    Register Now
                  </button>
                </div>
              </motion.div>
              
              {/* Spacer for step 2 */}
              <div className="hidden md:block w-1/12"></div>
              
              {/* Step 2 */}
              <motion.div 
                className="relative mb-10 md:mb-0 md:w-5/12 flex flex-col items-start text-left"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl absolute left-0 top-0 md:left-[-24px] z-10">
                  2
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl shadow-md w-full">
                  <h3 className="text-xl font-bold mb-3">Select Investments</h3>
                  <p className="text-gray-600 mb-4">
                    Browse our fixed income products and choose those that match your financial goals.
                  </p>
                </div>
              </motion.div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row justify-between relative mt-10">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
              
              <motion.div 
                className="relative mb-10 md:mb-0 md:w-5/12 flex flex-col items-end text-right"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl absolute right-0 top-0 md:right-[-24px] z-10">
                  3
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl shadow-md w-full">
                  <h3 className="text-xl font-bold mb-3">Fund Your Account</h3>
                  <p className="text-gray-600 mb-4">
                    Transfer funds securely from your bank account to your InvestNow portfolio.
                  </p>
                </div>
              </motion.div>
              
              <div className="hidden md:block w-1/12"></div>
              
              {/* Step 4 */}
              <motion.div 
                className="relative md:w-5/12 flex flex-col items-start text-left"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
              >
                <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-xl absolute left-0 top-0 md:left-[-24px] z-10">
                  4
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl shadow-md w-full">
                  <h3 className="text-xl font-bold mb-3">Earn Regular Income</h3>
                  <p className="text-gray-600 mb-4">
                    Receive scheduled interest payments and watch your investment grow.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16 bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-4">What Investors Say</h2>
              <div className="w-24 h-1 bg-amber-400 mx-auto mb-6" />
              <p className="text-xl text-red-100 max-w-3xl mx-auto">
                Hear from our clients who have built wealth through fixed income investments
              </p>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-amber-300 mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
                    </svg>
                  ))}
                </div>
                <p className="text-lg italic mb-6">"{testimonial.quote}"</p>
                <div className="border-t border-white/20 pt-4">
                  <div className="font-bold">{testimonial.author}</div>
                  <div className="text-red-200">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-red-800 to-red-900 rounded-3xl p-12 text-center text-white shadow-2xl">
            <div className="max-w-3xl mx-auto">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Secure Your Financial Future?
                </h2>
                <p className="text-xl text-red-100 mb-8">
                  Join thousands of investors earning stable returns with our fixed income solutions
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-red-800 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:bg-red-50 transition-all"
                  >
                    Get Started Today
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                  >
                    Speak to an Advisor
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessSection;