import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

useEffect(() => {
  const fetchAccounts = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/accounts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Response from backend:", response.data); // 👈 LOG IT
      setAccounts(Array.isArray(response.data) ? response.data : []); // 👈 Ensure it's an array
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setAccounts([]); // prevent crashing if request fails
    }
  };

  fetchAccounts();
}, []);

  const filteredAccounts = accounts.filter((account) =>
    account.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.balance?.toString().includes(searchTerm)
  );

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedAccounts = [...filteredAccounts].sort((a, b) => {
    if (sortConfig.key) {
      const aVal = a[sortConfig.key] ?? a.user?.[sortConfig.key];
      const bVal = b[sortConfig.key] ?? b.user?.[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAccounts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedAccounts.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Investment Accounts</h1>

        <input
          type="text"
          placeholder="Search by name, type, or balance..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-4 py-2 border border-gray-300 rounded-md w-full md:w-1/2"
        />

        <div className="overflow-x-auto bg-white rounded-md shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('name')}>User</th>
                <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('type')}>Type</th>
                <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('balance')}>Balance</th>
                <th className="px-6 py-3 text-left cursor-pointer" onClick={() => handleSort('createdAt')}>Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentItems.length > 0 ? (
                currentItems.map((account) => (
                  <tr key={account._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">{account.user?.name || 'N/A'}</td>
                    <td className="px-6 py-4">{account.type}</td>
                    <td className="px-6 py-4">{formatCurrency(account.balance)}</td>
                    <td className="px-6 py-4">{formatDate(account.createdAt)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">No accounts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex justify-center space-x-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`px-4 py-2 border rounded-md ${
                currentPage === i + 1
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-white text-gray-600 border-gray-300'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accounts;
