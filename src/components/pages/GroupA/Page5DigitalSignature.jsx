import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, CheckCircle2, ShieldCheck, Rocket, Lock, FileText, ArrowRight, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Page5DigitalSignature() {
  const {
    students,
    attendance,
    lunchChoices,
    signatureName,
    setSignatureName,
    submitCertifiedCount,
    setCurrentPage
  } = useApp();

  const [hasTransmitted, setHasTransmitted] = useState(false);
  const [certCode, setCertCode] = useState(null);

  // Compute live counts
  let present = 0;
  let late = 0;
  let leaveLate = 0;
  let absent = 0;

  let entreeA = 0;
  let entreeB = 0;
  let salad = 0;
  let own = 0;
  let noTake = 0;

  students.forEach((s) => {
    const att = attendance[s.sid] || 'present';
    if (att === 'present') present++;
    else if (att === 'late') late++;
    else if (att === 'leave_late') leaveLate++;
    else if (att === 'absent') absent++;

    const l = lunchChoices[s.sid] || 'hotA';
    if (l === 'hotA') entreeA++;
    else if (l === 'coldB') entreeB++;
    else if (l === 'salad') salad++;
    else if (l === 'own') own++;
    else if (l === 'notake') noTake++;
  });

  const totalMealsToPrepare = entreeA + entreeB + salad;

  const handleTransmit = () => {
    if (!signatureName.trim()) return;

    submitCertifiedCount();
    setCertCode(`CERT-MDE-${Math.floor(100000 + Math.random() * 900000)}-HWS`);
    setHasTransmitted(true);

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="space-y-3 border-b border-slateBorder pb-4">
        <button
          onClick={() => setCurrentPage(4)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Extended Day
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-textDark tracking-tight">
              Final Review & Sign 9:00 AM Count
            </h1>
            <p className="text-sm text-textMuted font-medium">
              Beacon Elementary · Room 205 (Grade 2) · Official USDA / MDE Certified Register
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-statusGreen bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-statusGreen" />
            Legal Attestation
          </span>
        </div>
      </header>

      {!hasTransmitted ? (
        /* White Paper Styling Review Container */
        <main className="bg-canvas-pure border border-slateBorder rounded-card p-8 shadow-sm space-y-8">
          {/* Summary Box (Clean border, generous whitespace) */}
          <section className="border border-slateBorder rounded-card p-6 bg-slate-50/50 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-textMuted border-b border-slateBorder pb-2">
              Classroom Attendance & Meal Breakdown
            </h2>

            {/* Attendance Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-white border border-slateBorder rounded-element">
                <span className="text-xs text-textMuted font-medium block">Present</span>
                <span className="text-xl font-bold text-statusGreen">{present}</span>
              </div>
              <div className="p-3 bg-white border border-slateBorder rounded-element">
                <span className="text-xs text-textMuted font-medium block">Late Arrivals</span>
                <span className="text-xl font-bold text-statusAmber">{late}</span>
              </div>
              <div className="p-3 bg-white border border-slateBorder rounded-element">
                <span className="text-xs text-textMuted font-medium block">Leave Late</span>
                <span className="text-xl font-bold text-statusIndigo">{leaveLate}</span>
              </div>
              <div className="p-3 bg-white border border-slateBorder rounded-element">
                <span className="text-xs text-textMuted font-medium block">Absent</span>
                <span className="text-xl font-bold text-statusRed">{absent}</span>
              </div>
            </div>

            {/* Preparation Totals */}
            <div className="p-4 bg-white border border-brandTeal/30 rounded-element space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-brandTeal">
                  Total Meals to Prepare for Cafeteria:
                </span>
                <span className="text-2xl font-black text-brandTeal">
                  {totalMealsToPrepare}
                </span>
              </div>
              <div className="text-xs text-textMuted flex flex-wrap gap-x-4 gap-y-1 font-medium">
                <span>Hot Entrée A: <b className="text-textDark">{entreeA}</b></span>
                <span>Cold Entrée B: <b className="text-textDark">{entreeB}</b></span>
                <span>Salad Bar: <b className="text-textDark">{salad}</b></span>
                <span className="text-slate-400">|</span>
                <span>Own Lunch: <b className="text-textDark">{own}</b></span>
                <span>Did Not Take Meal: <b className="text-statusRed">{noTake}</b></span>
              </div>
            </div>
          </section>

          {/* Attestation Box */}
          <section className="border border-slateBorder rounded-card p-6 bg-white space-y-5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-slate-100 rounded-element text-textDark mt-0.5">
                <Lock className="w-5 h-5 text-brandNavy" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-textDark">
                  USDA / MDE Legal Declaration
                </h3>
                <p className="text-xs text-textMuted leading-relaxed">
                  "I certify that this record is accurate in accordance with MDE and USDA CEP regulations. 
                  All students counted as served were present or arrived during permissible breakfast/lunch service hours."
                </p>
              </div>
            </div>

            {/* Signature Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-textDark block">
                Type full legal name to sign:
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={signatureName}
                  onChange={(e) => setSignatureName(e.target.value)}
                  className="w-full px-4 py-3 border border-slateBorder rounded-element text-base font-serif italic text-textDark focus:outline-none focus:ring-2 focus:ring-brandTeal bg-slate-50/50"
                  placeholder="e.g. Jennifer M. Ellis"
                />
                <span className="absolute right-3 top-3 text-xs font-mono font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Verified Google SSO
                </span>
              </div>
            </div>

            {/* Timestamp & IP Stamping */}
            <div className="text-[11px] font-mono text-textMuted bg-slate-50 border border-slateBorder p-3 rounded-element flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span>Stamping: Nov 24, 2026 at 8:48 AM EST</span>
              <span>Client IP: 10.42.1.88 · SHA-256 Validated</span>
            </div>
          </section>

          {/* Primary Action Button */}
          <button
            onClick={handleTransmit}
            disabled={!signatureName.trim()}
            className="w-full h-[52px] bg-brandTeal hover:bg-brandTeal-hover disabled:opacity-50 text-white text-base md:text-lg font-bold rounded-element shadow-sm flex items-center justify-center gap-3 transition-transform active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brandTeal focus:ring-offset-2"
          >
            <span>Transmit Certified Count to Kitchen Line 🚀</span>
          </button>
        </main>
      ) : (
        /* Transmission Success Confirmation Card */
        <main className="bg-canvas-pure border border-statusGreen-border rounded-card p-8 shadow-md space-y-6 text-center animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-50 border border-statusGreen-border text-statusGreen rounded-full flex items-center justify-center mx-auto shadow-sm">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-statusGreen bg-emerald-50 px-3 py-1 rounded-full border border-statusGreen-border">
              Transmission Confirmed
            </span>
            <h2 className="text-2xl font-bold text-textDark">
              Certified Count Transmitted to Kitchen!
            </h2>
            <p className="text-sm text-textMuted max-w-md mx-auto">
              Your 9:00 AM count was legally signed by <span className="font-semibold text-textDark">{signatureName}</span> and instantly broadcast via SignalR to Beacon Elementary Cafeteria.
            </p>
          </div>

          {/* Digital Certificate Pill */}
          <div className="p-4 bg-slate-50 border border-slateBorder rounded-element max-w-md mx-auto text-left font-mono text-xs space-y-1">
            <div className="flex justify-between text-textMuted">
              <span>Seal Certificate:</span>
              <span className="font-bold text-textDark">{certCode}</span>
            </div>
            <div className="flex justify-between text-textMuted">
              <span>Time Stamped:</span>
              <span className="text-textDark">8:48:19 AM EST</span>
            </div>
            <div className="flex justify-between text-textMuted">
              <span>Meals Scheduled:</span>
              <span className="font-bold text-brandTeal">{totalMealsToPrepare} meals</span>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <button
              onClick={() => setCurrentPage(18)}
              className="px-5 py-3 bg-brandNavy hover:bg-slate-900 text-white text-sm font-semibold rounded-element shadow-sm flex items-center justify-center gap-2 transition-colors min-h-touch"
            >
              <span>View Kitchen Preparation Board (Page 18)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentPage(1)}
              className="px-5 py-3 bg-slate-100 hover:bg-slate-200 text-textDark text-sm font-semibold rounded-element transition-colors min-h-touch"
            >
              Return to Classroom Hub
            </button>
          </div>
        </main>
      )}
    </div>
  );
}
