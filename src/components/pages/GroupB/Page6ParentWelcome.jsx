import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowRight, Utensils, HeartHandshake, ShieldCheck } from 'lucide-react';

export default function Page6ParentWelcome() {
  const { setCurrentPage } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Mobile Header */}
      <div className="text-center space-y-2 pt-2">
        <img
          src="/images/hws-logo.png"
          alt="Harper Woods Schools"
          className="h-16 w-16 mx-auto object-contain p-1 bg-white rounded-full border border-slateBorder shadow-sm"
        />
        <span className="text-[11px] font-bold uppercase tracking-wider text-brandMaroon bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full inline-block">
          Harper Woods Schools
        </span>
        <h1 className="text-xl font-bold text-textDark tracking-tight">
          Family Nutrition Hub
        </h1>
        <p className="text-base font-semibold text-textDark">
          Welcome, Rachel Carter 👋
        </p>
        <p className="text-xs text-textMuted">
          Direct SMS Magic Link Verified · Zero Password Required
        </p>
      </div>

      {/* Card 1: Your Children on File */}
      <section className="bg-canvas-pure border border-slateBorder rounded-card p-5 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-textMuted flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-brandTeal" />
          Your Children on File
        </h2>

        <div className="space-y-3">
          {/* Child 1: Jordan */}
          <div className="p-3 bg-slate-50 border border-slateBorder rounded-element flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/students/jordan.png"
                alt="Jordan Carter"
                className="w-10 h-10 rounded-full object-cover border border-slateBorder bg-white"
              />
              <div>
                <span className="text-sm font-bold text-textDark block">
                  Jordan Carter
                </span>
                <span className="text-xs text-textMuted">
                  Beacon Elementary · Grade 2 (Room 205)
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Enrolled
            </span>
          </div>

          {/* Child 2: Maya */}
          <div className="p-3 bg-slate-50 border border-slateBorder rounded-element flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="/images/students/maya.png"
                alt="Maya Carter"
                className="w-10 h-10 rounded-full object-cover border border-slateBorder bg-white"
              />
              <div>
                <span className="text-sm font-bold text-textDark block">
                  Maya Carter
                </span>
                <span className="text-xs text-textMuted">
                  Beacon Elementary · Grade 4 (Room 220)
                </span>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
              Enrolled
            </span>
          </div>
        </div>
      </section>

      {/* Single CTA (Primary) */}
      <button
        onClick={() => setCurrentPage(7)}
        className="w-full h-[52px] bg-brandTeal hover:bg-brandTeal-hover text-white text-base font-bold rounded-element shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-touch"
      >
        <span>Start 2-Minute Benefit Form</span>
        <ArrowRight className="w-5 h-5" />
      </button>

      {/* Secondary CTA */}
      <button
        onClick={() => setCurrentPage(9)}
        className="w-full py-3 bg-canvas-pure border border-slateBorder hover:border-brandMaroon text-textDark text-sm font-semibold rounded-element shadow-sm flex items-center justify-center gap-2 transition-colors min-h-touch"
      >
        <Utensils className="w-4 h-4 text-brandMaroon" />
        <span>View School Menus & Pre-Order Lunch</span>
      </button>

      {/* Notice info */}
      <div className="p-3 bg-teal-50/50 border border-teal-200 rounded-element text-xs text-textMuted text-center">
        🔒 Harper Woods Schools participates in the Community Eligibility Provision (CEP). Breakfast and lunch are provided at 100% no charge.
      </div>
    </div>
  );
}
