// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";
import InvestorAlerts from "./Home-Component/InvestorAlerts";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const navLinks = [
    { name: "home", path: "/" },
    { name: "crypto_assets", path: "/crypto-assets" },
    { name: "about", path: "/about" },
    { name: "faq", path: "/faq" },
    { name: "buy_crypto", path: "/contact" }
  ];

  const changeLanguage = (lng) => i18n.changeLanguage(lng);

  const linkEntrance = {
    hidden: { y: -30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.1, type: "spring", stiffness: 300, damping: 20 },
    })
  };

  const linkHover = {
    scale: 1.1,
    color: "#FECACA",
    transition: { type: "spring", stiffness: 300 }
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <nav className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <InvestorAlerts />

        <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <motion.div animate={{ rotate: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="bg-red-500 rounded-full p-2 shadow-md shadow-red-900/50">
              <FiBriefcase size={20} />
            </motion.div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-red-100">
              InvestNow
            </span>
          </Link>
        </motion.div>

        <div className="hidden md:flex space-x-8 items-center">
          <motion.div className="flex space-x-8" variants={containerAnimation} initial="hidden" animate="visible">
            {navLinks.map((link, idx) => (
              <motion.div key={link.name} custom={idx} variants={linkEntrance} whileHover={linkHover} className="relative">
                <Link to={link.path} className="font-medium py-2 block">
                  {t(link.name)}
                </Link>
                <motion.div className="absolute bottom-0 left-0 h-0.5 bg-red-300" initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.3 }} />
              </motion.div>
            ))}
          </motion.div>

          <div className="flex space-x-4 ml-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/login" className="text-sm px-4 py-2 rounded-lg border border-red-300 hover:bg-red-800/50 transition-all duration-300">
                {t("login")}
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/register" className="text‑sm px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-500/30">
                {t("register")}
              </Link>
            </motion.div>

            <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language} className="text-black text-sm px-2 py-1 rounded-md bg-white ml-4">
              <option value="en">EN</option>
              <option value="es">ES</option>
              <option value="fr">FR</option>
            </select>
          </div>
        </div>

        <motion.button className="md:hidden text-white p-2 rounded-lg bg-red-700/60 backdrop-blur-sm" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height:0, opacity:0 }} transition={{ duration: 0.3 }} className="md:hidden bg-red-900/90 backdrop-blur-sm overflow-hidden">
            <motion.div className="flex flex-col space-y-1 px-4 pb-4 pt-2" variants={containerAnimation} initial="hidden" animate="visible">
              {navLinks.map((link, idx) => (
                <motion.div key={link.name} custom={idx} variants={linkEntrance}>
                  <Link to={link.path} onClick={() => setMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-red-800/50 transition-colors duration-300">
                    {t(link.name)}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={linkEntrance} custom={navLinks.length} className="pt-2">
                <hr className="border-red-700 my-2"/>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="block py-3 px-4 rounded-lg hover:bg-red-800/50 transition-colors duration-300">
                  {t("login")}
                </Link>
                <Link to="/register" onClick={() => setMenuOpen(false)} className="block py-3 px-4 mt-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-center font-medium shadow-lg shadow-red-500/30">
                  {t("register")}
                </Link>
                <div className="mt-4 px-4">
                  <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language} className="text-black text-sm px-2 py-1 rounded-md bg-white w-full">
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                  </select>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
