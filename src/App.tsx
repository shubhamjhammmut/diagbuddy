import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { MobileNav } from './components/MobileNav';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Tests } from './pages/Tests';
import { Centers } from './pages/Centers';
import { Track } from './pages/Track';
import { UserDashboard } from './pages/UserDashboard';
import { PartnerDashboard } from './pages/PartnerDashboard';
import { LogisticsDashboard } from './pages/LogisticsDashboard';

const MainAppContent: React.FC = () => {
  const { activeTab } = useApp();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'tests':
        return <Tests />;
      case 'centers':
        return <Centers />;
      case 'track':
        return <Track />;
      case 'user-dashboard':
        return <UserDashboard />;
      case 'partner-dashboard':
        return <PartnerDashboard />;
      case 'logistics-dashboard':
        return <LogisticsDashboard />;
      default:
        return <Home />;
    }
  };

  // Dashboards feel more premium without the huge consumer footer
  const isDashboard = activeTab.includes('dashboard');

  return (
    <div className="flex flex-col min-h-screen bg-brand-gray pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        {renderActivePage()}
      </main>
      {!isDashboard && <Footer />}
      <MobileNav />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </LanguageProvider>
  );
}

export default App;
