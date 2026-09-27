# Apex Tech Institute — Web Platform

Modern, full-stack education platform built with Next.js 14, Tailwind CSS, TypeScript, Prisma, and Stripe.

---

## 🚀 Quick Start

### Option 1: One-Click Launch (Windows)
Double-click `run_website.bat` in the root folder. It will start the server and open your browser at `http://localhost:3000`.

### Option 2: Terminal
```bash
# Install dependencies (first time only)
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Credentials & Portals

### 1. Admin Portal
- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Access:** Password only: `vageesha2000`
- **Features:** Manage courses, monitor new student registrations, track fee installments, view inquiries, lead tracking, and faculty rosters.

### 2. Student Portal
- **URL:** [http://localhost:3000/login](http://localhost:3000/login) *(Student Tab)*
- **Demo Credentials:**
  - Email: `student@example.com`
  - Password: `student123`
- **New Registration:** [http://localhost:3000/register](http://localhost:3000/register)
  - Pre-selected course & live dropdown switcher.
  - ₹2,000 seat reservation fee or discounted full tuition.
  - Stripe Payment Gateway with instant confirmation.

### 3. Faculty Portal
- **URL:** [http://localhost:3000/login](http://localhost:3000/login) *(Faculty Tab)*
- **Demo Credentials:**
  - Email: `faculty@apexinstitute.com`
  - Password: `faculty123`
- **Features:** Assigned batches, syllabus progress, student grades, attendance.

---

## 💳 Stripe Payment Gateway Integration
- **Live Test Mode:** Configured in `.env` with official test publishable and secret keys.
- **Accepted Currencies:** INR (₹)
- **Features:**
  - ₹2,000 seat reservation payment at registration.
  - Full tuition upfront payment option with 10% instant discount.
  - Remaining fee installment payment via Stripe from the Student Dashboard.
  - Automated enrollment verification and account provisioning upon checkout completion.

---

## 🛠️ Tech Stack & Architecture
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (`npx tsc --noEmit` -> 0 errors)
- **Database:** Prisma ORM with SQLite + In-Memory fallback store
- **Styling:** Tailwind CSS & Framer Motion animations
- **AI Integration:** Google Gemini AI Admissions Counselor (`/api/chat`)
- **Payments:** Stripe Checkout Sessions & Webhooks (`stripe` Node.js SDK)

For detailed release notes, see [CHANGELOG_AND_UPDATES.md](file:///c:/Users/VAGEESHA/Desktop/training%20instituteweb/CHANGELOG_AND_UPDATES.md).
