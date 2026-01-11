
import React from 'react';
import { Globe } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container mx-auto px-4 py-4">
        {/* Row of Partner Logos */}
        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 mb-6 opacity-90 border-b pb-4">
           {/* Mock Digital India */}
           <div className="flex flex-col items-center gap-1">
             <div className="h-8 w-24 bg-blue-500 rounded flex items-center justify-center text-[8px] text-white font-bold">DIGITAL PORTAL</div>
             <span className="text-[7px] font-bold text-blue-900">Power To Empower</span>
           </div>
           {/* Mock Swachh Bharat */}
           <div className="flex items-center gap-1">
             <div className="w-10 h-6 border-2 border-gray-400 rounded-full"></div>
             <div className="w-10 h-6 border-2 border-gray-400 rounded-full"></div>
             <span className="text-[8px] font-bold">Clean India</span>
           </div>
           {/* Mock India.gov.in */}
           <div className="text-[14px] font-serif font-bold text-red-600">india.portal.in</div>
           {/* Mock MyGov */}
           <div className="flex items-center gap-1">
             <div className="w-8 h-8 bg-orange-500 rounded-full text-white flex items-center justify-center font-bold text-[10px]">MY</div>
             <span className="text-[10px] font-bold text-blue-900">GOV</span>
           </div>
           {/* Mock 150 Gandhi */}
           <div className="flex flex-col items-center">
             <span className="text-xl font-bold text-orange-900">150</span>
             <span className="text-[6px] font-bold uppercase">Years of Celebration</span>
           </div>
        </div>

        {/* Content Info Bar */}
        <div className="bg-[#b3e5fc] p-3 text-center text-[11px] text-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-900 rounded-full flex items-center justify-center text-white">
              <Globe className="w-6 h-6" />
            </div>
            <div className="text-left leading-tight">
              <p>Content managed by Indian e-Visa Support Services</p>
              <p>Designed & Developed by Portal Tech Team</p>
              <p>Updated as on January 2024</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-24 bg-blue-700 flex items-center justify-center text-white font-bold text-[10px]">TECH CENTER</div>
            <p className="font-bold text-blue-900 uppercase">National Data Centre</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
