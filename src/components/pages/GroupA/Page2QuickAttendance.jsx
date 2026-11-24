import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, ArrowRight, Check, CheckCheck, Clock, ShieldAlert } from 'lucide-react';

export default function Page2QuickAttendance() {
  const {
    students,
    attendance,
    arrivalTimes,
    leaveLateReasons,
    setStudentAttendance,
    markAllPresent,
    setCurrentPage
  } = useApp();

  const [promptStudent, setPromptStudent] = useState(null); // for Late prompt
  const [customArrivalTime, setCustomArrivalTime] = useState('9:08 AM');
  const [leaveLateStudent, setLeaveLateStudent] = useState(null); // for Leave Late prompt
  const [customLeaveReason, setCustomLeaveReason] = useState('Latchkey');

  // Count active present/late/leave_late
  const activeCount = students.filter(s => {
    const status = attendance[s.sid] || 'present';
    return status === 'present' || status === 'late' || status === 'leave_late';
  }).length;

  const handleSelectStatus = (student, status) => {
    if (status === 'late') {
      setPromptStudent(student);
      setCustomArrivalTime(arrivalTimes[student.sid] || '9:08 AM');
    } else if (status === 'leave_late') {
      setLeaveLateStudent(student);
      setCustomLeaveReason(leaveLateReasons[student.sid] || (student.latchkey ? 'Latchkey' : 'Tutoring'));
    } else {
      setStudentAttendance(student.sid, status);
    }
  };

  const confirmLate = () => {
    if (promptStudent) {
      setStudentAttendance(promptStudent.sid, 'late', customArrivalTime);
      setPromptStudent(null);
    }
  };

  const confirmLeaveLate = () => {
    if (leaveLateStudent) {
      setStudentAttendance(leaveLateStudent.sid, 'leave_late', '9:08 AM', customLeaveReason);
      setLeaveLateStudent(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-24">
      {/* Step Header with 33% Progress Bar */}
      <header className="space-y-3 border-b border-slateBorder pb-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(1)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Room Overview
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-brandTeal bg-teal-50 border border-teal-200 px-2.5 py-0.5 rounded-full">
            Step 1 of 3
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-textDark tracking-tight">
              Mark Morning Attendance
            </h1>
            <p className="text-sm text-textMuted font-medium">
              Beacon Elementary · Room 205 (Grade 2) · Mrs. Jennifer Ellis
            </p>
          </div>

          {/* Quick Action: Mark All Present (Ghost Button) */}
          <button
            onClick={markAllPresent}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-brandTeal border border-brandTeal/30 hover:bg-brandTeal-light rounded-element transition-colors self-start sm:self-auto min-h-touch"
          >
            <CheckCheck className="w-4 h-4 text-brandTeal" />
            Mark All Present
          </button>
        </div>

        {/* 33% Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div
            className="bg-brandTeal h-full rounded-full transition-all duration-300"
            style={{ width: '33.33%' }}
          />
        </div>
      </header>

      {/* Student List - Spacious Vertical Stack */}
      <main className="space-y-3">
        {students.map((student) => {
          const currentStatus = attendance[student.sid] || 'present';
          const arrivalTime = arrivalTimes[student.sid];
          const leaveReason = leaveLateReasons[student.sid];

          return (
            <div
              key={student.sid}
              className={`bg-canvas-pure border rounded-card p-4 transition-all duration-150 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                currentStatus === 'absent'
                  ? 'border-statusRed-border bg-red-50/20'
                  : currentStatus === 'late'
                  ? 'border-statusAmber-border bg-amber-50/20'
                  : currentStatus === 'leave_late'
                  ? 'border-statusIndigo-border bg-indigo-50/20'
                  : 'border-slateBorder hover:border-slate-300'
              }`}
            >
              {/* Student Identity */}
              <div className="flex items-center gap-3.5">
                <div className="relative flex-shrink-0">
                  <img
                    src={student.photoUrl}
                    alt={`${student.firstName} ${student.lastName}`}
                    className="w-12 h-12 rounded-full object-cover border border-slateBorder bg-slate-100"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = '/images/students/jordan.png';
                    }}
                  />
                  {student.allergy && (
                    <span
                      title={student.allergy}
                      className="absolute -top-1 -right-1 w-4 h-4 bg-statusRed text-white rounded-full flex items-center justify-center text-[10px] font-bold"
                    >
                      !
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-textDark">
                      {student.firstName} {student.lastName}
                    </span>
                    {student.diet && student.diet !== 'Standard' && (
                      <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                        {student.diet}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-textMuted font-mono">
                    <span>ID #{student.sid}</span>
                    {currentStatus === 'late' && arrivalTime && (
                      <span className="text-statusAmber font-sans font-semibold">
                        · Arrived {arrivalTime}
                      </span>
                    )}
                    {currentStatus === 'leave_late' && (
                      <span className="text-statusIndigo font-sans font-semibold">
                        · Tagged: {leaveReason || 'Latchkey'}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* 4-Button Segmented Selector */}
              <div className="flex items-center rounded-element p-1 bg-slate-100 border border-slateBorder gap-1 self-stretch md:self-auto overflow-x-auto">
                {/* Present Button */}
                <button
                  type="button"
                  onClick={() => handleSelectStatus(student, 'present')}
                  className={`flex-1 md:flex-initial px-3.5 py-2 text-xs font-semibold rounded-element min-h-touch transition-all flex items-center justify-center gap-1.5 ${
                    currentStatus === 'present'
                      ? 'bg-statusGreen text-white shadow-sm'
                      : 'text-textDark hover:bg-white'
                  }`}
                >
                  {currentStatus === 'present' && <Check className="w-3.5 h-3.5" />}
                  Present
                </button>

                {/* Late Button */}
                <button
                  type="button"
                  onClick={() => handleSelectStatus(student, 'late')}
                  className={`flex-1 md:flex-initial px-3.5 py-2 text-xs font-semibold rounded-element min-h-touch transition-all flex items-center justify-center gap-1.5 ${
                    currentStatus === 'late'
                      ? 'bg-statusAmber text-white shadow-sm'
                      : 'text-textDark hover:bg-white'
                  }`}
                >
                  {currentStatus === 'late' && <Clock className="w-3.5 h-3.5" />}
                  Late
                </button>

                {/* Leave Late Button */}
                <button
                  type="button"
                  onClick={() => handleSelectStatus(student, 'leave_late')}
                  className={`flex-1 md:flex-initial px-3.5 py-2 text-xs font-semibold rounded-element min-h-touch transition-all flex items-center justify-center gap-1.5 ${
                    currentStatus === 'leave_late'
                      ? 'bg-statusIndigo text-white shadow-sm'
                      : 'text-textDark hover:bg-white'
                  }`}
                >
                  Leave Late
                </button>

                {/* Absent Button */}
                <button
                  type="button"
                  onClick={() => handleSelectStatus(student, 'absent')}
                  className={`flex-1 md:flex-initial px-3.5 py-2 text-xs font-semibold rounded-element min-h-touch transition-all flex items-center justify-center gap-1.5 ${
                    currentStatus === 'absent'
                      ? 'bg-statusRed text-white shadow-sm'
                      : 'text-textDark hover:bg-white'
                  }`}
                >
                  Absent
                </button>
              </div>
            </div>
          );
        })}
      </main>

      {/* Sticky Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-canvas-pure border-t border-slateBorder p-4 z-40 shadow-lg">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <div className="text-xs md:text-sm text-textMuted font-medium">
            <span className="font-bold text-textDark">{activeCount}</span> of {students.length} students Present / Late
          </div>
          <button
            onClick={() => setCurrentPage(3)}
            className="h-[48px] px-6 bg-brandTeal hover:bg-brandTeal-hover text-white text-sm md:text-base font-semibold rounded-element shadow-sm flex items-center gap-2 transition-transform active:scale-95 min-h-touch"
          >
            <span>Continue to Meal Choices ({activeCount} Present/Late)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </footer>

      {/* Late Arrival Prompt Modal */}
      {promptStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-canvas-pure border border-slateBorder rounded-card max-w-sm w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-textDark flex items-center gap-2">
              <Clock className="w-5 h-5 text-statusAmber" />
              Record Arrival Time
            </h3>
            <p className="text-sm text-textMuted">
              Enter the arrival time for <span className="font-semibold text-textDark">{promptStudent.firstName} {promptStudent.lastName}</span>:
            </p>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-textDark block">
                Arrival Time (Default: 9:08 AM)
              </label>
              <input
                type="text"
                value={customArrivalTime}
                onChange={(e) => setCustomArrivalTime(e.target.value)}
                placeholder="e.g. 9:08 AM"
                className="w-full px-3 py-2 border border-slateBorder rounded-element text-sm focus:outline-none focus:ring-2 focus:ring-statusAmber"
              />
              <span className="text-xs text-textMuted block">
                * Note: Classroom breakfast will automatically be marked "Missed/Not Taken".
              </span>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setPromptStudent(null)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-textDark text-xs font-semibold rounded-element"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLate}
                className="flex-1 py-2 bg-statusAmber hover:bg-amber-600 text-white text-xs font-semibold rounded-element"
              >
                Confirm Late
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Late Prompt Modal */}
      {leaveLateStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-canvas-pure border border-slateBorder rounded-card max-w-sm w-full p-6 shadow-xl space-y-4">
            <h3 className="text-base font-bold text-textDark flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-statusIndigo"></span>
              Extended Day & Care Program
            </h3>
            <p className="text-sm text-textMuted">
              Select after-school destination for <span className="font-semibold text-textDark">{leaveLateStudent.firstName} {leaveLateStudent.lastName}</span>:
            </p>
            <div className="space-y-2">
              {['Latchkey', 'Tutoring', 'Art Studio', 'Hoops & Fitness'].map((reason) => (
                <label
                  key={reason}
                  className={`flex items-center justify-between p-2.5 border rounded-element cursor-pointer text-xs font-medium transition-colors ${
                    customLeaveReason === reason
                      ? 'border-statusIndigo bg-indigo-50 text-statusIndigo font-bold'
                      : 'border-slateBorder hover:bg-slate-50 text-textDark'
                  }`}
                >
                  <span>{reason}</span>
                  <input
                    type="radio"
                    name="leaveReason"
                    checked={customLeaveReason === reason}
                    onChange={() => setCustomLeaveReason(reason)}
                    className="accent-statusIndigo"
                  />
                </label>
              ))}
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setLeaveLateStudent(null)}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-textDark text-xs font-semibold rounded-element"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmLeaveLate}
                className="flex-1 py-2 bg-statusIndigo hover:bg-indigo-700 text-white text-xs font-semibold rounded-element"
              >
                Tag Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
