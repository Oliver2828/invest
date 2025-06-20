// === src/components/Register.jsx ===
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiUser, FiLock, FiEye, FiEyeOff, FiMail, FiPhone 
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaApple, FaFacebook } from 'react-icons/fa';

export const Register = () => {
  const [isLogin, setIsLogin] = useState(false); // Default to register view
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering...', formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url(./assets/log.jpg)] bg-no-repeat bg-center bg-cover p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-r from-red-600 to-red-800 w-16 h-16 rounded-full flex items-center justify-center">
              <FiUser className="text-white text-2xl" />
            </div>
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-red-800">
            InvestNow
          </h2>
          <p className="text-gray-200 mt-2">
            Create your investment account
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="p-1 bg-gradient-to-r from-red-600 to-red-800"></div>
          
          <div className="p-8">
            <div className="flex border-b border-gray-200 mb-6">
              <button
                className={`pb-3 px-4 font-medium relative ${isLogin ? 'text-red-700' : 'text-gray-500'}`}
                onClick={() => setIsLogin(true)}
              >
                Sign in
                {isLogin && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"
                    layoutId="authIndicator"
                  />
                )}
              </button>
              <button
                className={`pb-3 px-4 font-medium relative ${!isLogin ? 'text-red-700' : 'text-gray-500'}`}
                onClick={() => setIsLogin(false)}
              >
                Sign up
                {!isLogin && (
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600"
                    layoutId="authIndicator"
                  />
                )}
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4"
                    >
                      <label className="block text-gray-700 mb-2">Full Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-gray-400" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        
                          required
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mb-4"
                    >
                      <label className="block text-gray-700 mb-2">Phone Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPhone className="text-gray-400" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                          required
                        />
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>

              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                    ) : (
                      <FiEye className="text-gray-400 hover:text-gray-600" />
                    )}
                  </button>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  Use 8+ characters with a mix of letters, numbers & symbols
                </div>
              </div>

              {!isLogin && (
                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-red-600 rounded focus:ring-red-500 border-gray-300"
                      required
                    />
                    <span className="ml-2 text-gray-700">
                      I agree to the <a href="#" className="text-red-600 hover:underline">Terms of Service</a> and 
                      <a href="#" className="text-red-600 hover:underline"> Privacy Policy</a>
                    </span>
                  </label>
                </div>
              )}

              <motion.button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-lg font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </motion.button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                {isLogin ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="font-medium text-red-600 hover:underline"
                >
                  {isLogin ? 'Sign up now' : 'Sign in'}
                </button>
              </p>
            </div>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:shadow-sm hover:border-gray-300"
                >
                  <FcGoogle className="text-xl" />
                  <span className="mt-1 text-xs text-gray-500">Google</span>
                </motion.button>

                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:shadow-sm hover:border-gray-300"
                >
                  <FaApple className="text-xl text-gray-800" />
                  <span className="mt-1 text-xs text-gray-500">Apple</span>
                </motion.button>

                <motion.button
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 px-4 border border-gray-200 rounded-xl flex flex-col items-center justify-center transition-all duration-200 hover:shadow-sm hover:border-blue-500/20 hover:bg-blue-50/50"
                >
                  <FaFacebook className="text-xl text-blue-600" />
                  <span className="mt-1 text-xs text-gray-500">Facebook</span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>

        
      </div>
    </div>
  );
};
export default Register;