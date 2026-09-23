/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { KanbanBoard } from './components/KanbanBoard';
import { TableView } from './components/TableView';
import { LeadDetailsModal } from './components/LeadDetailsModal';
import { NewLeadModal } from './components/NewLeadModal';
import { WebsiteFormSimulator } from './components/WebsiteFormSimulator';
import { EmbedGuideView } from './components/EmbedGuideView';
import { AnalyticsView } from './components/AnalyticsView';
import { DocsView } from './components/DocsView';
import { AuthModal } from './components/AuthModal';
import { Lead, AnalyticsData, User, ViewTab, DisplayMode, LeadStatus } from './types/crm';
import { api } from './services/api';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('apexcrm_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [currentTab, setCurrentTab] = useState<ViewTab>('pipeline');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('kanban');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  const loadData = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const [leadsData, analyticsData] = await Promise.all([
        api.getLeads({
          status: statusFilter,
          search: searchQuery,
        }),
        api.getAnalytics(),
      ]);
      setLeads(leadsData);
      setAnalytics(analyticsData);
    } catch (err) {
      console.error('Failed to load CRM data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [user, statusFilter, searchQuery]);

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user, loadData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await loadData();
    showToast('CRM data refreshed');
  };

  const handleUpdateStatus = async (leadId: string, status: LeadStatus) => {
    try {
      const updated = await api.updateLead(leadId, { status }, user?.name);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(updated);
      }
      showToast(`Status updated to "${status}"`);
      api.getAnalytics().then(setAnalytics).catch(console.error);
    } catch (err: any) {
      console.error('Update failed:', err);
    }
  };

  const handleAddNote = async (
    leadId: string,
    content: string,
    category: 'general' | 'call' | 'email' | 'meeting' | 'proposal'
  ) => {
    try {
      const updated = await api.addNote(leadId, content, category, user?.name);
      setLeads((prev) => prev.map((l) => (l.id === leadId ? updated : l)));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(updated);
      }
      showToast('Follow-up note saved');
      api.getAnalytics().then(setAnalytics).catch(console.error);
    } catch (err: any) {
      console.error('Add note failed:', err);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      await api.deleteLead(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead && selectedLead.id === leadId) {
        setSelectedLead(null);
      }
      showToast('Lead deleted');
      api.getAnalytics().then(setAnalytics).catch(console.error);
    } catch (err: any) {
      console.error('Delete failed:', err);
    }
  };

  const handleBatchUpdateStatus = async (leadIds: string[], status: LeadStatus) => {
    try {
      await api.batchUpdateStatus(leadIds, status, user?.name);
      showToast(`Updated ${leadIds.length} leads to "${status}"`);
      loadData();
    } catch (err: any) {
      console.error('Batch update failed:', err);
    }
  };

  const handleCreateLead = async (data: any) => {
    const created = await api.createLead(data);
    setLeads((prev) => [created, ...prev]);
    showToast(`Lead added for ${created.name}`);
    api.getAnalytics().then(setAnalytics).catch(console.error);
  };

  const handleResetData = async () => {
    if (window.confirm('Reset all leads to original demonstration dataset?')) {
      await api.resetSeedData();
      await loadData();
      showToast('Database reset to default sample dataset');
    }
  };

  const handleLoginSuccess = (loggedInUser: User, token: string) => {
    setUser(loggedInUser);
    localStorage.setItem('apexcrm_user', JSON.stringify(loggedInUser));
    localStorage.setItem('apexcrm_token', token);
    showToast(`Welcome back, ${loggedInUser.name}`);
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setUser(null);
    localStorage.removeItem('apexcrm_user');
    localStorage.removeItem('apexcrm_token');
    showToast('Signed out of ApexCRM');
  };

  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  // Unauthenticated State -> Show Authentication Screen
  if (!user) {
    return (
      <div className="relative h-screen w-screen bg-neutral-950 flex flex-col justify-center items-center overflow-hidden">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-lg shadow-xl border border-neutral-700 animate-in slide-in-from-top-2 duration-150">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        <AuthModal onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  // Authenticated State -> CRM Dashboard
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white text-neutral-900 font-sans">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 bg-neutral-900 text-white text-xs font-medium rounded-lg shadow-xl border border-neutral-700 animate-in slide-in-from-bottom-2 duration-150">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        newLeadsCount={newLeadsCount}
        user={user}
        onLogout={handleLogout}
        onResetData={handleResetData}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden bg-neutral-50/50">
        <Navbar
          currentTab={currentTab}
          displayMode={displayMode}
          onToggleDisplayMode={setDisplayMode}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          onOpenNewLead={() => setIsNewLeadOpen(true)}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          totalLeads={leads.length}
          user={user}
          onLogout={handleLogout}
        />

        {/* Tab Content Views */}
        {currentTab === 'pipeline' && (
          <>
            {isLoading ? (
              <div className="flex-1 flex items-center justify-center text-xs text-neutral-400">
                Loading leads pipeline...
              </div>
            ) : displayMode === 'kanban' ? (
              <KanbanBoard
                leads={leads}
                onSelectLead={(lead) => setSelectedLead(lead)}
                onUpdateStatus={handleUpdateStatus}
                onQuickAddNote={(lead) => setSelectedLead(lead)}
              />
            ) : (
              <TableView
                leads={leads}
                onSelectLead={(lead) => setSelectedLead(lead)}
                onUpdateStatus={handleUpdateStatus}
                onBatchUpdateStatus={handleBatchUpdateStatus}
                onDeleteLead={handleDeleteLead}
              />
            )}
          </>
        )}

        {currentTab === 'analytics' && (
          <AnalyticsView analytics={analytics} isLoading={isLoading} />
        )}

        {currentTab === 'form-simulator' && (
          <WebsiteFormSimulator
            onLeadSubmitted={(newLead) => {
              setLeads((prev) => [newLead, ...prev]);
              showToast(`New website lead captured: ${newLead.name}`);
              api.getAnalytics().then(setAnalytics).catch(console.error);
            }}
            onGoToPipeline={() => setCurrentTab('pipeline')}
          />
        )}

        {currentTab === 'embed-api' && <EmbedGuideView />}

        {currentTab === 'docs' && <DocsView />}
      </div>

      {/* Lead Details Modal / Drawer */}
      {selectedLead && (
        <LeadDetailsModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdateStatus={handleUpdateStatus}
          onAddNote={handleAddNote}
          onDeleteLead={handleDeleteLead}
          onUpdateDetails={(id, updates) => {
            api.updateLead(id, updates).then((updated) => {
              setLeads((prev) => prev.map((l) => (l.id === id ? updated : l)));
              setSelectedLead(updated);
              showToast('Lead details updated');
            });
          }}
        />
      )}

      {/* Add New Lead Modal */}
      {isNewLeadOpen && (
        <NewLeadModal
          onClose={() => setIsNewLeadOpen(false)}
          onSubmit={handleCreateLead}
        />
      )}
    </div>
  );
}
