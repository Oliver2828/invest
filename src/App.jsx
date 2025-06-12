// === src/App.jsx ===
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from './components/ChatBot';

import Home from "./pages/Home";
import About from "./pages/About";
import MutualFunds from "./pages/MutualFunds";
import CryptoAssets from "./pages/CryptoAssets";
import FixedIncome from "./pages/FixedIncome";
import OpenAccount from "./pages/OpenAccount";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";

function App() {
   useEffect(() => {
    const cleanup = () => {
      // 1) Old code you already have:
      const oldBanner = document.querySelector("iframe.goog-te-banner-frame");
      if (oldBanner) {
        oldBanner.remove();
        document.body.style.top = "0";
      }

      // 2) New: scrub any iframe loading Google Translate
      document.querySelectorAll('iframe').forEach((iframe) => {
        const src = iframe.getAttribute('src') || "";
        if (src.includes("translate.google")) {
          iframe.remove();
        }
      });
    };

    // Run every half-second for a few seconds until Translate stops injecting
    const intervalId = setInterval(cleanup, 300);
    // After 5 seconds we can stop polling
    const timeoutId  = setTimeout(() => clearInterval(intervalId), 5000);

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <ChatBot />

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/mutual-funds" element={<MutualFunds />} />
            <Route path="/crypto-assets" element={<CryptoAssets />} />
            <Route path="/fixed-income" element={<FixedIncome />} />
            <Route path="/open-account" element={<OpenAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
