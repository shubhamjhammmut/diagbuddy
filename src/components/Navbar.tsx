import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp, type ActiveTab } from '../context/AppContext';
import { LoginModal } from './LoginModal';
import { HeartPulse, Globe, Menu, X, LogOut, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { activeTab, setActiveTab, currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const navItems: { labelKey: string; tab: ActiveTab }[] = [
    { labelKey: 'nav.home', tab: 'home' },
    { labelKey: 'nav.tests', tab: 'tests' },
    { labelKey: 'nav.centers', tab: 'centers' },
  ];

  const getUserBadgeLabel = () => {
    if (currentUser === 'patient') return 'Rahul (Patient)';
    if (currentUser === 'partner') return 'Partner Hub';
    if (currentUser === 'logistics') return 'Fleet Log';
    return '';
  };

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

            {/* If logged in, show quick dashboard access link */}
            {currentUser && (
              <button
                onClick={() => {
                  if (currentUser === 'patient') setActiveTab('user-dashboard');
                  if (currentUser === 'partner') setActiveTab('partner-dashboard');
                  if (currentUser === 'logistics') setActiveTab('logistics-dashboard');
                }}
                className={`text-sm font-semibold transition-all py-2 border-b-2 ${
                  activeTab.includes('dashboard')
                    ? 'border-brand-teal text-brand-teal'
                    : 'border-transparent text-slate-600 hover:text-brand-teal hover:border-slate-300'
                }`}
              >
                My Dashboard
              </button>
            )}
          </div>

          {/* Right actions: Language, Login / Profile status */}
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

            {/* Auth Block */}
            {currentUser ? (
              <div className="flex items-center space-x-3 bg-slate-100 p-1.5 rounded-xl border border-slate-200/60">
                <div className="flex items-center space-x-1 px-2.5 py-1 bg-white text-xs font-bold rounded-lg text-brand-navy shadow-sm">
                  <User className="h-3.5 w-3.5 text-brand-primary" />
                  <span>{getUserBadgeLabel()}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setLoginModalOpen(true)}
                className="text-xs font-bold text-slate-700 hover:text-brand-primary transition-colors border border-slate-300 px-3.5 py-1.5 rounded-lg bg-white"
              >
                Login
              </button>
            )}

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
            {currentUser ? (
              <div className="space-y-2">
                <button
                  onClick={() => {
                    if (currentUser === 'patient') setActiveTab('user-dashboard');
                    if (currentUser === 'partner') setActiveTab('partner-dashboard');
                    if (currentUser === 'logistics') setActiveTab('logistics-dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 bg-slate-50"
                >
                  Go to my Dashboard ({getUserBadgeLabel()})
                </button>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left text-rose-600 block px-3 py-2 rounded-lg text-xs font-semibold hover:bg-rose-50"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setLoginModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left block px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Sign In / Demo Login
              </button>
            )}
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

      {/* Login Modal Overlay */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
      />
    </nav>
  );
};
