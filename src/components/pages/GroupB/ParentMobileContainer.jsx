import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { Smartphone, Monitor, Shield, ArrowLeft } from 'lucide-react';
import Page6ParentWelcome from './Page6ParentWelcome';
import Page7BenefitSurvey from './Page7BenefitSurvey';
import Page8ParentSignature from './Page8ParentSignature';
import Page9WeeklyLunch from './Page9WeeklyLunch';

export default function ParentMobileContainer() {
  const { currentPage, setCurrentPage } = useApp();
  const [deviceFrame, setDeviceFrame] = useState(true);

  // Render the current sub-page
  const renderSubPage = () => {
    switch (currentPage) {
      case 6:
        return <Page6ParentWelcome />;
      case 7:
        return <Page7BenefitSurvey />;
      case 8:
        return <Page8ParentSignature />;
      case 9:
        return <Page9WeeklyLunch />;
      default:
        return <Page6ParentWelcome />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
      {/* Top Banner: Parent Magic Link Simulation Bar */}
      <div className="bg-canvas-pure border border-slateBorder rounded-card p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 text-statusGreen rounded-element border border-emerald-200">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-textDark">Parent SMS Magic Link</span>
              <span className="text-[10px] font-mono bg-slate-100 text-textMuted px-2 py-0.5 rounded border border-slateBorder">
                https://hws.mealtrackapp.com/f/tkn-918204
              </span>
            </div>
            <p className="text-xs text-textMuted">
              Simulating parent experience on mobile phone (Zero password required).
            </p>
          </div>
        </div>

        {/* View Mode Toggle: Mobile Frame vs Wide */}
        <div className="flex items-center rounded-element p-1 bg-slate-100 border border-slateBorder gap-1 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setDeviceFrame(true)}
            className={`px-3 py-1.5 text-xs font-bold rounded-element transition-all flex items-center gap-1.5 ${
              deviceFrame ? 'bg-white text-textDark shadow-sm' : 'text-textMuted hover:text-textDark'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile Device</span>
          </button>
          <button
            type="button"
            onClick={() => setDeviceFrame(false)}
            className={`px-3 py-1.5 text-xs font-bold rounded-element transition-all flex items-center gap-1.5 ${
              !deviceFrame ? 'bg-white text-textDark shadow-sm' : 'text-textMuted hover:text-textDark'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Responsive Wide</span>
          </button>
        </div>
      </div>

      {/* Container Body */}
      {deviceFrame ? (
        /* Mobile Device Mockup Frame */
        <div className="flex justify-center py-4">
          <div className="w-[390px] min-h-[720px] bg-white border-[8px] border-slate-800 rounded-[40px] shadow-2xl overflow-hidden flex flex-col relative">
            {/* Speaker / Dynamic Island */}
            <div className="w-full bg-slate-800 py-3 flex justify-center items-center relative">
              <div className="w-24 h-4 bg-black rounded-full flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700 mr-2"></div>
              </div>
            </div>

            {/* Mobile Header Bar */}
            <div className="px-5 py-2 flex justify-between items-center text-[10px] font-mono text-slate-500 border-b border-slate-100">
              <span>9:41 AM</span>
              <div className="flex items-center gap-1">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* App View */}
            <div className="flex-1 p-5 overflow-y-auto bg-canvas">
              {renderSubPage()}
            </div>

            {/* Home Bar Indicator */}
            <div className="w-full py-2 bg-white flex justify-center border-t border-slate-100">
              <div className="w-32 h-1 bg-slate-300 rounded-full"></div>
            </div>
          </div>
        </div>
      ) : (
        /* Wide Container */
        <div className="bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm max-w-xl mx-auto">
          {renderSubPage()}
        </div>
      )}
    </div>
  );
}
