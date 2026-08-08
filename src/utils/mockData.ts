export interface TestItem {
  id: string;
  name: string;
  code: string;
  price: number;
  category: string;
  homeAvailable: boolean;
  tatHours: number;
  description: string;
  components: string[];
}

export interface PackageItem {
  id: string;
  name: string;
  tests: string[];
  price: number;
  description: string;
  popular?: boolean;
}

export interface CenterItem {
  id: string;
  name: string;
  address: string;
  city: string;
  pin: string;
  distanceKm: number;
  hours: string;
  businessType: string;
  phone: string;
}

export interface RouteItem {
  id: string;
  routeName: string;
  samplesCount: number;
  distanceKm: number;
  status: 'On Time' | 'Delayed' | 'Completed';
  temperatureC: number;
  eta: string;
}

export const mockTests: TestItem[] = [
  {
    id: 't1',
    name: 'Complete Blood Count',
    code: 'CBC',
    price: 299,
    category: 'Blood Tests',
    homeAvailable: true,
    tatHours: 24,
    description: 'Measures red blood cells, white blood cells, platelets, and hemoglobin to screen for anemia and infection.',
    components: ['Hemoglobin', 'RBC Count', 'WBC Count', 'Platelet Count', 'PCV']
  },
  {
    id: 't2',
    name: 'Diabetes Screening (HbA1c & Fasting Sugar)',
    code: 'DIABETES',
    price: 349,
    category: 'Diabetes',
    homeAvailable: true,
    tatHours: 12,
    description: 'Checks average blood sugar levels over the past 3 months and current fasting blood glucose.',
    components: ['HbA1c', 'Average Blood Glucose', 'Fasting Blood Sugar']
  },
  {
    id: 't3',
    name: 'Thyroid Profile (T3, T4, TSH)',
    code: 'THYROID',
    price: 399,
    category: 'Thyroid',
    homeAvailable: true,
    tatHours: 24,
    description: 'Evaluates thyroid gland function to detect hyperthyroidism or hypothyroidism.',
    components: ['Total Triiodothyronine (T3)', 'Total Thyroxine (T4)', 'Thyroid Stimulating Hormone (TSH)']
  },
  {
    id: 't4',
    name: 'Liver Function Test',
    code: 'LFT',
    price: 499,
    category: 'Liver',
    homeAvailable: true,
    tatHours: 24,
    description: 'Measures enzymes, proteins, and bilirubin levels to check liver health and detect damage.',
    components: ['SGOT (AST)', 'SGPT (ALT)', 'Alkaline Phosphatase', 'Bilirubin Total', 'Albumin']
  },
  {
    id: 't5',
    name: 'Kidney Function Test',
    code: 'KFT',
    price: 449,
    category: 'Kidney',
    homeAvailable: true,
    tatHours: 24,
    description: 'Assesses kidney health by measuring waste products in the blood.',
    components: ['Creatinine', 'Urea', 'Uric Acid', 'BUN', 'Electrolytes']
  },
  {
    id: 't6',
    name: 'Vitamin D & B12 Test Combo',
    code: 'VITAMINS',
    price: 799,
    category: 'Vitamins',
    homeAvailable: true,
    tatHours: 36,
    description: 'Measures vital vitamins critical for nerve function, bone health, and energy levels.',
    components: ['Vitamin D (25-Hydroxy)', 'Vitamin B12']
  },
  {
    id: 't7',
    name: 'Lipid Profile (Cholesterol)',
    code: 'LIPID',
    price: 399,
    category: 'Heart Health',
    homeAvailable: true,
    tatHours: 24,
    description: 'Measures good, bad, and total cholesterol, along with triglycerides to assess heart health.',
    components: ['Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides']
  }
];

