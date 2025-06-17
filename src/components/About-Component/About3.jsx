import React from "react";

export default function About3() {
  return (
    <div className="min-h-screen w-full bg-white px-6 py-10 md:px-24 md:py-20 text-[#333] font-sans flex flex-col md:flex-row gap-16">
      {/* Left Section - About InvestNow */}
      <div className="md:w-2/3 space-y-6">
        <h2 className="text-xl font-bold text-[#1e1e1e]">About InvestNow</h2>

        <p className="text-gray-700 leading-relaxed">
          <span className="font-semibold text-[#1e1e1e]">InvestNow</span> is a global investment hedge
          fund offering clients access to a nimble and powerful
          platform for investing in cryptocurrencies, stocks, real
          estate, bonds, indices, metaverse, and shares.
        </p>

        <p className="text-gray-700 leading-relaxed">
          With more than 16 years of market experience and
          headquartered in Houston, Texas, InvestNow now has
          over 1,000 staff across more than 30 global offices.
        </p>

        <p className="text-gray-700 leading-relaxed">
          InvestNow is more than a broker. It provides a
          trusted investment ecosystem that enables clients to
          achieve their own success in a faster and simpler manner.
        </p>

        <p className="text-gray-700 leading-relaxed">
          Be empowered to better capitalise on winning market
          opportunities when you trade smarter with
          <span className="text-[#1e1e1e] font-medium"> InvestNow</span>.
        </p>
      </div>

      {/* Right Section - Contact */}
      <div className="md:w-1/3 space-y-10">
        {/* Ratings */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/50/Trustpilot_Logo_2022.svg"
              alt="Trustpilot"
              className="h-5"
            />
            <div className="flex space-x-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <span key={i} className="text-green-500 text-xl">★</span>
                ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-yellow-500 font-bold text-lg">4.2</span>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
              alt="Google"
              className="h-5"
            />
            <span className="text-gray-600 text-sm">Customer Reviews</span>
          </div>
        </div>

        {/* Contact Us */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-[#1e1e1e]">Contact us</h2>
          <a
            href="mailto:support@investnow.com"
            className="text-blue-600 underline break-words"
          >
            support@investnow.com
          </a>
          <p className="text-gray-700 leading-relaxed">
            Ripon Rd, Harrogate, <br />
            North Yorkshire, United Kingdom
          </p>
        </div>
      </div>
    </div>
  );
}
