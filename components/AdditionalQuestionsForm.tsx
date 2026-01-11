
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon } from 'lucide-react';

const AdditionalQuestionsForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [formData, setFormData] = useState({
    arrested: 'No',
    refusedEntry: 'No',
    trafficking: 'No',
    terrorist: 'No',
    glorifyTerror: 'No',
    asylum: 'No',
    declared: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleAction = () => {
    if (!formData.declared) {
      alert("Please check the declaration box to continue.");
      return;
    }
    navigate('/upload-documents', { state: { ...initialData, ...formData } });
  };

  return (
    <div className="min-h-screen bg-[#dbe9f6] pb-10">
      <div className="container mx-auto max-w-6xl bg-white shadow-lg mt-4 overflow-hidden border border-gray-200">
        <div className="bg-[#81b3d5] py-2 px-4 flex justify-between items-center text-white font-bold uppercase shadow-inner">
          <div className="flex-grow text-center">Additional Question Details</div>
          <button onClick={() => navigate('/')} className="bg-white p-0.5 rounded shadow-sm text-red-600 hover:bg-gray-100">
            <HomeIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="px-10 py-4">
           <div className="text-[13px] font-bold">The Temporary Application ID : <span className="text-red-600 uppercase font-bold">{initialData.tempAppId || 'N/A'}</span></div>
        </div>

        <div className="p-8 bg-white">
           <div className="flex items-start gap-3 p-4 bg-gray-50 border border-gray-200">
              <input type="checkbox" name="declared" checked={formData.declared} onChange={handleChange} className="mt-1" />
              <label className="text-[12px] font-bold text-blue-900 leading-relaxed">
                I <span className="uppercase text-blue-900 font-bold">{initialData.givenName || 'The Applicant'}</span>, hereby declare that the information furnished above is correct to the best of my knowledge and belief. in case the information is found false at any stage, I am liable for legal action/deportation/blacklisting or any other action as deemed fit by the Government of India.
              </label>
           </div>
        </div>

        <div className="flex justify-center py-6 border-t border-gray-100 bg-gray-50 mt-4">
          <button onClick={handleAction} className="bg-[#f0855c] text-white px-8 py-2 rounded-sm font-bold uppercase shadow-md">Save and Continue</button>
        </div>
      </div>
    </div>
  );
};

export default AdditionalQuestionsForm;
