import React, { useState } from 'react';
import { X, Check, FileDown, ShieldCheck, Clock, Users, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function GsrpModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  // GSRP Sample Students (Pre-K Room 101)
  const [students, setStudents] = useState([
    { sid: '20030112', name: 'Amari Jones', photo: '/images/students/amari.png', present: true, meal: true, snack: true },
    { sid: '20030145', name: 'Sofia Lopez', photo: '/images/students/sofia.png', present: true, meal: true, snack: true, allergy: 'Egg allergy' },
    { sid: '20030177', name: 'Jayden Price', photo: '/images/students/jayden.png', present: true, meal: true, snack: true },
    { sid: '20030204', name: 'Aaliyah Grant', photo: '/images/students/aaliyah.png', present: true, meal: true, snack: true },
    { sid: '20030230', name: 'Zoe Mitchell', photo: '/images/students/zoe.png', present: true, meal: true, snack: true },
    { sid: '20030288', name: 'Lucas Martin', photo: '/images/students/lucas.png', present: false, meal: false, snack: false },
  ]);

  const [activeTab, setActiveTab] = useState('daily'); // 'daily' | 'weeklySheet'
  const [signature, setSignature] = useState('Dana Owens');
  const [isSigned, setIsSigned] = useState(false);

  const togglePresent = (sid) => {
    setStudents(prev => prev.map(s => {
      if (s.sid === sid) {
        const nextPres = !s.present;
        return {
          ...s,
          present: nextPres,
          meal: nextPres,
          snack: nextPres
        };
      }
      return s;
    }));
  };

  const toggleMeal = (sid) => {
    setStudents(prev => prev.map(s => s.sid === sid ? { ...s, meal: !s.meal } : s));
  };

  const toggleSnack = (sid) => {
    setStudents(prev => prev.map(s => s.sid === sid ? { ...s, snack: !s.snack } : s));
  };

  const handleSignTransmit = () => {
    if (!signature.trim()) return;
    setIsSigned(true);
    try {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    } catch {}
  };

  const presentCount = students.filter(s => s.present).length;
  const mealCount = students.filter(s => s.meal).length;
  const snackCount = students.filter(s => s.snack).length;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-canvas-pure border border-slateBorder rounded-card max-w-4xl w-full p-6 shadow-2xl space-y-5 my-8">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slateBorder pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-statusIndigo bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                GSRP Pre-K Workflow
              </span>
              <span className="text-xs text-textMuted">MDE Family Style Provision</span>
            </div>
            <h2 className="text-xl font-bold text-textDark">
              Beacon Elementary · Room 101 (GSRP Pre-K)
            </h2>
            <p className="text-xs text-textMuted">
              Lead Teacher: <span className="font-semibold text-textDark">Ms. Dana Owens</span> · Present children fed family style (No choices needed)
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-textMuted hover:text-textDark hover:bg-slate-100 rounded-element text-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-element p-1 bg-slate-100 border border-slateBorder gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('daily')}
            className={`flex-1 py-2 font-bold rounded-element transition-all ${
              activeTab === 'daily' ? 'bg-white text-textDark shadow-sm' : 'text-textMuted hover:text-textDark'
            }`}
          >
            Today's 9:00 AM Family Style Count
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('weeklySheet')}
            className={`flex-1 py-2 font-bold rounded-element transition-all ${
              activeTab === 'weeklySheet' ? 'bg-white text-textDark shadow-sm' : 'text-textMuted hover:text-textDark'
            }`}
          >
            MDE 5-Day Weekly Check-Off Sheet (Export)
          </button>
        </div>

        {activeTab === 'daily' ? (
          /* Daily Count Tab */
          <div className="space-y-4">
            <div className="p-3 bg-indigo-50/60 border border-indigo-200 rounded-element flex items-center justify-between text-xs">
              <span className="font-semibold text-statusIndigo">
                Present: {presentCount} of {students.length} · Meals Served: {mealCount} · Snacks: {snackCount}
              </span>
              <span className="text-textMuted">Due by 9:00 AM</span>
            </div>

            {/* Students Table */}
            <div className="border border-slateBorder rounded-card overflow-hidden">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-50 border-b border-slateBorder font-bold text-textMuted uppercase tracking-wider">
                  <tr>
                    <th className="py-2.5 px-3">Student</th>
                    <th className="py-2.5 px-3 text-center">Attendance</th>
                    <th className="py-2.5 px-3 text-center">Family Meal</th>
                    <th className="py-2.5 px-3 text-center">Afternoon Snack</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slateBorder">
                  {students.map((student) => (
                    <tr key={student.sid} className="hover:bg-slate-50/50">
                      <td className="py-2.5 px-3 font-bold text-textDark flex items-center gap-2.5">
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-7 h-7 rounded-full object-cover border border-slateBorder"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = '/images/students/amari.png';
                          }}
                        />
                        <div>
                          <span>{student.name}</span>
                          <span className="text-[10px] text-textMuted font-mono block">#{student.sid}</span>
                        </div>
                      </td>

                      <td className="py-2.5 px-3 text-center">
                        <button
                          type="button"
                          onClick={() => togglePresent(student.sid)}
                          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                            student.present
                              ? 'bg-statusGreen text-white'
                              : 'bg-statusRed text-white'
                          }`}
                        >
                          {student.present ? 'Present' : 'Absent'}
                        </button>
                      </td>

                      <td className="py-2.5 px-3 text-center">
                        <button
                          type="button"
                          disabled={!student.present}
                          onClick={() => toggleMeal(student.sid)}
                          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                            student.meal
                              ? 'bg-brandTeal text-white'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {student.meal ? 'Meal Served' : 'No Meal'}
                        </button>
                      </td>

                      <td className="py-2.5 px-3 text-center">
                        <button
                          type="button"
                          disabled={!student.present}
                          onClick={() => toggleSnack(student.sid)}
                          className={`px-3 py-1 rounded text-xs font-bold transition-colors ${
                            student.snack
                              ? 'bg-statusIndigo text-white'
                              : 'bg-slate-100 text-slate-400'
                          }`}
                        >
                          {student.snack ? 'Snack Served' : 'No Snack'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legal Attestation Section */}
            <div className="p-4 bg-slate-50 border border-slateBorder rounded-element space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-textDark">
                <ShieldCheck className="w-4 h-4 text-statusGreen" />
                <span>MDE Child Care Food Program Certification</span>
              </div>
              <p className="text-[11px] text-textMuted leading-relaxed">
                "I certify that these meals and snacks were served in Room 101 to enrolled GSRP pre-kindergarten children in accordance with Michigan Department of Education Child and Adult Care Food Program (CACFP) family style rules."
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  value={signature}
                  onChange={(e) => setSignature(e.target.value)}
                  placeholder="Type full legal name"
                  className="w-full sm:flex-1 px-3 py-2 border border-slateBorder rounded-element text-sm font-serif italic text-textDark bg-white"
                />
                <button
                  type="button"
                  onClick={handleSignTransmit}
                  disabled={isSigned}
                  className="w-full sm:w-auto px-5 py-2.5 bg-statusIndigo hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold rounded-element transition-colors flex items-center justify-center gap-2 min-h-touch"
                >
                  <Check className="w-4 h-4" />
                  <span>{isSigned ? 'Signed & Transmitted ✓' : 'Sign & Submit GSRP Count'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Weekly Sheet Tab */
          <div className="space-y-4">
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-textDark block">
                  Michigan Department of Education 5-Day Weekly Sheet
                </span>
                <span className="text-textMuted">
                  Week of November 23 – November 27, 2026 · Room 101
                </span>
              </div>
              <button
                type="button"
                onClick={() => alert('Exporting MDE GSRP 5-Day Audit PDF...')}
                className="px-3 py-1.5 bg-brandNavy hover:bg-slate-900 text-white text-xs font-bold rounded-element flex items-center gap-1.5 shadow-sm"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>Download Signed Audit PDF</span>
              </button>
            </div>

            <div className="border border-slateBorder rounded-card overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead className="bg-slate-100 border-b border-slateBorder font-bold text-textDark">
                  <tr>
                    <th className="p-2">Student Name</th>
                    <th className="p-2 text-center">Mon (M/S)</th>
                    <th className="p-2 text-center">Tue (M/S)</th>
                    <th className="p-2 text-center">Wed (M/S)</th>
                    <th className="p-2 text-center">Thu (M/S)</th>
                    <th className="p-2 text-center">Fri (M/S)</th>
                    <th className="p-2 text-right">Weekly Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  {students.map((s) => (
                    <tr key={s.sid}>
                      <td className="p-2 font-bold font-sans text-textDark">{s.name}</td>
                      <td className="p-2 text-center">✓ / ✓</td>
                      <td className="p-2 text-center">{s.present ? '✓ / ✓' : '—'}</td>
                      <td className="p-2 text-center">✓ / ✓</td>
                      <td className="p-2 text-center">✓ / ✓</td>
                      <td className="p-2 text-center">✓ / ✓</td>
                      <td className="p-2 text-right font-bold text-brandTeal">
                        {s.present ? '10/10' : '8/10'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-[11px] font-mono text-textMuted bg-slate-50 p-2.5 rounded border border-slateBorder flex justify-between">
              <span>Audited by: Food Service Director Brian Corbett</span>
              <span>Reimbursement Claim: CACFP Tier 1 Rate</span>
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-slateBorder flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-textDark text-xs font-semibold rounded-element"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
