// === src/components/dashboard/ProfileSettings.jsx ===
import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';
import {
  FiUser, FiMail, FiPhone, FiDollarSign, FiLock, FiGlobe, FiBell, FiCreditCard,
  FiEye, FiEyeOff, FiCopy, FiArrowUpRight, FiArrowDownLeft, FiRefreshCw
} from 'react-icons/fi';
import { BsQrCode } from 'react-icons/bs';
import { FaBitcoin } from 'react-icons/fa';

const tabs = [
  { id: 'personal',    label: 'Personal Info', icon: <FiUser className="mr-2" /> },
  { id: 'security',    label: 'Security',      icon: <FiLock className="mr-2" /> },
  { id: 'preferences', label: 'Preferences',   icon: <FiBell className="mr-2" /> },
  { id: 'wallet',      label: 'Bitcoin Wallet',icon: <FaBitcoin className="mr-2" /> },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: delay => ({ opacity: 1, y: 0, transition: { delay, ease: 'easeOut' } })
};

export default function ProfileSettings() {
  const [activeTab, setActiveTab] = useState('personal');
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Morgan',
    email: 'alex@investnow.com',
    phone: '+1 (555) 123-4567',
    country: 'United States',
    currency: 'USD',
    notifications: true,
    marketing: false
  });

  const wallet = {
    address: 'bc1qar0srrr7xfkvy5l643lydnw9re59gtzzwf5mdq',
    balance: 0.85642,
    equivalentUSD: 32650.42,
    transactions: [
      { id: 1, type: 'sent',     amount: -0.125, address: 'bc1q9zpgru...', date: 'Jun 15, 2023', status: 'completed' },
      { id: 2, type: 'received', amount:  0.350, address: 'bc1q0s4a8x...', date: 'Jun 12, 2023', status: 'completed' },
      { id: 3, type: 'received', amount:  0.042, address: 'bc1q3x9j2d...', date: 'Jun  8, 2023', status: 'completed' },
      { id: 4, type: 'sent',     amount: -0.200, address: 'bc1q7k2d9f...', date: 'Jun  2, 2023', status: 'completed' },
    ]
  };

  const handleChange = ({ target: { name, value, type, checked } }) => {
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(wallet.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const refreshBalance = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatUSD = num =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(num);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        custom={0}
        className="max-w-4xl mx-auto"
      >
        {/* Header */}
        <div className="text-center mb-10">
          <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={0.1}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Account Settings
          </motion.h1>
          <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.2}
            className="text-gray-600"
          >
            Manage your personal information, security, preferences, and Bitcoin wallet
          </motion.p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.3} className="relative">
            <div className="bg-gradient-to-r from-red-600 to-red-700 h-32" />
            <div className="flex flex-col items-center -mt-16 px-6 pb-6">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative group">
                <div className="bg-gradient-to-r from-amber-500 to-red-600 w-32 h-32 rounded-full flex items-center justify-center text-white text-5xl">
                  <FiUser />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-sm font-medium">Change</span>
                </div>
              </motion.div>
              <motion.h2 variants={fadeUp} initial="hidden" animate="visible" custom={0.4}
                className="text-2xl font-bold text-gray-900 mt-4"
              >
                {formData.firstName} {formData.lastName}
              </motion.h2>
              <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.45}
                className="text-gray-600"
              >
                Premium Investor
              </motion.p>
            </div>
          </motion.div>

          {/* Tabs */}
          <LayoutGroup>
            <div className="border-b border-gray-200 px-6">
              <nav className="flex overflow-x-auto -mb-px relative">
                {tabs.map(tab => (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center px-4 py-3 font-medium text-sm transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'text-red-600'
                        : 'text-gray-600 hover:text-red-500'
                    }`}
                  >
                    {tab.icon}{tab.label}
                    {activeTab === tab.id && (
                      <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600" />
                    )}
                  </button>
                ))}
              </nav>
            </div>
          </LayoutGroup>

          {/* Content */}
          <div className="p-6">
            <motion.div key={activeTab} variants={fadeUp} initial="hidden" animate="visible" custom={0.6}>
              {activeTab === 'personal' && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Personal Information</h3>
                  {/* First/Last Name */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['firstName','lastName'].map((f,i) => (
                      <motion.div key={f} variants={fadeUp} initial="hidden" animate="visible" custom={0.7 + i*0.1}>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {f==='firstName'?'First Name':'Last Name'}
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                            <FiUser />
                          </div>
                          <input name={f} value={formData[f]} onChange={handleChange}
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                  {/* Email */}
                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.9}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <FiMail />
                      </div>
                      <input name="email" value={formData.email} onChange={handleChange} type="email"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </motion.div>
                  {/* Phone */}
                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.0}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <FiPhone />
                      </div>
                      <input name="phone" value={formData.phone} onChange={handleChange} type="tel"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </motion.div>
                  {/* Country/Currency */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.1}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <FiGlobe />
                        </div>
                        <select name="country" value={formData.country} onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white"
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                          <option>Germany</option>
                        </select>
                      </div>
                    </motion.div>
                    <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.2}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <FiDollarSign />
                        </div>
                        <select name="currency" value={formData.currency} onChange={handleChange}
                          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 bg-white"
                        >
                          <option>USD</option>
                          <option>EUR</option>
                          <option>GBP</option>
                          <option>CAD</option>
                          <option>AUD</option>
                        </select>
                      </div>
                    </motion.div>
                  </div>
                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.3}
                    className="pt-6 border-t border-gray-200"
                  >
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                      type="submit"
                    >
                      Save Changes
                    </motion.button>
                  </motion.div>
                </form>
              )}

              {activeTab === 'security' && (
                <motion.form onSubmit={handleSubmit} variants={fadeUp} initial="hidden" animate="visible" custom={0.6} className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Security Settings</h3>
                  {['Current Password','New Password','Confirm New Password'].map((label,i) => (
                    <motion.div key={label} variants={fadeUp} initial="hidden" animate="visible" custom={0.7 + i*0.1}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                          <FiLock />
                        </div>
                        <input type={showPassword ? 'text' : 'password'} placeholder={label}
                          className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        />
                        <button type="button" onClick={() => setShowPassword(v => !v)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        >
                          {showPassword ? <FiEyeOff /> : <FiEye />}
                        </button>
                      </div>
                      {label==='New Password' && (
                        <p className="mt-1 text-xs text-gray-500">
                          Minimum 8 characters with letters, numbers & symbols
                        </p>
                      )}
                    </motion.div>
                  ))}
                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.0} className="pt-6 border-t border-gray-200">
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                      type="submit"
                    >
                      Update Password
                    </motion.button>
                  </motion.div>
                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.1} className="mt-8">
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Two-Factor Authentication</h4>
                    <div className="bg-red-50 border border-red-100 rounded-xl p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                            <FiLock />
                          </div>
                        </div>
                        <div className="ml-3">
                          <h5 className="font-medium text-gray-900">Add extra security</h5>
                          <p className="text-sm text-gray-600 mt-1">
                            Two-factor auth adds an extra layer by requiring more than a password to log in.
                          </p>
                          <button className="mt-3 text-red-600 font-medium text-sm">
                            Enable Two-Factor Authentication
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.form>
              )}

              {activeTab === 'preferences' && (
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.6} className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Notification Preferences</h3>
                  {[
                    { id:'notifications', title:'Account Notifications', desc:'Important updates about your account activity', checked:formData.notifications },
                    { id:'marketing',     title:'Marketing Emails',      desc:'Updates about new features & promotions',   checked:formData.marketing }
                  ].map((opt,i) => (
                    <motion.div key={opt.id} variants={fadeUp} initial="hidden" animate="visible" custom={0.7 + i*0.1}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-red-300 transition-colors"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">{opt.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{opt.desc}</p>
                      </div>
                      <label htmlFor={opt.id} className="relative inline-block w-12 h-6">
                        <input id={opt.id} type="checkbox" name={opt.id} checked={opt.checked} onChange={handleChange} className="sr-only" />
                        <motion.span className={`block w-12 h-6 rounded-full cursor-pointer ${opt.checked ? 'bg-red-600':'bg-gray-300'}`}
                          initial={false} animate={{ backgroundColor: opt.checked ? '#dc2626':'#d1d5db' }} />
                        <motion.span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md ${opt.checked ? 'left-7':'left-1'}`}
                          initial={false} animate={{ left: opt.checked ? 28 : 4 }} transition={{ type:'spring',stiffness:300,damping:30 }} />
                      </label>
                    </motion.div>
                  ))}
                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.9} className="pt-6 border-t border-gray-200">
                    <motion.button whileHover={{ scale:1.02 }} whileTap={{ scale:0.98 }}
                      className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
                      onClick={handleSubmit}
                    >
                      Save Preferences
                    </motion.button>
                  </motion.div>
                </motion.div>
              )}

              {activeTab === 'wallet' && (
                <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.6} className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Bitcoin Wallet</h3>
                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.7}
                    className="bg-gradient-to-br from-amber-50 to-white border border-amber-100 rounded-xl p-6"
                  >
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="text-lg font-semibold text-gray-900">Balance</h4>
                      <motion.button animate={{ rotate: isRefreshing?360:0 }}
                        transition={{ duration:1, repeat: isRefreshing? Infinity:0 }}
                        onClick={refreshBalance}
                        className="p-2 rounded-full hover:bg-amber-100 text-amber-600"
                      >
                        <FiRefreshCw />
                      </motion.button>
                    </div>
                    <div className="text-center mb-4">
                      <motion.div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white mb-2">
                        <FaBitcoin className="h-8 w-8" />
                      </motion.div>
                      <p className="text-2xl font-bold text-gray-900">{wallet.balance} BTC</p>
                      <p className="text-amber-600">{formatUSD(wallet.equivalentUSD)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                        className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-2 rounded-lg font-medium flex items-center justify-center"
                      >
                        <FiArrowDownLeft className="mr-2" /> Receive
                      </motion.button>
                      <motion.button whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                        className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg font-medium flex items-center justify-center"
                      >
                        <FiArrowUpRight className="mr-2" /> Send
                      </motion.button>
                    </div>
                  </motion.div>

                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0.8}
                    className="bg-white border border-gray-200 rounded-xl p-6"
                  >
                    <h4 className="font-semibold text-gray-900 mb-4">Your Bitcoin Address</h4>
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3 mb-3">
                      <p className="font-mono text-sm text-gray-800 truncate">{wallet.address}</p>
                      <motion.button whileHover={{ scale:1.1 }} whileTap={{ scale:0.9 }}
                        onClick={copyToClipboard}
                        className="p-2 text-gray-500 hover:text-red-600"
                      >
                        <FiCopy />
                      </motion.button>
                    </div>
                    {copied && (
                      <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={0.9}
                        className="text-green-600 text-sm text-center mb-4"
                      >
                        Address copied to clipboard!
                      </motion.p>
                    )}
                    <div className="flex justify-center">
                      <motion.button whileHover={{ scale:1.05 }} whileTap={{ scale:0.95 }}
                        onClick={() => setShowQR(v=>!v)}
                        className="flex items-center text-amber-600 font-medium"
                      >
                        <BsQrCode className="mr-2" />
                        {showQR?'Hide QR Code':'Show QR Code'}
                      </motion.button>
                    </div>
                    {showQR && (
                      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.0}
                        className="flex justify-center mt-4 p-4"
                      >
                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="bg-gray-200 border-2 border-dashed rounded-xl w-48 h-48 flex items-center justify-center">
                            <BsQrCode className="h-16 w-16 text-gray-400" />
                          </div>
                          <p className="text-center text-sm text-gray-600 mt-2">Scan to receive Bitcoin</p>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>

                  <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.1}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                  >
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h4 className="font-semibold text-gray-900">Transaction History</h4>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {wallet.transactions.map(tx => (
                        <motion.div key={tx.id} variants={fadeUp} initial="hidden" animate="visible" custom={1.2 + tx.id*0.1}
                          className="p-4 flex items-center hover:bg-gray-50 transition-colors"
                        >
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                            tx.type==='received'?'bg-green-100 text-green-600':'bg-red-100 text-red-600'
                          }`}>
                            {tx.type==='received'?<FiArrowDownLeft/>:<FiArrowUpRight/>}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">
                              {tx.type==='received'?'Received Bitcoin':'Sent Bitcoin'}
                            </p>
                            <p className="text-sm text-gray-600">{tx.date}</p>
                            <p className="text-xs text-gray-500 mt-1 truncate">{tx.address}</p>
                          </div>
                          <div className={`text-right ${
                            tx.type==='received'?'text-green-600':'text-red-600'
                          }`}>
                            <p className="font-medium">
                              {tx.type==='received'?'+':''}{tx.amount} BTC
                            </p>
                            <p className="text-xs text-gray-500">{tx.status}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-200">
                      <button className="w-full text-amber-600 font-medium py-2 rounded-lg hover:bg-amber-50 transition-colors">
                        View All Transactions
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={1.3}
          className="text-center mt-8 text-sm text-gray-600"
        >
          © 2023 InvestNow. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  );
}
