import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface B2BQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const B2BQuoteModal: React.FC<B2BQuoteModalProps> = ({ isOpen, onClose }) => {
  const { addB2BQuote } = useApp();
  const [success, setSuccess] = useState(false);

  // Form Fields
  const [orgName, setOrgName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [peopleCount, setPeopleCount] = useState<number>(50);
  const [requiredTests, setRequiredTests] = useState('Full Body Checkup');
  const [preferredDate, setPreferredDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addB2BQuote({
      orgName,
      contactPerson,
      phone,
      email,
      city,
      peopleCount,
      requiredTests,
      preferredDate
    });
    setSuccess(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-extrabold text-brand-navy text-base">Request Organization Quote</h3>
            <p className="text-xs text-slate-500 font-medium">Diagnostic screenings at scale</p>
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
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Organization Name</label>
                <input
                  type="text"
                  required
                  value={orgName}
                  onChange={(e) => setOrgName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                  placeholder="Company, Factory, School, NGO name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Contact Person</label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                    placeholder="Enter name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                    placeholder="Varanasi, Ranchi, etc."
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Phone Number</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                    placeholder="Mobile number"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                    placeholder="Email address"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Number of People</label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={peopleCount}
                    onChange={(e) => setPeopleCount(parseInt(e.target.value) || 0)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Preferred Date</label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Required Tests / Packages</label>
                <textarea
                  value={requiredTests}
                  onChange={(e) => setRequiredTests(e.target.value)}
                  rows={2}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                  placeholder="e.g. CBC, Diabetes Screening, Complete health checkup"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-primary/10"
                >
                  Request Quote
                </button>
              </div>

            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-4 border-emerald-50">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-brand-navy">Quote Request Sent!</h4>
                <p className="text-xs text-slate-500">Our enterprise diagnostic team will email you a proposal within 24 hours.</p>
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
