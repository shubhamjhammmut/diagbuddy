import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Thermometer, Map, Activity, ShieldCheck, RefreshCw } from 'lucide-react';

export const LogisticsSection: React.FC = () => {
  const { t } = useLanguage();
  const { triggerMockLogisticsPickup, bookings } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const activeBooking = bookings.find(b => b.sampleId === 'DB-10245') || bookings[0];

  const handleSimulate = () => {
    setIsRefreshing(true);
    triggerMockLogisticsPickup();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="py-16 bg-slate-900 text-white overflow-hidden relative border-b border-slate-800">
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-primary/10 blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/10 border border-brand-teal/20 px-3 py-1 rounded-full">
            Proprietary Tech Network
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-white">
            {t('logistics.title')}
          </h2>
          <p className="text-sm md:text-base text-slate-300 mt-4 leading-relaxed">
            {t('logistics.desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Animated Route Map (SVG) */}
          <div className="lg:col-span-7 bg-slate-950 p-6 md:p-8 rounded-3xl border border-slate-800 shadow-2xl relative">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center space-x-2 text-slate-300">
                <Map className="h-4 w-4 text-brand-teal" />
                <span className="text-xs font-bold uppercase tracking-wider">Live Route Optimizer</span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-bold uppercase animate-pulse border border-emerald-400/20">
                Active Feed
              </span>
            </div>

            {/* SVG Visualizing Local aggregation into Lab */}
            <div className="w-full h-64 bg-slate-950/80 rounded-2xl relative border border-slate-800/50 flex items-center justify-center">
              <svg viewBox="0 0 500 240" className="w-full h-full max-w-lg">
                
                {/* Connecting lines from Pharmacy, Clinic to Hub */}
                <path d="M 50,60 L 160,110" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 50,160 L 160,110" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 120,40 L 160,110" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />
                <path d="M 120,180 L 160,110" stroke="#475569" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* Optimized Route from Local Hub to Central Lab */}
                <path 
                  id="optimizedRoute"
                  d="M 160,110 Q 280,40 420,120" 
                  fill="none" 
                  stroke="#0d9488" 
                  strokeWidth="3" 
                  className="animate-route-pulse"
                />
                
                {/* Small vehicle dots on route */}
                <path 
                  d="M 160,110 Q 280,40 420,120" 
                  fill="none" 
                  stroke="#38bdf8" 
                  strokeWidth="3" 
                  className="animate-route-dot"
                />

                {/* Pharmacy Node A */}
                <g transform="translate(50,60)">
                  <circle r="14" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text textAnchor="middle" y="4" fill="#94a3b8" fontSize="8" fontWeight="bold">Ph A</text>
                  <text textAnchor="middle" y="-20" fill="#cbd5e1" fontSize="9" fontWeight="bold">Pharmacy A</text>
                </g>

                {/* Clinic Node B */}
                <g transform="translate(50,160)">
                  <circle r="14" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text textAnchor="middle" y="4" fill="#94a3b8" fontSize="8" fontWeight="bold">Cl B</text>
                  <text textAnchor="middle" y="26" fill="#cbd5e1" fontSize="9" fontWeight="bold">Clinic B</text>
                </g>

                {/* Local Center C */}
                <g transform="translate(120,40)">
                  <circle r="14" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text textAnchor="middle" y="4" fill="#94a3b8" fontSize="8" fontWeight="bold">Ctr C</text>
                </g>

                {/* Pharmacy Node D */}
                <g transform="translate(120,180)">
                  <circle r="14" fill="#1e293b" stroke="#475569" strokeWidth="2" />
                  <text textAnchor="middle" y="4" fill="#94a3b8" fontSize="8" fontWeight="bold">Ph D</text>
                </g>

                {/* Gorakhpur Local Aggregation Hub */}
                <g transform="translate(160,110)">
                  <circle r="22" fill="#115e59" stroke="#0d9488" strokeWidth="3" />
                  <text textAnchor="middle" y="4" fill="#ffffff" fontSize="9" fontWeight="bold">Local Hub</text>
                  <text textAnchor="middle" y="-28" fill="#5eead4" fontSize="10" fontWeight="extrabold">Aggregation</text>
                </g>

                {/* Central Accredited Laboratory */}
                <g transform="translate(420,120)">
                  <circle r="24" fill="#1e3a8a" stroke="#2563eb" strokeWidth="3" />
                  <text textAnchor="middle" y="4" fill="#ffffff" fontSize="8" fontWeight="bold">Central Lab</text>
                  <text textAnchor="middle" y="-30" fill="#38bdf8" fontSize="10" fontWeight="extrabold">Accredited Lab</text>
                </g>

                {/* Moving Truck icon */}
                <g transform="translate(290,65)">
                  <rect x="-8" y="-6" width="16" height="12" rx="2" fill="#0ea5e9" />
                  <rect x="8" y="-2" width="4" height="8" rx="1" fill="#0ea5e9" />
                  <circle cx="-4" cy="8" r="3" fill="#000" />
                  <circle cx="6" cy="8" r="3" fill="#000" />
                </g>
              </svg>

              <div className="absolute bottom-4 left-4 right-4 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl p-3 flex justify-between items-center text-xs">
                <span className="text-slate-400">Optimizing routes for low-volume towns.</span>
                <span className="text-brand-teal font-bold flex items-center"><Activity className="h-3 w-3 mr-1" /> Active Dispatch</span>
              </div>
            </div>
          </div>

          {/* Telemetry Dashboard */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Fleet Diagnostics Monitor
              </h3>
              
              {/* Telemetry Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Samples Today</p>
                  <p className="text-2xl font-bold text-white mt-1">73 samples</p>
                  <p className="text-[10px] text-brand-teal mt-0.5">Across 3 local hubs</p>
                </div>
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <p className="text-[10px] text-slate-400 uppercase font-bold">Cold Chain Temp</p>
                  <p className="text-2xl font-bold text-brand-teal mt-1 flex items-center">
                    <Thermometer className="h-5 w-5 text-brand-teal mr-1" />
                    4.2°C
                  </p>
                  <p className="text-[10px] text-emerald-400 mt-0.5">Target: 2.0°C - 8.0°C</p>
                </div>
              </div>

              {/* Live Sample tracking integration */}
              <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold">Active Sample</p>
                    <p className="text-sm font-bold text-white mt-0.5">ID: {activeBooking?.sampleId || 'DB-10245'}</p>
                    <p className="text-xs text-slate-400 mt-1">{activeBooking?.testName}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase ${
                    activeBooking?.status === 'Report Ready' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-brand-primary/10 text-brand-primary'
                  }`}>
                    {activeBooking?.status || 'In Transit'}
                  </span>
                </div>
              </div>

              {/* CTA to simulate route progression */}
              <div className="pt-2">
                <button
                  onClick={handleSimulate}
                  className="w-full flex items-center justify-center space-x-2 bg-brand-teal hover:bg-brand-teal/90 text-white font-bold py-3 px-4 rounded-2xl shadow transition-all active:scale-98"
                >
                  <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                  <span>{isRefreshing ? 'Optimizing Routes...' : 'Simulate Logistics Pickup'}</span>
                </button>
                <p className="text-[10px] text-slate-500 mt-2 text-center">
                  Pressing this button progress all collected samples along the route steps to simulate actual lab arrivals.
                </p>
              </div>

            </div>

            {/* Strategy Box */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-3xl p-5 flex items-start space-x-3.5">
              <div className="p-2 bg-brand-primary/10 rounded-xl text-brand-primary mt-1">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-200">Accredited Cold-Chain Protocols</h4>
                <p className="text-xs text-slate-400 leading-relaxed mt-1">
                  Samples are stored in certified digital-logger boxes immediately upon collection. Temperature triggers alert logistics dispatchers if levels exceed standard diagnostic parameters.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
