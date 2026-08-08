import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Activity, Thermometer, Truck, AlertTriangle, Play } from 'lucide-react';

export const LogisticsDashboard: React.FC = () => {
  const { routes, triggerMockLogisticsPickup } = useApp();
  const [simulationLogs, setSimulationLogs] = useState<string[]>([]);
  const [btnLoading, setBtnLoading] = useState(false);

  // Stats
  const activeRoutesCount = routes.filter(r => r.status !== 'Completed').length;
  const totalSamplesInTransit = routes.reduce((sum, r) => sum + r.samplesCount, 0);
  const tempAlertsCount = routes.filter(r => r.temperatureC > 4.5).length;

  // Chart data representing sample collections per route
  const chartData = routes.map(r => ({
    name: r.routeName.split(' — ')[1] || r.routeName,
    Samples: r.samplesCount,
    Distance: r.distanceKm
  }));

  const handleSimulateStep = async () => {
    setBtnLoading(true);
    await triggerMockLogisticsPickup();
    
    const randomRoute = routes[Math.floor(Math.random() * routes.length)];
    const log = `[${new Date().toLocaleTimeString()}] Optimized pickup on ${randomRoute.routeName.split(' — ')[0]}. Temperature logged: ${randomRoute.temperatureC}°C. Status: ${randomRoute.status}`;
    
    setSimulationLogs(prev => [log, ...prev].slice(0, 5));
    setTimeout(() => setBtnLoading(false), 500);
  };

  return (
    <div className="py-10 bg-brand-gray min-h-[90vh] pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 space-y-6">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-6 md:p-8 rounded-3xl border border-slate-800 shadow-lg flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-2xl bg-brand-primary/20 text-brand-primary flex items-center justify-center">
              <Activity className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold">Internal Logistics Hub</h1>
              <p className="text-xs text-slate-400 font-medium">Telemetry Dispatch & Cold-Chain Analytics Console</p>
            </div>
          </div>

          <button
            onClick={handleSimulateStep}
            disabled={btnLoading}
            className="bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-brand-primary/5 flex items-center space-x-1.5 active:scale-95 disabled:opacity-50"
          >
            <Play className={`h-4 w-4 ${btnLoading ? 'animate-spin' : ''}`} />
            <span>Simulate Logistics Route Step</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-brand-primary/10 rounded-2xl text-brand-primary">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Active Routes</span>
              <p className="text-xl font-extrabold text-brand-navy mt-0.5">{activeRoutesCount}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-brand-teal/10 rounded-2xl text-brand-teal">
              <Activity className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Samples In Transit</span>
              <p className="text-xl font-extrabold text-brand-navy mt-0.5">{totalSamplesInTransit}</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
              <Thermometer className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Target Temperature</span>
              <p className="text-xl font-extrabold text-emerald-600 mt-0.5">2.0°C - 8.0°C</p>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center space-x-4">
            <div className={`p-3 rounded-2xl ${tempAlertsCount > 0 ? 'bg-rose-50 text-rose-600' : 'bg-slate-50 text-slate-400'}`}>
              <AlertTriangle className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Temperature Alerts</span>
              <p className={`text-xl font-extrabold mt-0.5 ${tempAlertsCount > 0 ? 'text-rose-600' : 'text-slate-700'}`}>
                {tempAlertsCount}
              </p>
            </div>
          </div>
        </div>

        {/* Chart & Live Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Chart Card */}
          <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-brand-navy text-sm md:text-base border-b border-slate-100 pb-3">
              Route Volumes: Samples Collected
            </h3>

            <div className="w-full h-64 text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip contentStyle={{ background: '#0f172a', color: '#fff', borderRadius: '12px' }} />
                  <Bar dataKey="Samples" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Route Status Table */}
          <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-extrabold text-brand-navy text-sm md:text-base border-b border-slate-100 pb-3">
              Telemetry Log: Active Routes
            </h3>

            <div className="space-y-3">
              {routes.map((rt) => (
                <div key={rt.id} className="p-3 border border-slate-100 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <h4 className="font-bold text-brand-navy">{rt.routeName.split(' — ')[0]}</h4>
                    <p className="text-[10px] text-slate-500 font-semibold mt-0.5">{rt.routeName.split(' — ')[1]}</p>
                    <div className="flex items-center space-x-3 mt-1 text-[10px] text-slate-400 font-bold">
                      <span className="flex items-center"><Thermometer className="h-3.5 w-3.5 mr-0.5 text-brand-teal" /> {rt.temperatureC}°C</span>
                      <span>{rt.distanceKm} km</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[9px] uppercase ${
                      rt.status === 'Delayed' ? 'bg-rose-50 text-rose-600 border border-rose-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                    }`}>
                      {rt.status}
                    </span>
                    <p className="text-[10px] text-slate-400 font-bold mt-1">ETA: {rt.eta}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Simulation logs display */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Optimized Dispatch Center Log (Simulated Operations)
          </h4>
          <div className="bg-slate-900 rounded-2xl p-4 font-mono text-[10px] text-brand-teal space-y-2 h-36 overflow-y-auto">
            {simulationLogs.length > 0 ? (
              simulationLogs.map((log, idx) => (
                <p key={idx} className="leading-relaxed">{log}</p>
              ))
            ) : (
              <p className="text-slate-500">No simulation logs. Click "Simulate Logistics Route Step" to run automated fleet protocols.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
