// === src/components/Footer.jsx ===
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  FiFacebook, 
  FiTwitter, 
  FiLinkedin, 
  FiInstagram,
  FiMail,
  FiBriefcase,
  FiPhone,
  FiMapPin,
  FiShield
} from "react-icons/fi";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", path: "/" },
        { name: "About Us", path: "/about" },
        { name: "Services", path: "/services" },
        { name: "FAQ", path: "/faq" },
        { name: "Contact", path: "/contact" },
      ]
    },
    {
      title: "Investment Products",
      links: [
        { name: "Mutual Funds", path: "/mutual-funds" },
        { name: "Crypto Assets", path: "/crypto-assets" },
        { name: "Fixed Income", path: "/fixed-income" },
        { name: "Stocks & ETFs", path: "/stocks" },
        { name: "Retirement Plans", path: "/retirement" },
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Disclosures", path: "/disclosures" },
        { name: "Compliance", path: "/compliance" },
      ]
    }
  ];

  const contactInfo = [
    { icon: <FiMail />, text: "support@investnow.com" },
    { icon: <FiPhone />, text: "+1 (800) 123-4567" },
    { icon: <FiMapPin />, text: "123 Financial District, New York, NY" }
  ];

  const socialLinks = [
    { icon: <FiFacebook />, url: "#" },
    { icon: <FiTwitter />, url: "#" },
    { icon: <FiLinkedin />, url: "#" },
    { icon: <FiInstagram />, url: "#" }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 text-white">
      {/* Wave divider */}
      <div className="w-full overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="fill-current text-white"
        >
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" />
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" />
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" />
        </svg>
      </div>

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Brand column */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center mb-6">
              <div className="bg-red-500 text-white rounded-full p-2 mr-3">
                <FiBriefcase className="text-xl" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-200 to-red-100">
                InvestNow
              </h2>
            </div>
            <p className="mb-6 text-red-100">
              Empowering your financial journey with innovative investment solutions and expert guidance to help you achieve your financial goals.
            </p>
            
            <div className="flex items-center space-x-2 mb-4">
              <FiShield className="text-red-300 text-xl" />
              <span className="text-sm text-red-200">
                SEC Registered • FINRA Member • SIPC Protected
              </span>
            </div>
            
            <div className="flex space-x-4 mt-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  className="bg-red-800/50 hover:bg-red-700 p-3 rounded-full transition-colors duration-300"
                  whileHover={{ 
                    scale: 1.1,
                    backgroundColor: "rgba(239, 68, 68, 0.7)" 
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links columns */}
          {footerLinks.map((section, index) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="text-lg font-bold mb-6 relative inline-block">
                {section.title}
                <motion.div 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-red-300"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                />
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <motion.li 
                    key={link.name}
                    variants={itemVariants}
                    whileHover={{ 
                      x: 5,
                      color: "#FECACA"
                    }}
                  >
                    <Link 
                      to={link.path} 
                      className="text-red-100 hover:text-white transition-colors duration-300 flex items-start"
                    >
                      <span className="mr-2 text-red-400">•</span>
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* Contact column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-bold mb-6 relative inline-block">
              Contact Us
              <motion.div 
                className="absolute bottom-0 left-0 w-full h-0.5 bg-red-300"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              />
            </h3>
            
            <ul className="space-y-4 mb-6">
              {contactInfo.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  variants={itemVariants}
                >
                  <span className="text-red-300 mt-1 mr-3">{item.icon}</span>
                  <span className="text-red-100">{item.text}</span>
                </motion.li>
              ))}
            </ul>
            
            <motion.div
              variants={itemVariants}
              className="mt-8"
            >
              <h4 className="font-medium mb-4 text-red-100">Stay Updated</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="px-4 py-2 w-full rounded-l-lg bg-red-800/50 text-white placeholder-red-300 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <motion.button
                  className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-700 rounded-r-lg font-medium"
                  whileHover={{ 
                    background: "linear-gradient(to right, #ef4444, #b91c1c)",
                    scale: 1.02
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  Subscribe
                </motion.button>
              </div>
              <p className="text-xs mt-2 text-red-200">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-red-800/50">
        <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-red-200 text-sm mb-4 md:mb-0">
            &copy; {currentYear} InvestNow Financial Inc. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            {["Terms", "Privacy", "Security", "Disclosures"].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-red-200 hover:text-white text-sm"
                whileHover={{ color: "#FECACA" }}
                transition={{ duration: 0.2 }}
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;