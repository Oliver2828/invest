import React, { useState, useEffect } from 'react';

const AdDashboardHome = () => {
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    accountUpdates: 0,
    activeInvestments: 0
  });

  // Simulate data loading
  useEffect(() => {
    const fetchData = () => {
      setTimeout(() => {
        setDashboardData({
          totalUsers: 1242,
          accountUpdates: 87,
          activeInvestments: 542,
          newRegistrations: 42,
          pendingVerifications: 15,
          recentActivities: [
            { id: 1, user: "Michael Johnson", action: "Invested $5,000 in Tech Growth Fund", time: "2 hours ago" },
            { id: 2, user: "Sarah Williams", action: "Updated account information", time: "4 hours ago" },
            { id: 3, user: "Robert Chen", action: "Created new investment portfolio", time: "6 hours ago" },
            { id: 4, user: "Amanda Rodriguez", action: "Withdrew $2,500 from Real Estate Fund", time: "Yesterday" },
            { id: 5, user: "David Kim", action: "Completed KYC verification", time: "Yesterday" }
          ]
        });
      }, 800);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Welcome back, <span className="text-red-600">Admin</span>
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your investment platform today
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Total Users */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-b-4 border-red-500 transform transition hover:scale-[1.02]">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Users</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.totalUsers}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>12.4% increase this month</span>
            </div>
          </div>

          {/* Account Updates */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-b-4 border-red-500 transform transition hover:scale-[1.02]">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Account Updates</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.accountUpdates}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span>15 pending reviews</span>
            </div>
          </div>

          {/* Active Investments */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-b-4 border-red-500 transform transition hover:scale-[1.02]">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Active Investments</h3>
                <p className="text-2xl font-bold text-gray-800">{dashboardData.activeInvestments}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>8.5% growth this month</span>
            </div>
          </div>

          {/* New Registrations */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border-b-4 border-red-500 transform transition hover:scale-[1.02]">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 p-3 rounded-lg mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <div>
                <h3 className="text-gray-500 text-sm font-medium">New Registrations</h3>
                <p className="text-2xl font-bold text-gray-800">42</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span>24% increase this week</span>
            </div>
          </div>
        </div>

        {/* Charts and Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Recent Activity */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {dashboardData.recentActivities && dashboardData.recentActivities.map(activity => (
                <div key={activity.id} className="flex items-start pb-4 border-b border-gray-100">
                  <div className="mr-3 mt-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{activity.user}</p>
                    <p className="text-sm text-gray-600 truncate">{activity.action}</p>
                  </div>
                  <div className="text-right text-xs text-gray-500 whitespace-nowrap">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full py-2 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors">
              View All Activity
            </button>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default AdDashboardHome;