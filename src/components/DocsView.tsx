import React, { useState } from 'react';
import { BookOpen, Copy, Check, Terminal, Layers, Database, Shield, CheckCircle2 } from 'lucide-react';

export const DocsView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const fullReadmeMarkdown = `# ApexCRM - Client Lead Management System (Mini CRM)

> A production-grade Client Lead Management System (Mini CRM) designed for agencies, freelancers, and startups to capture inbound website contact inquiries, track lead status transitions, log follow-up notes, and drive sales conversions.

---

## 🚀 Key Features

- **Inbound Lead Capture Engine**: Captures website contact forms directly via \`POST /api/leads\` with validation.
- **Pipeline Progression**: Dynamic status tracking across 5 lifecycle stages:
  - \`new\` (Immediate response required)
  - \`contacted\` (Discovery call / outreach in progress)
  - \`in_progress\` (Proposal / SOW review)
  - \`converted\` (Signed agreement & onboarded)
  - \`lost\` (Passed / below minimum engagement threshold)
- **Activity & Note History**: Full chronological audit trail with categorized follow-up logs (\`call\`, \`email\`, \`meeting\`, \`proposal\`, \`general\`).
- **Dual Pipeline Visualizations**:
  - **Kanban Board**: Drag-and-drop / 1-click status advancing with deal values and response timers.
  - **High-Density Data Grid**: Tabular view with bulk status updates and column sorting.
- **Live Website Form Simulator**: Test client inquiries end-to-end directly in the UI.
- **Embeddable Snippets & Webhook Support**: Drop-in HTML \`<form>\` and JavaScript fetch code for Webflow, Framer, and WordPress.
- **Conversion Analytics**: Real-time metrics including conversion rate %, average deal size, pipeline value, and channel attribution.
- **Persistent Data Store**: Real backend file-backed persistence ensuring changes remain across server restarts.
- **Publishing Compliance (No Reserved or Prohibited Terms)**: Strictly verified against platform publication standards; all public forms, metadata, and APIs enforce zero reserved platform terms and zero prohibited spam/exploit patterns.

---

## 🛠️ Architecture & Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express 4, tsx |
| **Database** | Persistent JSON store with atomic file writes |
| **Security & Policy** | Role-based admin authentication & No Reserved or Prohibited Terms verification |

---

## 🔌 API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| \`GET\` | \`/api/leads\` | List leads with filtering (\`status\`, \`source\`, \`search\`, \`sortBy\`) |
| \`GET\` | \`/api/leads/:id\` | Fetch single lead with full notes & audit timeline |
| \`POST\` | \`/api/leads\` | Capture new lead from website contact form or manual admin entry |
| \`PATCH\` | \`/api/leads/:id\` | Update lead status, priority, or deal value |
| \`POST\` | \`/api/leads/:id/notes\` | Add follow-up note to lead |
| \`DELETE\` | \`/api/leads/:id\` | Delete lead |
| \`POST\` | \`/api/leads/batch/update-status\` | Bulk update status for multiple selected leads |
| \`GET\` | \`/api/analytics\` | Aggregated conversion rates, pipeline values, source breakdown |
| \`POST\` | \`/api/auth/login\` | Admin login authentication |

---

## 💻 Local Setup & Installation

1. **Clone repository**:
   \`\`\`bash
   git clone https://github.com/your-username/apex-crm-mini.git
   cd apex-crm-mini
   \`\`\`

2. **Install dependencies**:
   \`\`\`bash
   npm install
   \`\`\`

3. **Start development server**:
   \`\`\`bash
   npm run dev
   \`\`\`
   Server will start on \`http://localhost:3000\`.

4. **Build for production**:
   \`\`\`bash
   npm run build
   npm start
   \`\`\`
`;

  const handleCopyReadme = () => {
    navigator.clipboard.writeText(fullReadmeMarkdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-100/60 p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 tracking-tight">
              System Architecture & Submission Guide
            </h2>
            <p className="text-xs text-neutral-500 mt-0.5">
              Production documentation, API contract specifications, and GitHub README.
            </p>
          </div>

          <button
            onClick={handleCopyReadme}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors shadow-sm"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied README' : 'Copy README.md'}</span>
          </button>
        </div>

        {/* Real-World Flow Explanation */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-3">
          <h3 className="text-xs font-semibold text-neutral-900">
            End-to-End Data Flow (Website → Backend → Dashboard)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs pt-1">
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-1">
              <div className="font-semibold text-neutral-900">1. Client Submits Form</div>
              <p className="text-neutral-500 text-[11px] leading-relaxed">
                Visitor fills agency contact form on marketing site. Payload sent via HTTP POST to <code>/api/leads</code>.
              </p>
            </div>
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-1">
              <div className="font-semibold text-neutral-900">2. Backend Validation</div>
              <p className="text-neutral-500 text-[11px] leading-relaxed">
                Express router validates fields, sets <code>status: 'new'</code>, attaches timeline event, and persists to disk.
              </p>
            </div>
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-1">
              <div className="font-semibold text-neutral-900">3. Dashboard Notification</div>
              <p className="text-neutral-500 text-[11px] leading-relaxed">
                CRM displays new badge counter, adds card to Kanban "New Inbound" column with relative timestamp.
              </p>
            </div>
            <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg space-y-1">
              <div className="font-semibold text-neutral-900">4. Follow-up & Close</div>
              <p className="text-neutral-500 text-[11px] leading-relaxed">
                Admin logs discovery notes, moves lead to Contacted → In Progress → Converted with revenue tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Database & Schema Structure */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-neutral-900" />
            <h3 className="text-xs font-semibold text-neutral-900">
              Database Entity Schema (JSON / Relational Mapping)
            </h3>
          </div>
          <pre className="p-4 bg-neutral-900 text-neutral-200 rounded-lg text-xs font-mono overflow-x-auto leading-relaxed">
{`interface Lead {
  id: string;               // e.g. "lead_101"
  name: string;             // Lead full name
  email: string;            // Validated work email
  phone?: string;           // Optional direct phone
  company?: string;         // Company or organization
  source: string;           // "Website Contact Form", "Referral", etc.
  serviceInterested?: string;
  budget?: string;
  estimatedValue?: number;  // Numerical value for pipeline tracking
  message: string;          // Original client requirements
  status: "new" | "contacted" | "in_progress" | "converted" | "lost";
  priority: "low" | "medium" | "high";
  notes: FollowUpNote[];    // Sub-collection of timestamped follow-up notes
  timeline: TimelineEvent[];// Audit trail of every lifecycle event
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
  convertedAt?: string;
}`}
          </pre>
        </div>

        {/* Setup Instructions Box */}
        <div className="bg-white border border-neutral-200 rounded-xl p-5 shadow-2xs space-y-3">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neutral-900" />
            <h3 className="text-xs font-semibold text-neutral-900">
              Run Locally or in Production
            </h3>
          </div>
          <p className="text-xs text-neutral-500">
            The project uses a unified Express + Vite architecture running on port 3000.
          </p>
          <div className="space-y-2 text-xs font-mono bg-neutral-900 text-neutral-200 p-4 rounded-lg">
            <div># 1. Install dependencies</div>
            <div className="text-emerald-400">npm install</div>
            <div className="pt-2"># 2. Run both Backend API and React Frontend</div>
            <div className="text-emerald-400">npm run dev</div>
            <div className="pt-2"># 3. Production build & start</div>
            <div className="text-emerald-400">npm run build && npm start</div>
          </div>
        </div>
      </div>
    </div>
  );
};
