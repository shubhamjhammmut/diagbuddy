import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../context/LanguageContext';
import { Home, Search, Truck, ClipboardList, LayoutDashboard } from 'lucide-react';

export const MobileNav: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();
  const { t } = useLanguage();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-4 py-2 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="flex justify-around items-center">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'home' ? 'text-brand-primary font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <Home className={`h-5 w-5 ${activeTab === 'home' ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
          <span className="text-[10px] mt-1">{t('nav.home')}</span>
        </button>

        <button
          onClick={() => setActiveTab('tests')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'tests' ? 'text-brand-primary font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <Search className={`h-5 w-5 ${activeTab === 'tests' ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
          <span className="text-[10px] mt-1">Book</span>
        </button>

        <button
          onClick={() => setActiveTab('track')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'track' ? 'text-brand-primary font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <Truck className={`h-5 w-5 ${activeTab === 'track' ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
          <span className="text-[10px] mt-1">Track</span>
        </button>

        <button
          onClick={() => setActiveTab('user-dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'user-dashboard' ? 'text-brand-primary font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <ClipboardList className={`h-5 w-5 ${activeTab === 'user-dashboard' ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
          <span className="text-[10px] mt-1">Reports</span>
        </button>

        <button
          onClick={() => setActiveTab('partner-dashboard')}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
            activeTab === 'partner-dashboard' ? 'text-brand-teal font-bold' : 'text-slate-500 font-medium'
          }`}
        >
          <LayoutDashboard className={`h-5 w-5 ${activeTab === 'partner-dashboard' ? 'stroke-[2.5]' : 'stroke-[2]'}`} />
          <span className="text-[10px] mt-1">Partner</span>
        </button>
      </div>
    </div>
  );
};
