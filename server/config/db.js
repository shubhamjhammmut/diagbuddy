import mongoose from 'mongoose';

let isMockDb = false;

// Mock in-memory database arrays for fallback
const mockDb = {
  bookings: [],
  partners: [],
  quotes: []
};

const connectDB = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/diagbuddy';
    console.log(`Connecting to MongoDB at URI: ${connUri}...`);
    
    // Set a quick timeout (3 seconds) for local connection checks so it fails fast if not running
    const conn = await mongoose.connect(connUri, {
      serverSelectionTimeoutMS: 3000
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    isMockDb = false;
  } catch (error) {
    console.warn('\n=============================================================');
    console.warn('WARNING: Could not connect to MongoDB database.');
    console.warn('Reason:', error.message);
    console.warn('DiagBuddy Server will automatically fallback to in-memory mock storage.');
    console.warn('All API actions (bookings, registrations, updates) will remain fully functional.');
    console.warn('=============================================================\n');
    isMockDb = true;
  }
};

export { connectDB, isMockDb, mockDb };
