import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { mockTests } from '../utils/mockData';
import { Store, Plus, CheckCircle2, Truck, Wallet, Users, Clock } from 'lucide-react';

export const PartnerDashboard: React.FC = () => {
  const { bookings, addBooking, triggerMockLogisticsPickup } = useApp();
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form Fields for Walk-in Patient
  const [patientName, setPatientName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [mobile, setMobile] = useState('');
  const [selectedTestId, setSelectedTestId] = useState(mockTests[0].id);

  // Stats calculation
  const totalSamples = bookings.length + 17; // mock offset for demo density
  const pendingPickup = bookings.filter(b => b.status === 'Collected').length + 4;
  const completedSamples = bookings.filter(b => b.status === 'Report Ready').length + 13;
  const totalEarnings = completedSamples * 150 + pendingPickup * 100; // mock earnings logic

  const handleRegisterWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    const test = mockTests.find(t => t.id === selectedTestId);
    if (!test) return;

    const sampleId = addBooking({
      patientName,
      age: parseInt(age) || 30,
      gender,
      mobile,
      address: 'Walk-in Store Collection',
      testName: `${test.name} (${test.code})`,
      price: test.price,
      collectionType: 'Center',
      date: new Date().toISOString().split('T')[0],
      timeSlot: 'Immediate (Walk-in)'
    });

    setSuccessMsg(`Patient registered successfully! Sample ID: ${sampleId}`);
    // Clear form
    setPatientName('');
    setAge('');
    setMobile('');
    setTimeout(() => setSuccessMsg(null), 5000);
  };

  const handleRequestPickup = () => {
    triggerMockLogisticsPickup();
    alert('Logistics pickup request dispatched to central hub. Courier routing optimized.');
  };

  return (
    <div className="py-10 bg-brand-gray min-h-[90vh] pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-teal/20 text-brand-teal flex items-center justify-center">
              <Store className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold">Shakti Medical Store</h1>
              <p className="text-xs text-slate-400 font-medium">Partner Code: DB-GOR-001 • Gorakhpur, UP</p>
            </div>
          </div>

          <button
            onClick={handleRequestPickup}
            className="bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-brand-teal/5 flex items-center space-x-1.5 active:scale-95"
          >
            <Truck className="h-4.5 w-4.5" />
            <span>Request Logistics Pickup</span>
          </button>
        </div>

        {/* Stats Summary cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Total Samples</span>
              <p className="text-xl font-extrabold text-brand-navy mt-0.5">{totalSamples}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Pending Pickup</span>
              <p className="text-xl font-extrabold text-brand-navy mt-0.5">{pendingPickup}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Completed Tests</span>
              <p className="text-xl font-extrabold text-brand-navy mt-0.5">{completedSamples}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-brand-teal/10 rounded-2xl text-brand-teal">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">My Commission</span>
              <p className="text-xl font-extrabold text-brand-teal mt-0.5">₹{totalEarnings}</p>
            </div>
          </div>
        </div>

        {/* Action Panel & Patient Logs grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Register walk-in patient form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Plus className="h-5 w-5 text-brand-teal" />
              <h3 className="font-extrabold text-brand-navy text-sm md:text-base">Register Walk-in Patient</h3>
            </div>

            {successMsg && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-800 font-bold flex items-start space-x-2 animate-bounce">
                <CheckCircle2 className="h-4.5 w-4.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p>{successMsg}</p>
              </div>
            )}

            <form onSubmit={handleRegisterWalkIn} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:border-brand-teal focus:outline-none"
                  placeholder="Full name"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Age</label>
                  <input
                    type="number"
                    required
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:border-brand-teal focus:outline-none"
                    placeholder="Years"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white focus:border-brand-teal focus:outline-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs focus:border-brand-teal focus:outline-none"
                  placeholder="10-digit mobile"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Select Diagnostic Test</label>
                <select
                  value={selectedTestId}
                  onChange={(e) => setSelectedTestId(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl p-3 text-xs bg-white focus:border-brand-teal focus:outline-none"
                >
                  {mockTests.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.name} (₹{t.price})
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-brand-teal hover:bg-brand-teal/95 text-white font-bold py-3 rounded-xl transition-all shadow-md shadow-brand-teal/10"
                >
                  Register & Print Label
                </button>
              </div>
            </form>
          </div>

          {/* Recent Samples Table */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-brand-navy text-sm md:text-base border-b border-slate-100 pb-3">
              Sample Drop-off Queue
            </h3>
            
            <div className="overflow-x-auto text-xs">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-400 font-bold text-left bg-slate-50">
                    <th className="p-3">Sample ID</th>
                    <th className="p-3">Patient</th>
                    <th className="p-3">Test</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-brand-primary">{booking.sampleId}</td>
                      <td className="p-3 font-semibold text-brand-navy">{booking.patientName}</td>
                      <td className="p-3 text-slate-500">{booking.testName.split(' (')[0]}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                          booking.status === 'Report Ready' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' :
                          booking.status === 'In Transit' ? 'bg-brand-primary/5 text-brand-primary border border-brand-primary/10' :
                          'bg-amber-50 text-amber-600 border border-amber-100'
                        }`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {/* Fictional rows to populate the prototype grid */}
                  {[
                    { code: 'DB-09412', name: 'Aman Yadav', test: 'Thyroid Profile', status: 'Report Ready' },
                    { code: 'DB-08102', name: 'Sunita Devi', test: 'Lipid Profile', status: 'Report Ready' },
                    { code: 'DB-10114', name: 'Rajesh Mishra', test: 'Liver Function', status: 'In Transit' }
                  ].map((mockRow, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50">
                      <td className="p-3 font-bold text-brand-primary">{mockRow.code}</td>
                      <td className="p-3 font-semibold text-brand-navy">{mockRow.name}</td>
                      <td className="p-3 text-slate-500">{mockRow.test}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                          mockRow.status === 'Report Ready' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-brand-primary/5 text-brand-primary border border-brand-primary/10'
                        }`}>
                          {mockRow.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100 text-xs text-slate-500">
              <span>Next scheduled route vehicle arrives in: <strong className="text-brand-navy">15 mins</strong></span>
              <span className="flex items-center text-brand-teal font-bold"><Clock className="h-4 w-4 mr-1" /> Route 01</span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
