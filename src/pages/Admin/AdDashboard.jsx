// src/pages/User/DashboardLayout.jsx
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

const SidebarContent = React.memo(({ closeSidebar, menuItems, activeSubmenu, toggleSubmenu, handleLogout }) => (
  <div className="w-64 h-full flex flex-col bg-gradient-to-b from-red-900 to-red-800 text-white shadow-xl" role="navigation">
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
          <p className="font-bold">Alex Morgan</p>
          <p className="text-sm text-red-300">Premium Investor</p>
        </div>
      </div>

      <div className="p-4 border-b border-red-700">
        <div className="bg-gradient-to-r from-red-800/70 to-red-700/80 rounded-lg p-4 border border-red-600">
          <p className="text-red-300 text-sm">Total Balance</p>
          <p className="text-xl font-bold">$42,689.50</p>
          <p className="flex items-center text-green-300 text-sm mt-1">
            <FiTrendingUp className="mr-1" /> +12.4% this month
          </p>
        </div>
      </div>
    </div>

    {/* Scrollable menu section */}
    <div className="flex-1 min-h-0 overflow-y-auto">
      <nav className="py-4 px-2">
        <ul className="space-y-1">
          {menuItems.map((item, idx) => (
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
                  <motion.span animate={{ rotate: activeSubmenu === item.name ? 180 : 0 }}>
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
          ))}
        </ul>
      </nav>
    </div>

    {/* Fixed footer section */}
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
));

const Topbar = React.memo(({ toggleSidebar, pageTitle }) => (
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
            <p className="font-medium text-red-900">Alex Morgan</p>
            <p className="text-sm text-red-600">alex@investnow.com</p>
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
    setActiveSubmenu(prev => (prev === menu ? null : menu));
  }, []);

  const menuItems = useMemo(() => [
    { name: ' Admin', icon: FiHome, path: '/admin' },
    { name: 'Accounts', icon: FiPieChart, path: '/admin/accounts' },
    { name: 'Update Accounts', icon: FiPieChart, path: '/admin/update' },
    { name: 'Simulation Control', icon: FiPieChart, path: '/admin/simulation-control' },
    { name: 'Portfolio Management', icon: FiDollarSign, path: '/admin/portfolio-management' },
     { name: 'Deactive Accounts', icon: FiPieChart, path: '/admin/deactive' },

    
  ], []);

  const pageTitle = useMemo(() => {
    const parts = location.pathname.split('/');
    const last = parts[parts.length - 1];
    return last ? last.replace(/-/g, ' ').replace(/^\w/, c => c.toUpperCase()) : 'Dashboard';
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
            />
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col min-h-0">
        <Topbar toggleSidebar={() => setSidebarOpen(true)} pageTitle={pageTitle} />
        <div className="flex-1 min-h-0 overflow-auto">
          <main className="p-4 md:p-6 bg-white" id="main-content">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}