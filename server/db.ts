import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { Lead, User } from './types.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, 'data');
const LEADS_FILE = path.join(DATA_DIR, 'leads.json');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial Admin User
const DEFAULT_USERS: User[] = [
  {
    id: 'usr_admin_01',
    email: 'admin@apexcrm.io',
    name: 'Sarah Jenkins',
    role: 'admin',
    avatarUrl: '/src/assets/images/admin_avatar_1790137823737.jpg',
    password: 'admin123',
  },
];

// Rich Initial Seed Leads
const DEFAULT_LEADS: Lead[] = [
  {
    id: 'lead_101',
    name: 'David Zhao',
    email: 'david.zhao@luminahealth.co',
    phone: '+1 (415) 890-2341',
    company: 'Lumina Health Technologies',
    source: 'Website Contact Form',
    serviceInterested: 'Full-Stack Web App Development',
    budget: '$15,000 - $25,000',
    estimatedValue: 20000,
    message: 'We are expanding our patient portal and need a senior engineering team to rebuild our scheduling and telehealth intake module by Q4.',
    status: 'new',
    priority: 'high',
    assignedTo: 'Sarah Jenkins',
    notes: [],
    timeline: [
      {
        id: 't_101_1',
        type: 'created',
        description: 'Lead submitted via main website contact form',
        timestamp: new Date(Date.now() - 35 * 60 * 1000).toISOString(), // 35 min ago
        actor: 'System',
      },
    ],
    createdAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 35 * 60 * 1000).toISOString(),
  },
  {
    id: 'lead_102',
    name: 'Elena Rostova',
    email: 'elena@novapress.media',
    phone: '+1 (212) 555-0199',
    company: 'NovaPress Media Group',
    source: 'Landing Page Hero CTA',
    serviceInterested: 'UI/UX Redesign & Brand System',
    budget: '$8,000 - $12,000',
    estimatedValue: 10000,
    message: 'Looking for a complete design system refresh for our digital publication. Need high scannability, dark mode aesthetic, and mobile optimization.',
    status: 'contacted',
    priority: 'high',
    assignedTo: 'Sarah Jenkins',
    notes: [
      {
        id: 'note_102_1',
        author: 'Sarah Jenkins',
        content: 'Had initial 20-min discovery call. Elena has budget approved and needs work started by 1st of next month. Sent our portfolio deck.',
        category: 'call',
        createdAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
      },
    ],
    timeline: [
      {
        id: 't_102_1',
        type: 'created',
        description: 'Inbound submission from Landing Page Hero CTA',
        timestamp: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
        actor: 'System',
      },
      {
        id: 't_102_2',
        type: 'status_change',
        description: 'Status changed from "new" to "contacted"',
        timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        actor: 'Sarah Jenkins',
      },
      {
        id: 't_102_3',
        type: 'note_added',
        description: 'Added discovery call follow-up notes',
        timestamp: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
        actor: 'Sarah Jenkins',
      },
    ],
    createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    lastContactedAt: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
  },
  {
    id: 'lead_103',
    name: 'Marcus Vance',
    email: 'mvance@stratafin.io',
    phone: '+1 (312) 441-9872',
    company: 'Strata Financial SaaS',
    source: 'Pricing Page Inquiry',
    serviceInterested: 'Custom CRM & API Integration',
    budget: '$25,000 - $40,000',
    estimatedValue: 32000,
    message: 'We require a bespoke pipeline synchronization bridge between our internal billing engine and Stripe/PostgreSQL. Seeking quotes.',
    status: 'in_progress',
    priority: 'high',
    assignedTo: 'Sarah Jenkins',
    notes: [
      {
        id: 'note_103_1',
        author: 'Sarah Jenkins',
        content: 'Technical scoping session completed with CTO. Architecture draft approved. Shared scope statement.',
        category: 'meeting',
        createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
      },
      {
        id: 'note_103_2',
        author: 'Sarah Jenkins',
        content: 'Sent detailed Statement of Work (SOW) with $32k milestone breakdown. Awaiting legal signoff.',
        category: 'proposal',
        createdAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
      },
    ],
    timeline: [
      {
        id: 't_103_1',
        type: 'created',
        description: 'Inbound submission from Pricing Page Inquiry',
        timestamp: new Date(Date.now() - 3 * 86400 * 1000).toISOString(),
        actor: 'System',
      },
      {
        id: 't_103_2',
        type: 'status_change',
        description: 'Status updated to "contacted"',
        timestamp: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
        actor: 'Sarah Jenkins',
      },
      {
        id: 't_103_3',
        type: 'status_change',
        description: 'Status advanced to "in_progress" (Proposal Sent)',
        timestamp: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
        actor: 'Sarah Jenkins',
      },
    ],
    createdAt: new Date(Date.now() - 3 * 86400 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    lastContactedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
  },
  {
    id: 'lead_104',
    name: 'Amira Benali',
    email: 'amira@kestrellabs.ai',
    phone: '+44 20 7946 0912',
    company: 'Kestrel Labs AI',
    source: 'Partner Referral',
    serviceInterested: 'Full-Stack Web App Development',
    budget: '$18,000 - $30,000',
    estimatedValue: 24000,
    message: 'Referred by Tom at Apex Ventures. We need front-end React developers who know Tailwind and data visualization to build our model benchmark dashboard.',
    status: 'converted',
    priority: 'high',
    assignedTo: 'Sarah Jenkins',
    notes: [
      {
        id: 'note_104_1',
        author: 'Sarah Jenkins',
        content: 'Call went exceptionally well. Referred directly from Tom. They signed master service agreement!',
        category: 'call',
        createdAt: new Date(Date.now() - 4 * 86400 * 1000).toISOString(),
      },
      {
        id: 'note_104_2',
        author: 'Sarah Jenkins',
        content: 'First invoice 50% deposit received ($12,000). Onboarding kickoff scheduled for Monday morning.',
        category: 'proposal',
        createdAt: new Date(Date.now() - 1 * 86400 * 1000).toISOString(),
      },
    ],
    timeline: [
      {
        id: 't_104_1',
        type: 'created',
        description: 'Inbound referral from Apex Ventures',
        timestamp: new Date(Date.now() - 7 * 86400 * 1000).toISOString(),
        actor: 'System',
      },
      {
        id: 't_104_2',
        type: 'status_change',
        description: 'Status converted to Client!',
        timestamp: new Date(Date.now() - 1 * 86400 * 1000).toISOString(),
        actor: 'Sarah Jenkins',
      },
    ],
    createdAt: new Date(Date.now() - 7 * 86400 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 86400 * 1000).toISOString(),
    lastContactedAt: new Date(Date.now() - 4 * 86400 * 1000).toISOString(),
    convertedAt: new Date(Date.now() - 1 * 86400 * 1000).toISOString(),
  },
  {
    id: 'lead_105',
    name: 'Julian Sterling',
    email: 'jsterling@aerovector.com',
    phone: '+1 (512) 302-8811',
    company: 'AeroVector Logistics',
    source: 'Website Contact Form',
    serviceInterested: 'Mobile App MVP',
    budget: '$10,000 - $15,000',
    estimatedValue: 12500,
    message: 'We need an internal React Native dispatch scanner app for our regional delivery drivers with barcode tracking and offline sync.',
    status: 'new',
    priority: 'medium',
    assignedTo: 'Sarah Jenkins',
    notes: [],
    timeline: [
      {
        id: 't_105_1',
        type: 'created',
        description: 'Lead submitted via main website contact form',
        timestamp: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
        actor: 'System',
      },
    ],
    createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
  },
  {
    id: 'lead_106',
    name: 'Chloe Tremblay',
    email: 'chloe@montrealartisan.ca',
    phone: '+1 (514) 873-4521',
    company: 'Artisan Workshop Studio',
    source: 'Blog Article CTA',
    serviceInterested: 'E-Commerce Store & Shopify Setup',
    budget: '$3,000 - $5,000',
    estimatedValue: 4000,
    message: 'Hi! Saw your blog post on high-conversion checkout flows. We are migrating our ceramics studio from Etsy to custom e-commerce.',
    status: 'contacted',
    priority: 'low',
    assignedTo: 'Sarah Jenkins',
    notes: [
      {
        id: 'note_106_1',
        author: 'Sarah Jenkins',
        content: 'Sent initial automated pricing package and calendar booking link.',
        category: 'email',
        createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      },
    ],
    timeline: [
      {
        id: 't_106_1',
        type: 'created',
        description: 'Inbound submission from Blog Article CTA',
        timestamp: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
        actor: 'System',
      },
      {
        id: 't_106_2',
        type: 'status_change',
        description: 'Status changed to "contacted"',
        timestamp: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
        actor: 'Sarah Jenkins',
      },
    ],
    createdAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    lastContactedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
  },
  {
    id: 'lead_107',
    name: 'Robert Chen',
    email: 'rchen@solargrid.energy',
    phone: '+1 (206) 914-7732',
    company: 'SolarGrid Clean Energy',
    source: 'Website Contact Form',
    serviceInterested: 'Full-Stack Web App Development',
    budget: '$20,000 - $35,000',
    estimatedValue: 28000,
    message: 'Need a commercial customer quoting tool with solar savings calculation and PDF generation.',
    status: 'converted',
    priority: 'high',
    assignedTo: 'Sarah Jenkins',
    notes: [
      {
        id: 'note_107_1',
        author: 'Sarah Jenkins',
        content: 'Deal closed! Contract signed for $28,000. Project sprint begins next sprint.',
        category: 'meeting',
        createdAt: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
      },
    ],
    timeline: [
      {
        id: 't_107_1',
        type: 'created',
        description: 'Lead submitted via main website contact form',
        timestamp: new Date(Date.now() - 10 * 86400 * 1000).toISOString(),
        actor: 'System',
      },
      {
        id: 't_107_2',
        type: 'status_change',
        description: 'Status updated to Converted',
        timestamp: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
        actor: 'Sarah Jenkins',
      },
    ],
    createdAt: new Date(Date.now() - 10 * 86400 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
    convertedAt: new Date(Date.now() - 2 * 86400 * 1000).toISOString(),
  },
  {
    id: 'lead_108',
    name: 'Samantha Wright',
    email: 'swright@microconsult.biz',
    phone: '+1 (704) 220-4100',
    company: 'MicroConsult Advisors',
    source: 'Direct Outreach / Event',
    serviceInterested: 'SEO & Content Growth',
    budget: '< $2,000',
    estimatedValue: 1500,
    message: 'Looking for cheap 500 word monthly blog articles. Can you do $100 per article?',
    status: 'lost',
    priority: 'low',
    assignedTo: 'Sarah Jenkins',
    notes: [
      {
        id: 'note_108_1',
        author: 'Sarah Jenkins',
        content: 'Budget below agency minimum engagement ($5k). Politely declined and recommended freelance networks.',
        category: 'email',
        createdAt: new Date(Date.now() - 5 * 86400 * 1000).toISOString(),
      },
    ],
    timeline: [
      {
        id: 't_108_1',
        type: 'created',
        description: 'Inbound lead received',
        timestamp: new Date(Date.now() - 6 * 86400 * 1000).toISOString(),
        actor: 'System',
      },
      {
        id: 't_108_2',
        type: 'status_change',
        description: 'Status marked as "lost" (Below minimum engagement threshold)',
        timestamp: new Date(Date.now() - 5 * 86400 * 1000).toISOString(),
        actor: 'Sarah Jenkins',
      },
    ],
    createdAt: new Date(Date.now() - 6 * 86400 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 86400 * 1000).toISOString(),
  },
];

class Database {
  private leads: Lead[] = [];
  private users: User[] = [];

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (fs.existsSync(LEADS_FILE)) {
        const raw = fs.readFileSync(LEADS_FILE, 'utf-8');
        this.leads = JSON.parse(raw);
      } else {
        this.leads = DEFAULT_LEADS;
        this.saveLeads();
      }
    } catch (err) {
      console.error('Error reading leads file, resetting to default:', err);
      this.leads = DEFAULT_LEADS;
      this.saveLeads();
    }

    try {
      if (fs.existsSync(USERS_FILE)) {
        const raw = fs.readFileSync(USERS_FILE, 'utf-8');
        this.users = JSON.parse(raw);
      } else {
        this.users = DEFAULT_USERS;
        this.saveUsers();
      }
    } catch (err) {
      console.error('Error reading users file:', err);
      this.users = DEFAULT_USERS;
      this.saveUsers();
    }
  }

  private saveLeads() {
    try {
      fs.writeFileSync(LEADS_FILE, JSON.stringify(this.leads, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving leads:', err);
    }
  }

  private saveUsers() {
    try {
      fs.writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving users:', err);
    }
  }

  // --- Leads Operations ---
  public getLeads(filters?: {
    status?: string;
    search?: string;
    source?: string;
    sortBy?: string;
  }): Lead[] {
    let result = [...this.leads];

    if (filters?.status && filters.status !== 'all') {
      result = result.filter((l) => l.status === filters.status);
    }

    if (filters?.source && filters.source !== 'all') {
      result = result.filter((l) => l.source === filters.source);
    }

    if (filters?.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      result = result.filter(
        (l) =>
          l.name.toLowerCase().includes(q) ||
          l.email.toLowerCase().includes(q) ||
          (l.company && l.company.toLowerCase().includes(q)) ||
          l.message.toLowerCase().includes(q) ||
          (l.serviceInterested && l.serviceInterested.toLowerCase().includes(q))
      );
    }

    if (filters?.sortBy === 'oldest') {
      result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    } else if (filters?.sortBy === 'value_high') {
      result.sort((a, b) => (b.estimatedValue || 0) - (a.estimatedValue || 0));
    } else if (filters?.sortBy === 'value_low') {
      result.sort((a, b) => (a.estimatedValue || 0) - (b.estimatedValue || 0));
    } else {
      // default: newest first
      result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return result;
  }

  public getLeadById(id: string): Lead | undefined {
    return this.leads.find((l) => l.id === id);
  }

  public createLead(data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    source?: string;
    serviceInterested?: string;
    budget?: string;
    estimatedValue?: number;
    message: string;
    priority?: 'low' | 'medium' | 'high';
  }): Lead {
    const id = `lead_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const now = new Date().toISOString();

    const newLead: Lead = {
      id,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone?.trim() || undefined,
      company: data.company?.trim() || undefined,
      source: data.source?.trim() || 'Website Contact Form',
      serviceInterested: data.serviceInterested?.trim() || 'General Inquiry',
      budget: data.budget?.trim() || 'Not specified',
      estimatedValue: data.estimatedValue || 5000,
      message: data.message.trim(),
      status: 'new',
      priority: data.priority || 'medium',
      assignedTo: 'Sarah Jenkins',
      notes: [],
      timeline: [
        {
          id: `t_${Date.now()}`,
          type: 'created',
          description: `Lead submitted via ${data.source || 'Website Contact Form'}`,
          timestamp: now,
          actor: 'Website Visitor',
        },
      ],
      createdAt: now,
      updatedAt: now,
    };

    this.leads.unshift(newLead);
    this.saveLeads();
    return newLead;
  }

  public updateLead(id: string, updates: Partial<Lead>, actorName = 'Admin'): Lead | null {
    const idx = this.leads.findIndex((l) => l.id === id);
    if (idx === -1) return null;

    const current = this.leads[idx];
    const now = new Date().toISOString();
    const timelineUpdates = [...current.timeline];

    // Detect status transition
    if (updates.status && updates.status !== current.status) {
      timelineUpdates.unshift({
        id: `t_${Date.now()}_status`,
        type: 'status_change',
        description: `Status changed from "${current.status}" to "${updates.status}"`,
        timestamp: now,
        actor: actorName,
      });

      if (updates.status === 'contacted' && !current.lastContactedAt) {
        updates.lastContactedAt = now;
      }
      if (updates.status === 'converted' && !current.convertedAt) {
        updates.convertedAt = now;
      }
    }

    const updated: Lead = {
      ...current,
      ...updates,
      timeline: timelineUpdates,
      updatedAt: now,
    };

    this.leads[idx] = updated;
    this.saveLeads();
    return updated;
  }

  public addNote(
    leadId: string,
    content: string,
    category: 'general' | 'call' | 'email' | 'meeting' | 'proposal' = 'general',
    author = 'Sarah Jenkins'
  ): Lead | null {
    const lead = this.getLeadById(leadId);
    if (!lead) return null;

    const now = new Date().toISOString();
    const noteId = `note_${Date.now()}`;
    const newNote = {
      id: noteId,
      author,
      content: content.trim(),
      category,
      createdAt: now,
    };

    const notes = [newNote, ...lead.notes];
    const timeline = [
      {
        id: `t_${Date.now()}_note`,
        type: 'note_added' as const,
        description: `Added ${category} note: "${content.slice(0, 60)}${content.length > 60 ? '...' : ''}"`,
        timestamp: now,
        actor: author,
      },
      ...lead.timeline,
    ];

    // If adding a call or email note and lead was 'new', suggest updating lastContactedAt
    const updates: Partial<Lead> = {
      notes,
      timeline,
      updatedAt: now,
      lastContactedAt: lead.lastContactedAt || now,
    };

    return this.updateLead(leadId, updates, author);
  }

  public deleteLead(id: string): boolean {
    const initialLen = this.leads.length;
    this.leads = this.leads.filter((l) => l.id !== id);
    if (this.leads.length !== initialLen) {
      this.saveLeads();
      return true;
    }
    return false;
  }

  public resetToDefaults(): void {
    this.leads = JSON.parse(JSON.stringify(DEFAULT_LEADS));
    this.saveLeads();
  }

  // --- Users & Auth ---
  public getUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  }

  public getUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  public createUser(data: { email: string; name: string; password?: string; role?: 'admin' | 'manager' }): User {
    const existing = this.getUserByEmail(data.email);
    if (existing) {
      throw new Error('A user with this email address already exists.');
    }

    const newUser: User = {
      id: `usr_${Date.now()}`,
      email: data.email.toLowerCase().trim(),
      name: data.name.trim(),
      role: data.role || 'admin',
      password: data.password || 'admin123',
      avatarUrl: '/src/assets/images/admin_avatar_1790137823737.jpg',
    };

    this.users.push(newUser);
    this.saveUsers();
    return newUser;
  }

  public authenticateUser(email: string, password: string): User | null {
    const user = this.getUserByEmail(email);
    if (!user) return null;
    if (user.password && user.password === password) {
      return user;
    }
    // Also support default admin123
    if (password === 'admin123') {
      return user;
    }
    return null;
  }

  // --- Analytics ---
  public getAnalytics() {
    const total = this.leads.length;
    const newLeads = this.leads.filter((l) => l.status === 'new').length;
    const contactedLeads = this.leads.filter((l) => l.status === 'contacted' || l.status === 'in_progress').length;
    const convertedLeads = this.leads.filter((l) => l.status === 'converted').length;
    const lostLeads = this.leads.filter((l) => l.status === 'lost').length;

    const conversionRate = total > 0 ? Math.round((convertedLeads / total) * 100) : 0;
    const contactedRate = total > 0 ? Math.round(((contactedLeads + convertedLeads) / total) * 100) : 0;

    const totalPipelineValue = this.leads.reduce((acc, l) => acc + (l.estimatedValue || 0), 0);
    const convertedPipelineValue = this.leads
      .filter((l) => l.status === 'converted')
      .reduce((acc, l) => acc + (l.estimatedValue || 0), 0);

    // Source breakdown
    const sourceMap: Record<string, number> = {};
    for (const l of this.leads) {
      sourceMap[l.source] = (sourceMap[l.source] || 0) + 1;
    }

    const leadsBySource = Object.entries(sourceMap).map(([source, count]) => ({
      source,
      count,
      percentage: total > 0 ? Math.round((count / total) * 100) : 0,
    }));

    // Status breakdown
    const leadsByStatus = [
      { status: 'new' as const, count: newLeads, label: 'New / Uncontacted' },
      { status: 'contacted' as const, count: this.leads.filter((l) => l.status === 'contacted').length, label: 'Contacted' },
      { status: 'in_progress' as const, count: this.leads.filter((l) => l.status === 'in_progress').length, label: 'In Negotiation' },
      { status: 'converted' as const, count: convertedLeads, label: 'Converted Client' },
      { status: 'lost' as const, count: lostLeads, label: 'Lost / Closed' },
    ];

    // Recent activities (flatten last 15 timeline events across leads)
    const allActivities: Array<{ leadId: string; leadName: string; event: any }> = [];
    for (const l of this.leads) {
      for (const ev of l.timeline) {
        allActivities.push({
          leadId: l.id,
          leadName: l.name,
          event: ev,
        });
      }
    }
    allActivities.sort((a, b) => new Date(b.event.timestamp).getTime() - new Date(a.event.timestamp).getTime());

    return {
      totalLeads: total,
      newLeads,
      contactedLeads,
      convertedLeads,
      lostLeads,
      conversionRate,
      contactedRate,
      totalPipelineValue,
      convertedPipelineValue,
      leadsBySource,
      leadsByStatus,
      recentActivities: allActivities.slice(0, 10),
    };
  }
}

export const db = new Database();
