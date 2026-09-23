import React, { useState } from 'react';
import { X, Plus, UserPlus } from 'lucide-react';
import { LeadPriority } from '../types/crm';
import { checkReservedOrProhibitedTerms } from '../utils/termsValidator';

interface NewLeadModalProps {
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    source: string;
    serviceInterested: string;
    budget: string;
    estimatedValue: number;
    message: string;
    priority: LeadPriority;
  }) => Promise<void>;
}

export const NewLeadModal: React.FC<NewLeadModalProps> = ({ onClose, onSubmit }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [source, setSource] = useState('Website Contact Form');
  const [serviceInterested, setServiceInterested] = useState('Full-Stack Web App Development');
  const [estimatedValue, setEstimatedValue] = useState('10000');
  const [priority, setPriority] = useState<LeadPriority>('medium');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please provide Name, Email, and Project Inquiry message.');
      return;
    }

    const termCheck = checkReservedOrProhibitedTerms(name, email, company, message);
    if (!termCheck.isValid) {
      setError(termCheck.error || 'Input contains reserved or prohibited terms.');
      return;
    }

    setError(null);
    setIsSubmitting(true);
    try {
      await onSubmit({
        name,
        email,
        phone: phone || undefined,
        company: company || undefined,
        source,
        serviceInterested,
        budget: `$${Number(estimatedValue).toLocaleString()}`,
        estimatedValue: Number(estimatedValue) || 5000,
        message,
        priority,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || 'Failed to create lead');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl border border-neutral-200 w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="px-6 py-4 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/60">
          <div className="flex items-center gap-2">
            <UserPlus className="w-4 h-4 text-neutral-900" />
            <h2 className="text-sm font-semibold text-neutral-900">Add Inbound Lead Manually</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-700 font-medium mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jessica Meyer"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-medium mb-1">
                Email Address <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jessica@company.com"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-700 font-medium mb-1">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Meyer Dynamics"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 012-3456"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-700 font-medium mb-1">Lead Inbound Source</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="Website Contact Form">Website Contact Form</option>
                <option value="Landing Page Hero CTA">Landing Page Hero CTA</option>
                <option value="Pricing Page Inquiry">Pricing Page Inquiry</option>
                <option value="Partner Referral">Partner Referral</option>
                <option value="Direct Outreach">Direct Outreach</option>
                <option value="Organic Search">Organic Search</option>
              </select>
            </div>

            <div>
              <label className="block text-neutral-700 font-medium mb-1">Service Interested In</label>
              <select
                value={serviceInterested}
                onChange={(e) => setServiceInterested(e.target.value)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="Full-Stack Web App Development">Full-Stack Web App Development</option>
                <option value="UI/UX Redesign & Brand System">UI/UX Redesign & Brand System</option>
                <option value="Custom CRM & API Integration">Custom CRM & API Integration</option>
                <option value="Mobile App MVP">Mobile App MVP</option>
                <option value="SEO & Content Growth">SEO & Content Growth</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-neutral-700 font-medium mb-1">Estimated Deal Value ($)</label>
              <input
                type="number"
                value={estimatedValue}
                onChange={(e) => setEstimatedValue(e.target.value)}
                step="500"
                min="0"
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 font-mono focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
              />
            </div>

            <div>
              <label className="block text-neutral-700 font-medium mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as LeadPriority)}
                className="w-full px-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-neutral-700 font-medium mb-1">
              Inquiry / Project Details <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What did the client request? Project goals, timelines, or context..."
              className="w-full p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
            />
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-neutral-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors font-semibold shadow-sm"
            >
              {isSubmitting ? 'Creating Lead...' : 'Create Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
