import React from 'react';
import teamImage from '../../assets/team.jpg';


export default function Home4() {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Section */}
      <div className="bg-gradient-to-br from-red-900/50 to-red-800/50 text-white flex-1 flex flex-col justify-center p-8 md:p-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          Start Investing with a leading regulated Hedge Fund
        </h1>
        <p className="mb-6 text-sm md:text-base max-w-md leading-relaxed">
          bitmap-official.com aims to simplify and enhance the experience of investing in Real Estate and cryptocurrencies. 
          We enable users to enter the crypto market with zero learning curve required, and we help construct diversified portfolios 
          with the aim to maximize returns while maintaining your preferred risk profile.
        </p>
        <p className="text-sm font-semibold">
          Gain your investing advantage with <span className="underline">bitmap-official.com</span>.
        </p>

        {/* WhatsApp Button */}
        <div className="mt-6">
          <a
            href="https://wa.me/0000000000" // Replace with your actual number
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white text-green-600 font-semibold px-4 py-2 rounded-full w-fit shadow hover:shadow-md transition duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.5 3.5C18.1 1.1 14.6 0 11.3 1.2 7.1 2.7 3.9 6.8 3.9 11.3c0 1.8.5 3.5 1.4 5l-1.5 4.3 4.4-1.4c1.4.8 3.1 1.3 4.8 1.3 4.5 0 8.6-3.2 10.1-7.4 1.3-3.3.2-6.9-2.6-9.3zM11.5 19c-1.4 0-2.8-.4-4-1.2l-.3-.2-2.6.8.8-2.5-.2-.3c-.8-1.2-1.3-2.6-1.3-4 0-3.7 2.6-7.2 6.3-8.3 2.8-.8 5.8 0 7.9 2 2.1 2.1 2.9 5.1 2 7.9-1.1 3.7-4.6 6.3-8.3 6.3z" />
            </svg>
            <span>Message us</span>
          </a>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="flex-1 relative">
        <img
          src={teamImage}
          alt="Team"
          className="object-cover w-full h-full transition-opacity duration-700"
        />

        {/* Chat Bubble Button */}
        <div className="absolute bottom-4 right-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition duration-300">
            Chat
          </button>
        </div>
      </div>
    </div>
  );
}
