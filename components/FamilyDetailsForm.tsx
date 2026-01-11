
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

const COUNTRIES = ["AFGHANISTAN", "ALAND ISLANDS", "ALBANIA", "ALGERIA", "AMERICAN SAMOA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTARTICA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA & HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLAND", "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D'IVOIRE", "CROATIA", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "EAST TIMOR", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUADELOUPE", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI", "HEARD AND MCDONALD ISLANDS", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KOREA, NORTH", "KOREA, SOUTH", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MARTINIQUE", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MEXICO", "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NIUE", "NORFOLK ISLAND", "NORWAY", "OMAN", "PAKISTAN", "PALAU", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT HELENA", "SAINT KITTS AND NEVIS", "SAINT LUCIA", "SAINT PIERRE AND MIQUELON", "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TOKELAU", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS ISLANDS", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "URUGUAY", "UZBEKISTAN", "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS, BRITISH", "VIRGIN ISLANDS, U.S.", "WALLIS AND FUTUNA", "WESTERN SAHARA", "YEMEN", "ZAMBIA", "ZIMBABWE"];

const FamilyDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [formData, setFormData] = useState({
    // Present Address
    presHouse: '',
    presVillage: '',
    presCountry: '',
    presState: '',
    presZip: '',
    presPhone: '',
    presMobile: '',
    email: initialData.email || '',
    
    // Permanent Address
    isSameAddress: false,
    permHouse: '',
    permVillage: '',
    permState: '',
    
    // Father's Details
    fatherName: '',
    fatherNat: '',
    fatherBirthPlace: '',
    fatherBirthCountry: '',
    
    // Mother's Details
    motherName: '',
    motherNat: '',
    motherBirthPlace: '',
    motherBirthCountry: '',
    
    // Spouse's Details (Optional)
    maritalStatus: 'SINGLE',
    spouseName: '',
    spouseNat: '',
    spouseBirthPlace: '',
    spouseBirthCountry: '',
    
    // Grandparent's Details (Pakistan Origin)
    pakOrigin: 'No',
    pakOriginDetails: '',
    
    // Occupation Details
    occupation: '',
    employer: '',
    designation: '',
    occAddress: '',
    occPhone: '',
    prevOcc: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAction = () => {
    // Required fields check to ensure it "moves ahead" only if filled
    const required = ['presHouse', 'presVillage', 'presCountry', 'presState', 'presZip', 'presMobile', 'fatherName', 'motherName', 'occupation'];
    const missing = required.filter(f => !formData[f as keyof typeof formData]);
    
    if (missing.length > 0) {
      alert("Please fill all mandatory fields marked with *.");
      return;
    }
    
    navigate('/visa-details', { state: { ...initialData, ...formData } });
  };

  return (
    <div className="min-h-screen bg-[#dbe9f6] pb-10">
      <div className="container mx-auto max-w-6xl bg-white shadow-lg mt-4 overflow-hidden border border-gray-200">
        <div className="bg-[#81b3d5] py-2 px-4 flex justify-between items-center text-white font-bold text-lg uppercase shadow-inner">
          <div className="flex-grow text-center">Applicant's Address & Family Details</div>
          <button onClick={() => navigate('/')} className="bg-white p-0.5 rounded shadow-sm text-red-600 hover:bg-gray-100">
            <HomeIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="px-10 py-4">
          <div className="text-[13px] font-bold text-black">
            The Temporary Application ID : <span className="text-red-600 font-bold uppercase">{initialData.tempAppId || 'N/A'}</span>
          </div>
        </div>

        <div className="p-8 space-y-8 bg-white">
          {/* Present Address */}
          <div>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase">Present Address</div>
            <FormField label="House No./Street*" name="presHouse" value={formData.presHouse} onChange={handleChange} />
            <FormField label="Village/Town/City*" name="presVillage" value={formData.presVillage} onChange={handleChange} />
            <FormSelect label="Country*" name="presCountry" value={formData.presCountry} onChange={handleChange} options={COUNTRIES} />
            <FormField label="State/Province/District*" name="presState" value={formData.presState} onChange={handleChange} />
            <FormField label="Postal/Zip Code*" name="presZip" value={formData.presZip} onChange={handleChange} />
            <FormField label="Phone No." name="presPhone" value={formData.presPhone} onChange={handleChange} />
            <FormField label="Mobile No.*" name="presMobile" value={formData.presMobile} onChange={handleChange} />
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Email Address</label>
              <div className="w-2/3">
                <input value={formData.email} disabled className="w-1/2 border border-gray-300 p-0.5 px-2 text-[13px] bg-gray-50 text-black font-bold uppercase" />
              </div>
            </div>
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Click here for same address</label>
              <div className="w-2/3">
                <input type="checkbox" name="isSameAddress" checked={formData.isSameAddress} onChange={handleChange} />
              </div>
            </div>
          </div>

          {/* Permanent Address */}
          {!formData.isSameAddress && (
            <div>
              <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase">Permanent Address</div>
              <FormField label="House No./Street*" name="permHouse" value={formData.permHouse} onChange={handleChange} />
              <FormField label="Village/Town/City*" name="permVillage" value={formData.permVillage} onChange={handleChange} />
              <FormField label="State/Province/District*" name="permState" value={formData.permState} onChange={handleChange} />
            </div>
          )}

          {/* Father's Details */}
          <div>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase">Father's Details</div>
            <FormField label="Name*" name="fatherName" value={formData.fatherName} onChange={handleChange} />
            <FormSelect label="Nationality*" name="fatherNat" value={formData.fatherNat} onChange={handleChange} options={COUNTRIES} />
            <FormField label="Place of Birth" name="fatherBirthPlace" value={formData.fatherBirthPlace} onChange={handleChange} />
            <FormSelect label="Country of Birth" name="fatherBirthCountry" value={formData.fatherBirthCountry} onChange={handleChange} options={COUNTRIES} />
          </div>

          {/* Mother's Details */}
          <div>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase">Mother's Details</div>
            <FormField label="Name*" name="motherName" value={formData.motherName} onChange={handleChange} />
            <FormSelect label="Nationality*" name="motherNat" value={formData.motherNat} onChange={handleChange} options={COUNTRIES} />
            <FormField label="Place of Birth" name="motherBirthPlace" value={formData.motherBirthPlace} onChange={handleChange} />
            <FormSelect label="Country of Birth" name="motherBirthCountry" value={formData.motherBirthCountry} onChange={handleChange} options={COUNTRIES} />
          </div>

          {/* Occupation Details */}
          <div>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase">Occupation Details</div>
            <FormField label="Present Occupation*" name="occupation" value={formData.occupation} onChange={handleChange} />
            <FormField label="Employer Name/business*" name="employer" value={formData.employer} onChange={handleChange} />
            <FormField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            <FormField label="Address" name="occAddress" value={formData.occAddress} onChange={handleChange} />
            <FormField label="Phone No." name="occPhone" value={formData.occPhone} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-center gap-4 py-6 border-t border-gray-100 bg-gray-50">
          <button 
            onClick={handleAction} 
            className="bg-[#f0855c] text-white px-8 py-2 rounded-sm font-bold text-[14px] uppercase shadow-md hover:bg-[#e67e54]"
          >
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange }: any) => (
  <div className="flex items-center min-h-[30px] mb-2">
    <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">{label}</label>
    <div className="w-2/3">
      <input 
        type="text" 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="w-1/2 border border-gray-400 bg-white p-0.5 px-2 text-[13px] text-black font-medium outline-none focus:border-[#81b3d5]" 
      />
    </div>
  </div>
);

const FormSelect = ({ label, name, value, onChange, options }: any) => (
  <div className="flex items-center min-h-[30px] mb-2">
    <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">{label}</label>
    <div className="w-2/3">
      <select 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="w-1/2 border border-gray-400 bg-white p-0.5 px-1 text-[13px] text-black font-medium outline-none focus:border-[#81b3d5]"
      >
        <option value="">Select ..</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  </div>
);

export default FamilyDetailsForm;
