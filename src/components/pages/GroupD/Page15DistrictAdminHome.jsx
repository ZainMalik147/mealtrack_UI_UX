import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ShieldCheck, BarChart3, Users, FileText, ArrowRight, Clock, Utensils, AlertCircle } from 'lucide-react';

export default function Page15DistrictAdminHome() {
  const { setCurrentPage, staff, benefitForms } = useApp();

  const pendingRooms = staff.filter(s => s.role === 'Teacher' && s.countStatus.includes('Pending')).length;
  const pendingForms = benefitForms.filter(f => f.status === 'Pending Approval').length;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-fadeIn pb-16">
      {/* Header */}
      <header className="border-b border-slateBorder pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src="/images/hws-logo.png"
            alt="Harper Woods Schools"
            className="h-14 w-14 object-contain rounded-card p-1 bg-white border border-slateBorder shadow-sm"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-brandMaroon bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                Harper Woods Schools
              </span>
              <span className="text-xs text-textMuted">Food Service Department</span>
            </div>
            <h1 className="text-2xl font-bold text-textDark tracking-tight mt-1">
              District Food Service Dashboard
            </h1>
            <p className="text-sm text-textMuted font-medium">
              Director: <span className="text-textDark font-semibold">Brian Corbett</span> · 100% CEP District
            </p>
          </div>
        </div>

        {/* Quick Cut-off Alert Pill */}
        <div className="flex items-center gap-2 px-3.5 py-2 bg-amber-50 border border-amber-200 text-statusAmber rounded-element text-xs font-semibold self-start md:self-auto">
          <Clock className="w-4 h-4 text-statusAmber" />
          <span>9:00 AM Count Active: {pendingRooms} Room Pending</span>
        </div>
      </header>

      {/* Top Banner (License Transparency) */}
      <section className="bg-emerald-50/70 border border-statusGreen-border rounded-card p-4 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-element text-statusGreen shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-textDark block">
              ✓ Licensed to Harper Woods Schools
            </span>
            <span className="text-xs text-statusGreen font-medium">
              Active contract through Nov 20, 2027 (361 days remaining) · 3,000 Student Cap
            </span>
          </div>
        </div>
        <span className="text-xs font-mono font-semibold text-slate-500 hidden sm:inline-block">
          Tier: Enterprise District
        </span>
      </section>

      {/* Quick Links (3 Large Cards) */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Live Master Meal Report */}
        <div
          onClick={() => setCurrentPage(18)} // Jumps to Kitchen Live Board / Page 22 email preview
          className="bg-canvas-pure border border-slateBorder hover:border-brandTeal rounded-card p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-3">
            <div className="p-3 bg-teal-50 border border-teal-200 text-brandTeal rounded-element w-fit group-hover:scale-105 transition-transform">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-textDark group-hover:text-brandTeal transition-colors">
                Live Master Meal Report
              </h2>
              <p className="text-xs text-textMuted leading-relaxed mt-1">
                View today's consolidated preparation counts, entrees, and late arrival streams across Beacon & Tyrone Elementary.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slateBorder flex items-center justify-between text-xs font-bold text-brandTeal">
            <span>Open Preparation Board</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Manage Teachers & Staff Accounts */}
        <div
          onClick={() => setCurrentPage(16)}
          className="bg-canvas-pure border border-slateBorder hover:border-brandNavy rounded-card p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-3">
            <div className="p-3 bg-slate-100 border border-slate-200 text-brandNavy rounded-element w-fit group-hover:scale-105 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-textDark group-hover:text-brandNavy transition-colors">
                Manage Teachers & Staff Accounts
              </h2>
              <p className="text-xs text-textMuted leading-relaxed mt-1">
                View active staff logins, classroom assignments, send 8:30 AM count nudges, and invite new educators.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slateBorder flex items-center justify-between text-xs font-bold text-brandNavy">
            <span>Open Staff Directory ({staff.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Educational Benefit Forms */}
        <div
          onClick={() => setCurrentPage(20)}
          className="bg-canvas-pure border border-slateBorder hover:border-brandMaroon rounded-card p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between space-y-6 group"
        >
          <div className="space-y-3">
            <div className="p-3 bg-red-50 border border-red-200 text-brandMaroon rounded-element w-fit group-hover:scale-105 transition-transform">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-textDark group-hover:text-brandMaroon transition-colors">
                Educational Benefit Forms
              </h2>
              <p className="text-xs text-textMuted leading-relaxed mt-1">
                Review parent-submitted SNAP assistance surveys, inspect PDF replicas, certify free/reduced status, and sync to MiStar.
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slateBorder flex items-center justify-between text-xs font-bold text-brandMaroon">
            <span>Review Forms ({benefitForms.length})</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </main>

      {/* Auxiliary Link to 9:00 AM Daily Master Report Email Preview */}
      <div className="p-4 bg-slate-50 border border-slateBorder rounded-element flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <span className="text-textMuted">
          Need to review the automated 9:00 AM daily executive summary sent to district administrators?
        </span>
        <button
          onClick={() => setCurrentPage(22)}
          className="text-xs font-bold text-brandMaroon hover:underline flex items-center gap-1 self-start sm:self-auto"
        >
          <span>View 9:00 AM Daily Master Email Template (Page 22)</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
