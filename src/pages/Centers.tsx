import React, { useState } from 'react';
import { mockCenters, type CenterItem } from '../utils/mockData';
import { Search, MapPin, Navigation, Clock, Phone, Compass } from 'lucide-react';

export const Centers: React.FC = () => {
  const [searchVal, setSearchVal] = useState('');
  const [selectedCenter, setSelectedCenter] = useState<CenterItem | null>(mockCenters[0]);
  const [isLocating, setIsLocating] = useState(false);
  const [directionsMessage, setDirectionsMessage] = useState<string | null>(null);

  // Filter centers based on query
  const filteredCenters = mockCenters.filter(c => {
    return c.city.toLowerCase().includes(searchVal.toLowerCase()) || 
           c.pin.includes(searchVal) ||
           c.name.toLowerCase().includes(searchVal.toLowerCase());
  });

  const handleUseLocation = () => {
    setIsLocating(true);
    setSearchVal('');
    setTimeout(() => {
      setIsLocating(false);
      // Default to Gorakhpur center Shakti Medical Store for demo purposes
      setSelectedCenter(mockCenters[0]);
      setSearchVal('Gorakhpur');
    }, 800);
  };

  const handleGetDirections = (centerName: string) => {
    setDirectionsMessage(`Directions to ${centerName}: Proceed 200m North, then turn left at Deoria Road crossroads. (Simulated Directions)`);
    setTimeout(() => setDirectionsMessage(null), 5000);
  };

  return (
    <div className="py-10 bg-brand-gray min-h-[80vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Page Header */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-extrabold text-brand-navy">Nearby Collection Centers</h1>
          <p className="text-slate-500 text-xs md:text-sm mt-1">Book diagnostic test deposits through trusted neighborhood chemist shops.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: Locator & list */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Locator Card */}
            <div className="bg-white p-4.5 rounded-3xl border border-slate-200 shadow-sm space-y-3.5">
              <div className="relative">
                <Search className="absolute left-4.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Enter City or PIN (e.g. 273001, Gorakhpur)..."
                  value={searchVal}
                  onChange={(e) => setSearchVal(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm focus:border-brand-teal focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleUseLocation}
                  disabled={isLocating}
                  className="flex-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1.5"
                >
                  <Compass className={`h-4 w-4 text-slate-500 ${isLocating ? 'animate-spin' : ''}`} />
                  <span>{isLocating ? 'Locating...' : 'Use My Location'}</span>
                </button>
              </div>
            </div>

            {/* Directions Alert Notification */}
            {directionsMessage && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-start space-x-2 text-xs text-emerald-800 animate-bounce">
                <Navigation className="h-4 w-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="font-semibold">{directionsMessage}</p>
              </div>
            )}

            {/* Centers List */}
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {filteredCenters.length > 0 ? (
                filteredCenters.map((center) => (
                  <button
                    key={center.id}
                    onClick={() => setSelectedCenter(center)}
                    className={`w-full text-left p-5 rounded-3xl border-2 transition-all flex justify-between items-start ${
                      selectedCenter?.id === center.id
                        ? 'bg-brand-lightTeal border-brand-teal'
                        : 'bg-white border-slate-200/80 hover:border-slate-300'
                    }`}
                  >
                    <div className="space-y-1">
                      <h3 className="font-bold text-sm text-brand-navy">{center.name}</h3>
                      <p className="text-[11px] text-slate-500">{center.address}, {center.city}</p>
                      
                      <div className="flex items-center space-x-4 pt-2 text-[10px] text-slate-400 font-bold">
                        <span className="flex items-center"><MapPin className="h-3.5 w-3.5 text-brand-teal mr-1" /> {center.distanceKm} km</span>
                        <span className="flex items-center"><Clock className="h-3.5 w-3.5 text-brand-teal mr-1" /> Open until 8 PM</span>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <div className="bg-white border rounded-3xl p-8 text-center text-slate-400 text-xs">
                  No partners found matching your search.
                </div>
              )}
            </div>

          </div>

          {/* Right panel: Map & Details view */}
          <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
            
            {/* Map Visualizer Placeholder */}
            <div className="w-full h-64 bg-slate-100 rounded-2xl border border-slate-200 overflow-hidden relative flex items-center justify-center">
              {/* Map background grids and circles */}
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              <div className="absolute w-48 h-48 rounded-full border-2 border-brand-teal/15 animate-ping pointer-events-none" />
              <div className="absolute w-24 h-24 rounded-full border border-brand-teal/30 pointer-events-none" />

              {/* Patient Pin */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="w-6 h-6 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                  <span className="text-[9px] font-bold">Me</span>
                </div>
              </div>

              {/* Selected Center Pin */}
              {selectedCenter && (
                <div className="absolute top-[35%] left-[62%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
                  <div className="bg-brand-teal text-white p-2 rounded-full shadow-lg border-2 border-white animate-bounce flex items-center justify-center">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div className="bg-slate-900/90 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                    {selectedCenter.name.split(' — ')[1] || selectedCenter.name}
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur text-white text-[9px] font-bold px-2.5 py-1 rounded border border-slate-700 uppercase tracking-wide">
                Simulated Locator Radar
              </div>
            </div>

            {/* Selected center details */}
            {selectedCenter ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold text-brand-teal bg-brand-teal/5 border border-brand-teal/10 px-2 py-0.5 rounded uppercase">
                    {selectedCenter.businessType} Partner
                  </span>
                  <h2 className="text-xl font-bold text-brand-navy mt-1.5">{selectedCenter.name}</h2>
                  <p className="text-xs text-slate-500">{selectedCenter.address}, {selectedCenter.city} - {selectedCenter.pin}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-4 text-xs">
                  <div className="space-y-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">Hours of Operation</span>
                    <p className="font-semibold text-slate-700 flex items-center"><Clock className="h-4 w-4 text-brand-teal mr-1.5" /> {selectedCenter.hours}</p>
                  </div>
                  <div className="space-y-1">
                    <span className="font-bold text-slate-400 uppercase text-[10px]">Contact Pharmacy</span>
                    <p className="font-semibold text-slate-700 flex items-center"><Phone className="h-4 w-4 text-brand-teal mr-1.5" /> {selectedCenter.phone}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleGetDirections(selectedCenter.name)}
                    className="flex-1 bg-brand-teal hover:bg-brand-teal/95 text-white font-bold text-xs py-3 rounded-xl transition-all shadow-md shadow-brand-teal/5 flex items-center justify-center space-x-1.5 active:scale-98"
                  >
                    <Navigation className="h-4 w-4" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400 py-12 text-sm font-semibold">
                Please select a collection center from the list to view directions and operational hours.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
