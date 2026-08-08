import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  patientName: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  testName: { type: String, required: true },
  price: { type: Number, required: true },
  collectionType: { type: String, enum: ['Home', 'Center'], required: true },
  centerId: { type: String },
  centerName: { type: String },
  date: { type: String, required: true },
  timeSlot: { type: String, required: true },
  sampleId: { type: String, required: true, unique: true },
  status: { 
    type: String, 
    enum: ['Collected', 'Reached Local Center', 'In Transit', 'Received at Lab', 'Testing', 'Report Ready'], 
    default: 'Collected' 
  }
}, { timestamps: true });

export default mongoose.model('Booking', BookingSchema);
