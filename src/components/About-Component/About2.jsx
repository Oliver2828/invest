import React from 'react';
import phoneMockup from "../../assets/about.webp";

const About2 = () => {
  return (
    <div className="bg-gradient-to-br from-white to-red-50 text-gray-900 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Text Section */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="space-y-2">
            <span className="inline-block bg-red-100 text-red-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
              About Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-red-600 tracking-tight">
              Who <span className="text-red-800">we are</span>
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-red-500 to-red-700 rounded-full"></div>
          </div>

          <div className="space-y-6">
            <p className="text-lg leading-8 bg-white p-6 rounded-xl shadow-sm border border-red-50">
              We are an international investment firm with over 21 years of cumulative experience in the investment advisory industry. Our advisory investment strategy is driven by extensive expertise and we adopt the highest standards of risk management and both fundamental and technical analysis.
            </p>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-red-50">
              <h3 className="font-bold text-xl text-red-700 mb-3">Our Mission</h3>
              <p className="text-lg leading-8">
                Empowering your success is what we do. For more than 21 years, we've purpose-built our platform and services to help you trade effortlessly and better capitalize on winning market opportunities.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-6 rounded-xl border border-red-100">
              <h3 className="font-bold text-xl text-red-700 mb-3">Global Presence</h3>
              <p className="text-lg leading-8">
                We are an award-winning, multi-asset broker headquartered in the US, operating in 172 countries with more than 1,000 employees in over 30 global offices.
              </p>
            </div>
            
            <p className="text-lg leading-8 bg-white p-6 rounded-xl shadow-sm border border-red-50">
              Our simple and intuitive investment platform allows you to trade over 400 different instruments no matter where you are. Our ultra-fast execution, stable performance, and round-the-clock dedicated customer service support ensures you have the edge to win.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-lg font-medium text-gray-700 mb-6">
              <span className="font-bold text-red-600">Squarepay</span> app will be available on iOS and Android soon.
            </p>

            {/* Store Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="transform transition-transform hover:scale-105">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-14 w-auto rounded-lg shadow-md"
                />
              </div>
              <div className="transform transition-transform hover:scale-105">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-14 w-auto rounded-lg shadow-md"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className="w-full lg:w-1/2 flex justify-center relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl transform rotate-3 shadow-xl"></div>
            <img 
              src={phoneMockup} 
              alt="App Interface" 
              className="relative max-w-xs md:max-w-sm lg:max-w-md rounded-2xl shadow-2xl transform -rotate-1 border-8 border-white"
            />
          </div>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-red-200 opacity-40"></div>
          <div className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-red-300 opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default About2;