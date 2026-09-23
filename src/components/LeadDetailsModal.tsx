import React, { useState } from 'react';
import {
  X,
  Mail,
  Phone,
  Building,
  DollarSign,
  Calendar,
  MessageSquare,
  Clock,
  Send,
  Trash2,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  ExternalLink,
} from 'lucide-react';
import { Lead, LeadStatus, FollowUpNote } from '../types/crm';

interface LeadDetailsModalProps {
  lead: Lead;
  onClose: () => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onAddNote: (
    leadId: string,
    content: string,
    category: 'general' | 'call' | 'email' | 'meeting' | 'proposal'
  ) => void;
  onDeleteLead: (leadId: string) => void;
  onUpdateDetails: (leadId: string, updates: Partial<Lead>) => void;
}

export const LeadDetailsModal: React.FC<LeadDetailsModalProps> = ({
  lead,
  onClose,
  onUpdateStatus,
  onAddNote,
  onDeleteLead,
  onUpdateDetails,
}) => {
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState<'general' | 'call' | 'email' | 'meeting' | 'proposal'>('call');
  const [isEditingValue, setIsEditingValue] = useState(false);
  const [estValue, setEstValue] = useState(lead.estimatedValue || 0);

  const handleAddNoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteContent.trim()) return;
    onAddNote(lead.id, noteContent, noteCategory);
    setNoteContent('');
  };

  const handleSaveValue = () => {
    onUpdateDetails(lead.id, { estimatedValue: Number(estValue) });
    setIsEditingValue(false);
  };

  const steps: { status: LeadStatus; label: string }[] = [
    { status: 'new', label: '1. New Inbound' },
    { status: 'contacted', label: '2. Contacted' },
    { status: 'in_progress', label: '3. Proposal' },
    { status: 'converted', label: '4. Converted Client' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-neutral-900 text-white flex items-center justify-center font-bold text-sm">
              {lead.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-semibold text-neutral-900">{lead.name}</h2>
                <span className="text-xs text-neutral-400 font-mono">#{lead.id}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-neutral-500 mt-0.5">
                {lead.company ? <span>{lead.company}</span> : <span>Independent Client</span>}
                <span aria-hidden="true">·</span>
                <span>Source: {lead.source}</span>
                <span aria-hidden="true">·</span>
                <span className="font-mono tabular-nums">
                  Received {new Date(lead.createdAt).toLocaleDateString()} {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (window.confirm(`Are you sure you want to delete lead ${lead.name}?`)) {
                  onDeleteLead(lead.id);
                  onClose();
                }
              }}
              title="Delete Lead"
              className="p-2 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Pipeline Stepper */}
        <div className="px-6 py-3 bg-neutral-100/60 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-1">
            {steps.map((st, i) => {
              const isActive = lead.status === st.status;
              const isPast =
                (lead.status === 'contacted' && st.status === 'new') ||
                (lead.status === 'in_progress' && (st.status === 'new' || st.status === 'contacted')) ||
                (lead.status === 'converted' && st.status !== 'converted');

              return (
                <button
                  key={st.status}
                  onClick={() => onUpdateStatus(lead.id, st.status)}
                  className={`flex-1 py-1.5 px-3 text-xs font-medium rounded-md border text-center transition-all ${
                    isActive
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                      : isPast
                      ? 'bg-neutral-200 text-neutral-700 border-neutral-300'
                      : 'bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onUpdateStatus(lead.id, lead.status === 'lost' ? 'new' : 'lost')}
            className={`ml-3 px-3 py-1.5 text-xs font-medium rounded-md border transition-colors ${
              lead.status === 'lost'
                ? 'bg-rose-100 text-rose-800 border-rose-200 font-semibold'
                : 'text-neutral-500 border-neutral-200 hover:text-rose-600 hover:border-rose-200 bg-white'
            }`}
          >
            {lead.status === 'lost' ? 'Archived / Lost' : 'Mark as Lost'}
          </button>
        </div>

        {/* Body Content - 2 Column Layout */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 md:grid-cols-12 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          {/* Left Column: Lead Information & Original Message (5 cols) */}
          <div className="md:col-span-5 p-6 space-y-5 bg-neutral-50/30">
            {/* Quick Contact Actions */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Direct Contact
              </div>
              <div className="space-y-2">
                <a
                  href={`mailto:${lead.email}?subject=Regarding your project inquiry at ${lead.company || 'Apex Studio'}`}
                  className="flex items-center justify-between p-2.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-lg text-xs text-neutral-800 hover:bg-neutral-50 transition-colors group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Mail className="w-3.5 h-3.5 text-neutral-400 group-hover:text-blue-600" />
                    <span className="truncate font-mono">{lead.email}</span>
                  </div>
                  <span className="text-[11px] text-blue-600 font-medium shrink-0">Email →</span>
                </a>

                {lead.phone ? (
                  <a
                    href={`tel:${lead.phone}`}
                    className="flex items-center justify-between p-2.5 bg-white border border-neutral-200 hover:border-neutral-300 rounded-lg text-xs text-neutral-800 hover:bg-neutral-50 transition-colors group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <Phone className="w-3.5 h-3.5 text-neutral-400 group-hover:text-emerald-600" />
                      <span className="truncate font-mono">{lead.phone}</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-medium shrink-0">Call →</span>
                  </a>
                ) : (
                  <div className="p-2.5 bg-white border border-neutral-200 rounded-lg text-xs text-neutral-400 flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-neutral-300" />
                    <span>No phone provided</span>
                  </div>
                )}
              </div>
            </div>

            {/* Scope & Deal Value */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Scope & Deal Value
              </div>
              <div className="bg-white border border-neutral-200 rounded-lg p-3 space-y-2.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Service:</span>
                  <span className="font-semibold text-neutral-900 text-right">
                    {lead.serviceInterested || 'General Inquiry'}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-500">Client Budget:</span>
                  <span className="font-mono text-neutral-700">{lead.budget || 'Not specified'}</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                  <span className="text-neutral-500">Estimated Value:</span>
                  {isEditingValue ? (
                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        value={estValue}
                        onChange={(e) => setEstValue(Number(e.target.value))}
                        className="w-24 px-2 py-0.5 text-xs border rounded font-mono"
                      />
                      <button
                        onClick={handleSaveValue}
                        className="px-2 py-0.5 bg-neutral-900 text-white rounded text-xs"
                      >
                        Save
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <span className="font-semibold font-mono text-neutral-900">
                        ${(lead.estimatedValue || 0).toLocaleString()}
                      </span>
                      <button
                        onClick={() => setIsEditingValue(true)}
                        className="text-[10px] text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Original Inbound Message */}
            <div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 mb-2">
                Website Form Message
              </div>
              <div className="bg-white border border-neutral-200 rounded-lg p-3 text-xs leading-relaxed text-neutral-800 whitespace-pre-wrap">
                {lead.message}
              </div>
            </div>
          </div>

          {/* Right Column: Follow-up Notes & Activity Timeline (7 cols) */}
          <div className="md:col-span-7 p-6 flex flex-col space-y-5">
            {/* Add Note Form */}
            <form onSubmit={handleAddNoteSubmit} className="space-y-3 bg-neutral-50 border border-neutral-200 rounded-lg p-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-neutral-900">Record Follow-up Activity</span>
                <select
                  value={noteCategory}
                  onChange={(e) => setNoteCategory(e.target.value as any)}
                  aria-label="Follow-up activity category"
                  className="text-xs py-1 px-2 border border-neutral-200 rounded-md bg-white text-neutral-700 cursor-pointer"
                >
                  <option value="call">📞 Phone Call</option>
                  <option value="email">✉️ Email Follow-Up</option>
                  <option value="meeting">📅 Meeting Summary</option>
                  <option value="proposal">📄 Proposal / Quote</option>
                  <option value="general">📝 General Note</option>
                </select>
              </div>

              <textarea
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="Log follow-up details (e.g., 'Called David. Scheduled demo for Thursday 2pm. Budget confirmed at $20k')..."
                rows={3}
                className="w-full p-2.5 text-xs bg-white border border-neutral-200 rounded-md text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!noteContent.trim()}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white rounded-md text-xs font-semibold transition-colors"
                >
                  <Send className="w-3 h-3" />
                  <span>Save Note</span>
                </button>
              </div>
            </form>

            {/* Timeline & Notes Stream */}
            <div className="flex-1 space-y-3 overflow-y-auto max-h-[380px] pr-1">
              <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                Timeline & History
              </div>

              {lead.notes.length === 0 && lead.timeline.length <= 1 ? (
                <div className="p-4 text-center border border-dashed border-neutral-200 rounded-lg text-xs text-neutral-400">
                  No follow-up notes logged yet. Add your first note above!
                </div>
              ) : null}

              {/* Display Follow-up Notes First */}
              {lead.notes.map((note) => (
                <div
                  key={note.id}
                  className="p-3 bg-white border border-neutral-200 rounded-lg text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="font-semibold text-neutral-700 capitalize">
                      {note.category === 'call' && '📞 Phone Call'}
                      {note.category === 'email' && '✉️ Email Follow-Up'}
                      {note.category === 'meeting' && '📅 Meeting'}
                      {note.category === 'proposal' && '📄 Proposal'}
                      {note.category === 'general' && '📝 Note'}
                      {' · '}
                      <span className="font-normal text-neutral-500">{note.author}</span>
                    </span>
                    <span className="font-mono tabular-nums">
                      {new Date(note.createdAt).toLocaleDateString()} {new Date(note.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-neutral-800 leading-relaxed whitespace-pre-wrap">
                    {note.content}
                  </p>
                </div>
              ))}

              {/* Audit Timeline */}
              {lead.timeline.map((evt) => (
                <div
                  key={evt.id}
                  className="flex items-start gap-2.5 text-[11px] text-neutral-500 py-1 px-2 rounded hover:bg-neutral-50"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                  <div className="flex-1 flex items-center justify-between gap-2">
                    <span className="text-neutral-600">{evt.description}</span>
                    <span className="font-mono tabular-nums text-neutral-400 shrink-0">
                      {new Date(evt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
