# Walkthrough - DiagBuddy

We have built a premium, responsive, and fully interactive React/TypeScript prototype for **DiagBuddy**, integrated with a complete Node.js + Express backend, MongoDB database storage, Gemini AI endpoints, and the Google Maps API.

---

## Key Features Implemented

### 1. Interactive Google Maps (Developer Mode)
* **Live Map Canvas (`Centers.tsx`)**: Replaced the static mockup radar with a real, interactive Google Maps canvas loaded in developer mode.
* **Coordination-Driven Markers**: Expanded the centers database in `mockData.ts` to include precise latitude and longitude mappings. Markers are dynamically generated and dropped onto the map.
* **Auto-Panning and Bouncing**: Selecting a local center from the list automatically pans the map (`map.panTo()`) and centers over its coordinates, triggering a bounce animation on the selected pin and displaying operational details in an info window balloon.
* **Graceful Script Loading**: Polling hooks monitor asynchronous window.google script loading, falling back cleanly to custom layout dialogs if offline.

### 2. Gemini AI Integrations
* **AI Symptom Checker (Tests Catalog)**: Added an AI Test Assistant panel in the test catalog. Patients describe their symptoms in plain English, and the system queries Gemini Flash to suggest the most relevant diagnostic tests from our listing, automatically highlighting and bubble-matching recommended items in the results grid.
* **AI Report Explainer (Patient Dashboard)**: Added an AI explanation panel next to available pathology reports in the patient console. Patients click "AI Explain" to prompt Gemini to translate complex lab parameters (like TSH, cholesterol, or blood counts) into clear, reassuring laymen English and Hindi advice.

### 3. Demo Authentication Portal
* **Demo Sign In (Navbar)**: Formalized demo sign-in portal. Users click "Login" and can instantly authenticate as a Patient (Rahul Kumar), a Partner Store (Shakti Medical Store), or a Logistics Dispatch Controller.
* **Role-Based Routing**: Authenticating instantly transitions the user tab to their corresponding diagnostic workspace and appends role indicator badges in the header bar.

### 4. B2C Consumer Experience
* **Hero Visual**: Simple, visual representation of the sample journey (Patient to Local Pharmacy to Hub to Laboratory to Digital Report).
* **Quick Actions**: Large, touch-friendly grid buttons for mobile users:
  * **Book a Test**: Direct access to the test catalog.
  * **Home Collection**: Instant home collection request setup.
  * **Find a Center**: Location finder.
  * **My Reports**: Access patient dashboards and mock pathology records.
* **Bilingual Support (English and Hindi)**: Toggle in the navigation bar translates navigation links, action buttons, timeline states, and health warnings.
* **Sample Tracker**: Input fields pre-loaded with sample DB-10245 (Rahul Kumar). Highlights the 6-stage logistics progression timeline. Shows an interactive pathologist-signed clinical report preview when status reaches Report Ready.

### 5. B2B2C Partner Experience
* **Become a Partner Form**: Onboarding wizard capturing medical store / clinic type, location, and daily traffic volumes.
* **Merchant Portal (Partner Dashboard)**: Tracks store metrics (total samples, pending pickups, earnings) and registers walk-in drop-off samples. Contains a Request Pickup dispatcher.

### 6. Smart Logistics Differentiator
* **Animated Network Visualizer**: SVG graphic demonstrating sample consolidation from Pharmacy A, Clinic B, Center C, and Pharmacy D into a Local Hub, followed by route optimized transit to the Central Accredited Lab.
* **Internal Operations Dashboard**: Telemetry dashboard containing active routes overview, distance logs, and cold-chain temperature metrics. Contains a route step simulation trigger.

---

## Backend & Database Architecture

* **API Server**: Node.js + Express running on Port 5001.
* **Database**: MongoDB (Mongoose) storing patient bookings, partner store configurations, and quote requests.
* **AI Processor**: Communicates directly with the Gemini API (using process.env.GEMINI_API_KEY). If the key is unset or calls fail, the backend invokes a regex-based symptom-profile matcher to generate smart fallback answers locally.
* **Graceful Database Fallback**: If a local MongoDB instance is not active, the database config automatically flags isMockDb and operates using an in-memory array handler. The application server remains fully functional without crashing.
* **Auto-Seeding**: Upon initial launch, the Express server checks for default developer demo data (patient Rahul Kumar, sample DB-10245, and Shakti Medical Store) and seeds the database automatically.
* **Vite Proxy Forwarder**: Configured proxy routes in vite.config.ts to forward frontend '/api' requests to port 5001 to resolve CORS issues.

---

## Technology Stack

* **Frontend**: React 18 + TypeScript + Vite
* **Backend**: Node.js + Express
* **Database**: MongoDB + Mongoose
* **Map Engine**: Google Maps JavaScript API
* **AI Model**: Gemini 2.5 Flash API
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
dist/index.html                   0.86 kB
dist/assets/index-DjHgJR1J.css   55.34 kB
dist/assets/index-CoMnNKQI.js   702.65 kB
```

### Manual Testing Scenarios Verified:
1. **Google Maps Canvas**: Navigated to Centers. Confirmed interactive maps load, coordinates pan correctly, and active pins drop drop-down detail windows.
2. **Gemini API Integration**: Tested symptom queries and report analysis. Confirmed AI-generated recommendations and conversational translations output properly.
3. **Demo Sign-in Portal**: Tested Patient, Partner, and Logistics role toggles. Confirmed state variables reset correctly.
4. **Database Integration**: Checked MongoDB logs. Confirmed new booking records, partner registrations, and simulated sample status increments write successfully to the database.
