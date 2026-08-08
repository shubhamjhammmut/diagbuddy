import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Hero } from '../components/Hero';
import { QuickActions } from '../components/QuickActions';
import { LogisticsSection } from '../components/LogisticsSection';
import { BusinessModelVisual } from '../components/BusinessModelVisual';
import { FAQ } from '../components/FAQ';
import { mockPackages, type TestItem } from '../utils/mockData';
import { BookingFlowModal } from '../components/BookingFlowModal';
import { PartnerRegistrationModal } from '../components/PartnerRegistrationModal';
import { B2BQuoteModal } from '../components/B2BQuoteModal';
import { ShieldCheck, Sparkles, Building2, Store, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveTab } = useApp();
  
  // Modal states
  const [selectedTest, setSelectedTest] = useState<TestItem | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const handleBookPackage = (pkgName: string, pkgPrice: number) => {
    // Generate a temporary mock TestItem matching the package parameters
    const mockPkgTest: TestItem = {
      id: `pkg-${pkgName.replace(/\s+/g, '-').toLowerCase()}`,
      name: pkgName,
      code: 'PACKAGE',
      price: pkgPrice,
      category: 'Health Packages',
      homeAvailable: true,
      tatHours: 24,
      description: `Premium health checkup package comprising relevant diagnostic profiles.`,
      components: []
    };
    setSelectedTest(mockPkgTest);
    setBookingOpen(true);
  };

  return (
    <div className="space-y-0">
      
      {/* 1. Hero & Navigation helper */}
      <Hero />

      {/* 2. Touch-friendly Quick Action Cards */}
      <QuickActions />

      {/* 3. Popular Health Packages Catalog */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1">
              <Sparkles className="h-3 w-3" />
              <span>Diagnostic Packages</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy mt-4">
              Affordable Health Checkups
            </h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              Standard checkups formulated for families in Tier 2 & 3 districts. Fully optimized for cold-chain safety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockPackages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`bg-white border rounded-3xl p-6 flex flex-col justify-between relative shadow-sm hover:shadow-md transition-shadow duration-200 ${
                  pkg.popular ? 'border-brand-primary ring-2 ring-brand-primary/10' : 'border-slate-200'
                }`}
              >
                {pkg.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-[10px] uppercase font-bold py-1 px-3 rounded-full tracking-wider">
                    Most Popular
                  </span>
                )}
                <div>
                  <h3 className="font-bold text-base text-brand-navy">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed h-10">{pkg.description}</p>
                  
                  <div className="border-t border-slate-100 my-4 pt-3">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Includes Tests</p>
                    <div className="flex flex-wrap gap-1.5">
                      {pkg.tests.map((test, index) => (
                        <span key={index} className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200/50">
                          {test}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-[10px] font-semibold text-slate-400">Total Price</span>
                    <span className="text-2xl font-black text-brand-navy">₹{pkg.price}</span>
                  </div>
                  <button
                    onClick={() => handleBookPackage(pkg.name, pkg.price)}
                    className="w-full bg-brand-primary hover:bg-brand-primary/95 text-white font-bold py-2.5 rounded-xl text-xs transition-all text-center block shadow-md shadow-brand-primary/5 active:scale-98"
                  >
                    {t('btn.bookNow')}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center bg-slate-50 rounded-2xl p-4 border border-slate-100 max-w-xl mx-auto">
            <p className="text-[11px] font-semibold text-slate-500">
              💡 Looking for specific tests like Thyroid, Sugar, or CBC?
            </p>
            <button 
              onClick={() => setActiveTab('tests')} 
              className="text-xs font-bold text-brand-primary hover:text-brand-primary/80 mt-1 inline-flex items-center"
            >
              <span>Search Diagnostic Catalog</span>
              <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </div>

        </div>
      </section>

      {/* 4. Visual 5-Step Process */}
      <section className="py-16 bg-brand-gray border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-teal bg-brand-teal/10 border border-brand-teal/20 px-3 py-1 rounded-full">
              Standard Operational Flow
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy mt-4">
              How DiagBuddy Works
            </h2>
            <p className="text-slate-500 text-sm mt-2">
              Simplified diagnostic workflow built for tier towns.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-center relative">
            {[
              { step: '01', title: 'Book Test', desc: 'Book online, via WhatsApp, or directly at our partner pharmacies.' },
              { step: '02', title: 'Collect', desc: 'Visit the local pharmacy center or request home collection.' },
              { step: '03', title: 'Cold-Chain Pickup', desc: 'Samples are consolidated and picked up in temperature-controlled boxes.' },
              { step: '04', title: 'Lab Testing', desc: 'Samples arrive at our centralized accredited laboratory partner.' },
              { step: '05', title: 'Digital Report', desc: 'Get your verified diagnostic report directly on WhatsApp or our dashboard.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative">
                <span className="text-4xl font-extrabold text-brand-primary/10 absolute top-4 right-6">{item.step}</span>
                <h3 className="font-bold text-sm text-brand-navy mt-4 mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Smart Logistics & Telemetry Section */}
      <LogisticsSection />

      {/* 6. Economic Flywheel */}
      <BusinessModelVisual />

      {/* 7. Partner Onboarding Section */}
      <section id="partner-section" className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            <div className="p-8 md:p-12 lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-1.5 bg-brand-teal/15 text-brand-teal px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  <Store className="h-4 w-4" />
                  <span>B2B2C Partner Network</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                  {t('partner.title')}
                </h2>
                <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                  {t('partner.desc')} We provide all collection training, logistics coolers, and digital dashboards. Earn commissions on every test referred or sample deposited.
                </p>
              </div>

              {/* Commission Flywheel Highlights */}
              <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Additional Income</h4>
                  <p className="text-base font-bold text-white mt-1">₹5,000 - ₹15,000+ / mo</p>
                  <p className="text-[10px] text-slate-500">Based on referred volumes</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Setup Costs</h4>
                  <p className="text-base font-bold text-brand-teal mt-1">Zero Investment</p>
                  <p className="text-[10px] text-slate-500">Kits and marketing provided</p>
                </div>
              </div>

              <div>
                <button
                  onClick={() => setPartnerOpen(true)}
                  className="bg-brand-teal hover:bg-brand-teal/90 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-md shadow-brand-teal/10"
                >
                  Become a Partner
                </button>
              </div>
            </div>

            {/* Illustration side */}
            <div className="bg-slate-950 lg:col-span-5 p-8 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-800">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Partner Dashboard Preview</h3>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-xs space-y-3 font-mono">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-slate-400">Merchant Code:</span>
                  <span className="text-brand-teal font-bold">DB-GOR-001</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-950 p-2 rounded">
                    <p className="text-[10px] text-slate-500 uppercase">Today's Samples</p>
                    <p className="text-base font-bold text-white mt-0.5">18</p>
                  </div>
                  <div className="bg-slate-950 p-2 rounded">
                    <p className="text-[10px] text-slate-500 uppercase">Earnings</p>
                    <p className="text-base font-bold text-emerald-400 mt-0.5">₹1,850</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded border border-slate-800/80">
                  <p className="text-[9px] text-slate-500 uppercase">Last Drop-off</p>
                  <p className="text-[10px] text-slate-300 mt-0.5">DB-10245 • Rahul Kumar</p>
                  <p className="text-[9px] text-slate-500 mt-0.5">Status: In Transit</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. B2B Organization Section */}
      <section id="b2b-section" className="py-16 bg-brand-gray border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-primary bg-brand-primary/10 border border-brand-primary/20 px-3.5 py-1.5 rounded-full inline-flex items-center space-x-1">
              <Building2 className="h-3 w-3" />
              <span>B2B Health Programs</span>
            </span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-brand-navy mt-4">
              {t('b2b.title')}
            </h2>
            <p className="text-slate-500 text-sm mt-2 leading-relaxed">
              {t('b2b.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { title: 'Corporate Offices', desc: 'Employee annual checkup packages, digital dashboard integration.' },
              { title: 'Hospitals & Clinics', desc: 'Outsource laboratory processing and sample cold-chain logistics.' },
              { title: 'Schools & Colleges', desc: 'Mass student health screening, physical reports and vitals audits.' },
              { title: 'Workforce & Factories', desc: 'On-site health checkup camps, fitness audits for manual labor.' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                <h3 className="font-bold text-sm text-brand-navy mb-2">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setQuoteOpen(true)}
              className="bg-brand-primary hover:bg-brand-primary/95 text-white font-bold text-sm px-8 py-3 rounded-xl transition-all shadow-md shadow-brand-primary/10"
            >
              Request Organization Quote
            </button>
          </div>

        </div>
      </section>

      {/* 9. Trust & Disclaimer */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-2xl font-bold text-brand-navy flex items-center justify-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-brand-teal" />
            <span>{t('trust.title')}</span>
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed font-medium">
            {t('trust.points')}
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-[10px] text-amber-700 leading-relaxed font-semibold">
            {t('trust.disclaimer')}
          </div>
        </div>
      </section>

      {/* 10. FAQ Collapsible Panel */}
      <FAQ />

      {/* Booking Form Overlay */}
      <BookingFlowModal 
        isOpen={bookingOpen} 
        test={selectedTest} 
        onClose={() => {
          setBookingOpen(false);
          setSelectedTest(null);
        }} 
      />

      {/* Partner Form Overlay */}
      <PartnerRegistrationModal 
        isOpen={partnerOpen} 
        onClose={() => setPartnerOpen(false)} 
      />

      {/* B2B Quote Form Overlay */}
      <B2BQuoteModal 
        isOpen={quoteOpen} 
        onClose={() => setQuoteOpen(false)} 
      />

    </div>
  );
};
