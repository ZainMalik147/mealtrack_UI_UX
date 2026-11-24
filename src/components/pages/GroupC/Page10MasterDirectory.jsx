import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Building2, Search, Plus, ShieldCheck, ArrowRight, AlertTriangle, Users, Calendar, Activity } from 'lucide-react';

export default function Page10MasterDirectory() {
  const { districts, setCurrentPage } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredDistricts = districts.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
      {/* Header */}
      <header className="border-b border-slateBorder pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/images/ideal-logo.png"
            alt="Ideal Technology Solutions"
            className="h-12 w-auto object-contain"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brandNavy bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                Vendor Master Portal
              </span>
              <span className="text-xs text-textMuted">Multi-Tenant Management</span>
            </div>
            <h1 className="text-2xl font-bold text-textDark tracking-tight mt-0.5">
              MealTrack Master Operations Console
            </h1>
            <p className="text-sm text-textMuted font-medium">
              Administrator: <span className="text-textDark font-semibold">Michael Collins</span> · Ideal Technology Solutions
            </p>
          </div>
        </div>

        {/* Telemetry Quick Link */}
        <button
          onClick={() => setCurrentPage(14)}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-semibold text-brandNavy bg-slate-100 hover:bg-slate-200 rounded-element border border-slate-300 transition-colors self-start md:self-auto min-h-touch"
        >
          <Activity className="w-4 h-4 text-brandNavy" />
          <span>System Telemetry & Health (Page 14)</span>
        </button>
      </header>

      {/* Top Bar: Search Input + Onboard Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-textMuted absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search district name or code..."
            className="w-full pl-10 pr-4 py-2.5 border border-slateBorder rounded-element text-sm focus:outline-none focus:ring-2 focus:ring-brandNavy bg-canvas-pure"
          />
        </div>

        <button
          onClick={() => setCurrentPage(11)}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-brandNavy hover:bg-slate-900 text-white text-sm font-semibold rounded-element shadow-sm transition-transform active:scale-95 min-h-touch"
        >
          <Plus className="w-4 h-4" />
          <span>+ Onboard New District</span>
        </button>
      </div>

      {/* Metrics (3 Minimalist Cards) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Metric 1 */}
        <div className="bg-canvas-pure border border-slateBorder rounded-card p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-textMuted">
            Active Districts
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-textDark">14</span>
            <span className="text-xs text-statusGreen font-semibold">Districts Provisioned</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-canvas-pure border border-slateBorder rounded-card p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-textMuted">
            Enrolled Students
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-brandNavy">18,420</span>
            <span className="text-xs text-textMuted font-semibold">Total CEP Student Seats</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-canvas-pure border border-slateBorder rounded-card p-5 shadow-sm space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-statusAmber">
            Expiring Licenses
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-statusAmber">2</span>
            <span className="text-xs text-statusAmber font-semibold">&lt; 30 Days Remaining</span>
          </div>
        </div>
      </section>

      {/* Client Cards (Clean Grid of District Cards) */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-textMuted">
          Active Client Tenants ({filteredDistricts.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredDistricts.map((district) => {
            const isExpiring = district.status === 'Expiring Soon';
            return (
              <div
                key={district.id}
                className="bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-5"
              >
                {/* District Header */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <img
                      src={district.logoUrl}
                      alt={district.name}
                      className="h-12 w-12 object-contain p-1 border border-slateBorder rounded-element bg-white"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/hws-logo.png';
                      }}
                    />
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                        isExpiring
                          ? 'bg-amber-50 text-statusAmber border-amber-200'
                          : 'bg-emerald-50 text-statusGreen border-statusGreen-border'
                      }`}
                    >
                      {district.status} · {district.daysRemaining} days left
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-textDark">
                      {district.name} [{district.code}]
                    </h3>
                    <p className="text-xs font-mono text-textMuted">
                      {district.subdomain}.mealtrackapp.com
                    </p>
                  </div>

                  <div className="text-xs text-textMuted space-y-1 pt-1 border-t border-slate-100">
                    <div className="flex justify-between">
                      <span>Primary Contact:</span>
                      <span className="font-semibold text-textDark">{district.contactName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Email:</span>
                      <span className="font-mono text-textDark">{district.contactEmail}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Enrolled Students:</span>
                      <span className="font-semibold text-brandNavy">{district.enrolledStudents.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action Link */}
                <div className="pt-2 border-t border-slateBorder">
                  <button
                    onClick={() => setCurrentPage(15)} // Jump to District Admin Home
                    className="w-full py-2.5 px-3 text-xs font-bold text-brandNavy hover:text-brandTeal bg-slate-50 hover:bg-slate-100 rounded-element border border-slateBorder transition-colors flex items-center justify-between"
                  >
                    <span>Manage District & License</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
