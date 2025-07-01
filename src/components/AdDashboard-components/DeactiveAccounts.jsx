// src/components/DeactivatedAccountsDashboard.jsx
import React, { useState } from 'react';
import { 
  ArrowPathIcon, 
  MagnifyingGlassIcon, 
  FunnelIcon, 
  ArrowDownTrayIcon, 
  EyeIcon,
  UserIcon,
  CalendarIcon,
  ChartBarIcon,
  InformationCircleIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { 
  ChevronDownIcon,
  ChevronUpIcon
} from '@heroicons/react/20/solid';

const DeactivatedAccounts = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedRows, setSelectedRows] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  
  // Mock data for deactivated accounts
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      username: 'john_doe',
      name: 'John Doe',
      email: 'john@example.com',
      deactivationDate: '2023-05-15',
      reason: 'Voluntary',
      lastActivity: '2023-05-10',
      daysDeactivated: 48,
      status: 'deactivated'
    },
    {
      id: '2',
      username: 'sarah_smith',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      deactivationDate: '2023-06-22',
      reason: 'Inactivity',
      lastActivity: '2023-06-01',
      daysDeactivated: 40,
      status: 'deactivated'
    },
    {
      id: '3',
      username: 'mike_jones',
      name: 'Mike Jones',
      email: 'mike@example.com',
      deactivationDate: '2023-07-05',
      reason: 'Violation',
      lastActivity: '2023-06-28',
      daysDeactivated: 28,
      status: 'deactivated'
    },
    {
      id: '4',
      username: 'lisa_wang',
      name: 'Lisa Wang',
      email: 'lisa@example.com',
      deactivationDate: '2023-04-18',
      reason: 'Voluntary',
      lastActivity: '2023-04-10',
      daysDeactivated: 76,
      status: 'deactivated'
    },
    {
      id: '5',
      username: 'david_brown',
      name: 'David Brown',
      email: 'david@example.com',
      deactivationDate: '2023-07-10',
      reason: 'Inactivity',
      lastActivity: '2023-06-15',
      daysDeactivated: 23,
      status: 'deactivated'
    },
    {
      id: '6',
      username: 'emma_wilson',
      name: 'Emma Wilson',
      email: 'emma@example.com',
      deactivationDate: '2023-05-30',
      reason: 'Violation',
      lastActivity: '2023-05-25',
      daysDeactivated: 34,
      status: 'deactivated'
    },
  ]);

  // Filter accounts based on search text
  const filteredAccounts = accounts.filter(account => {
    return (
      account.username.toLowerCase().includes(searchText.toLowerCase()) ||
      account.name.toLowerCase().includes(searchText.toLowerCase()) ||
      account.email.toLowerCase().includes(searchText.toLowerCase()) ||
      account.reason.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  // Handle row selection
  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === filteredAccounts.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredAccounts.map(account => account.id));
    }
  };

  // Handle reactivation
  const handleReactivate = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
    setSelectedRows(selectedRows.filter(rowId => rowId !== id));
  };

  // Handle bulk reactivation
  const handleBulkReactivate = () => {
    setAccounts(accounts.filter(account => !selectedRows.includes(account.id)));
    setSelectedRows([]);
  };

  // Open account details modal
  const openAccountDetails = (account) => {
    setSelectedAccount(account);
    setIsDetailsModalOpen(true);
  };

  // Handle sorting
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Sort accounts
  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Deactivated Accounts</h1>
        <p className="mt-2 text-gray-600">Manage and monitor deactivated user accounts</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <UserIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Deactivated</p>
              <p className="text-2xl font-bold text-gray-900">87</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <CalendarIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <ChartBarIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg. Days Deactivated</p>
              <p className="text-2xl font-bold text-gray-900">34.7</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div className="flex items-center">
            <div className="p-3 bg-red-50 rounded-lg">
              <InformationCircleIcon className="h-8 w-8 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Voluntary Deactivations</p>
              <p className="text-2xl font-bold text-gray-900">52</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500"
              placeholder="Search accounts..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <FunnelIcon className="h-5 w-5 mr-2 text-gray-500" />
              Filters
            </button>
            
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <ArrowDownTrayIcon className="h-5 w-5 mr-2 text-gray-500" />
              Export
            </button>
            
            <button
              onClick={handleBulkReactivate}
              disabled={selectedRows.length === 0}
              className={`inline-flex items-center px-4 py-2 rounded-lg shadow-sm text-sm font-medium text-white ${
                selectedRows.length === 0 
                  ? 'bg-gray-300 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              <ArrowPathIcon className="h-5 w-5 mr-2" />
              Reactivate ({selectedRows.length})
            </button>
          </div>
        </div>
        
        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deactivation Reason</label>
                <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-lg">
                  <option>All Reasons</option>
                  <option>Voluntary</option>
                  <option>Inactivity</option>
                  <option>Violation</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deactivation Date</label>
                <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-lg">
                  <option>All Time</option>
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
                  <option>Last 90 Days</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Days Deactivated</label>
                <select className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-lg">
                  <option>Any Duration</option>
                  <option>30+ days</option>
                  <option>60+ days</option>
                  <option>90+ days</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4 flex justify-end space-x-3">
              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                Reset
              </button>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Accounts Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                      checked={selectedRows.length === filteredAccounts.length && filteredAccounts.length > 0}
                      onChange={toggleSelectAll}
                      disabled={filteredAccounts.length === 0}
                    />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    User
                    {sortConfig.key === 'name' && sortConfig.direction === 'ascending' && (
                      <ChevronUpIcon className="h-4 w-4 ml-1" />
                    )}
                    {sortConfig.key === 'name' && sortConfig.direction === 'descending' && (
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Username
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('deactivationDate')}
                >
                  <div className="flex items-center">
                    Deactivation Date
                    {sortConfig.key === 'deactivationDate' && sortConfig.direction === 'ascending' && (
                      <ChevronUpIcon className="h-4 w-4 ml-1" />
                    )}
                    {sortConfig.key === 'deactivationDate' && sortConfig.direction === 'descending' && (
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                  onClick={() => handleSort('daysDeactivated')}
                >
                  <div className="flex items-center">
                    Days Deactivated
                    {sortConfig.key === 'daysDeactivated' && sortConfig.direction === 'ascending' && (
                      <ChevronUpIcon className="h-4 w-4 ml-1" />
                    )}
                    {sortConfig.key === 'daysDeactivated' && sortConfig.direction === 'descending' && (
                      <ChevronDownIcon className="h-4 w-4 ml-1" />
                    )}
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedAccounts.length > 0 ? (
                sortedAccounts.map((account) => (
                  <tr key={account.id} className={selectedRows.includes(account.id) ? 'bg-red-50' : 'hover:bg-gray-50'}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                        checked={selectedRows.includes(account.id)}
                        onChange={() => toggleRowSelection(account.id)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                          <span className="text-red-800 font-medium">
                            {account.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{account.name}</div>
                          <div className="text-sm text-gray-500">{account.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      @{account.username}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.deactivationDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        account.reason === 'Voluntary' 
                          ? 'bg-green-100 text-green-800' 
                          : account.reason === 'Inactivity' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {account.reason}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {account.daysDeactivated} days
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openAccountDetails(account)}
                          className="text-indigo-600 hover:text-indigo-900 flex items-center"
                        >
                          <EyeIcon className="h-4 w-4 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleReactivate(account.id)}
                          className="text-red-600 hover:text-red-900 flex items-center"
                        >
                          <ArrowPathIcon className="h-4 w-4 mr-1" />
                          Reactivate
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No deactivated accounts found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{sortedAccounts.length}</span> of{' '}
            <span className="font-medium">{sortedAccounts.length}</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Account Details Modal */}
      {isDetailsModalOpen && selectedAccount && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h3 className="text-xl font-bold text-gray-900">Account Details</h3>
                <button
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center mb-6">
                  <div className="flex-shrink-0 h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                    <span className="text-xl text-red-800 font-medium">
                      {selectedAccount.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-bold text-gray-900">{selectedAccount.name}</h4>
                    <p className="text-gray-500">@{selectedAccount.username}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Contact Information</h5>
                    <p className="text-gray-900">{selectedAccount.email}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Account Status</h5>
                    <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                      Deactivated
                    </span>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Deactivation Date</h5>
                    <p className="text-gray-900">{selectedAccount.deactivationDate}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Days Deactivated</h5>
                    <p className="text-gray-900">{selectedAccount.daysDeactivated} days</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Deactivation Reason</h5>
                    <p className="text-gray-900">{selectedAccount.reason}</p>
                  </div>
                  
                  <div>
                    <h5 className="text-sm font-medium text-gray-500 mb-2">Last Activity</h5>
                    <p className="text-gray-900">{selectedAccount.lastActivity}</p>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <button
                    onClick={() => setIsDetailsModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      handleReactivate(selectedAccount.id);
                      setIsDetailsModalOpen(false);
                    }}
                    className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                  >
                    Reactivate Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeactivatedAccounts;