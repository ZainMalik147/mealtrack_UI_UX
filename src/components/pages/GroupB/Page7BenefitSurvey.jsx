import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react';

export default function Page7BenefitSurvey() {
  const { setCurrentPage } = useApp();
  const [hasAssistance, setHasAssistance] = useState(true);
  const [caseNumber, setCaseNumber] = useState('108492019-A');
  const [householdSize, setHouseholdSize] = useState(4);
  const [incomeBracket, setIncomeBracket] = useState('$34,000 – $42,000');

  const incomeOptions = [
    'Under $26,000',
    '$26,000 – $34,000',
    '$34,000 – $42,000',
    '$42,000 – $55,000',
    'Over $55,000'
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Step Header */}
      <div className="space-y-2 border-b border-slateBorder pb-4">
        <button
          onClick={() => setCurrentPage(6)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Welcome
        </button>

        <h1 className="text-xl font-bold text-textDark tracking-tight">
          Educational Benefit Survey (Title I Funding)
        </h1>
        <p className="text-xs text-textMuted leading-relaxed">
          Even though school meals are 100% free under CEP, completing this confidential survey directly funds classroom technology, reading specialists, and school counselors.
        </p>
      </div>

      {/* 1-Question Container */}
      <main className="bg-canvas-pure border border-slateBorder rounded-card p-5 shadow-sm space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-bold text-textDark block">
            Does your household receive SNAP, FIP, or TANF assistance?
          </label>

          {/* 2 Big Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setHasAssistance(true)}
              className={`p-3.5 border rounded-element text-left text-xs font-semibold transition-all flex items-center justify-between min-h-touch ${
                hasAssistance
                  ? 'border-brandTeal bg-teal-50/50 text-brandTeal shadow-sm ring-1 ring-brandTeal'
                  : 'border-slateBorder bg-white text-textDark hover:bg-slate-50'
              }`}
            >
              <span>Yes (I have a case number)</span>
              {hasAssistance && <Check className="w-4 h-4 text-brandTeal" />}
            </button>

            <button
              type="button"
              onClick={() => setHasAssistance(false)}
              className={`p-3.5 border rounded-element text-left text-xs font-semibold transition-all flex items-center justify-between min-h-touch ${
                !hasAssistance
                  ? 'border-brandTeal bg-teal-50/50 text-brandTeal shadow-sm ring-1 ring-brandTeal'
                  : 'border-slateBorder bg-white text-textDark hover:bg-slate-50'
              }`}
            >
              <span>No (Report Income)</span>
              {!hasAssistance && <Check className="w-4 h-4 text-brandTeal" />}
            </button>
          </div>
        </div>

        {/* Dynamic Sub-form based on selection */}
        {hasAssistance ? (
          <div className="space-y-3 p-4 bg-slate-50 border border-slateBorder rounded-element animate-fadeIn">
            <label className="text-xs font-bold text-textDark block">
              Enter 9-digit Case Number:
            </label>
            <input
              type="text"
              value={caseNumber}
              onChange={(e) => setCaseNumber(e.target.value)}
              placeholder="e.g. 108492019-A"
              className="w-full px-4 py-2.5 border border-slateBorder rounded-element text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brandTeal bg-white"
            />
            <span className="text-[11px] text-textMuted flex items-center gap-1">
              <HelpCircle className="w-3.5 h-3.5 text-textMuted" />
              Found on your Michigan Bridge Card or MDHHS notice.
            </span>
          </div>
        ) : (
          <div className="space-y-5 p-4 bg-slate-50 border border-slateBorder rounded-element animate-fadeIn">
            {/* Household Size Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-xs font-semibold text-textDark">
                <span>Household Size (People living in home):</span>
                <span className="text-sm font-bold text-brandTeal bg-white px-2 py-0.5 rounded border border-slateBorder">
                  {householdSize} People
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                value={householdSize}
                onChange={(e) => setHouseholdSize(Number(e.target.value))}
                className="w-full accent-brandTeal cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-textMuted font-mono">
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span>5</span>
                <span>6</span>
                <span>7</span>
                <span>8+</span>
              </div>
            </div>

            {/* Income Bracket Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-textDark block">
                Annual Household Income Bracket:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {incomeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setIncomeBracket(opt)}
                    className={`py-2 px-3 text-xs font-medium rounded-element border transition-all text-left ${
                      incomeBracket === opt
                        ? 'bg-brandTeal text-white border-brandTeal font-bold shadow-sm'
                        : 'bg-white text-textDark border-slateBorder hover:bg-slate-100'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer CTA */}
      <button
        onClick={() => setCurrentPage(8)}
        className="w-full h-[52px] bg-brandTeal hover:bg-brandTeal-hover text-white text-base font-bold rounded-element shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-touch"
      >
        <span>Continue to e-Signature</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
