
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Plus, Minus, X } from 'lucide-react';

const STATE_DISTRICT_MAP: Record<string, string[]> = {
  "ANDAMAN AND NICOBAR ISLANDS": ["NICOBAR", "NORTH AND MIDDLE ANDAMAN", "SOUTH ANDAMAN"],
  "ANDHRA PRADESH": ["ANANTAPUR", "CHITTOOR", "EAST GODAVARI", "GUNTUR", "KADAPA", "KRISHNA", "KURNOOL", "NELLORE", "PRAKASAM", "SREEKAKULAM", "VISAKHAPATNAM", "VIZIANAGARAM", "WEST GODAVARI"],
  "ARUNACHAL PRADESH": ["ANJAW", "CHANGALANG", "DIBANG VALLEY", "EAST KAMENG", "EAST SIANG", "ITANAGAR", "KURUNG KUMEY", "LOHIT", "LONGDING", "LOWER DIBANG VALLEY", "LOWER SUBANSIRI", "NAMSAI", "PAPUM PARE", "TAWANG", "TIRAP", "UPPER SIANG", "UPPER SUBANSIRI", "WEST KAMENG", "WEST SIANG"],
  "ASSAM": ["BAKSA", "BARPETA", "BISWANATH", "BONGAIGAON", "CACHAR", "CHARAIDEO", "CHIRANG", "DARRANG", "DHEMAJI", "DHUBRI", "DIBRUGARH", "DIMA HASAO", "GOALPARA", "GOLAGHAT", "HAILEKANDI", "HOJAI", "JORHAT", "KAMRUP", "KAMRUP METRO", "KARBI ANGLONG", "KARIMGANJ", "KOKRAJHAR", "LAKHIMPUR", "MAJULI", "MORIGAON", "NAGAON", "NALBARI", "SIVA SAGAR", "SONITPUR", "SOUTH SALMARA-MANKACHAR", "TINSUKIA", "UDALGURI", "WEST KARBI ANGLONG"],
  "BIHAR": ["ARARIA", "ARWAL", "AURANGABAD", "BANKA", "BEGUSARAI", "BHAGALPUR", "BHOJPUR", "BUXAR", "DARBHANGA", "EAST CHAMPARAN", "GAYA", "GOPALGANJ", "JAMUI", "JEHANABAD", "KAIMUR", "KATIHAR", "KHAGARIA", "KISHANGANJ", "LAKHISARAI", "MADHEPURA", "MADHUBANI", "MUNGER", "MUZAFFARPUR", "NALANDA", "NAWADA", "PATNA", "PURNIA", "ROHTAS", "SAHARSA", "SAMASTIPUR", "SARAN", "SHEIKHPURA", "SHEOHAR", "SITAMARHI", "SIWAN", "SUPAUL", "VAISHALI", "WEST CHAMPARAN"],
  "CHANDIGARH": ["CHANDIGARH"],
  "CHHATTISGARH": ["BALOD", "BALODA BAZAR", "BALRAMPUR", "BASTAR", "BEMETARA", "BIJAPUR", "BILASPUR", "DANTEWADA", "DHAMTARI", "DURG", "GARIABAND", "JANJGIR-CHAMPA", "JASHPUR", "KABIRDHAM", "KANKER", "KONDAGAON", "KORBA", "KOREA", "MAHASAMUND", "MUNGELI", "NARAYANPUR", "RAIGARH", "RAIPUR", "RAJNANDGAON", "SUKMA", "SURAJPUR", "SURGUJA"],
  "DELHI": ["CENTRAL DELHI", "EAST DELHI", "NEW DELHI", "NORTH DELHI", "NORTH EAST DELHI", "NORTH WEST DELHI", "SHAHDARA", "SOUTH DELHI", "SOUTH EAST DELHI", "SOUTH WEST DELHI", "WEST DELHI"],
  "GOA": ["NORTH GOA", "SOUTH GOA"],
  "GUJARAT": ["AHMEDABAD", "AMRELI", "ANAND", "ARAVALLI", "BANASKANTHA", "BHARUCH", "BHAVNAGAR", "BOTAD", "CHHOTA UDEPUR", "DAHOD", "DANGS", "DEVBHOOMI DWARKA", "GANDHINAGAR", "GIR SOMNATH", "JAMNAGAR", "JUNAGADH", "KUTCH", "KHEDA", "MAHISAGAR", "MEHSANA", "MORBI", "NARMADA", "NAVSARI", "PANCHMAHAL", "PATAN", "PORBANDAR", "RAJKOT", "SABARKANTHA", "SURAT", "SURENDRANAGAR", "TAPI", "VADODARA", "VALSAD"],
  "HARYANA": ["AMBALA", "BHIWANI", "CHARKHI DADRI", "FARIDABAD", "FATEHABAD", "GURUGRAM", "HISAR", "JHAJJAR", "JIND", "KAITHAL", "KARNAL", "KURUKSHETRA", "MAHENDRAGARH", "NUH", "PALWAL", "PANCHKULA", "PANIPAT", "REWARI", "ROHTAK", "SIRSA", "SONIPAT", "YAMUNANAGAR"],
  "HIMACHAL PRADESH": ["BILASPUR", "CHAMBA", "HAMIRPUR", "KANGRA", "KINNAUR", "KULLU", "LAHAUL AND SPITI", "MANDI", "SHIMLA", "SIRMAUR", "SOLAN", "UNA"],
  "JAMMU AND KASHMIR": ["ANANTNAG", "BANDIPORA", "BARAMULLA", "BUDGAM", "DODA", "GANDERBAL", "JAMMU", "KATHUA", "KISHTWAR", "KULGAM", "KUPWARA", "POONCH", "PULWAMA", "RAJOURI", "RAMBAN", "REASI", "SAMBA", "SHOPIAN", "SRINAGAR", "UDHAMPUR"],
  "JHARKHAND": ["BOKARO", "CHATRA", "DEOGHAR", "DHANBAD", "DUMKA", "EAST SINGHBHUM", "GARHWA", "GIRIDIH", "GODDA", "GUMLA", "HAZARIBAGH", "JAMTARA", "KHUNTI", "KODERMA", "LATEHAR", "LOHARDAGA", "PAKUR", "PALAMU", "RAMGARH", "RANCHI", "SAHIBGANJ", "SERAIKELA KHARSAWAN", "SIMDEGA", "WEST SINGHBHUM"],
  "KARNATAKA": ["BAGALKOT", "BALLARI", "BELAGAVI", "BENGALURU RURAL", "BENGALURU URBAN", "BIDAR", "CHAMARAJANAGAR", "CHIKKABALLAPUR", "CHIKKAMAGALURU", "CHITRADURGA", "DAKSHINA KANNADA", "DAVANAGERE", "DHARWAD", "GADAG", "HASSAN", "HAVERI", "KALABURAGI", "KODAGU", "KOLAR", "KOPPAL", "MANDYA", "MYSURU", "RAICHUR", "RAMANAGARA", "SHIVAMOGGA", "TUMAKURU", "UDUPI", "UTTARA KANNADA", "VIJAYAPURA", "YADGIR"],
  "KERALA": ["ALAPPUZHA", "ERNAKULAM", "IDUKKI", "KANNUR", "KASARAGOD", "KOLLAM", "KOTTAYAM", "KOZHIKODE", "MALAPPURAM", "PALAKKAD", "PATHANAMTHITTA", "THIRUVANANTHAPURAM", "THRISSUR", "WAYANAD"],
  "LADAKH": ["KARGIL", "LEH"],
  "LAKSHADWEEP": ["LAKSHADWEEP"],
  "MADHYA PRADESH": ["AGAR MALWA", "ALIRAJPUR", "ANUPPUR", "ASHOKNAGAR", "BALAGHAT", "BARWANI", "BETUL", "BHIND", "BHOPAL", "BURHANPUR", "CHHATARPUR", "CHHINDWARA", "DAMOH", "DATIA", "DEWAS", "DHAR", "DINDORI", "GUNA", "GWALIOR", "HARDA", "HOSHANGABAD", "INDORE", "JABALPUR", "JHABUA", "KATNI", "KHANDWA", "KHARGONE", "MANDLA", "MANDSAUR", "MORENA", "NARSINGHPUR", "NEEMUCH", "PANNA", "RAISEN", "RAJGARH", "RATLAM", "REWA", "SAGAR", "SATNA", "SEHORE", "SEONI", "SHAHDOL", "SHAJAPUR", "SHEOPUR", "SHIVPURI", "SIDHI", "SINGRAULI", "TIKAMGARH", "UJJAIN", "UMARIA", "VIDISHA"],
  "MAHARASHTRA": ["AHMEDNAGAR", "AKOLA", "AMRAVATI", "AURANGABAD", "BEED", "BHANDARA", "BULDHANA", "CHANDRAPUR", "DHULE", "GADCHIROLI", "GONDIA", "HINGOLI", "JALGAON", "JALNA", "KOLHAPUR", "LATUR", "MUMBAI CITY", "MUMBAI SUBURBAN", "NAGPUR", "NANDED", "NANDURBAR", "NASHIK", "OSMANABAD", "PALGHAR", "PARBHANI", "PUNE", "RAIGAD", "RATNAGIRI", "SANGLI", "SATARA", "SINDHUDURG", "SOLAPUR", "THANE", "WARDHA", "WASHIM", "YAVATMAL"],
  "MANIPUR": ["BISHNUPUR", "CHANDEL", "CHURACHANDPUR", "IMPHAL EAST", "IMPHAL WEST", "JIRIBAM", "KAKCHING", "KAMJONG", "KANGPOKPI", "NONEY", "PHERZAWL", "SENAPATI", "TAMENGLONG", "TENGNOUPAL", "THOUBAL", "UKHRUL"],
  "MEGHALAYA": ["EAST GARO HILLS", "EAST JAINTIA HILLS", "EAST KHASI HILLS", "NORTH GARO HILLS", "RI BHOI", "SOUTH GARO HILLS", "SOUTH WEST GARO HILLS", "SOUTH WEST KHASI HILLS", "WEST GARO HILLS", "WEST JAINTIA HILLS", "WEST KHASI HILLS"],
  "MIZORAM": ["AIZAWL", "CHAMPHAI", "HNAHTHIAL", "KHAWZAWL", "KOLASIB", "LAWNGTLAI", "LUNGLEI", "MAMIT", "SAIHA", "SAITUAL", "SERCHHIP"],
  "NAGALAND": ["DIMAPUR", "KIPHIRE", "KOHIMA", "LONGLENG", "MOKOKCHUNG", "MON", "NOKLAK", "PEREN", "PHEK", "TUENSANG", "WOKHA", "ZUNHEBOTO"],
  "ODISHA": ["ANGUL", "BALANGIR", "BALASORE", "BARGARH", "BHADRAK", "BOUDH", "CUTTACK", "DEOGARH", "DHENKANAL", "GAJAPATI", "GANJAM", "JAGATSINGHPUR", "JAJPUR", "JHARSUGUDA", "KALAHANDI", "KANDHAMAL", "KENDRAPARA", "KENDUJHAR", "KHORDHA", "KORAPUT", "MALKANGIRI", "MAYURBHANJ", "NABARANGPUR", "NAYAGARH", "NUAPADA", "PURI", "RAYAGADA", "SAMBALPUR", "SUBARNAPUR", "SUNDARGARH"],
  "PUDUCHERRY": ["KARAIKAL", "MAHE", "PUDUCHERRY", "YANAM"],
  "PUNJAB": ["AMRITSAR", "BARNALA", "BATHINDA", "FARIDKOT", "FATEHGARH SAHIB", "FAZILKA", "FEROZEPUR", "GURDASPUR", "HOSHIARPUR", "JALANDHAR", "KAPURTHALA", "LUDHIANA", "MANSA", "MOGA", "MUKTSAR", "PATHANKOT", "PATIALA", "RUPNAGAR", "SAHIBZADA AJIT SINGH NAGAR", "SANGRUR", "SHAHID BHAGAT SINGH NAGAR", "TARN TARAN"],
  "RAJASTHAN": ["AJMER", "ALWAR", "BANSWARA", "BARAN", "BARMER", "BHARATPUR", "BHILWARA", "BIKANER", "BUNDI", "CHITTORGARH", "CHURU", "DAUSA", "DHOLPUR", "DUNGARPUR", "HANUMANGARH", "JAIPUR", "JAISALMER", "JALORE", "JHALAWAR", "JHUNJHUNU", "JODHPUR", "KARAULI", "KOTA", "NAGAUR", "PALI", "PRATAPGARH", "RAJSAMAND", "SAWAI MADHOPUR", "SIKAR", "SIROHI", "SRI GANGANAGAR", "TONK", "UDAIPUR"],
  "SIKKIM": ["EAST SIKKIM", "NORTH SIKKIM", "SOUTH SIKKIM", "WEST SIKKIM"],
  "TAMIL NADU": ["ARIYALUR", "CHENNAI", "COIMBATORE", "CUDDALORE", "DHARMAPURI", "DINDIGUL", "ERODE", "KANCHIPURAM", "KANYAKUMARI", "KARUR", "KRISHNAGIRI", "MADURAI", "NAGAPATTINAM", "NAMAKKAL", "NILGIRIS", "PERAMBALUR", "PUDUKKOTTAI", "RAMANATHAPURAM", "SALEM", "SIVAGANGA", "THANJAVUR", "THENI", "THOOTHUKUDI", "TIRUCHIRAPPALLI", "TIRUNELVELI", "TIRUPPUR", "TIRUVALLUR", "TIRUVANNAMALAI", "TIRUVARUR", "VELLORE", "VILUPPURAM", "VIRUDHUNAGAR"],
  "TELANGANA": ["ADILABAD", "BHADRADRI KOTHAGUDEM", "HYDERABAD", "JAGTIAL", "JANGAON", "JAYASHANKAR BHUPALPALLY", "JOGULAMBA GADWAL", "KAMAREDDY", "KARIMNAGAR", "KHAMMAM", "KUMURAM BHEEM ASIFABAD", "MAHABUBABAD", "MAHABUBNAGAR", "MANCHERIAL", "MEDAK", "MEDCHAL-MALKAJGIRI", "MULUGU", "NAGARKURNOOL", "NALGONDA", "NARAYANPET", "NIRMAL", "NIZAMABAD", "PEDDAPALLI", "RAJANNA SIRCILLA", "RANGA REDDY", "SANGAREDDY", "SIDDIPET", "SURYAPET", "VIKARABAD", "WANAPARTHY", "WARANGAL RURAL", "WARANGAL URBAN", "YADADRI BHUVANAGIRI"],
  "TRIPURA": ["DHALAI", "GOMATI", "KHOWAI", "NORTH TRIPURA", "SEPAHIJALA", "SOUTH TRIPURA", "UNAKOTI", "WEST TRIPURA"],
  "UTTAR PRADESH": ["AGRA", "ALIGARH", "ALLAHABAD", "AMBEDKAR NAGAR", "AMETHI", "AMROHA", "AURAIYA", "AZAMGARH", "BAGHPAT", "BAHRAICH", "BALLIA", "BALRAMPUR", "BANDA", "BARABANKI", "BAREILLY", "BASTI", "BHADOHI", "BIJNOR", "BUDAUN", "BULANDSHAHR", "CHANDAULI", "CHITRAKOOT", "DEORIA", "ETAH", "ETAWAH", "FAIZABAD", "FARRUKHABAD", "FATEHPUR", "FIROZABAD", "GAUTAM BUDDHA NAGAR", "GHAZIABAD", "GHAZIPUR", "GONDA", "GORAKHPUR", "HAMIRPUR", "HAPUR", "HARDOI", "HATHRAS", "JALAUN", "JAUNPUR", "JHANSI", "KANNAUJ", "KANPUR DEHAT", "KANPUR NAGAR", "KASGANJ", "KAUSHAMBI", "KHERI", "KUSHINAGAR", "LALITPUR", "LUCKNOW", "MAHARAJGANJ", "MAHOBA", "MAINPURI", "MATHURA", "MAU", "MEERUT", "MIRZAPUR", "MORADABAD", "MUZAFFARNAGAR", "PILIBHIT", "PRATAPGARH", "RAE BARELI", "RAMPUR", "SAHARANPUR", "SAMBHAL", "SANT KABIR NAGAR", "SHAHJAHANPUR", "SHAMLI", "SHRAVASTI", "SIDDHARTHNAGAR", "SITAPUR", "SONBHADRA", "SULTANPUR", "UNNAO", "VARANASI"],
  "UTTARAKHAND": ["ALMORA", "BAGESHWAR", "CHAMOLI", "CHAMPAWAT", "DEHRADUN", "HARIDWAR", "NAINITAL", "PAURI GARHWAL", "PITHORAGARH", "RUDRAPRAYAG", "TEHRI GARHWAL", "UDHAM SINGH NAGAR", "UTTARKASHI"],
  "WEST BENGAL": ["ALIPURDUAR", "BANKURA", "BIRBHUM", "COOCH BEHAR", "DAKSHIN DINAJPUR", "DARJEELING", "HOOGHLY", "HOWRAH", "JALPAIGURI", "JHARGRAM", "KALIMPONG", "KOLKATA", "MALDA", "MURSHIDABAD", "NADIA", "NORTH 24 PARGANAS", "PASCHIM BARDHAMAN", "PASCHIM MEDINIPUR", "PURBA BARDHAMAN", "PURBA MEDINIPUR", "PURULIA", "SOUTH 24 PARGANAS", "UTTAR DINAJPUR"]
};

