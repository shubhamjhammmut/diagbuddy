import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.tests': 'Find a Test',
    'nav.howItWorks': 'How It Works',
    'nav.centers': 'Nearby Centers',
    'nav.partners': 'Become a Partner',
    'nav.orgs': 'For Organizations',
    'nav.login': 'Login',
    'nav.bookTest': 'Book a Test',
    'nav.dashboard': 'Dashboard',

    // Hero Section
    'hero.title': 'Reliable Diagnostics, Closer to You.',
    'hero.subtitle': 'Get affordable diagnostic tests through trusted local pharmacies, clinics and collection centers.',
    'hero.ctaBook': 'Book a Test',
    'hero.ctaCenter': 'Find a Center',
    'hero.trustLine': 'Trusted Collection • Transparent Pricing • Digital Reports',

    // Quick Actions
    'action.book': 'Book a Test',
    'action.bookDesc': 'Find and book diagnostic tests.',
    'action.homeCol': 'Home Collection',
    'action.homeColDesc': 'Get your sample collected at home.',
    'action.findCenter': 'Find a Center',
    'action.findCenterDesc': 'Find the nearest DiagBuddy partner.',
    'action.reports': 'My Reports',
    'action.reportsDesc': 'View and download your reports.',

    // General Actions
    'btn.bookNow': 'Book Now',
    'btn.searchPlaceholder': 'Search blood test, thyroid, sugar...',
    'btn.viewDetails': 'View Details',
    'btn.becomePartner': 'Become a Partner',
    'btn.requestQuote': 'Request a Quote',
    'btn.trackSample': 'Track Your Sample',
    'btn.enterSampleId': 'Enter Sample ID',
    'btn.getDirections': 'Get Directions',
    'btn.useMyLocation': 'Use My Location',
    'btn.searchCenters': 'Search Centers',

    // Logistics & Flywheel
    'logistics.title': 'We Make Every Sample Count.',
    'logistics.desc': 'We combine samples from nearby towns and optimize pickup routes. This reduces transportation costs and helps us provide affordable diagnostics even where daily sample volumes are low.',
    'logistics.flywheelTitle': 'How DiagBuddy Makes Diagnostics Affordable',
    
    // Partner & B2B Section
    'partner.title': 'Your Local Pharmacy Can Now Be Your Diagnostic Buddy.',
    'partner.desc': 'We partner with pharmacies, clinics and doctors so patients can access reliable diagnostic services without travelling to a major city.',
    'b2b.title': 'Diagnostic Testing for Your Organization.',
    'b2b.subtitle': 'From employee health checks to large screening camps, DiagBuddy helps organizations manage diagnostic testing at scale.',
    
    // Tracking States
    'track.collected': 'Sample Collected',
    'track.reached': 'Reached Local Center',
    'track.transit': 'In Transit',
    'track.lab': 'Received at Lab',
    'track.testing': 'Testing',
    'track.ready': 'Report Ready',

    // Trust
    'trust.title': 'Built Around Trust',
    'trust.points': 'Standardized collection • Secure sample handling • Tracked transportation • Transparent pricing • Digital reports • Partner verification',
    'trust.disclaimer': 'Demo pricing — final pricing may vary by location. Partner laboratories can include accredited laboratories.',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.tests': 'टेस्ट खोजें',
    'nav.howItWorks': 'यह कैसे काम करता है',
    'nav.centers': 'नज़दीकी सेंटर',
    'nav.partners': 'पार्टनर बनें',
    'nav.orgs': 'संस्थाओं के लिए',
    'nav.login': 'लॉगिन',
    'nav.bookTest': 'टेस्ट बुक करें',
    'nav.dashboard': 'डैशबोर्ड',

    // Hero Section
    'hero.title': 'विश्वसनीय डायग्नोस्टिक्स, अब आपके पास।',
    'hero.subtitle': 'भरोसेमंद स्थानीय फार्मेसियों, क्लीनिकों और संग्रह केंद्रों के माध्यम से सस्ती दरों पर लैब टेस्ट प्राप्त करें।',
    'hero.ctaBook': 'टेस्ट बुक करें',
    'hero.ctaCenter': 'सेंटर खोजें',
    'hero.trustLine': 'भरोसेमंद कलेक्शन • पारदर्शी कीमतें • डिजिटल रिपोर्ट',

    // Quick Actions
    'action.book': 'टेस्ट बुक करें',
    'action.bookDesc': 'डायग्नोस्टिक टेस्ट खोजें और बुक करें।',
    'action.homeCol': 'घर से कलेक्शन',
    'action.homeColDesc': 'अपने घर पर सैंपल कलेक्शन की सुविधा पाएं।',
    'action.findCenter': 'सेंटर खोजें',
    'action.findCenterDesc': 'अपने सबसे नजदीकी डायगबडी पार्टनर को खोजें।',
    'action.reports': 'मेरी रिपोर्ट्स',
    'action.reportsDesc': 'अपनी रिपोर्ट देखें और डाउनलोड करें।',

    // General Actions
    'btn.bookNow': 'अभी बुक करें',
    'btn.searchPlaceholder': 'ब्लड टेस्ट, थायराइड, शुगर खोजें...',
    'btn.viewDetails': 'विवरण देखें',
    'btn.becomePartner': 'पार्टनर बनें',
    'btn.requestQuote': 'कोटेशन मांगें',
    'btn.trackSample': 'सैंपल ट्रैक करें',
    'btn.enterSampleId': 'सैंपल आईडी डालें',
    'btn.getDirections': 'दिशा-निर्देश पाएं',
    'btn.useMyLocation': 'मेरी लोकेशन का उपयोग करें',
    'btn.searchCenters': 'सेंटर खोजें',

    // Logistics & Flywheel
    'logistics.title': 'हम हर सैंपल को खास बनाते हैं।',
    'logistics.desc': 'हम नजदीकी कस्बों से सैंपल इकट्ठा करते हैं और पिकअप रूट को ऑप्टिमाइज़ करते हैं। इससे परिवहन लागत कम होती है और हमें उन जगहों पर भी सस्ती जांच प्रदान करने में मदद मिलती है जहां दैनिक सैंपल कम होते हैं।',
    'logistics.flywheelTitle': 'डायगबडी टेस्ट को किफायती कैसे बनाता है',

    // Partner & B2B Section
    'partner.title': 'आपकी स्थानीय फार्मेसी अब आपकी डायग्नोस्टिक बडी बन सकती है।',
    'partner.desc': 'हम फार्मेसियों, क्लीनिकों और डॉक्टरों के साथ साझेदारी करते हैं ताकि मरीजों को बड़े शहर की यात्रा किए बिना विश्वसनीय जांच मिल सके।',
    'b2b.title': 'आपकी संस्था के लिए डायग्नोस्टिक टेस्टिंग।',
    'b2b.subtitle': 'कर्मचारी स्वास्थ्य जांच से लेकर बड़े स्क्रीनिंग कैंपों तक, डायगबडी संस्थाओं को बड़े पैमाने पर टेस्ट मैनेज करने में मदद करता है।',

    // Tracking States
    'track.collected': 'सैंपल कलेक्ट हो गया',
    'track.reached': 'स्थानीय सेंटर पहुंचा',
    'track.transit': 'रास्ते में है (ट्रैफिक)',
    'track.lab': 'लैब में प्राप्त हुआ',
    'track.testing': 'जांच जारी है',
    'track.ready': 'रिपोर्ट तैयार है',

    // Trust
    'trust.title': 'विश्वास पर आधारित',
    'trust.points': 'मानकीकृत संग्रह • सुरक्षित सैंपल रखरखाव • ट्रैक की गई परिवहन व्यवस्था • पारदर्शी कीमतें • डिजिटल रिपोर्ट • पार्टनर वेरिफिकेशन',
    'trust.disclaimer': 'डेमो कीमतें — अंतिम कीमतें स्थान के अनुसार भिन्न हो सकती हैं। भागीदार प्रयोगशालाओं में मान्यता प्राप्त प्रयोगशालाएं शामिल हो सकती हैं।',
  }
};

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key] || translations['en'][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
