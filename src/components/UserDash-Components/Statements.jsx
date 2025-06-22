import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiDownload, 
  FiPrinter, 
  FiFilter, 
  FiCalendar, 
  FiBarChart2,
  FiPieChart,
  FiDollarSign,
  FiTrendingUp,
  FiFileText
} from 'react-icons/fi';

const Statements = () => {
  const [activeTab, setActiveTab] = useState('account');
  const [dateRange, setDateRange] = useState('last30');
  const [showFilter, setShowFilter] = useState(false);
  
  const statements = [
    { id: 1, type: 'account', date: 'June 2023', period: 'Jun 1 - Jun 30, 2023', amount: 42689.50, growth: 12.4 },
    { id: 2, type: 'account', date: 'May 2023', period: 'May 1 - May 31, 2023', amount: 38245.20, growth: 8.2 },
    { id: 3, type: 'account', date: 'April 2023', period: 'Apr 1 - Apr 30, 2023', amount: 35210.75, growth: 5.7 },
    { id: 4, type: 'tax', date: 'Q1 2023', period: 'Jan 1 - Mar 31, 2023', amount: 105630.25, growth: 18.3 },
    { id: 5, type: 'transaction', date: 'June 2023', period: 'Jun 1 - Jun 30, 2023', amount: 15, transactions: 42 },
  ];

  const filteredStatements = statements.filter(statement => 
    statement.type === activeTab && 
    (dateRange === 'all' || 
     (dateRange === 'last30' && statement.id <= 3) || 
     (dateRange === 'last90' && statement.id <= 4))
  );

  const accountSummary = {
    totalValue: 42689.50,
    monthlyGrowth: 12.4,
    assets: [
      { name: 'Tech Stocks', value: 18000, color: 'bg-red-500' },
      { name: 'Green Energy', value: 12000, color: 'bg-green-500' },
      { name: 'Real Estate', value: 8000, color: 'bg-blue-500' },
      { name: 'Bonds', value: 4689.50, color: 'bg-amber-500' },
    ],
    transactions: [
      { id: 1, date: 'Jun 15, 2023', description: 'Tech Growth Fund Investment', amount: -2500.00 },
      { id: 2, date: 'Jun 10, 2023', description: 'Monthly Deposit', amount: 1500.00 },
      { id: 3, date: 'Jun 5, 2023', description: 'Dividend Payment', amount: 245.75 },
      { id: 4, date: 'Jun 2, 2023', description: 'Green Energy ETF Investment', amount: -3200.00 },
    ]
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };

  const formatPercentage = (value) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-8">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Account Statements
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            View and download your account statements and reports
          </motion.p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Summary Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white p-6"
          >
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0 text-center md:text-left">
                <h2 className="text-2xl font-bold mb-2">Portfolio Summary</h2>
                <p className="text-red-100">As of June 30, 2023</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center">
                <div className="text-center mb-4 sm:mb-0 sm:mr-8">
                  <p className="text-sm text-red-200">Total Value</p>
                  <p className="text-2xl font-bold">{formatCurrency(accountSummary.totalValue)}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-red-200">Monthly Growth</p>
                  <div className="flex items-center justify-center text-green-300">
                    <FiTrendingUp className="mr-1" />
                    <span className="text-xl font-bold">{formatPercentage(accountSummary.monthlyGrowth)}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="p-6">
            {/* Tabs and Filters */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <div className="flex border-b border-gray-200 mb-4 md:mb-0">
                {[
                  { id: 'account', label: 'Account Statements' },
                  // { id: 'tax', label: 'Tax Documents' },
                  // { id: 'transaction', label: 'Transaction History' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    className={`px-4 py-3 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'text-red-600 border-b-2 border-red-600'
                        : 'text-gray-600 hover:text-red-500'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center bg-white border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <FiFilter className="mr-2" />
                  Filter
                </motion.button>
                
                {showFilter && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10"
                  >
                    <div className="p-3 border-b border-gray-200">
                      <p className="font-medium text-gray-900">Date Range</p>
                    </div>
                    <div className="p-2">
                      {[
                        { id: 'last30', label: 'Last 30 days' },
                        { id: 'last90', label: 'Last 90 days' },
                        { id: 'ytd', label: 'Year to Date' },
                        { id: 'all', label: 'All Time' }
                      ].map(range => (
                        <label key={range.id} className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer">
                          <input
                            type="radio"
                            name="dateRange"
                            className="mr-2 text-red-600 focus:ring-red-500"
                            checked={dateRange === range.id}
                            onChange={() => setDateRange(range.id)}
                          />
                          <span className="text-sm text-gray-700">{range.label}</span>
                        </label>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>

            {/* Charts Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8"
            >
              <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <FiPieChart />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Asset Allocation</h3>
                </div>
                
                <div className="flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    {/* Pie chart representation */}
                    <div className="absolute inset-0 rounded-full border-[16px] border-red-500"></div>
                    <div className="absolute inset-0 rounded-full border-[16px] border-green-500 transform rotate-90"></div>
                    <div className="absolute inset-0 rounded-full border-[16px] border-blue-500 transform rotate-180"></div>
                    <div className="absolute inset-0 rounded-full border-[16px] border-amber-500 transform rotate-270"></div>
                    
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-xl font-bold text-gray-800">$42.6K</span>
                      <span className="text-sm text-gray-500">Total Value</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 space-y-2">
                  {accountSummary.assets.map((asset, index) => (
                    <div key={index} className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${asset.color}`}></div>
                      <span className="text-sm text-gray-700 flex-1">{asset.name}</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(asset.value)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <FiBarChart2 />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Portfolio Growth</h3>
                </div>
                
                <div className="flex items-end h-48 mb-4">
                  {/* Bar chart representation */}
                  <div className="flex items-end w-full space-x-2">
                    {[40, 65, 80, 75, 90, 110].map((value, index) => (
                      <div 
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <motion.div 
                          initial={{ height: 0 }}
                          animate={{ height: `${value}px` }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t"
                        ></motion.div>
                        <span className="text-xs text-gray-500 mt-1">{['J', 'F', 'M', 'A', 'M', 'J'][index]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <div className="flex items-center text-green-600">
                    <FiTrendingUp className="mr-1" />
                    <span className="font-medium">+12.4% growth this month</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                    <FiFileText />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">Recent Transactions</h3>
                </div>
                
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {accountSummary.transactions.map(tx => (
                    <div key={tx.id} className="flex justify-between items-center py-2 border-b border-red-50 last:border-0">
                      <div>
                        <p className="font-medium text-gray-800">{tx.description}</p>
                        <p className="text-xs text-gray-500">{tx.date}</p>
                      </div>
                      <div className={`font-medium ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {tx.amount > 0 ? '+' : ''}{formatCurrency(tx.amount)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Statements List */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-900">Available Statements</h3>
                <p className="text-sm text-gray-600">{filteredStatements.length} documents</p>
              </div>
              
              {filteredStatements.length > 0 ? (
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 font-medium text-gray-700">
                    <div className="col-span-4">Period</div>
                    <div className="col-span-3">Date</div>
                    <div className="col-span-3">Amount</div>
                    <div className="col-span-2 text-right">Actions</div>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {filteredStatements.map(statement => (
                      <motion.div 
                        key={statement.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: statement.id * 0.05 }}
                        className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-gray-50"
                      >
                        <div className="col-span-4">
                          <p className="font-medium text-gray-900">{statement.period}</p>
                          <p className="text-sm text-gray-600 capitalize">{statement.type} statement</p>
                        </div>
                        <div className="col-span-3 flex items-center">
                          <FiCalendar className="text-gray-500 mr-2" />
                          <span className="text-gray-700">{statement.date}</span>
                        </div>
                        <div className="col-span-3">
                          {statement.type === 'transaction' ? (
                            <div>
                              <p className="text-gray-900">{statement.transactions} transactions</p>
                              <p className="text-sm text-gray-600">Total activity</p>
                            </div>
                          ) : (
                            <div>
                              <p className="font-medium text-gray-900">{formatCurrency(statement.amount)}</p>
                              <div className="flex items-center text-green-600 text-sm">
                                <FiTrendingUp className="mr-1" />
                                <span>{formatPercentage(statement.growth)}</span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="col-span-2 flex justify-end space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
                            title="Download"
                          >
                            <FiDownload />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-10 h-10 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center"
                            title="Print"
                          >
                            <FiPrinter />
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-12 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                    <FiFileText className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">No statements available</h4>
                  <p className="text-gray-600 max-w-md mx-auto mb-6">
                    There are no statements matching your current filters. Try selecting a different date range.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg"
                    onClick={() => setDateRange('all')}
                  >
                    View All Statements
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-600 mb-4 sm:mb-0">
                Statements are generated at the end of each period. For custom date ranges, contact support.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 px-6 rounded-lg font-medium flex items-center"
              >
                <FiDownload className="mr-2" />
                Download All Statements
              </motion.button>
            </div>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-gray-600"
        >
          © 2023 InvestNow. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Statements;