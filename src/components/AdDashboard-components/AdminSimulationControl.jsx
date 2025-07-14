import React, { useState, useEffect } from 'react';

const AdminSimulationControl = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [simulationActive, setSimulationActive] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch accounts from backend
  useEffect(() => {
    const fetchAccounts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:500/api/accounts?search=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setAccounts(data.accounts || []);
      } catch (err) {
        setAccounts([]);
      }
      setLoading(false);
    };
    if (searchTerm.length > 1) fetchAccounts();
    else setAccounts([]);
  }, [searchTerm]);

  // Fetch simulation status for selected account
  useEffect(() => {
    const fetchStatus = async () => {
      if (!selectedAccount) return;
      try {
        const res = await fetch(`http://localhost:500/api/accounts/${selectedAccount.id}/simulation-status`);
        const data = await res.json();
        setSimulationActive(data.simulationActive);
      } catch (err) {
        setSimulationActive(false);
      }
    };
    fetchStatus();
  }, [selectedAccount]);

  // Start/Pause simulation for selected account
  const handleSimulationToggle = async () => {
    if (!selectedAccount) return;
    setLoading(true);
    try {
      await fetch(`http://localhost:500/api/accounts/${selectedAccount.id}/simulation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ active: !simulationActive }),
      });
      setSimulationActive(!simulationActive);
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="mb-6 p-4 bg-white rounded-xl shadow border border-red-100">
      <h2 className="text-xl font-bold mb-4 text-red-700">Simulation Control</h2>
      <input
        type="text"
        className="w-full border border-red-300 rounded-lg px-3 py-2 mb-3"
        placeholder="Search account by name or email..."
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      {loading && <div className="text-sm text-gray-500 mb-2">Loading...</div>}
      <ul className="mb-4">
        {accounts.map(acc => (
          <li
            key={acc.id}
            className={`p-2 rounded cursor-pointer ${selectedAccount && selectedAccount.id === acc.id ? 'bg-red-100' : 'hover:bg-red-50'}`}
            onClick={() => setSelectedAccount(acc)}
          >
            <span className="font-medium">{acc.name}</span> <span className="text-xs text-gray-500">{acc.email}</span>
          </li>
        ))}
      </ul>
      {selectedAccount && (
        <div className="flex items-center gap-4">
          <span className="font-semibold">{selectedAccount.name}</span>
          <button
            className={`px-6 py-2 rounded-lg font-bold transition-colors ${
              simulationActive
                ? 'bg-green-600 text-white hover:bg-green-700'
                : 'bg-red-600 text-white hover:bg-red-700'
            }`}
            onClick={handleSimulationToggle}
            disabled={loading}
          >
            {simulationActive ? 'Pause Simulation' : 'Start Simulation'}
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminSimulationControl;