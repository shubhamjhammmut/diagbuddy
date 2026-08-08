import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, isMockDb, mockDb } from './config/db.js';
import apiRoutes from './routes/api.js';
import Booking from './models/Booking.js';
import Partner from './models/Partner.js';

// Load Env
dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Seed script to initialize default developer accounts
const seedDefaultData = async () => {
  const defaultBooking = {
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

  const defaultPartner = {
    fullName: 'Shakti Prasad',
    businessName: 'Shakti Medical Store',
    mobile: '+91 98765 43210',
    city: 'Gorakhpur',
    area: 'Deoria Road',
    businessType: 'Pharmacy',
    dailyCustomers: '25–50'
  };

  if (isMockDb) {
    console.log('Seeding mock in-memory stores...');
    mockDb.bookings.push({ ...defaultBooking, id: 'bk-101', createdAt: new Date() });
    mockDb.partners.push({ ...defaultPartner, id: 'pt-101', createdAt: new Date() });
  } else {
    try {
      // Check if seed booking exists
      const bookingExists = await Booking.findOne({ sampleId: 'DB-10245' });
      if (!bookingExists) {
        console.log('Seeding default booking (Rahul Kumar DB-10245) to MongoDB...');
        const newBooking = new Booking(defaultBooking);
        await newBooking.save();
      }

      const partnerExists = await Partner.findOne({ mobile: '+91 98765 43210' });
      if (!partnerExists) {
        console.log('Seeding default partner store to MongoDB...');
        const newPartner = new Partner(defaultPartner);
        await newPartner.save();
      }
    } catch (err) {
      console.error('Error seeding data:', err.message);
    }
  }
};

const startServer = async () => {
  // Connect Database
  await connectDB();

  // Run Seed script
  await seedDefaultData();

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`DiagBuddy Server running on port ${PORT}`);
    if (isMockDb) {
      console.log('Server is operating in Graceful Mock Storage mode.');
    } else {
      console.log('Server is connected to MongoDB.');
    }
  });
};

startServer();
