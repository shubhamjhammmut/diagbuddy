import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp, type ActiveTab } from '../context/AppContext';
import { HeartPulse, Globe, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { activeTab, setActiveTab } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { labelKey: string; tab: ActiveTab }[] = [
    { labelKey: 'nav.home', tab: 'home' },
    { labelKey: 'nav.tests', tab: 'tests' },
    { labelKey: 'nav.centers', tab: 'centers' },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="bg-brand-primary/10 p-2 rounded-xl text-brand-primary mr-2 flex items-center justify-center">
              <HeartPulse className="h-6 w-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-brand-navy">Diag<span className="text-brand-primary">Buddy</span></span>
              <p className="text-[9px] -mt-1 font-medium text-brand-teal hidden sm:block">Reliable Diagnostics. Every Town.</p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => {
                  setActiveTab(item.tab);
                  setMobileMenuOpen(false);
                }}
                className={`text-sm font-semibold transition-all py-2 border-b-2 ${
                  activeTab === item.tab
                    ? 'border-brand-primary text-brand-primary'
                    : 'border-transparent text-slate-600 hover:text-brand-primary hover:border-slate-300'
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}

            {/* Quick dashboard shortcuts for demo */}
            <div className="bg-slate-100 p-1 rounded-lg flex space-x-1 border border-slate-200">
              <button 
                onClick={() => setActiveTab('user-dashboard')}
                className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                  activeTab === 'user-dashboard' ? 'bg-white text-brand-navy shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Rahul (Patient)
              </button>
              <button 
                onClick={() => setActiveTab('partner-dashboard')}
                className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                  activeTab === 'partner-dashboard' ? 'bg-white text-brand-teal shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Partner Shop
              </button>
              <button 
                onClick={() => setActiveTab('logistics-dashboard')}
                className={`text-xs font-semibold px-2 py-1 rounded transition-colors ${
                  activeTab === 'logistics-dashboard' ? 'bg-white text-brand-blue shadow-sm' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Logistics Hub
              </button>
            </div>
          </div>

          {/* Right actions: Language, Booking CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Selector */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold border border-slate-300 rounded-lg text-slate-700 bg-white hover:bg-slate-50 transition-colors"
            >
              <Globe className="h-4 w-4 text-slate-500" />
              <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>

            {/* Track CTA */}
            <button
              onClick={() => setActiveTab('track')}
              className="text-xs font-bold text-slate-700 hover:text-brand-primary transition-colors"
            >
              {t('btn.trackSample')}
            </button>

            {/* Book Now Button */}
            <button
              onClick={() => setActiveTab('tests')}
              className="bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-sm px-4 py-2 rounded-xl transition-all shadow-md shadow-brand-primary/10 hover:shadow-lg active:scale-95"
            >
              {t('nav.bookTest')}
            </button>
          </div>

          {/* Mobile Right: Menu button + Language Toggle */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="p-2 border border-slate-300 rounded-lg text-slate-700 bg-white"
            >
              <Globe className="h-4 w-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 border border-slate-200 rounded-lg text-slate-700 bg-white hover:bg-slate-50"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-2 shadow-inner">
          {navItems.map((item) => (
            <button
              key={item.tab}
              onClick={() => {
                setActiveTab(item.tab);
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left block px-3 py-2.5 rounded-lg text-sm font-semibold ${
                activeTab === item.tab 
                  ? 'bg-brand-lightBlue text-brand-primary' 
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {t(item.labelKey)}
            </button>
          ))}
          <div className="border-t border-slate-100 my-2 pt-2 space-y-1">
            <p className="text-[10px] text-slate-400 font-bold px-3 uppercase tracking-wider">Demo Dashboards</p>
            <button
              onClick={() => {
                setActiveTab('user-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Rahul's Patient Dashboard
            </button>
            <button
              onClick={() => {
                setActiveTab('partner-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Partner Store Portal
            </button>
            <button
              onClick={() => {
                setActiveTab('logistics-dashboard');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Fleet Logistics Console
            </button>
          </div>
          <div className="pt-2">
            <button
              onClick={() => {
                setActiveTab('tests');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center bg-brand-primary text-white font-bold py-2.5 rounded-xl shadow"
            >
              {t('nav.bookTest')}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
