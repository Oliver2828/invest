// === src/components/fixed-income/ProductsSection.jsx ===
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Calendar, DollarSign, CheckCircle, ArrowRight } from 'lucide-react';

const benefits = [
  {
    icon: <Lock size={32} className="text-red-500" />,
    title: "Capital Preservation",
    description: "Protect your principal investment with low-risk instruments",
  },
  {
    icon: <Calendar size={32} className="text-red-500" />,
    title: "Predictable Income",
    description: "Regular interest payments on a fixed schedule",
  },
  {
    icon: <CheckCircle size={32} className="text-red-500" />,
    title: "Portfolio Stability",
    description: "Reduce overall volatility during market fluctuations",
  },
  {
    icon: <DollarSign size={32} className="text-red-500" />,
    title: "Diversification",
    description: "Balance risk across different asset classes",
  },
];

const products = [
  {
    title: "Treasury Bonds",
    yield: "5.2-6.8%",
    duration: "1-10 yrs",
    min: "$1,000",
    features: ["Government backed", "Tax advantages", "Low risk"],
    color: "from-red-700 to-red-800",
  },
  {
    title: "Corporate Bonds",
    yield: "6.5-8.2%",
    duration: "2-15 yrs",
    min: "$5,000",
    features: ["Higher yields", "Diverse sectors", "Monthly income"],
    color: "from-amber-700 to-amber-800",
  },
  {
    title: "Municipal Bonds",
    yield: "4.5-5.8%",
    duration: "1-30 yrs",
    min: "$5,000",
    features: ["Tax-exempt income", "Public projects", "Stable returns"],
    color: "from-emerald-700 to-emerald-800",
  },
  {
    title: "Certificates of Deposit",
    yield: "4.0-5.5%",
    duration: "3m-5 yrs",
    min: "$500",
    features: ["FDIC insured", "Flexible terms", "Predictable growth"],
    color: "from-blue-700 to-blue-800",
  },
];

const sectionVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
};

const ProductsSection = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-6">
      {/* Benefits */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <motion.h2 variants={sectionVariant} custom={0} className="text-3xl md:text-4xl font-bold mb-2">
          Why Choose Fixed Income?
        </motion.h2>
        <motion.div variants={sectionVariant} custom={1} className="w-20 h-1 bg-red-600 mx-auto mb-4" />
        <motion.p variants={sectionVariant} custom={2} className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stability, predictable cash flow, and low volatility make fixed income a cornerstone of diversified portfolios.
        </motion.p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-20">
        {benefits.map((b, i) => (
          <motion.div
            key={b.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariant}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="mb-4">{b.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{b.title}</h3>
            <p className="text-gray-600">{b.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Products */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <motion.h2 variants={sectionVariant} custom={0} className="text-3xl md:text-4xl font-bold mb-2">
          Our Fixed Income Products
        </motion.h2>
        <motion.div variants={sectionVariant} custom={1} className="w-20 h-1 bg-red-600 mx-auto mb-4" />
        <motion.p variants={sectionVariant} custom={2} className="text-lg text-gray-600 max-w-2xl mx-auto">
          Choose from government, corporate, municipal bonds and CDs to match your goals.
        </motion.p>
      </motion.div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariant}
            whileHover={{ y: -8 }}
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <div className={`h-2 bg-gradient-to-r ${p.color}`} />
            <div className="p-6 flex flex-col h-full">
              <h3 className="text-2xl font-bold mb-4">{p.title}</h3>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-500">Avg. Yield</div>
                  <div className="text-lg font-semibold text-red-600">{p.yield}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Duration</div>
                  <div className="text-lg font-semibold">{p.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Min. Invest</div>
                  <div className="text-lg font-semibold">{p.min}</div>
                </div>
              </div>

              <ul className="space-y-2 mb-6 flex-1">
                {p.features.map((feat) => (
                  <li key={feat} className="flex items-start">
                    <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-1 mr-2" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-auto inline-flex items-center justify-center w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
              >
                View Details
                <ArrowRight size={18} className="ml-2" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ProductsSection;
