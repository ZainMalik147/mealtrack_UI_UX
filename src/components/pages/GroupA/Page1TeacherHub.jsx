import React, { useState, useEffect } from 'react';
import { useApp } from '../../../context/AppContext';
import { Clock, Users, CheckCircle2, AlertCircle, ArrowRight, History, Calendar, Bell } from 'lucide-react';

export default function Page1TeacherHub() {
  const { students, setCurrentPage, addLateArrivalAfterCutoff } = useApp();
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState('18 minutes remaining until 9:00 AM count cut-off');
  const [showSimulateLateModal, setShowSimulateLateModal] = useState(false);

  // Live timer simulation
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(9, 0, 0, 0);
      const diff = target - now;
      if (diff > 0) {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeRemaining(`${mins}m ${secs}s remaining until 9:00 AM count cut-off`);
      } else {
        setTimeRemaining('Past 9:00 AM cut-off — Counts submitted now are marked "Submitted Late"');
      }
    };
    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const totalEnrolled = students.length || 24;
  const missingForms = students.filter(s => s.benefitFormMissing).length || 2;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-fadeIn">
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
              <span className="text-xs text-textMuted">Elementary Division</span>
            </div>
            <h1 className="text-2xl font-bold text-textDark tracking-tight mt-1">
              Beacon Elementary · Room 205 (Grade 2)
            </h1>
            <p className="text-sm text-textMuted font-medium">
              Teacher: <span className="text-textDark font-semibold">Mrs. Jennifer Ellis</span>
            </p>
          </div>
        </div>

        {/* Quick action: Simulate late arrival test */}
        <button
          onClick={() => setShowSimulateLateModal(true)}
          className="inline-flex items-center gap-2 px-3 py-2 text-xs font-medium text-brandTeal bg-teal-50 border border-teal-200 rounded-element hover:bg-teal-100 transition-colors self-start md:self-auto"
          title="Test kitchen alert push"
        >
          <Bell className="w-3.5 h-3.5 text-brandTeal" />
          Simulate Student Arrived Late
        </button>
      </header>

      {/* Main Content (Strictly low cognitive load: 3 focused elements) */}
      <main className="space-y-6">
        {/* 1. Big Live Deadline Timer Card */}
        <section className="bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-50 border border-amber-200 text-statusAmber rounded-element flex-shrink-0">
              <Clock className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-statusAmber bg-amber-100 px-2.5 py-0.5 rounded-full">
                  Morning Deadline
                </span>
                <span className="text-xs text-textMuted">Daily Cut-off Requirement</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-textDark">
                8:42 AM
              </h2>
              <p className="text-sm font-medium text-textMuted">
                {timeRemaining}
              </p>
            </div>
          </div>
        </section>

        {/* 2. Quick Metric Bar (4 simple pills) */}
        <section className="bg-canvas-pure border border-slateBorder rounded-card p-4 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element text-center">
              <span className="text-xs text-textMuted font-medium block">Total Enrolled</span>
              <span className="text-lg font-bold text-textDark">{totalEnrolled}</span>
            </div>
            <div className="p-3 bg-emerald-50 border border-statusGreen-border rounded-element text-center">
              <span className="text-xs text-statusGreen font-medium block">Submitted Yesterday</span>
              <span className="text-lg font-bold text-statusGreen">24</span>
            </div>
            <div className="p-3 bg-amber-50 border border-statusAmber-border rounded-element text-center">
              <span className="text-xs text-statusAmber font-medium block">Benefit Forms Missing</span>
              <span className="text-lg font-bold text-statusAmber">{missingForms}</span>
            </div>
            <div className="p-3 bg-indigo-50 border border-statusIndigo-border rounded-element text-center">
              <span className="text-xs text-statusIndigo font-medium block">CEP Free Status</span>
              <span className="text-lg font-bold text-statusIndigo">100% Free</span>
            </div>
          </div>
        </section>

        {/* 3. Single High-Contrast Primary Button */}
        <section className="pt-2">
          <button
            onClick={() => setCurrentPage(2)}
            className="w-full h-[52px] bg-brandTeal hover:bg-brandTeal-hover text-white text-base md:text-lg font-semibold rounded-element shadow-sm flex items-center justify-center gap-3 transition-all transform active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-brandTeal focus:ring-offset-2"
          >
            <span>Start Morning Count ({totalEnrolled} Students)</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </section>

        {/* Subtle Bottom Link */}
        <div className="text-center pt-2">
          <button
            onClick={() => setShowHistoryModal(true)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-textMuted hover:text-textDark transition-colors group"
          >
            <History className="w-4 h-4 text-textMuted group-hover:text-textDark" />
            <span className="underline underline-offset-4">View Past Submissions & History</span>
          </button>
        </div>
      </main>

      {/* History Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-canvas-pure border border-slateBorder rounded-card max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slateBorder pb-3">
              <h3 className="text-lg font-bold text-textDark flex items-center gap-2">
                <Calendar className="w-5 h-5 text-brandTeal" />
                Room 205 Submission Log
              </h3>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="text-textMuted hover:text-textDark text-sm font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-slate-50 border border-slateBorder rounded-element flex justify-between items-center">
                <div>
                  <span className="font-semibold text-textDark block">Monday, Nov 23, 2026</span>
                  <span className="text-xs text-textMuted">Signed by Jennifer M. Ellis at 8:46 AM</span>
                </div>
                <span className="text-xs font-semibold text-statusGreen bg-emerald-50 border border-statusGreen-border px-2 py-0.5 rounded-full">
                  24 Served · On Time
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slateBorder rounded-element flex justify-between items-center">
                <div>
                  <span className="font-semibold text-textDark block">Friday, Nov 20, 2026</span>
                  <span className="text-xs text-textMuted">Signed by Jennifer M. Ellis at 8:49 AM</span>
                </div>
                <span className="text-xs font-semibold text-statusGreen bg-emerald-50 border border-statusGreen-border px-2 py-0.5 rounded-full">
                  23 Served · 1 Absent
                </span>
              </div>
              <div className="p-3 bg-slate-50 border border-slateBorder rounded-element flex justify-between items-center">
                <div>
                  <span className="font-semibold text-textDark block">Thursday, Nov 19, 2026</span>
                  <span className="text-xs text-textMuted">Signed by Jennifer M. Ellis at 8:44 AM</span>
                </div>
                <span className="text-xs font-semibold text-statusGreen bg-emerald-50 border border-statusGreen-border px-2 py-0.5 rounded-full">
                  24 Served · On Time
                </span>
              </div>
            </div>
            <button
              onClick={() => setShowHistoryModal(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-textDark text-sm font-medium rounded-element transition-colors"
            >
              Close History
            </button>
          </div>
        </div>
      )}

      {/* Simulate Late Arrival Modal */}
      {showSimulateLateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-canvas-pure border border-slateBorder rounded-card max-w-md w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-textDark">
              Simulate Post-9:00 AM Student Late Arrival
            </h3>
            <p className="text-sm text-textMuted">
              Demonstrates the kitchen change alert live dispatch (Page 19) when a student arrives after the 9:00 AM cut-off.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => {
                  addLateArrivalAfterCutoff('20020114', 'Caleb Williams');
                  setShowSimulateLateModal(false);
                }}
                className="w-full text-left p-3 border border-slateBorder hover:border-brandTeal rounded-element hover:bg-teal-50/50 transition-colors flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-textDark block">Caleb Williams (#20020114)</span>
                  <span className="text-xs text-textMuted">Arrived 9:12 AM · Missed Breakfast · Needs Lunch A</span>
                </div>
                <span className="text-xs font-bold text-brandTeal">+1 Entrée A</span>
              </button>
            </div>
            <button
              onClick={() => setShowSimulateLateModal(false)}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-textDark text-sm font-medium rounded-element"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
