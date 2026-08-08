import mongoose from 'mongoose';

const QuoteSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  contactPerson: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  city: { type: String, required: true },
  peopleCount: { type: Number, required: true },
  requiredTests: { type: String, required: true },
  preferredDate: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Quote', QuoteSchema);
