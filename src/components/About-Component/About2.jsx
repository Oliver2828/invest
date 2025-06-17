import React from 'react';
import phoneMockup from "../../assets/phone-mockup.jpg";// Replace with actual image path

const About2 = () => {
  return (
    <div className="bg-gray-200 text-gray-800 p-6 md:p-12 flex flex-col lg:flex-row items-center gap-10">
      {/* Text Section */}
      <div className="w-full lg:w-1/2 space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-600">Who we are</h2>
        <p className="text-base md:text-lg leading-relaxed">
          We are an international investment firm with over 21 years of cumulative experience in the investment advisory industry.
          Our advisory investment strategy is driven by the extensive expertise and we adopt the highest standards of risk management
          and both fundamental and technical analysis. We use several diversified strategies and tools all with intent to minimize
          risk and maximize profits. We are distinguished by the integrity of our offering, our transparency, and our exceptional performance.
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          Empowering your success is what we do. For more than 21 years, we’ve purpose-built our platform and services to help you trade
          effortlessly and better capitalize on winning market opportunities. Our bitmap-official.com ecosystem is not only a place for
          you to invest in financial assets, but a place for you to learn, explore and connect with other like-minded investors.
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          We are an award-winning, multi-asset broker headquartered in the US, with over 21 years of market experience, operating in 172 countries.
          With more than 1,000 employees in over 30 global offices, we are there to support you in achieving your own success, faster and simpler.
          At Vantage, we hold ourselves to the highest regulatory and security standards so you can invest through us with absolute peace of mind.
        </p>

        <p className="text-base md:text-lg leading-relaxed">
          Our simple and intuitive investment platform allows you to trade over 400 different instruments no matter where you are. Our ultra-fast
          execution, stable performance, and round-the-clock dedicated customer service support ensures that with Vantage, you have the edge to win.
          Invest with an edge. Invest smarter @sitename.
        </p>

        <p className="text-base font-semibold">
          <span className="text-gray-700">bitmap-official.com</span> app will be available on iOS and Android soon.
        </p>

        {/* Store Badges */}
        <div className="flex gap-4 mt-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Get it on Google Play"
            className="w-36"
          />
          <img
            src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
            alt="Download on the App Store"
            className="w-36"
          />
        </div>
      </div>

      {/* Image Section */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <img src={phoneMockup} alt="App Interface" className="max-w-xs lg:max-w-md rounded-xl shadow-lg" />
      </div>
    </div>
  );
};

export default About2;
