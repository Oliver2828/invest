import React, { useState, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaChartLine, FaCoins, FaHandHoldingUsd, FaSearch, FaEllipsisV, FaArrowUp, FaGift, FaPlus, FaExchangeAlt, FaArrowDown } from 'react-icons/fa';

const Portfolio = () => {
  const [showValues, setShowValues] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveTotal, setLiveTotal] = useState(0);
  const [liveAssets, setLiveAssets] = useState([]);
  const [showWithdrawAlert, setShowWithdrawAlert] = useState(false);

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

  // Live simulation for total portfolio value ($100 per hour)
  useEffect(() => {
    if (!accounts.length) return;
    let baseTotal = accounts.reduce((sum, acc) => sum + (acc.balance || 0), 0);
    setLiveTotal(baseTotal);
    const interval = setInterval(() => {
      const change = 100; // $100 per hour
      setLiveTotal(prev => prev + change);
    }, 3600000); // 1 hour
    return () => clearInterval(interval);
  }, [accounts]);

  // Live simulation for each asset (only increases)
  useEffect(() => {
    // Map backend accounts to asset cards with better type matching
    const assetMap = [
      { dbType: ['Savings'], title: 'Savings', icon: <FaCoins className="text-red-600" /> },
      { dbType: ['Mutual Funds'], title: 'Mutual Funds', icon: <FaChartLine className="text-red-600" /> },
      { dbType: ['Trust Fund'], title: 'Trust Fund', icon: <FaHandHoldingUsd className="text-red-600" /> },
      { dbType: ['Securities'], title: 'Securities', icon: <FaCoins className="text-red-600" /> },
      { dbType: ['Stocks'], title: 'Stocks', icon: <FaChartLine className="text-red-600" /> },
      { dbType: ['Bonds'], title: 'Bonds', icon: <FaCoins className="text-red-600" /> },
      { dbType: ['Crypto'], title: 'Crypto', icon: <FaCoins className="text-red-600" /> },
      { dbType: ['Retirement'], title: 'Retirement', icon: <FaHandHoldingUsd className="text-red-600" /> },
    ];
    
    let assets = assetMap.map((asset, idx) => {
      // Find account matching the dbType
      const acc = accounts.find(a => asset.dbType.includes(a.type));
      return {
        id: idx + 1,
        title: asset.title,
        value: acc && acc.balance ? parseFloat(acc.balance) : 0,
        change: (Math.random() * 5).toFixed(1),
        changeType: 'positive',
        currency: 'USD',
        icon: asset.icon,
        chartData: Array.from({ length: 12 }, () => Math.floor(Math.random() * 100 + 20))
      };
    });
    setLiveAssets(assets);

    // Simulate live increases for each asset ($100 per hour)
    const interval = setInterval(() => {
      setLiveAssets(prev => {
        const updatedAssets = prev.map(asset => {
          const change = 100; // $100 per hour
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
        });
        // Update database with new values
        updateAccountBalance(updatedAssets);
        return updatedAssets;
      });
    }, 3600000); // 1 hour
    return () => clearInterval(interval);
  }, [accounts]);

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

  // Calculate total gain/interest from liveAssets
  const totalGainOrInterest = liveAssets.reduce((sum, asset) => {
    return sum + (asset.value * (parseFloat(asset.change) / 100));
  }, 0);

  // Update account balance in database
  const updateAccountBalance = async (updatedAssets) => {
    try {
      const email = localStorage.getItem('userEmail');
      if (!email) return;
      
      // Update each account in the database
      for (const asset of updatedAssets) {
        const account = accounts.find(acc => acc.type === asset.title);
        if (account && account._id) {
          await fetch(`http://localhost:500/api/accounts/${account._id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ balance: asset.value })
          });
        }
      }
    } catch (err) {
      console.error('Failed to update account balance:', err);
    }
  };

  const handleWithdraw = () => {
    if (totalGainOrInterest < 3000) {
      setShowWithdrawAlert(true);
      setTimeout(() => setShowWithdrawAlert(false), 3000);
    } else {
      // Handle successful withdrawal
      alert('Withdrawal approved!');
    }
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
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-700">My Portfolio</h1>
            <p className="text-gray-600 mt-1">Track and manage your investments</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0 w-full sm:w-auto">
            
            <button 
              onClick={handleWithdraw}
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              <FaArrowDown className="text-white" />
              Withdraw
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

        
        
        
      </div>
      
      {/* Withdraw Alert Modal */}
      {showWithdrawAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-red-100 p-4 rounded-full">
                <span className="text-3xl">⚠️</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center text-red-700 mb-2">Cannot Withdraw</h2>
            <p className="text-center text-gray-700 mb-6">
              You need at least <span className="font-semibold text-red-600">$3,000</span> in gains or interest to withdraw.
            </p>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600">Current Gain/Interest:</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(totalGainOrInterest)}</p>
            </div>
            <p className="text-xs text-gray-500 text-center mb-6">
              Required to unlock withdrawal: {formatCurrency(Math.max(0, 3000 - totalGainOrInterest))}
            </p>
            <button 
              onClick={() => setShowWithdrawAlert(false)}
              className="w-full bg-red-600 text-white font-semibold py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Portfolio;