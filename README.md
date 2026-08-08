# DiagBuddy - Diagnostic Healthcare Platform

Reliable Diagnostics. Smarter Logistics. Every Town.

DiagBuddy connects patients, local healthcare partners (such as pharmacies and clinics), and accredited diagnostic laboratories through an efficient, consolidated sample collection and cold-chain logistics network. Designed specifically for Tier 2 and Tier 3 cities in India, the platform solves the economics of low-volume testing by aggregating demand and optimizing transport routes.

---

## The Problem and Solution

### Problem
Large diagnostic laboratory chains are concentrated in tier 1 metro cities. Smaller towns depend on fragmented local laboratories that suffer from low sample volumes, high transportation costs per specimen, inconsistent quality control, and cold-chain challenges.

### Solution
DiagBuddy does not construct expensive diagnostic laboratories in every town. Instead, it turns local neighborhood pharmacies, clinics, and doctors into collections hubs. These partners register and secure samples, which are consolidated by DiagBuddy couriers and transported to centralized accredited testing facilities using optimized cold-chain routes.

---

## Business Models

1. **B2B2C (Primary)**: Local pharmacies, clinics, and doctors serve as DiagBuddy partners. They refer patients, collect samples locally, and earn commissions on completed diagnostic packages.
2. **B2C (Direct)**: Patients search for blood tests, book collections from home or at local centers, track sample progression, and download path-signed digital reports.
3. **B2B (Organizations)**: Schools, factories, NGOs, and corporations request bulk health checkups and employee preventive screenings at scale.

---

## Core Features

* **Bilingual UI (English and Hindi)**: Toggle in the navigation bar translates navigation links, action buttons, timeline states, and health warnings.
* **Test and Package Catalog**: Live search engine with category filters to browse thyroid profiles, lipid profiles, diabetes profiles, and complete blood counts.
* **Interactive Booking Wizard**: A 5-step patient checkout covering collection mode, calendar date slots, patient profiles, payment summary disclaimers, and confirmation.
* **Sample Tracking Timeline**: Pre-loaded tracking for patient Rahul Kumar (Sample ID: DB-10245) showing stages from collection, local aggregation, transit, lab analysis, and PDF report verification.
* **Merchant Store Portal (Partner Dashboard)**: Tracks store metrics (total samples, pending pickups, earnings) and registers walk-in drop-off samples.
* **Operations Logistics Telemetry**: Analytics dashboard showing active routes, fleet telemetry logs, temperature thresholds, and path increment simulators.

---

## Technology Stack

* **Frontend Framework**: React 18 + TypeScript + Vite
* **Styling**: Tailwind CSS v4.0 (using CSS-first @theme configuration directives)
* **Data Visualization**: Recharts (used for tracking logistics route volumes)
* **Icons**: Lucide React
* **State Management**: React Context (Language Context and Global App Context)

---

## Getting Started

### Prerequisites
* Node.js (version 18.0 or higher recommended)
* npm (version 9.0 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/shubhamjhammmut/diagbuddy.git
   ```
2. Navigate to the project directory:
   ```bash
   # Enter the repository folder
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

### Development Server
Start the local development server:
```bash
npm run dev
```
The application will launch at `http://localhost:5173`.

### Production Build
Build the production-ready assets:
```bash
npm run build
```
Vite will compile the code and compile HTML, CSS, and JS chunks to the `dist/` directory.

---

## Directory Structure

* `src/components/`: Reusable interface components (Navbar, MobileNav, Footer, BookingFlowModal, PartnerRegistrationModal, B2BQuoteModal, LogisticsSection, etc.)
* `src/pages/`: Dynamic views and dashboards (Home, Tests, Centers, Track, UserDashboard, PartnerDashboard, LogisticsDashboard)
* `src/context/`: State providers (LanguageContext, AppContext)
* `src/utils/`: Mock databases (mockData.ts)
* `src/index.css`: Global styles, custom scrollbar overrides, and `@theme` variable declarations.
