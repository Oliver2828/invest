// src/components/UpdateAccountsDashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  FiSearch,
  FiFilter,
  FiChevronDown,
  FiChevronUp,
  FiEdit2,
  FiCheck,
  FiX,
  FiUser,
  FiMail,
  FiPhone,
  FiRefreshCw,
  FiTrash2,
  FiPlus,
  FiDownload,
  FiInfo,
} from 'react-icons/fi';

const UpdateAccountsDashboard = () => {
  const [searchText,    setSearchText]    = useState('');
  const [showFilters,   setShowFilters]   = useState(false);
  const [sortConfig,    setSortConfig]    = useState({ key: null, direction: null });
  const [editingId,     setEditingId]     = useState(null);
  const [isAddModalOpen,    setIsAddModalOpen]    = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAccount,   setSelectedAccount]   = useState(null);

  // sample accounts
  const [accounts, setAccounts] = useState([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      role: 'User',
      status: 'Active',
      lastUpdated: '2023-07-15',
      updatedBy: 'admin@example.com',
      pendingChanges: 0
    },
    {
      id: '2',
      name: 'Sarah Smith',
      email: 'sarah@example.com',
      phone: '(555) 987-6543',
      role: 'Editor',
      status: 'Pending',
      lastUpdated: '2023-07-18',
      updatedBy: 'manager@example.com',
      pendingChanges: 2
      // bbb
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike@example.com',
      phone: '(555) 456-7890',
      role: 'Admin',
      status: 'Active',
      lastUpdated: '2023-07-10',
      updatedBy: 'admin@example.com',
      pendingChanges: 0
    },
    {
      id: '4',
      name: 'Emily Wilson',
      email: 'emily@example.com',
      phone: '(555) 234-5678',
      role: 'User',
      status: 'Suspended',
      lastUpdated: '2023-07-05',
      updatedBy: 'admin@example.com',
      pendingChanges: 1
    },
    {
      id: '5',
      name: 'David Brown',
      email: 'david@example.com',
      phone: '(555) 876-5432',
      role: 'Editor',
      status: 'Active',
      lastUpdated: '2023-07-12',
      updatedBy: 'manager@example.com',
      pendingChanges: 0
    },
    {
      id: '6',
      name: 'Lisa Chen',
      email: 'lisa@example.com',
      phone: '(555) 345-6789',
      role: 'User',
      status: 'Pending',
      lastUpdated: '2023-07-19',
      updatedBy: 'admin@example.com',
      pendingChanges: 3
    },
  ]);

  // form state
  const [editForm, newEditForm] = useState({ name:'', email:'', phone:'', role:'', status:'' });
  const [newAccount, setNewAccount] = useState({ name:'', email:'', phone:'', role:'User', status:'Active' });

  // filter & sort
  const filtered = accounts.filter(a =>
    a.name.toLowerCase().includes(searchText.toLowerCase()) ||
    a.email.toLowerCase().includes(searchText.toLowerCase()) ||
    a.role.toLowerCase().includes(searchText.toLowerCase())
  );
  const sorted = [...filtered].sort((a,b) => {
    if (!sortConfig.key) return 0;
    const dir = sortConfig.direction === 'ascending' ? 1 : -1;
    if (a[sortConfig.key] < b[sortConfig.key]) return -1*dir;
    if (a[sortConfig.key] > b[sortConfig.key]) return  1*dir;
    return 0;
  });

  const handleSort = key => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // edit handlers
  const startEditing  = acc => { setEditingId(acc.id); newEditForm(acc); };
  const saveEditing   = id  => { setAccounts(accounts.map(a => a.id===id?{...a, ...editForm, lastUpdated:new Date().toISOString().split('T')[0]}:a)); setEditingId(null); };
  const cancelEditing = ()  => { setEditingId(null); };

  // delete handlers
  const confirmDelete = acc => { setSelectedAccount(acc); setIsDeleteModalOpen(true); };
  const executeDelete = ()  => { setAccounts(accs=>accs.filter(a=>a.id!==selectedAccount.id)); setIsDeleteModalOpen(false); };

  // add new
  const handleAddAccount = () => {
    const next = {
      ...newAccount,
      id: `${accounts.length+1}`,
      lastUpdated: new Date().toISOString().split('T')[0],
      updatedBy: 'admin',
      pendingChanges: 0
    };
    setAccounts(a=>[...a,next]);
    setIsAddModalOpen(false);
    setNewAccount({ name:'',email:'',phone:'',role:'User',status:'Active' });
  };

  const resetFilters = () => {
    setSearchText('');
    setShowFilters(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header & Stats */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Update Accounts</h1>
          <p className="text-gray-600">Manage and update user accounts</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label:'Total Accounts',   value:accounts.length, icon:<FiUser className="text-red-600"/> },
            { label:'Pending Updates',  value:accounts.filter(a=>a.pendingChanges>0).length, icon:<FiInfo className="text-red-600"/> },
            { label:'Updated Today',    value:accounts.filter(a=>a.lastUpdated===new Date().toISOString().split('T')[0]).length, icon:<FiRefreshCw className="text-red-600"/> },
            { label:'Need Verification',value:accounts.filter(a=>a.status==='Pending').length, icon:<FiMail className="text-red-600"/> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow border border-gray-200 flex items-center space-x-3">
              <div className="p-2 bg-red-50 rounded">{stat.icon}</div>
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
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>
            <input
              type="text"
              className="w-full pl-10 pr-3 py-2 border rounded focus:ring-red-500 focus:border-red-500"
              placeholder="Search accounts…"
              value={searchText}
              onChange={e=>setSearchText(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <button onClick={()=>setShowFilters(f=>!f)} className="flex items-center px-4 py-2 border rounded text-gray-700">
              <FiFilter className="mr-2"/> Filters
            </button>
            <button className="flex items-center px-4 py-2 border rounded text-gray-700">
              <FiDownload className="mr-2"/> Export
            </button>
            <button onClick={()=>setIsAddModalOpen(true)} className="flex items-center px-4 py-2 bg-red-600 text-white rounded">
              <FiPlus className="mr-2"/> Add Account
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="pt-4 border-t border-gray-200 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {['All Statuses','Active','Pending','Suspended'].map(status=>(
              <div key={status}>
                <label className="block text-sm font-medium">{status==='All Statuses'? status : `Status: ${status}`}</label>
                <select className="w-full border rounded focus:ring-red-500 focus:border-red-500 py-2 px-3">
                  {status==='All Statuses'
                    ? ['Active','Pending','Suspended'].map(s=><option key={s}>{s}</option>)
                    : <option>{status}</option>
                  }
                </select>
              </div>
            ))}
            <div className="flex items-end space-x-2">
              <button onClick={resetFilters} className="px-4 py-2 border rounded">Reset</button>
              <button className="px-4 py-2 bg-red-600 text-white rounded">Apply</button>
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                { key:'user',       label:'User' },
                { key:'role',       label:'Role', sortable:true },
                { key:'contact',    label:'Contact' },
                { key:'status',     label:'Status', sortable:true },
                { key:'lastUpdated',label:'Last Updated' },
                { key:'updatedBy',  label:'Updated By' },
                { key:'actions',    label:'Actions' },
              ].map(col=>(
                <th
                  key={col.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    col.sortable? 'cursor-pointer flex items-center':''
                  }`}
                  onClick={()=>col.sortable && handleSort(col.key)}
                >
                  {col.label}
                  {sortConfig.key===col.key && (
                    sortConfig.direction==='ascending'
                      ? <FiChevronUp className="ml-1 w-4 h-4"/>
                      : <FiChevronDown className="ml-1 w-4 h-4"/>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sorted.map(acc => (
              <tr key={acc.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-3">
                    <div className="bg-red-100 text-red-800 w-8 h-8 rounded-full flex items-center justify-center font-medium">
                      {acc.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      {editingId===acc.id
                        ? <input
                            type="text"
                            className="border rounded px-2 py-1 w-32"
                            value={editForm.name}
                            onChange={e=>newEditForm(f=>({...f,name:e.target.value}))}
                          />
                        : <p className="font-medium text-gray-900">{acc.name}</p>
                      }
                      <p className="text-sm text-gray-500">{acc.email}</p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingId===acc.id
                    ? <select
                        className="border rounded px-2 py-1"
                        value={editForm.role}
                        onChange={e=>newEditForm(f=>({...f,role:e.target.value}))}
                      >
                        {['User','Editor','Admin'].map(r=><option key={r}>{r}</option>)}
                      </select>
                    : acc.role
                  }
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingId===acc.id
                    ? <input
                        type="text"
                        className="border rounded px-2 py-1 w-32"
                        value={editForm.phone}
                        onChange={e=>newEditForm(f=>({...f,phone:e.target.value}))}
                      />
                    : acc.phone
                  }
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId===acc.id
                    ? <select
                        className="border rounded px-2 py-1"
                        value={editForm.status}
                        onChange={e=>newEditForm(f=>({...f,status:e.target.value}))}
                      >
                        {['Active','Pending','Suspended'].map(s=><option key={s}>{s}</option>)}
                      </select>
                    : <span className={`px-2 inline-flex text-xs font-semibold rounded-full ${
                        acc.status==='Active'
                          ? 'bg-green-100 text-green-800'
                          : acc.status==='Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {acc.status}
                      </span>
                  }
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {acc.lastUpdated}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {acc.updatedBy}
                </td>

                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  {editingId===acc.id ? (
                    <>
                      <button onClick={()=>saveEditing(acc.id)} className="flex items-center text-green-600 hover:text-green-800">
                        <FiCheck className="mr-1"/> Save
                      </button>
                      <button onClick={cancelEditing} className="flex items-center text-gray-600 hover:text-gray-800">
                        <FiX className="mr-1"/> Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={()=>startEditing(acc)} className="flex items-center text-indigo-600 hover:text-indigo-800">
                        <FiEdit2 className="mr-1"/> Edit
                      </button>
                      <button onClick={()=>confirmDelete(acc)} className="flex items-center text-red-600 hover:text-red-800">
                        <FiTrash2 className="mr-1"/> Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}

            {sorted.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                  No accounts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Add New Account</h3>
              <button onClick={()=>setIsAddModalOpen(false)}><FiX/></button>
            </div>
            <div className="px-6 py-4 space-y-4">
              {['name','email','phone'].map(field => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                  </label>
                  <input
                    type={field==='email'?'email':'text'}
                    value={newAccount[field]}
                    onChange={e=>setNewAccount(n=>({...n,[field]:e.target.value}))}
                    className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              ))}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Role</label>
                  <select
                    value={newAccount.role}
                    onChange={e=>setNewAccount(n=>({...n,role:e.target.value}))}
                    className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {['User','Editor','Admin'].map(r=><option key={r}>{r}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={newAccount.status}
                    onChange={e=>setNewAccount(n=>({...n,status:e.target.value}))}
                    className="w-full border rounded px-3 py-2 focus:ring-red-500 focus:border-red-500"
                  >
                    {['Active','Pending','Suspended'].map(s=><option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end space-x-2">
              <button onClick={()=>setIsAddModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={handleAddAccount} className="px-4 py-2 bg-red-600 text-white rounded">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && selectedAccount && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              <button onClick={()=>setIsDeleteModalOpen(false)}><FiX/></button>
            </div>
            <div className="px-6 py-4 space-y-4">
              <p>Are you sure you want to delete <strong>{selectedAccount.name}</strong>? This cannot be undone.</p>
              <div className="bg-red-50 p-3 rounded text-red-700 text-sm">
                Warning: this action will permanently remove the account.
              </div>
            </div>
            <div className="px-6 py-4 border-t flex justify-end space-x-2">
              <button onClick={()=>setIsDeleteModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              <button onClick={executeDelete} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateAccountsDashboard;
