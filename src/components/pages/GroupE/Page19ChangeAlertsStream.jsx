import React from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Bell, CheckCircle2, Clock, Check, AlertTriangle, ArrowRight, ShieldAlert, Mail } from 'lucide-react';
import { api } from '../../../services/apiService';

export default function Page19ChangeAlertsStream() {
  const { changeAlerts, setChangeAlerts, setCurrentPage, setLiveNotification } = useApp();

  const handleResolveAlert = (alert) => {
    const updated = api.kitchen.resolveAlert(alert.id);
    setChangeAlerts(updated);

    setLiveNotification({
      type: 'success',
      title: 'Alert Acknowledged',
      message: `Action recorded for ${alert.room}: ${alert.actionLabel || 'Processed'}`
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="border-b border-slateBorder pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPage(18)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Kitchen Preparation Board
          </button>
          <h1 className="text-2xl font-bold text-textDark tracking-tight">
            Today's Meal Count Changes
          </h1>
          <p className="text-sm text-textMuted font-medium">
            Chronological live feed of count additions, late arrivals, and revisions received past 9:00 AM
          </p>
        </div>

        {/* Link to Email/SMS Alert Template Preview (Page 23) */}
        <button
          onClick={() => setCurrentPage(23)}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-brandMaroon bg-red-50 hover:bg-red-100 border border-red-200 rounded-element transition-colors self-start sm:self-auto min-h-touch"
        >
          <Mail className="w-3.5 h-3.5 text-brandMaroon" />
          <span>Preview Kitchen Alert SMS / Email (Page 23)</span>
        </button>
      </header>

      {/* Feed Cards */}
      <main className="space-y-4">
        {changeAlerts.map((alert) => {
          const isResolved = alert.status === 'resolved';

          return (
            <div
              key={alert.id}
              className={`p-5 rounded-card border transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-sm ${
                isResolved
                  ? 'bg-slate-50 border-slateBorder opacity-65'
                  : 'bg-canvas-pure border-amber-300 ring-1 ring-amber-200/50'
              }`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`p-2.5 rounded-element mt-0.5 flex-shrink-0 ${
                    isResolved
                      ? 'bg-slate-200 text-slate-500'
                      : alert.type === 'late_arrival'
                      ? 'bg-amber-100 text-statusAmber'
                      : 'bg-teal-100 text-brandTeal'
                  }`}
                >
                  {isResolved ? (
                    <CheckCircle2 className="w-5 h-5 text-statusGreen" />
                  ) : (
                    <Clock className="w-5 h-5" />
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-textDark">
                      {alert.school} · {alert.room} ({alert.teacher})
                    </span>
                    <span className="text-[11px] font-mono text-textMuted bg-slate-100 px-2 py-0.5 rounded">
                      {alert.time}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-textDark">
                    {alert.message}
                  </p>
                  <p className="text-xs text-textMuted">
                    {alert.detail}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="self-end sm:self-center flex-shrink-0">
                {!isResolved ? (
                  <button
                    type="button"
                    onClick={() => handleResolveAlert(alert)}
                    className="px-4 py-2 bg-brandTeal hover:bg-brandTeal-hover text-white text-xs font-bold rounded-element shadow-sm transition-transform active:scale-95 flex items-center gap-1.5 min-h-touch"
                  >
                    <Check className="w-4 h-4" />
                    <span>{alert.actionLabel || 'Mark Added to Cart'}</span>
                  </button>
                ) : (
                  <span className="text-xs font-semibold text-statusGreen bg-emerald-50 border border-statusGreen-border px-3 py-1.5 rounded-element flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Processed & Ready
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </main>
    </div>
  );
}
