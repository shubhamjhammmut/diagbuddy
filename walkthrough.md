# Walkthrough - DiagBuddy

We have built a premium, responsive, and fully interactive React/TypeScript prototype for **DiagBuddy**, integrated with a complete Node.js + Express backend and MongoDB database.

---

## Key Features Implemented

### 1. B2C Consumer Experience
* **Hero Visual**: Simple, visual representation of the sample journey (Patient to Local Pharmacy to Hub to Laboratory to Digital Report).
* **Quick Actions**: Large, touch-friendly grid buttons for mobile users:
  * **Book a Test**: Direct access to the test catalog.
  * **Home Collection**: Instant home collection request setup.
  * **Find a Center**: Location finder.
  * **My Reports**: Access patient dashboards and mock pathology records.
* **Smart Test Catalog**: Live search engine with category filters.
* **Interactive Booking Wizard**: A 5-step patient checkout covering collection mode, calendar date slots, patient profiles, payment summary disclaimers, and confirmation.
* **Bilingual Support (English and Hindi)**: Toggle in the navigation bar translates navigation links, action buttons, timeline states, and health warnings.
* **Sample Tracker**: Input fields pre-loaded with sample DB-10245 (Rahul Kumar). Highlights the 6-stage logistics progression timeline. Shows an interactive pathologist-signed clinical report preview when status reaches Report Ready.

### 2. B2B2C Partner Experience
* **Become a Partner Form**: Simple onboarding wizard capturing medical store / clinic type, location, and daily traffic volumes.
* **Merchant Portal (Partner Dashboard)**:
  * Real-time metrics: Daily collections, pending pickups, completed tests, and earnings.
  * Walk-in patient register: On-the-spot registration of drop-off samples.
  * **Request Pickup** CTA: Directly triggers courier dispatch alerts.

### 3. Smart Logistics Differentiator
* **Animated Network Visualizer**: SVG graphic demonstrating sample consolidation from Pharmacy A, Clinic B, Center C, and Pharmacy D into a Local Hub, followed by route optimized transit to the Central Accredited Lab.
* **Internal Operations Dashboard**:
  * Telemetry dashboard containing active routes overview, distance logs, and cold-chain temperature metrics.
  * **Simulate Logistics Route Step**: Increments sample stages dynamically in the database. Moves samples from Collected to In Transit to Report Ready, showcasing backend workflows for live investor presentations.

---

## Backend & Database Architecture

* **API Server**: Node.js + Express running on Port 5001.
* **Database**: MongoDB (Mongoose) storing patient bookings, partner store configurations, and quote requests.
* **Graceful Database Fallback**: If a local MongoDB instance is not active, the database config automatically flags isMockDb and operates using an in-memory array handler. The application server remains fully functional without crashing.
* **Auto-Seeding**: Upon initial launch, the Express server checks for default developer demo data (patient Rahul Kumar, sample DB-10245, and Shakti Medical Store) and seeds the database automatically.
* **Vite Proxy Forwarder**: Configured proxy routes in vite.config.ts to forward frontend '/api' requests to port 5001 to resolve CORS issues.

---

## Technology Stack

* **Frontend**: React 18 + TypeScript + Vite
* **Backend**: Node.js + Express
* **Database**: MongoDB + Mongoose
* **Styling**: Tailwind CSS v4.0 (using CSS-first @theme configuration directives)
* **Data Visualization**: Recharts (used for tracking logistics route volumes)
* **Icons**: Lucide React
* **State Management**: React Context (Language Context and Global App Context)

---

## Verification & Build Status

We executed the TypeScript compiler and Vite bundler to verify all systems:
```bash
npm run build
```
**Result**: Built client environment for production successfully.

```
dist/index.html                   0.72 kB
dist/assets/index-Zb0r7tza.css   53.75 kB
dist/assets/index-DB3SDD23.js   689.52 kB
```

### Manual Testing Scenarios Verified:
1. **Database Integration**: Checked MongoDB logs. Confirmed new booking records, partner registrations, and simulated sample status increments write successfully to the database.
2. **macOS Port Compliance**: Configured Express to run on Port 5001 to prevent conflicts with macOS default AirPlay Receiver on Port 5000.
3. **Responsive Viewport Layouts**: Sticky bottom nav bar operates correctly on simulated smartphone screens.
4. **Language Toggle**: Instant translation between English and Hindi tags.
