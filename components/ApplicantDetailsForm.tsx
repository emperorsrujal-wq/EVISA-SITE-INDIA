
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

const COUNTRIES = ["AFGHANISTAN", "ALAND ISLANDS", "ALBANIA", "ALGERIA", "AMERICAN SAMOA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTARTICA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA & HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLAND", "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D'IVOIRE", "CROATIA", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "EAST TIMOR", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUADELOUPE", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI", "HEARD AND MCDONALD ISLANDS", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KOREA, NORTH", "KOREA, SOUTH", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MARTINIQUE", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MEXICO", "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NIUE", "NORFOLK ISLAND", "NORWAY", "OMAN", "PAKISTAN", "PALAU", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT HELENA", "SAINT KITTS AND NEVIS", "SAINT LUCIA", "SAINT PIERRE AND MIQUELON", "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TOKELAU", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS ISLANDS", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "URUGUAY", "UZBEKISTAN", "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS, BRITISH", "VIRGIN ISLANDS, U.S.", "WALLIS AND FUTUNA", "WESTERN SAHARA", "YEMEN", "ZAMBIA", "ZIMBABWE"];
const RELIGIONS = ['BAHAI', 'BUDDHISM', 'CHRISTIANITY', 'HINDUISM', 'ISLAM', 'JAINISM', 'JEWISH', 'OTHERS', 'PARSI', 'SIKHISM', 'ZOROASTRIAN'];
const QUALIFICATIONS = ['BELOW MATRICULATION', 'GRADUATE', 'HIGHER SECONDARY', 'ILLITERATE', 'MATRICULATION', 'NA BEING MINOR', 'OTHERS', 'POST GRADUATE', 'PROFESSIONAL'];

const ApplicantDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [formData, setFormData] = useState({
    surname: '',
    givenName: '',
    gender: 'MALE',
    dob: initialData.dob || '',
    birthCity: '',
    birthCountry: '',
    nationalId: 'NA',
    religion: '',
    idMarks: '',
    qualification: '',
    university: '',
    passportNumber: '',
    placeIssue: '',
    dateIssue: '',
    dateExpiry: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAction = () => {
    const required = ['surname', 'givenName', 'passportNumber', 'placeIssue', 'dateIssue', 'dateExpiry', 'birthCity', 'birthCountry'];
    const missing = required.filter(f => !formData[f as keyof typeof formData]);
    if (missing.length > 0) {
      alert("Please fill all mandatory fields marked with *.");
      return;
    }
    navigate('/family-details', { state: { ...initialData, ...formData } });
  };

  return (
    <div className="min-h-screen bg-[#dbe9f6] pb-10">
      <div className="container mx-auto max-w-6xl bg-white shadow-lg mt-4 overflow-hidden border border-gray-200">
        <div className="bg-[#81b3d5] py-2 px-4 flex justify-between items-center text-white font-bold text-lg uppercase">
          <div className="flex-grow text-center">Applicant Details Form</div>
          <button onClick={() => navigate('/')} className="bg-white p-0.5 rounded shadow-sm text-red-600 hover:bg-gray-100"><HomeIcon className="w-4 h-4" /></button>
        </div>

        <div className="px-10 py-4 space-y-2">
          <p className="text-[14px] font-bold text-black">Port of Arrival : <span className="font-medium uppercase">{initialData.portOfArrival || 'N/A'}</span></p>
          <div className="text-[13px] font-bold text-black">
            Data saved Successfully. The Temporary Application ID : <span className="text-red-600 font-bold uppercase">{initialData.tempAppId || 'Generating...'}</span>
          </div>
        </div>

        <div className="p-8 space-y-6">
          <div className="bg-[#81b3d5] px-3 py-1 mb-4"><h3 className="text-[14px] font-bold text-white uppercase">Applicant Details</h3></div>
          <div className="grid grid-cols-1 gap-y-3">
            <FormField label="Surname (exactly as in Passport)*" name="surname" value={formData.surname} onChange={handleChange} />
            <FormField label="Given Name/s (exactly as in Passport)*" name="givenName" value={formData.givenName} onChange={handleChange} />
            <FormSelect label="Gender*" name="gender" value={formData.gender} onChange={handleChange} options={['MALE', 'FEMALE', 'TRANSGENDER']} />
            <FormField label="Town/City of birth*" name="birthCity" value={formData.birthCity} onChange={handleChange} />
            <FormSelect label="Country of birth*" name="birthCountry" value={formData.birthCountry} onChange={handleChange} options={COUNTRIES} />
            <FormSelect label="Religion*" name="religion" value={formData.religion} onChange={handleChange} options={RELIGIONS} />
            <FormSelect label="Educational Qualification*" name="qualification" value={formData.qualification} onChange={handleChange} options={QUALIFICATIONS} />
          </div>

          <div className="bg-[#81b3d5] px-3 py-1 mb-4 mt-8"><h3 className="text-[14px] font-bold text-white uppercase">Passport Details</h3></div>
          <div className="grid grid-cols-1 gap-y-3">
            <FormField label="Passport Number*" name="passportNumber" value={formData.passportNumber} onChange={handleChange} />
            <FormField label="Place of Issue*" name="placeIssue" value={formData.placeIssue} onChange={handleChange} />
            <FormField label="Date of Issue*" name="dateIssue" value={formData.dateIssue} onChange={handleChange} />
            <FormField label="Date of Expiry*" name="dateExpiry" value={formData.dateExpiry} onChange={handleChange} />
          </div>
        </div>

        <div className="flex justify-center py-6 border-t bg-gray-50">
          <button onClick={handleAction} className="bg-[#f0855c] text-white px-8 py-2 rounded-sm font-bold uppercase shadow-md hover:bg-[#e67e54]">Save and Continue</button>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange }: any) => (
  <div className="flex items-center min-h-[30px]">
    <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">{label}</label>
    <div className="w-2/3 flex items-center gap-4">
      <input type="text" name={name} value={value} onChange={onChange} className="w-1/2 border border-gray-400 bg-white p-0.5 px-2 text-[13px] text-black outline-none focus:border-[#81b3d5]" />
    </div>
  </div>
);

const FormSelect = ({ label, name, value, onChange, options }: any) => (
  <div className="flex items-center min-h-[30px]">
    <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">{label}</label>
    <div className="w-2/3 flex items-center gap-4">
      <select name={name} value={value} onChange={onChange} className="w-1/2 border border-gray-400 bg-white p-0.5 px-1 text-[13px] text-black outline-none focus:border-[#81b3d5]">
        <option value="">Select ..</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  </div>
);

export default ApplicantDetailsForm;
