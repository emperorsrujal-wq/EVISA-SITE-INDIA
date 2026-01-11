
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import ApplyForm from './components/ApplyForm';
import ApplicantDetailsForm from './components/ApplicantDetailsForm';
import FamilyDetailsForm from './components/FamilyDetailsForm';
import VisaDetailsForm from './components/VisaDetailsForm';
import AdditionalQuestionsForm from './components/AdditionalQuestionsForm';
import DocumentUploadForm from './components/DocumentUploadForm';
import Header from './components/Header';
import Footer from './components/Footer';
import VisaAssistant from './components/VisaAssistant';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/apply" element={<ApplyForm />} />
            <Route path="/applicant-details" element={<ApplicantDetailsForm />} />
            <Route path="/family-details" element={<FamilyDetailsForm />} />
            <Route path="/visa-details" element={<VisaDetailsForm />} />
            <Route path="/additional-questions" element={<AdditionalQuestionsForm />} />
            <Route path="/upload-documents" element={<DocumentUploadForm />} />
          </Routes>
        </main>
        <Footer />
        <VisaAssistant />
      </div>
    </Router>
  );
};

export default App;
