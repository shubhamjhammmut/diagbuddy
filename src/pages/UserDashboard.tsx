import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Calendar, Truck, ArrowRight, ShieldCheck, CheckCircle2, Sparkles, X } from 'lucide-react';

interface ReportItem {
  id: string;
  name: string;
  date: string;
  code: string;
  parameters: Record<string, string>;
}

export const UserDashboard: React.FC = () => {
  const { bookings, setActiveTab, getAIExplanation } = useApp();
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // AI report explanation modal state
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [aiExplanation, setAiExplanation] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [explanationOpen, setExplanationOpen] = useState(false);

  const activeBooking = bookings.find(b => b.sampleId === 'DB-10245') || bookings[0];

  const handleDownload = (sampleId: string) => {
    setDownloadSuccess(sampleId);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleExplainWithAI = async (report: ReportItem) => {
    setSelectedReport(report);
    setExplanationOpen(true);
    setAiLoading(true);
    setAiExplanation('');

    try {
      const text = await getAIExplanation(report.name, report.parameters);
      setAiExplanation(text);
    } catch (err) {
      console.error(err);
      setAiExplanation('Unable to generate AI explanation. Please check your network connection.');
    } finally {
      setAiLoading(false);
    }
  };

  const demoReports: ReportItem[] = [
    { 
      id: 'rep-01', 
      name: 'Thyroid Panel (T3, T4, TSH)', 
      date: 'Jul 24, 2026', 
      code: 'DB-09412',
      parameters: { 'T3': '1.2 ng/mL', 'T4': '8.4 ug/dL', 'TSH': '4.2 uIU/mL' }
    },
    { 
      id: 'rep-02', 
      name: 'Lipid Cholesterol Profile', 
      date: 'Jun 12, 2026', 
      code: 'DB-08102',
      parameters: { 'Total Cholesterol': '190 mg/dL', 'HDL Cholesterol': '45 mg/dL', 'LDL Cholesterol': '120 mg/dL' }
    }
  ];

  return (
    <div className="py-10 bg-brand-gray min-h-[80vh]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Welcome Banner */}
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center font-bold text-lg">
              R
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-brand-navy">Good morning, Rahul 👋</h1>
              <p className="text-xs text-slate-500 font-medium">Gorakhpur, Uttar Pradesh • Patient Account</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('tests')}
              className="bg-brand-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-brand-primary/5 active:scale-95"
            >
              Book New Test
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Active Booking Card */}
          <div className="md:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Upcoming Booking</span>
              <span className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
            </h3>

            {activeBooking ? (
              <div className="space-y-4">
                <div>
                  <h4 className="font-extrabold text-brand-navy text-base">{activeBooking.testName}</h4>
                  <p className="text-xs text-slate-500 mt-1">Status: <span className="font-bold text-brand-primary">{activeBooking.status}</span></p>
                </div>

                <div className="border-t border-slate-100 pt-3.5 grid grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-400 uppercase text-[9px]">Schedule</span>
                    <p className="font-semibold text-slate-700 flex items-center">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
                      {activeBooking.date}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-400 uppercase text-[9px]">Collection</span>
                    <p className="font-semibold text-slate-700 flex items-center">
                      <Truck className="h-3.5 w-3.5 text-slate-400 mr-1.5" />
                      {activeBooking.collectionType} Collection
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('track')}
                    className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5 active:scale-98"
                  >
                    <span>Track Sample DB-10245</span>
                    <ArrowRight className="h-4.5 w-4.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                No active diagnostic test bookings.
              </div>
            )}
          </div>

          {/* Reports Card */}
          <div className="md:col-span-6 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Reports Available
              </h3>
              
              {downloadSuccess && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-2.5 text-[10px] text-emerald-800 font-bold flex items-center space-x-1.5 mt-2 animate-pulse">
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600" />
                  <span>Report PDF downloaded successfully.</span>
                </div>
              )}

              {/* Reports list */}
              <div className="space-y-2 mt-4">
                {demoReports.map((rep) => (
                  <div key={rep.id} className="p-3 border border-slate-100 rounded-xl hover:bg-slate-50 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-bold text-brand-navy">{rep.name.split(' (')[0]}</p>
                      <p className="text-[10px] text-slate-400 font-semibold">{rep.date} • {rep.code}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleExplainWithAI(rep)}
                        className="text-brand-primary font-bold hover:underline flex items-center space-x-0.5"
                      >
                        <Sparkles className="h-3 w-3 text-brand-primary" />
                        <span>AI Explain</span>
                      </button>
                      <span className="text-slate-300">|</span>
                      <button
                        onClick={() => handleDownload(rep.code)}
                        className="text-slate-500 font-bold hover:underline"
                      >
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={() => setActiveTab('track')}
                className="w-full text-center bg-brand-primary/10 hover:bg-brand-primary/15 text-brand-primary font-extrabold text-xs py-2.5 rounded-xl transition-all"
              >
                Enter Sample ID to load report
              </button>
            </div>
          </div>

        </div>

        {/* Profile Card */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start space-x-3.5">
          <div className="p-2.5 bg-brand-teal/10 rounded-2xl text-brand-teal mt-1">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-brand-navy">Diagnostic Security Protocol</h4>
            <p className="text-xs text-slate-500 leading-relaxed mt-1">
              DiagBuddy encrypts all patient health records. Pathology reports can only be loaded using the secure mobile phone token or path-linked Sample ID credentials.
            </p>
          </div>
        </div>

      </div>

      {/* AI Explanation Modal Pop-up */}
      {explanationOpen && selectedReport && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-4.5 w-4.5 text-brand-primary" />
                <h3 className="font-extrabold text-brand-navy text-sm md:text-base">AI Report Explanation</h3>
              </div>
              <button onClick={() => setExplanationOpen(false)} className="p-1.5 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Test Profile</span>
                <h4 className="font-extrabold text-brand-navy text-sm mt-0.5">{selectedReport.name}</h4>
              </div>

              {/* Lab Values */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 space-y-1.5 text-xs">
                <p className="font-bold text-slate-400 uppercase text-[9px] mb-1">Report Parameters</p>
                {Object.entries(selectedReport.parameters).map(([key, val]) => (
                  <div key={key} className="flex justify-between font-semibold text-slate-700">
                    <span>{key}</span>
                    <span className="text-brand-navy">{val}</span>
                  </div>
                ))}
              </div>

              {/* Explanation Box */}
              <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-4.5 space-y-2 text-xs md:text-sm text-slate-700 leading-relaxed font-medium">
                {aiLoading ? (
                  <div className="flex flex-col items-center justify-center py-6 space-y-2">
                    <div className="w-6 h-6 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
                    <p className="text-xs text-slate-400 font-semibold">DiagBuddy AI is translating parameters...</p>
                  </div>
                ) : (
                  <p>{aiExplanation}</p>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-slate-100 flex justify-end bg-slate-50">
              <button
                onClick={() => setExplanationOpen(false)}
                className="bg-brand-primary text-white font-bold text-xs px-5 py-2 rounded-xl transition-all shadow"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
