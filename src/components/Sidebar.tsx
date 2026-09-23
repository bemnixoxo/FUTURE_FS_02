import React, { useState } from 'react';
import {
  LayoutDashboard,
  BarChart3,
  Globe,
  Code2,
  BookOpen,
  LogOut,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  FileCheck,
} from 'lucide-react';
import { ViewTab, User } from '../types/crm';
import { ComplianceModal } from './ComplianceModal';

interface SidebarProps {
  currentTab: ViewTab;
  onSelectTab: (tab: ViewTab) => void;
  newLeadsCount: number;
  user: User | null;
  onLogout: () => void;
  onResetData: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  newLeadsCount,
  user,
  onLogout,
  onResetData,
}) => {
  const [showComplianceModal, setShowComplianceModal] = useState(false);

  const navItems: { id: ViewTab; label: string; icon: React.ComponentType<{ className?: string }>; badge?: number }[] = [
    {
      id: 'pipeline',
      label: 'Leads & Pipeline',
      icon: LayoutDashboard,
      badge: newLeadsCount > 0 ? newLeadsCount : undefined,
    },
    {
      id: 'analytics',
      label: 'Conversion & Metrics',
      icon: BarChart3,
    },
    {
      id: 'form-simulator',
      label: 'Live Website Form',
      icon: Globe,
    },
    {
      id: 'embed-api',
      label: 'Embed & API Webhook',
      icon: Code2,
    },
    {
      id: 'docs',
      label: 'System Architecture',
      icon: BookOpen,
    },
  ];

  return (
    <aside className="w-64 shrink-0 bg-neutral-900 text-neutral-300 flex flex-col border-r border-neutral-800 select-none">
      {/* Brand Header */}
      <div className="h-16 px-5 flex items-center justify-between border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white text-neutral-950 font-bold flex items-center justify-center text-sm shadow-sm">
            A
          </div>
          <div>
            <div className="text-sm font-semibold text-white tracking-tight">ApexCRM</div>
            <div className="text-[11px] text-neutral-400 font-mono">Mini CRM v1.0</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 px-3 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
          Core Workflows
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                isActive
                  ? 'bg-neutral-800 text-white font-semibold shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className="text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                  {item.badge} new
                </span>
              )}
            </button>
          );
        })}

        <div className="pt-6 px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-neutral-500">
          Quick Actions
        </div>
        <button
          onClick={onResetData}
          title="Reset database to default seed leads"
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/50 rounded-lg transition-colors"
        >
          <RotateCcw className="w-4 h-4 shrink-0 text-neutral-400" />
          <span>Reset Sample Leads</span>
        </button>
      </div>

      {/* System Status & Compliance Info */}
      <div className="p-3 mx-3 mb-3 rounded-lg bg-neutral-850 border border-neutral-800 text-[11px] space-y-2">
        <div className="flex items-center justify-between text-neutral-300 font-medium">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Publishing Status</span>
          </div>
          <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold px-1.5 py-0.5 rounded">
            Verified
          </span>
        </div>
        <p className="text-neutral-400 text-[10px] leading-relaxed">
          Enforcing <strong>No Reserved or Prohibited Terms</strong> across all lead ingestion channels.
        </p>
        <button
          type="button"
          onClick={() => setShowComplianceModal(true)}
          className="w-full text-left text-neutral-300 hover:text-white font-medium text-[10px] underline decoration-neutral-600 transition-colors flex items-center gap-1 pt-0.5"
        >
          <FileCheck className="w-3 h-3 text-emerald-400" />
          <span>View Compliance Policy</span>
        </button>
      </div>

      {/* User Profile Footer */}
      <div className="p-3 border-t border-neutral-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <img
            src={user?.avatarUrl || '/src/assets/images/admin_avatar_1790137823737.jpg'}
            alt="Sarah Jenkins"
            referrerPolicy="no-referrer"
            className="w-8 h-8 rounded-full object-cover border border-neutral-700 bg-neutral-800 shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="%23aaa" stroke-width="2"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
            }}
          />
          <div className="min-w-0">
            <div className="text-xs font-semibold text-white truncate">
              {user?.name || 'Sarah Jenkins'}
            </div>
            <div className="text-[11px] text-neutral-400 truncate">
              {user?.role === 'admin' ? 'Agency Admin' : 'Manager'}
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          title="Sign out"
          className="p-1.5 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>

      {/* Compliance Policy Modal */}
      <ComplianceModal
        isOpen={showComplianceModal}
        onClose={() => setShowComplianceModal(false)}
      />
    </aside>
  );
};
