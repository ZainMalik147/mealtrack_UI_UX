import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Send, CheckCircle2, Shield } from 'lucide-react';
import { api } from '../../../services/apiService';

export default function Page17InviteStaffForm() {
  const { setCurrentPage, setStaff, setLiveNotification } = useApp();

  const [fullName, setFullName] = useState('Marcus Vance');
  const [email, setEmail] = useState('mvance@hwschools.org');
  const [role, setRole] = useState('Classroom Teacher (K-5)');
  const [school, setSchool] = useState('Beacon Elementary');
  const [roomNumber, setRoomNumber] = useState('Room 208 · Grade 3');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) return;

    const newStaff = api.staff.invite({
      name: fullName,
      email,
      role: role.includes('Teacher') ? 'Teacher' : role,
      school,
      room: roomNumber
    });

    setStaff(api.staff.getAll());
    setLiveNotification({
      type: 'success',
      title: 'Staff Invitation Sent',
      message: `Google SSO onboarding invite emailed to ${fullName} (${email}).`
    });

    setTimeout(() => setCurrentPage(16), 1000);
  };

  return (
    <div className="max-w-xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="space-y-2 border-b border-slateBorder pb-4">
        <button
          onClick={() => setCurrentPage(16)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Staff Directory
        </button>
        <h1 className="text-2xl font-bold text-textDark tracking-tight">
          Invite New District Staff Member
        </h1>
        <p className="text-sm text-textMuted font-medium">
          Authorizes district Google Workspace account (@hwschools.org) for classroom meal registration
        </p>
      </header>

      {/* 1-Column Invite Form */}
      <main className="bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 1. Full Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
              1. Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Marcus Vance"
              required
              className="w-full px-4 py-2.5 border border-slateBorder rounded-element text-sm focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white"
            />
          </div>

          {/* 2. District Email */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
              2. District Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mvance@hwschools.org"
              required
              className="w-full px-4 py-2.5 border border-slateBorder rounded-element text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white"
            />
            <span className="text-[11px] text-textMuted block">
              Must match Google Workspace SSO account.
            </span>
          </div>

          {/* 3. Role */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
              3. Assigned Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2.5 border border-slateBorder rounded-element text-sm focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white text-textDark"
            >
              <option value="Classroom Teacher (K-5)">Classroom Teacher (K-5)</option>
              <option value="GSRP Pre-K Lead Teacher">GSRP Pre-K Lead Teacher</option>
              <option value="Kitchen Cafeteria Lead">Kitchen Cafeteria Lead</option>
              <option value="Enrichment / Latchkey Staff">Enrichment / Latchkey Staff</option>
              <option value="Food Service Assistant">Food Service Assistant</option>
            </select>
          </div>

          {/* 4. School */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
              4. School Campus
            </label>
            <select
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full px-4 py-2.5 border border-slateBorder rounded-element text-sm focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white text-textDark"
            >
              <option value="Beacon Elementary">Beacon Elementary</option>
              <option value="Tyrone Elementary">Tyrone Elementary</option>
              <option value="Harper Woods High School">Harper Woods High School</option>
            </select>
          </div>

          {/* 5. Room Number */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
              5. Room & Grade Assignment
            </label>
            <input
              type="text"
              value={roomNumber}
              onChange={(e) => setRoomNumber(e.target.value)}
              placeholder="e.g. Room 208 · Grade 3"
              required
              className="w-full px-4 py-2.5 border border-slateBorder rounded-element text-sm focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white"
            />
          </div>

          {/* Submit Button */}
          <div className="pt-3">
            <button
              type="submit"
              className="w-full h-[50px] bg-brandNavy hover:bg-slate-900 text-white text-sm md:text-base font-bold rounded-element shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-touch"
            >
              <Send className="w-4 h-4" />
              <span>Send Google SSO Invite Email</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
