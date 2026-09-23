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
  source: string;
  serviceInterested?: string;
  budget?: string;
  estimatedValue?: number;
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
}

export interface AnalyticsData {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
  convertedLeads: number;
  lostLeads: number;
  conversionRate: number;
  contactedRate: number;
  totalPipelineValue: number;
  convertedPipelineValue: number;
  leadsBySource: { source: string; count: number; percentage: number }[];
  leadsByStatus: { status: LeadStatus; count: number; label: string }[];
  recentActivities: { leadId: string; leadName: string; event: TimelineEvent }[];
}

export type ViewTab = 'pipeline' | 'analytics' | 'form-simulator' | 'embed-api' | 'docs';
export type DisplayMode = 'kanban' | 'table';
