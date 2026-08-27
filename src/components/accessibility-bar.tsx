"use client";

import React, { useEffect, useState } from "react";
import { Eye, Type, Volume2, Globe, Building2, Check } from "lucide-react";
import { AccessibilitySettings } from "@/types";

interface AccessibilityBarProps {
  settings: AccessibilitySettings;
  onUpdateSettings: (newSettings: Partial<AccessibilitySettings>) => void;
}

export function AccessibilityBar({ settings, onUpdateSettings }: AccessibilityBarProps) {
  const [announcement, setAnnouncement] = useState<string | null>(null);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("high-contrast", settings.highContrast);
      document.body.classList.toggle("dyslexia-font", settings.dyslexiaFont);
      document.body.classList.toggle("font-large", settings.fontSize === "large");
      document.body.classList.toggle("font-xlarge", settings.fontSize === "extra-large");
    }
  }, [settings]);

  const triggerAnnouncement = (text: string) => {
    setAnnouncement(text);
    if (settings.screenReaderActive && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
    setTimeout(() => setAnnouncement(null), 3500);
  };

  const handleContrastToggle = () => {
    const next = !settings.highContrast;
    onUpdateSettings({ highContrast: next });
    triggerAnnouncement(next ? "High Contrast Mode Enabled" : "High Contrast Mode Disabled");
  };

  const handleFontSizeCycle = () => {
    const sizes: ("normal" | "large" | "extra-large")[] = ["normal", "large", "extra-large"];
    const currentIndex = sizes.indexOf(settings.fontSize);
    const nextSize = sizes[(currentIndex + 1) % sizes.length];
    onUpdateSettings({ fontSize: nextSize });
    triggerAnnouncement(`Font size changed to ${nextSize}`);
  };

  const handleDyslexiaToggle = () => {
    const next = !settings.dyslexiaFont;
    onUpdateSettings({ dyslexiaFont: next });
    triggerAnnouncement(next ? "Dyslexia Friendly Font Enabled" : "Standard Font Enabled");
  };

  const handleScreenReaderToggle = () => {
    const next = !settings.screenReaderActive;
    onUpdateSettings({ screenReaderActive: next });
    triggerAnnouncement(next ? "Screen Reader Voice Announcer Activated" : "Voice Announcer Deactivated");
  };

  return (
    <header className="w-full bg-[#18181B] text-[#E4E4E7] text-xs py-1.5 px-4 border-b border-zinc-800 relative z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        {/* Left: Official Identification */}
        <div className="flex items-center gap-2.5">
          <span className="font-semibold text-zinc-200 flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>भारत सरकार | Government of India</span>
          </span>
          <span className="text-zinc-500 hidden sm:inline">&bull;</span>
          <span className="text-zinc-400 hidden sm:inline text-[11px]">
            National Transparency Portal (RTI Act, 2005)
          </span>
        </div>

        {/* Right: Accessibility Suite */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Contrast */}
          <button
            onClick={handleContrastToggle}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all ${
              settings.highContrast
                ? "bg-yellow-400 text-black font-bold ring-2 ring-yellow-400"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            }`}
            title="Toggle High Contrast Mode (WCAG AAA)"
            aria-label="High Contrast"
          >
            <Eye className="w-3 h-3" />
            <span>Contrast</span>
            {settings.highContrast && <Check className="w-3 h-3 ml-0.5" />}
          </button>

          {/* Text Size */}
          <button
            onClick={handleFontSizeCycle}
            className="px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 flex items-center gap-1 transition-all"
            title="Adjust Text Sizing"
            aria-label="Font Size"
          >
            <Type className="w-3 h-3" />
            <span>
              {settings.fontSize === "normal" ? "A" : settings.fontSize === "large" ? "A+" : "A++"}
            </span>
          </button>

          {/* Dyslexia Mode */}
          <button
            onClick={handleDyslexiaToggle}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all ${
              settings.dyslexiaFont
                ? "bg-[#FF6B35] text-white font-medium"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            }`}
            title="Toggle Dyslexia Friendly Typeface"
            aria-label="Dyslexia Font"
          >
            <span>Dyslexia Mode</span>
          </button>

          {/* Voice Reader */}
          <button
            onClick={handleScreenReaderToggle}
            className={`px-2 py-0.5 rounded flex items-center gap-1 transition-all ${
              settings.screenReaderActive
                ? "bg-emerald-600 text-white font-medium"
                : "bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            }`}
            title="Toggle Screen Reader Voice Assistant"
            aria-label="Screen Reader"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Screen Reader</span>
          </button>

          {/* Language Switcher */}
          <div className="flex items-center gap-1 bg-zinc-800 rounded px-1.5 py-0.5 text-zinc-300">
            <Globe className="w-3 h-3 text-zinc-400" />
            <select
              value={settings.language}
              onChange={(e) => {
                const lang = e.target.value as AccessibilitySettings["language"];
                onUpdateSettings({ language: lang });
                triggerAnnouncement(`Language switched to ${e.target.options[e.target.selectedIndex].text}`);
              }}
              className="bg-transparent text-xs text-zinc-200 outline-none cursor-pointer"
              aria-label="Select Official Language"
            >
              <option value="en" className="bg-zinc-900 text-white">English</option>
              <option value="hi" className="bg-zinc-900 text-white">हिन्दी (Hindi)</option>
              <option value="ta" className="bg-zinc-900 text-white">தமிழ் (Tamil)</option>
              <option value="kn" className="bg-zinc-900 text-white">ಕನ್ನಡ (Kannada)</option>
              <option value="bn" className="bg-zinc-900 text-white">বাংলা (Bengali)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Screen Reader Voice Announcement Toast */}
      {announcement && (
        <div className="fixed bottom-4 right-4 z-50 bg-[#18181B] text-white border border-[#FF6B35] px-4 py-2 rounded-xl shadow-2xl flex items-center gap-2 text-xs animate-in fade-in slide-in-from-bottom-2">
          <Volume2 className="w-4 h-4 text-[#FF6B35] animate-bounce" />
          <span>{announcement}</span>
        </div>
      )}
    </header>
  );
}
