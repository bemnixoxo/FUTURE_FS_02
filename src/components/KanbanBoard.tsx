import React from 'react';
import {
  MessageSquare,
  DollarSign,
  ArrowRight,
  Clock,
  Phone,
  Mail,
  Building,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  Archive,
} from 'lucide-react';
import { Lead, LeadStatus } from '../types/crm';

interface KanbanBoardProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onQuickAddNote: (lead: Lead) => void;
}

const COLUMNS: {
  id: LeadStatus;
  title: string;
  description: string;
  badgeColor: string;
}[] = [
  {
    id: 'new',
    title: 'New Inbound',
    description: 'Requires response within 2 hours',
    badgeColor: 'text-amber-700 bg-amber-50 border-amber-200',
  },
  {
    id: 'contacted',
    title: 'Contacted',
    description: 'Initial discovery in progress',
    badgeColor: 'text-sky-700 bg-sky-50 border-sky-200',
  },
  {
    id: 'in_progress',
    title: 'In Negotiation',
    description: 'Proposal or SOW under review',
    badgeColor: 'text-indigo-700 bg-indigo-50 border-indigo-200',
  },
  {
    id: 'converted',
    title: 'Converted Clients',
    description: 'Contract signed & onboarded',
    badgeColor: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  },
  {
    id: 'lost',
    title: 'Archived / Lost',
    description: 'Passed or budget mismatch',
    badgeColor: 'text-neutral-600 bg-neutral-100 border-neutral-200',
  },
];

function formatTimeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const minutes = Math.floor(diff / (60 * 1000));
  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export const KanbanBoard: React.FC<KanbanBoardProps> = ({
  leads,
  onSelectLead,
  onUpdateStatus,
  onQuickAddNote,
}) => {
  return (
    <div className="flex-1 overflow-x-auto p-6 bg-neutral-100/60">
      <div className="flex items-start gap-4 min-w-[1240px]">
        {COLUMNS.map((col) => {
          const colLeads = leads.filter((l) => l.status === col.id);
          const colValue = colLeads.reduce((acc, l) => acc + (l.estimatedValue || 0), 0);

          return (
            <div
              key={col.id}
              className="w-80 shrink-0 flex flex-col max-h-[calc(100vh-140px)] bg-neutral-200/40 border border-neutral-200 rounded-xl"
            >
              {/* Column Header */}
              <div className="p-3.5 border-b border-neutral-200/80 bg-white/70 rounded-t-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-semibold text-neutral-900 tracking-tight">
                      {col.title}
                    </h3>
                    <span className="text-[11px] font-mono tabular-nums text-neutral-500 font-medium">
                      ({colLeads.length})
                    </span>
                  </div>
                  {colValue > 0 && (
                    <span className="text-[11px] font-mono tabular-nums text-neutral-600 font-medium">
                      ${colValue.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-neutral-500 truncate mt-0.5">
                  {col.description}
                </div>
              </div>

              {/* Cards Container */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
                {colLeads.length === 0 ? (
                  <div className="py-8 text-center border border-dashed border-neutral-300 rounded-lg bg-white/40">
                    <p className="text-xs text-neutral-400">No leads in this stage</p>
                  </div>
                ) : (
                  colLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => onSelectLead(lead)}
                      className="group bg-white border border-neutral-200/80 hover:border-neutral-300 rounded-lg p-3.5 shadow-2xs hover:shadow-xs transition-all cursor-pointer relative"
                    >
                      {/* Lead Title & Meta */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h4 className="text-xs font-semibold text-neutral-900 group-hover:text-blue-600 transition-colors truncate">
                            {lead.name}
                          </h4>
                          {lead.company && (
                            <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5 truncate">
                              <Building className="w-3 h-3 shrink-0 text-neutral-400" />
                              <span className="truncate">{lead.company}</span>
                            </div>
                          )}
                        </div>

                        {/* Priority indicator */}
                        {lead.priority === 'high' && (
                          <span className="text-[10px] font-mono uppercase tracking-wide text-rose-600 font-semibold shrink-0">
                            High
                          </span>
                        )}
                      </div>

                      {/* Inquiry Snippet */}
                      <p className="text-xs text-neutral-600 line-clamp-2 mt-2 leading-relaxed">
                        {lead.message}
                      </p>

                      {/* Service & Budget unboxed metadata */}
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500 mt-2.5 pt-2 border-t border-neutral-100">
                        <span className="truncate max-w-[120px] text-neutral-700 font-medium">
                          {lead.serviceInterested || 'Inquiry'}
                        </span>
                        <span aria-hidden="true" className="text-neutral-300">·</span>
                        <span className="font-mono tabular-nums text-neutral-900 font-medium">
                          ${(lead.estimatedValue || 0).toLocaleString()}
                        </span>
                      </div>

                      {/* Footer: Source, Time, and Notes count */}
                      <div className="flex items-center justify-between text-[11px] text-neutral-400 mt-2">
                        <div className="flex items-center gap-1 truncate max-w-[160px]">
                          <span className="truncate">{lead.source}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono tabular-nums">{formatTimeAgo(lead.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {lead.notes.length > 0 && (
                            <div className="flex items-center gap-1 text-neutral-500">
                              <MessageSquare className="w-3 h-3" />
                              <span className="font-mono tabular-nums text-[10px]">{lead.notes.length}</span>
                            </div>
                          )}

                          {/* Quick stage transition button */}
                          {col.id === 'new' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateStatus(lead.id, 'contacted');
                              }}
                              title="Mark as Contacted"
                              className="px-2 py-0.5 text-[10px] font-medium text-sky-700 bg-sky-50 hover:bg-sky-100 rounded border border-sky-200 transition-colors"
                            >
                              Contacted →
                            </button>
                          )}
                          {col.id === 'contacted' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateStatus(lead.id, 'in_progress');
                              }}
                              title="Advance to In Progress"
                              className="px-2 py-0.5 text-[10px] font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded border border-indigo-200 transition-colors"
                            >
                              Proposal →
                            </button>
                          )}
                          {col.id === 'in_progress' && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onUpdateStatus(lead.id, 'converted');
                              }}
                              title="Convert to Won Client"
                              className="px-2 py-0.5 text-[10px] font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded border border-emerald-200 transition-colors"
                            >
                              Convert ✓
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
