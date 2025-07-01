// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from './components/ChatBot';
import ScrollToTopButton from './components/ScrollTopButton';

// Page Components
import Home from "./pages/Home";
import About from "./pages/About";
import FixedIncome from "./pages/FixedIncome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FAQ from "./pages/FAQ";

// Dashboard Components
import DashboardLayout from "./pages/User/DashboardLayout";
import DashboardHome from "./components/UserDash-Components/DashboardHome";
import Portfolio from "./components/UserDash-Components/Portfolio";
import ActiveInvestments from "./components/UserDash-Components/ActiveInvestments";
import CompletedInvestments from "./components/UserDash-Components/CompletedInvestments";
import NewInvestment from "./components/UserDash-Components/NewInvestment";
import MarketData from "./components/UserDash-Components/MarketData";
import Security from "./components/UserDash-Components/Security";
import ProfileSettings from "./components/UserDash-Components/ProfileSettings";
import NotificationSettings from "./components/UserDash-Components/NotificationSettings";
import PaymentMethods from "./components/UserDash-Components/PaymentMethods";
import Statements from "./components/UserDash-Components/Statements";
import Support from "./components/UserDash-Components/Support";

import AdDashboard from "./pages/Admin/AdDashboard"
import AdDashboardHome from './components/AdDashboard-components/AdDashboardHome';
import Accounts from './components/AdDashboard-components/Accounts';
import UpdateAccounts from './components/AdDashboard-components/UpdateAccounts';
import DeactiveAccounts from './components/AdDashboard-components/DeactiveAccounts';

function AppContent() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith('/dashboard');

  useEffect(() => {
    const cleanup = () => {
      const oldBanner = document.querySelector("iframe.goog-te-banner-frame");
      if (oldBanner) {
        oldBanner.remove();
        document.body.style.top = "0";
      }
      document.querySelectorAll('iframe').forEach((iframe) => {
        const src = iframe.getAttribute('src') || "";
        if (src.includes("translate.google")) {
          iframe.remove();
        }
      });
    };

    const intervalId = setInterval(cleanup, 300);
    const timeoutId  = setTimeout(() => clearInterval(intervalId), 5000);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {!isDashboardRoute && <Navbar />}
      {!isDashboardRoute && <ChatBot />}
      <ScrollToTopButton />

      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/fixed-income" element={<FixedIncome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/faq" element={<FAQ />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="investments">
              <Route path="active" element={<ActiveInvestments />} />
              <Route path="completed" element={<CompletedInvestments />} />
              <Route path="new" element={<NewInvestment />} />
            </Route>
            <Route path="market" element={<MarketData />} />
            <Route path="security" element={<Security />} />
            <Route path="settings">
              <Route path="profile" element={<ProfileSettings />} />
              <Route path="notifications" element={<NotificationSettings />} />
              <Route path="payments" element={<PaymentMethods />} />
              <Route path="statements" element={<Statements />} />
            </Route>
            <Route path="support" element={<Support />} />
          </Route>

          <Route path="/admin" element={<AdDashboard />}>
            <Route index element={<AdDashboardHome />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="update" element={<UpdateAccounts />} />
            <Route path="deactive" element={<DeactiveAccounts />} />



            
          </Route>
        </Routes>
      </main>

      {!isDashboardRoute && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
