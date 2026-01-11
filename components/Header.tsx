
import React from 'react';
import { Link } from 'react-router-dom';
import { Globe, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="w-full">
      {/* Top utility bar */}
      <div className="bg-[#b3e5fc] py-1 px-4 flex justify-between items-center text-xs">
        <Link to="/" className="bg-[#ff8a65] text-white px-2 py-1 rounded shadow-sm font-bold hover:bg-[#f4511e]">
          Back to Home Page
        </Link>
        <div className="flex gap-2 font-bold text-gray-700">
          <span className="cursor-pointer border border-gray-400 bg-white px-1">A+</span>
          <span className="cursor-pointer border border-gray-400 bg-white px-1">A</span>
          <span className="cursor-pointer border border-gray-400 bg-white px-1">A-</span>
        </div>
      </div>

      {/* Logo Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 items-center px-4 md:px-12 py-4 bg-white border-b">
        {/* Left: BOI Logo Style */}
        <div className="flex items-center gap-4 justify-center md:justify-start">
          <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center text-white p-2">
            <Globe className="w-10 h-10" />
          </div>
          <div className="text-left">
            <h2 className="text-[#1a237e] font-bold text-xs leading-tight">IMMIGRATION & TRAVEL</h2>
            <p className="text-gray-500 text-[10px]">Portal Services</p>
          </div>
        </div>

        {/* Center: Branding */}
        <div className="flex flex-col items-center py-4 md:py-0">
          <div className="text-gray-400 text-3xl font-serif">🏛️</div>
          <h1 className="text-xl font-bold text-gray-800 tracking-tight uppercase mt-1">INDIAN E-VISA PORTAL</h1>
        </div>

        {/* Right: e-Visa Logo Style */}
        <div className="flex items-center justify-center md:justify-end">
          <div className="relative flex items-center">
            <span className="text-5xl font-italic font-bold text-orange-500 italic">e</span>
            <div className="flex flex-col -ml-1">
              <span className="text-2xl font-bold text-blue-900 leading-none">Visa</span>
              <div className="h-1 bg-green-600 w-full mt-1"></div>
            </div>
            <div className="absolute -top-2 -right-4">
               <div className="w-8 h-1 bg-orange-500 transform rotate-12"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling/Static Banner matching screenshot */}
      <div className="bg-white text-red-600 text-[11px] py-1 px-4 font-bold text-left border-b leading-tight">
        <span className="text-blue-700">e-Visa on New AFGHAN Portal(https://indianvisaonline.gov.in/avisa) is for arrival information for e-Arrival card.</span>
        <br />
        <span className="text-blue-900 font-normal">Please complete and submit the <span className="text-red-600 font-bold">e-Arrival card</span> online within 72 hours before their arrival in India. This is for arrival information.</span>
      </div>
    </header>
  );
};

export default Header;
