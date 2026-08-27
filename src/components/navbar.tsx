"use client";

import React, { useState } from "react";
import { Globe, Eye, Menu, X, User, CheckCircle2, ShieldCheck, ChevronDown } from "lucide-react";
import { SectionType, AccessibilitySettings } from "@/types";

interface NavbarProps {
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
  accessibilitySettings: AccessibilitySettings;
  onUpdateAccessibility: (settings: Partial<AccessibilitySettings>) => void;
}

export function Navbar({
  activeSection,
  onSelectSection,
  accessibilitySettings,
  onUpdateAccessibility,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems: { id: SectionType; label: string }[] = [
    { id: "search", label: "RTI Assistant" },
    { id: "tracker", label: "Track Status" },
    { id: "campaigns", label: "Campaigns" },
    { id: "public-records", label: "Public Records" },
    { id: "scorecard", label: "Scorecard" },
  ];

  const handleFontSizeCycle = () => {
    const sizes: ("normal" | "large" | "extra-large")[] = ["normal", "large", "extra-large"];
    const currentIndex = sizes.indexOf(accessibilitySettings.fontSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    onUpdateAccessibility({ fontSize: nextSize });
  };

  return (
    <header className="w-full bg-white/95 backdrop-blur-md border-b border-zinc-200 sticky top-0 z-50">
      {/* Subtle National Saffron Accent Line */}
      <div className="h-0.5 bg-gradient-to-r from-[#FF6B35] via-amber-300 to-[#15803D]" />

      <div className="max-w-6xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-3">
          
          {/* 1. Left: Dignified Portal Identity */}
          <div 
            onClick={() => onSelectSection("search")}
            className="cursor-pointer group flex flex-col justify-center"
          >
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-zinc-900 font-heading">
                RTI Online
              </span>
              <span className="text-[10px] font-bold text-[#FF6B35] bg-orange-100 px-1.5 py-0.2 rounded-md">
                2.0
              </span>
            </div>
            <span className="text-[9px] text-zinc-400 tracking-wider uppercase leading-none font-semibold">
              Government of India
            </span>
          </div>

          {/* 2. Center: Sleek Modern Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === "search" && activeSection === "file-rti");
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* 3. Right: Verified Profile & Utilities */}
          <div className="flex items-center gap-1.5">
            
            {/* Verified Citizen Profile Pill */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-1.5 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 rounded-full py-1 px-2.5 transition-all text-xs"
              >
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-[10px]">
                  R
                </div>
                <span className="font-bold text-zinc-800 hidden sm:inline text-xs">Varun Mayya</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {/* Profile Dropdown Card */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-zinc-200 shadow-xl p-4 space-y-3 z-50 animate-in fade-in zoom-in-95 text-xs">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                    <span className="font-bold text-zinc-900">Verified Citizen Account</span>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Active
                    </span>
                  </div>

                  <div className="space-y-1.5 text-zinc-600">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <strong className="text-zinc-900">Varun Mayya</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Aadhaar:</span>
                      <strong className="font-mono text-zinc-900">XXXX-XXXX-4892</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>DigiLocker:</span>
                      <strong className="text-emerald-700">Token Verified ✓</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>BPL Status:</span>
                      <span className="text-zinc-800">General (BPL Eligible)</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-500">
                    <span>DPDP Act 2023 Compliant</span>
                    <button
                      onClick={() => setProfileDropdownOpen(false)}
                      className="font-bold text-[#FF6B35] hover:underline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Contrast Button */}
            <button
              onClick={() => onUpdateAccessibility({ highContrast: !accessibilitySettings.highContrast })}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                accessibilitySettings.highContrast
                  ? "bg-yellow-400 text-black font-bold ring-2 ring-yellow-400"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100"
              }`}
              title="High Contrast (WCAG AAA)"
              aria-label="High Contrast"
            >
              <Eye className="w-4 h-4" />
            </button>

            {/* Font Sizing */}
            <button
              onClick={handleFontSizeCycle}
              className="px-2 py-1 rounded-lg text-xs font-bold text-zinc-600 hover:bg-zinc-100"
              title="Adjust Font Size"
              aria-label="Font Size"
            >
              {accessibilitySettings.fontSize === "normal" ? "A" : accessibilitySettings.fontSize === "large" ? "A+" : "A++"}
            </button>

            {/* Language Selector */}
            <div className="flex items-center bg-zinc-100 rounded-lg px-2 py-1 text-xs">
              <Globe className="w-3.5 h-3.5 text-zinc-500 mr-1" />
              <select
                value={accessibilitySettings.language}
                onChange={(e) => onUpdateAccessibility({ language: e.target.value as AccessibilitySettings["language"] })}
                className="bg-transparent text-xs text-zinc-800 font-medium outline-none cursor-pointer"
                aria-label="Language"
              >
                <option value="en">English</option>
                <option value="hi">हिन्दी</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="te">తెలుగు</option>
                <option value="ta">தமிழ்</option>
                <option value="ml">മലയാളം</option>
                <option value="bn">বাংলা</option>
              </select>
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 rounded-lg text-zinc-600 hover:bg-zinc-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-2 space-y-1 border-t border-zinc-100 bg-white">
            {navItems.map((item) => {
              const isActive = activeSection === item.id || (item.id === "search" && activeSection === "file-rti");
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectSection(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full px-3 py-2 rounded-lg text-left text-xs font-bold ${
                    isActive
                      ? "bg-orange-50 text-[#FF6B35]"
                      : "text-zinc-700 hover:bg-zinc-50"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}
