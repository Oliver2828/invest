import React, { useState } from 'react';
import { FaShieldAlt, FaMobileAlt, FaLock, FaEnvelope, FaGoogle, FaUserShield, 
         FaCheckCircle, FaExclamationTriangle, FaHistory, FaTrash, 
         FaQrcode, FaDesktop, FaTabletAlt, FaKey } from 'react-icons/fa';

const Security = () => {
  const [twoFactorMethod, setTwoFactorMethod] = useState('app');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('security');
  
  // Mock security activity data
  const securityActivities = [
    { id: 1, action: 'Login', device: 'iPhone 13 Pro', location: 'Lagos, Nigeria', time: '2 hours ago', status: 'success' },
    { id: 2, action: 'Password Change', device: 'MacBook Pro', location: 'Abuja, Nigeria', time: '1 day ago', status: 'success' },
    { id: 3, action: 'Failed Login', device: 'Samsung Galaxy S21', location: 'Port Harcourt, Nigeria', time: '2 days ago', status: 'warning' },
    { id: 4, action: '2FA Enabled', device: 'Windows Desktop', location: 'Ibadan, Nigeria', time: '3 days ago', status: 'success' },
    { id: 5, action: 'New Device Login', device: 'iPad Pro', location: 'Enugu, Nigeria', time: '1 week ago', status: 'success' },
  ];

  // Mock trusted devices
  const trustedDevices = [
    { id: 1, name: 'MacBook Pro', type: 'desktop', lastActive: 'Active now', location: 'Lagos, Nigeria' },
    { id: 2, name: 'iPhone 13 Pro', type: 'mobile', lastActive: '2 hours ago', location: 'Abuja, Nigeria' },
    { id: 3, name: 'Windows Desktop', type: 'desktop', lastActive: '1 day ago', location: 'Port Harcourt, Nigeria' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 px-4 py-8 font-sans text-gray-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white flex items-center gap-3">
              <FaShieldAlt className="text-red-500" />
              Account Security
            </h1>
            <p className="text-gray-400 mt-2">Manage your security settings and monitor account activity</p>
          </div>
          <div className="mt-4 md:mt-0">
            <div className="flex items-center bg-green-900/30 border border-green-800 px-4 py-2 rounded-lg">
              <FaCheckCircle className="text-green-400 mr-2" />
              <span className="text-green-300">Security Status: Excellent</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-700 mb-8">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'security'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('security')}
          >
            Security Settings
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'activity'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('activity')}
          >
            Activity Log
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === 'devices'
                ? 'text-red-400 border-b-2 border-red-500'
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('devices')}
          >
            Trusted Devices
          </button>
        </div>

        {/* Security Settings */}
        {activeTab === 'security' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Two-Factor Authentication */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                  <FaMobileAlt className="text-red-400" />
                  Two-Factor Authentication
                </h2>
                <div className="relative inline-block w-12 h-6">
                  <input type="checkbox" className="hidden" id="2fa-toggle" defaultChecked />
                  <label 
                    htmlFor="2fa-toggle" 
                    className="block w-12 h-6 rounded-full bg-red-900 cursor-pointer"
                  >
                    <span className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 transform translate-x-6"></span>
                  </label>
                </div>
              </div>
              
              <p className="text-gray-400 mb-6">
                Add an extra layer of security to your account. When enabled, you'll be required to enter both your password and an authentication code when signing in.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-red-900/30 p-3 rounded-full mr-3">
                      <FaGoogle className="text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Authentication App</h3>
                      <p className="text-sm text-gray-400">Google Authenticator, Authy, etc.</p>
                    </div>
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium ${
                      twoFactorMethod === 'app' 
                        ? 'bg-red-700 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setTwoFactorMethod('app')}
                  >
                    {twoFactorMethod === 'app' ? 'Active' : 'Use'}
                  </button>
                </div>
                
                <div className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-red-900/30 p-3 rounded-full mr-3">
                      <FaEnvelope className="text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Email Verification</h3>
                      <p className="text-sm text-gray-400">Send codes to your email</p>
                    </div>
                  </div>
                  <button 
                    className={`px-4 py-2 rounded-lg font-medium ${
                      twoFactorMethod === 'email' 
                        ? 'bg-red-700 text-white' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                    onClick={() => setTwoFactorMethod('email')}
                  >
                    {twoFactorMethod === 'email' ? 'Active' : 'Use'}
                  </button>
                </div>
                
                {twoFactorMethod === 'app' && (
                  <div className="bg-gray-700/30 p-4 rounded-lg mt-4">
                    <div className="flex flex-col items-center mb-4">
                      <div className="bg-white p-3 rounded-lg mb-3">
                        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-32 h-32 flex items-center justify-center">
                          <FaQrcode className="text-gray-400 text-4xl" />
                        </div>
                      </div>
                      <p className="text-gray-400 text-center mb-2">
                        Scan this QR code with your authenticator app
                      </p>
                      <button className="text-red-400 font-medium hover:text-red-300">
                        Can't scan? Enter code manually
                      </button>
                    </div>
                    
                    <div className="mb-4">
                      <label className="block text-gray-300 mb-2">Enter 6-digit code</label>
                      <div className="flex space-x-2">
                        <input 
                          type="text" 
                          maxLength={1}
                          className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg text-center text-xl font-bold text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input 
                          type="text" 
                          maxLength={1}
                          className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg text-center text-xl font-bold text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input 
                          type="text" 
                          maxLength={1}
                          className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg text-center text-xl font-bold text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input 
                          type="text" 
                          maxLength={1}
                          className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg text-center text-xl font-bold text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input 
                          type="text" 
                          maxLength={1}
                          className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg text-center text-xl font-bold text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                        <input 
                          type="text" 
                          maxLength={1}
                          className="w-12 h-12 bg-gray-800 border border-gray-700 rounded-lg text-center text-xl font-bold text-white focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                      Verify and Activate
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Password Management */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
                <FaLock className="text-red-400" />
                Password Management
              </h2>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">Current Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200"
                    placeholder="Enter current password"
                  />
                  <FaKey className="absolute left-3 top-3.5 text-gray-500" />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-300 mb-2">New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200"
                    placeholder="Create new password"
                  />
                  <FaLock className="absolute left-3 top-3.5 text-gray-500" />
                </div>
                <div className="grid grid-cols-4 gap-2 mt-3">
                  <div className={`h-1 rounded ${newPassword.length > 0 ? 'bg-red-500' : 'bg-gray-700'}`}></div>
                  <div className={`h-1 rounded ${newPassword.length > 3 ? 'bg-orange-500' : 'bg-gray-700'}`}></div>
                  <div className={`h-1 rounded ${newPassword.length > 6 ? 'bg-yellow-500' : 'bg-gray-700'}`}></div>
                  <div className={`h-1 rounded ${newPassword.length > 9 ? 'bg-green-500' : 'bg-gray-700'}`}></div>
                </div>
              </div>
              
              <div className="mb-8">
                <label className="block text-gray-300 mb-2">Confirm New Password</label>
                <div className="relative">
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-200"
                    placeholder="Confirm new password"
                  />
                  <FaLock className="absolute left-3 top-3.5 text-gray-500" />
                </div>
              </div>
              
              <button className="w-full bg-gradient-to-r from-red-700 to-red-900 text-white py-3 rounded-lg font-medium hover:opacity-90 transition-opacity">
                Change Password
              </button>
              
              <div className="mt-8">
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <FaUserShield className="text-red-400" />
                  Password Strength Tips
                </h3>
                <ul className="text-gray-400 space-y-2">
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Use at least 12 characters</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Include numbers, symbols, capital and lowercase letters</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Avoid dictionary words or common phrases</span>
                  </li>
                  <li className="flex items-start">
                    <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                    <span>Don't reuse passwords from other accounts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Activity Log */}
        {activeTab === 'activity' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
              <FaHistory className="text-red-400" />
              Recent Security Activities
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-700/50">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Action</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Device</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Location</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Time</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {securityActivities.map((activity) => (
                    <tr key={activity.id} className="hover:bg-gray-700/30">
                      <td className="py-3 px-4 font-medium text-white">{activity.action}</td>
                      <td className="py-3 px-4 text-gray-300">{activity.device}</td>
                      <td className="py-3 px-4 text-gray-300">{activity.location}</td>
                      <td className="py-3 px-4 text-gray-300">{activity.time}</td>
                      <td className="py-3 px-4">
                        {activity.status === 'success' ? (
                          <span className="flex items-center text-green-400">
                            <FaCheckCircle className="mr-1" /> Success
                          </span>
                        ) : (
                          <span className="flex items-center text-yellow-400">
                            <FaExclamationTriangle className="mr-1" /> Warning
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button className="text-red-400 font-medium hover:text-red-300">
                View Full Activity History
              </button>
            </div>
          </div>
        )}
        
        {/* Trusted Devices */}
        {activeTab === 'devices' && (
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-white flex items-center gap-2 mb-6">
              <FaDesktop className="text-red-400" />
              Trusted Devices
            </h2>
            
            <p className="text-gray-400 mb-6">
              These are devices that you've marked as trusted. You won't need to complete two-factor authentication when signing in from these devices.
            </p>
            
            <div className="space-y-4">
              {trustedDevices.map((device) => (
                <div key={device.id} className="flex items-center justify-between bg-gray-700/50 p-4 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-red-900/30 p-3 rounded-full mr-4">
                      {device.type === 'desktop' ? (
                        <FaDesktop className="text-red-400 text-xl" />
                      ) : (
                        <FaTabletAlt className="text-red-400 text-xl" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-white">{device.name}</h3>
                      <div className="flex text-sm text-gray-400 mt-1">
                        <span className="mr-4">{device.lastActive}</span>
                        <span>{device.location}</span>
                      </div>
                    </div>
                  </div>
                  <button className="text-red-400 hover:text-red-300 p-2">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <FaExclamationTriangle className="text-yellow-500" />
                Device Security Tips
              </h3>
              <div className="bg-yellow-900/20 border border-yellow-800 rounded-lg p-4">
                <ul className="text-yellow-200 space-y-2">
                  <li>• Only mark devices as trusted if they are your personal devices</li>
                  <li>• Regularly review and remove devices you no longer use</li>
                  <li>• Always lock your devices when not in use</li>
                  <li>• Enable biometric authentication on your devices</li>
                  <li>• Install security updates promptly</li>
                </ul>
              </div>
            </div>
          </div>
        )}
        
        {/* Security Tips Banner */}
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 rounded-2xl shadow-lg p-6 mt-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="flex-1 mb-4 md:mb-0">
              <h3 className="text-xl font-semibold text-white mb-2">Enhance Your Account Security</h3>
              <p className="text-red-200">
                Follow our security best practices to keep your account and investments safe.
              </p>
            </div>
            <div>
              <button className="bg-white text-red-800 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                View Security Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Security;