import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Coins, FileText, ChevronRight, User, MapPin, Truck, HelpCircle, FileCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveTab } = useApp();

  return (
    <div className="relative bg-gradient-to-br from-brand-lightBlue via-white to-brand-lightTeal pt-10 pb-16 md:py-20 overflow-hidden">
      {/* Decorative background blur shapes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-72 h-72 rounded-full bg-brand-primary/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-72 h-72 rounded-full bg-brand-teal/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Hero text content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase">
              <ShieldCheck className="h-4 w-4" />
              <span>Diagnostic Healthcare for Bharat</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-brand-navy leading-[1.1]">
              {t('hero.title')}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
              {t('hero.subtitle')}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                onClick={() => setActiveTab('tests')}
                className="bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-base px-8 py-3.5 rounded-2xl transition-all shadow-md shadow-brand-primary/10 hover:shadow-lg active:scale-95"
              >
                {t('hero.ctaBook')}
              </button>

              <button
                onClick={() => setActiveTab('centers')}
                className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold text-base px-8 py-3.5 rounded-2xl transition-all shadow-sm active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>{t('hero.ctaCenter')}</span>
                <ChevronRight className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            {/* Trust Markers */}
            <div className="border-t border-slate-200/80 pt-6">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                DiagBuddy Promise
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500 font-medium">
                <span className="flex items-center"><ShieldCheck className="h-4 w-4 text-brand-teal mr-1.5" /> Trusted Collection</span>
                <span className="flex items-center"><Coins className="h-4 w-4 text-brand-teal mr-1.5" /> Transparent Pricing</span>
                <span className="flex items-center"><FileText className="h-4 w-4 text-brand-teal mr-1.5" /> Digital Reports</span>
              </div>
            </div>
          </div>

          {/* Hero Visual: Animated Patient Journey */}
          <div className="lg:col-span-6 relative flex justify-center">
            <div className="w-full max-w-lg bg-white/60 backdrop-blur-md rounded-3xl p-6 md:p-8 border border-white/80 shadow-xl relative overflow-hidden">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-6 text-center">
                Visual Journey: How it works
              </h3>

              <div className="grid grid-cols-5 gap-2 relative">
                
                {/* Horizontal connection lines */}
                <div className="absolute top-8 left-[10%] right-[10%] h-0.5 bg-slate-200 -z-10" />

                {/* Step 1: Patient */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 border-2 border-slate-200">
                    <User className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-slate-600">Patient</span>
                </div>

                {/* Step 2: Center */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-brand-lightTeal flex items-center justify-center text-brand-teal border-2 border-brand-teal/20">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-brand-teal">Local Hub</span>
                </div>

                {/* Step 3: Logistics */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-brand-lightBlue flex items-center justify-center text-brand-primary border-2 border-brand-primary/20 relative animate-pulse">
                    <Truck className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-brand-primary">Pickup</span>
                </div>

                {/* Step 4: Central Lab */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-brand-lightBlue flex items-center justify-center text-brand-blue border-2 border-brand-blue/20">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-brand-blue">Accredited Lab</span>
                </div>

                {/* Step 5: Report */}
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 border-2 border-emerald-200">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] md:text-xs font-bold text-emerald-600">Digital Report</span>
                </div>
              </div>

              {/* Tagline Box */}
              <div className="mt-8 bg-brand-navy text-white rounded-2xl p-4 text-center">
                <p className="text-xs uppercase tracking-widest text-brand-teal font-bold mb-1">Our Core Strategy</p>
                <p className="text-sm md:text-base font-semibold leading-snug">
                  "We don\'t build a lab in every town. We build the network that makes every sample count."
                </p>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
