import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaChartLine, FaCoins, FaHandHoldingUsd, FaSearch, FaEllipsisV, FaArrowUp, FaArrowDown, FaGift, FaPlus, FaExchangeAlt } from 'react-icons/fa';

const Portfolio = () => {
  const [showValues, setShowValues] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const portfolioItems = [
    { 
      id: 1,
      title: 'Mutual Funds', 
      value: 1250000,
      change: 5.3,
      changeType: 'positive',
      currency: 'NGN',
      icon: <FaChartLine className="text-red-600" />,
      chartData: [30, 40, 35, 50, 45, 60, 55, 70, 65, 80, 75, 90]
    },
    { 
      id: 2,
      title: 'Trust Fund', 
      value: 875000,
      change: 2.1,
      changeType: 'positive',
      currency: 'NGN',
      icon: <FaHandHoldingUsd className="text-red-600" />,
      chartData: [40, 35, 45, 30, 50, 40, 60, 50, 70, 60, 80, 70]
    },
    { 
      id: 3,
      title: 'Securities', 
      value: 2100000,
      change: -1.8,
      changeType: 'negative',
      currency: 'NGN',
      icon: <FaCoins className="text-red-600" />,
      chartData: [70, 65, 75, 60, 80, 70, 90, 75, 85, 70, 65, 60]
    },
    { 
      id: 4,
      title: 'Stocks', 
      value: 450000,
      change: 8.2,
      changeType: 'positive',
      currency: 'NGN',
      icon: <FaChartLine className="text-red-600" />,
      chartData: [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75]
    },
    { 
      id: 5,
      title: 'Bonds', 
      value: 680000,
      change: 1.5,
      changeType: 'positive',
      currency: 'NGN',
      icon: <FaCoins className="text-red-600" />,
      chartData: [65, 60, 70, 65, 75, 70, 80, 75, 85, 80, 75, 70]
    },
    { 
      id: 6,
      title: 'Crypto', 
      value: 320000,
      change: -3.4,
      changeType: 'negative',
      currency: 'NGN',
      icon: <FaCoins className="text-red-600" />,
      chartData: [90, 80, 85, 75, 70, 65, 60, 55, 65, 70, 75, 70]
    },
  ];

  const transactions = [
    { id: 1, type: 'Buy', asset: 'Apple Inc.', amount: 150000, date: '2023-06-15', status: 'Completed' },
    { id: 2, type: 'Sell', asset: 'Tesla Inc.', amount: 85000, date: '2023-06-12', status: 'Completed' },
    { id: 3, type: 'Dividend', asset: 'Mutual Funds', amount: 12500, date: '2023-06-10', status: 'Completed' },
    { id: 4, type: 'Buy', asset: 'Microsoft Corp.', amount: 95000, date: '2023-06-08', status: 'Pending' },
  ];

  // Custom chart components
  const MiniBarChart = ({ data, positive }) => {
    const maxValue = Math.max(...data);
    
    return (
      <div className="h-16 flex items-end mb-2">
        {data.map((value, index) => (
          <div 
            key={index}
            className="flex-1 mx-0.5"
            style={{ height: `${(value / maxValue) * 100}%` }}
          >
            <div className={`h-full rounded-t ${positive ? 'bg-green-500' : 'bg-red-500'}`}></div>
          </div>
        ))}
      </div>
    );
  };

  const PortfolioPerformanceChart = () => {
    const performanceData = [800, 950, 1100, 1250, 1400, 1650];
    const maxValue = Math.max(...performanceData);
    
    return (
      <div className="h-48 flex items-end gap-1">
        {performanceData.map((value, index) => (
          <div 
            key={index}
            className="flex-1 flex flex-col items-center"
          >
            <div 
              className="w-full bg-gradient-to-t from-red-600 to-red-400 rounded-t"
              style={{ height: `${(value / maxValue) * 100}%` }}
            ></div>
            <span className="text-xs text-red-600 mt-1">
              {['J', 'F', 'M', 'A', 'M', 'J'][index]}
            </span>
          </div>
        ))}
      </div>
    );
  };

  const AssetAllocationChart = () => {
    const allocations = [
      { name: 'Stocks', value: 35, color: 'bg-red-600' },
      { name: 'Bonds', value: 25, color: 'bg-red-700' },
      { name: 'Crypto', value: 15, color: 'bg-red-800' },
      { name: 'Mutual Funds', value: 15, color: 'bg-red-500' },
      { name: 'Real Estate', value: 10, color: 'bg-red-400' },
    ];
    
    return (
      <div className="flex flex-col gap-2">
        {allocations.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className={`w-8 h-8 ${item.color} rounded-md mr-3`}></div>
            <div className="flex-1">
              <div className="flex justify-between">
                <span className="text-gray-700">{item.name}</span>
                <span className="font-medium text-gray-900">{item.value}%</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full mt-1">
                <div 
                  className={`h-full ${item.color} rounded-full`} 
                  style={{ width: `${item.value}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const filteredItems = portfolioItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'positive') return matchesSearch && item.changeType === 'positive';
    if (activeTab === 'negative') return matchesSearch && item.changeType === 'negative';
    return matchesSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const totalValue = portfolioItems.reduce((sum, item) => sum + item.value, 0);
  const totalChange = portfolioItems.reduce((sum, item) => sum + (item.value * item.change / 100), 0);

  return (
    <div className="min-h-screen bg-white px-4 py-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-700">My Portfolio</h1>
            <p className="text-gray-600 mt-1">Track and manage your investments</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full sm:w-auto">
            <button className="flex items-center justify-center gap-2 bg-white border border-red-600 text-red-700 px-4 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors">
              <FaGift className="text-red-600" />
              Redeem Gift
            </button>
            <button className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
              <FaPlus className="text-white" />
              Buy Product
            </button>
          </div>
        </div>

        {/* Portfolio Summary */}
        <div className="bg-gradient-to-r from-red-50 via-red-100 to-red-50 rounded-2xl shadow-lg p-6 mb-8 border border-red-100">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-semibold mb-2 text-red-800">Portfolio Summary</h2>
              <div className="flex items-center">
                <h3 className="text-3xl md:text-4xl font-bold mr-3 text-gray-900">
                  {showValues ? formatCurrency(totalValue) : '₦•••••••'}
                </h3>
                <button 
                  onClick={() => setShowValues(!showValues)}
                  className="bg-red-100 p-1 rounded-full hover:bg-red-200 text-red-700"
                >
                  {showValues ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className={`flex items-center mt-2 ${totalChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {totalChange >= 0 ? <FaArrowUp /> : <FaArrowDown />}
                <span className="ml-1">
                  {formatCurrency(Math.abs(totalChange))} ({((totalChange / totalValue) * 100).toFixed(2)}%) today
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <p className="text-sm text-gray-600">Gainers</p>
                <p className="text-xl font-bold text-green-600">
                  {portfolioItems.filter(i => i.changeType === 'positive').length}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <p className="text-sm text-gray-600">Losers</p>
                <p className="text-xl font-bold text-red-600">
                  {portfolioItems.filter(i => i.changeType === 'negative').length}
                </p>
              </div>
            </div>
          </div>
          
          {/* Performance Chart */}
          <div className="mt-6 h-48">
            <PortfolioPerformanceChart />
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-2">
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'all' 
                  ? 'bg-red-700 text-white' 
                  : 'bg-white text-gray-700 hover:bg-red-50 border border-red-200'
              }`}
              onClick={() => setActiveTab('all')}
            >
              All Assets
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'positive' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-green-50 border border-green-200'
              }`}
              onClick={() => setActiveTab('positive')}
            >
              Gainers
            </button>
            <button 
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeTab === 'negative' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-white text-gray-700 hover:bg-red-50 border border-red-200'
              }`}
              onClick={() => setActiveTab('negative')}
            >
              Losers
            </button>
          </div>
          
          <div className="relative w-full md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="w-full bg-white border border-red-200 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-800"
              placeholder="Search assets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-red-100"
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-3 rounded-lg">
                      {item.icon}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-red-600">{item.currency} Account</p>
                    </div>
                  </div>
                  <button className="text-red-600 hover:text-red-800">
                    <FaEllipsisV />
                  </button>
                </div>

                <div className="mb-4">
                  <p className="text-2xl font-bold text-gray-900 mb-1">
                    {showValues ? formatCurrency(item.value) : '₦•••••••'}
                  </p>
                  <div className={`flex items-center text-sm ${
                    item.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {item.changeType === 'positive' ? <FaArrowUp /> : <FaArrowDown />}
                    <span className="ml-1">{Math.abs(item.change)}%</span>
                    <span className="text-red-600 ml-2">this month</span>
                  </div>
                </div>

                <MiniBarChart data={item.chartData} positive={item.changeType === 'positive'} />
              </div>
              
              <div className="bg-red-50 px-5 py-3 flex justify-between border-t border-red-100">
                <button className="text-red-700 font-medium hover:text-red-900 transition-colors">
                  View Details
                </button>
                <button className="flex items-center gap-2 text-red-700 font-medium hover:text-red-900 transition-colors">
                  <FaExchangeAlt className="text-sm" /> Trade
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-red-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-red-700">Recent Transactions</h2>
              <button className="text-red-600 font-medium hover:text-red-800">
                View All
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-red-50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-red-700">Type</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-red-700">Asset</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-red-700">Amount</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-red-700">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-red-100">
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-red-50">
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.type === 'Buy' ? 'bg-blue-100 text-blue-700' : 
                          transaction.type === 'Sell' ? 'bg-red-100 text-red-700' : 
                          'bg-green-100 text-green-700'
                        }`}>
                          {transaction.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-900">{transaction.asset}</td>
                      <td className="py-3 px-4 font-medium text-gray-900">
                        {formatCurrency(transaction.amount)}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Asset Allocation */}
          <div className="bg-white rounded-2xl shadow-md p-6 border border-red-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-red-700">Asset Allocation</h2>
              <button className="text-red-600 font-medium hover:text-red-800">
                View Details
              </button>
            </div>
            
            <div className="h-64 flex items-center justify-center">
              <AssetAllocationChart />
            </div>
          </div>
        </div>
        
        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-md p-6 mb-8 border border-red-100">
          <h2 className="text-xl font-semibold text-red-700 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 p-4 rounded-xl transition-colors border border-red-200">
              <div className="bg-white p-3 rounded-full mb-3 border border-red-200">
                <FaPlus className="text-red-600 text-xl" />
              </div>
              <span className="text-red-700 font-medium">Add Funds</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 p-4 rounded-xl transition-colors border border-red-200">
              <div className="bg-white p-3 rounded-full mb-3 border border-red-200">
                <FaExchangeAlt className="text-red-600 text-xl" />
              </div>
              <span className="text-red-700 font-medium">Transfer</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 p-4 rounded-xl transition-colors border border-red-200">
              <div className="bg-white p-3 rounded-full mb-3 border border-red-200">
                <FaGift className="text-red-600 text-xl" />
              </div>
              <span className="text-red-700 font-medium">Gift Assets</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 p-4 rounded-xl transition-colors border border-red-200">
              <div className="bg-white p-3 rounded-full mb-3 border border-red-200">
                <FaChartLine className="text-red-600 text-xl" />
              </div>
              <span className="text-red-700 font-medium">View Reports</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;