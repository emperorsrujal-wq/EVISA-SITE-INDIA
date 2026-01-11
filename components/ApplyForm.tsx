
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

const NATIONALITIES = [
  "ALBANIA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", 
  "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BOLIVIA", "BOSNIA & HERZEGOVINA", 
  "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLAND", 
  "CHILE", "CHINA", "COLOMBIA", "COMOROS", "COOK ISLANDS", "COSTA RICA", "COTE D'IVOIRE", "CROATIA", "CUBA", "CYPRUS", 
  "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "EAST TIMOR", "ECUADOR", "EL SALVADOR", 
  "EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "FIJI", "FINLAND", "FRANCE", "GABON", "GAMBIA", "GEORGIA", "GERMANY", 
  "GHANA", "GREECE", "GRENADA", "GUATEMALA", "GUINEA", "GUYANA", "HAITI", "HONDURAS", "HUNGARY", "ICELAND", "INDONESIA", 
  "IRELAND", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "LAOS", "LATVIA", 
  "LESOTHO", "LIBERIA", "LIBYE", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALI", "MALTA", 
  "MARSHALL ISLANDS", "MAURITIUS", "MEXICO", "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", 
  "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NETHERLANDS", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIUE ISLAND", "NORWAY", 
  "OMAN", "PALAU", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", 
  "REPUBLIC OF KOREA", "REPUBLIC OF MACEDONIA", "ROMANIA", "RUSSIA", "RWANDA", "SAINT CHRISTOPHER AND NEVIS", "SAINT LUCIA", 
  "SAINT VINCENT & THE GRENADINES", "SAMOA", "SAN MARINO", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", 
  "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOUTH AFRICA", "SPAIN", "SRI LANKA", "SURINAME", "SWAZILAND", "SWEDEN", 
  "SWITZERLAND", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TONGA", "TRINIDAD & TOBAGO", "TURKS & CAICOS ISLAND", 
  "TUVALU", "UAE", "UGANDA", "UKRAINE", "UNITED KINGDOM", "UNITED STATES", "URUGUAY", "UZBEKISTAN", "VANUATU", 
  "VATICAN CITY-HOLY SEE", "VENEZUELA", "VIETNAM", "ZAMBIA", "ZIMBABWE"
];

const PORTS_OF_ARRIVAL = [
  "AGATTI SEAPORT", "AHMEDABAD AIRPORT", "AMRITSAR AIRPORT", "BAGDOGRA AIRPORT", "BENGALURU AIRPORT", 
  "BHUBANESHWAR AIRPORT", "CALICUT AIRPORT", "CALICUT SEAPORT", "CHANDIGARH AIRPORT", "CHENNAI AIRPORT", 
  "CHENNAI SEAPORT", "COCHIN AIRPORT", "COCHIN SEAPORT", "COIMBATORE AIRPORT", "DELHI AIRPORT", 
  "GAYA AIRPORT", "GOA AIRPORT(DABOLIM)", "GOA AIRPORT (MOPA)", "GOA SEAPORT", "GUWAHATI AIRPORT", 
  "HYDERABAD AIRPORT", "INDORE AIRPORT", "JAIPUR AIRPORT", "KAMARAJAR SEAPORT", "KANDLA SEAPORT", 
  "KANNUR AIRPORT", "KATTUPALI SEAPORT", "KOLKATA AIRPORT", "KOLKATA SEAPORT", "LUCKNOW AIRPORT", 
  "MADURAI AIRPORT", "MANGALORE AIRPORT", "MANGALORE SEAPORT", "MUMBAI AIRPORT", "MUMBAI SEAPORT", 
  "MUNDRA SEAPORT", "NAGPUR AIRPORT", "NHAVA SHEVA SEAPORT", "PORTBLAIR AIRPORT", "PORTBLAIR SEAPORT", 
  "PUNE AIRPORT", "RAXAUL LANDPORT", "RUPAIDIHA LANDPORT", "SURAT AIRPORT", "TIRUCHIRAPALLI AIRPORT", 
  "TRIVANDRUM AIRPORT", "VALLARPADAM SEAPORT", "VARANASI AIRPORT", "VIJAYAWADA AIRPORT", 
  "VISHAKHAPATNAM AIRPORT", "VISHAKHAPATNAM SEAPORT"
];

const ApplyForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nationality: '',
    passportType: '',
    portOfArrival: '',
    dob: '',
    email: '',
    emailConfirm: '',
    visaService: '',
    arrivalDate: '',
    agreed: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const generateAppId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 15; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const handleContinue = () => {
    const required = ['nationality', 'passportType', 'portOfArrival', 'dob', 'email', 'emailConfirm', 'visaService', 'arrivalDate'];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);
    
    if (missing.length > 0) {
      alert("All fields are mandatory. Please fill all fields marked with *.");
      return;
    }

    if (formData.email !== formData.emailConfirm) {
      alert("Email IDs do not match.");
      return;
    }

    if (!formData.agreed) {
      alert("Please read and agree to the instructions by checking the box.");
      return;
    }
    
    const tempAppId = generateAppId();
    navigate('/applicant-details', { state: { ...formData, tempAppId } });
  };

  return (
    <div className="min-h-screen bg-[#dbe9f6] pb-10">
      <div className="container mx-auto max-w-5xl bg-white shadow-lg mt-4 overflow-hidden">
        
        <div className="relative h-32 flex items-center bg-white">
          <div className="w-1/4 flex justify-center pl-4">
            <div className="flex flex-col items-center">
              <span className="text-5xl font-bold italic leading-none">
                <span className="text-[#c62828]">e</span>
                <span className="text-[#1a237e] not-italic">Visa</span>
              </span>
              <div className="h-1 bg-green-700 w-full mt-1"></div>
            </div>
          </div>
          <div className="w-3/4 h-full relative overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80" 
               alt="Indian Heritage" 
               className="w-full h-full object-cover"
             />
             <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent w-32"></div>
          </div>
        </div>

        <div className="bg-[#81b3d5] py-1 px-4 flex justify-between items-center text-white font-bold text-lg border-b border-gray-200">
          <div className="flex-grow text-center uppercase tracking-wide">e-Visa Application</div>
          <button onClick={() => navigate('/')} className="bg-white p-0.5 rounded shadow-sm text-red-600 hover:bg-gray-100">
            <HomeIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="p-8 bg-white">
          <div className="max-w-4xl mx-auto space-y-3">
            <div className="flex items-start">
              <label className="w-[35%] text-right pr-4 pt-1 text-[13px] font-bold text-black">
                Nationality/Region<span className="text-red-600 font-bold">*</span>
              </label>
              <div className="w-[45%]">
                <select 
                  name="nationality" 
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-0.5 text-[13px] text-black outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Select Nationality</option>
                  {NATIONALITIES.map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-start">
              <label className="w-[35%] text-right pr-4 pt-1 text-[13px] font-bold text-black">
                Passport Type<span className="text-red-600 font-bold">*</span>
              </label>
              <div className="w-[45%]">
                <select 
                  name="passportType" 
                  value={formData.passportType}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-0.5 text-[13px] text-black outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Select Passport Type</option>
                  <option value="ORDINARY">ORDINARY PASSPORT</option>
                  <option value="OFFICIAL">OFFICIAL PASSPORT</option>
                  <option value="DIPLOMATIC">DIPLOMATIC PASSPORT</option>
                </select>
              </div>
            </div>

            <div className="flex items-start">
              <label className="w-[35%] text-right pr-4 pt-1 text-[13px] font-bold text-black">
                Port Of Arrival<span className="text-red-600 font-bold">*</span>
              </label>
              <div className="w-[45%]">
                <select 
                  name="portOfArrival" 
                  value={formData.portOfArrival}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-0.5 text-[13px] text-black outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Select Port Of Arrival</option>
                  {PORTS_OF_ARRIVAL.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-[35%] text-right pr-4 text-[13px] font-bold text-black">
                Date of Birth<span className="text-red-600 font-bold">*</span>
              </label>
              <div className="w-[45%] flex items-center">
                <input 
                  type="text" 
                  name="dob" 
                  placeholder="DD/MM/YYYY"
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-0.5 text-[13px] text-black outline-none focus:border-blue-500 bg-white"
                />
                <span className="ml-3 text-[11px] text-gray-700 font-bold">(DD/MM/YYYY)</span>
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-[35%] text-right pr-4 text-[13px] font-bold text-black">
                Email ID<span className="text-red-600 font-bold">*</span>
              </label>
              <div className="w-[45%]">
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-0.5 text-[13px] text-black outline-none focus:border-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-[35%] text-right pr-4 text-[13px] font-bold text-black">
                Re-enter Email ID<span className="text-red-600 font-bold">*</span>
              </label>
              <div className="w-[45%]">
                <input 
                  type="email" 
                  name="emailConfirm" 
                  value={formData.emailConfirm}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-0.5 text-[13px] text-black outline-none focus:border-blue-500 bg-white"
                />
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-[35%] text-right pr-4 text-[13px] font-bold text-black">
                Visa Service<span className="text-red-600 font-bold">*</span>
              </label>
              <div className="w-[45%]">
                <select 
                  name="visaService" 
                  value={formData.visaService}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-0.5 text-[13px] text-black outline-none focus:border-blue-500 bg-white"
                >
                  <option value="">Select Visa Service</option>
                  <option value="eTourist Visa (for 1 Year)">eTourist Visa (for 1 Year)</option>
                  <option value="eTourist Visa (for 30 Days)">eTourist Visa (for 30 Days)</option>
                  <option value="eTourist Visa (for 5 Years)">eTourist Visa (for 5 Years)</option>
                  <option value="eBusiness Visa">eBusiness Visa</option>
                  <option value="eMedical Visa">eMedical Visa</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <label className="w-[35%] text-right pr-4 text-[13px] font-bold text-black">
                Expected Date of Arrival<span className="text-red-600 font-bold">*</span>
              </label>
              <div className="w-[45%] flex items-center">
                <input 
                  type="text" 
                  name="arrivalDate" 
                  placeholder="DD/MM/YYYY"
                  value={formData.arrivalDate}
                  onChange={handleChange}
                  className="w-full border border-gray-400 p-0.5 text-[13px] text-black outline-none focus:border-blue-500 bg-white"
                />
                <span className="ml-3 text-[11px] text-gray-700 font-bold">(DD/MM/YYYY)</span>
              </div>
            </div>

            <div className="flex justify-center py-4">
              <div className="flex gap-2 max-w-xl">
                <input 
                  type="checkbox" 
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  className="mt-1"
                />
                <span className="text-[12px] text-black font-bold leading-tight">
                  I have read the instructions, I have all the required documents in scanned pdf format and photograph in jpg/jpeg format.
                </span>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <button 
                onClick={handleContinue}
                className="bg-[#f0855c] text-white px-8 py-1.5 rounded-sm font-bold text-[13px] uppercase shadow-sm hover:bg-[#e67e54]"
              >
                Continue
              </button>
            </div>
          </div>
        </div>

        <div className="bg-[#81b3d5] py-2 text-center text-white font-bold text-lg border-t border-gray-200 uppercase tracking-widest">
          e-Visa Application
        </div>
      </div>
    </div>
  );
};

export default ApplyForm;
