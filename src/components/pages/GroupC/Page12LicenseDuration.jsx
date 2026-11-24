import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, ArrowRight, Calendar, ShieldAlert, Users, Lock } from 'lucide-react';

export default function Page12LicenseDuration() {
  const { setCurrentPage } = useApp();
  const [plan, setPlan] = useState('Annual Enterprise District Tier');
  const [startDate, setStartDate] = useState('2026-11-20');
  const [expirationDate, setExpirationDate] = useState('2027-11-20');
  const [lockoutPolicy, setLockoutPolicy] = useState('hard'); // 'hard' | 'grace'
  const [seatCap, setSeatCap] = useState('3,000');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="space-y-3 border-b border-slateBorder pb-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(11)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Step 1: Branding
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-brandNavy bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
            Step 2 of 3
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-textDark tracking-tight">
            License Term & Expiration Engine
          </h1>
          <p className="text-sm text-textMuted font-medium">
            SaaS Contract Duration & Auto-Lockout Enforcement Rules
          </p>
        </div>

        {/* 66% Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div className="bg-brandNavy h-full rounded-full" style={{ width: '66.66%' }} />
        </div>
      </header>

      {/* Form Elements */}
      <main className="bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm space-y-5">
        {/* 1. License Plan */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
            1. License Plan Tier
          </label>
          <select
            value={plan}
            onChange={(e) => setPlan(e.target.value)}
            className="w-full px-4 py-2.5 border border-slateBorder rounded-element text-sm focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white text-textDark"
          >
            <option value="Annual Enterprise District Tier">Annual Enterprise District Tier (Full Feature Suite)</option>
            <option value="Annual District Standard">Annual District Standard Tier</option>
            <option value="Pilot / Single School 90-Day">Pilot / Single School 90-Day Tier</option>
          </select>
        </div>

        {/* 2 & 3: Date Pickers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
              2. Contract Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-slateBorder rounded-element text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
              3. Hard Expiration Date (11:59 PM EST)
            </label>
            <input
              type="date"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              className="w-full px-3 py-2.5 border border-slateBorder rounded-element text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white"
            />
          </div>
        </div>

        {/* 4. Automatic Lockout Radio Group */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-textDark block flex items-center gap-1.5">
            <Lock className="w-4 h-4 text-statusRed" />
            4. Automatic Lockout Enforcement Policy
          </label>

          <div className="space-y-2">
            <label
              className={`p-3.5 border rounded-element flex items-start gap-3 cursor-pointer transition-all ${
                lockoutPolicy === 'hard'
                  ? 'border-brandNavy bg-slate-50 ring-1 ring-brandNavy'
                  : 'border-slateBorder hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="lockoutPolicy"
                checked={lockoutPolicy === 'hard'}
                onChange={() => setLockoutPolicy('hard')}
                className="accent-brandNavy mt-0.5"
              />
              <div>
                <span className="text-xs font-bold text-textDark block">
                  Hard Lockout on Date (Recommended)
                </span>
                <span className="text-xs text-textMuted">
                  Immediately redirect all district staff and parent portals to the "License Expired" screen (Page 21) once the expiration date passes.
                </span>
              </div>
            </label>

            <label
              className={`p-3.5 border rounded-element flex items-start gap-3 cursor-pointer transition-all ${
                lockoutPolicy === 'grace'
                  ? 'border-brandNavy bg-slate-50 ring-1 ring-brandNavy'
                  : 'border-slateBorder hover:bg-slate-50'
              }`}
            >
              <input
                type="radio"
                name="lockoutPolicy"
                checked={lockoutPolicy === 'grace'}
                onChange={() => setLockoutPolicy('grace')}
                className="accent-brandNavy mt-0.5"
              />
              <div>
                <span className="text-xs font-bold text-textDark block">
                  7-Day Grace Period
                </span>
                <span className="text-xs text-textMuted">
                  Show prominent warning banner with renewal notice for 7 calendar days before hard lockout.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* 5. Student Seat Cap */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
            5. Student Seat Cap
          </label>
          <div className="relative">
            <input
              type="text"
              value={seatCap}
              onChange={(e) => setSeatCap(e.target.value)}
              placeholder="3,000"
              className="w-full px-4 py-2.5 border border-slateBorder rounded-element text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white"
            />
            <span className="absolute right-3.5 top-3 text-xs text-textMuted">
              Enrolled Student Seats
            </span>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <button
        onClick={() => setCurrentPage(13)}
        className="w-full h-[52px] bg-brandNavy hover:bg-slate-900 text-white text-base font-bold rounded-element shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-touch"
      >
        <span>Next: Enable Feature Modules</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
