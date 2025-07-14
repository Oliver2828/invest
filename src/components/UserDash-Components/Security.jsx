import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FaShieldAlt, FaMobileAlt, FaLock, FaEnvelope, FaGoogle, FaUserShield,
  FaCheckCircle, FaExclamationTriangle, FaHistory, FaTrash,
  FaQrcode, FaDesktop, FaTabletAlt, FaKey
} from 'react-icons/fa';

const Security = () => {
  const [twoFactorMethod, setTwoFactorMethod] = useState('app');
  const [activeTab, setActiveTab] = useState('security');

  // Profile update state
  const [user, setUser] = useState({ name: '', phone: '', email: '', profileImage: '' });
  const [message, setMessage] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:5000/api/users/me?userId=${userId}`)
        .then((res) => setUser(res.data))
        .catch((err) => console.error(err));
    }
  }, [userId]);
//  bbb
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('http://localhost:5000/api/users/update-profile', {
        userId,
        name: user.name,
        phone: user.phone,
        profileImage: user.profileImage,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error updating profile');
    }
  };

  const securityActivities = [
    { id: 1, action: 'Login', device: 'iPhone 13 Pro', location: 'Lagos, Nigeria', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'Password Change', device: 'MacBook Pro', location: 'Abuja, Nigeria', time: '1 day ago', status: 'success' },
    { id: 3, action: 'Failed Login', device: 'Samsung Galaxy S21', location: 'Port Harcourt, Nigeria', time: '2 days ago', status: 'warning' },
    { id: 4, action: '2FA Enabled', device: 'Windows Desktop', location: 'Ibadan, Nigeria', time: '3 days ago', status: 'success' },
    { id: 5, action: 'New Device Login', device: 'iPad Pro', location: 'Enugu, Nigeria', time: '1 week ago', status: 'success' },
  ];

  const trustedDevices = [
    { id: 1, name: 'MacBook Pro', type: 'desktop', lastActive: 'Active now', location: 'Lagos, Nigeria' },
    { id: 2, name: 'iPhone 13 Pro', type: 'mobile', lastActive: '2 hours ago', location: 'Abuja, Nigeria' },
    { id: 3, name: 'Windows Desktop', type: 'desktop', lastActive: '1 day ago', location: 'Port Harcourt, Nigeria' },
  ];

  return (
    <div className="min-h-screen bg-white px-4 py-8 font-sans text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-red-700 flex items-center gap-3">
              <FaShieldAlt className="text-red-700" />
              Account Security
            </h1>
            <p className="text-gray-600 mt-2">Manage your security settings and monitor account activity</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center bg-red-100 border border-red-300 px-4 py-2 rounded-lg">
              <FaCheckCircle className="text-green-600 mr-2" />
              <span className="text-green-700 font-medium">Security Status: Excellent</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-red-200 mb-8">
          {['security', 'activity', 'devices'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 font-medium ${
                activeTab === tab
                  ? 'text-red-700 border-b-2 border-red-700'
                  : 'text-gray-600 hover:text-red-600'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'security' ? 'Security Settings' : tab === 'activity' ? 'Activity Log' : 'Trusted Devices'}
            </button>
          ))}
        </div>

        {/* SECURITY TAB */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Two-Factor Authentication (same as before) */}
            <div className="bg-white border border-red-200 rounded-2xl shadow-lg p-6">
              {/* ...Two-Factor content here (unchanged) */}
              <h2 className="text-xl font-semibold text-red-800 flex items-center gap-2 mb-4">
                <FaMobileAlt className="text-red-700" />
                Two-Factor Authentication
              </h2>
              <p className="text-gray-600">Protect your account with 2FA (Google Authenticator or Email)</p>
            </div>

            {/* Update Profile Section */}
            <div className="bg-white border border-red-200 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-red-800 flex items-center gap-2 mb-6">
                <FaUserShield className="text-red-700" />
                Update Profile
              </h2>

              {message && <p className="text-green-600 mb-4">{message}</p>}

              <form onSubmit={handleProfileUpdate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={user.name}
                    onChange={(e) => setUser({ ...user, name: e.target.value })}
                    className="w-full mt-1 border border-red-300 rounded-md shadow-sm p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    type="text"
                    value={user.phone}
                    onChange={(e) => setUser({ ...user, phone: e.target.value })}
                    className="w-full mt-1 border border-red-300 rounded-md shadow-sm p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                  <input
                    type="text"
                    value={user.profileImage}
                    onChange={(e) => setUser({ ...user, profileImage: e.target.value })}
                    className="w-full mt-1 border border-red-300 rounded-md shadow-sm p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email (read-only)</label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full mt-1 border border-gray-300 bg-gray-100 rounded-md shadow-sm p-2"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-700 text-white py-2 rounded-md hover:bg-red-800 transition"
                >
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ACTIVITY LOG (same as before) */}
        {activeTab === 'activity' && (
          <div className="bg-white border border-red-200 rounded-2xl shadow-lg p-6">
            {/* ...Activity content unchanged */}
            <h2 className="text-xl font-semibold text-red-800 mb-4">Recent Security Activities</h2>
          </div>
        )}

        {/* TRUSTED DEVICES (same as before) */}
        {activeTab === 'devices' && (
          <div className="bg-white border border-red-200 rounded-2xl shadow-lg p-6">
            {/* ...Devices content unchanged */}
            <h2 className="text-xl font-semibold text-red-800 mb-4">Trusted Devices</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Security;
