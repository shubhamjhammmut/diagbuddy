import React from 'react';
import { useApp, type UserRole } from '../context/AppContext';
import { X, User, Store, ShieldAlert, Activity } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAsDemoUser } = useApp();

  if (!isOpen) return null;

  const handleDemoLogin = (role: UserRole) => {
    loginAsDemoUser(role);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden border border-slate-100 flex flex-col">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="font-extrabold text-brand-navy text-base">Sign In to DiagBuddy</h3>
            <p className="text-xs text-slate-500 font-medium">Choose a role to test the functional workspaces</p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-200 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Roles Selection */}
        <div className="p-6 space-y-4">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Select Demo Profile</p>
          
          <div className="space-y-3">
            {/* 1. Patient Profile */}
            <button
              onClick={() => handleDemoLogin('patient')}
              className="w-full p-4.5 bg-brand-lightBlue hover:bg-brand-primary/10 border border-brand-primary/10 hover:border-brand-primary/20 rounded-2xl transition-all flex items-start space-x-3.5 text-left group"
            >
              <div className="p-2.5 bg-white rounded-xl shadow-sm text-brand-primary">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-brand-navy text-sm group-hover:text-brand-primary transition-colors">
                  Demo Patient Login
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Sign in as Rahul Kumar (Gorakhpur). View booked tests, track sample DB-10245, and check path-signed AI reports.
                </p>
              </div>
            </button>

            {/* 2. Partner Profile */}
            <button
              onClick={() => handleDemoLogin('partner')}
              className="w-full p-4.5 bg-brand-lightTeal hover:bg-brand-teal/10 border border-brand-teal/10 hover:border-brand-teal/20 rounded-2xl transition-all flex items-start space-x-3.5 text-left group"
            >
              <div className="p-2.5 bg-white rounded-xl shadow-sm text-brand-teal">
                <Store className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-brand-navy text-sm group-hover:text-brand-teal transition-colors">
                  Demo Partner Login
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Sign in as Shakti Medical Store (Retail Chemist). Register walk-in patients, view commissions, and request courier dispatch.
                </p>
              </div>
            </button>

            {/* 3. Logistics Profile */}
            <button
              onClick={() => handleDemoLogin('logistics')}
              className="w-full p-4.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all flex items-start space-x-3.5 text-left group"
            >
              <div className="p-2.5 bg-white rounded-xl shadow-sm text-slate-600">
                <Activity className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-extrabold text-brand-navy text-sm group-hover:text-slate-900 transition-colors">
                  Demo Logistics Dispatcher
                </h4>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Open the operations monitoring dashboard. Monitor cold-chain fleet routes, temperature stability log, and run status progression.
                </p>
              </div>
            </button>
          </div>

          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3 flex items-start space-x-2 mt-4 text-[10px] text-slate-500 leading-relaxed">
            <ShieldAlert className="h-4 w-4 text-slate-400 flex-shrink-0 mt-0.5" />
            <span>
              This is a prototype authentication screen. No password or cellular token verification is required to toggle between accounts.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};
