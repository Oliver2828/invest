// ...existing imports...
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import {
  FiHome, FiPieChart, FiDollarSign, FiTrendingUp,
  FiShield, FiSettings, FiHelpCircle, FiLogOut, FiChevronDown,
  FiUser, FiBell, FiMenu, FiX
} from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';

const IconButton = React.memo(({ onClick, label, children, className }) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`${className} p-2 rounded-full hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-red-500 transition-colors`}
  >
    {children}
  </button>
));

// SidebarContent now receives user and totalBalance as props
const SidebarContent = React.memo(
  ({
    closeSidebar,
    menuItems,
    activeSubmenu,
    toggleSubmenu,
    handleLogout,
    user,
    totalBalance,
    debugMessage // <-- add debug message prop
  }) => (
    <div
      className="w-64 h-full flex flex-col bg-gradient-to-b from-red-900 to-red-800 text-white shadow-xl"
      role="navigation"
    >
      <IconButton
        onClick={closeSidebar}
        label="Close sidebar"
        className="md:hidden absolute top-4 right-4 bg-red-800 hover:bg-red-700"
      >
        <FiX className="h-5 w-5" />
      </IconButton>

      {/* Fixed header section */}
      <div className="flex-shrink-0">
        <div className="p-6 border-b border-red-700 flex items-center space-x-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center">
              <FiUser className="h-6 w-6" />
            </div>
            <span className="absolute bottom-0 right-0 block w-4 h-4 bg-green-500 rounded-full border-2 border-red-900" />
          </div>
          <div>
            <p className="font-bold">
              {user?.name || 'Loading...'}
            </p>
            <p className="text-sm text-red-300">{user?.role || 'Investor'}</p>
            {debugMessage && (
              <p className="text-xs text-yellow-300 mt-2 break-all">{debugMessage}</p>
            )}
          </div>
        </div>

        <div className="p-4 border-b border-red-700">
          <div className="bg-gradient-to-r from-red-800/70 to-red-700/80 rounded-lg p-4 border border-red-600">
            <p className="text-red-300 text-sm">Total Balance</p>
            <p className="text-xl font-bold">
              {typeof totalBalance === 'number'
                ? `$${totalBalance.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}`
                : '...'}
            </p>
            <p className="flex items-center text-green-300 text-sm mt-1">
              <FiTrendingUp className="mr-1" /> +12.4% this month
            </p>
          </div>
        </div>
      </div>
      {/* ...rest of SidebarContent unchanged... */}
      {/* ... */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        <nav className="py-4 px-2">
          <ul className="space-y-1">
            {menuItems.map((item, idx) =>
              item.submenu ? (
                <li key={idx}>
                  <button
                    onClick={() => toggleSubmenu(item.name)}
                    aria-expanded={activeSubmenu === item.name}
                    className={`flex items-center w-full px-4 py-3 text-red-200 hover:bg-red-700 hover:text-white rounded-lg transition-all ${
                      activeSubmenu === item.name ? 'bg-red-700 text-white' : ''
                    }`}
                  >
                    <item.icon className="mr-3 text-lg" />
                    <span className="flex-1 text-left">{item.name}</span>
                    <motion.span
                      animate={{
                        rotate: activeSubmenu === item.name ? 180 : 0,
                      }}
                    >
                      <FiChevronDown />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {activeSubmenu === item.name && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-8 mt-1 space-y-1 overflow-hidden"
                      >
                        {item.submenu.map((sub, i2) => (
                          <li key={i2}>
                            <NavLink
                              to={sub.path}
                              className={({ isActive }) =>
                                `block px-3 py-2 text-sm rounded-lg transition-all ${
                                  isActive
                                    ? 'text-white font-medium bg-red-600'
                                    : 'text-red-300 hover:text-white hover:bg-red-700/50'
                                }`
                              }
                              onClick={closeSidebar}
                            >
                              {sub.name}
                            </NavLink>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={idx}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center px-4 py-3 rounded-lg transition-all ${
                        isActive
                          ? 'bg-gradient-to-r from-red-700 to-red-600 text-white border-l-4 border-white'
                          : 'text-red-200 hover:bg-red-700 hover:text-white'
                      }`
                    }
                    onClick={closeSidebar}
                  >
                    <item.icon className="mr-3 text-lg" />
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
      <div className="flex-shrink-0 p-4 border-t border-red-700">
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-200 hover:bg-red-700 hover:text-white rounded-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-white"
        >
          <FiLogOut className="mr-3 text-lg" />
          Logout
        </button>
      </div>
    </div>
  )
);

const Topbar = React.memo(({ toggleSidebar, pageTitle, user }) => (
  <header className="bg-white shadow-sm z-30 border-b border-red-100">
    <div className="flex items-center justify-between px-6 py-4">
      <div className="flex items-center space-x-4">
        <IconButton
          onClick={toggleSidebar}
          label="Open sidebar"
          className="md:hidden bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg"
        >
          <FiMenu className="h-6 w-6" />
        </IconButton>
        <h1 className="text-xl font-bold text-red-800">{pageTitle}</h1>
      </div>
      <div className="flex items-center space-x-4">
        <IconButton
          onClick={() => {}}
          label="Notifications"
          className="relative hover:bg-red-50"
        >
          <FiBell className="h-5 w-5 text-red-600" />
          <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full" />
        </IconButton>
        <div className="flex items-center space-x-2">
          <div className="mr-3 text-right hidden md:block">
            <p className="font-medium text-red-900">{user?.name || 'Loading...'}</p>
            <p className="text-sm text-red-600">{user?.email || ''}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-red-700 flex items-center justify-center text-white">
            <FiUser />
          </div>
        </div>
      </div>
    </div>
  </header>
));

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [user, setUser] = useState(null);
  const [totalBalance, setTotalBalance] = useState(null);
  const [debugMessage, setDebugMessage] = useState(''); // <-- add debug message state
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = useCallback(() => {
    navigate('/login');
  }, [navigate]);

  useEffect(() => {
    if (!isDesktop) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [location.pathname, isDesktop]);

  const toggleSubmenu = useCallback((menu) => {
    setActiveSubmenu((prev) => (prev === menu ? null : menu));
  }, []);

  // Fetch user data and total balance from backend
  useEffect(() => {
    const fetchUser = async () => {
      try {
        // setDebugMessage(''); // clear previous debug
        const email = localStorage.getItem('userEmail');
        if (!email) {
          // setDebugMessage('No userEmail found in localStorage.');
          setUser(null);
          setTotalBalance(null);
          return;
        }
        // setDebugMessage(`Fetching: /api/users/me?email=${encodeURIComponent(email)}`);
        const res = await fetch(
          `http://localhost:500/api/users/me?email=${encodeURIComponent(email)}`
        );
        if (!res.ok) {
          // setDebugMessage(`Fetch failed: ${res.status} ${res.statusText}`);
          setUser(null);
          setTotalBalance(null);
          return;
        }
        const data = await res.json();
        // setDebugMessage(`Fetched user: ${JSON.stringify(data)}`);
        setUser(data);
        // Calculate total balance from accounts
        if (Array.isArray(data.accounts)) {
          const total = data.accounts.reduce(
            (sum, acc) => sum + (acc.balance || 0),
            0
          );
          setTotalBalance(total);
        } else {
          setDebugMessage('No accounts array in user data.');
          setTotalBalance(null);
        }
      } catch (err) {
        setDebugMessage('Error: ' + err.message);
        setUser(null);
        setTotalBalance(null);
      }
    };
    fetchUser();
  }, []);

  const menuItems = useMemo(
    () => [
      { name: 'Dashboard', icon: FiHome, path: '/dashboard' },
      { name: 'Portfolio', icon: FiPieChart, path: '/dashboard/portfolio' },
      {
        name: 'Investments',
        icon: FiDollarSign,
        submenu: [
          { name: 'Active Investments', path: '/dashboard/investments/active' },
        
        ],
      },
      { name: 'Market Data', icon: FiTrendingUp, path: '/dashboard/market' },
      { name: 'Security', icon: FiShield, path: '/dashboard/security' },
      {
        name: 'Settings',
        icon: FiSettings,
        submenu: [
          { name: 'Profile', path: '/dashboard/settings/profile' },
          { name: 'Notifications', path: '/dashboard/settings/notifications' },
          { name: 'Statements', path: '/dashboard/settings/statements' },
        ],
      },
      { name: 'Support', icon: FiHelpCircle, path: '/dashboard/support' },
    ],
    []
  );

  const pageTitle = useMemo(() => {
    const parts = location.pathname.split('/');
    const last = parts[parts.length - 1];
    return last
      ? last.replace(/-/g, ' ').replace(/^\w/, (c) => c.toUpperCase())
      : 'Dashboard';
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <AnimatePresence>
        {sidebarOpen && !isDesktop && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="z-40">
        <AnimatePresence>
          {sidebarOpen && !isDesktop && (
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed h-full"
            >
              <SidebarContent
                closeSidebar={() => setSidebarOpen(false)}
                menuItems={menuItems}
                activeSubmenu={activeSubmenu}
                toggleSubmenu={toggleSubmenu}
                handleLogout={handleLogout}
                user={user}
                totalBalance={totalBalance}
                debugMessage={debugMessage}
              />
            </motion.div>
          )}
        </AnimatePresence>
        {isDesktop && (
          <div className="hidden md:block h-full">
            <SidebarContent
              closeSidebar={() => {}}
              menuItems={menuItems}
              activeSubmenu={activeSubmenu}
              toggleSubmenu={toggleSubmenu}
              handleLogout={handleLogout}
              user={user}
              totalBalance={totalBalance}
              debugMessage={debugMessage}
            />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <Topbar toggleSidebar={() => setSidebarOpen(true)} pageTitle={pageTitle} user={user} />
        <div className="flex-1 min-h-0 overflow-auto">
          <main className="p-4 md:p-6 bg-white" id="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}