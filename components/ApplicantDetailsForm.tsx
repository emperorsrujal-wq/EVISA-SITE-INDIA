
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

const COUNTRIES = ["AFGHANISTAN", "ALAND ISLANDS", "ALBANIA", "ALGERIA", "AMERICAN SAMOA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTARTICA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA & HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLAND", "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D'IVOIRE", "CROATIA", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "EAST TIMOR", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUADELOUPE", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI", "HEARD AND MCDONALD ISLANDS", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KOREA, NORTH", "KOREA, SOUTH", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MARTINIQUE", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MEXICO", "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NIUE", "NORFOLK ISLAND", "NORWAY", "OMAN", "PAKISTAN", "PALAU", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT HELENA", "SAINT KITTS AND NEVIS", "SAINT LUCIA", "SAINT PIERRE AND MIQUELON", "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TOKELAU", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS ISLANDS", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "URUGUAY", "UZBEKISTAN", "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS, BRITISH", "VIRGIN ISLANDS, U.S.", "WALLIS AND FUTUNA", "WESTERN SAHARA", "YEMEN", "ZAMBIA", "ZIMBABWE"];
const RELIGIONS = ['BAHAI', 'BUDDHISM', 'CHRISTIANITY', 'HINDUISM', 'ISLAM', 'JAINISM', 'JUDAISM', 'OTHERS', 'PARSI', 'SIKHISM', 'ZOROASTRIAN'];
const QUALIFICATIONS = ['BELOW MATRICULATION', 'GRADUATE', 'HIGHER SECONDARY', 'ILLITERATE', 'MATRICULATION', 'NA BEING MINOR', 'OTHERS', 'POST GRADUATE', 'PROFESSIONAL'];

const ApplicantDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [formData, setFormData] = useState({
    surname: '',
    givenName: '',
    hasChangedName: false,
    prevSurname: '',
    prevGivenName: '',
    gender: '',
    dob: initialData.dob || '',
    birthCity: '',
    birthCountry: '',
    nationalId: 'NA',
    religion: '',
    idMarks: 'NONE',
    qualification: '',
    college: 'NONE',
    nationality: initialData.nationality || '',
    acquisitionMethod: '',
    prevNationality: '',
    livedTwoYears: 'No',
    passportNumber: '',
    placeIssue: '',
    dateIssue: '',
    dateExpiry: '',
    hasOtherPassport: 'No',
    otherCountry: '',
    otherPassportNo: '',
    otherDateIssue: '',
    otherPlaceIssue: '',
    otherNationality: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAction = () => {
    const required = ['surname', 'givenName', 'gender', 'birthCity', 'birthCountry', 'religion', 'qualification', 'passportNumber', 'placeIssue', 'dateIssue', 'dateExpiry'];
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

        <div className="px-10 py-4 space-y-1">
          <p className="text-[14px] font-bold text-black">Port of Arrival : <span className="font-medium uppercase">{initialData.portOfArrival || 'N/A'}</span></p>
          <div className="text-[13px] font-bold text-black">
            Data saved Successfully. The Temporary Application ID : <span className="text-red-600 font-bold uppercase">{initialData.tempAppId || 'Generating...'}</span> , 
            <span className="text-blue-800 font-bold ml-1"> {initialData.visaService || 'Visa Service'}</span>
          </div>
        </div>

        <div className="p-8 space-y-8 bg-white">
          <section>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase">Applicant Details</div>
            <FormField label="Surname (exactly as in your Passport)*" name="surname" value={formData.surname} onChange={handleChange} help="Surname/Family Name" />
            <FormField label="Given Name/s (exactly as in your Passport)*" name="givenName" value={formData.givenName} onChange={handleChange} help="Given Name/s" />
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Have you ever changed your name?</label>
              <div className="w-2/3 flex items-center gap-2">
                <input type="checkbox" name="hasChangedName" checked={formData.hasChangedName} onChange={handleChange} />
                <span className="text-[12px] text-black">If yes, click the box and give details.</span>
              </div>
            </div>

            {formData.hasChangedName && (
              <>
                <FormField label="Previous Surname" name="prevSurname" value={formData.prevSurname} onChange={handleChange} />
                <FormField label="Previous Given Name" name="prevGivenName" value={formData.prevGivenName} onChange={handleChange} />
              </>
            )}

            <FormSelect label="Gender*" name="gender" value={formData.gender} onChange={handleChange} options={['MALE', 'FEMALE', 'TRANSGENDER']} />
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Date of Birth*</label>
              <div className="w-2/3 flex items-center gap-4">
                <input type="text" name="dob" value={formData.dob} onChange={handleChange} placeholder="DD/MM/YYYY" className="w-1/2 border border-gray-400 bg-white p-0.5 px-2 text-[13px] text-black font-bold outline-none focus:border-[#81b3d5]" />
                <span className="text-[12px] text-black">DD/MM/YYYY format</span>
              </div>
            </div>

            <FormField label="Town/City of birth*" name="birthCity" value={formData.birthCity} onChange={handleChange} />
            <FormSelect label="Country/Region of birth*" name="birthCountry" value={formData.birthCountry} onChange={handleChange} options={COUNTRIES} />
            <FormField label="Citizenship/National Id No.*" name="nationalId" value={formData.nationalId} onChange={handleChange} help="If not applicable Please Type NA" />
            <FormSelect label="Religion*" name="religion" value={formData.religion} onChange={handleChange} options={RELIGIONS} />
            <FormField label="Visible identification marks*" name="idMarks" value={formData.idMarks} onChange={handleChange} />
            <FormSelect label="Educational Qualification*" name="qualification" value={formData.qualification} onChange={handleChange} options={QUALIFICATIONS} />
            <FormField label="Qualification acquired from College/University" name="college" value={formData.college} onChange={handleChange} />
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Nationality/Region</label>
              <div className="w-2/3">
                <input value={formData.nationality} disabled className="w-1/2 border border-gray-300 bg-gray-50 p-0.5 px-2 text-[13px] text-black font-bold uppercase" />
              </div>
            </div>

            <FormSelect label="Did you acquire Nationality by birth or by naturalization?*" name="acquisitionMethod" value={formData.acquisitionMethod} onChange={handleChange} options={['By Birth', 'Naturalization']} />
            <FormSelect label="Prev. Nationality/Region" name="prevNationality" value={formData.prevNationality} onChange={handleChange} options={COUNTRIES} />
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Have you lived for at least two years in the country where you are applying visa?*</label>
              <div className="w-2/3 flex items-center gap-4 text-black text-[13px] font-bold">
                 <label className="flex items-center gap-1"><input type="radio" name="livedTwoYears" value="Yes" checked={formData.livedTwoYears === 'Yes'} onChange={handleChange} /> Yes</label>
                 <label className="flex items-center gap-1"><input type="radio" name="livedTwoYears" value="No" checked={formData.livedTwoYears === 'No'} onChange={handleChange} /> No</label>
              </div>
            </div>
          </section>

          <section>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase mt-8">Passport Details</div>
            <FormField label="Passport Number*" name="passportNumber" value={formData.passportNumber} onChange={handleChange} />
            <FormField label="Place of Issue*" name="placeIssue" value={formData.placeIssue} onChange={handleChange} />
            <FormField label="Date of Issue*" name="dateIssue" value={formData.dateIssue} onChange={handleChange} help="DD/MM/YYYY format" />
            <FormField label="Date of Expiry*" name="dateExpiry" value={formData.dateExpiry} onChange={handleChange} help="DD/MM/YYYY format" />
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Any other valid Passport/Identity Certificate(IC) held?*</label>
              <div className="w-2/3 flex items-center gap-4 text-black text-[13px] font-bold">
                 <label className="flex items-center gap-1"><input type="radio" name="hasOtherPassport" value="Yes" checked={formData.hasOtherPassport === 'Yes'} onChange={handleChange} /> Yes</label>
                 <label className="flex items-center gap-1"><input type="radio" name="hasOtherPassport" value="No" checked={formData.hasOtherPassport === 'No'} onChange={handleChange} /> No</label>
              </div>
            </div>

            {formData.hasOtherPassport === 'Yes' && (
              <>
                <FormSelect label="Country of Issue*" name="otherCountry" value={formData.otherCountry} onChange={handleChange} options={COUNTRIES} />
                <FormField label="Passport/IC No.*" name="otherPassportNo" value={formData.otherPassportNo} onChange={handleChange} />
                <FormField label="Date of Issue*" name="otherDateIssue" value={formData.otherDateIssue} onChange={handleChange} />
                <FormField label="Place of Issue*" name="otherPlaceIssue" value={formData.otherPlaceIssue} onChange={handleChange} />
                <FormSelect label="Nationality mentioned therein*" name="otherNationality" value={formData.otherNationality} onChange={handleChange} options={COUNTRIES} />
              </>
            )}
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
      {help && <span className="text-[12px] text-gray-700 font-medium">{help}</span>}
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

export default ApplicantDetailsForm;
