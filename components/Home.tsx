
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, CreditCard, Mail, Plane, Search, ClipboardCheck, Printer, History, RefreshCcw, ExternalLink, Headphones } from 'lucide-react';

const Home: React.FC = () => {
  const sidebarLinks = [
    "Countries/Nationalities who are eligible to avail eVisa",
    "Instructions for Applicant",
    "FAQ's",
    "Payment Related",
    "Authorized Immigration checkposts through which eVisa holders can travel.",
    "Payment Helpdesk"
  ];

  const visaCategories = [
    "e-Tourist Visa", "e-Business Visa", "e-Conference Visa",
    "e-Medical Visa", "e-Medical Attendant Visa", "e-Ayush Visa",
    "e-Ayush Attendant Visa", "e-Student Visa", "e-Student Dependent Visa",
    "e-Transit Visa", "e-Mountaineering Visa", "e-Film Visa",
    "e-Entry Visa", "e-Production Investment Visa"
  ];

  return (
    <div className="container mx-auto px-4 py-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Sidebar (Col 3) */}
        <div className="lg:col-span-3 space-y-4">
          <div className="border border-[#b3e5fc]">
            {sidebarLinks.map((link, i) => (
              <div key={i} className="bg-[#b3e5fc] border-b border-white p-2 hover:bg-[#81d4fa] cursor-pointer text-[12px] font-bold text-gray-800 transition-colors">
                {link}
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-3 border border-[#b3e5fc] text-[11px] space-y-3">
            <div className="space-y-1">
              <p className="font-bold text-gray-700">SBI ePay: <span className="text-blue-800 font-normal">+91-22-2753-5773 (24 x 7)</span></p>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-gray-700">Axis Bank: <span className="text-blue-800 font-normal">+91 1800-419-0073 (24 x 7)</span></p>
              <p className="text-[10px] text-red-600 font-bold ml-16">Axis Toll free No.s from limited Countries:</p>
            </div>
            
            <div className="bg-[#b3e5fc] p-1 font-bold text-blue-900 border-b border-blue-200">
              eVisa Helpdesk
            </div>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden border border-blue-200">
                 <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=agent" alt="Helpdesk Agent" className="w-full h-full object-cover" />
              </div>
              <div className="text-[13px]">
                <p className="font-bold text-gray-800">(+91) 82 7808 7808</p>
                <p className="text-blue-800">indian-evisa@portal.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Center Process (Col 6) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="text-center">
            <h2 className="text-[16px] font-bold text-gray-700 mb-8 border-b pb-1 inline-block">E-VISA APPLICATION PROCESS</h2>
            
            <div className="flex justify-between items-start relative px-4">
              {/* Process Step 1 */}
              <div className="flex flex-col items-center w-1/4 relative">
                <div className="w-12 h-12 rounded-full bg-[#1e88e5] text-white flex items-center justify-center text-xl font-bold mb-3 z-10 shadow-md">1</div>
                <p className="text-[11px] font-bold text-gray-700">Apply online</p>
                <p className="text-[9px] text-gray-500">Upload Photo and Passport Page</p>
                {/* Connector Arrow SVG */}
                <div className="absolute top-4 -right-8 w-16 h-8 hidden md:block">
                   <svg viewBox="0 0 100 40" className="w-full h-full fill-none stroke-gray-300 stroke-2">
                     <path d="M0,20 Q50,0 100,20" markerEnd="url(#arrowhead)" />
                     <defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orientation="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#ccc" /></marker></defs>
                   </svg>
                </div>
              </div>

              {/* Process Step 2 */}
              <div className="flex flex-col items-center w-1/4 relative">
                <div className="w-12 h-12 rounded-full bg-[#1e88e5] text-white flex items-center justify-center text-xl font-bold mb-3 z-10 shadow-md">2</div>
                <p className="text-[11px] font-bold text-gray-700">Pay eVisa fee online</p>
                <p className="text-[9px] text-gray-500 text-center">Using Credit / Debit card / Payment Wallet</p>
                <div className="absolute top-4 -right-8 w-16 h-8 hidden md:block">
                   <svg viewBox="0 0 100 40" className="w-full h-full fill-none stroke-gray-300 stroke-2">
                     <path d="M0,20 Q50,40 100,20" markerEnd="url(#arrowhead)" />
                   </svg>
                </div>
              </div>

              {/* Process Step 3 */}
              <div className="flex flex-col items-center w-1/4 relative">
                <div className="w-12 h-12 rounded-full bg-[#1e88e5] text-white flex items-center justify-center text-xl font-bold mb-3 z-10 shadow-md">3</div>
                <p className="text-[11px] font-bold text-gray-700">Receive ETA Online</p>
                <p className="text-[9px] text-gray-500 text-center">Electronic Travel Authorization/ETA Will be sent to your e-mail</p>
                <div className="absolute top-4 -right-8 w-16 h-8 hidden md:block">
                   <svg viewBox="0 0 100 40" className="w-full h-full fill-none stroke-gray-300 stroke-2">
                     <path d="M0,20 Q50,0 100,20" markerEnd="url(#arrowhead)" />
                   </svg>
                </div>
              </div>

              {/* Process Step 4 */}
              <div className="flex flex-col items-center w-1/4">
                <div className="w-12 h-12 rounded-full bg-[#1e88e5] text-white flex items-center justify-center text-xl font-bold mb-3 shadow-md">4</div>
                <p className="text-[11px] font-bold text-gray-700">Fly To India</p>
                <p className="text-[9px] text-gray-500 text-center">Print ETA and present at Immigration Check Post where eVisa will be stamped on passport.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-[18px] font-bold text-red-600">Advisory</h3>
            <p className="text-[11px] text-gray-800 leading-tight">
              Indian e-Visa Portal makes no provision of charging of any emergency fees or additional fees for grant of any emergency / express e-visa. 
              Those travelling to India are also advised to go through instructions available on the website of Bureau of Immigration at 
              <span className="text-red-600 font-bold"> https://boi.gov.in</span>.
            </p>
            
            <h4 className="font-bold text-gray-800 text-[12px]">eVisa is admissable only under the following categories:</h4>
            <div className="grid grid-cols-3 gap-2">
              {visaCategories.map((cat, i) => (
                <div key={i} className="bg-[#e1f5fe] border border-white text-center py-2 px-1 text-[11px] font-bold text-gray-700 hover:bg-[#b3e5fc] cursor-pointer rounded-md">
                  {cat}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Info (Col 3) */}
        <div className="lg:col-span-3 space-y-6">
          <div className="text-[11px] text-gray-600 leading-normal border p-3 rounded bg-gray-50">
            If the applicant is unable to complete his e-visa application form, he may save the application and may return to complete the application form by clicking the tab at the bottom of page:
            <br/><br/>
            After your eVisa applications is submitted, the same shall be scrutinized and if any Document/Image is not appropriate, you may be advised on your given e-mail to re-upload the same. To re-upload use the tab at the bottom of the page. Applicant should normally receive this mail within 24 hours.
          </div>

          <div className="border border-[#b3e5fc] rounded overflow-hidden">
            <div className="bg-[#b3e5fc] p-2 text-[12px] font-bold text-blue-900 border-b">
              Useful Web Links
            </div>
            <ul className="text-[10px] p-3 space-y-2 bg-white list-disc list-inside font-bold text-gray-800">
              <li>Ministry of Home Affairs Portal</li>
              <li>Ministry of External Affairs</li>
              <li>Ministry of Tourism, India</li>
              <li>Bureau of Immigration Services</li>
              <li>Incredible India Official</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Actions Bar at Bottom */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 border border-[#b3e5fc] bg-[#f9f9f9]">
        {[
          { title: "Sample e-Visa Application", icon: <FileText className="w-6 h-6 text-blue-500" /> },
          { title: "Apply here for e-visa", icon: <ExternalLink className="w-6 h-6 text-blue-500" />, path: "/apply" },
          { title: "Complete Partially Filled Application Form", icon: <ClipboardCheck className="w-6 h-6 text-blue-500" /> },
          { title: "Verify Payment/ Pay e-Visa Fee", icon: <CreditCard className="w-6 h-6 text-blue-500" /> },
          { title: "Print e-Visa Application", icon: <Printer className="w-6 h-6 text-blue-500" /> },
          { title: "Check your Visa Status", icon: <History className="w-6 h-6 text-blue-500" /> },
          { title: "Reupload Data", icon: <RefreshCcw className="w-6 h-6 text-blue-500" /> },
        ].map((action, i) => (
          <Link 
            key={i} 
            to={action.path || "/"} 
            className="flex flex-col items-center justify-center p-3 text-center border-r border-[#b3e5fc] last:border-r-0 hover:bg-white transition-colors"
          >
            <div className="mb-2 p-1 border-2 border-blue-500 rounded-lg">{action.icon}</div>
            <span className="text-[10px] font-bold text-gray-800 leading-tight">{action.title}</span>
          </Link>
        ))}
      </div>

      {/* Technical Footer Message */}
      <div className="bg-[#b3e5fc] p-2 mt-2 rounded-sm text-center text-[10px] text-gray-700 font-bold border border-blue-200">
        Technical information for e-visa: This site is best viewed in Mozilla Firefox, Google Chrome, Internet Explorer (Windows) version 9.0 and above. 
        The applicant must also have Adobe Acrobat Reader version 7.0 or higher installed on your PC in order to download and print the completed application form. 
        This website is compatible with Android and IOS devices.
      </div>
    </div>
  );
};

export default Home;
