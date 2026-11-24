import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, ArrowRight, Sparkles, Ban } from 'lucide-react';

export default function Page3MealChoices() {
  const {
    students,
    attendance,
    breakfastChoices,
    lunchChoices,
    setStudentBreakfast,
    setStudentLunch,
    fillRemainingHotA,
    setCurrentPage
  } = useApp();

  // Present/Late students only
  const activeStudents = students.filter(s => {
    const status = attendance[s.sid] || 'present';
    return status !== 'absent';
  });

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-24">
      {/* Step Header with 66% Progress Bar */}
      <header className="space-y-3 border-b border-slateBorder pb-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(2)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Step 1: Attendance
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-brandTeal bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
            Step 2 of 3
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-textDark tracking-tight">
              Record Meal Choices
            </h1>
            <p className="text-sm text-textMuted font-medium">
              Classroom Breakfast & Cafeteria Lunch for {activeStudents.length} present students
            </p>
          </div>

          {/* Top Batch Action */}
          <button
            onClick={fillRemainingHotA}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-brandTeal bg-teal-50 border border-teal-300 hover:bg-teal-100 rounded-element transition-colors self-start sm:self-auto min-h-touch shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-brandTeal" />
            Fill Remaining with Hot Entrée A
          </button>
        </div>

        {/* 66% Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-brandTeal h-full rounded-full transition-all duration-300"
            style={{ width: '66.66%' }}
          />
        </div>
      </header>

      {/* Student Cards (Clean white cards, low density) */}
      <main className="space-y-4">
        {activeStudents.map((student) => {
          const isLate = attendance[student.sid] === 'late';
          const bkStatus = breakfastChoices[student.sid] || (isLate ? 'not_taken' : 'served');
          const currentLunch = lunchChoices[student.sid] || 'hotA';

          return (
            <div
              key={student.sid}
              className="bg-canvas-pure border border-slateBorder rounded-card p-5 shadow-sm space-y-4 hover:border-slate-300 transition-colors"
            >
              {/* Student Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-3">
                  <img
                    src={student.photoUrl}
                    alt={student.firstName}
                    className="w-9 h-9 rounded-full object-cover border border-slateBorder"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/students/jordan.png';
                    }}
                  />
                  <div>
                    <span className="text-base font-bold text-textDark">
                      {student.firstName} {student.lastName}
                    </span>
                    <span className="text-xs text-textMuted font-mono ml-2">
                      #{student.sid}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {student.diet && student.diet !== 'Standard' && (
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      {student.diet}
                    </span>
                  )}
                  {student.allergy && (
                    <span className="text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                      {student.allergy}
                    </span>
                  )}
                </div>
              </div>

              {/* Breakfast Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="font-semibold text-textMuted flex items-center gap-2">
                  <span>Classroom Breakfast:</span>
                  {isLate && (
                    <span className="text-[11px] text-statusAmber font-normal">
                      (Student arrived late · Breakfast missed)
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4">
                  <label className={`flex items-center gap-1.5 cursor-pointer ${isLate ? 'opacity-40 cursor-not-allowed' : ''}`}>
                    <input
                      type="radio"
                      name={`bk-${student.sid}`}
                      disabled={isLate}
                      checked={!isLate && bkStatus === 'served'}
                      onChange={() => setStudentBreakfast(student.sid, 'served')}
                      className="accent-statusGreen"
                    />
                    <span className="text-xs font-medium text-textDark">Served</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name={`bk-${student.sid}`}
                      disabled={isLate}
                      checked={isLate || bkStatus === 'not_taken'}
                      onChange={() => setStudentBreakfast(student.sid, 'not_taken')}
                      className="accent-statusRed"
                    />
                    <span className="text-xs font-medium text-textDark">Did Not Take</span>
                  </label>
                </div>
              </div>

              {/* Lunch Row (5 distinct pills) */}
              <div className="space-y-2">
                <span className="text-xs font-semibold text-textMuted block">
                  Cafeteria Lunch Choice:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {/* Hot Entree A */}
                  <button
                    type="button"
                    onClick={() => setStudentLunch(student.sid, 'hotA')}
                    className={`px-3 py-2 text-xs font-semibold rounded-element min-h-touch transition-all border ${
                      currentLunch === 'hotA'
                        ? 'bg-brandTeal text-white border-brandTeal shadow-sm'
                        : 'bg-white text-textDark border-slateBorder hover:bg-slate-50'
                    }`}
                  >
                    Hot Entrée A
                  </button>

                  {/* Cold Entree B */}
                  <button
                    type="button"
                    onClick={() => setStudentLunch(student.sid, 'coldB')}
                    className={`px-3 py-2 text-xs font-semibold rounded-element min-h-touch transition-all border ${
                      currentLunch === 'coldB'
                        ? 'bg-brandNavy text-white border-brandNavy shadow-sm'
                        : 'bg-white text-textDark border-slateBorder hover:bg-slate-50'
                    }`}
                  >
                    Cold Entrée B
                  </button>

                  {/* Salad Bar */}
                  <button
                    type="button"
                    onClick={() => setStudentLunch(student.sid, 'salad')}
                    className={`px-3 py-2 text-xs font-semibold rounded-element min-h-touch transition-all border ${
                      currentLunch === 'salad'
                        ? 'bg-statusGreen text-white border-statusGreen shadow-sm'
                        : 'bg-white text-textDark border-slateBorder hover:bg-slate-50'
                    }`}
                  >
                    Salad Bar
                  </button>

                  {/* Own Lunch */}
                  <button
                    type="button"
                    onClick={() => setStudentLunch(student.sid, 'own')}
                    className={`px-3 py-2 text-xs font-semibold rounded-element min-h-touch transition-all border ${
                      currentLunch === 'own'
                        ? 'bg-slate-700 text-white border-slate-700 shadow-sm'
                        : 'bg-white text-textDark border-slateBorder hover:bg-slate-50'
                    }`}
                  >
                    Own Lunch
                  </button>

                  {/* Did Not Take Meal */}
                  <button
                    type="button"
                    onClick={() => setStudentLunch(student.sid, 'notake')}
                    className={`col-span-2 sm:col-span-1 px-3 py-2 text-xs font-semibold rounded-element min-h-touch transition-all border flex items-center justify-center gap-1 ${
                      currentLunch === 'notake'
                        ? 'bg-statusRed text-white border-statusRed shadow-sm'
                        : 'bg-red-50/50 text-statusRed border-red-200 hover:bg-red-100/50'
                    }`}
                  >
                    <Ban className="w-3.5 h-3.5" />
                    Did Not Take
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-canvas-pure border-t border-slateBorder p-4 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-textMuted font-medium">
            Step 2 of 3 complete · All present meal choices filled
          </div>
          <button
            onClick={() => setCurrentPage(4)}
            className="h-[48px] px-6 bg-brandTeal hover:bg-brandTeal-hover text-white text-sm md:text-base font-semibold rounded-element shadow-sm flex items-center gap-2 transition-transform active:scale-95 min-h-touch"
          >
            <span>Continue to Extended Care</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>
    </div>
  );
}