export const mockPackages: PackageItem[] = [
  {
    id: 'p1',
    name: 'Basic Health Check',
    tests: ['CBC', 'Fasting Blood Sugar', 'Urine Routine'],
    price: 499,
    description: 'Essential checkup covering blood count, blood sugar, and basic urine analysis.',
    popular: true
  },
  {
    id: 'p2',
    name: 'Diabetes Care',
    tests: ['Fasting Blood Sugar', 'HbA1c', 'Kidney Profile (Creatinine, Urea)'],
    price: 799,
    description: 'Comprehensive screening for diabetic patients to track sugar and check kidney health.'
  },
  {
    id: 'p3',
    name: 'Women\'s Health Package',
    tests: ['CBC', 'Thyroid Profile (TSH)', 'Vitamin D', 'Vitamin B12'],
    price: 999,
    description: 'Custom checkup targeting common areas of concern for women: blood, thyroid, and vital vitamins.'
  },
  {
    id: 'p4',
    name: 'Senior Citizen Preventive Care',
    tests: ['CBC', 'Diabetes Screening', 'Kidney Function Test', 'Liver Function Test', 'Lipid Profile'],
    price: 1499,
    description: 'Complete full body checkup designed for elderly patients to monitor organs and cardiac risks.',
    popular: false
  }
];

export const mockCenters: CenterItem[] = [
  {
    id: 'c1',
    name: 'DiagBuddy Partner — Shakti Medical Store',
    address: 'Near Gandhi Chowk, Deoria Road',
    city: 'Gorakhpur',
    pin: '273001',
    distanceKm: 1.2,
    hours: '8:00 AM - 8:00 PM',
    businessType: 'Pharmacy',
    phone: '+91 98765 43210'
  },
  {
    id: 'c2',
    name: 'DiagBuddy Partner — Apex Health Clinic',
    address: 'Circular Road, Lalpur',
    city: 'Ranchi',
    pin: '834001',
    distanceKm: 2.5,
    hours: '9:00 AM - 7:30 PM',
    businessType: 'Clinic',
    phone: '+91 87654 32109'
  },
  {
    id: 'c3',
    name: 'DiagBuddy Partner — Janta Medicine Centre',
    address: 'Cinema Road, opposite Town Hall',
    city: 'Dhanbad',
    pin: '826001',
    distanceKm: 0.8,
    hours: '8:00 AM - 9:00 PM',
    businessType: 'Pharmacy',
    phone: '+91 76543 21098'
  },
  {
    id: 'c4',
    name: 'DiagBuddy Partner — City Poly Clinic',
    address: 'Sector 4, Main Market Plaza',
    city: 'Bokaro Steel City',
    pin: '827004',
    distanceKm: 3.1,
    hours: '9:00 AM - 8:00 PM',
    businessType: 'Clinic',
    phone: '+91 99887 76655'
  },
  {
    id: 'c5',
    name: 'DiagBuddy Partner — Ganga Diagnostics & Pharmacy',
    address: 'Near BHU Gate, Lanka',
    city: 'Varanasi',
    pin: '221005',
    distanceKm: 1.5,
    hours: '8:00 AM - 8:30 PM',
    businessType: 'Diagnostic Center',
    phone: '+91 98888 77777'
  },
  {
    id: 'c6',
    name: 'DiagBuddy Partner — Kankarbagh Medical Hub',
    address: 'Kankarbagh Main Road',
    city: 'Patna',
    pin: '800020',
    distanceKm: 4.2,
    hours: '8:00 AM - 9:00 PM',
    businessType: 'Pharmacy',
    phone: '+91 91234 56789'
  }
];

export const mockRoutes: RouteItem[] = [
  {
    id: 'rt1',
    routeName: 'Route 01 — Gorakhpur Towns Hub',
    samplesCount: 32,
    distanceKm: 18,
    status: 'On Time',
    temperatureC: 4.2,
    eta: '25 mins'
  },
  {
    id: 'rt2',
    routeName: 'Route 02 — Ranchi Suburban Network',
    samplesCount: 27,
    distanceKm: 24,
    status: 'On Time',
    temperatureC: 3.8,
    eta: '45 mins'
  },
  {
    id: 'rt3',
    routeName: 'Route 03 — Dhanbad-Bokaro Coal Belt',
    samplesCount: 14,
    distanceKm: 31,
    status: 'Delayed',
    temperatureC: 4.9,
    eta: '1 hr 10 mins'
  }
];

export const categories = [
  'All',
  'Blood Tests',
  'Diabetes',
  'Thyroid',
  'Liver',
  'Kidney',
  'Vitamins',
  'Heart Health'
];
