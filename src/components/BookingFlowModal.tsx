import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { type TestItem, mockCenters } from '../utils/mockData';
import { X, User, MapPin, CreditCard, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';

interface BookingFlowModalProps {
  test: TestItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingFlowModal: React.FC<BookingFlowModalProps> = ({ test, isOpen, onClose }) => {
  const { addBooking, setActiveTab } = useApp();
  const [step, setStep] = useState(1);
  
  // Form fields
  const [collectionType, setCollectionType] = useState<'Home' | 'Center'>('Center');
  const [selectedCenterId, setSelectedCenterId] = useState<string>(mockCenters[0].id);
  const [date, setDate] = useState('2026-08-09');
  const [timeSlot, setTimeSlot] = useState('8:00 AM - 10:00 AM');
  const [patientName, setPatientName] = useState('Rahul Kumar');
  const [age, setAge] = useState<number>(28);
  const [gender, setGender] = useState('Male');
  const [mobile, setMobile] = useState('+91 98765 43210');
  const [address, setAddress] = useState('House No 12, Mohaddipur, Gorakhpur');
  
  // Results
  const [generatedSampleId, setGeneratedSampleId] = useState('');

  if (!isOpen || !test) return null;

  const collectionFee = collectionType === 'Home' ? 50 : 0;
  const totalPrice = test.price + collectionFee;

  const handleNext = () => {
    if (step < 4) {
      setStep(prev => prev + 1);
    } else {
      // Submit booking
      const selectedCenter = mockCenters.find(c => c.id === selectedCenterId);
      const sampleId = addBooking({
        patientName,
        age,
        gender,
        mobile,
        address: collectionType === 'Home' ? address : selectedCenter?.address || address,
        testName: `${test.name} (${test.code})`,
        price: totalPrice,
        collectionType,
        centerId: collectionType === 'Center' ? selectedCenterId : undefined,
        centerName: collectionType === 'Center' ? selectedCenter?.name : undefined,
        date,
        timeSlot
      });
      setGeneratedSampleId(sampleId);
      setStep(5); // Success step
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(prev => prev - 1);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden border border-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4.5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-extrabold text-brand-navy text-base">Book Diagnostic Test</h3>
            <p className="text-xs text-slate-500 font-medium">{test.name} • ₹{test.price}</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Steps Progress Indicator */}
        {step <= 4 && (
          <div className="bg-brand-lightBlue px-6 py-3 border-b border-slate-100/60 flex items-center justify-between text-[11px] font-bold text-slate-500">
            <span className={step === 1 ? 'text-brand-primary' : 'text-slate-400'}>1. Mode</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className={step === 2 ? 'text-brand-primary' : 'text-slate-400'}>2. Date & Time</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className={step === 3 ? 'text-brand-primary' : 'text-slate-400'}>3. Details</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className={step === 4 ? 'text-brand-primary' : 'text-slate-400'}>4. Checkout</span>
          </div>
        )}

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          
          {/* STEP 1: Collection Mode Selection */}
          {step === 1 && (
            <div className="space-y-4">
              <label className="block text-sm font-bold text-brand-navy">Where should we collect the sample?</label>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setCollectionType('Center')}
                  className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all text-center ${
                    collectionType === 'Center' 
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <MapPin className="h-6 w-6 mb-2" />
                  <span className="text-sm font-bold">Local Center</span>
                  <span className="text-[10px] text-slate-400 mt-1">Visit nearest pharmacy buddy (Free)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCollectionType('Home')}
                  className={`flex flex-col items-center p-5 rounded-2xl border-2 transition-all text-center ${
                    collectionType === 'Home' 
                      ? 'border-brand-primary bg-brand-primary/5 text-brand-primary' 
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <User className="h-6 w-6 mb-2" />
                  <span className="text-sm font-bold">Home Collection</span>
                  <span className="text-[10px] text-slate-400 mt-1">We visit your address (+₹50 fee)</span>
                </button>
              </div>

              {collectionType === 'Center' && (
                <div className="space-y-2 mt-2">
                  <label className="block text-xs font-bold text-slate-400 uppercase">Select Nearest Center</label>
                  <select
                    value={selectedCenterId}
                    onChange={(e) => setSelectedCenterId(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                  >
                    {mockCenters.map(center => (
                      <option key={center.id} value={center.id}>
                        {center.name} ({center.city})
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: Date and Time Slot selection */}
          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-sm font-bold text-brand-navy">Choose Collection Date & Slot</label>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Date</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Preferred Time Slot</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['6:00 AM - 8:00 AM', '8:00 AM - 10:00 AM', '10:00 AM - 12:00 PM', '12:00 PM - 2:00 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTimeSlot(slot)}
                        className={`p-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          timeSlot === slot 
                            ? 'bg-brand-primary text-white border-brand-primary font-bold' 
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-600'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Patient Information */}
          {step === 3 && (
            <div className="space-y-3">
              <label className="block text-sm font-bold text-brand-navy">Patient Details</label>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Full Name</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                    placeholder="Enter full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Age</label>
                    <input
                      type="number"
                      value={age}
                      onChange={(e) => setAge(parseInt(e.target.value) || 0)}
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Gender</label>
                    <select
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
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
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                  />
                </div>

                {collectionType === 'Home' && (
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Home Address</label>
                    <textarea
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      rows={2}
                      className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:border-brand-primary focus:outline-none"
                      placeholder="Enter street name, house number, area"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* STEP 4: Checkout Summary and Payment Option */}
          {step === 4 && (
            <div className="space-y-4">
              <label className="block text-sm font-bold text-brand-navy">Order Summary</label>

              <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-4.5 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">{test.name}</span>
                  <span className="font-bold text-brand-navy">₹{test.price}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">{collectionType} Collection Fee</span>
                  <span className="font-bold text-brand-navy">₹{collectionFee}</span>
                </div>
                <div className="border-t border-slate-200 my-2 pt-2 flex justify-between text-base font-extrabold">
                  <span className="text-brand-navy">Total Pay</span>
                  <span className="text-brand-primary">₹{totalPrice}</span>
                </div>
              </div>

              {/* Demo Warning Disclaimer */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start space-x-2">
                <ShieldAlert className="h-4 w-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-[10px] text-amber-700 leading-relaxed font-semibold">
                  Demo Pricing — Actual final pricing may vary by location. This is a prototype system; no real clinical sample will be processed.
                </p>
              </div>

              {/* Payment Type Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase mb-1.5">Payment Method</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    className="p-3 bg-brand-primary/10 border-2 border-brand-primary text-brand-primary rounded-xl font-bold text-xs text-center flex items-center justify-center space-x-1"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Pay at Collection</span>
                  </button>
                  <button
                    type="button"
                    disabled
                    className="p-3 bg-slate-50 border border-slate-200 text-slate-400 rounded-xl font-bold text-xs text-center cursor-not-allowed"
                  >
                    UPI / Online (Disabled)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: Success Screen */}
          {step === 5 && (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mx-auto border-4 border-emerald-50">
                <CheckCircle2 className="h-10 w-10" />
              </div>
              
              <div className="space-y-1">
                <h4 className="text-lg font-bold text-brand-navy">Booking Confirmed!</h4>
                <p className="text-xs text-slate-500">Your test request has been generated successfully.</p>
              </div>

              <div className="bg-slate-50 p-4.5 rounded-2xl border border-slate-200 inline-block">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Your Sample ID</p>
                <p className="text-xl font-extrabold text-brand-primary tracking-wide mt-1">{generatedSampleId}</p>
                <p className="text-[10px] text-slate-500 mt-1">Keep this ID to track your sample</p>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setActiveTab('track');
                    onClose();
                  }}
                  className="bg-brand-primary text-white font-bold py-3 rounded-2xl text-sm transition-all"
                >
                  Track Sample Status
                </button>
                
                <button
                  onClick={() => {
                    setActiveTab('user-dashboard');
                    onClose();
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-sm transition-all"
                >
                  View Patient Dashboard
                </button>
              </div>
            </div>
          )}

        </div>

        {/* Footer actions */}
        {step <= 4 && (
          <div className="px-6 py-4 border-t border-slate-100 flex justify-between bg-slate-50">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`font-semibold text-sm px-4 py-2.5 rounded-xl border border-slate-200 bg-white transition-all text-slate-600 ${
                step === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-slate-50 active:scale-95'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md shadow-brand-primary/10 active:scale-95"
            >
              {step === 4 ? 'Confirm Booking' : 'Continue'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
