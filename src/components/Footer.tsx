import React from 'react';
import { useApp } from '../context/AppContext';
import { HeartPulse, Phone, MessageSquare } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveTab } = useApp();

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="bg-brand-primary p-2 rounded-xl text-white mr-2 flex items-center justify-center">
                <HeartPulse className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">Diag<span className="text-brand-primary">Buddy</span></span>
            </div>
            <p className="text-sm text-slate-400">
              Reliable Diagnostics. Smarter Logistics. Every Town.
            </p>
            <p className="text-xs text-slate-500">
              DiagBuddy connects patients, local pharmacies, clinics, and accredited labs for seamless, low-cost sample pickup.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Patient Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-white transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('tests')} className="hover:text-white transition-colors">Book a Test</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('track')} className="hover:text-white transition-colors">Track Sample</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('centers')} className="hover:text-white transition-colors">Nearby Centers</button>
              </li>
            </ul>
          </div>

          {/* Business Links */}
          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Business & Partners</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setActiveTab('partner-dashboard')} className="hover:text-white transition-colors">Partner Dashboard</button>
              </li>
              <li>
                <button onClick={() => {
                  setActiveTab('home');
                  setTimeout(() => {
                    const el = document.getElementById('partner-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} className="hover:text-white transition-colors">Become a Partner</button>
              </li>
              <li>
                <button onClick={() => {
                  setActiveTab('home');
                  setTimeout(() => {
                    const el = document.getElementById('b2b-section');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }, 100);
                }} className="hover:text-white transition-colors">For Organizations</button>
              </li>
              <li>
                <button onClick={() => setActiveTab('logistics-dashboard')} className="hover:text-white transition-colors">Logistics Operations</button>
              </li>
            </ul>
          </div>

          {/* Contact Support */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-2">Connect & Support</h3>
            <p className="text-xs text-slate-400">Need help booking or tracking? Get in touch with our local buddies.</p>
            
            <div className="space-y-2">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noreferrer"
                className="flex items-center space-x-2 w-full justify-center bg-[#25d366] hover:bg-[#25d366]/90 text-white font-bold py-2 px-4 rounded-xl text-sm transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                <span>WhatsApp Us</span>
              </a>

              <a
                href="tel:+919999999999"
                className="flex items-center space-x-2 w-full justify-center border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white font-bold py-2 px-4 rounded-xl text-sm transition-all bg-slate-800"
              >
                <Phone className="h-4 w-4" />
                <span>Call +91 99999 99999</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 space-y-4 md:space-y-0">
          <p>© 2026 DiagBuddy Diagnostics Private Limited. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
            <span className="text-[10px] text-slate-600 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
              Demo Version (No real diagnostic processing)
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
