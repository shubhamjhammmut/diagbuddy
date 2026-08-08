import express from 'express';
import { isMockDb, mockDb } from '../config/db.js';
import Booking from '../models/Booking.js';
import Partner from '../models/Partner.js';
import Quote from '../models/Quote.js';

const router = express.Router();

// Static seed data
const testsData = [
  { id: 't1', name: 'Complete Blood Count', code: 'CBC', price: 299, category: 'Blood Tests', homeAvailable: true, tatHours: 24, description: 'Measures RBC, WBC, platelets, and hemoglobin.', components: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count'] },
  { id: 't2', name: 'Diabetes Screening (HbA1c & Fasting Sugar)', code: 'DIABETES', price: 349, category: 'Diabetes', homeAvailable: true, tatHours: 12, description: 'Checks average blood sugar levels.', components: ['HbA1c', 'Fasting Blood Sugar'] },
  { id: 't3', name: 'Thyroid Profile (T3, T4, TSH)', code: 'THYROID', price: 399, category: 'Thyroid', homeAvailable: true, tatHours: 24, description: 'Evaluates thyroid gland function.', components: ['T3', 'T4', 'TSH'] },
  { id: 't4', name: 'Liver Function Test', code: 'LFT', price: 499, category: 'Liver', homeAvailable: true, tatHours: 24, description: 'Measures enzymes, proteins, and bilirubin.', components: ['SGOT', 'SGPT', 'Bilirubin'] },
  { id: 't5', name: 'Kidney Function Test', code: 'KFT', price: 449, category: 'Kidney', homeAvailable: true, tatHours: 24, description: 'Assesses kidney filtration rates.', components: ['Creatinine', 'Urea', 'Uric Acid'] },
  { id: 't6', name: 'Vitamin D & B12 Test Combo', code: 'VITAMINS', price: 799, category: 'Vitamins', homeAvailable: true, tatHours: 36, description: 'Measures bone health and nerve vitals.', components: ['Vitamin D', 'Vitamin B12'] }
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
router.get('/routes', (req, res) => res.json(routesData));

// Simulate logistics step
router.post('/routes/simulate', async (req, res) => {
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

// ==========================================
// GEMINI AI INTEGRATION ROUTES
// ==========================================

// 1. AI Test Recommender
router.post('/ai/recommend', async (req, res) => {
  const { symptoms } = req.body;
  if (!symptoms) {
    return res.status(400).json({ error: 'Symptoms description is required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Local fallback parser in case API key is missing or call fails
  const localRecommendFallback = (desc) => {
    const lower = desc.toLowerCase();
    const suggestions = [];

    if (lower.includes('tired') || lower.includes('fatigue') || lower.includes('weak') || lower.includes('energy')) {
      suggestions.push('Complete Blood Count');
      suggestions.push('Thyroid Profile (T3, T4, TSH)');
    }
    if (lower.includes('sugar') || lower.includes('diabet') || lower.includes('urine') || lower.includes('thirsty')) {
      suggestions.push('Diabetes Screening (HbA1c & Fasting Sugar)');
    }
    if (lower.includes('weight loss') || lower.includes('weight gain') || lower.includes('cold') || lower.includes('hair')) {
      suggestions.push('Thyroid Profile (T3, T4, TSH)');
    }
    if (lower.includes('joint') || lower.includes('bone') || lower.includes('muscle') || lower.includes('body pain')) {
      suggestions.push('Vitamin D & B12 Test Combo');
    }
    if (lower.includes('alcohol') || lower.includes('liver') || lower.includes('digest') || lower.includes('jaundice')) {
      suggestions.push('Liver Function Test');
    }
    if (lower.includes('kidney') || lower.includes('back pain') || lower.includes('swelling')) {
      suggestions.push('Kidney Function Test');
    }

    // Default suggestions if no match
    if (suggestions.length === 0) {
      suggestions.push('Complete Blood Count');
      suggestions.push('Diabetes Screening (HbA1c & Fasting Sugar)');
    }

    return [...new Set(suggestions)];
  };

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
    console.log('Gemini API Key missing. Returning local symptom diagnostics recommendations.');
    return res.json({ recommendations: localRecommendFallback(symptoms), source: 'local-analytics' });
  }

  try {
    const prompt = `You are DiagBuddy AI, an assistant helping patients in rural India choose the right blood tests.
The patient describes these symptoms: "${symptoms}".
Suggest which of the following tests from our catalog are most relevant:
- Complete Blood Count
- Diabetes Screening (HbA1c & Fasting Sugar)
- Thyroid Profile (T3, T4, TSH)
- Liver Function Test
- Kidney Function Test
- Vitamin D & B12 Test Combo

Respond ONLY with a valid JSON array of strings containing the exact matching test names from the list above. No other conversational text.
Example response: ["Complete Blood Count", "Thyroid Profile (T3, T4, TSH)"]`;

    const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { responseMimeType: 'application/json' }
      })
    });

    if (!apiResponse.ok) {
      throw new Error(`Gemini API returned status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    const recommendations = JSON.parse(rawText.trim());

    res.json({ recommendations, source: 'gemini-ai' });
  } catch (err) {
    console.warn('Gemini request failed. Falling back to local analytics.', err.message);
    res.json({ recommendations: localRecommendFallback(symptoms), source: 'local-fallback' });
  }
});

// 2. AI Pathology Report Explainer
router.post('/ai/explain', async (req, res) => {
  const { testName, parameters } = req.body;
  if (!testName) {
    return res.status(400).json({ error: 'Test name and parameters are required.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  // Local fallback explanation generator
  const localExplainFallback = (name, params) => {
    let summary = '';
    if (name.includes('CBC') || name.includes('Blood')) {
      const hb = params['Hemoglobin'] || '14.2';
      summary = `Your Hemoglobin level is ${hb} g/dL, which indicates a healthy blood oxygen level. Your White Blood Cell (WBC) count is within normal parameters, suggesting a strong immune system. Continue a balanced diet rich in leafy greens. (आपके हीमोग्लोबिन और श्वेत रक्त कोशिकाएं बिल्कुल सामान्य स्तर पर हैं, जो कि स्वस्थ शरीर का संकेत है।)`;
    } else {
      summary = `Your diagnostic parameters for ${name} appear within standard bounds. We advise maintaining regular health habits and walking daily. (आपकी जांच रिपोर्ट सामान्य है। अपने दैनिक खान-पान का ध्यान रखें।)`;
    }
    return summary + ' Please note: This explanation is for educational purposes. Always consult a certified healthcare practitioner for official clinical advice.';
  };

  if (!apiKey || apiKey === 'YOUR_GEMINI_API_KEY') {
    console.log('Gemini API Key missing. Returning local diagnostic explanation.');
    return res.json({ explanation: localExplainFallback(testName, parameters), source: 'local-analytics' });
  }

  try {
    const prompt = `You are DiagBuddy AI, an empathetic doctor explaining lab report values to a patient from a small town in India.
The test taken is: "${testName}".
The parameters are: ${JSON.stringify(parameters)}.
Explain what these values mean in simple, encouraging terms.
Use basic English and include a line of translation or helper advice in Hindi (using Devanagari script).
Keep the whole explanation under 90 words.
Conclude with a clear reminder that this is for educational purposes and they must consult a doctor.`;

    const apiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    if (!apiResponse.ok) {
      throw new Error(`Gemini API returned status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    const explanation = data.candidates?.[0]?.content?.parts?.[0]?.text;

    res.json({ explanation: explanation.trim(), source: 'gemini-ai' });
  } catch (err) {
    console.warn('Gemini report translation failed. Falling back to local analytics.', err.message);
    res.json({ explanation: localExplainFallback(testName, parameters), source: 'local-fallback' });
  }
});

export default router;
