// === src/components/dashboard/DashboardHome.jsx ===
import React, { useState, useEffect } from 'react';
import { 
  FiArrowUpRight, FiArrowDownRight, FiTrendingUp, FiDollarSign, 
  FiUser, FiBell, FiCreditCard, FiBarChart2, FiPieChart, FiShield, FiHome,
  FiFileText
} from 'react-icons/fi';
import { motion, LayoutGroup } from 'framer-motion';

const tabItems = [
  { id: 'overview', label: 'Overview', icon: <FiHome /> },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, ease: 'easeOut' }
  })
};

// ...existing imports and code...

const DashboardHome = () => {
  const [active, setActive] = useState('overview');
  const [accountsData, setAccountsData] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activityLoading, setActivityLoading] = useState(true);

  const formatCurrency = amount =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

  useEffect(() => {
    // Fetch user accounts from backend
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          setAccountsData([]);
          setLoading(false);
          return;
        }
        const res = await fetch(`http://localhost:500/api/users/me?email=${encodeURIComponent(email)}`);
        if (!res.ok) {
          setAccountsData([]);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setAccountsData(data.accounts || []);
      } catch (err) {
        setAccountsData([]);
      }
      setLoading(false);
    };
    fetchAccounts();
  }, []);

  useEffect(() => {
    // Fetch recent activity from backend
    const fetchActivity = async () => {
      setActivityLoading(true);
      try {
        const email = localStorage.getItem('userEmail');
        if (!email) {
          setRecentActivity([]);
          setActivityLoading(false);
          return;
        }
        // Replace with your actual backend endpoint for activity
        const res = await fetch(`http://localhost:500/api/users/activity?email=${encodeURIComponent(email)}`);
        if (!res.ok) {
          setRecentActivity([]);
          setActivityLoading(false);
          return;
        }
        const data = await res.json();
        setRecentActivity(Array.isArray(data) ? data : []);
      } catch (err) {
        setRecentActivity([]);
      }
      setActivityLoading(false);
    };
    fetchActivity();
  }, []);

  // Helper to get account by type
  const getAccount = (type) => accountsData.find(acc => acc.type?.toLowerCase() === type);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp} className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">InvestNow</h1>
            <p className="text-red-600">Smart investments for your future</p>
          </div>
        </motion.div>

        {/* Tabs */}
        <LayoutGroup>
          <div className="flex border-b border-red-100 mb-8 relative">
            {tabItems.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center px-5 py-3 font-medium text-sm ${active === tab.id ? 'text-red-600' : 'text-gray-600 hover:text-red-500'}`}
              >
                {React.cloneElement(tab.icon, { className: 'mr-2' })}
                {tab.label}
                {active === tab.id && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Sections */}
        {active === 'overview' && (
          <OverviewSection
            formatCurrency={formatCurrency}
            loading={loading}
            savings={getAccount('savings')}
            retirement={getAccount('retirement')}
            stocks={getAccount('stocks')}
            recentActivity={recentActivity}
            activityLoading={activityLoading}
          />
        )}
      </div>
    </div>
  );
};

// Overview: Calculate totals from all accounts
const OverviewSection = ({ formatCurrency, loading, savings, retirement, stocks, recentActivity, activityLoading }) => {
  // Calculate total portfolio value
  const totalValue = (savings?.balance || 0) + (retirement?.balance || 0) + (stocks?.balance || 0);
  
  const metrics = [
    
  
  ];

  return (
    <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="space-y-6">
      <motion.div variants={fadeUp} custom={2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={i} variants={fadeUp} custom={i + 3} whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl border border-red-100 shadow-sm p-5 transition-shadow">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-500 text-sm">{m.title}</p>
                <p className="text-2xl font-bold text-gray-800 mt-1">{m.value}</p>
              </div>
              <div className="bg-red-100 text-red-600 p-2 rounded-lg">{m.icon}</div>
            </div>
            <p className="text-green-600 font-medium mt-2 flex items-center">
              <FiArrowUpRight className="mr-1" /> {m.change}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Wallet Section */}
      <motion.div variants={fadeUp} custom={7} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Bitcoin Wallet */}
        <motion.div variants={fadeUp} custom={7} whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl border border-orange-200 shadow-sm p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-bold text-gray-900">Bitcoin Wallet</h3>
            <div className="bg-orange-100 text-orange-600 p-2 rounded-lg text-xl">₿</div>
          </div>
          <div className="space-y-3">
            <div className="bg-white rounded-lg p-3 border border-orange-100">
              <p className="text-gray-600 text-xs mb-2">Wallet Address</p>
              <p className="text-gray-900 font-mono text-sm break-all">bc1qx89xp9qtjdufync8u72hjgjnsrhwyqp8c7h3ce</p>
            </div>
            <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
              Copy Address
            </button>
          </div>
        </motion.div>

        {/* Dollar Wallet */}
        

       
      </motion.div>

      {/* Recent Activity removed per request */}
    </motion.div>
  );
};



// Accounts: Display all user accounts from backend
const AccountsSection = ({ formatCurrency, loading, savings, retirement }) => {
  // Build accounts from backend data - use actual account objects
  const allAccounts = [];
  if (savings) allAccounts.push({ ...savings, name: "Savings Account", number: "**** 4832" });
  if (retirement) allAccounts.push({ ...retirement, name: "Retirement Account", number: "**** 5921" });

  return (
    <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {allAccounts.length === 0 ? (
        <motion.div variants={fadeUp} custom={2} className="col-span-full text-center text-gray-500 py-8">
          {loading ? "Loading accounts..." : "No accounts found"}
        </motion.div>
      ) : (
        allAccounts.map((acct, i) => (
          <motion.div key={acct.type || i} variants={fadeUp} custom={i + 2} whileHover={{ scale: 1.02 }} className={`bg-gradient-to-br from-white to-red-50 rounded-2xl border border-red-100 shadow-sm overflow-hidden`}>
            <div className="p-6 border-b border-red-100">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{acct.name || acct.type}</h2>
                  <p className="text-gray-500 text-sm">{acct.number || ""}</p>
                </div>
                <div className="bg-white text-red-600 text-xs font-bold px-3 py-1 rounded-full flex items-center border border-red-100">
                  <FiTrendingUp className="mr-1" /> Growth
                </div>
              </div>
              <div className="mt-4">
                <p className="text-3xl font-bold text-gray-900">{loading ? '...' : formatCurrency(acct.balance || 0)}</p>
              </div>
            </div>
          </motion.div>
        ))
      )}
    </motion.div>
  );
};

const InvestSection = ({ formatCurrency }) => {
  const investments = [
    { id: 1, name: "Green Energy Fund",      return: 18.2, risk: "Medium", min: 1000 },
    { id: 2, name: "Tech Innovators ETF",    return: 22.7, risk: "High",   min: 500  },
    { id: 3, name: "Real Estate Trust",      return: 9.5,  risk: "Low",    min: 2500 },
    { id: 4, name: "Global Dividend Stocks", return: 12.8, risk: "Medium", min: 1000 }
  ];

  return (
    <motion.div initial="hidden" animate="visible" custom={1} variants={fadeUp} className="space-y-6">
      <motion.div variants={fadeUp} custom={2} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {investments.map((inv, i) => (
          <motion.div key={inv.id} variants={fadeUp} custom={i + 3} whileHover={{ scale: 1.03 }} className="bg-white rounded-2xl border border-red-100 shadow-sm p-5 transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-gray-800">{inv.name}</h3>
              <div className={`text-xs font-bold px-2 py-1 rounded-full ${
                inv.risk === "High"   ? "bg-red-100 text-red-800" :
                inv.risk === "Medium" ? "bg-amber-100 text-amber-800" :
                                        "bg-green-100 text-green-800"
              }`}>
                {inv.risk}
              </div>
            </div>
            <div className="text-2xl font-bold text-green-600">+{inv.return}%</div>
            <p className="text-gray-500 text-sm mt-1">Projected annual return</p>
            <p className="mt-4 text-sm text-gray-600">Minimum: {formatCurrency(inv.min)}</p>
            <motion.button whileHover={{ scale: 1.05 }} className="mt-4 w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-xl text-sm font-medium hover:opacity-90 transition-opacity">
              Invest Now
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div variants={fadeUp} custom={8} className="bg-white rounded-2xl border border-red-100 shadow-sm p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Investment Strategy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: <FiBarChart2 />, title: "Growth Portfolio",   desc: "High-growth tech and innovation stocks" },
            { icon: <FiPieChart />,    title: "Balanced Portfolio", desc: "Mix of growth and stable dividend stocks" },
            { icon: <FiShield />,      title: "Conservative",       desc: "Low-risk bonds and stable assets" }
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp} custom={i + 9} whileHover={{ scale: 1.02 }} className="border border-red-100 rounded-xl p-4">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-3">
                {React.cloneElement(s.icon, { className: "text-red-600 text-xl" })}
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};



export default DashboardHome;
