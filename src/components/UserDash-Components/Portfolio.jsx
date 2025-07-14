import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaChartLine, FaCoins, FaHandHoldingUsd, FaSearch, FaEllipsisV, FaArrowUp, FaGift, FaPlus, FaExchangeAlt } from 'react-icons/fa';

const Portfolio = () => {
  const [showValues, setShowValues] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveTotal, setLiveTotal] = useState(0);
  const [liveAssets, setLiveAssets] = useState([]);
  const [simulationActive, setSimulationActive] = useState(false);

  // Fetch accounts from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          setAccounts([]);
          setLoading(false);
          return;
        }
        const res = await fetch(`http://localhost:500/api/users/me?email=${encodeURIComponent(email)}`);
        if (!res.ok) {
          setAccounts([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setAccounts(data.accounts || []);
      } catch (err) {
        setAccounts([]);
      }
      setLoading(false);
    };
    fetchAccounts();
  }, []);

  // Live simulation for total portfolio value (only increases)
  useEffect(() => {
    if (!accounts.length || !simulationActive) return;
    let baseTotal = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    setLiveTotal(baseTotal);
    const interval = setInterval(() => {
      const change = Math.random() * 500; // always positive
      setLiveTotal(prev => prev + change);
    }, 2000);
    return () => clearInterval(interval);
  }, [accounts, simulationActive]);

  // Live simulation for each asset (only increases)
  useEffect(() => {
    // Map backend accounts to asset cards
    const assetMap = [
      { key: 'mutual funds', title: 'Mutual Funds', icon: <FaChartLine className="text-red-600" /> },
      { key: 'trust fund', title: 'Trust Fund', icon: <FaHandHoldingUsd className="text-red-600" /> },
      { key: 'securities', title: 'Securities', icon: <FaCoins className="text-red-600" /> },
      { key: 'stocks', title: 'Stocks', icon: <FaChartLine className="text-red-600" /> },
      { key: 'bonds', title: 'Bonds', icon: <FaCoins className="text-red-600" /> },
      { key: 'crypto', title: 'Crypto', icon: <FaCoins className="text-red-600" /> },
    ];
    let assets = assetMap.map((asset, idx) => {
      const acc = accounts.find(a => a.type && a.type.toLowerCase() === asset.key);
      return {
        id: idx + 1,
        title: asset.title,
        value: acc ? acc.balance : Math.floor(Math.random() * 100000 + 20000),
        change: (Math.random() * 5).toFixed(1),
        changeType: 'positive',
        currency: 'USD',
        icon: asset.icon,
        chartData: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100 + 20))
      };
    });
    setLiveAssets(assets);

    if (!simulationActive) return;
    // Simulate live increases for each asset
    const interval = setInterval(() => {
      setLiveAssets(prev =>
        prev.map(asset => {
          const change = Math.random() * 500; // always positive
          const newValue = asset.value + change;
          const newChange = (Math.random() * 5).toFixed(1);
          const newChartData = asset.chartData
            .slice(1)
            .concat([Math.floor(newValue / 1000 + Math.random() * 100)]);
          return {
            ...asset,
            value: newValue,
            change: newChange,
            changeType: 'positive',
            chartData: newChartData
          };
        })
      );
    }, 2000);
    return () => clearInterval(interval);
  }, [accounts, simulationActive]);

  const filteredItems = liveAssets.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'positive') return matchesSearch && item.changeType === 'positive';
    return matchesSearch;
  });

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  // Portfolio summary: liveTotal from backend accounts
  const totalValue = liveTotal;
  // Simulate totalChange for live effect (always positive)
  const totalChange = (Math.random() * 0.02 * totalValue);

  // Custom chart components
  const MiniBarChart = ({ data }) => {
    const maxValue = Math.max(...data);
    return (
      <div className="h-16 flex items-end mb-2">
        {data.map((value, index) => (
          <div 
            key={index}
            className="flex-1 mx-0.5"
            style={{ height: `${(value / maxValue) * 100}%` }}
          >
            <div className="h-full rounded-t bg-green-500"></div>
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

  return (
    <div className="min-h-screen bg-white px-4 py-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Admin Simulation Control */}
        <div className="mb-6 flex justify-end">
          <button
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              simulationActive
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            onClick={() => setSimulationActive(!simulationActive)}
          >
            {simulationActive ? 'Stop Live Simulation' : 'Start Live Simulation'}
          </button>
        </div>

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
                  {showValues ? formatCurrency(totalValue) : '$•••••••'}
                </h3>
                <button 
                  onClick={() => setShowValues(!showValues)}
                  className="bg-red-100 p-1 rounded-full hover:bg-red-200 text-red-700"
                >
                  {showValues ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center mt-2 text-green-600">
                <FaArrowUp />
                <span className="ml-1">
                  {formatCurrency(Math.abs(totalChange))} ({((totalChange / totalValue) * 100).toFixed(2)}%) today
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <p className="text-sm text-gray-600">Gainers</p>
                <p className="text-xl font-bold text-green-600">
                  {liveAssets.filter(i => i.changeType === 'positive').length}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg border border-red-100">
                <p className="text-sm text-gray-600">Losers</p>
                <p className="text-xl font-bold text-red-600">
                  0
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
                    {showValues ? formatCurrency(item.value) : '$•••••••'}
                  </p>
                  <div className="flex items-center text-sm text-green-600">
                    <FaArrowUp />
                    <span className="ml-1">{Math.abs(item.change)}%</span>
                    <span className="text-red-600 ml-2">this month</span>
                  </div>
                </div>

                <MiniBarChart data={item.chartData} />
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