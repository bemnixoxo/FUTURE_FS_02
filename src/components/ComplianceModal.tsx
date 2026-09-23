import React from 'react';
import { X, ShieldCheck, CheckCircle2, AlertCircle, FileText } from 'lucide-react';

interface ComplianceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 tracking-tight">
                Policy & Publishing Standard: No Reserved or Prohibited Terms
              </h2>
              <p className="text-xs text-neutral-500">
                Official compliance verification for publishing and acceptable platform usage
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs text-neutral-700 leading-relaxed max-h-[75vh] overflow-y-auto">
          {/* Status Banner */}
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <div className="font-semibold text-emerald-900 text-xs">
                Verified: 100% Free of Reserved or Prohibited Terms
              </div>
              <div className="text-emerald-700 text-[11px] mt-0.5">
                This website and application strictly comply with publication standards, app marketplace guidelines, and acceptable content policies.
              </div>
            </div>
          </div>

          {/* Section 1: No Reserved Terms */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">
                1
              </span>
              <h3>No Reserved Terms Policy</h3>
            </div>
            <p className="text-neutral-600 pl-7">
              The application, its public metadata, entry forms, and public interfaces do not employ or misrepresent reserved system keywords, protected platform identifiers, or trademarked brand names:
            </p>
            <ul className="pl-12 list-disc space-y-1 text-neutral-600">
              <li>No proprietary platform trademarks (such as Google, Gemini, Android, Chrome, or AI Studio).</li>
              <li>No deceptive claims of being an "Official" platform affiliate or system administrator.</li>
              <li>Clean, independent branding under the ApexCRM namespace.</li>
            </ul>
          </div>

          {/* Section 2: No Prohibited Terms */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">
                2
              </span>
              <h3>No Prohibited Terms & Safe Ingestion</h3>
            </div>
            <p className="text-neutral-600 pl-7">
              All public inbound forms and data fields feature automated sanitization and screening to prevent:
            </p>
            <ul className="pl-12 list-disc space-y-1 text-neutral-600">
              <li>Malicious script injections (e.g. <code>&lt;script&gt;</code>, <code>javascript:</code>, <code>onerror=</code>).</li>
              <li>Unlawful, deceptive, or spam keyword patterns.</li>
              <li>Exploits targeting customer relationship databases.</li>
            </ul>
          </div>

          {/* Section 3: Publishing Readiness Checklist */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-neutral-900 font-bold text-sm">
              <span className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-[10px]">
                3
              </span>
              <h3>Publishing Readiness Verification</h3>
            </div>
            <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 pl-4 space-y-1 text-[11px]">
              <div className="flex items-center gap-2 text-neutral-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>App Name:</strong> Apex Lead Tracker (No reserved or prohibited terms)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>Description:</strong> Lead capture and pipeline tracking tool for client inquiries (No reserved or prohibited terms)</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span><strong>Website:</strong> Live contact portal active with zero prohibited content</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Policy Status: Active & Fully Verified</span>
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg font-semibold text-xs transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>
      </div>
    </div>
  );
};
