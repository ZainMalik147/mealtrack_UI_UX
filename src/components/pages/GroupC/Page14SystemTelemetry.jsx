import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, Radio, MessageSquare, Database, Server, RefreshCw, CheckCircle, ShieldCheck } from 'lucide-react';

export default function Page14SystemTelemetry() {
  const { telemetry, setCurrentPage, setLiveNotification } = useApp();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleManualSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLiveNotification({
        type: 'info',
        title: 'Telemetry Synced',
        message: 'Real-time telemetry poll completed across all 14 tenant clusters.'
      });
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="border-b border-slateBorder pb-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <button
            onClick={() => setCurrentPage(10)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Master Console
          </button>
          <h1 className="text-2xl font-bold text-textDark tracking-tight">
            System Health & Automated Services
          </h1>
          <p className="text-sm text-textMuted font-medium">
            Live infrastructure diagnostics, SignalR websocket hubs, and background worker state
          </p>
        </div>

        <button
          onClick={handleManualSync}
          disabled={isRefreshing}
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-brandNavy bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-element transition-colors self-start sm:self-auto min-h-touch"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Telemetry</span>
        </button>
      </header>

      {/* Main 3 Diagnostic Cards */}
      <main className="space-y-5">
        {/* Card 1: SignalR Real-Time Hub */}
        <section className="bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm space-y-4 hover:border-slate-300 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-50 border border-emerald-200 text-statusGreen rounded-element">
                <Radio className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-textMuted">
                  Live Change Distribution
                </span>
                <h2 className="text-lg font-bold text-textDark">
                  SignalR Real-Time Hub
                </h2>
              </div>
            </div>
            <span className="text-xs font-bold text-statusGreen bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Connected · 42 Kitchens Active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
              <span className="text-textMuted block">Active Socket Clients:</span>
              <span className="text-base font-bold text-textDark">230 Connections</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
              <span className="text-textMuted block">P99 Hub Latency:</span>
              <span className="text-base font-bold text-statusGreen">14 ms</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
              <span className="text-textMuted block">Broadcast Protocol:</span>
              <span className="text-base font-bold text-textDark">WebSockets + TLS</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
              <span className="text-textMuted block">Azure Tier:</span>
              <span className="text-base font-bold text-textDark">Standard S3 Units</span>
            </div>
          </div>
        </section>

        {/* Card 2: Morning SMS Reminders */}
        <section className="bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm space-y-4 hover:border-slate-300 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 border border-indigo-200 text-statusIndigo rounded-element">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-textMuted">
                  Automated Background Job
                </span>
                <h2 className="text-lg font-bold text-textDark">
                  Morning SMS Reminders (7:00 AM Queue)
                </h2>
              </div>
            </div>
            <span className="text-xs font-bold text-statusIndigo bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
              38/38 Sent · 0 Failed
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
              <span className="text-textMuted block">Scheduled Time:</span>
              <span className="text-base font-bold text-textDark">07:00:00 AM EST</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
              <span className="text-textMuted block">Delivery Provider:</span>
              <span className="text-base font-bold text-textDark">Azure Comm Services</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
              <span className="text-textMuted block">Success Rate:</span>
              <span className="text-base font-bold text-statusGreen">100.0% Delivered</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slateBorder rounded-element">
              <span className="text-textMuted block">Next Scheduled Run:</span>
              <span className="text-base font-bold text-textDark">Tomorrow 7:00 AM</span>
            </div>
          </div>
        </section>

        {/* Card 3: MDE Audit Log & Azure SQL */}
        <section className="bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm space-y-4 hover:border-slate-300 transition-colors">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-teal-50 border border-teal-200 text-brandTeal rounded-element">
                <Database className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-textMuted">
                  Compliance Archive Storage
                </span>
                <h2 className="text-lg font-bold text-textDark">
                  MDE Audit Log & Attestations
                </h2>
              </div>
            </div>
            <span className="text-xs font-bold text-brandTeal bg-teal-50 border border-teal-200 px-3 py-1 rounded-full">
              All signed attestations backed up in Azure SQL
            </span>
          </div>

          <div className="p-4 bg-slate-50 border border-slateBorder rounded-element space-y-2 text-xs">
            <div className="flex justify-between text-textDark font-medium">
              <span>Database Cluster:</span>
              <span className="font-mono">mealtrack-eastus-prod.database.windows.net</span>
            </div>
            <div className="flex justify-between text-textDark font-medium">
              <span>Digital Signature Retention:</span>
              <span>3 Years Mandated (USDA / MDE Compliance Archive)</span>
            </div>
            <div className="flex justify-between text-textDark font-medium">
              <span>PAdES PDF Seals:</span>
              <span className="text-statusGreen font-semibold">Valid & Immutable</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
