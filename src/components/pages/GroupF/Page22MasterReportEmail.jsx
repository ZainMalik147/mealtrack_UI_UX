import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Mail, FileText, Download, CheckCircle, Clock } from 'lucide-react';

export default function Page22MasterReportEmail() {
  const { setCurrentPage } = useApp();

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="border-b border-slateBorder pb-4 flex items-center justify-between">
        <div>
          <button
            onClick={() => setCurrentPage(15)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to District Dashboard
          </button>
          <h1 className="text-xl font-bold text-textDark tracking-tight mt-1">
            9:00 AM Daily Master Report Email Template
          </h1>
          <p className="text-xs text-textMuted">
            Automated HTML summary dispatched daily to Food Service Director Brian Corbett
          </p>
        </div>

        <span className="text-xs font-mono bg-slate-100 text-textDark px-2.5 py-1 rounded border border-slateBorder">
          Target: 600px Responsive HTML
        </span>
      </header>

      {/* Email Container (600px Max-Width Centered) */}
      <main className="flex justify-center">
        <div className="w-full max-w-[600px] bg-white border border-slateBorder rounded-card overflow-hidden shadow-lg font-sans">
          {/* Email Client Metadata Preview */}
          <div className="p-4 bg-slate-50 border-b border-slateBorder text-xs text-textMuted space-y-1 font-mono">
            <div><span className="text-slate-400">From:</span> MealTrack Automated Dispatch &lt;reports@mealtrackapp.com&gt;</div>
            <div><span className="text-slate-400">To:</span> Brian Corbett &lt;foodservice@hwschools.org&gt;</div>
            <div><span className="text-slate-400">Date:</span> Nov 24, 2026 at 9:00:14 AM EST</div>
            <div><span className="text-slate-400">Subject:</span> 🍱 Master Meal Count: 752 Meals across Beacon & Tyrone Elementary</div>
          </div>

          {/* Maroon Header */}
          <div className="bg-brandMaroon p-6 text-white text-center space-y-2">
            <img
              src="/images/hws-logo.png"
              alt="Harper Woods Schools"
              className="h-12 w-12 mx-auto object-contain bg-white rounded-full p-1"
            />
            <h2 className="text-base font-bold uppercase tracking-wider">
              Harper Woods Schools · Master Meal Count Report
            </h2>
            <p className="text-xs text-red-200">
              Daily K-12 Food Service Executive Operations Briefing
            </p>
          </div>

          {/* Email Body Content */}
          <div className="p-6 space-y-6">
            {/* Headline */}
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-statusGreen bg-emerald-50 border border-statusGreen-border px-3 py-0.5 rounded-full inline-block">
                All Classrooms Certified
              </span>
              <h3 className="text-xl md:text-2xl font-black text-textDark tracking-tight mt-1">
                752 Meals to Prepare Today across Beacon & Tyrone Elementary
              </h3>
              <p className="text-xs text-textMuted">
                Counts received and locked at 9:00 AM count cut-off.
              </p>
            </div>

            {/* Breakdown Table */}
            <div className="border border-slateBorder rounded-element overflow-hidden">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slateBorder font-bold text-textMuted uppercase tracking-wider">
                    <th className="py-2.5 px-3">Meal Category</th>
                    <th className="py-2.5 px-3">Preparation Destination</th>
                    <th className="py-2.5 px-3 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slateBorder">
                  <tr className="bg-teal-50/20 font-bold text-textDark">
                    <td className="py-2.5 px-3">Hot Entrée A (Halal Strips)</td>
                    <td className="py-2.5 px-3 text-brandTeal">Warmers & Line</td>
                    <td className="py-2.5 px-3 text-right text-base text-brandTeal">418</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-textDark">Cold Entrée B (Flatbread)</td>
                    <td className="py-2.5 px-3 text-textMuted">Refrigerated Pack</td>
                    <td className="py-2.5 px-3 text-right font-bold text-textDark">214</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-semibold text-textDark">Salad Bar Bowls</td>
                    <td className="py-2.5 px-3 text-textMuted">Produce Cooler</td>
                    <td className="py-2.5 px-3 text-right font-bold text-textDark">120</td>
                  </tr>
                  <tr className="text-textMuted">
                    <td className="py-2.5 px-3">Own Lunch (Home)</td>
                    <td className="py-2.5 px-3">Milk Cartons Only</td>
                    <td className="py-2.5 px-3 text-right">46</td>
                  </tr>
                  <tr className="text-textMuted">
                    <td className="py-2.5 px-3">Did Not Take Meal</td>
                    <td className="py-2.5 px-3">Fasting / Exempt</td>
                    <td className="py-2.5 px-3 text-right">18</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* School Campus Split */}
            <div className="grid grid-cols-2 gap-3 text-xs text-center">
              <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
                <span className="text-textMuted block">Beacon Elementary:</span>
                <span className="text-base font-bold text-textDark">428 Meals</span>
              </div>
              <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
                <span className="text-textMuted block">Tyrone Elementary:</span>
                <span className="text-base font-bold text-textDark">324 Meals</span>
              </div>
            </div>

            {/* Attachment Pill */}
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-white rounded border border-slate-200 text-brandMaroon">
                  <FileText className="w-4 h-4" />
                </div>
                <div className="text-left text-xs">
                  <span className="font-bold text-textDark block">
                    📄 Master_Attendance_Report_Nov24.pdf
                  </span>
                  <span className="text-[10px] text-textMuted">
                    384 KB · MDE Digital Signature Verified
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold text-brandTeal bg-white px-2.5 py-1 rounded border border-slateBorder">
                Certified
              </span>
            </div>
          </div>

          {/* Email Footer */}
          <div className="p-4 bg-slate-50 border-t border-slateBorder text-center text-[11px] text-textMuted space-y-1">
            <p>Ideal Technology Solutions, LLC · MealTrack Multi-Tenant SaaS</p>
            <p>Harper Woods Schools Food Service Department · Confidential USDA Records</p>
          </div>
        </div>
      </main>
    </div>
  );
}
