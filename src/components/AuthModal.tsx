import React, { useState } from 'react';
import {
  Lock,
  Mail,
  User as UserIcon,
  ArrowRight,
  ShieldCheck,
  Eye,
  EyeOff,
} from 'lucide-react';
import { User } from '../types/crm';
import { api } from '../services/api';
import { checkReservedOrProhibitedTerms } from '../utils/termsValidator';
import { ComplianceModal } from './ComplianceModal';

interface AuthModalProps {
  onLoginSuccess: (user: User, token: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onLoginSuccess }) => {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showComplianceModal, setShowComplianceModal] = useState(false);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (authMode === 'login') {
        const result = await api.login(email.trim(), password);
        onLoginSuccess(result.user, result.token);
      } else {
        if (!name.trim()) {
          throw new Error('Please enter your full name');
        }
        const termCheck = checkReservedOrProhibitedTerms(name, email);
        if (!termCheck.isValid) {
          throw new Error(termCheck.error || 'Name or email contains reserved or prohibited terms.');
        }
        const result = await api.register({
          name: name.trim(),
          email: email.trim(),
          password,
        });
        onLoginSuccess(result.user, result.token);
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Brand Header */}
        <div className="p-6 text-center border-b border-neutral-100 bg-neutral-50/60">
          <div className="w-12 h-12 rounded-xl bg-neutral-900 text-white font-bold text-xl flex items-center justify-center mx-auto shadow-sm mb-3">
            A
          </div>
          <h2 className="text-lg font-bold text-neutral-900 tracking-tight">ApexCRM Admin Portal</h2>
          <p className="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
            Protected management workspace for agency directors, sales leads, and account managers.
          </p>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center p-1 bg-neutral-200/60 rounded-lg mt-4 max-w-xs mx-auto">
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                authMode === 'login'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setError(null);
              }}
              className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition-all ${
                authMode === 'register'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              New Account
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4 text-xs">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs leading-relaxed animate-in fade-in">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'register' && (
              <div>
                <label className="block text-neutral-700 font-semibold mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Marcus Wright"
                    className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-neutral-700 font-semibold mb-1">
                Admin Work Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@apexcrm.io"
                  className="w-full pl-9 pr-3 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-neutral-700 font-semibold">
                  Password <span className="text-rose-500">*</span>
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-9 pr-10 py-2 bg-neutral-50 border border-neutral-200 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-1 focus:ring-neutral-900 font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 p-0.5"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-50 text-white rounded-lg font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-2 mt-2"
            >
              <span>
                {isLoading
                  ? 'Processing...'
                  : authMode === 'login'
                  ? 'Sign In to CRM Dashboard'
                  : 'Create Admin Account'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="space-y-1.5 pt-2 border-t border-neutral-100">
            <div className="text-[11px] text-neutral-400 text-center flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Role-Based Access Control Active</span>
            </div>
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowComplianceModal(true)}
                className="text-[10px] text-neutral-500 hover:text-neutral-900 underline font-medium transition-colors"
              >
                Publishing Standard: No Reserved or Prohibited Terms Policy
              </button>
            </div>
          </div>
        </div>
      </div>

      <ComplianceModal
        isOpen={showComplianceModal}
        onClose={() => setShowComplianceModal(false)}
      />
    </div>
  );
};
