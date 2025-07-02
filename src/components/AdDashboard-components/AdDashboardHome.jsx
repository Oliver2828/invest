// src/components/AdDashboardHome.jsx
import React from 'react';
import { FiUsers, FiRefreshCw, FiActivity, FiChevronRight, FiClock } from 'react-icons/fi';
import { motion } from 'framer-motion';

function AdDashboardHome() {
  // Sample data - replace with actual data from your API
  const dashboardData = {
    totalUsers: 1242,
    accountUpdates: 87,
    activeInvestments: 542,
  };

  const stats = [
    {
      title: 'Total Registered',
      value: dashboardData.totalUsers,
      change: '+12%',
      icon: <FiUsers className="w-6 h-6 text-red-500" />,
      progress: 0.65,
      label: 'Last 30 days',
    },
    {
      title: 'Account Updates',
      value: dashboardData.accountUpdates,
      change: '+3%',
      icon: <FiRefreshCw className="w-6 h-6 text-red-500" />,
      progress: 0.28,
      label: 'Pending reviews',
    },
    {
      title: 'Active Investments',
      value: dashboardData.activeInvestments,
      change: '+8.5%',
      icon: <FiActivity className="w-6 h-6 text-red-500" />,
      progress: 0.42,
      label: 'Portfolio growth',
    },
  ];

  const recentActivity = [
    {
      id: 1,
      title: 'New investment created',
      description: 'User #ID2356 invested $5,000 in Tech Growth Fund',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'Account upgrade requested',
      description: 'User #ID1024 requested premium access',
      time: '5 hours ago',
    },
    {
      id: 3,
      title: 'Security setting changed',
      description: 'User #ID578 reset two-factor authentication',
      time: '1 day ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            👋 Welcome, Admin
          </h1>
          <p className="text-gray-600 mt-1">
            Here’s your platform overview
          </p>
        </div>
        <button
          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
        >
          View Reports
          <FiChevronRight className="w-4 h-4 ml-2" />
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <motion.div
            key={stat.title}
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl shadow-md p-6 border-l-4 border-red-500 transition"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {stat.icon}
                <h2 className="text-lg font-medium text-gray-700">
                  {stat.title}
                </h2>
              </div>
              <span className="text-sm font-semibold text-green-600">
                {stat.change}
              </span>
            </div>

            <div className="mt-4 flex items-baseline">
              <span className="text-4xl font-bold text-gray-900">
                {stat.value}
              </span>
            </div>

            {/* Progress Bar */}
            <div className="mt-4">
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{stat.label}</span>
                <span>{Math.round(stat.progress * 100)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${stat.progress * 100}%` }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-10 bg-white rounded-2xl shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Recent Activity
          </h2>
          <button className="text-red-600 hover:underline text-sm">
            See All
          </button>
        </div>
        <ul className="divide-y divide-gray-200 max-h-72 overflow-y-auto">
          {recentActivity.map((item) => (
            <li key={item.id} className="py-4 flex justify-between">
              <div>
                <p className="font-medium text-gray-900">{item.title}</p>
                <p className="text-gray-600 text-sm mt-1">
                  {item.description}
                </p>
              </div>
              <div className="text-sm text-gray-500 whitespace-nowrap flex items-center space-x-1">
                <FiClock className="w-4 h-4" />
                <span>{item.time}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AdDashboardHome;
