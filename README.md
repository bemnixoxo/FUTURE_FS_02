# ApexCRM - Client Lead Management System (Mini CRM)

![ApexCRM Banner](https://img.shields.io/badge/ApexCRM-Mini%20CRM%20System-blue?style=for-the-badge)
![React 19](https://img.shields.io/badge/React-19.0-61dafb?style=flat&logo=react)
![Node Express](https://img.shields.io/badge/Node.js-Express%204.21-339933?style=flat&logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?style=flat&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS%204-06B6D4?style=flat&logo=tailwindcss)

A production-grade **Client Lead Management System (Mini CRM)** engineered for agencies, freelancers, and startups. It bridges marketing websites with sales follow-ups—capturing inbound contact inquiries, tracking pipeline stages, logging timestamped follow-up notes, and converting prospects into closed deals.

---

## 🌟 Key Features

### 1. Inbound Lead Intake & Webhook API
- Automatically ingests leads from website contact forms, landing page CTAs, and pricing calculators.
- Endpoints accept JSON and form-encoded data with validation for name, email, and inquiry messages.
- Real-world simulation panel: Test submitting realistic client inquiries from a live agency website mockup and watch them appear in the pipeline in real-time.

### 2. Lead Status Lifecycle
- Move leads through realistic sales stages:
  - `new` — Uncontacted inquiry, highlights response SLA.
  - `contacted` — Discovery outreach or initial call completed.
  - `in_progress` — Scoping, proposal, or SOW contract review.
  - `converted` — Contract signed, won client onboarded.
  - `lost` — Below threshold or competitor chosen.
- Automatic audit logging on status changes with relative timestamps and actor tracking.

### 3. Timestamped Follow-Up Notes & Timeline
- Add categorized follow-up logs:
  - 📞 Phone Call notes
  - ✉️ Email follow-ups
  - 📅 Meeting summaries
  - 📄 Proposal & Quote updates
  - 📝 General team notes
- Complete chronological timeline of every interaction.

### 4. Dual Workspace Views
- **Kanban Board**: Drag-and-drop / 1-click stage advancing, deal value sums per stage, and response urgency indicators.
- **High-Density Data Grid**: Compact table with multi-select checkboxes for bulk status updating and CSV export.

### 5. Conversion Metrics & Source Analytics
- Real-time conversion rate percentage (`won / total`).
- Active and closed pipeline revenue figures ($).
- Acquisition channel distribution (Contact Form vs Landing Page vs Referral vs SEO).
- Stage drop-off funnel.

### 6. Embeddable Form Code & Integration Generator
- Copy-paste drop-in HTML `<form>` snippet for Webflow, Framer, and WordPress.
- JavaScript `fetch()` async submission code.
- cURL terminal command for Zapier / Make webhooks.

### 7. Secure Admin Access
- Authenticated admin panel with session tokens.
- Default administrator credentials: `admin@apexcrm.io` / `admin123`.
- Self-serve admin registration option for custom credentials.

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/leads` | List leads with query filters (`status`, `search`, `source`, `sortBy`) |
| `GET` | `/api/leads/:id` | Retrieve single lead with full history and notes |
| `POST` | `/api/leads` | Capture incoming lead from contact form or admin entry |
| `PATCH` | `/api/leads/:id` | Update lead status, deal value, or priority |
| `POST` | `/api/leads/:id/notes` | Log a timestamped follow-up note |
| `DELETE` | `/api/leads/:id` | Delete lead record |
| `POST` | `/api/leads/batch/update-status` | Bulk update status for multiple selected lead IDs |
| `POST` | `/api/leads/reset/seed` | Reset database to initial sample dataset |
| `GET` | `/api/analytics` | Summary of pipeline metrics, conversion rates, and sources |
| `POST` | `/api/auth/login` | Admin authentication endpoint |

---

## 🏗️ Architecture

```
├── server/
│   ├── data/            # Persistent JSON file storage (leads.json, users.json)
│   ├── routes/          # Express API route handlers (leads, auth, analytics)
│   ├── db.ts            # Database service & seed generator
│   └── types.ts         # TypeScript schema definitions
├── server.ts            # Full-stack server (Express + Vite middleware)
├── src/
│   ├── components/      # React components (Kanban, Table, Simulator, Embed, Docs, Analytics)
│   ├── services/        # Typed API client
│   ├── types/           # Client interfaces
│   ├── App.tsx          # Main application coordinator
│   └── main.tsx         # Entry point
```

---

## 🚀 Quickstart & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/apex-crm-mini.git
   cd apex-crm-mini
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the application**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Production Build**:
   ```bash
   npm run build
   npm start
   ```

---

## 🛡️ License

Apache-2.0
