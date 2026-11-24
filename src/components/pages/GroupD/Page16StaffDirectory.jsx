import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Plus, Mail, CheckCircle2, AlertTriangle, Send, Edit } from 'lucide-react';
import { api } from '../../../services/apiService';

export default function Page16StaffDirectory() {
  const { staff, setStaff, setCurrentPage, setLiveNotification } = useApp();

  const handleRemind = (staffMember) => {
    const updated = api.staff.sendReminder(staffMember.id);
    setStaff(updated);
    setLiveNotification({
      type: 'info',
      title: 'Count Reminder Sent',
      message: `SMS & Email count reminder dispatched to ${staffMember.name} (${staffMember.email}).`
    });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="border-b border-slateBorder pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPage(15)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to District Dashboard
          </button>
          <h1 className="text-2xl font-bold text-textDark tracking-tight">
            District Staff & Classrooms
          </h1>
          <p className="text-sm text-textMuted font-medium">
            Authorized teachers, kitchen personnel, and room assignments for Harper Woods Schools
          </p>
        </div>

        <button
          onClick={() => setCurrentPage(17)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-brandNavy hover:bg-slate-900 text-white text-xs font-semibold rounded-element shadow-sm transition-transform active:scale-95 self-start sm:self-auto min-h-touch"
        >
          <Plus className="w-4 h-4" />
          <span>+ Invite New Staff Member</span>
        </button>
      </header>

      {/* Table (Clean, spacious rows) */}
      <main className="bg-canvas-pure border border-slateBorder rounded-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slateBorder text-xs font-bold text-textMuted uppercase tracking-wider">
                <th className="py-3 px-4">Staff Name</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">School & Room</th>
                <th className="py-3 px-4">District Email</th>
                <th className="py-3 px-4">Today's Count Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slateBorder text-sm">
              {staff.map((person) => {
                const isSubmitted = person.countStatus.includes('Submitted');
                const isPending = person.countStatus.includes('Pending');

                return (
                  <tr key={person.id} className="hover:bg-slate-50/60 transition-colors">
                    {/* Staff Name */}
                    <td className="py-4 px-4 font-bold text-textDark whitespace-nowrap">
                      {person.name}
                    </td>

                    {/* Role */}
                    <td className="py-4 px-4 text-xs">
                      <span className="font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
                        {person.role}
                      </span>
                    </td>

                    {/* School & Room */}
                    <td className="py-4 px-4 text-xs font-medium text-textDark whitespace-nowrap">
                      {person.school} · {person.room}
                    </td>

                    {/* Email */}
                    <td className="py-4 px-4 text-xs font-mono text-textMuted whitespace-nowrap">
                      {person.email}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {isSubmitted ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-statusGreen bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {person.countStatus}
                        </span>
                      ) : isPending ? (
                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-statusAmber bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
                          <AlertTriangle className="w-3.5 h-3.5" />
                          {person.countStatus}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-textMuted bg-slate-100 px-2 py-0.5 rounded-full">
                          {person.countStatus}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      {person.canRemind ? (
                        <button
                          type="button"
                          onClick={() => handleRemind(person)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-statusAmber bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-element transition-colors"
                        >
                          <Send className="w-3 h-3" />
                          <span>Remind</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-textDark hover:bg-slate-100 border border-slateBorder rounded-element transition-colors"
                        >
                          <Edit className="w-3 h-3 text-textMuted" />
                          <span>Edit</span>
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
