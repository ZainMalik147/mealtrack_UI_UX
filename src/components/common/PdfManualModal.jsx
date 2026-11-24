import React, { useState } from 'react';
import { X, FileDown, BookOpen, Search, Check, ShieldCheck, Printer } from 'lucide-react';

export default function PdfManualModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');

  const sections = [
    { id: 'overview', title: '1. Executive Overview & System Directives' },
    { id: 'teacher', title: '2. Teacher Morning Workflow (Pages 1–5)' },
    { id: 'parent', title: '3. Parent Mobile Magic Link (Pages 6–9)' },
    { id: 'master', title: '4. Master Operations Console (Pages 10–14)' },
    { id: 'district', title: '5. District Admin & Staff (Pages 15–17)' },
    { id: 'kitchen', title: '6. Kitchen Prep & Change Alerts (Pages 18–20)' },
    { id: 'special', title: '7. Lockout & Email Templates (Pages 21–23)' },
    { id: 'compliance', title: '8. Legal Attestation & MDE/USDA CEP Compliance' },
  ];

  const handleDownloadPdf = () => {
    // Triggers download of generated PDF
    const link = document.createElement('a');
    link.href = '/MealTrack_SaaS_User_Manual.pdf';
    link.download = 'MealTrack_SaaS_User_Manual.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-canvas-pure border border-slateBorder rounded-card max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden my-4">
        {/* Modal Top Bar */}
        <div className="p-4 bg-white border-b border-slateBorder flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-50 text-brandMaroon rounded-element border border-red-200">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-textDark">
                MealTrack Multi-Tenant SaaS — Official User Manual
              </h2>
              <span className="text-xs text-textMuted">
                Ideal Technology Solutions · Harper Woods Schools Edition · Version 1.0 (Phase 1)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadPdf}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-brandMaroon hover:bg-red-900 text-white text-xs font-bold rounded-element shadow-sm transition-transform active:scale-95"
            >
              <FileDown className="w-4 h-4" />
              <span>Download PDF Manual</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-textMuted hover:text-textDark hover:bg-slate-100 rounded-element"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body: Sidebar + Main Reading Pane */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          {/* Table of Contents Sidebar */}
          <div className="w-full md:w-64 bg-slate-50 border-r border-slateBorder p-3 overflow-y-auto flex-shrink-0 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-textMuted px-2 block">
              Table of Contents
            </span>
            <div className="space-y-0.5">
              {sections.map((sec) => (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left px-3 py-2 rounded text-xs transition-colors block ${
                    activeSection === sec.id
                      ? 'bg-brandMaroon text-white font-bold shadow-xs'
                      : 'text-textDark hover:bg-slate-200/60'
                  }`}
                >
                  {sec.title}
                </button>
              ))}
            </div>
          </div>

          {/* Reading Document Pane */}
          <div className="flex-1 bg-white p-6 md:p-8 overflow-y-auto space-y-6 text-sm text-textDark leading-relaxed">
            {activeSection === 'overview' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-brandMaroon uppercase tracking-wider">Section 1</span>
                  <h3 className="text-xl font-bold text-textDark">Executive Overview & Design Philosophy</h3>
                </div>
                <p>
                  MealTrack is an enterprise multi-tenant school nutrition SaaS platform engineered by <b>Ideal Technology Solutions, LLC</b> for K–12 public school districts participating in the USDA Community Eligibility Provision (CEP), exemplified by Harper Woods Schools (Beacon and Tyrone Elementary).
                </p>
                <div className="p-4 bg-slate-50 border border-slateBorder rounded-element space-y-2">
                  <h4 className="text-xs font-bold uppercase text-brandNavy">Core Design Directives</h4>
                  <ul className="text-xs text-textMuted space-y-1 list-disc list-inside">
                    <li><b>Ultra-Clean & Plain:</b> Zero visual clutter, ample whitespace, high-contrast typography (#0F172A).</li>
                    <li><b>Dedicated Single-Purpose Pages:</b> 23 micro-pages eliminate cognitive friction for fast 10-minute completion.</li>
                    <li><b>Touch Targets:</b> Minimum 44px for effortless iPad, Chromebook, and smartphone tapping.</li>
                    <li><b>Zero Password Parent Magic Links:</b> Instant SMS-verified enrollment with tamper-evident digital signatures.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeSection === 'teacher' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-brandTeal uppercase tracking-wider">Section 2</span>
                  <h3 className="text-xl font-bold text-textDark">Teacher Morning Workflow (Pages 1 through 5)</h3>
                </div>
                <p>
                  Elementary teachers complete morning registers prior to the strict <b>9:00 AM count cut-off</b> across three distinct steps:
                </p>
                <div className="space-y-3 text-xs">
                  <div className="p-3 border border-slateBorder rounded-element">
                    <b>Page 1 (Classroom Morning Hub):</b> Glanceable deadline timer card, live student enrollment counts, missing benefit forms alert, and single high-contrast primary CTA.
                  </div>
                  <div className="p-3 border border-slateBorder rounded-element">
                    <b>Page 2 (Attendance Step - 33%):</b> 4-button segmented selector (Present, Late with arrival time prompt, Leave Late for latchkey tagging, Absent). Includes "Mark All Present" ghost button.
                  </div>
                  <div className="p-3 border border-slateBorder rounded-element">
                    <b>Page 3 (Meal Choices Step - 66%):</b> Breakfast check-off (served in classroom) and 5 distinct lunch pills (Hot Entrée A, Cold Entrée B, Salad Bar, Own Lunch, and Did Not Take Meal for fasting/skipping).
                  </div>
                  <div className="p-3 border border-slateBorder rounded-element">
                    <b>Page 4 (Extended Day Step - 100%):</b> Review of students staying past 3:15 PM for Latchkey, Tutoring, and Art Studio, confirming after-school snack and supper boxes.
                  </div>
                  <div className="p-3 border border-slateBorder rounded-element">
                    <b>Page 5 (Digital Signature Attestation):</b> Legal certification under USDA CEP and MDE rules, typed legal name signature with Google SSO verification, timestamp, client IP, and instant SignalR push to the kitchen.
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'parent' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-statusGreen uppercase tracking-wider">Section 3</span>
                  <h3 className="text-xl font-bold text-textDark">Parent Mobile Magic Link (Pages 6 through 9)</h3>
                </div>
                <p>
                  Parents receive an automated SMS text message containing a secure one-time cryptographic token link (e.g. <code>https://hws.mealtrackapp.com/f/tkn-918204</code>) requiring zero account creation or password entry.
                </p>
                <div className="space-y-3 text-xs">
                  <div className="p-3 border border-slateBorder rounded-element">
                    <b>Page 6 (Family Nutrition Hub):</b> Welcomes parent by name, displays all enrolled children on file across district buildings, and provides 1-tap benefit survey access.
                  </div>
                  <div className="p-3 border border-slateBorder rounded-element">
                    <b>Page 7 (Benefit Survey):</b> 1-question survey capturing SNAP/FIP/TANF case numbers or household size slider and income brackets for federal Title I school funding.
                  </div>
                  <div className="p-3 border border-slateBorder rounded-element">
                    <b>Page 8 (e-Signature Certification):</b> Parent types legal name, generating an immutable PAdES digital signature certificate filed directly with district Food Service.
                  </div>
                  <div className="p-3 border border-slateBorder rounded-element">
                    <b>Page 9 (Weekly Lunch Pre-Selection):</b> Calendar switcher allowing parents to choose Hot Entrée A, Cold Entrée B, Salad, Own Lunch, or Fasting for every day of the week, auto-syncing to teacher registers.
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'master' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-brandNavy uppercase tracking-wider">Section 4</span>
                  <h3 className="text-xl font-bold text-textDark">Master Super-Portal Administration (Pages 10–14)</h3>
                </div>
                <p>
                  Ideal Technology Solutions operators utilize the Master Console to provision multi-tenant client districts:
                </p>
                <ul className="text-xs space-y-2 list-disc list-inside text-textMuted">
                  <li><b>Page 10 (Client Directory):</b> Overview of all provisioned districts, contract statuses, student seat counts, and expiring agreements.</li>
                  <li><b>Pages 11–13 (3-Step Onboarding):</b> District subdomain routing, custom logo upload, brand color palette picker, hard contract expiration dates, automatic lockout policies, and module licensing toggles.</li>
                  <li><b>Page 14 (Telemetry & Automated Jobs):</b> SignalR live WebSocket hub health (42 kitchens active), 7:00 AM SMS reminder queues, and Azure SQL audit backups.</li>
                </ul>
              </div>
            )}

            {activeSection === 'district' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-brandMaroon uppercase tracking-wider">Section 5</span>
                  <h3 className="text-xl font-bold text-textDark">District Admin & Staff Management (Pages 15–17)</h3>
                </div>
                <p>
                  Food Service Directors (Brian Corbett) maintain total oversight over campus registers:
                </p>
                <ul className="text-xs space-y-2 list-disc list-inside text-textMuted">
                  <li><b>Page 15 (District Dashboard):</b> Real-time countdown to 9:00 AM cut-off, license duration transparency banner, and master navigation cards.</li>
                  <li><b>Page 16 (Staff Directory):</b> Live roster of all teachers and kitchen staff, showing submission times and manual "Remind" nudge triggers.</li>
                  <li><b>Page 17 (Invite Staff Form):</b> 1-column form to provision new educator accounts integrated with Google Workspace SSO.</li>
                </ul>
              </div>
            )}

            {activeSection === 'kitchen' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-statusAmber uppercase tracking-wider">Section 6</span>
                  <h3 className="text-xl font-bold text-textDark">Kitchen Prep & Change Alerts (Pages 18–20)</h3>
                </div>
                <p>
                  Cafeteria staff receive real-time production requirements designed for visibility from 10 feet away:
                </p>
                <ul className="text-xs space-y-2 list-disc list-inside text-textMuted">
                  <li><b>Page 18 (Kitchen Prep Board):</b> High-contrast, large-font metrics for Hot Entrée A, Cold Entrée B, Salad Bar, and non-prep counts with live SignalR timestamps.</li>
                  <li><b>Page 19 (Change Alerts Stream):</b> Chronological feed of post-9:00 AM changes and late arrivals with interactive "Mark Added to Cart" actions.</li>
                  <li><b>Page 20 (PDF Approval Desk):</b> Split-screen desk comparing 8.5x11 parent benefit PDFs against SNAP databases, assigning Free/Reduced classifications and syncing to MiStar.</li>
                </ul>
              </div>
            )}

            {activeSection === 'special' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-statusRed uppercase tracking-wider">Section 7</span>
                  <h3 className="text-xl font-bold text-textDark">Special States & Communication Templates (Pages 21–23)</h3>
                </div>
                <ul className="text-xs space-y-2 list-disc list-inside text-textMuted">
                  <li><b>Page 21 (Hard Lockout Screen):</b> Professional lockout display triggered when contract expiration date passes without renewal.</li>
                  <li><b>Page 22 (9:00 AM Master Email Template):</b> 600px responsive HTML layout delivered to executive administrators containing campus breakdown tables and certified PDF attachments.</li>
                  <li><b>Page 23 (Kitchen Alert Email & SMS Template):</b> High-urgency red notification dispatched to kitchen leads when warmer carts require immediate additions.</li>
                </ul>
              </div>
            )}

            {activeSection === 'compliance' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-statusGreen uppercase tracking-wider">Section 8</span>
                  <h3 className="text-xl font-bold text-textDark">Legal Attestation & MDE/USDA CEP Compliance</h3>
                </div>
                <p>
                  MealTrack adheres strictly to the federal <b>Electronic Signatures in Global and National Commerce Act (ESIGN)</b>, Michigan's <b>Uniform Electronic Transactions Act (UETA)</b>, and USDA Food and Nutrition Service guidelines for CEP reporting.
                </p>
                <div className="p-4 bg-emerald-50 border border-statusGreen-border rounded-element text-xs text-emerald-950 space-y-2">
                  <p className="font-bold">Key Audit Requirements Met:</p>
                  <p>1. Legal typed signatures matched to authenticated Google Workspace credentials.</p>
                  <p>2. Time-stamped client IP addresses with SHA-256 cryptographic tamper seals.</p>
                  <p>3. Mandatory 3-year compliance archive retention in Azure SQL + Blob Storage.</p>
                  <p>4. Accurate distinction between classroom breakfast and cafeteria lunch counts.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slateBorder flex items-center justify-between text-xs flex-shrink-0">
          <span className="text-textMuted">
            To generate physical printouts, click Download PDF Manual.
          </span>
          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 bg-brandMaroon hover:bg-red-900 text-white font-bold rounded-element transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <FileDown className="w-4 h-4" />
            <span>Download PDF User Manual (Full Document)</span>
          </button>
        </div>
      </div>
    </div>
  );
}
