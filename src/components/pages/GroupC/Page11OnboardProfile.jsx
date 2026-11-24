import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ArrowLeft, ArrowRight, Upload, Palette, Building, Globe } from 'lucide-react';

export default function Page11OnboardProfile() {
  const { setCurrentPage } = useApp();
  const [districtName, setDistrictName] = useState('Detroit Public Schools Academy');
  const [subdomain, setSubdomain] = useState('dpsa');
  const [brandColor, setBrandColor] = useState('#1E3A8A');
  const [logoPreview, setLogoPreview] = useState('/images/hws-logo.png');

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-fadeIn pb-16">
      {/* Header */}
      <header className="space-y-3 border-b border-slateBorder pb-5">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentPage(10)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-textMuted hover:text-textDark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Districts Directory
          </button>
          <span className="text-xs font-bold uppercase tracking-wider text-brandNavy bg-slate-100 border border-slate-200 px-2.5 py-0.5 rounded-full">
            Step 1 of 3
          </span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-textDark tracking-tight">
            District Identity & Custom Branding
          </h1>
          <p className="text-sm text-textMuted font-medium">
            Multi-Tenant Configuration · Onboarding Wizard
          </p>
        </div>

        {/* 33% Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
          <div className="bg-brandNavy h-full rounded-full" style={{ width: '33.33%' }} />
        </div>
      </header>

      {/* Form Fields (Vertical stack, clean spacing) */}
      <main className="bg-canvas-pure border border-slateBorder rounded-card p-6 shadow-sm space-y-5">
        {/* 1. District Legal Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
            1. District Legal Name
          </label>
          <input
            type="text"
            value={districtName}
            onChange={(e) => setDistrictName(e.target.value)}
            placeholder="e.g. Detroit Public Schools Academy"
            className="w-full px-4 py-2.5 border border-slateBorder rounded-element text-sm focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white"
          />
        </div>

        {/* 2. Short Code & Subdomain */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
            2. Short Code & Subdomain
          </label>
          <div className="flex items-center">
            <input
              type="text"
              value={subdomain}
              onChange={(e) => setSubdomain(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
              placeholder="dpsa"
              className="w-32 px-3 py-2.5 border border-slateBorder rounded-l-element text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brandNavy bg-white"
            />
            <span className="px-3 py-2.5 bg-slate-100 border border-l-0 border-slateBorder rounded-r-element text-xs font-mono text-textMuted flex-1">
              .mealtrackapp.com
            </span>
          </div>
          <p className="text-[11px] text-textMuted">
            Live Subdomain Preview: <code className="text-brandNavy font-semibold font-mono">{subdomain || 'district'}.mealtrackapp.com</code>
          </p>
        </div>

        {/* 3. Official District Logo Upload Zone */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
            3. Official District Logo
          </label>
          <div className="border-2 border-dashed border-slateBorder hover:border-brandNavy rounded-card p-6 text-center bg-slate-50/50 transition-colors flex flex-col items-center justify-center gap-2 cursor-pointer">
            {logoPreview ? (
              <div className="flex items-center gap-4">
                <img
                  src={logoPreview}
                  alt="Logo preview"
                  className="h-16 w-16 object-contain p-1 border border-slateBorder rounded-element bg-white"
                />
                <div className="text-left">
                  <span className="text-xs font-bold text-textDark block">Current Logo Loaded</span>
                  <span className="text-[11px] text-textMuted">PNG, SVG up to 5MB</span>
                  <button
                    type="button"
                    onClick={() => setLogoPreview('/images/ideal-logo.png')}
                    className="text-[11px] text-brandTeal hover:underline block mt-1"
                  >
                    Switch to Alternate Logo
                  </button>
                </div>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-textMuted" />
                <span className="text-xs font-semibold text-textDark">
                  Drag and drop district seal or logo (PNG / SVG)
                </span>
                <span className="text-[11px] text-textMuted">
                  Recommended size: 400x400 transparent PNG
                </span>
              </>
            )}
          </div>
        </div>

        {/* 4. Primary Brand Color */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-textDark block">
            4. Primary Brand Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-12 h-10 border border-slateBorder rounded-element cursor-pointer bg-white"
            />
            <input
              type="text"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="w-28 px-3 py-2 border border-slateBorder rounded-element text-sm font-mono text-textDark"
            />
            {/* Live Button Preview */}
            <div className="flex-1 flex justify-end items-center gap-2">
              <span className="text-xs text-textMuted">Live Preview:</span>
              <button
                type="button"
                style={{ backgroundColor: brandColor }}
                className="px-4 py-2 text-xs font-bold text-white rounded-element shadow-sm pointer-events-none"
              >
                District Action
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer CTA */}
      <button
        onClick={() => setCurrentPage(12)}
        className="w-full h-[52px] bg-brandNavy hover:bg-slate-900 text-white text-base font-bold rounded-element shadow-sm flex items-center justify-center gap-2 transition-transform active:scale-[0.98] min-h-touch"
      >
        <span>Next: Set License & Expiration Date</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
}
