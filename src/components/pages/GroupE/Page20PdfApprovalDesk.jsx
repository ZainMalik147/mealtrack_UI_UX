import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, CheckCircle2, ShieldCheck, Flag, Check, Printer, Download, RefreshCw, FileText } from 'lucide-react';
import { api } from '../../../services/apiService';
import confetti from 'canvas-confetti';

export default function Page20PdfApprovalDesk() {
  const { benefitForms, setBenefitForms, setCurrentPage, setLiveNotification } = useApp();
  const [selectedFormIndex, setSelectedFormIndex] = useState(0);

  const currentForm = benefitForms[selectedFormIndex] || benefitForms[0];
  const [classification, setClassification] = useState(currentForm?.currentClassification || 'Free Meals');
  const [isSynced, setIsSynced] = useState(currentForm?.syncedToMiStar || false);

  const handleApproveSync = () => {
    const updated = api.benefitForms.updateStatus(currentForm.id, classification, true);
    setBenefitForms(updated);
    setIsSynced(true);

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {}

    setLiveNotification({
      type: 'success',
      title: 'Approved & Synced to MiStar',
      message: `Form #${currentForm.id} approved as '${classification}' and student SIS profile updated.`
    });
  };

  const handleFlagDuplicate = () => {
    const updated = api.benefitForms.flagDuplicate(currentForm.id);
    setBenefitForms(updated);
    setLiveNotification({
      type: 'info',
      title: 'Form Flagged',
      message: `Form #${currentForm.id} flagged for duplicate household audit.`
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="border-b border-slateBorder pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPage(15)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to District Dashboard
          </button>
          <h1 className="text-2xl font-bold text-textDark tracking-tight">
            Educational Benefit Form PDF Review & Approval Desk
          </h1>
          <p className="text-sm text-textMuted font-medium">
            MDE / Title I Income Survey Verification & MiStar Direct Certification Sync
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-textDark bg-slate-100 border border-slateBorder px-3 py-1.5 rounded-element font-mono">
            Form: {currentForm?.id || 'BF-2026-08492'}
          </span>
        </div>
      </header>

      {/* Split-Screen Review Desk */}
      <main className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side (65%): Clean 8.5x11 PDF Replica */}
        <section className="lg:col-span-8 bg-white border border-slateBorder rounded-card p-8 shadow-md space-y-6 relative print:border-none">
          {/* PDF Official Header */}
          <div className="border-b-2 border-brandMaroon pb-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/hws-logo.png"
                alt="Harper Woods Crest"
                className="w-14 h-14 object-contain"
              />
              <div>
                <h2 className="text-base font-bold text-brandMaroon uppercase tracking-wider">
                  Harper Woods Community Schools
                </h2>
                <h3 className="text-xs font-bold text-textDark">
                  State of Michigan Educational Benefit & Household Income Survey
                </h3>
                <span className="text-[10px] text-textMuted">
                  School Year 2026–2027 · Form USDA-MDE-CEP-101
                </span>
              </div>
            </div>

            {/* Status Stamp */}
            <div className="text-right">
              <span className="inline-block border-2 border-emerald-600 text-emerald-700 font-mono font-bold text-[10px] uppercase px-2 py-0.5 rounded rotate-[-4deg]">
                {isSynced ? 'CERTIFIED & SYNCED' : 'SUBMITTED FOR AUDIT'}
              </span>
            </div>
          </div>

          {/* Section 1: Children Information */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted border-b border-slate-200 pb-1">
              Part 1: Enrolled District Children
            </h4>
            <table className="w-full text-xs text-left border border-slate-200">
              <thead className="bg-slate-50 font-bold text-textDark border-b border-slate-200">
                <tr>
                  <th className="p-2">Student Legal Name</th>
                  <th className="p-2">School Building</th>
                  <th className="p-2">Grade</th>
                  <th className="p-2">Student ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2 font-bold text-textDark">Jordan Carter</td>
                  <td className="p-2">Beacon Elementary</td>
                  <td className="p-2">Grade 2</td>
                  <td className="p-2 font-mono">20025487</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-textDark">Maya Carter</td>
                  <td className="p-2">Beacon Elementary</td>
                  <td className="p-2">Grade 4</td>
                  <td className="p-2 font-mono">20019966</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Section 2: Assistance Program & Case Number */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted border-b border-slate-200 pb-1">
              Part 2: Assistance Program Participation
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3 rounded border border-slate-200">
              <div>
                <span className="text-textMuted block">Assistance Program:</span>
                <span className="font-bold text-textDark">SNAP / FIP Program</span>
              </div>
              <div>
                <span className="text-textMuted block">State Case Number:</span>
                <span className="font-mono font-bold text-brandTeal text-sm">
                  {currentForm?.caseNumber || '108492019-A'}
                </span>
              </div>
            </div>
          </div>

          {/* Section 3: Household & Income Details */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-textMuted border-b border-slate-200 pb-1">
              Part 3: Household Size & Income Level
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-textMuted block">Total Household Members:</span>
                <span className="font-bold text-textDark">4 Individuals</span>
              </div>
              <div>
                <span className="text-textMuted block">Reported Bracket:</span>
                <span className="font-bold text-textDark">$34,000 – $42,000 / Year</span>
              </div>
            </div>
          </div>

          {/* Section 4: Digital Parent Signature & PAdES Certificate */}
          <div className="border-t border-slate-200 pt-4 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-textMuted block text-[11px]">Parent Legal Signature:</span>
                <span className="font-serif italic text-lg text-textDark font-bold">
                  {currentForm?.signatureText || 'Rachel M. Carter'}
                </span>
              </div>
              <div className="text-right">
                <span className="text-textMuted block text-[11px]">Date & Time Stamped:</span>
                <span className="font-mono text-xs text-textDark">
                  {currentForm?.signedAt || 'Nov 24, 2026 at 8:22 AM EST'}
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-2.5 rounded border border-slate-200 text-[10px] font-mono text-textMuted flex justify-between items-center">
              <span>SHA256: 9b8f2d8a01e5...c77a</span>
              <span>Client IP: 73.182.49.201 · SMS Verified</span>
            </div>
          </div>
        </section>

        {/* Right Side (35%): Audit Verification & Approval Controls */}
        <section className="lg:col-span-4 bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm space-y-6">
          {/* Audit Verification Checklist */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-textMuted flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-statusGreen" />
              Audit Verification
            </h3>

            <div className="space-y-2 text-xs">
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-element flex items-center justify-between">
                <span className="font-semibold text-emerald-900">SNAP Case # Verified</span>
                <CheckCircle2 className="w-4 h-4 text-statusGreen" />
              </div>
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-element flex items-center justify-between">
                <span className="font-semibold text-emerald-900">Household Match in MiStar</span>
                <CheckCircle2 className="w-4 h-4 text-statusGreen" />
              </div>
              <div className="p-3 bg-slate-50 border border-slateBorder rounded-element flex items-center justify-between text-textMuted">
                <span>Duplicate Search</span>
                <span className="font-semibold text-textDark">0 Duplicates</span>
              </div>
            </div>
          </div>

          {/* Classification Selector */}
          <div className="space-y-2 pt-2 border-t border-slateBorder">
            <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
              Official Eligibility Classification:
            </label>
            <div className="space-y-1.5">
              {[
                { key: 'Free Meals', label: 'Approve as Free Meals', color: 'border-statusGreen text-statusGreen bg-emerald-50/50' },
                { key: 'Reduced', label: 'Approve as Reduced', color: 'border-statusAmber text-statusAmber bg-amber-50/50' },
                { key: 'Paid', label: 'Classify as Paid', color: 'border-slate-500 text-slate-700 bg-slate-100' },
              ].map((tier) => (
                <button
                  key={tier.key}
                  type="button"
                  onClick={() => setClassification(tier.key)}
                  className={`w-full text-left p-3 text-xs font-bold rounded-element border transition-all flex items-center justify-between min-h-touch ${
                    classification === tier.key
                      ? `${tier.color} ring-1 ring-offset-1`
                      : 'border-slateBorder bg-white text-textDark hover:bg-slate-50'
                  }`}
                >
                  <span>{tier.label}</span>
                  {classification === tier.key && <Check className="w-4 h-4" />}
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-2 pt-2 border-t border-slateBorder">
            <button
              onClick={handleApproveSync}
              className="w-full h-[48px] bg-brandTeal hover:bg-brandTeal-hover text-white text-xs md:text-sm font-bold rounded-element shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-95 min-h-touch"
            >
              <Check className="w-4 h-4" />
              <span>Approve & Sync to MiStar</span>
            </button>

            <button
              onClick={handleFlagDuplicate}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-textDark text-xs font-semibold rounded-element border border-slateBorder transition-colors flex items-center justify-center gap-1.5 min-h-touch"
            >
              <Flag className="w-3.5 h-3.5 text-textMuted" />
              <span>Flag Duplicate</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
