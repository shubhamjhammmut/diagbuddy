import mongoose from 'mongoose';

const PartnerSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  businessName: { type: String, required: true },
  mobile: { type: String, required: true },
  city: { type: String, required: true },
  area: { type: String, required: true },
  businessType: { type: String, required: true },
  dailyCustomers: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Partner', PartnerSchema);
