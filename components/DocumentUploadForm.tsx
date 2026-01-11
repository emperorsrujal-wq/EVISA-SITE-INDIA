
import React, { useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home as HomeIcon, Camera, Upload, CheckCircle, X, Image as ImageIcon } from 'lucide-react';

const DocumentUploadForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialData = location.state || {};

  const [photo, setPhoto] = useState<File | null>(null);
  const [passport, setPassport] = useState<File | null>(null);

  const handleFinish = () => {
    if (!photo || !passport) {
      alert("Please upload both documents.");
      return;
    }
    alert("Application successfully submitted!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#dbe9f6] pb-10">
      <div className="container mx-auto max-w-6xl bg-white shadow-lg mt-4 border border-gray-200">
        <div className="bg-[#81b3d5] py-2 text-center text-white font-bold uppercase shadow-inner">Upload Photograph & Passport</div>
        <div className="p-12 text-center bg-white space-y-8">
            <p className="text-[14px] font-bold">Temporary Application ID:- <span className="text-red-600 uppercase font-bold">{initialData.tempAppId || 'N/A'}</span></p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-6 border rounded bg-gray-50 flex flex-col items-center">
                  <h3 className="font-bold text-xs uppercase mb-4">Photograph</h3>
                  <div className="w-32 h-40 bg-white border flex items-center justify-center mb-4 overflow-hidden relative">
                    {photo ? <img src={URL.createObjectURL(photo)} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-200" />}
                  </div>
                  <button className="bg-white border border-blue-600 text-blue-600 py-1 px-4 text-xs font-bold uppercase">Upload</button>
               </div>
               <div className="p-6 border rounded bg-gray-50 flex flex-col items-center">
                  <h3 className="font-bold text-xs uppercase mb-4">Passport Copy</h3>
                  <div className="w-32 h-40 bg-white border flex items-center justify-center mb-4 overflow-hidden relative">
                    {passport ? <img src={URL.createObjectURL(passport)} className="w-full h-full object-cover" /> : <ImageIcon className="text-gray-200" />}
                  </div>
                  <button className="bg-white border border-blue-600 text-blue-600 py-1 px-4 text-xs font-bold uppercase">Upload</button>
               </div>
            </div>
            <div className="flex justify-center gap-4 pt-8 border-t">
               <button onClick={handleFinish} className="bg-[#f0855c] text-white px-12 py-2 font-bold uppercase shadow-lg hover:bg-[#e67e54]">Confirm and Finish</button>
               <button onClick={() => navigate('/')} className="bg-gray-100 px-12 py-2 font-bold uppercase">Exit</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
