import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiFilter,
  FiEdit2,
  FiCheck,
  FiX,
  FiUser,
  FiDollarSign,
  FiRefreshCw,
  FiTrash2,
  FiPlus,
  FiDownload,
  FiTrendingUp,
} from 'react-icons/fi';

const AdminPortfolioManagement = () => {
  const [searchText, setSearchText] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [editingId, setEditingId] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(null);

  // Portfolio data
  const [portfolios, setPortfolios] = useState([]);

  // Load portfolios from backend
  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:500/api/accounts', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok) {
        // map backend accounts to frontend shape
        const mapped = data.map(acc => ({
          id: acc._id,
          userName: acc.user?.name || 'Unknown',
          email: acc.user?.email || '',
          amount: acc.balance || 0,
          currency: 'USD',
          status: 'Active',
          investmentType: acc.type || '',
          lastUpdated: acc.updatedAt ? acc.updatedAt.split('T')[0] : '',
          updatedBy: '',
        }));
        setPortfolios(mapped);
      } else {
        console.error('Failed to fetch accounts', data);
      }
    } catch (err) {
      console.error('Error fetching accounts', err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // Form states
  const [editForm, setEditForm] = useState({
    userName: '',
    email: '',
    amount: '',
    currency: 'USD',
    status: 'Active',
    investmentType: '',
  });

  const [newPortfolio, setNewPortfolio] = useState({
    userName: '',
    email: '',
    amount: '',
    currency: 'USD',
    status: 'Active',
    investmentType: '',
  });

  const [userSearchResults, setUserSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Filter & sort
  const filtered = portfolios.filter(
    (p) =>
      p.userName.toLowerCase().includes(searchText.toLowerCase()) ||
      p.email.toLowerCase().includes(searchText.toLowerCase()) ||
      p.investmentType.toLowerCase().includes(searchText.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const dir = sortConfig.direction === 'ascending' ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -1 * dir;
    if (a[sortConfig.key] > b[sortConfig.key]) return 1 * dir;
    return 0;
  });

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Edit handlers
  const startEditing = (portfolio) => {
    setEditingId(portfolio.id);
    setEditForm(portfolio);
  };

  const saveEditing = async (id) => {
    // optimistic update
    setPortfolios(
      portfolios.map((p) => (p.id === id ? { ...p, ...editForm, lastUpdated: new Date().toISOString().split('T')[0] } : p))
    );
    setEditingId(null);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:500/api/accounts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ balance: editForm.amount, type: editForm.investmentType }),
      });
      const updated = await res.json();
      if (res.ok) {
        // update the exact data returned
        setPortfolios((prev) => prev.map((p) => (p.id === id ? {
          ...p,
          amount: updated.balance || p.amount,
          investmentType: updated.type || p.investmentType,
          lastUpdated: updated.updatedAt ? updated.updatedAt.split('T')[0] : p.lastUpdated,
        } : p)));
      } else {
        console.error('Failed to save:', updated);
      }
    } catch (err) {
      console.error('Error saving account:', err);
    }
  };

  const cancelEditing = () => {
    setEditingId(null);
  };

  // Delete handlers
  const confirmDelete = (portfolio) => {
    setSelectedPortfolio(portfolio);
    setIsDeleteModalOpen(true);
  };

  const executeDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:500/api/accounts/${selectedPortfolio.id}`, {
        method: 'DELETE',
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      if (res.ok) {
        // Remove from local state
        setPortfolios((p) => p.filter((port) => port.id !== selectedPortfolio.id));
        setIsDeleteModalOpen(false);
      } else {
        const data = await res.json();
        console.error('Failed to delete:', data);
      }
    } catch (err) {
      console.error('Error deleting account:', err);
    }
  };

  // Add new portfolio
  const handleAddPortfolio = async () => {
    if (!selectedUser) {
      console.error('No user selected');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:500/api/accounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          userId: selectedUser._id,
          type: newPortfolio.investmentType,
          balance: parseFloat(newPortfolio.amount) || 0,
        }),
      });
      const created = await res.json();
      if (res.ok) {
        // Refresh accounts list
        await fetchAccounts();
        setIsAddModalOpen(false);
        setNewPortfolio({
          userName: '',
          email: '',
          amount: '',
          currency: 'USD',
          status: 'Active',
          investmentType: '',
        });
        setSelectedUser(null);
        setUserSearchResults([]);
      } else {
        console.error('Failed to create account:', created);
      }
    } catch (err) {
      console.error('Error creating account:', err);
    }
  };

  // Search for users to link accounts
  const handleUserSearch = async (email) => {
    if (!email) {
      setUserSearchResults([]);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      // Fetch all users and filter (or create a search endpoint)
      const res = await fetch('http://localhost:500/api/users', {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (res.ok) {
        const filtered = data.filter(
          (user) => user.email.toLowerCase().includes(email.toLowerCase()) ||
                    user.name.toLowerCase().includes(email.toLowerCase())
        );
        setUserSearchResults(filtered);
      }
    } catch (err) {
      console.error('Error searching users:', err);
    }
  };

  const resetFilters = () => {
    setSearchText('');
    setShowFilters(false);
  };

  // Calculate statistics
  const totalPortfolioValue = portfolios.reduce((sum, p) => sum + p.amount, 0);
  const activePortfolios = portfolios.filter((p) => p.status === 'Active').length;
  const pendingPortfolios = portfolios.filter((p) => p.status === 'Pending').length;
  const avgPortfolioValue = portfolios.length > 0 ? totalPortfolioValue / portfolios.length : 0;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header & Stats */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Portfolio Management</h1>
          <p className="text-gray-600">Manage and update user portfolio amounts</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: 'Total Portfolios',
              value: portfolios.length,
              icon: <FiUser className="text-blue-600" />,
            },
            {
              label: 'Total Value',
              value: `$${totalPortfolioValue.toLocaleString()}`,
              icon: <FiDollarSign className="text-green-600" />,
            },
            {
              label: 'Active',
              value: activePortfolios,
              icon: <FiTrendingUp className="text-blue-600" />,
            },
            {
              label: 'Pending',
              value: pendingPortfolios,
              icon: <FiRefreshCw className="text-orange-600" />,
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center space-x-3"
            >
              <div className="p-2 bg-blue-50 rounded">{stat.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-xl font-semibold">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Controls */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by name, email, or investment type…"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setShowFilters((f) => !f)}
              className="flex items-center px-4 py-2 border rounded text-gray-700 hover:bg-gray-50"
            >
              <FiFilter className="mr-2" /> Filters
            </button>
            <button className="flex items-center px-4 py-2 border rounded text-gray-700 hover:bg-gray-50">
              <FiDownload className="mr-2" /> Export
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              <FiPlus className="mr-2" /> Add Portfolio
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="pt-4 border-t space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Filter by status…"
                className="px-3 py-2 border rounded focus:ring-blue-500"
              />
              <input type="text" placeholder="Filter by type…" className="px-3 py-2 border rounded focus:ring-blue-500" />
              <input type="number" placeholder="Min amount…" className="px-3 py-2 border rounded focus:ring-blue-500" />
            </div>
            <button
              onClick={resetFilters}
              className="text-sm text-gray-600 hover:text-gray-900 font-medium"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th
                onClick={() => handleSort('userName')}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                User Name {sortConfig.key === 'userName' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('email')}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                Email {sortConfig.key === 'email' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('amount')}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                Amount {sortConfig.key === 'amount' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('investmentType')}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                Investment Type{' '}
                {sortConfig.key === 'investmentType' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th
                onClick={() => handleSort('status')}
                className="px-6 py-3 text-left text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-100"
              >
                Status {sortConfig.key === 'status' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Updated</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sorted.map((portfolio) => (
              <tr key={portfolio.id} className="hover:bg-gray-50">
                {editingId === portfolio.id ? (
                  <>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        value={editForm.userName}
                        onChange={(e) => setEditForm({ ...editForm, userName: e.target.value })}
                        className="w-full px-2 py-1 border rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                        className="w-full px-2 py-1 border rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) => setEditForm({ ...editForm, amount: parseFloat(e.target.value) || 0 })}
                        className="w-full px-2 py-1 border rounded focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editForm.investmentType}
                        onChange={(e) => setEditForm({ ...editForm, investmentType: e.target.value })}
                        className="w-full px-2 py-1 border rounded focus:ring-blue-500"
                      >
                        <option value="">Select Type</option>
                        <option value="Stocks">Stocks</option>
                        <option value="Bonds">Bonds</option>
                        <option value="Mutual Funds">Mutual Funds</option>
                        <option value="Fixed Income">Fixed Income</option>
                        <option value="Cryptocurrency">Cryptocurrency</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={editForm.status}
                        onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                        className="w-full px-2 py-1 border rounded focus:ring-blue-500"
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{portfolio.lastUpdated}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => saveEditing(portfolio.id)}
                        className="text-green-600 hover:text-green-800 flex items-center gap-1"
                      >
                        <FiCheck /> Save
                      </button>
                      <button
                        onClick={cancelEditing}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <FiX /> Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{portfolio.userName}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{portfolio.email}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                      ${portfolio.amount.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{portfolio.investmentType}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          portfolio.status === 'Active'
                            ? 'bg-green-100 text-green-800'
                            : portfolio.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {portfolio.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{portfolio.lastUpdated}</td>
                    <td className="px-6 py-4 flex gap-2">
                      <button
                        onClick={() => startEditing(portfolio)}
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <FiEdit2 /> Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(portfolio)}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                      >
                        <FiTrash2 /> Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Portfolio Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 space-y-4">
            <h2 className="text-2xl font-bold">Add New Portfolio</h2>
            
            {/* User Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search User (Email or Name)</label>
              <input
                type="text"
                placeholder="Enter user email or name..."
                onChange={(e) => handleUserSearch(e.target.value)}
                className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
              />
              
              {/* Search Results Dropdown */}
              {userSearchResults.length > 0 && (
                <div className="mt-2 border rounded max-h-48 overflow-y-auto bg-gray-50">
                  {userSearchResults.map((user) => (
                    <button
                      key={user._id}
                      onClick={() => {
                        setSelectedUser(user);
                        setUserSearchResults([]);
                      }}
                      className="w-full text-left px-3 py-2 hover:bg-blue-100 border-b last:border-b-0"
                    >
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Selected User Info */}
            {selectedUser && (
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <p className="text-sm"><strong>Selected User:</strong> {selectedUser.name}</p>
                <p className="text-sm text-gray-600">{selectedUser.email}</p>
              </div>
            )}

            {/* Investment Type */}
            <select
              value={newPortfolio.investmentType}
              onChange={(e) => setNewPortfolio({ ...newPortfolio, investmentType: e.target.value })}
              className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Investment Type</option>
              <option value="Stocks">Stocks</option>
              <option value="Bonds">Bonds</option>
              <option value="Mutual Funds">Mutual Funds</option>
              <option value="Fixed Income">Fixed Income</option>
              <option value="Cryptocurrency">Cryptocurrency</option>
              <option value="Mixed">Mixed</option>
            </select>

            {/* Amount */}
            <input
              type="number"
              placeholder="Initial Amount"
              value={newPortfolio.amount}
              onChange={(e) => setNewPortfolio({ ...newPortfolio, amount: parseFloat(e.target.value) || 0 })}
              className="w-full px-4 py-2 border rounded focus:ring-blue-500 focus:border-blue-500"
            />

            <div className="flex gap-2 pt-4">
              <button
                onClick={handleAddPortfolio}
                disabled={!selectedUser}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Add Portfolio
              </button>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setSelectedUser(null);
                  setUserSearchResults([]);
                  setNewPortfolio({
                    userName: '',
                    email: '',
                    amount: '',
                    currency: 'USD',
                    status: 'Active',
                    investmentType: '',
                  });
                }}
                className="flex-1 px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedPortfolio && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-sm w-full p-6 space-y-4">
            <h2 className="text-xl font-bold">Confirm Delete</h2>
            <p className="text-gray-600">
              Are you sure you want to delete the portfolio for <strong>{selectedPortfolio.userName}</strong> with amount{' '}
              <strong>${selectedPortfolio.amount.toLocaleString()}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-4">
              <button
                onClick={executeDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 font-medium"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 border rounded text-gray-700 hover:bg-gray-50 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPortfolioManagement;
