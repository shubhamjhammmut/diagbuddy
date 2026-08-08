import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Search, Circle, Truck, AlertCircle, FileText, Check } from 'lucide-react';

export const Track: React.FC = () => {
  const { t } = useLanguage();
  const { bookings } = useApp();
  const [sampleIdInput, setSampleIdInput] = useState('DB-10245');
  const [searchedId, setSearchedId] = useState('DB-10245');
  const [viewingReport, setViewingReport] = useState(false);

  // Find the booking matching the searched ID
  const activeBooking = bookings.find(b => b.sampleId.toUpperCase() === searchedId.trim().toUpperCase());

  const stepsList: {
    statusKey: typeof bookings[number]['status'];
    titleKey: string;
    desc: string;
  }[] = [
    { statusKey: 'Collected', titleKey: 'track.collected', desc: 'Sample drawn and logged by our diagnostic buddy representative.' },
    { statusKey: 'Reached Local Center', titleKey: 'track.reached', desc: 'Sample arrived at neighborhood pharmacy hub, verified and cooled.' },
    { statusKey: 'In Transit', titleKey: 'track.transit', desc: 'Sample placed in cold-chain logistics container en route to laboratory.' },
    { statusKey: 'Received at Lab', titleKey: 'track.lab', desc: 'Arrived at accredited testing facility, cold-chain log logged.' },
    { statusKey: 'Testing', titleKey: 'track.testing', desc: 'Sample placed in analyzer equipment for clinical processing.' },
    { statusKey: 'Report Ready', titleKey: 'track.ready', desc: 'Verified clinical reports generated, signed by pathologist.' }
  ];

  const getStepIndex = (status: string) => {
    return stepsList.findIndex(st => st.statusKey === status);
  };

  const activeStepIndex = activeBooking ? getStepIndex(activeBooking.status) : -1;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchedId(sampleIdInput);
    setViewingReport(false);
  };

  return (
    <div className="py-10 bg-brand-gray min-h-[80vh]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Page Header */}
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy">Track Your Sample</h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">Monitor your collection vial temperature and processing stages in real time.</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="bg-white p-4.5 rounded-3xl border border-slate-200 shadow-sm flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Enter Sample ID (e.g. DB-10245)..."
              value={sampleIdInput}
              onChange={(e) => setSampleIdInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-3 text-sm focus:border-brand-primary focus:bg-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-xs px-6 py-3 rounded-2xl transition-all shadow-md shadow-brand-primary/5 active:scale-95"
          >
            Track
          </button>
        </form>

        {/* Tracking Details display */}
        {activeBooking ? (
          <div className="space-y-6">
            
            {/* Summary details banner */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sample Information</p>
                <h3 className="text-base font-extrabold text-brand-navy mt-1">ID: {activeBooking.sampleId}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{activeBooking.testName} for {activeBooking.patientName}</p>
              </div>

              {/* Status and Action */}
              <div className="flex items-center space-x-3">
                {activeBooking.status === 'Report Ready' ? (
                  <button
                    onClick={() => setViewingReport(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all flex items-center space-x-1 shadow-md shadow-emerald-600/15"
                  >
                    <FileText className="h-4 w-4" />
                    <span>View Report Summary</span>
                  </button>
                ) : (
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Estimated Report Time</p>
                    <p className="text-xs font-bold text-slate-700">Within 12-24 Hours</p>
                  </div>
                )}
              </div>
            </div>

            {/* Path/Timeline visual */}
            <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h4 className="text-xs font-extrabold text-slate-400 uppercase tracking-widest mb-6">Processing Steps</h4>
              
              <div className="space-y-6 relative">
                
                {/* Center line connecting all steps */}
                <div className="absolute top-3 bottom-3 left-4.5 w-0.5 bg-slate-100" />

                {stepsList.map((st, index) => {
                  const isCompleted = index <= activeStepIndex;
                  const isCurrent = index === activeStepIndex;

                  return (
                    <div key={st.statusKey} className="flex items-start space-x-4 relative">
                      
                      {/* Circle icons */}
                      <div className="flex-shrink-0 z-10">
                        {isCompleted ? (
                          <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
                            <Check className="h-4.5 w-4.5 stroke-[3]" />
                          </div>
                        ) : isCurrent ? (
                          <div className="w-9 h-9 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/30 flex items-center justify-center animate-pulse">
                            <Truck className="h-4.5 w-4.5" />
                          </div>
                        ) : (
                          <div className="w-9 h-9 rounded-full bg-slate-50 text-slate-300 border border-slate-200 flex items-center justify-center">
                            <Circle className="h-4.5 w-4.5" />
                          </div>
                        )}
                      </div>

                      {/* Text */}
                      <div className="pt-1.5 flex-1">
                        <h5 className={`text-sm font-bold ${
                          isCompleted ? 'text-brand-navy' : 'text-slate-400'
                        }`}>
                          {t(`track.${st.statusKey.replace(/\s+/g, '').toLowerCase()}`) || st.statusKey}
                        </h5>
                        <p className={`text-xs mt-0.5 leading-relaxed ${
                          isCompleted ? 'text-slate-500 font-normal' : 'text-slate-300'
                        }`}>
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>

            {/* Interactive Clinical report summary card */}
            {viewingReport && (
              <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 shadow-xl space-y-6 animate-fadeIn">
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                      Pathology Report Summary
                    </span>
                    <h4 className="text-base font-extrabold text-brand-navy mt-1.5">DiagBuddy Laboratory Partners</h4>
                    <p className="text-[10px] text-slate-400">Accredited testing facility (NABL aligned protocols)</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-700">Patient: {activeBooking.patientName}</p>
                    <p className="text-[10px] text-slate-400">Age/Gen: {activeBooking.age} / {activeBooking.gender}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Test: {activeBooking.testName}</p>
                  
                  {/* Mock lab parameters table */}
                  <div className="border border-slate-100 rounded-2xl overflow-hidden text-xs">
                    <div className="bg-slate-50 p-3 font-bold flex justify-between border-b border-slate-100 text-slate-600">
                      <span className="w-1/2">Parameter</span>
                      <span className="w-1/4 text-center">Result</span>
                      <span className="w-1/4 text-right">Normal Range</span>
                    </div>
                    
                    {/* Render parameters depending on CBC vs generic */}
                    {activeBooking.testName.includes('CBC') ? (
                      <div className="divide-y divide-slate-100 font-medium">
                        <div className="p-3 flex justify-between">
                          <span className="w-1/2 text-slate-700">Hemoglobin</span>
                          <span className="w-1/4 text-center font-bold text-brand-navy">14.2 g/dL</span>
                          <span className="w-1/4 text-right text-slate-400">13.0 - 17.0</span>
                        </div>
                        <div className="p-3 flex justify-between">
                          <span className="w-1/2 text-slate-700">Total Leucocyte Count (WBC)</span>
                          <span className="w-1/4 text-center font-bold text-brand-navy">7,800 /cumm</span>
                          <span className="w-1/4 text-right text-slate-400">4,000 - 11,000</span>
                        </div>
                        <div className="p-3 flex justify-between">
                          <span className="w-1/2 text-slate-700">Platelet Count</span>
                          <span className="w-1/4 text-center font-bold text-brand-navy">2.4 Lakhs/cumm</span>
                          <span className="w-1/4 text-right text-slate-400">1.5 - 4.5</span>
                        </div>
                      </div>
                    ) : (
                      <div className="divide-y divide-slate-100 font-medium">
                        <div className="p-3 flex justify-between">
                          <span className="w-1/2 text-slate-700">Diagnostic Value</span>
                          <span className="w-1/4 text-center font-bold text-brand-navy">Normal</span>
                          <span className="w-1/4 text-right text-slate-400">Standard</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="bg-slate-50 rounded-xl p-3 text-[10px] text-slate-400 text-center">
                    Report electronically signed by Dr. S. K. Pathak, MD (Pathology). Registration No. MCI-48291
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => alert('Pathology PDF download initiated (Simulated)')}
                    className="bg-brand-primary text-white font-bold text-xs px-4 py-2 rounded-xl transition-all shadow"
                  >
                    Download Full PDF
                  </button>
                  <button
                    onClick={() => setViewingReport(false)}
                    className="border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold text-xs px-4 py-2 rounded-xl transition-all"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            )}

          </div>
        ) : (
          <div className="bg-white border rounded-3xl p-12 text-center max-w-md mx-auto space-y-3">
            <AlertCircle className="h-10 w-10 text-amber-500 mx-auto" />
            <h3 className="text-slate-600 font-bold text-base">Sample ID Not Found</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              We couldn't find a record for Sample ID <span className="font-bold text-slate-700">"{searchedId}"</span>. Please double-check your typing.
            </p>
            <p className="text-[10px] text-slate-400 font-semibold">
              Tip: Try searching <span className="font-bold text-slate-600">"DB-10245"</span> (default pre-loaded demo).
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
