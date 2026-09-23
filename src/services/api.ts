import { Lead, AnalyticsData, User, LeadStatus } from '../types/crm';

const API_BASE = '/api';

export const api = {
  // Leads
  async getLeads(params?: {
    status?: string;
    search?: string;
    source?: string;
    sortBy?: string;
  }): Promise<Lead[]> {
    const searchParams = new URLSearchParams();
    if (params?.status) searchParams.set('status', params.status);
    if (params?.search) searchParams.set('search', params.search);
    if (params?.source) searchParams.set('source', params.source);
    if (params?.sortBy) searchParams.set('sortBy', params.sortBy);

    const res = await fetch(`${API_BASE}/leads?${searchParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch leads');
    const json = await res.json();
    return json.data || [];
  },

  async getLead(id: string): Promise<Lead> {
    const res = await fetch(`${API_BASE}/leads/${id}`);
    if (!res.ok) throw new Error('Lead not found');
    const json = await res.json();
    return json.data;
  },

  async createLead(data: {
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
  }): Promise<Lead> {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to submit lead');
    }
    return json.data;
  },

  async updateLead(
    id: string,
    updates: Partial<Lead>,
    adminName = 'Sarah Jenkins'
  ): Promise<Lead> {
    const res = await fetch(`${API_BASE}/leads/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-name': adminName,
      },
      body: JSON.stringify(updates),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to update lead');
    }
    return json.data;
  },

  async addNote(
    leadId: string,
    content: string,
    category: 'general' | 'call' | 'email' | 'meeting' | 'proposal' = 'general',
    adminName = 'Sarah Jenkins'
  ): Promise<Lead> {
    const res = await fetch(`${API_BASE}/leads/${leadId}/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-name': adminName,
      },
      body: JSON.stringify({ content, category }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to add note');
    }
    return json.data;
  },

  async deleteLead(id: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/leads/${id}`, {
      method: 'DELETE',
    });
    const json = await res.json();
    return json.success;
  },

  async batchUpdateStatus(
    leadIds: string[],
    status: LeadStatus,
    adminName = 'Sarah Jenkins'
  ): Promise<number> {
    const res = await fetch(`${API_BASE}/leads/batch/update-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-admin-name': adminName,
      },
      body: JSON.stringify({ leadIds, status }),
    });
    const json = await res.json();
    return json.updatedCount || 0;
  },

  async resetSeedData(): Promise<void> {
    const res = await fetch(`${API_BASE}/leads/reset/seed`, {
      method: 'POST',
    });
    if (!res.ok) throw new Error('Failed to reset dataset');
  },

  // Analytics
  async getAnalytics(): Promise<AnalyticsData> {
    const res = await fetch(`${API_BASE}/analytics`);
    if (!res.ok) throw new Error('Failed to fetch analytics');
    const json = await res.json();
    return json.data;
  },

  // Auth
  async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Invalid credentials');
    }
    return { user: json.user, token: json.token };
  },

  async register(data: { name: string; email: string; password: string }): Promise<{ user: User; token: string }> {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Registration failed');
    }
    return { user: json.user, token: json.token };
  },

  async logout(): Promise<void> {
    await fetch(`${API_BASE}/auth/logout`, {
      method: 'POST',
    });
  },

  async getCurrentUser(): Promise<User> {
    const res = await fetch(`${API_BASE}/auth/me`);
    const json = await res.json();
    return json.user;
  },
};
