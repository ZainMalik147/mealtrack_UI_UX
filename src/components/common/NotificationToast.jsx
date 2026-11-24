import React from 'react';
import { useApp } from '../../context/AppContext';
import { Radio, AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

export default function NotificationToast() {
  const { liveNotification, setLiveNotification } = useApp();

  if (!liveNotification) return null;

  const isSignalR = liveNotification.type === 'signalr';
  const isAlert = liveNotification.type === 'alert';
  const isSuccess = liveNotification.type === 'success';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full animate-bounce-short">
      <div className={`p-4 rounded-card border shadow-xl flex items-start gap-3 ${
        isSignalR
          ? 'bg-slate-900 text-white border-brandTeal ring-1 ring-brandTeal'
          : isAlert
          ? 'bg-white text-textDark border-statusRed ring-1 ring-statusRed/30'
          : isSuccess
          ? 'bg-white text-textDark border-statusGreen ring-1 ring-statusGreen/30'
          : 'bg-white text-textDark border-slateBorder'
      }`}>
        <div className={`p-2 rounded-element flex-shrink-0 ${
          isSignalR
            ? 'bg-teal-950 text-brandTeal'
            : isAlert
            ? 'bg-red-50 text-statusRed'
            : 'bg-emerald-50 text-statusGreen'
        }`}>
          {isSignalR ? (
            <Radio className="w-5 h-5 animate-pulse" />
          ) : isAlert ? (
            <AlertTriangle className="w-5 h-5 animate-bounce" />
          ) : (
            <CheckCircle className="w-5 h-5" />
          )}
        </div>

        <div className="flex-1 space-y-0.5 text-xs">
          <span className={`font-bold block ${isSignalR ? 'text-teal-300' : 'text-textDark'}`}>
            {liveNotification.title}
          </span>
          <p className={`${isSignalR ? 'text-slate-300' : 'text-textMuted'} leading-relaxed`}>
            {liveNotification.message}
          </p>
        </div>

        <button
          onClick={() => setLiveNotification(null)}
          className={`p-1 rounded text-xs hover:opacity-75 ${isSignalR ? 'text-slate-400' : 'text-textMuted'}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
