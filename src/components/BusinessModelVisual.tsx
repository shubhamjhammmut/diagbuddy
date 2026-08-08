import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Network, Users, Building, ArrowRight, TrendingDown } from 'lucide-react';

export const BusinessModelVisual: React.FC = () => {
  const { t } = useLanguage();

  const steps = [
    {
      id: 'b2b2c',
      title: 'B2B2C Network',
      desc: 'Local pharmacies, clinics & doctors partner to refer patients and host collection points.',
      icon: <Network className="h-6 w-6 text-brand-primary" />,
      tag: 'Demand Aggregation'
    },
    {
      id: 'b2c',
      title: 'B2C Bookings',
      desc: 'Direct bookings via app, phone & WhatsApp increase daily sample density in towns.',
      icon: <Users className="h-6 w-6 text-brand-teal" />,
      tag: 'Volume Scale'
    },
    {
      id: 'b2b',
      title: 'B2B Organizations',
      desc: 'Bulk checkups for schools, factories & companies add high-volume drops to routes.',
      icon: <Building className="h-6 w-6 text-amber-600" />,
      tag: 'Enterprise Density'
    }
  ];

  return (
    <div className="py-16 bg-brand-gray border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3 py-1 rounded-full">
            Economic Flywheel
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-3 text-brand-navy">
            {t('logistics.flywheelTitle')}
          </h2>
          <p className="text-sm md:text-base text-slate-600 mt-4 leading-relaxed">
            By aggregating multiple channels, we increase route efficiency and lower processing costs.
          </p>
        </div>

        {/* Channels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {steps.map((st, idx) => (
            <div 
              key={st.id} 
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full bg-slate-50 -mr-6 -mt-6 pointer-events-none" />
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Channel 0{idx + 1}</span>
                <div className="p-3 bg-slate-50 border border-slate-100 rounded-2xl w-fit my-3">
                  {st.icon}
                </div>
                <h3 className="font-bold text-lg text-brand-navy">{st.title}</h3>
                <span className="inline-block text-[10px] font-bold text-brand-primary bg-brand-primary/5 px-2.5 py-0.5 rounded-full mt-1.5 border border-brand-primary/10">
                  {st.tag}
                </span>
                <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                  {st.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Flow visual connecting aggregation to pricing */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Steps line */}
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-1 w-full justify-around">
              
              <div className="text-center sm:text-left bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 w-full max-w-[240px]">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Step 1</p>
                <h4 className="text-sm font-bold text-brand-navy mt-1">Consolidated Samples</h4>
                <p className="text-xs text-slate-500 mt-1">B2B2C + B2C + B2B</p>
              </div>

              <div className="hidden sm:block text-slate-400">
                <ArrowRight className="h-5 w-5" />
              </div>

              <div className="text-center sm:text-left bg-slate-50 p-4 rounded-2xl border border-slate-100 flex-1 w-full max-w-[240px]">
                <p className="text-[10px] text-slate-400 uppercase font-bold">Step 2</p>
                <h4 className="text-sm font-bold text-brand-navy mt-1 flex items-center justify-center sm:justify-start">
                  <TrendingDown className="h-4 w-4 text-emerald-500 mr-1" />
                  Lower Logistics Cost
                </h4>
                <p className="text-xs text-slate-500 mt-1">Optimized pickup route</p>
              </div>

              <div className="hidden sm:block text-slate-400">
                <ArrowRight className="h-5 w-5" />
              </div>

              <div className="text-center sm:text-left bg-brand-lightTeal p-4 rounded-2xl border border-brand-teal/20 flex-1 w-full max-w-[240px]">
                <p className="text-[10px] text-brand-teal uppercase font-bold">Step 3</p>
                <h4 className="text-sm font-bold text-brand-teal mt-1">Affordable Diagnostics</h4>
                <p className="text-xs text-brand-teal/80 mt-1">Savings passed to patients</p>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
