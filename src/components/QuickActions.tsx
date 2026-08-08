import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useApp } from '../context/AppContext';
import { Search, Home, MapPin, FileText } from 'lucide-react';

export const QuickActions: React.FC = () => {
  const { t } = useLanguage();
  const { setActiveTab } = useApp();

  const actions = [
    {
      id: 'book',
      title: 'action.book',
      desc: 'action.bookDesc',
      icon: <Search className="h-6 w-6 text-brand-primary" />,
      bg: 'bg-brand-primary/5 hover:bg-brand-primary/10 border-brand-primary/10 hover:border-brand-primary/20',
      action: () => setActiveTab('tests')
    },
    {
      id: 'home',
      title: 'action.homeCol',
      desc: 'action.homeColDesc',
      icon: <Home className="h-6 w-6 text-emerald-600" />,
      bg: 'bg-emerald-50 hover:bg-emerald-100/80 border-emerald-100 hover:border-emerald-200',
      action: () => setActiveTab('tests')
    },
    {
      id: 'centers',
      title: 'action.findCenter',
      desc: 'action.findCenterDesc',
      icon: <MapPin className="h-6 w-6 text-brand-teal" />,
      bg: 'bg-brand-teal/5 hover:bg-brand-teal/10 border-brand-teal/10 hover:border-brand-teal/20',
      action: () => setActiveTab('centers')
    },
    {
      id: 'reports',
      title: 'action.reports',
      desc: 'action.reportsDesc',
      icon: <FileText className="h-6 w-6 text-amber-600" />,
      bg: 'bg-amber-50 hover:bg-amber-100/80 border-amber-100 hover:border-amber-200',
      action: () => setActiveTab('user-dashboard')
    }
  ];

  return (
    <div className="py-8 bg-white border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map((act) => (
            <button
              key={act.id}
              onClick={act.action}
              className={`flex flex-col text-left p-5 rounded-2xl border transition-all duration-200 active:scale-98 shadow-sm ${act.bg}`}
            >
              <div className="p-3 bg-white rounded-xl shadow-sm w-fit mb-4">
                {act.icon}
              </div>
              <h3 className="font-bold text-base text-brand-navy mb-1">
                {t(act.title)}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {t(act.desc)}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
