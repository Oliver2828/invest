import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiBell, 
  FiMail,
  FiPlus, 
  FiSmartphone, 
  FiMessageSquare, 
  FiCreditCard,
  FiTrendingUp,
  FiShield,
  FiCheck,
  FiX
} from 'react-icons/fi';

const NotificationSettings = () => {
  const [notificationSettings, setNotificationSettings] = useState({
    accountActivity: true,
    investmentUpdates: true,
    securityAlerts: true,
    marketingEmails: false,
    pushNotifications: true,
    smsAlerts: false,
    appNotifications: true,
    priceAlerts: true
  });

  const [priceAlerts, setPriceAlerts] = useState([
    { id: 1, asset: 'Bitcoin', threshold: 40000, active: true },
    { id: 2, asset: 'Ethereum', threshold: 2500, active: true },
    { id: 3, asset: 'Tesla', threshold: 700, active: false }
  ]);

  const [newAlert, setNewAlert] = useState({
    asset: '',
    threshold: '',
    active: true
  });

  const [showAddAlert, setShowAddAlert] = useState(false);

  const handleToggle = (setting) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleAddAlert = () => {
    if (newAlert.asset && newAlert.threshold) {
      const newId = Math.max(...priceAlerts.map(a => a.id), 0) + 1;
      setPriceAlerts([
        ...priceAlerts,
        {
          id: newId,
          asset: newAlert.asset,
          threshold: Number(newAlert.threshold),
          active: newAlert.active
        }
      ]);
      setNewAlert({ asset: '', threshold: '', active: true });
      setShowAddAlert(false);
    }
  };

  const toggleAlertStatus = (id) => {
    setPriceAlerts(priceAlerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  const removeAlert = (id) => {
    setPriceAlerts(priceAlerts.filter(alert => alert.id !== id));
  };

  const notificationGroups = [
    {
      title: "Account Notifications",
      icon: <FiCreditCard className="text-red-600" />,
      items: [
        { id: "accountActivity", label: "Account activity", description: "Get notified for deposits, withdrawals, and transfers" },
        { id: "investmentUpdates", label: "Investment updates", description: "Receive updates on your portfolio performance" },
        { id: "securityAlerts", label: "Security alerts", description: "Important notifications about account security" }
      ]
    },
    {
      title: "Communication Preferences",
      icon: <FiMail className="text-red-600" />,
      items: [
        { id: "marketingEmails", label: "Marketing emails", description: "Receive promotional offers and newsletters" },
        { id: "pushNotifications", label: "Push notifications", description: "Enable app notifications on your device" },
        { id: "smsAlerts", label: "SMS alerts", description: "Receive important alerts via text message" },
        { id: "appNotifications", label: "In-app notifications", description: "Get notifications within the application" }
      ]
    },
    {
      title: "Market Alerts",
      icon: <FiTrendingUp className="text-red-600" />,
      items: [
        { id: "priceAlerts", label: "Price alerts", description: "Get notified when assets reach target prices" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-red-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-10">
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-bold text-gray-900 mb-2"
          >
            Notification Settings
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            Customize how and when you receive notifications
          </motion.p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header with illustration */}
          <motion.div 
            className="bg-gradient-to-r from-red-600 to-red-700 p-8 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 mb-4">
                  <FiBell className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold">Stay Informed</h2>
                <p className="mt-2 text-red-100 max-w-md">
                  Manage your notification preferences to stay updated on your investments and account activity.
                </p>
              </div>
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="flex space-x-4">
                  <div className="bg-white/20 rounded-lg p-3">
                    <FiMail className="h-6 w-6" />
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <FiSmartphone className="h-6 w-6" />
                  </div>
                  <div className="bg-white/20 rounded-lg p-3">
                    <FiMessageSquare className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Notification Settings */}
          <div className="p-6">
            {notificationGroups.map((group, index) => (
              <motion.div 
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (index * 0.1) }}
                className="mb-10 last:mb-0"
              >
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    {group.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{group.title}</h3>
                </div>
                
                <div className="space-y-4">
                  {group.items.map((item) => (
                    <motion.div 
                      key={item.id}
                      whileHover={{ y: -3 }}
                      className="flex items-start justify-between p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all"
                    >
                      <div className="flex-1 mr-4">
                        <h4 className="font-bold text-gray-900">{item.label}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                      </div>
                      
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          id={item.id}
                          checked={notificationSettings[item.id]}
                          onChange={() => handleToggle(item.id)}
                        />
                        <motion.label 
                          htmlFor={item.id}
                          className={`block w-12 h-6 rounded-full cursor-pointer ${
                            notificationSettings[item.id] ? 'bg-red-600' : 'bg-gray-300'
                          }`}
                          initial={false}
                          animate={{
                            backgroundColor: notificationSettings[item.id] ? '#dc2626' : '#d1d5db'
                          }}
                        >
                          <motion.span 
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md ${
                              notificationSettings[item.id] ? 'left-7' : 'left-1'
                            }`}
                            initial={false}
                            animate={{
                              left: notificationSettings[item.id] ? 28 : 4
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        </motion.label>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Price Alerts Section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="border-t border-gray-200 pt-8"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mr-3">
                    <FiTrendingUp className="text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Your Price Alerts</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg flex items-center"
                  onClick={() => setShowAddAlert(true)}
                >
                  <FiPlus className="mr-2" />
                  Add Alert
                </motion.button>
              </div>

              {showAddAlert && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-red-50 border border-red-100 rounded-xl p-5 mb-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
                      <input
                        type="text"
                        placeholder="e.g. Bitcoin"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        value={newAlert.asset}
                        onChange={(e) => setNewAlert({...newAlert, asset: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Threshold Price ($)</label>
                      <input
                        type="number"
                        placeholder="e.g. 40000"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
                        value={newAlert.threshold}
                        onChange={(e) => setNewAlert({...newAlert, threshold: e.target.value})}
                      />
                    </div>
                    <div className="flex items-end">
                      <div className="relative inline-block w-12 h-6">
                        <input 
                          type="checkbox" 
                          className="sr-only" 
                          id="newAlertActive"
                          checked={newAlert.active}
                          onChange={() => setNewAlert({...newAlert, active: !newAlert.active})}
                        />
                        <motion.label 
                          htmlFor="newAlertActive"
                          className={`block w-12 h-6 rounded-full cursor-pointer ${
                            newAlert.active ? 'bg-red-600' : 'bg-gray-300'
                          }`}
                          initial={false}
                          animate={{
                            backgroundColor: newAlert.active ? '#dc2626' : '#d1d5db'
                          }}
                        >
                          <motion.span 
                            className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md ${
                              newAlert.active ? 'left-7' : 'left-1'
                            }`}
                            initial={false}
                            animate={{
                              left: newAlert.active ? 28 : 4
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        </motion.label>
                      </div>
                      <label htmlFor="newAlertActive" className="ml-2 text-sm text-gray-700">
                        Active
                      </label>
                    </div>
                  </div>
                  <div className="flex space-x-3 mt-4">
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-2 rounded-lg font-medium"
                      onClick={handleAddAlert}
                    >
                      Add Alert
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 bg-white text-gray-800 border border-gray-300 py-2 rounded-lg font-medium"
                      onClick={() => setShowAddAlert(false)}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </motion.div>
              )}

              {priceAlerts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {priceAlerts.map(alert => (
                    <motion.div
                      key={alert.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-bold text-gray-900">{alert.asset}</h4>
                          <p className="text-2xl font-bold text-red-600 mt-1">
                            ${alert.threshold.toLocaleString()}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center ${
                              alert.active ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                            }`}
                            onClick={() => toggleAlertStatus(alert.id)}
                          >
                            {alert.active ? <FiCheck /> : <FiX />}
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center"
                            onClick={() => removeAlert(alert.id)}
                          >
                            <FiX />
                          </motion.button>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-2 ${
                          alert.active ? 'bg-green-500' : 'bg-gray-400'
                        }`}></div>
                        <span className="text-sm text-gray-600">
                          {alert.active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="bg-gradient-to-br from-red-50 to-white border border-red-100 rounded-xl p-8 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 mb-4">
                    <FiBell className="h-6 w-6" />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-2">No price alerts set up</h4>
                  <p className="text-gray-600 max-w-md mx-auto mb-4">
                    You haven't created any price alerts yet. Set up alerts to get notified when assets reach your target prices.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg flex items-center mx-auto"
                    onClick={() => setShowAddAlert(true)}
                  >
                    <FiPlus className="mr-2" />
                    Create Your First Alert
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 border-t border-gray-200 p-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4 rounded-xl font-medium shadow-md hover:shadow-lg transition-all"
            >
              Save Notification Settings
            </motion.button>
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-8 text-sm text-gray-600"
        >
          © 2023 InvestNow. All rights reserved.
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotificationSettings;