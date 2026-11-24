# MealTrack Multi-Tenant SaaS Platform (Phase 1)

**Target Product:** MealTrack Multi-Tenant SaaS Platform  
**Partners:** Ideal Technology Solutions, LLC & Harper Woods Schools (Beacon & Tyrone Elementary)  
**Design Philosophy:** **"Ultra-Clean & Plain"** — Low object density per screen, zero clutter, ample whitespace, Apple/Linear simplicity, high contrast, broken down into **23 focused, dedicated single-purpose pages**.

---

## 🌟 Overview & Key Features

MealTrack is a K–12 school nutrition administration and daily meal management SaaS platform designed specifically for districts operating under the **USDA Community Eligibility Provision (CEP)**.

1. **Ultra-Clean Minimalist UI/UX:** Adheres strictly to the global design directive (#0F172A / #F8FAFC) with low cognitive load (4 to 6 objects per view) and 44px+ touch targets.
2. **23 Dedicated Micro-Pages:** Covers every user persona across elementary classrooms, parent mobile magic links, vendor multi-tenant operations, food service directors, and cafeteria kitchen lines.
3. **Browser Cache Persistence & Mock .NET Core API Layer:** Uses `localStorage` to persist student rosters, attendance statuses, meal choices, signed legal attestations, parent weekly pre-orders, and staff directory records with JSON structures matching upcoming ASP.NET Core Web API DTOs.
4. **SignalR Real-Time Push Simulation:** Sub-second event broadcasting between teacher count submissions/late arrivals and the Cafeteria Preparation Board.
5. **Comprehensive 10-Page PDF User Manual:** Formatted for executive review, available for in-app reading and instant download (`MealTrack_SaaS_User_Manual.pdf`).

---

## 📱 The 23 Dedicated Stitch Pages

- **Group A: Teacher Morning Workflow (Pages 1–5)**
  - `Page 1`: Teacher Classroom Morning Hub (Mrs. Jennifer Ellis, Room 205, Grade 2; live cut-off timer)
  - `Page 2`: Student Quick-Attendance Step (Attendance only: Present, Late, Leave Late, Absent)
  - `Page 3`: Student Meal Choices Step (Classroom Breakfast + 5 Lunch choices: Hot A, Cold B, Salad, Own, Fasting)
  - `Page 4`: Extended Day & Leave Late Check (Latchkey, Tutoring, Art Studio snack & supper confirmation)
  - `Page 5`: Digital Signature & Legal Attestation (USDA/MDE certification, Google SSO signature, IP stamp)
- **Group B: Parent Mobile Magic Link (Pages 6–9)**
  - `Page 6`: Parent Welcome & Enrolled Children (Rachel Carter, Jordan & Maya Carter)
  - `Page 7`: Educational Benefit Assistance Survey (SNAP/FIP Case # or household size slider & income bracket)
  - `Page 8`: Parent Digital e-Signature Certification (Legal consent, green checkmark animation, PAdES certificate)
  - `Page 9`: Weekly Lunch Pre-Selection Calendar (Sibling switcher, Mon–Fri tabs, 5 meal choices auto-saved)
- **Group C: Master Super-Portal — Vendor Level (Pages 10–14)**
  - `Page 10`: Master Client Districts Directory (14 Active Districts, 18,420 Enrolled Students)
  - `Page 11`: Add District Step 1: Branding & Profile (Subdomain preview, logo upload, brand color picker)
  - `Page 12`: Add District Step 2: License Duration & Hard Expiration Date (Hard Lockout vs. 7-Day Grace)
  - `Page 13`: Add District Step 3: Feature Modules Checklist (Toggle entitlements & license activation)
  - `Page 14`: Global System Telemetry & Background Job Health (SignalR Hub, 7:00 AM SMS Queue, Azure SQL)
- **Group D: Client District Admin — Harper Woods (Pages 15–17)**
  - `Page 15`: District Admin Home & License Status (Director Brian Corbett, license transparency banner)
  - `Page 16`: Staff Directory & Classroom Assignments (Rosters, count submission status, reminder nudges)
  - `Page 17`: Invite Staff Member Form (Google Workspace SSO invitation)
- **Group E: Food Service & Kitchen Line (Pages 18–20)**
  - `Page 18`: Kitchen Live Preparation Board (10-ft glanceable production counters: Hot A, Cold B, Salad)
  - `Page 19`: Live Change Alerts Stream (Post-9:00 AM additions, "Mark Added to Cart" workflow)
  - `Page 20`: In-App PDF Review & Benefit Form Approval Desk (Split-screen 8.5x11 PDF replica & MiStar sync)
- **Group F: Special States, Emails & Lockout (Pages 21–23)**
  - `Page 21`: License Expired / Hard Lockout Screen (Soft red padlock, instructions, renewal link)
  - `Page 22`: 9:00 AM Daily Master Report Email Template (600px responsive HTML layout)
  - `Page 23`: Kitchen Live Change Alert Email & SMS Template (Urgent red warmer cart alert)

---

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ (tested on Node v20/v26)
- npm 9+

### Installation & Run
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
```
Generates production assets in `dist/`, including the compiled application and `MealTrack_SaaS_User_Manual.pdf`.

---

## 🌐 Deploy to Netlify

This repository is pre-configured with `netlify.toml` and `public/_redirects` for automatic SPA deployment:

### Option 1: Deploy with Git (Recommended)
1. Push this repository to GitHub or GitLab:
   ```bash
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git branch -M main
   git push -u origin main
   ```
2. In your [Netlify Dashboard](https://app.netlify.com/):
   - Click **"Add new site"** → **"Import an existing project"**.
   - Select your Git provider and repository.
   - Build settings are automatically detected:
     - **Build command:** `npm run build`
     - **Publish directory:** `dist`
   - Click **"Deploy site"**.

### Option 2: Drag and Drop
1. Run `npm run build` locally.
2. Drag and drop the generated `dist` folder into the Netlify Drop area at [https://app.netlify.com/drop](https://app.netlify.com/drop).

---

## 📄 User Manual & Documentation
The official 10-page User Manual is included in the project:
- Path: `public/MealTrack_SaaS_User_Manual.pdf`
- Can be viewed in-app by clicking **"User Manual"** in the top navigation bar or downloaded directly.

---
© 2026 Ideal Technology Solutions, LLC. Built for Harper Woods Community Schools.
