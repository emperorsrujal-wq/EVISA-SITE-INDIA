
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

const COUNTRIES = ["AFGHANISTAN", "ALAND ISLANDS", "ALBANIA", "ALGERIA", "AMERICAN SAMOA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTARTICA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA & HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLAND", "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D'IVOIRE", "CROATIA", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "EAST TIMOR", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUADELOUPE", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI", "HEARD AND MCDONALD ISLANDS", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KOREA, NORTH", "KOREA, SOUTH", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MARTINIQUE", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MEXICO", "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NIUE", "NORFOLK ISLAND", "NORWAY", "OMAN", "PAKISTAN", "PALAU", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT HELENA", "SAINT KITTS AND NEVIS", "SAINT LUCIA", "SAINT PIERRE AND MIQUELON", "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TOKELAU", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS ISLANDS", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "URUGUAY", "UZBEKISTAN", "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS, BRITISH", "VIRGIN ISLANDS, U.S.", "WALLIS AND FUTUNA", "WESTERN SAHARA", "YEMEN", "ZAMBIA", "ZIMBABWE"];

const FamilyDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [formData, setFormData] = useState({
    // Address
    presHouse: '', presVillage: '', presCountry: '', presState: '', presZip: '', presPhone: '', presMobile: '',
    email: initialData.email || '',
    isSameAddress: false,
    permHouse: '', permVillage: '', permState: '',
    // Family
    fatherName: '', fatherNat: '', fatherPrevNat: '', fatherBirthPlace: '', fatherBirthCountry: '',
    motherName: '', motherNat: '', motherPrevNat: '', motherBirthPlace: '', motherBirthCountry: '',
    maritalStatus: '',
    spouseName: '', spouseNat: '', spousePrevNat: '', spouseBirthPlace: '', spouseBirthCountry: '',
    pakOrigin: 'No', pakOriginDetails: '',
    // Occupation
    occupation: '', employer: '', designation: '', occAddress: '', occPhone: '', pastOcc: '',
    isMilitary: 'No', militaryDetails: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAction = () => {
    const required = ['presHouse', 'presVillage', 'presCountry', 'presState', 'presZip', 'presMobile', 'fatherName', 'motherName', 'maritalStatus', 'occupation', 'employer'];
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
          <div className="flex-grow text-center">Applicant Details Form</div>
          <button onClick={() => navigate('/')} className="bg-white p-0.5 rounded shadow-sm text-red-600 hover:bg-gray-100">
            <HomeIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="flex justify-center gap-4 py-4 border-b">
          <button onClick={handleAction} className="bg-[#f0855c] text-white px-6 py-1.5 rounded-sm font-bold text-[13px] uppercase shadow hover:bg-[#e67e54]">Save and Continue</button>
          <button className="bg-[#f0855c] text-white px-6 py-1.5 rounded-sm font-bold text-[13px] uppercase shadow hover:bg-[#e67e54]">Save and Temporarily Exit</button>
        </div>

        <div className="px-10 py-4">
          <div className="text-[13px] font-bold text-black mb-2">
            The Temporary Application ID : <span className="text-red-600 font-bold uppercase">{initialData.tempAppId || 'N/A'}</span> , 
            <span className="text-blue-800 font-bold ml-1"> {initialData.visaService || 'Visa Service'}</span>
          </div>
          <p className="text-[11px] text-gray-600 font-bold">Your Information will be saved if you click save button or continue to next page. If you exit without doing either of that, your information will be lost.</p>
        </div>

        <div className="p-8 space-y-8 bg-white">
          <section>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase text-[14px]">Applicant's Address Details</div>
            <p className="text-orange-600 font-bold text-center text-[12px] mb-4">Present Address</p>
            <FormField label="House No./Street*" name="presHouse" value={formData.presHouse} onChange={handleChange} help="Applicant's Present Address. Maximum 35 characters (Each Line)" />
            <FormField label="Village/Town/City*" name="presVillage" value={formData.presVillage} onChange={handleChange} help="Village/Town/City" />
            <FormSelect label="Country*" name="presCountry" value={formData.presCountry} onChange={handleChange} options={COUNTRIES} />
            <FormField label="State/Province/District*" name="presState" value={formData.presState} onChange={handleChange} />
            <FormField label="Postal/Zip Code*" name="presZip" value={formData.presZip} onChange={handleChange} />
            <FormField label="Phone No." name="presPhone" value={formData.presPhone} help="One Contact No is Mandatory" />
            <FormField label="Mobile No.*" name="presMobile" value={formData.presMobile} onChange={handleChange} help="Mobile number." />
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Email Address</label>
              <div className="w-2/3">
                <input value={formData.email} disabled className="w-1/2 border border-gray-300 bg-gray-50 p-0.5 px-2 text-[13px] text-black font-bold uppercase" />
              </div>
            </div>

            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Click here for same address</label>
              <div className="w-2/3 flex items-center gap-2">
                <input type="checkbox" name="isSameAddress" checked={formData.isSameAddress} onChange={handleChange} />
                <span className="text-[12px] text-black font-bold">Click here for same address</span>
              </div>
            </div>

            {!formData.isSameAddress && (
              <div className="mt-4">
                <p className="text-orange-600 font-bold text-center text-[12px] mb-4 uppercase">Permanent Address</p>
                <FormField label="House No./Street*" name="permHouse" value={formData.permHouse} onChange={handleChange} help="Applicant's Permanent Address(with Postal/Zip Code)" />
                <FormField label="Village/Town/City*" name="permVillage" value={formData.permVillage} onChange={handleChange} help="Village/Town/City" />
                <FormField label="State/Province/District*" name="permState" value={formData.permState} onChange={handleChange} help="State/Province/District" />
              </div>
            )}
          </section>

          <section>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase text-[14px]">Family Details</div>
            <p className="text-orange-600 font-bold text-center text-[12px] mb-4 uppercase">Father's Details</p>
            <FormField label="Name*" name="fatherName" value={formData.fatherName} onChange={handleChange} help="Applicant's Father Name" />
            <FormSelect label="Nationality/Region*" name="fatherNat" value={formData.fatherNat} onChange={handleChange} options={COUNTRIES} />
            <FormSelect label="Previous Nationality/Region" name="fatherPrevNat" value={formData.fatherPrevNat} onChange={handleChange} options={COUNTRIES} />
            <FormField label="Place of Birth*" name="fatherBirthPlace" value={formData.fatherBirthPlace} onChange={handleChange} help="Place of birth" />
            <FormSelect label="Country/Region of birth*" name="fatherBirthCountry" value={formData.fatherBirthCountry} onChange={handleChange} options={COUNTRIES} />
            
            <p className="text-orange-600 font-bold text-center text-[12px] mb-4 uppercase mt-6">Mother's Details</p>
            <FormField label="Name*" name="motherName" value={formData.motherName} onChange={handleChange} help="Applicant's Mother Name" />
            <FormSelect label="Nationality/Region*" name="motherNat" value={formData.motherNat} onChange={handleChange} options={COUNTRIES} />
            <FormSelect label="Previous Nationality/Region" name="motherPrevNat" value={formData.motherPrevNat} onChange={handleChange} options={COUNTRIES} />
            <FormField label="Place of birth*" name="motherBirthPlace" value={formData.motherBirthPlace} onChange={handleChange} help="Place of birth" />
            <FormSelect label="Country/Region of birth*" name="motherBirthCountry" value={formData.motherBirthCountry} onChange={handleChange} options={COUNTRIES} />
            
            <FormSelect label="Applicant's Marital Status*" name="maritalStatus" value={formData.maritalStatus} onChange={handleChange} options={['SINGLE', 'MARRIED', 'DIVORCED', 'WIDOWED']} />
            
            {formData.maritalStatus === 'MARRIED' && (
              <div className="mt-4">
                <p className="text-orange-600 font-bold text-center text-[12px] mb-4 uppercase">Spouse's Details</p>
                <FormField label="Name*" name="spouseName" value={formData.spouseName} onChange={handleChange} />
                <FormSelect label="Nationality/Region*" name="spouseNat" value={formData.spouseNat} onChange={handleChange} options={COUNTRIES} />
                <FormSelect label="Previous Nationality/Region" name="spousePrevNat" value={formData.spousePrevNat} onChange={handleChange} options={COUNTRIES} />
                <FormField label="Place of birth*" name="spouseBirthPlace" value={formData.spouseBirthPlace} onChange={handleChange} />
                <FormSelect label="Country/Region of birth*" name="spouseBirthCountry" value={formData.spouseBirthCountry} onChange={handleChange} options={COUNTRIES} />
              </div>
            )}

            <div className="flex items-center min-h-[30px] mb-2 mt-6">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Were your Parents/Grandparents (paternal/maternal) Pakistan Nationals or Belong to Pakistan held area.*</label>
              <div className="w-2/3 flex items-center gap-4 text-black text-[13px] font-bold">
                 <label className="flex items-center gap-1"><input type="radio" name="pakOrigin" value="Yes" checked={formData.pakOrigin === 'Yes'} onChange={handleChange} /> Yes</label>
                 <label className="flex items-center gap-1"><input type="radio" name="pakOrigin" value="No" checked={formData.pakOrigin === 'No'} onChange={handleChange} /> No</label>
              </div>
            </div>
            {formData.pakOrigin === 'Yes' && <FormField label="If Yes, give details*" name="pakOriginDetails" value={formData.pakOriginDetails} onChange={handleChange} help="If Yes, give details" />}
          </section>

          <section>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase text-[14px]">Profession / Occupation Details of Applicant</div>
            <FormSelect label="Present Occupation*" name="occupation" value={formData.occupation} onChange={handleChange} options={['BUSINESS', 'CHARITY WORKER', 'GOVT SERVICE', 'HOUSEWIFE', 'OTHERS', 'PRIVATE SERVICE', 'PROFESSIONAL', 'RETIRED', 'STUDENT', 'UNEMPLOYED']} />
            <FormField label="Employer Name/business*" name="employer" value={formData.employer} onChange={handleChange} help="Employer Name / Business" />
            <FormField label="Designation" name="designation" value={formData.designation} onChange={handleChange} />
            <FormField label="Address*" name="occAddress" value={formData.occAddress} onChange={handleChange} />
            <FormField label="Phone" name="occPhone" value={formData.occPhone} onChange={handleChange} />
            <FormSelect label="Past Occupation, if any" name="pastOcc" value={formData.pastOcc} onChange={handleChange} options={['BUSINESS', 'GOVT SERVICE', 'OTHERS']} />
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Are/were you in a Military/Semi-Military/Police/Security. Organization?*</label>
              <div className="w-2/3 flex items-center gap-4 text-black text-[13px] font-bold">
                 <label className="flex items-center gap-1"><input type="radio" name="isMilitary" value="Yes" checked={formData.isMilitary === 'Yes'} onChange={handleChange} /> Yes</label>
                 <label className="flex items-center gap-1"><input type="radio" name="isMilitary" value="No" checked={formData.isMilitary === 'No'} onChange={handleChange} /> No</label>
              </div>
            </div>
          </section>
        </div>

        <div className="flex justify-center gap-4 py-6 border-t bg-gray-50">
          <button onClick={handleAction} className="bg-[#f0855c] text-white px-10 py-2 rounded-sm font-bold uppercase shadow-md hover:bg-[#e67e54]">Save and Continue</button>
          <button className="bg-[#f0855c] text-white px-10 py-2 rounded-sm font-bold uppercase shadow-md hover:bg-[#e67e54]">Save and Temporarily Exit</button>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange, help }: any) => (
  <div className="flex items-center min-h-[30px] mb-2">
    <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">{label}</label>
    <div className="w-2/3 flex items-center gap-4">
      <input type="text" name={name} value={value} onChange={onChange} className="w-1/2 border border-gray-400 bg-white p-0.5 px-2 text-[13px] text-black font-bold outline-none focus:border-[#81b3d5] shadow-sm" />
      {help && <span className="text-[12px] text-gray-700 font-medium leading-tight">{help}</span>}
    </div>
  </div>
);

const FormSelect = ({ label, name, value, onChange, options }: any) => (
  <div className="flex items-center min-h-[30px] mb-2">
    <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">{label}</label>
    <div className="w-2/3 flex items-center gap-4">
      <select name={name} value={value} onChange={onChange} className="w-1/2 border border-gray-400 bg-white p-0.5 px-1 text-[13px] text-black font-bold outline-none focus:border-[#81b3d5] shadow-sm">
        <option value="">Select ..</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  </div>
);

export default FamilyDetailsForm;
