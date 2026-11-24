import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Radio, Bell, Maximize2, Minimize2, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function Page18KitchenPrepBoard() {
  const { kitchenTotals, changeAlerts, setCurrentPage } = useApp();
  const [isFullScreen, setIsFullScreen] = useState(false);

  const pendingAlertCount = changeAlerts.filter(a => a.status === 'pending').length;

  return (
    <div className={`space-y-6 animate-fadeIn pb-16 ${isFullScreen ? 'fixed inset-0 z-50 bg-slate-900 text-white p-6 overflow-y-auto' : 'max-w-5xl mx-auto px-4 py-8'}`}>
      {/* Header */}
      <header className={`border-b pb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${isFullScreen ? 'border-slate-800' : 'border-slateBorder'}`}>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
              isFullScreen
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : 'bg-emerald-50 text-statusGreen border-emerald-200'
            }`}>
              <Radio className="w-3.5 h-3.5 animate-pulse text-statusGreen" />
              SignalR Live Hub Active
            </span>
            <span className="text-xs text-textMuted font-mono">10-Foot Glanceable View</span>
          </div>

          <h1 className={`text-2xl md:text-3xl font-black tracking-tight ${isFullScreen ? 'text-white' : 'text-textDark'}`}>
            Beacon Elementary Central Kitchen · Live Preparation Counts
          </h1>
          <p className="text-sm text-textMuted font-medium">
            Master preparation queue for cafeteria warmer carts & lunch service lines
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {/* Alerts Feed Link */}
          <button
            onClick={() => setCurrentPage(19)}
            className="relative inline-flex items-center gap-2 px-4 py-2.5 bg-statusAmber hover:bg-amber-600 text-white text-xs font-bold rounded-element shadow-sm transition-transform active:scale-95 min-h-touch"
          >
            <Bell className="w-4 h-4" />
            <span>Change Alerts Stream</span>
            {pendingAlertCount > 0 && (
              <span className="w-5 h-5 bg-white text-statusAmber rounded-full text-[10px] font-black flex items-center justify-center">
                {pendingAlertCount}
              </span>
            )}
          </button>

          {/* Full Screen Toggle */}
          <button
            onClick={() => setIsFullScreen(!isFullScreen)}
            className={`p-2.5 rounded-element border transition-colors ${
              isFullScreen
                ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                : 'bg-canvas-pure text-textDark border-slateBorder hover:bg-slate-100'
            }`}
            title="Toggle Cafeteria Fullscreen Mode"
          >
            {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Large Metric Displays (Readable from 10 feet away) */}
      <main className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* HOT ENTRÉE A */}
        <div className={`border rounded-card p-6 shadow-sm flex flex-col justify-between transition-all ${
          isFullScreen
            ? 'bg-slate-800/80 border-slate-700'
            : 'bg-canvas-pure border-brandTeal/40 ring-1 ring-brandTeal/20'
        }`}>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brandTeal">
              Primary Hot Entrée
            </span>
            <h2 className={`text-lg md:text-xl font-bold ${isFullScreen ? 'text-white' : 'text-textDark'}`}>
              HOT ENTRÉE A: Golden Chicken Strips (Halal)
            </h2>
          </div>
          <div className="pt-6">
            <span className="text-6xl md:text-7xl font-black text-brandTeal tracking-tight block">
              {kitchenTotals.hotEntreeA || 418}
            </span>
            <span className="text-xs font-medium text-textMuted uppercase tracking-wider">
              Total Meals to Heat
            </span>
          </div>
        </div>

        {/* COLD ENTRÉE B */}
        <div className={`border rounded-card p-6 shadow-sm flex flex-col justify-between transition-all ${
          isFullScreen
            ? 'bg-slate-800/80 border-slate-700'
            : 'bg-canvas-pure border-slateBorder'
        }`}>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-brandNavy">
              Secondary Cold Entrée
            </span>
            <h2 className={`text-lg md:text-xl font-bold ${isFullScreen ? 'text-white' : 'text-textDark'}`}>
              COLD ENTRÉE B: Italian Flatbread
            </h2>
          </div>
          <div className="pt-6">
            <span className="text-6xl md:text-7xl font-black text-brandNavy tracking-tight block">
              {kitchenTotals.coldEntreeB || 214}
            </span>
            <span className="text-xs font-medium text-textMuted uppercase tracking-wider">
              Total Pre-Pack Meals
            </span>
          </div>
        </div>

        {/* SALAD BAR */}
        <div className={`border rounded-card p-6 shadow-sm flex flex-col justify-between transition-all ${
          isFullScreen
            ? 'bg-slate-800/80 border-slate-700'
            : 'bg-canvas-pure border-slateBorder'
        }`}>
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-statusGreen">
              Fresh Daily
            </span>
            <h2 className={`text-lg md:text-xl font-bold ${isFullScreen ? 'text-white' : 'text-textDark'}`}>
              SALAD BAR: Garden Veggie Bowl
            </h2>
          </div>
          <div className="pt-6">
            <span className="text-6xl md:text-7xl font-black text-statusGreen tracking-tight block">
              {kitchenTotals.saladBar || 120}
            </span>
            <span className="text-xs font-medium text-textMuted uppercase tracking-wider">
              Total Salad Bowls & Rolls
            </span>
          </div>
        </div>

        {/* OWN LUNCH (NO PREP) */}
        <div className={`border rounded-card p-5 shadow-sm flex items-center justify-between transition-all ${
          isFullScreen
            ? 'bg-slate-800/60 border-slate-700'
            : 'bg-canvas-pure border-slateBorder'
        }`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-textMuted block">
              Bringing from Home
            </span>
            <h3 className={`text-base font-bold ${isFullScreen ? 'text-white' : 'text-textDark'}`}>
              OWN LUNCH (NO PREP)
            </h3>
            <span className="text-xs text-textMuted">Carton milk only</span>
          </div>
          <span className="text-4xl font-extrabold text-slate-500">
            {kitchenTotals.ownLunch || 46}
          </span>
        </div>

        {/* DID NOT TAKE MEAL */}
        <div className={`border rounded-card p-5 shadow-sm flex items-center justify-between transition-all ${
          isFullScreen
            ? 'bg-slate-800/60 border-slate-700'
            : 'bg-canvas-pure border-slateBorder'
        }`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-statusRed block">
              Fasting / Dietary Skip
            </span>
            <h3 className={`text-base font-bold ${isFullScreen ? 'text-white' : 'text-textDark'}`}>
              DID NOT TAKE MEAL
            </h3>
            <span className="text-xs text-textMuted">No meal prepared</span>
          </div>
          <span className="text-4xl font-extrabold text-statusRed">
            {kitchenTotals.didNotTakeMeal || 18}
          </span>
        </div>

        {/* Consolidated Total Prep */}
        <div className={`border rounded-card p-5 shadow-sm flex items-center justify-between transition-all ${
          isFullScreen
            ? 'bg-emerald-950/40 border-emerald-800'
            : 'bg-emerald-50/50 border-emerald-200'
        }`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-statusGreen block">
              Kitchen Production Total
            </span>
            <h3 className={`text-base font-bold ${isFullScreen ? 'text-emerald-300' : 'text-statusGreen'}`}>
              TOTAL COOK / PREP MEALS
            </h3>
            <span className="text-xs text-textMuted">Hot A + Cold B + Salad</span>
          </div>
          <span className="text-4xl font-black text-statusGreen">
            {(kitchenTotals.hotEntreeA || 418) + (kitchenTotals.coldEntreeB || 214) + (kitchenTotals.saladBar || 120)}
          </span>
        </div>
      </main>

      {/* Footer */}
      <footer className={`pt-4 border-t flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono text-textMuted gap-2 ${
        isFullScreen ? 'border-slate-800' : 'border-slateBorder'
      }`}>
        <span>Last updated live via SignalR: {kitchenTotals.lastUpdated || '8:49 AM'}</span>
        <span>Beacon Kitchen Hub · Cluster Node: US-EAST-WEB02</span>
      </footer>
    </div>
  );
}
