import React, { useState } from 'react';
import {
  Building,
  Mail,
  Phone,
  MessageSquare,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import { Lead, LeadStatus } from '../types/crm';

interface TableViewProps {
  leads: Lead[];
  onSelectLead: (lead: Lead) => void;
  onUpdateStatus: (leadId: string, status: LeadStatus) => void;
  onBatchUpdateStatus: (leadIds: string[], status: LeadStatus) => void;
  onDeleteLead: (leadId: string) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  leads,
  onSelectLead,
  onUpdateStatus,
  onBatchUpdateStatus,
  onDeleteLead,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(leads.map((l) => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBatch = (status: LeadStatus) => {
    if (selectedIds.length === 0) return;
    onBatchUpdateStatus(selectedIds, status);
    setSelectedIds([]);
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Batch Actions Bar (Visible when rows are selected) */}
      {selectedIds.length > 0 && (
        <div className="px-6 py-2.5 bg-neutral-900 text-white flex items-center justify-between text-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <span className="font-semibold font-mono tabular-nums">{selectedIds.length}</span>
            <span className="text-neutral-300">leads selected</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBatch('contacted')}
              className="px-2.5 py-1 text-xs font-medium bg-neutral-800 hover:bg-neutral-700 text-white rounded transition-colors"
            >
              Mark Contacted
            </button>
            <button
              onClick={() => handleBatch('converted')}
              className="px-2.5 py-1 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded transition-colors"
            >
              Mark Converted
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="px-2.5 py-1 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* High-Density Data Grid */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead className="bg-neutral-50/80 sticky top-0 border-b border-neutral-200 z-10 text-[11px] font-medium text-neutral-500 uppercase tracking-wider">
            <tr>
              <th className="py-2.5 px-4 w-10">
                <input
                  type="checkbox"
                  aria-label="Select all leads"
                  checked={selectedIds.length > 0 && selectedIds.length === leads.length}
                  onChange={handleSelectAll}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                />
              </th>
              <th className="py-2.5 px-4 font-semibold text-neutral-700">Lead & Company</th>
              <th className="py-2.5 px-4 font-semibold text-neutral-700">Contact</th>
              <th className="py-2.5 px-4 font-semibold text-neutral-700">Service Inquiry</th>
              <th className="py-2.5 px-4 font-semibold text-neutral-700">Source</th>
              <th className="py-2.5 px-4 font-semibold text-neutral-700">Pipeline Status</th>
              <th className="py-2.5 px-4 text-right font-semibold text-neutral-700">Value</th>
              <th className="py-2.5 px-4 text-right font-semibold text-neutral-700">Received</th>
              <th className="py-2.5 px-4 text-right font-semibold text-neutral-700 w-24">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {leads.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-neutral-400">
                  No matching leads found.
                </td>
              </tr>
            ) : (
              leads.map((lead) => {
                const isSelected = selectedIds.includes(lead.id);
                return (
                  <tr
                    key={lead.id}
                    onClick={() => onSelectLead(lead)}
                    className={`hover:bg-neutral-50/80 cursor-pointer transition-colors ${
                      isSelected ? 'bg-neutral-50' : ''
                    }`}
                  >
                    <td
                      className="py-3 px-4"
                      onClick={(e) => handleToggleOne(lead.id, e)}
                    >
                      <input
                        type="checkbox"
                        aria-label={`Select lead ${lead.name}`}
                        checked={isSelected}
                        onChange={() => {}}
                        className="rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900 cursor-pointer"
                      />
                    </td>

                    {/* Lead & Company */}
                    <td className="py-3 px-4 min-w-[200px]">
                      <div className="font-semibold text-neutral-900 hover:text-blue-600 transition-colors">
                        {lead.name}
                      </div>
                      {lead.company ? (
                        <div className="text-[11px] text-neutral-500 flex items-center gap-1 mt-0.5">
                          <Building className="w-3 h-3 text-neutral-400" />
                          <span>{lead.company}</span>
                        </div>
                      ) : (
                        <div className="text-[11px] text-neutral-400">Independent inquiry</div>
                      )}
                    </td>

                    {/* Contact */}
                    <td className="py-3 px-4 min-w-[180px]">
                      <div className="text-neutral-700 font-mono text-[11px] truncate">{lead.email}</div>
                      {lead.phone && (
                        <div className="text-[11px] text-neutral-500 font-mono tabular-nums mt-0.5">
                          {lead.phone}
                        </div>
                      )}
                    </td>

                    {/* Service */}
                    <td className="py-3 px-4 max-w-[220px]">
                      <div className="text-neutral-800 font-medium truncate">
                        {lead.serviceInterested || 'General Inquiry'}
                      </div>
                      <div className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
                        {lead.message}
                      </div>
                    </td>

                    {/* Source */}
                    <td className="py-3 px-4 whitespace-nowrap text-neutral-600">
                      <span className="text-[11px]">{lead.source}</span>
                    </td>

                    {/* Status Dropdown */}
                    <td
                      className="py-3 px-4 whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          onUpdateStatus(lead.id, e.target.value as LeadStatus)
                        }
                        aria-label={`Update status for ${lead.name}`}
                        className={`text-[11px] font-semibold py-1 px-2.5 rounded-md border cursor-pointer focus:outline-none focus:ring-1 transition-colors ${
                          lead.status === 'new'
                            ? 'bg-amber-50 text-amber-800 border-amber-200'
                            : lead.status === 'contacted'
                            ? 'bg-sky-50 text-sky-800 border-sky-200'
                            : lead.status === 'in_progress'
                            ? 'bg-indigo-50 text-indigo-800 border-indigo-200'
                            : lead.status === 'converted'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : 'bg-neutral-100 text-neutral-700 border-neutral-200'
                        }`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="in_progress">In Progress</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                      </select>
                    </td>

                    {/* Value */}
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-neutral-900 font-semibold whitespace-nowrap">
                      ${(lead.estimatedValue || 0).toLocaleString()}
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-right font-mono tabular-nums text-neutral-500 text-[11px] whitespace-nowrap">
                      {new Date(lead.createdAt).toLocaleDateString(undefined, {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>

                    {/* Actions */}
                    <td
                      className="py-3 px-4 text-right whitespace-nowrap"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onSelectLead(lead)}
                          title="View lead timeline & notes"
                          className="p-1 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded transition-colors"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete lead from ${lead.name}?`)) {
                              onDeleteLead(lead.id);
                            }
                          }}
                          title="Delete lead"
                          className="p-1 text-neutral-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