const ALL_STATES = Object.keys(STATE_DISTRICT_MAP).sort();

const ALL_PORTS = [
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

const SAARC_COUNTRIES = ["AFGHANISTAN", "BHUTAN", "PAKISTAN", "MALDIVES", "BANGLADESH", "SRI LANKA", "NEPAL"];

const ALL_COUNTRIES_LIST = ["AFGHANISTAN", "ALAND ISLANDS", "ALBANIA", "ALGERIA", "AMERICAN SAMOA", "ANDORRA", "ANGOLA", "ANGUILLA", "ANTARTICA", "ANTIGUA AND BARBUDA", "ARGENTINA", "ARMENIA", "ARUBA", "AUSTRALIA", "AUSTRIA", "AZERBAIJAN", "BAHAMAS", "BAHRAIN", "BANGLADESH", "BARBADOS", "BELARUS", "BELGIUM", "BELIZE", "BENIN", "BERMUDA", "BHUTAN", "BOLIVIA", "BOSNIA & HERZEGOVINA", "BOTSWANA", "BRAZIL", "BRUNEI", "BULGARIA", "BURKINA FASO", "BURUNDI", "CAMBODIA", "CAMEROON", "CANADA", "CAPE VERDE", "CAYMAN ISLAND", "CHAD", "CHILE", "CHINA", "COLOMBIA", "COMOROS", "CONGO", "COOK ISLANDS", "COSTA RICA", "COTE D'IVOIRE", "CROATIA", "CUBA", "CYPRUS", "CZECH REPUBLIC", "DENMARK", "DJIBOUTI", "DOMINICA", "DOMINICAN REPUBLIC", "EAST TIMOR", "ECUADOR", "EGYPT", "EL SALVADOR", "EQUATORIAL GUINEA", "ERITREA", "ESTONIA", "ETHIOPIA", "FIJI", "FINLAND", "FRANCE", "GABON", "GAMBIA", "GEORGIA", "GERMANY", "GHANA", "GIBRALTAR", "GREECE", "GREENLAND", "GRENADA", "GUADELOUPE", "GUAM", "GUATEMALA", "GUERNSEY", "GUINEA", "GUINEA-BISSAU", "GUYANA", "HAITI", "HEARD AND MCDONALD ISLANDS", "HONDURAS", "HUNGARY", "ICELAND", "INDIA", "INDONESIA", "IRAN", "IRAQ", "IRELAND", "ISRAEL", "ITALY", "JAMAICA", "JAPAN", "JORDAN", "KAZAKHSTAN", "KENYA", "KIRIBATI", "KOREA, NORTH", "KOREA, SOUTH", "KUWAIT", "KYRGYZSTAN", "LAOS", "LATVIA", "LEBANON", "LESOTHO", "LIBERIA", "LIBYA", "LIECHTENSTEIN", "LITHUANIA", "LUXEMBOURG", "MACAU", "MACEDONIA", "MADAGASCAR", "MALAWI", "MALAYSIA", "MALDIVES", "MALI", "MALTA", "MARSHALL ISLANDS", "MARTINIQUE", "MAURITANIA", "MAURITIUS", "MAYOTTE", "MEXICO", "MICRONESIA", "MOLDOVA", "MONACO", "MONGOLIA", "MONTENEGRO", "MONTSERRAT", "MOROCCO", "MOZAMBIQUE", "MYANMAR", "NAMIBIA", "NAURU", "NEPAL", "NETHERLANDS", "NEW CALEDONIA", "NEW ZEALAND", "NICARAGUA", "NIGER", "NIGERIA", "NIUE", "NORFOLK ISLAND", "NORWAY", "OMAN", "PAKISTAN", "PALAU", "PALESTINE", "PANAMA", "PAPUA NEW GUINEA", "PARAGUAY", "PERU", "PHILIPPINES", "POLAND", "PORTUGAL", "PUERTO RICO", "QATAR", "REUNION", "ROMANIA", "RUSSIA", "RWANDA", "SAINT HELENA", "SAINT KITTS AND NEVIS", "SAINT LUCIA", "SAINT PIERRE AND MIQUELON", "SAINT VINCENT AND THE GRENADINES", "SAMOA", "SAN MARINO", "SAO TOME AND PRINCIPE", "SAUDI ARABIA", "SENEGAL", "SERBIA", "SEYCHELLES", "SIERRA LEONE", "SINGAPORE", "SLOVAKIA", "SLOVENIA", "SOLOMON ISLANDS", "SOMALIA", "SOUTH AFRICA", "SOUTH SUDAN", "SPAIN", "SRI LANKA", "SUDAN", "SURINAME", "SWAZILAND", "SWEDEN", "SWITZERLAND", "SYRIA", "TAIWAN", "TAJIKISTAN", "TANZANIA", "THAILAND", "TOGO", "TOKELAU", "TONGA", "TRINIDAD AND TOBAGO", "TUNISIA", "TURKEY", "TURKMENISTAN", "TURKS AND CAICOS ISLANDS", "TUVALU", "UGANDA", "UKRAINE", "UNITED ARAB EMIRATES", "UNITED KINGDOM", "UNITED STATES", "URUGUAY", "UZBEKISTAN", "VANUATU", "VATICAN CITY", "VENEZUELA", "VIETNAM", "VIRGIN ISLANDS, BRITISH", "VIRGIN ISLANDS, U.S.", "WALLIS AND FUTUNA", "WESTERN SAHARA", "YEMEN", "ZAMBIA", "ZIMBABWE"];

const VisaDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [formData, setFormData] = useState({
    placesToVisit: '',
    placesToVisit2: '',
    hotelBooked: 'No',
    hotelName: '',
    friendName: '',
    friendAddress: '',
    friendState: '',
    friendDistrict: '',
    friendPhone: '',
    portOfArrival: initialData.portOfArrival || 'DELHI AIRPORT',
    expectedExitPort: '',
    visitedBefore: 'No',
    prevAddress: '',
    prevVisaNo: '',
    refusedBefore: 'No',
    countriesVisited10Years: [],
    visitedSAARC: 'No',
    saarcVisits: [{ country: '', year: '', visits: '' }],
    refNameIndia: '',
    refAddressIndia: '',
    refStateIndia: '',
    refDistrictIndia: '',
    refPhoneIndia: '',
    refNameHome: '',
    refAddressHome: '',
    refPhoneHome: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value,
      ...(name === 'friendState' ? { friendDistrict: '' } : {}),
      ...(name === 'refStateIndia' ? { refDistrictIndia: '' } : {})
    }));
  };

  const handleAction = () => {
    navigate('/additional-questions', { state: { ...initialData, ...formData } });
  };

  return (
    <div className="min-h-screen bg-[#dbe9f6] pb-10">
      <div className="container mx-auto max-w-6xl bg-white shadow-lg mt-4 overflow-hidden border border-gray-200">
        <div className="bg-[#81b3d5] py-2 px-4 flex justify-between items-center text-white font-bold text-lg uppercase shadow-inner">
          <div className="flex-grow text-center">Visa Details Form</div>
          <button onClick={() => navigate('/')} className="bg-white p-0.5 rounded shadow-sm text-red-600 hover:bg-gray-100">
            <HomeIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="px-10 py-4">
          <div className="text-[13px] font-bold text-black">
            The Temporary Application ID : <span className="text-red-600 font-bold uppercase">{initialData.tempAppId || 'N/A'}</span>
            <span className="text-blue-800 font-bold ml-1"> , {initialData.visaService || 'Visa Service Selected'}</span>
          </div>
        </div>

        <div className="p-8 space-y-8 bg-white">
          <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase">Details of Visa Sought</div>
          <FormField label="Places to be visited*" name="placesToVisit" value={formData.placesToVisit} onChange={handleChange} />
          
          <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase mt-8">References</div>
          <FormField label="Reference Name in India*" name="refNameIndia" value={formData.refNameIndia} onChange={handleChange} />
          <FormField label="Address*" name="refAddressIndia" value={formData.refAddressIndia} onChange={handleChange} />
          <FormSelect label="State*" name="refStateIndia" value={formData.refStateIndia} onChange={handleChange} options={ALL_STATES} />
          <FormSelect label="District*" name="refDistrictIndia" value={formData.refDistrictIndia} onChange={handleChange} options={STATE_DISTRICT_MAP[formData.refStateIndia] || []} disabled={!formData.refStateIndia} />
          <FormField label="Phone No.*" name="refPhoneIndia" value={formData.refPhoneIndia} onChange={handleChange} />
        </div>

        <div className="flex justify-center gap-4 py-6 border-t bg-gray-50">
          <button 
            onClick={handleAction} 
            className="bg-[#f0855c] text-white px-8 py-2 rounded-sm font-bold uppercase shadow-md hover:bg-[#e67e54]"
          >
            Save and Continue
          </button>
        </div>
      </div>
    </div>
  );
};

const FormField = ({ label, name, value, onChange }: any) => (
  <div className="flex items-center min-h-[30px] mb-2 bg-white">
    <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">{label}</label>
    <div className="w-2/3">
      <input 
        type="text" 
        name={name} 
        value={value} 
        onChange={onChange} 
        className="w-1/2 border border-gray-400 bg-white p-0.5 px-2 text-[13px] text-black outline-none focus:border-[#81b3d5] shadow-sm" 
      />
    </div>
  </div>
);

const FormSelect = ({ label, name, value, onChange, options, disabled = false }: any) => (
  <div className="flex items-center min-h-[30px] mb-2 bg-white">
    <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">{label}</label>
    <div className="w-2/3">
      <select 
        name={name} 
        value={value} 
        onChange={onChange} 
        disabled={disabled}
        className={`w-1/2 border border-gray-400 p-0.5 px-1 text-[13px] text-black outline-none focus:border-[#81b3d5] shadow-sm ${disabled ? 'bg-gray-100' : 'bg-white'}`}
      >
        <option value="">Select ..</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
    </div>
  </div>
);

export default VisaDetailsForm;
