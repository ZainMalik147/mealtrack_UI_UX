import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, ArrowRight, Clock, Check, X, Shield } from 'lucide-react';

export default function Page4ExtendedDay() {
  const {
    students,
    attendance,
    leaveLateReasons,
    extendedChoices,
    toggleExtendedOption,
    setCurrentPage
  } = useApp();

  // Filter students staying late or in after-care/programs
  const lateStayStudents = students.filter(s => {
    const att = attendance[s.sid];
    return att === 'leave_late' || s.latchkey || (s.programs && s.programs.length > 0);
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-24">
      {/* Header */}
      <header className="space-y-3 border-b border-slateBorder pb-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(3)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Step 2: Meal Choices
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-statusIndigo bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
            Step 3 of 3
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-textDark tracking-tight">
            Confirm After-School Snack & Supper
          </h1>
          <p className="text-sm text-textMuted font-medium">
            After-Care and Extended Day food service roster
          </p>
        </div>

        {/* 100% Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-statusIndigo h-full rounded-full transition-all duration-300"
            style={{ width: '100%' }}
          />
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-5">
        {/* Summary Banner */}
        <div className="p-4 bg-indigo-50/70 border border-indigo-200 rounded-card flex items-center gap-3">
          <div className="p-2 bg-white rounded-element text-statusIndigo shadow-sm">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <span className="text-sm font-bold text-textDark block">
              {lateStayStudents.length} students staying past 3:15 PM for Latchkey / Tutoring
            </span>
            <span className="text-xs text-textMuted">
              Prepares cafeteria after-school snack and Title I Supper program boxes.
            </span>
          </div>
        </div>

        {/* Table (4 columns only, clean styling) */}
        <div className="bg-canvas-pure border border-slateBorder rounded-card overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slateBorder text-xs font-bold text-textMuted uppercase tracking-wider">
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Stay Reason</th>
                <th className="py-3 px-4 text-center">After-School Snack</th>
                <th className="py-3 px-4 text-center">Supper Program</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slateBorder text-sm">
              {lateStayStudents.map((student) => {
                const stayReason =
                  leaveLateReasons[student.sid] ||
                  (student.latchkey ? 'Latchkey' : (student.programs?.[0] || 'After-Care'));
                const choices = extendedChoices[student.sid] || { snack: true, supper: true };

                return (
                  <tr key={student.sid} className="hover:bg-slate-50/60 transition-colors">
                    {/* Student Name */}
                    <td className="py-3.5 px-4 font-bold text-textDark flex items-center gap-3">
                      <img
                        src={student.photoUrl}
                        alt={student.firstName}
                        className="w-8 h-8 rounded-full object-cover border border-slateBorder"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/students/jordan.png';
                        }}
                      />
                      <div>
                        <span>{student.firstName} {student.lastName}</span>
                        <span className="text-xs text-textMuted font-mono block">#{student.sid}</span>
                      </div>
                    </td>

                    {/* Stay Reason */}
                    <td className="py-3.5 px-4">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 border border-indigo-200 text-statusIndigo">
                        {stayReason}
                      </span>
                    </td>

                    {/* Snack [✓/✕] */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleExtendedOption(student.sid, 'snack')}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-element border transition-all ${
                          choices.snack
                            ? 'bg-statusGreen text-white border-statusGreen shadow-sm'
                            : 'bg-slate-100 text-slate-400 border-slate-300 hover:bg-slate-200'
                        }`}
                        title="Toggle Snack"
                      >
                        {choices.snack ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>

                    {/* Supper [✓/✕] */}
                    <td className="py-3.5 px-4 text-center">
                      <button
                        type="button"
                        onClick={() => toggleExtendedOption(student.sid, 'supper')}
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-element border transition-all ${
                          choices.supper
                            ? 'bg-brandNavy text-white border-brandNavy shadow-sm'
                            : 'bg-slate-100 text-slate-400 border-slate-300 hover:bg-slate-200'
                        }`}
                        title="Toggle Supper"
                      >
                        {choices.supper ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-canvas-pure border-t border-slateBorder p-4 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-textMuted font-medium">
            Step 3 of 3 complete · Ready for legal certification
          </div>
          <button
            onClick={() => setCurrentPage(5)}
            className="h-[48px] px-6 bg-brandTeal hover:bg-brandTeal-hover text-white text-sm md:text-base font-semibold rounded-element shadow-sm flex items-center gap-2 transition-transform active:scale-95 min-h-touch"
          >
            <span>Review Summary & Sign</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
