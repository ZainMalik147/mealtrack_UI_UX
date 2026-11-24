import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Bell, AlertTriangle, Smartphone, Mail, CheckCircle2, MessageSquare } from 'lucide-react';

export default function Page23ChangeAlertEmailSms() {
  const { setCurrentPage } = useApp();
  const [activeTab, setActiveTab] = useState('both'); // 'both' | 'email' | 'sms'

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="border-b border-slateBorder pb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPage(19)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Change Alerts Stream
          </button>
          <h1 className="text-xl font-bold text-textDark tracking-tight">
            Kitchen Live Change Alert Email & SMS Template
          </h1>
          <p className="text-xs text-textMuted">
            Real-time push delivery template triggered whenever counts adjust past 9:00 AM cut-off
          </p>
        </div>

        {/* Tab Filter */}
        <div className="flex rounded-element p-1 bg-slate-100 border border-slateBorder gap-1 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('both')}
            className={`px-3 py-1 font-bold rounded transition-all ${
              activeTab === 'both' ? 'bg-white text-textDark shadow-sm' : 'text-textMuted'
            }`}
          >
            Both Views
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('email')}
            className={`px-3 py-1 font-bold rounded transition-all ${
              activeTab === 'email' ? 'bg-white text-textDark shadow-sm' : 'text-textMuted'
            }`}
          >
            Email Card
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sms')}
            className={`px-3 py-1 font-bold rounded transition-all ${
              activeTab === 'sms' ? 'bg-white text-textDark shadow-sm' : 'text-textMuted'
            }`}
          >
            SMS Text
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <main className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        {/* Urgent Red-Accented Notification Card (Email Layout) */}
        {(activeTab === 'both' || activeTab === 'email') && (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-textMuted flex items-center gap-1.5">
              <Mail className="w-4 h-4 text-statusRed" />
              Urgent Cafeteria Warmer Line Email
            </span>

            <div className="bg-white border-2 border-statusRed rounded-card overflow-hidden shadow-lg">
              {/* Urgent Header Banner */}
              <div className="bg-statusRed text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 animate-bounce" />
                  <span className="text-xs font-black uppercase tracking-wider">
                    Urgent Kitchen Line Broadcast
                  </span>
                </div>
                <span className="text-[11px] font-mono bg-red-800 px-2 py-0.5 rounded">
                  9:12 AM EST
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="border-b border-slate-100 pb-3">
                  <span className="text-xs text-statusRed font-bold uppercase tracking-wider">
                    Subject Line
                  </span>
                  <h2 className="text-lg font-black text-textDark tracking-tight mt-0.5">
                    🚨 MEAL COUNT CHANGE: Beacon Room 205 (+2 Lunches)
                  </h2>
                </div>

                <div className="text-xs space-y-1.5 text-textMuted">
                  <div className="flex justify-between">
                    <span>Originating Classroom:</span>
                    <span className="font-bold text-textDark">Beacon Elementary · Room 205</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Reporting Teacher:</span>
                    <span className="font-bold text-textDark">Mrs. Jennifer Ellis</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Transmission Time:</span>
                    <span className="font-mono text-textDark">9:12:38 AM EST</span>
                  </div>
                </div>

                {/* Urgent Action Highlight Box */}
                <div className="p-4 bg-red-50 border border-statusRed-border rounded-element space-y-2">
                  <span className="text-xs font-black text-statusRed uppercase tracking-wider flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4" />
                    Mandatory Kitchen Action
                  </span>
                  <p className="text-sm font-extrabold text-slate-900 leading-snug">
                    Add +1 Hot Entrée A (Halal) and +1 Cold Entrée B to Room 205 warmer cart.
                  </p>
                  <p className="text-xs text-textMuted">
                    Students: Caleb Williams (Arrived 9:12 AM) + Liam Carter (Switched from Own Lunch).
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="p-3 bg-slate-50 border-t border-slateBorder text-center text-[10px] text-textMuted font-mono">
                Dispatched via Azure SignalR Hub & SMTP Gateway · Room Cart #04
              </div>
            </div>
          </div>
        )}

        {/* SMS Text Bubble Card */}
        {(activeTab === 'both' || activeTab === 'sms') && (
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-textMuted flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-brandTeal" />
              Kitchen Lead SMS Alert Message
            </span>

            <div className="w-full max-w-sm mx-auto bg-slate-900 text-white rounded-[32px] p-5 shadow-xl border-4 border-slate-700 space-y-4">
              {/* Phone Status */}
              <div className="flex justify-between text-[10px] text-slate-400 font-mono border-b border-slate-800 pb-2">
                <span>SMS Gateway</span>
                <span>313-555-0100</span>
              </div>

              {/* Chat Bubble */}
              <div className="space-y-2">
                <div className="p-3.5 bg-slate-800 rounded-2xl rounded-tl-xs border border-slate-700 text-xs text-slate-100 space-y-2 leading-relaxed">
                  <p className="font-bold text-red-400">
                    🚨 MEALTRACK ALERT [Beacon Kitchen]:
                  </p>
                  <p>
                    Room 205 (Mrs. Ellis) added +2 lunches at 9:12 AM.
                  </p>
                  <p className="font-semibold text-white bg-slate-700/60 p-2 rounded">
                    Action: Put +1 Hot Entrée A (Halal) & +1 Cold Entrée B on Cart #205 now.
                  </p>
                  <div className="text-[10px] text-slate-400 text-right font-mono">
                    9:12 AM · Delivered
                  </div>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400">
                Automated notification sent to Beacon Kitchen Lead Christine Goodwin.
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
