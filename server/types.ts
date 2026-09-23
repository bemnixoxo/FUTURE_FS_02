export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'lost';

export type LeadPriority = 'low' | 'medium' | 'high';

export interface FollowUpNote {
  id: string;
  author: string;
  content: string;
  category: 'general' | 'call' | 'email' | 'meeting' | 'proposal';
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  type: 'created' | 'status_change' | 'note_added' | 'contacted';
  description: string;
  timestamp: string;
  actor?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  source: string; // e.g. "Website Contact Form", "Landing Page", "Referral", "Pricing Calculator"
  serviceInterested?: string; // e.g. "Web Development", "UI/UX Redesign", "Mobile App"
  budget?: string; // e.g. "$5,000 - $10,000"
  estimatedValue?: number; // e.g. 7500
  message: string;
  status: LeadStatus;
  priority: LeadPriority;
  assignedTo?: string;
  notes: FollowUpNote[];
  timeline: TimelineEvent[];
  createdAt: string;
  updatedAt: string;
  lastContactedAt?: string;
  convertedAt?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
  avatarUrl?: string;
  password?: string;
}

export interface AnalyticsSummary {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  lostLeads: number;
  conversionRate: number; // percentage
  contactedRate: number; // percentage
  totalPipelineValue: number;
  convertedPipelineValue: number;
  leadsBySource: { source: string; count: number; percentage: number }[];
  leadsByStatus: { status: LeadStatus; count: number; label: string }[];
  recentActivity: TimelineEvent[];
}
