import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, CheckCircle2 } from 'lucide-react';

interface PartnerRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerRegistrationModal: React.FC<PartnerRegistrationModalProps> = ({ isOpen, onClose }) => {
  const { addPartnerRequest } = useApp();
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [mobile, setMobile] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [businessType, setBusinessType] = useState('Pharmacy');
  const [dailyCustomers, setDailyCustomers] = useState('1–10');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPartnerRequest({
      fullName,
      businessName,
      mobile,
      city,
      area,
      businessType,
      dailyCustomers
    });
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-extrabold text-brand-navy text-base">Become a DiagBuddy Partner</h3>
            <p className="text-xs text-slate-500 font-medium">Earn additional income in your town</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-teal focus:outline-none"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Business Name (e.g. medical store name)</label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-teal focus:outline-none"
                  placeholder="Enter shop or clinic name"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-teal focus:outline-none"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-teal focus:outline-none"
                    placeholder="Gorakhpur, Patna, etc."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Area / Locality</label>
                  <input
                    type="text"
                    required
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-teal focus:outline-none"
                    placeholder="Mohaddipur, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Business Type</label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white focus:border-brand-teal focus:outline-none"
                  >
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Clinic">Clinic</option>
                    <option value="Doctor">Doctor</option>
                    <option value="Diagnostic Center">Diagnostic Center</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Daily Customers</label>
                  <select
                    value={dailyCustomers}
                    onChange={(e) => setDailyCustomers(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm bg-white focus:border-brand-teal focus:outline-none"
                  >
                    <option value="1–10">1–10 customers</option>
                    <option value="10–25">10–25 customers</option>
                    <option value="25–50">25–50 customers</option>
                    <option value="50+">50+ customers</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-teal hover:bg-brand-teal/95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-teal/10"
                >
                  Join DiagBuddy
                </button>
              </div>

            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-4 border-emerald-50">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-brand-navy">Registration Successful!</h4>
                <p className="text-xs text-slate-500">Thank you! Our onboarding team will contact you shortly.</p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 rounded-xl transition-all text-sm"
              >
                Close
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
