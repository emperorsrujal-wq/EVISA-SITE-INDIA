
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

const STATE_DISTRICT_MAP: Record<string, string[]> = {
  "MAHARASHTRA": ["MUMBAI", "PUNE", "NAGPUR", "THANE", "NASIK", "SURAT"],
  "GUJARAT": ["AHMEDABAD", "SURAT", "VADODARA", "RAJKOT"]
};
const ALL_STATES = Object.keys(STATE_DISTRICT_MAP).sort();
const COUNTRIES = ["AFGHANISTAN", "CANADA", "INDIA", "USA", "UK", "ALAND ISLANDS"];
const VISA_TYPES = ["AYUSH VISA", "BUSINESS VISA", "CONFERENCE VISA", "TOURIST VISA", "MEDICAL VISA", "TRANSIT VISA"];

const VisaDetailsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [formData, setFormData] = useState({
    placesToVisit: '', placesToVisit2: '', hotelBooked: 'No', hotelName: '', tourOperator: '', hotelAddress: '',
    friendName: '', friendAddress: '', friendState: '', friendDistrict: '', friendPhone: '',
    portOfArrival: initialData.portOfArrival || '', expectedExitPort: '',
    visitedBefore: 'No', prevAddress: '', prevCities: '', prevVisaNo: '', prevVisaType: '', prevPlaceIssue: '', prevDateIssue: '',
    refusedBefore: 'No', refusedDetails: '',
    countriesVisited10Years: '', visitedSAARC: 'No', saarcDetails: '',
    refNameIndia: '', refAddressIndia: '', refStateIndia: '', refDistrictIndia: '', refPhoneIndia: '',
    refNameHome: '', refAddressHome: '', refPhoneHome: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

        <div className="flex justify-center gap-4 py-4 border-b">
          <button onClick={handleAction} className="bg-[#f0855c] text-white px-6 py-1.5 rounded-sm font-bold text-[13px] uppercase shadow hover:bg-[#e67e54]">Save and Continue</button>
          <button className="bg-[#f0855c] text-white px-6 py-1.5 rounded-sm font-bold text-[13px] uppercase shadow hover:bg-[#e67e54]">Save and Temporarily Exit</button>
        </div>

        <div className="px-10 py-4">
          <div className="text-[13px] font-bold text-black mb-2">
            The Temporary Application ID : <span className="text-red-600 font-bold uppercase">{initialData.tempAppId || 'N/A'}</span> , 
            <span className="text-blue-800 font-bold ml-1"> {initialData.visaService || 'Visa Service'}</span>
          </div>
        </div>

        <div className="p-8 space-y-8 bg-white">
          <section>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase text-[14px]">Details of Visa Sought</div>
            <FormField label="Places to be visited*" name="placesToVisit" value={formData.placesToVisit} onChange={handleChange} />
            <FormField label="Places to be visited line 2" name="placesToVisit2" value={formData.placesToVisit2} onChange={handleChange} />
            
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Have you booked any room in Hotel/Resort etc. through any Tour Operator?*</label>
              <div className="w-2/3 flex items-center gap-4 text-black text-[13px] font-bold">
                 <label className="flex items-center gap-1"><input type="radio" name="hotelBooked" value="Yes" checked={formData.hotelBooked === 'Yes'} onChange={handleChange} /> Yes</label>
                 <label className="flex items-center gap-1"><input type="radio" name="hotelBooked" value="No" checked={formData.hotelBooked === 'No'} onChange={handleChange} /> No</label>
              </div>
            </div>

            {formData.hotelBooked === 'Yes' && (
              <>
                <FormField label="Name of the tour operator" name="tourOperator" value={formData.tourOperator} onChange={handleChange} />
                <FormField label="Address of the tour operator" name="hotelAddress" value={formData.hotelAddress} onChange={handleChange} />
                <FormField label="Name of Hotel/Resort etc" name="hotelName" value={formData.hotelName} onChange={handleChange} />
              </>
            )}

            <div className="bg-[#81b3d5] px-3 py-1 my-4 font-bold text-white uppercase text-[12px]">Details of Purpose " MEETING FRIENDS/RELATIVES "</div>
            <FormField label="Details of the Friend/Relative*" name="friendName" value={formData.friendName} onChange={handleChange} />
            <FormField label="Address*" name="friendAddress" value={formData.friendAddress} onChange={handleChange} />
            <FormSelect label="State*" name="friendState" value={formData.friendState} onChange={handleChange} options={ALL_STATES} />
            <FormSelect label="District*" name="friendDistrict" value={formData.friendDistrict} onChange={handleChange} options={STATE_DISTRICT_MAP[formData.friendState] || []} />
            <FormField label="Phone no*" name="friendPhone" value={formData.friendPhone} onChange={handleChange} />

            <div className="flex items-center min-h-[30px] mb-2 mt-4">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Port of Arrival in India*</label>
              <div className="w-2/3"><input disabled value={formData.portOfArrival} className="w-1/2 border border-gray-300 bg-gray-50 p-0.5 px-2 text-[13px] text-black font-bold uppercase" /></div>
            </div>
            <FormSelect label="Expected Port of Exit from India*" name="expectedExitPort" value={formData.expectedExitPort} onChange={handleChange} options={['DELHI AIRPORT', 'MUMBAI AIRPORT', 'CHENNAI AIRPORT']} />
          </section>

          <section>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase text-[14px]">Previous Visa/Currently valid Visa Details</div>
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Have you ever visited India before?*</label>
              <div className="w-2/3 flex items-center gap-4 text-black text-[13px] font-bold">
                 <label className="flex items-center gap-1"><input type="radio" name="visitedBefore" value="Yes" checked={formData.visitedBefore === 'Yes'} onChange={handleChange} /> Yes</label>
                 <label className="flex items-center gap-1"><input type="radio" name="visitedBefore" value="No" checked={formData.visitedBefore === 'No'} onChange={handleChange} /> No</label>
              </div>
            </div>

            {formData.visitedBefore === 'Yes' && (
              <>
                <FormField label="Address*" name="prevAddress" value={formData.prevAddress} onChange={handleChange} help="Enter the address of stay during your last visit" />
                <FormField label="Cities previously visited in India*" name="prevCities" value={formData.prevCities} onChange={handleChange} help="Cities in India visited (comma separated)" />
                <FormField label="Last Indian Visa No/Currently valid Indian Visa No.*" name="prevVisaNo" value={formData.prevVisaNo} onChange={handleChange} />
                <FormSelect label="Type of Visa*" name="prevVisaType" value={formData.prevVisaType} onChange={handleChange} options={VISA_TYPES} />
                <FormField label="Place of Issue*" name="prevPlaceIssue" value={formData.prevPlaceIssue} onChange={handleChange} />
                <FormField label="Date of Issue*" name="prevDateIssue" value={formData.prevDateIssue} onChange={handleChange} help="In DD/MM/YYYY format" />
              </>
            )}

            <div className="flex items-center min-h-[30px] mb-2 mt-4">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Has permission to visit or to extend stay in India previously been refused?*</label>
              <div className="w-2/3 flex items-center gap-4 text-black text-[13px] font-bold">
                 <label className="flex items-center gap-1"><input type="radio" name="refusedBefore" value="Yes" checked={formData.refusedBefore === 'Yes'} onChange={handleChange} /> Yes</label>
                 <label className="flex items-center gap-1"><input type="radio" name="refusedBefore" value="No" checked={formData.refusedBefore === 'No'} onChange={handleChange} /> No</label>
              </div>
            </div>
            {formData.refusedBefore === 'Yes' && <FormField label="If so, when and by whom*" name="refusedDetails" value={formData.refusedDetails} onChange={handleChange} />}
          </section>

          <section>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase text-[14px]">Other Information</div>
            <FormField label="Countries Visited in Last 10 years" name="countriesVisited10Years" value={formData.countriesVisited10Years} onChange={handleChange} />
            
            <div className="bg-[#81b3d5] px-3 py-1 my-4 font-bold text-white uppercase text-[12px]">SAARC Country Visit Details</div>
            <div className="flex items-center min-h-[30px] mb-2">
              <label className="w-1/3 text-right pr-6 text-[13px] font-bold text-black">Have you visited SAARC countries (except your own country) during last 3 years?*</label>
              <div className="w-2/3 flex items-center gap-4 text-black text-[13px] font-bold">
                 <label className="flex items-center gap-1"><input type="radio" name="visitedSAARC" value="Yes" checked={formData.visitedSAARC === 'Yes'} onChange={handleChange} /> Yes</label>
                 <label className="flex items-center gap-1"><input type="radio" name="visitedSAARC" value="No" checked={formData.visitedSAARC === 'No'} onChange={handleChange} /> No</label>
              </div>
            </div>
            {formData.visitedSAARC === 'Yes' && <FormField label="Give details*" name="saarcDetails" value={formData.saarcDetails} onChange={handleChange} />}
          </section>

          <section>
            <div className="bg-[#81b3d5] px-3 py-1 mb-4 font-bold text-white uppercase text-[14px]">Reference</div>
            <p className="text-gray-700 font-bold text-[12px] mb-2">Reference Name in India*</p>
            <FormField label="Name*" name="refNameIndia" value={formData.refNameIndia} onChange={handleChange} />
            <FormField label="Address*" name="refAddressIndia" value={formData.refAddressIndia} onChange={handleChange} />
            <FormSelect label="State*" name="refStateIndia" value={formData.refStateIndia} onChange={handleChange} options={ALL_STATES} />
            <FormSelect label="District*" name="refDistrictIndia" value={formData.refDistrictIndia} onChange={handleChange} options={STATE_DISTRICT_MAP[formData.refStateIndia] || []} />
            <FormField label="Phone No/Mobile No*" name="refPhoneIndia" value={formData.refPhoneIndia} onChange={handleChange} />
            
            <p className="text-gray-700 font-bold text-[12px] mb-2 mt-4">Reference Name in HOME COUNTRY*</p>
            <FormField label="Name*" name="refNameHome" value={formData.refNameHome} onChange={handleChange} help="One contact in Home Country" />
            <FormField label="Address*" name="refAddressHome" value={formData.refAddressHome} onChange={handleChange} />
            <FormField label="Phone No/Mobile No*" name="refPhoneHome" value={formData.refPhoneHome} onChange={handleChange} />
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

export default VisaDetailsForm;
