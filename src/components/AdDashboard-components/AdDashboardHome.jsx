import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdDashboardHome = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch dashboard data from backend
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem('token');
        const { data } = await axios.get('http://localhost:500/api/dashboard/admin-dashboard', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-red-600">Failed to load dashboard data.</p>
      </div>
    );
  }

  const {
    totalUsers,
    accountUpdates,
    activeInvestments,
    newRegistrations,
    pendingVerifications,
    recentActivities
  } = dashboardData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Welcome back, <span className="text-red-600">Admin</span></h1>
          <p className="text-gray-600 mt-2">Here's your dashboard overview for today</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard title="Total Users" value={totalUsers} icon="👥" growth="12% this month" />
          <StatCard title="Account Updates" value={accountUpdates} icon="📝" growth={`${pendingVerifications} pending`} />
          <StatCard title="Active Investments" value={activeInvestments} icon="💰" growth="8.5% growth" />
          <StatCard title="New Registrations" value={newRegistrations} icon="🆕" growth="24% this week" />
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Recent Activities</h2>
          {recentActivities && recentActivities.length > 0 ? (
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex justify-between border-b pb-3">
                  <div>
                    <p className="font-medium text-gray-700">{activity.user}</p>
                    <p className="text-sm text-gray-500">{activity.action}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No recent activity to show.</p>
          )}
        </div>
      </div>
    </div>
  );
};

// Reusable stat card
const StatCard = ({ title, value, icon, growth }) => (
  <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition duration-300">
    <div className="flex items-center space-x-4 mb-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <h4 className="text-sm text-gray-500">{title}</h4>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
    <p className="text-xs text-green-600">{growth}</p>
  </div>
);

export default AdDashboardHome;
