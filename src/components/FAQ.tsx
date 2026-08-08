import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      q: 'Is DiagBuddy a laboratory?',
      a: 'No. DiagBuddy is a sample collection and cold-chain logistics platform. We partner with accredited clinical laboratories to process samples, while we handle the local aggregation, route optimization, and digital delivery of reports.'
    },
    {
      q: 'Can I book a test from home?',
      a: 'Yes! Where home collection is available in our service zones, you can request a certified health representative to collect your sample at your address.'
    },
    {
      q: 'How do I track my sample?',
      a: 'Once your sample is collected, you will receive a unique Sample ID (e.g. DB-10245) via SMS/WhatsApp. Enter this ID on our Track Sample page to monitor its real-time temperature, transport status, and lab progression.'
    },
    {
      q: 'Can my pharmacy or local clinic become a partner?',
      a: 'Yes. We partner with local healthcare providers, retail pharmacies, and clinics to expand our collection points. Partners earn commissions on referred tests while receiving full training and sample collection kits.'
    },
    {
      q: 'Do you serve Tier 2 and Tier 3 cities?',
      a: 'That is our primary focus. We design our collection and logistics network specifically to solve the diagnostic access challenges in smaller towns and districts.'
    },
    {
      q: 'Can organizations use DiagBuddy?',
      a: 'Yes. We offer bulk preventive screenings, employee health checkup programs, and workforce health camps for factories, schools, colleges, and NGOs.'
    }
  ];

  return (
    <div className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-brand-navy flex items-center justify-center space-x-2">
            <HelpCircle className="h-6 w-6 text-brand-primary" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="text-slate-500 text-sm mt-2">Have questions about how DiagBuddy works? Read below.</p>
        </div>

        {/* FAQ list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-slate-50/50 hover:bg-slate-50"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex justify-between items-center px-6 py-4.5 text-left font-bold text-sm md:text-base text-brand-navy focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-5 w-5 text-slate-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-500 flex-shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-5 pt-1 border-t border-slate-200/60 text-xs md:text-sm text-slate-600 leading-relaxed bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
