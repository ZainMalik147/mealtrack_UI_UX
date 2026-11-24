import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, CheckCircle2, ShieldCheck, ArrowRight, Lock, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Page8ParentSignature() {
  const { setCurrentPage } = useApp();
  const [parentName, setParentName] = useState('Rachel M. Carter');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!parentName.trim()) return;
    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      {!submitted && (
        <div className="space-y-2 border-b border-slateBorder pb-4">
          <button
            onClick={() => setCurrentPage(7)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Assistance Survey
          </button>
          <h1 className="text-xl font-bold text-textDark tracking-tight">
            Parent e-Signature Certification
          </h1>
          <p className="text-xs text-textMuted">
            Legally binding electronic signature under federal ESIGN and Michigan UETA.
          </p>
        </div>
      )}

      {!submitted ? (
        <main className="bg-canvas-pure border border-slateBorder rounded-card p-5 shadow-sm space-y-5">
          <div className="p-3.5 bg-slate-50 border border-slateBorder rounded-element flex items-start gap-3">
            <Lock className="w-5 h-5 text-brandTeal mt-0.5 flex-shrink-0" />
            <p className="text-xs text-textDark leading-relaxed">
              "I certify that all information submitted is true and accurate, and that all income is reported if requested. I understand this information helps determine state and federal school funding."
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-textDark block">
                Type Parent Full Name to Sign:
              </label>
              <input
                type="text"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                placeholder="e.g. Rachel M. Carter"
                className="w-full px-4 py-3 border border-slateBorder rounded-element text-sm font-serif italic text-textDark focus:outline-none focus:ring-2 focus:ring-brandTeal bg-white"
              />
              <span className="text-[11px] text-textMuted block">
                Mobile Token ID: <code className="font-mono text-textDark">TKN-918204-SMS</code>
              </span>
            </div>

            <button
              type="submit"
              disabled={!parentName.trim()}
              className="w-full h-[52px] bg-statusGreen hover:bg-emerald-700 disabled:opacity-50 text-white text-base font-bold rounded-element shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-touch"
            >
              <span>Certify & Submit Benefit Form</span>
              <Check className="w-5 h-5" />
            </button>
          </form>
        </main>
      ) : (
        /* Success State */
        <main className="bg-canvas-pure border border-statusGreen-border rounded-card p-6 shadow-md text-center space-y-5 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-50 border border-statusGreen-border text-statusGreen rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10 animate-bounce" />
          </div>

          <div className="space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-statusGreen bg-emerald-50 px-2.5 py-0.5 rounded-full border border-statusGreen-border">
              Survey Approved ✓
            </span>
            <h2 className="text-xl font-bold text-textDark">
              Thank you, Rachel!
            </h2>
            <p className="text-xs text-textMuted leading-relaxed max-w-xs mx-auto">
              Your household benefit form is approved for <b className="text-textDark">Jordan</b> and <b className="text-textDark">Maya</b>. A signed PDF copy has been filed with Food Service.
            </p>
          </div>

          <div className="p-3 bg-slate-50 border border-slateBorder rounded-element text-left text-xs font-mono space-y-1 text-textMuted">
            <div className="flex justify-between">
              <span>Form Ref:</span>
              <span className="font-bold text-textDark">BF-2026-08492</span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span className="text-statusGreen font-bold">Approved for Free Meals</span>
            </div>
          </div>

          <button
            onClick={() => setCurrentPage(9)}
            className="w-full h-[52px] bg-brandTeal hover:bg-brandTeal-hover text-white text-base font-bold rounded-element shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-touch"
          >
            <span>Pre-Select This Week's Lunch</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </main>
      )}
    </div>
  );
}
