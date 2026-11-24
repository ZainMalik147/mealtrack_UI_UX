import React, { useState, useEffect } from 'react';
import { useApp, ROLES } from '../../context/AppContext';
import {
  Clock,
  Layers,
  UserCheck,
  ShieldAlert,
  RotateCcw,
  BookOpen,
  Lock,
  ChevronDown,
  ExternalLink,
  Sparkles
} from 'lucide-react';

export default function Header({ onOpenManual, onOpenGsrp }) {
  const {
    currentUser,
    setCurrentUser,
    currentPage,
    setCurrentPage,
    isLockedOut,
    setIsLockedOut,
    handleResetData
  } = useApp();

  const [timeRemaining, setTimeRemaining] = useState('18m to 9:00 AM cut-off');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const [showPageMenu, setShowPageMenu] = useState(false);

  // Live timer
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const target = new Date();
      target.setHours(9, 0, 0, 0);
      const diff = target - now;
      if (diff > 0) {
        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        setTimeRemaining(`${mins}m ${secs}s to 9:00 AM cut-off`);
      } else {
        setTimeRemaining('Past 9:00 AM cut-off');
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const pageGroups = [
    {
      group: 'GROUP A: Teacher Morning Workflow (Room 205)',
      pages: [
        { id: 1, label: 'Page 1: Teacher Classroom Morning Hub' },
        { id: 2, label: 'Page 2: Student Quick-Attendance Step' },
        { id: 3, label: 'Page 3: Student Meal Choices Step' },
        { id: 4, label: 'Page 4: Extended Day & Leave Late Check' },
        { id: 5, label: 'Page 5: Digital Signature & Legal Attestation' },
      ]
    },
    {
      group: 'GROUP B: Parent Mobile Magic Link',
      pages: [
        { id: 6, label: 'Page 6: Parent Welcome & Enrolled Children' },
        { id: 7, label: 'Page 7: Educational Benefit Assistance Survey' },
        { id: 8, label: 'Page 8: Parent Digital e-Signature & Confirmation' },
        { id: 9, label: 'Page 9: Weekly Lunch Pre-Selection Calendar' },
      ]
    },
    {
      group: 'GROUP C: Master Super-Portal (Vendor Level)',
      pages: [
        { id: 10, label: 'Page 10: Master Client Districts Directory' },
        { id: 11, label: 'Page 11: Add District — Step 1: Branding & Profile' },
        { id: 12, label: 'Page 12: Add District — Step 2: License Duration & Expiration' },
        { id: 13, label: 'Page 13: Add District — Step 3: Feature Modules Checklist' },
        { id: 14, label: 'Page 14: Global System Telemetry & Background Health' },
      ]
    },
    {
      group: 'GROUP D: Client District Admin (Harper Woods)',
      pages: [
        { id: 15, label: 'Page 15: District Admin Home & License Status' },
        { id: 16, label: 'Page 16: Staff Directory & Classroom Assignments' },
        { id: 17, label: 'Page 17: Invite Staff Member Form' },
      ]
    },
    {
      group: 'GROUP E: Food Service & Kitchen Line',
      pages: [
        { id: 18, label: 'Page 18: Kitchen Live Preparation Board' },
        { id: 19, label: 'Page 19: Live Change Alerts Stream' },
        { id: 20, label: 'Page 20: In-App PDF Review & Benefit Approval Desk' },
      ]
    },
    {
      group: 'GROUP F: Special States, Emails & Lockout',
      pages: [
        { id: 21, label: 'Page 21: License Expired / Hard Lockout Screen' },
        { id: 22, label: 'Page 22: 9:00 AM Daily Master Report Email Template' },
        { id: 23, label: 'Page 23: Kitchen Change Alert Email & SMS Template' },
      ]
    }
  ];

  const handleRoleSelect = (roleKey) => {
    const role = ROLES[roleKey];
    setCurrentUser(role);
    setShowRoleMenu(false);

    // Auto navigate to role's home view
    if (roleKey === 'TEACHER') setCurrentPage(1);
    else if (roleKey === 'GSRP_TEACHER') onOpenGsrp();
    else if (roleKey === 'DISTRICT_ADMIN') setCurrentPage(15);
    else if (roleKey === 'KITCHEN_LEAD') setCurrentPage(18);
    else if (roleKey === 'PARENT') setCurrentPage(6);
    else if (roleKey === 'VENDOR_SUPER') setCurrentPage(10);
  };

  const handlePageSelect = (pageId) => {
    setCurrentPage(pageId);
    setShowPageMenu(false);
  };

  const isCurrentMaster = currentPage >= 10 && currentPage <= 14;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slateBorder shadow-xs">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Context */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentPage(1)}
            className="flex items-center gap-2 text-left group"
          >
            <img
              src={isCurrentMaster ? '/images/ideal-logo.png' : '/images/hws-logo.png'}
              alt="MealTrack"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="hidden sm:block">
              <span className="text-sm font-extrabold text-textDark tracking-tight block">
                MealTrack <span className="text-[10px] font-semibold text-brandTeal uppercase">SaaS</span>
              </span>
              <span className="text-[10px] text-textMuted font-medium block">
                {isCurrentMaster ? 'Ideal Tech Master Operations' : 'Harper Woods Schools'}
              </span>
            </div>
          </button>

          {/* Countdown Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-amber-50 border border-amber-200 text-statusAmber text-xs font-semibold rounded-full">
            <Clock className="w-3.5 h-3.5" />
            <span>{timeRemaining}</span>
          </div>
        </div>

        {/* Center / Right Control Panel */}
        <div className="flex items-center gap-2">
          {/* 23-Screen Quick Navigator Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowPageMenu(!showPageMenu);
                setShowRoleMenu(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-textDark bg-slate-50 hover:bg-slate-100 border border-slateBorder rounded-element transition-colors min-h-touch"
              title="Jump to any of the 23 dedicated Stitch screens"
            >
              <Layers className="w-4 h-4 text-brandTeal" />
              <span className="hidden lg:inline">Screen:</span>
              <span className="text-brandTeal font-bold">Page {currentPage}</span>
              <ChevronDown className="w-3 h-3 text-textMuted" />
            </button>

            {showPageMenu && (
              <div className="absolute right-0 mt-2 w-80 md:w-96 max-h-[75vh] overflow-y-auto bg-white border border-slateBorder rounded-card shadow-xl p-2 z-50 text-xs space-y-3">
                <div className="p-2 border-b border-slate-100 flex justify-between items-center">
                  <span className="font-bold text-textDark uppercase text-[10px] tracking-wider">
                    23 Dedicated Stitch Screens
                  </span>
                  <span className="text-[10px] font-mono text-brandTeal">Single-Purpose Views</span>
                </div>

                {pageGroups.map((grp) => (
                  <div key={grp.group} className="space-y-1">
                    <span className="text-[10px] font-bold text-textMuted uppercase tracking-wider px-2 block">
                      {grp.group}
                    </span>
                    <div className="space-y-0.5">
                      {grp.pages.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => handlePageSelect(p.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded text-xs transition-colors flex items-center justify-between ${
                            currentPage === p.id
                              ? 'bg-brandTeal text-white font-bold'
                              : 'text-textDark hover:bg-slate-100'
                          }`}
                        >
                          <span>{p.label}</span>
                          {currentPage === p.id && <span className="text-[10px]">Active</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Role Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowRoleMenu(!showRoleMenu);
                setShowPageMenu(false);
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-textDark bg-slate-50 hover:bg-slate-100 border border-slateBorder rounded-element transition-colors min-h-touch"
            >
              <UserCheck className="w-4 h-4 text-brandNavy" />
              <span className="hidden sm:inline font-normal text-textMuted">Role:</span>
              <span className="max-w-[110px] truncate">{currentUser.name.split(' ')[0]}</span>
              <ChevronDown className="w-3 h-3 text-textMuted" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-white border border-slateBorder rounded-card shadow-xl p-2 z-50 text-xs space-y-1">
                <div className="p-2 border-b border-slate-100">
                  <span className="font-bold text-textDark uppercase text-[10px] tracking-wider block">
                    Interactive Role Switcher
                  </span>
                  <span className="text-[10px] text-textMuted">
                    Simulates district SSO permissions & routing
                  </span>
                </div>

                {Object.keys(ROLES).map((roleKey) => {
                  const role = ROLES[roleKey];
                  const isCurrent = currentUser.id === role.id;
                  return (
                    <button
                      key={roleKey}
                      onClick={() => handleRoleSelect(roleKey)}
                      className={`w-full text-left p-2 rounded transition-colors flex flex-col ${
                        isCurrent ? 'bg-slate-100 border-l-2 border-brandTeal' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-textDark">{role.name}</span>
                        <span className="text-[10px] text-brandTeal font-medium">{role.roleTag}</span>
                      </div>
                      <span className="text-[10px] text-textMuted">{role.title}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* GSRP Pre-K Workflow Modal Opener */}
          <button
            onClick={onOpenGsrp}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-statusIndigo bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-element transition-colors"
            title="Open GSRP Pre-K Room 101 Family Style & 5-Day Weekly Sheet"
          >
            <span>GSRP Pre-K</span>
          </button>

          {/* PDF Manual Opener */}
          <button
            onClick={onOpenManual}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-bold text-brandMaroon bg-red-50 hover:bg-red-100 border border-red-200 rounded-element transition-colors min-h-touch"
            title="Open Complete PDF User Manual & Documentation"
          >
            <BookOpen className="w-3.5 h-3.5 text-brandMaroon" />
            <span className="hidden md:inline">User Manual</span>
          </button>

          {/* Test Hard Lockout Toggle */}
          <button
            onClick={() => {
              if (currentPage === 21) {
                setCurrentPage(15);
              } else {
                setCurrentPage(21);
              }
            }}
            className={`p-2 rounded-element border transition-colors ${
              currentPage === 21
                ? 'bg-red-600 text-white border-red-600'
                : 'bg-slate-50 text-textMuted border-slateBorder hover:text-statusRed hover:border-red-300'
            }`}
            title="Test Page 21: License Expired / Hard Lockout Screen"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Reset Demo Data */}
          <button
            onClick={handleResetData}
            className="p-2 bg-slate-50 text-textMuted hover:text-textDark border border-slateBorder rounded-element hover:bg-slate-100 transition-colors"
            title="Reset browser cache to pristine demo data"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
