import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Rocket, Check, ShieldCheck, ToggleLeft, ToggleRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Page13FeatureModules() {
  const { setCurrentPage, setDistricts, setLiveNotification } = useApp();

  const [modules, setModules] = useState({
    k5MealRegister: true,
    gsrpFamilyStyle: true,
    latchkeyExtended: true,
    enrichmentPrograms: true,
    educationalBenefitForms: true,
    realTimeSignalR: true,
  });

  const moduleList = [
    {
      key: 'k5MealRegister',
      title: 'K–5 Daily Meal Register with Typed Attestation',
      desc: 'Elementary classroom 9:00 AM count, breakfast check-off, 5 lunch choices, and MDE/USDA legal e-signature.',
    },
    {
      key: 'gsrpFamilyStyle',
      title: 'GSRP Pre-K Family Style & MDE 5-Day Weekly Sheet',
      desc: 'Dedicated pre-K single meal & snack check-off with signed 5-day state compliance reimbursement sheet export.',
    },
    {
      key: 'latchkeyExtended',
      title: 'Latchkey Extended Day & Authorized Pickup Desk',
      desc: 'After-school extended day care check-in/check-out, snack tracking, and guardian pickup verification.',
    },
    {
      key: 'enrichmentPrograms',
      title: 'Enrichment Programs (Tutoring, Power Hour)',
      desc: 'After-school tutoring, Art Studio, and athletic program attendance and supper box distribution.',
    },
    {
      key: 'educationalBenefitForms',
      title: 'Educational Benefit Mobile Forms (Title I SMS Link)',
      desc: 'Passwordless mobile magic link survey for parents with automated SNAP verification and PDF archiving.',
    },
    {
      key: 'realTimeSignalR',
      title: 'Real-Time Kitchen Change Alerts (SignalR Live Push)',
      desc: 'Sub-second push notifications to cafeteria warmer lines for late arrivals and count revisions.',
    },
  ];

  const toggleModule = (key) => {
    setModules(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAndActivate = () => {
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}

    setLiveNotification({
      type: 'success',
      title: '🎉 District Successfully Provisioned',
      message: 'Detroit Public Schools Academy [DPSA] license activated with all selected modules!'
    });
    setTimeout(() => setCurrentPage(10), 1200);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="space-y-3 border-b border-slateBorder pb-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(12)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Step 2: License Duration
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-brandNavy bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
            Step 3 of 3
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-textDark tracking-tight">
            Feature Module Entitlements
          </h1>
          <p className="text-sm text-textMuted font-medium">
            Toggle enabled functional modules for Detroit Public Schools Academy
          </p>
        </div>

        {/* 100% Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div className="bg-brandNavy h-full rounded-full" style={{ width: '100%' }} />
        </div>
      </header>

      {/* Checklist (Clean cards with toggle switches) */}
      <main className="space-y-3">
        {moduleList.map((m) => {
          const isOn = modules[m.key];
          return (
            <div
              key={m.key}
              onClick={() => toggleModule(m.key)}
              className={`p-4.5 bg-canvas-pure border rounded-card cursor-pointer transition-all flex items-start justify-between gap-4 shadow-sm ${
                isOn
                  ? 'border-brandNavy/30 ring-1 ring-brandNavy/20 bg-slate-50/30'
                  : 'border-slateBorder hover:border-slate-300 opacity-60'
              }`}
            >
              <div className="space-y-1">
                <span className="text-sm font-bold text-textDark block">
                  {m.title}
                </span>
                <p className="text-xs text-textMuted leading-relaxed">
                  {m.desc}
                </p>
              </div>

              {/* Toggle Switch */}
              <button
                type="button"
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ease-in-out flex-shrink-0 mt-0.5 ${
                  isOn ? 'bg-brandNavy' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
                    isOn ? 'translate-x-6' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </main>

      {/* Footer CTA */}
      <button
        onClick={handleSaveAndActivate}
        className="w-full h-[54px] bg-brandNavy hover:bg-slate-900 text-white text-base md:text-lg font-bold rounded-element shadow-sm flex items-center justify-center gap-3 transition-transform active:scale-[0.98] min-h-touch focus:outline-none focus:ring-2 focus:ring-brandNavy"
      >
        <span>Save District & Activate License 🚀</span>
      </button>
    </div>
  );
}
