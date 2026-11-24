import React from 'react';
import { useApp } from '../../../context/AppContext';
import { Lock, Mail, ArrowLeft, RefreshCw, AlertCircle } from 'lucide-react';

export default function Page21HardLockout() {
  const { isLockedOut, setIsLockedOut, setCurrentPage, setLiveNotification } = useApp();

  const handleUnlock = () => {
    setIsLockedOut(false);
    setCurrentPage(15);
    setLiveNotification({
      type: 'info',
      title: 'District Access Restored',
      message: 'License lock override released. Returning to District Admin console.'
    });
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4 py-12 animate-fadeIn">
      {/* Top Testing Control Banner */}
      <div className="mb-6 p-3 bg-slate-100 border border-slateBorder rounded-element text-xs text-textMuted flex items-center gap-3">
        <span>⚙️ Evaluator Control:</span>
        <button
          onClick={handleUnlock}
          className="px-3 py-1 bg-white border border-slate-300 hover:bg-slate-50 text-textDark font-semibold rounded text-xs transition-colors"
        >
          Unlock & Return to District Admin (Page 15)
        </button>
      </div>

      {/* Center Box (Max-width 480px, white card on soft gray background) */}
      <main className="max-w-[480px] w-full bg-white border border-slateBorder rounded-card p-8 shadow-xl text-center space-y-6">
        {/* Soft Red Padlock Icon */}
        <div className="w-16 h-16 bg-red-50 border border-statusRed-border text-statusRed rounded-full flex items-center justify-center mx-auto shadow-sm">
          <Lock className="w-8 h-8" />
        </div>

        {/* District Tag */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-brandMaroon bg-red-50 border border-red-200 px-3 py-1 rounded-full inline-block">
            Harper Woods Community Schools
          </span>
          <h1 className="text-2xl font-bold text-textDark tracking-tight mt-2">
            District License Expired
          </h1>
        </div>

        {/* Informative Text */}
        <p className="text-sm text-textMuted leading-relaxed">
          The MealTrack SaaS agreement for Harper Woods Schools expired on <b className="text-textDark">Nov 20, 2027</b>. Access to daily meal counts, reports, and parent portals is temporarily locked.
        </p>

        {/* Instructions Box */}
        <div className="p-4 bg-slate-50 border border-slateBorder rounded-element text-left text-xs space-y-2 text-textDark font-medium">
          <div className="flex items-start gap-2">
            <span className="text-brandMaroon font-bold">•</span>
            <span>
              <b>Teachers:</b> Contact your school administrator or Food Service Director.
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-brandNavy font-bold">•</span>
            <span>
              <b>Administrators:</b> Contact Ideal Technology Solutions to renew your license contract.
            </span>
          </div>
        </div>

        {/* Primary Action Button */}
        <a
          href="mailto:support@idealtech.com?subject=MealTrack%20Renewal%20-%20Harper%20Woods%20Schools"
          className="w-full h-[48px] bg-brandNavy hover:bg-slate-900 text-white text-sm font-bold rounded-element shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-touch inline-flex"
        >
          <Mail className="w-4 h-4" />
          <span>Contact Support (support@idealtech.com)</span>
        </a>

        {/* Secondary back link */}
        <div className="pt-2">
          <button
            onClick={() => setCurrentPage(10)}
            className="text-xs text-textMuted hover:text-textDark underline underline-offset-4"
          >
            Switch to Master Operations Console
          </button>
        </div>
      </main>
    </div>
  );
}
