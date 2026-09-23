import React, { useState } from 'react';
import {
  Send,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  Globe,
  Laptop,
  MessageSquare,
  Clock,
  ShieldCheck,
  FileCheck,
} from 'lucide-react';
import { Lead } from '../types/crm';
import { checkReservedOrProhibitedTerms } from '../utils/termsValidator';
import { ComplianceModal } from './ComplianceModal';

interface WebsiteFormSimulatorProps {
  onLeadSubmitted: (newLead: Lead) => void;
  onGoToPipeline: () => void;
}

export const WebsiteFormSimulator: React.FC<WebsiteFormSimulatorProps> = ({
  onLeadSubmitted,
  onGoToPipeline,
}) => {
  const [fullName, setFullName] = useState('Alex Henderson');
  const [email, setEmail] = useState('alex@velocitycommerce.io');
  const [phone, setPhone] = useState('+1 (415) 802-9914');
  const [company, setCompany] = useState('Velocity Commerce');
  const [service, setService] = useState('Full-Stack Web App Development');
  const [budget, setBudget] = useState('$15,000 - $30,000');
  const [message, setMessage] = useState(
    'We are preparing to launch a B2B subscription portal and require a custom React dashboard integrated with Stripe and real-time inventory management.'
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedLead, setSubmittedLead] = useState<Lead | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showComplianceModal, setShowComplianceModal] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Front-end pre-screening for reserved or prohibited terms
    const termCheck = checkReservedOrProhibitedTerms(fullName, email, company, message);
    if (!termCheck.isValid) {
      setError(termCheck.error || 'Submission contains reserved or prohibited terms.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName,
          email,
          phone,
          company,
          serviceInterested: service,
          budget,
          message,
          source: 'Website Contact Form',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setSubmittedLead(data.data);
      onLeadSubmitted(data.data);
    } catch (err: any) {
      setError(err.message || 'An error occurred while submitting.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setSubmittedLead(null);
    setFullName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setMessage('');
  };

  const handleQuickFill = (type: 'ecommerce' | 'saas' | 'redesign') => {
    if (type === 'ecommerce') {
      setFullName('Sophia Moreau');
      setEmail('sophia@parisluxury.fr');
      setPhone('+33 1 42 68 55 00');
      setCompany('Maison Moreau Paris');
      setService('UI/UX Redesign & Brand System');
      setBudget('$10,000 - $20,000');
      setMessage('We want a high-end luxury e-commerce experience with refined serif typography, fast checkout, and multilingual support.');
    } else if (type === 'saas') {
      setFullName('Carlos Mendez');
      setEmail('carlos@synapsefleet.com');
      setPhone('+1 (305) 914-2200');
      setCompany('Synapse Fleet Logistics');
      setService('Custom CRM & API Integration');
      setBudget('$25,000 - $45,000');
      setMessage('Need an internal telemetry and driver assignment console with automated SMS dispatching.');
    } else {
      setFullName('Hannah Schmidt');
      setEmail('h.schmidt@berlinbio.de');
      setPhone('+49 30 8392 411');
      setCompany('Berlin Bio Analytics');
      setService('Full-Stack Web App Development');
      setBudget('$15,000 - $25,000');
      setMessage('Looking for an interactive laboratory research portal to visualize qPCR diagnostic runs.');
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-neutral-100/70 p-6 md:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Compliance & Publishing Standard Notification Bar */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-emerald-900 shadow-2xs">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="font-bold">Publishing Compliance Verified:</span>
              <span className="ml-1 text-emerald-800">
                This website and application enforce a strict <strong>No Reserved or Prohibited Terms</strong> standard.
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowComplianceModal(true)}
            className="px-2.5 py-1 bg-white hover:bg-emerald-100 text-emerald-900 font-semibold border border-emerald-300 rounded-lg transition-colors shrink-0 inline-flex items-center gap-1.5 shadow-2xs"
          >
            <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>View Policy & Verification</span>
          </button>
        </div>

        {/* Banner Explaining the Simulator */}
        <div className="bg-white border border-neutral-200 rounded-xl p-4 shadow-2xs flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-neutral-900 text-white shrink-0 mt-0.5">
              <Globe className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-neutral-900">
                Live Website Lead Capture Simulator
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5 leading-relaxed">
                This is a live emulation of a client-facing agency contact page. Submitting this form sends a real HTTP <code className="font-mono text-neutral-800 bg-neutral-100 px-1 py-0.5 rounded">POST /api/leads</code> request to the CRM backend.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs text-neutral-500 hidden sm:inline">Try samples:</span>
            <button
              onClick={() => handleQuickFill('saas')}
              className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded transition-colors"
            >
              SaaS Lead
            </button>
            <button
              onClick={() => handleQuickFill('ecommerce')}
              className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded transition-colors"
            >
              E-Commerce
            </button>
            <button
              onClick={() => handleQuickFill('redesign')}
              className="px-2.5 py-1 text-xs bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded transition-colors"
            >
              BioTech
            </button>
          </div>
        </div>

        {/* Browser Mockup Window */}
        <div className="bg-white rounded-2xl shadow-xl border border-neutral-200 overflow-hidden">
          {/* Browser Address Bar */}
          <div className="bg-neutral-100 px-4 py-2.5 border-b border-neutral-200 flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 max-w-md bg-white border border-neutral-200 rounded-md px-3 py-1 text-xs text-neutral-600 font-mono flex items-center justify-between">
              <span className="truncate">https://apexstudio.agency/contact</span>
              <span className="text-[10px] text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded font-sans font-semibold">
                SSL Secure
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-neutral-400 text-xs ml-auto">
              <Laptop className="w-3.5 h-3.5" />
              <span>Client Viewport</span>
            </div>
          </div>

          {/* Website Content */}
          <div className="p-8 md:p-12">
            {submittedLead ? (
              <div className="text-center py-12 max-w-lg mx-auto animate-in fade-in zoom-in-95 duration-200">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 tracking-tight">
                  Inquiry Received!
                </h3>
                <p className="text-xs text-neutral-500 mt-2 leading-relaxed">
                  Thank you, <span className="font-semibold text-neutral-800">{submittedLead.name}</span>. Your inquiry has been logged into the CRM pipeline with status <span className="font-mono bg-neutral-100 px-1.5 py-0.5 rounded text-neutral-900 font-semibold uppercase text-[10px]">{submittedLead.status}</span>.
                </p>

                <div className="mt-6 p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-left text-xs space-y-1.5 font-mono">
                  <div className="text-neutral-400 text-[10px] uppercase font-sans font-semibold">Backend Ingestion Record</div>
                  <div className="text-neutral-700">Lead ID: <span className="text-neutral-900 font-bold">{submittedLead.id}</span></div>
                  <div className="text-neutral-700">Company: {submittedLead.company || 'N/A'}</div>
                  <div className="text-neutral-700">Initial Estimated Value: ${(submittedLead.estimatedValue ?? 0).toLocaleString()}</div>
                  <div className="text-neutral-700">Default Assignee: {submittedLead.assignedTo}</div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                  <button
                    onClick={onGoToPipeline}
                    className="w-full sm:w-auto px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span>Inspect Inbound Lead in Pipeline</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleResetForm}
                    className="w-full sm:w-auto px-4 py-2.5 bg-white border border-neutral-200 hover:bg-neutral-50 text-neutral-700 rounded-lg font-medium text-xs transition-colors"
                  >
                    Submit Another Test Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <div>
                {/* Agency Website Header */}
                <div className="max-w-2xl mx-auto text-center mb-10">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-neutral-100 text-neutral-800 rounded-full text-xs font-medium mb-3">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Now Booking Q3 & Q4 Client Engagements</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-950 tracking-tight">
                    Let's Build Something Exceptional Together
                  </h1>
                  <p className="text-xs md:text-sm text-neutral-500 mt-2 leading-relaxed">
                    Have an upcoming digital product, web platform, or redesign project? Fill out our brief intake form and our engineering leads will respond within 24 business hours.
                  </p>
                </div>

                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 text-xs">
                  {error && (
                    <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs leading-relaxed animate-in fade-in">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="elena@company.com"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">
                        Company / Organization
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="e.g. Rostova Design Co"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>

                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+1 (555) 000-0000"
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">
                        Service Interested In
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
                      >
                        <option value="Full-Stack Web App Development">Full-Stack Web App Development</option>
                        <option value="UI/UX Redesign & Brand System">UI/UX Redesign & Brand System</option>
                        <option value="Custom CRM & API Integration">Custom CRM & API Integration</option>
                        <option value="Mobile App (React Native)">Mobile App (React Native)</option>
                        <option value="Consulting & Technical Audit">Consulting & Technical Audit</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-neutral-700 font-semibold mb-1">
                        Approximate Budget Range
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 cursor-pointer"
                      >
                        <option value="< $5,000">&lt; $5,000</option>
                        <option value="$5,000 - $15,000">$5,000 - $15,000</option>
                        <option value="$15,000 - $30,000">$15,000 - $30,000</option>
                        <option value="$30,000 - $50,000+">$30,000 - $50,000+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-neutral-700 font-semibold mb-1">
                      Project Goals & Specific Requirements *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tell us what you are looking to build, deadlines, and key features..."
                      className="w-full p-3.5 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 leading-relaxed"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white rounded-lg font-semibold text-xs transition-all shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{isSubmitting ? 'Transmitting Inbound Lead...' : 'Send Inquiry to Agency'}</span>
                    </button>
                  </div>

                  {/* Form Submission Policy Verification Callout */}
                  <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-[11px] text-neutral-600 mt-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Verified Policy Enforced: <strong>No reserved or prohibited terms</strong>
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowComplianceModal(true)}
                      className="text-neutral-900 underline font-semibold hover:text-neutral-600 transition-colors"
                    >
                      View Policy →
                    </button>
                  </div>
                </form>

                {/* Client Website Footer */}
                <footer className="mt-12 pt-6 border-t border-neutral-200 text-neutral-500 text-xs flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div>
                    © 2026 Apex Digital Studio. All rights reserved.
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setShowComplianceModal(true)}
                      className="hover:text-neutral-900 text-neutral-700 font-medium inline-flex items-center gap-1 transition-colors"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>No Reserved or Prohibited Terms Policy</span>
                    </button>
                    <span>·</span>
                    <span className="text-neutral-400">Security & Privacy Standard</span>
                  </div>
                </footer>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compliance Policy Modal */}
      <ComplianceModal
        isOpen={showComplianceModal}
        onClose={() => setShowComplianceModal(false)}
      />
    </div>
  );
};
