import express from 'express';
import { isMockDb, mockDb } from '../config/db.js';
import Booking from '../models/Booking.js';
import Partner from '../models/Partner.js';
import Quote from '../models/Quote.js';

const router = express.Router();

// Static seed data matching our mock frontend configurations
const testsData = [
  { id: 't1', name: 'Complete Blood Count', code: 'CBC', price: 299, category: 'Blood Tests', homeAvailable: true, tatHours: 24, description: 'Measures RBC, WBC, platelets, and hemoglobin.', components: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count'] },
  { id: 't2', name: 'Diabetes Screening (HbA1c & Fasting Sugar)', code: 'DIABETES', price: 349, category: 'Diabetes', homeAvailable: true, tatHours: 12, description: 'Checks average blood sugar levels.', components: ['HbA1c', 'Fasting Blood Sugar'] },
  { id: 't3', name: 'Thyroid Profile (T3, T4, TSH)', code: 'THYROID', price: 399, category: 'Thyroid', homeAvailable: true, tatHours: 24, description: 'Evaluates thyroid gland function.', components: ['T3', 'T4', 'TSH'] },
  { id: 't4', name: 'Liver Function Test', code: 'LFT', price: 499, category: 'Liver', homeAvailable: true, tatHours: 24, description: 'Measures enzymes, proteins, and bilirubin.', components: ['SGOT', 'SGPT', 'Bilirubin'] },
  { id: 't5', name: 'Kidney Function Test', code: 'KFT', price: 449, category: 'Kidney', homeAvailable: true, tatHours: 24, description: 'Assesses kidney filtration rates.', components: ['Creatinine', 'Urea', 'Uric Acid'] }
];

const packagesData = [
  { id: 'p1', name: 'Basic Health Check', tests: ['CBC', 'Fasting Blood Sugar', 'Urine Routine'], price: 499, description: 'Essential screening.' },
  { id: 'p2', name: 'Diabetes Care', tests: ['Fasting Blood Sugar', 'HbA1c', 'Kidney Profile'], price: 799, description: 'Track blood sugar and kidney parameters.' },
  { id: 'p3', name: 'Women\'s Health Package', tests: ['CBC', 'Thyroid Profile', 'Vitamin D', 'Vitamin B12'], price: 999, description: 'Core vitamin and organ panels for women.' }
];

const centersData = [
  { id: 'c1', name: 'DiagBuddy Partner — Shakti Medical Store', address: 'Deoria Road', city: 'Gorakhpur', pin: '273001', distanceKm: 1.2, hours: '8:00 AM - 8:00 PM', phone: '+91 98765 43210' },
  { id: 'c2', name: 'DiagBuddy Partner — Apex Health Clinic', address: 'Circular Road', city: 'Ranchi', pin: '834001', distanceKm: 2.5, hours: '9:00 AM - 7:30 PM', phone: '+91 87654 32109' }
];

// Logistics Routes Mock Database (Stateful in-memory)
let routesData = [
  { id: 'rt1', routeName: 'Route 01 — Gorakhpur Towns Hub', samplesCount: 32, distanceKm: 18, status: 'On Time', temperatureC: 4.2, eta: '25 mins' },
  { id: 'rt2', routeName: 'Route 02 — Ranchi Suburban Network', samplesCount: 27, distanceKm: 24, status: 'On Time', temperatureC: 3.8, eta: '45 mins' },
  { id: 'rt3', routeName: 'Route 03 — Dhanbad-Bokaro Coal Belt', samplesCount: 14, distanceKm: 31, status: 'Delayed', temperatureC: 4.9, eta: '1 hr 10 mins' }
];

// Get static catalogs
router.get('/tests', (req, res) => res.json(testsData));
router.get('/packages', (req, res) => res.json(packagesData));
router.get('/centers', (req, res) => res.json(centersData));

// Get active routes
router.get('/routes', (req, res) => res.json(routesData));

// Simulate logistics step
router.post('/routes/simulate', async (req, res) => {
  // Update local routesData counts & temp
  routesData = routesData.map(r => {
    if (r.id === 'rt1') {
      return { 
        ...r, 
        samplesCount: r.samplesCount + 1,
        temperatureC: parseFloat((3.5 + Math.random() * 1.5).toFixed(1))
      };
    }
    return r;
  });

  // Advance status of all active bookings in DB or Mock
  if (isMockDb) {
    mockDb.bookings = mockDb.bookings.map(bk => {
      const nextStatusMap = {
        'Collected': 'Reached Local Center',
        'Reached Local Center': 'In Transit',
        'In Transit': 'Received at Lab',
        'Received at Lab': 'Testing',
        'Testing': 'Report Ready',
        'Report Ready': 'Report Ready'
      };
      return { ...bk, status: nextStatusMap[bk.status] || bk.status };
    });
  } else {
    try {
      const activeBookings = await Booking.find();
      for (const bk of activeBookings) {
        const nextStatusMap = {
          'Collected': 'Reached Local Center',
          'Reached Local Center': 'In Transit',
          'In Transit': 'Received at Lab',
          'Received at Lab': 'Testing',
          'Testing': 'Report Ready',
          'Report Ready': 'Report Ready'
        };
        bk.status = nextStatusMap[bk.status] || bk.status;
        await bk.save();
      }
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.json({ success: true, message: 'Simulation complete. Routes and samples updated.' });
});

// Bookings endpoints
router.get('/bookings', async (req, res) => {
  if (isMockDb) {
    return res.json(mockDb.bookings);
  }
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/bookings/:sampleId', async (req, res) => {
  const { sampleId } = req.params;
  if (isMockDb) {
    const bk = mockDb.bookings.find(b => b.sampleId.toUpperCase() === sampleId.toUpperCase());
    return bk ? res.json(bk) : res.status(404).json({ message: 'Sample ID not found' });
  }
  try {
    const bk = await Booking.findOne({ sampleId: new RegExp(`^${sampleId}$`, 'i') });
    return bk ? res.json(bk) : res.status(404).json({ message: 'Sample ID not found' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/bookings', async (req, res) => {
  const randomId = Math.floor(10000 + Math.random() * 90000);
  const sampleId = `DB-${randomId}`;
  
  const bookingData = {
    ...req.body,
    sampleId,
    status: 'Collected'
  };

  if (isMockDb) {
    const newBooking = { ...bookingData, id: `bk-${randomId}`, createdAt: new Date() };
    mockDb.bookings.unshift(newBooking);
    return res.status(201).json(newBooking);
  }

  try {
    const newBooking = new Booking(bookingData);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Partners endpoints
router.get('/partners', async (req, res) => {
  if (isMockDb) {
    return res.json(mockDb.partners);
  }
  try {
    const partners = await Partner.find().sort({ createdAt: -1 });
    res.json(partners);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/partners', async (req, res) => {
  if (isMockDb) {
    const newPartner = { ...req.body, id: `pt-${Math.floor(1000 + Math.random() * 9000)}`, createdAt: new Date() };
    mockDb.partners.unshift(newPartner);
    return res.status(201).json(newPartner);
  }
  try {
    const newPartner = new Partner(req.body);
    await newPartner.save();
    res.status(201).json(newPartner);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Quotes endpoint
router.post('/quotes', async (req, res) => {
  if (isMockDb) {
    const newQuote = { ...req.body, id: `bq-${Math.floor(1000 + Math.random() * 9000)}`, createdAt: new Date() };
    mockDb.quotes.unshift(newQuote);
    return res.status(201).json(newQuote);
  }
  try {
    const newQuote = new Quote(req.body);
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
