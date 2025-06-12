// === src/components/Navbar.jsx ===
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FiBriefcase } from "react-icons/fi";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("EN");
  const languageRef = useRef(null);
  
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Mutual Funds", path: "/mutual-funds" },
    { name: "Fixed Income", path: "/fixed-income" },
    { name: "About", path: "/about" },
    { name: "FAQ", path: "/faq" },
  ];

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "ZH", name: "中文", flag: "🇨🇳" },
  ];

  // Close language dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setLanguageOpen(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Animation variants
  const linkEntrance = {
    hidden: { y: -30, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    }),
  };

  const linkHover = {
    scale: 1.1,
    color: "#FECACA", // Soft red for hover
    transition: { type: "spring", stiffness: 300 },
  };

  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const languageItem = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  };

  const handleLanguageSelect = (code) => {
  setCurrentLanguage(code);
  setLanguageOpen(false);

  const fromLang = "en";
  const toLang = code.toLowerCase();
  const cookieValue = `/${fromLang}/${toLang}`;

  document.cookie = `googtrans=${cookieValue}; path=/`;
  document.cookie = `googtrans=${cookieValue}; domain=${window.location.hostname}; path=/`;
  localStorage.setItem("forcedLanguage", toLang);

  setTimeout(() => {
    window.location.reload();
  }, 300);
};


  return (
    <nav className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="bg-red-500 text-white rounded-full p-2 shadow-md shadow-red-900/50"
            >
              <FiBriefcase size={20} />
            </motion.div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-red-100">
              InvestNow
            </span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 items-center">
          <motion.div
            className="flex space-x-8"
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
          >
            {navLinks.map((link, idx) => (
              <motion.div
                key={link.name}
                custom={idx}
                variants={linkEntrance}
                whileHover={linkHover}
                className="relative"
              >
                <Link to={link.path} className="font-medium py-2 block">
                  {link.name}
                </Link>
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-red-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Language Selector */}
          <div className="relative" ref={languageRef}>
            <motion.button
              className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-red-800/50 hover:bg-red-700/50 transition-all group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <Globe size={18} className="text-red-200 group-hover:text-white" />
              <span className="font-medium">{currentLanguage}</span>
              <motion.div
                animate={{ rotate: languageOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown size={18} className="text-red-200 group-hover:text-white" />
              </motion.div>
            </motion.button>
            
            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-48 bg-red-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-red-700"
                >
                  <div className="p-2">
                    <div className="text-xs uppercase text-red-300 px-3 py-1">Select Language</div>
                    <div className="space-y-1">
                      {languages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                            currentLanguage === lang.code
                              ? "bg-red-700 text-white"
                              : "hover:bg-red-700/50"
                          }`}
                          onClick={() => handleLanguageSelect(lang.code)}
                          variants={languageItem}
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-xl mr-3">{lang.flag}</span>
                          <span className="font-medium">{lang.name}</span>
                          {currentLanguage === lang.code && (
                            <span className="ml-auto text-green-400">✓</span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex space-x-4 ml-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/login"
                className="text-sm px-4 py-2 rounded-lg border border-red-300 hover:bg-red-800/50 transition-all duration-300"
              >
                Login
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/register"
                className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 transition-all duration-300 shadow-lg shadow-red-500/30"
              >
                Register
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {/* Language selector for mobile */}
          <div className="relative mr-2" ref={languageRef}>
            <motion.button
              className="flex items-center px-2 py-1 rounded-lg bg-red-800/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguageOpen(!languageOpen)}
            >
              <Globe size={18} className="text-red-200" />
            </motion.button>
            
            <AnimatePresence>
              {languageOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-40 bg-red-800/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-red-700"
                >
                  <div className="p-2">
                    <div className="text-xs uppercase text-red-300 px-3 py-1">Language</div>
                    <div className="space-y-1">
                      {languages.map((lang) => (
                        <motion.button
                          key={lang.code}
                          className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
                            currentLanguage === lang.code
                              ? "bg-red-700 text-white"
                              : "hover:bg-red-700/50"
                          }`}
                          onClick={() => handleLanguageSelect(lang.code)}
                          variants={languageItem}
                        >
                          <span className="text-xl mr-2">{lang.flag}</span>
                          <span className="font-medium text-sm">{lang.name}</span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <motion.button
            className="text-white p-2 rounded-lg bg-red-700/60 backdrop-blur-sm"
            whileHover={{ scale: 1.1, backgroundColor: "rgba(185, 28, 28, 0.8)" }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-red-900/90 backdrop-blur-sm overflow-hidden"
          >
            <motion.div 
              className="flex flex-col space-y-1 px-4 pb-4 pt-2"
              variants={containerAnimation}
              initial="hidden"
              animate="visible"
            >
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  custom={idx}
                  variants={linkEntrance}
                >
                  <Link
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className="block py-3 px-4 rounded-lg hover:bg-red-800/50 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <motion.div 
                variants={linkEntrance}
                custom={navLinks.length}
                className="pt-2"
              >
                <hr className="border-red-700 my-2" />
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-4 rounded-lg hover:bg-red-800/50 transition-colors duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 px-4 mt-2 rounded-lg bg-gradient-to-r from-red-500 to-red-700 text-center font-medium shadow-lg shadow-red-500/30"
                >
                  Register
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;