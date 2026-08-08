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
  addBooking: (booking: Omit<Booking, 'id' | 'sampleId' | 'status'>) => Promise<string>;
  partnerRequests: PartnerRequest[];
  addPartnerRequest: (request: Omit<PartnerRequest, 'id'>) => Promise<void>;
  b2bQuotes: B2BQuoteRequest[];
  addB2BQuote: (quote: Omit<B2BQuoteRequest, 'id'>) => Promise<void>;
  routes: RouteItem[];
  setRoutes: React.Dispatch<React.SetStateAction<RouteItem[]>>;
  updateSampleStatus: (sampleId: string, status: Booking['status']) => void;
  triggerMockLogisticsPickup: () => Promise<void>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [partnerRequests, setPartnerRequests] = useState<PartnerRequest[]>([]);
  const [b2bQuotes, setB2BQuotes] = useState<B2BQuoteRequest[]>([]);
  const [routes, setRoutes] = useState<RouteItem[]>(mockRoutes);

  // Fetch initial data from Express backend API
  const loadData = async () => {
    try {
      const bookingsRes = await fetch('/api/bookings');
      if (bookingsRes.ok) {
        const bookingsData = await bookingsRes.json();
        setBookings(bookingsData);
      }

      const routesRes = await fetch('/api/routes');
      if (routesRes.ok) {
        const routesData = await routesRes.json();
        setRoutes(routesData);
      }

      const partnersRes = await fetch('/api/partners');
      if (partnersRes.ok) {
        const partnersData = await partnersRes.json();
        setPartnerRequests(partnersData);
      }
    } catch (err) {
      console.warn('API Server not responding. Gracefully falling back to local preloaded state.');
      // Local pre-load fallback
      const fallbackBooking: Booking = {
        id: 'bk-101',
        patientName: 'Rahul Kumar',
        age: 28,
        gender: 'Male',
        mobile: '+91 98765 43210',
        address: 'House No 12, Mohaddipur, Gorakhpur',
        testName: 'Complete Blood Count (CBC)',
        price: 299,
        collectionType: 'Center',
        centerId: 'c1',
        centerName: 'DiagBuddy Partner — Shakti Medical Store',
        date: '2026-08-09',
        timeSlot: '8:00 AM - 10:00 AM',
        sampleId: 'DB-10245',
        status: 'In Transit'
      };
      setBookings([fallbackBooking]);

      const fallbackPartner: PartnerRequest = {
        id: 'pt-101',
        fullName: 'Shakti Prasad',
        businessName: 'Shakti Medical Store',
        mobile: '+91 98765 43210',
        city: 'Gorakhpur',
        area: 'Deoria Road',
        businessType: 'Pharmacy',
        dailyCustomers: '25–50'
      };
      setPartnerRequests([fallbackPartner]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'sampleId' | 'status'>): Promise<string> => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(prev => [data, ...prev]);
        return data.sampleId;
      }
      throw new Error('Failed to create booking on API server');
    } catch (err) {
      console.error(err);
      // Fallback
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
    }
  };

  const addPartnerRequest = async (req: Omit<PartnerRequest, 'id'>): Promise<void> => {
    try {
      const res = await fetch('/api/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req)
      });
      if (res.ok) {
        const data = await res.json();
        setPartnerRequests(prev => [data, ...prev]);
        return;
      }
      throw new Error('Failed to save partner on API server');
    } catch (err) {
      console.error(err);
      const newReq: PartnerRequest = {
        ...req,
        id: `pt-${Math.floor(1000 + Math.random() * 9000)}`
      };
      setPartnerRequests(prev => [newReq, ...prev]);
    }
  };

  const addB2BQuote = async (quote: Omit<B2BQuoteRequest, 'id'>): Promise<void> => {
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quote)
      });
      if (res.ok) {
        const data = await res.json();
        setB2BQuotes(prev => [data, ...prev]);
        return;
      }
      throw new Error('Failed to save B2B quote on API server');
    } catch (err) {
      console.error(err);
      const newQuote: B2BQuoteRequest = {
        ...quote,
        id: `bq-${Math.floor(1000 + Math.random() * 9000)}`
      };
      setB2BQuotes(prev => [newQuote, ...prev]);
    }
  };

  const updateSampleStatus = (sampleId: string, status: Booking['status']) => {
    // Sync locally
    setBookings(prev => prev.map(bk => bk.sampleId === sampleId ? { ...bk, status } : bk));
  };

  // Simulates logistics processing updates
  const triggerMockLogisticsPickup = async (): Promise<void> => {
    try {
      const res = await fetch('/api/routes/simulate', { method: 'POST' });
      if (res.ok) {
        // Re-load to get updated DB statuses
        await loadData();
        return;
      }
      throw new Error('API simulation endpoint failed');
    } catch (err) {
      console.warn('API error. Executing local simulation state updates.');
      // Local fallback simulation logic
      setBookings(prev => prev.map(bk => {
        const nextStatusMap = {
          'Collected': 'Reached Local Center',
          'Reached Local Center': 'In Transit',
          'In Transit': 'Received at Lab',
          'Received at Lab': 'Testing',
          'Testing': 'Report Ready',
          'Report Ready': 'Report Ready'
        };
        return { ...bk, status: (nextStatusMap[bk.status] || bk.status) as Booking['status'] };
      }));

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
    }
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
