import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockRoutes, type RouteItem } from '../utils/mockData';

export type ActiveTab = 
  | 'home'
  | 'tests'
  | 'centers'
  | 'track'
  | 'user-dashboard'
  | 'partner-dashboard'
  | 'logistics-dashboard';

export interface Booking {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  mobile: string;
  address: string;
  testName: string;
  price: number;
  collectionType: 'Home' | 'Center';
  centerId?: string;
  centerName?: string;
  date: string;
  timeSlot: string;
  sampleId: string;
  status: 'Collected' | 'Reached Local Center' | 'In Transit' | 'Received at Lab' | 'Testing' | 'Report Ready';
}

export interface PartnerRequest {
  id: string;
  fullName: string;
  businessName: string;
  mobile: string;
  city: string;
  area: string;
  businessType: string;
  dailyCustomers: string;
}

export interface B2BQuoteRequest {
  id: string;
  orgName: string;
  contactPerson: string;
  phone: string;
  email: string;
  city: string;
  peopleCount: number;
  requiredTests: string;
  preferredDate: string;
}

interface AppContextProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'sampleId' | 'status'>) => string;
  partnerRequests: PartnerRequest[];
  addPartnerRequest: (request: Omit<PartnerRequest, 'id'>) => void;
  b2bQuotes: B2BQuoteRequest[];
  addB2BQuote: (quote: Omit<B2BQuoteRequest, 'id'>) => void;
  routes: RouteItem[];
  setRoutes: React.Dispatch<React.SetStateAction<RouteItem[]>>;
  updateSampleStatus: (sampleId: string, status: Booking['status']) => void;
  triggerMockLogisticsPickup: () => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[]>([]);
  const [b2bQuotes, setB2BQuotes] = useState<B2BQuoteRequest[]>([]);
  const [routes, setRoutes] = useState<RouteItem[]>(mockRoutes);

  // Pre-load demo data
  useEffect(() => {
    const preloadedBooking: Booking = {
      id: 'bk-101',
      patientName: 'Rahul Kumar',
      age: 28,
      gender: 'Male',
      mobile: '+91 98765 43210',
      address: 'House No 12, Mohaddipur',
      testName: 'Complete Blood Count (CBC)',
      price: 299,
      collectionType: 'Center',
      centerId: 'c1',
      centerName: 'DiagBuddy Partner — Shakti Medical Store',
      date: '2026-08-09',
      timeSlot: '8:00 AM - 10:00 AM',
      sampleId: 'DB-10245',
      status: 'In Transit' // initial state for demo
    };

    setBookings([preloadedBooking]);

    const preloadedPartner: PartnerRequest = {
      id: 'pt-101',
      fullName: 'Shakti Prasad',
      businessName: 'Shakti Medical Store',
      mobile: '+91 98765 43210',
      city: 'Gorakhpur',
      area: 'Deoria Road',
      businessType: 'Pharmacy',
      dailyCustomers: '25–50'
    };
    setPartnerRequests([preloadedPartner]);
  }, []);

  const addBooking = (bookingData: Omit<Booking, 'id' | 'sampleId' | 'status'>): string => {
    const randomId = Math.floor(10000 + Math.random() * 90000);
    const sampleId = `DB-${randomId}`;
    const newBooking: Booking = {
      ...bookingData,
      id: `bk-${randomId}`,
      sampleId,
      status: 'Collected'
    };
    setBookings(prev => [newBooking, ...prev]);
    return sampleId;
  };

  const addPartnerRequest = (req: Omit<PartnerRequest, 'id'>) => {
    const newReq: PartnerRequest = {
      ...req,
      id: `pt-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setPartnerRequests(prev => [newReq, ...prev]);
  };

  const addB2BQuote = (quote: Omit<B2BQuoteRequest, 'id'>) => {
    const newQuote: B2BQuoteRequest = {
      ...quote,
      id: `bq-${Math.floor(1000 + Math.random() * 9000)}`
    };
    setB2BQuotes(prev => [newQuote, ...prev]);
  };

  const updateSampleStatus = (sampleId: string, status: Booking['status']) => {
    setBookings(prev => prev.map(bk => bk.sampleId === sampleId ? { ...bk, status } : bk));
  };

  // Simulates logistics processing updates
  const triggerMockLogisticsPickup = () => {
    // When partner requests pickup, set "Collected" samples to "Reached Local Center" or "In Transit"
    setBookings(prev => prev.map(bk => {
      if (bk.status === 'Collected') {
        return { ...bk, status: 'Reached Local Center' };
      } else if (bk.status === 'Reached Local Center') {
        return { ...bk, status: 'In Transit' };
      } else if (bk.status === 'In Transit') {
        return { ...bk, status: 'Received at Lab' };
      } else if (bk.status === 'Received at Lab') {
        return { ...bk, status: 'Testing' };
      } else if (bk.status === 'Testing') {
        return { ...bk, status: 'Report Ready' };
      }
      return bk;
    }));

    // Update Route counts dynamically for logistics dashboard feedback
    setRoutes(prev => prev.map(route => {
      if (route.id === 'rt1') {
        return { 
          ...route, 
          samplesCount: route.samplesCount + 1,
          temperatureC: parseFloat((3.5 + Math.random() * 1.5).toFixed(1))
        };
      }
      return route;
    }));
  };

  return (
    <AppContext.Provider value={{
      activeTab,
      setActiveTab,
      bookings,
      addBooking,
      partnerRequests,
      addPartnerRequest,
      b2bQuotes,
      addB2BQuote,
      routes,
      setRoutes,
      updateSampleStatus,
      triggerMockLogisticsPickup
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
