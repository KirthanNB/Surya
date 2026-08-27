"use client";

import React, { useState, useEffect } from "react";
import { AccessibilitySettings, SectionType } from "@/types";
import { Navbar } from "@/components/navbar";
import { ConciergeChat } from "@/components/home-assistant/concierge-chat";
import { CampaignList } from "@/components/campaigns/campaign-list";
import { LifecycleTracker } from "@/components/tracking/lifecycle-tracker";
import { RejectionAnalyzer } from "@/components/precedent-matcher/rejection-analyzer";
import { PublicRecordsView } from "@/components/search-engine/public-records-view";
import { DepartmentLeaderboard } from "@/components/report-card/department-leaderboard";
import { AIFormatterChat } from "@/components/jan-ai-filing/ai-formatter-chat";

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionType>("search");

  const [accessibilitySettings, setAccessibilitySettings] = useState<AccessibilitySettings>({
    highContrast: false,
    fontSize: "normal",
    dyslexiaFont: false,
    language: "en",
    screenReaderActive: false,
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.classList.toggle("high-contrast", accessibilitySettings.highContrast);
      document.body.classList.toggle("dyslexia-font", accessibilitySettings.dyslexiaFont);
      document.body.classList.toggle("font-large", accessibilitySettings.fontSize === "large");
      document.body.classList.toggle("font-xlarge", accessibilitySettings.fontSize === "extra-large");
    }
  }, [accessibilitySettings]);

  const handleUpdateAccessibility = (newSettings: Partial<AccessibilitySettings>) => {
    setAccessibilitySettings((prev) => ({ ...prev, ...newSettings }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF7] text-[#18181B] selection:bg-[#FF6B35]/20 selection:text-[#FF6B35]">
      {/* 1. Sleek Modern Navbar */}
      <Navbar
        activeSection={activeSection}
        onSelectSection={setActiveSection}
        accessibilitySettings={accessibilitySettings}
        onUpdateAccessibility={handleUpdateAccessibility}
      />

      {/* 2. Main Viewport */}
      <main className="flex-1">
        {activeSection === "search" && (
          <ConciergeChat onSelectSection={setActiveSection} />
        )}

        {activeSection === "file-rti" && (
          <AIFormatterChat onSelectSection={setActiveSection} />
        )}

        {activeSection === "tracker" && (
          <div className="py-6">
            <LifecycleTracker onSelectSection={setActiveSection} />
          </div>
        )}

        {activeSection === "campaigns" && (
          <div className="py-6">
            <CampaignList onSelectSection={setActiveSection} />
          </div>
        )}

        {activeSection === "public-records" && (
          <div className="py-6">
            <PublicRecordsView onSelectSection={setActiveSection} />
          </div>
        )}

        {activeSection === "precedent" && (
          <div className="py-6">
            <RejectionAnalyzer onSelectSection={setActiveSection} />
          </div>
        )}

        {activeSection === "scorecard" && (
          <div className="py-6">
            <DepartmentLeaderboard onSelectSection={setActiveSection} />
          </div>
        )}
      </main>

      {/* 3. Clean Footer on Non-Chat Views */}
      {activeSection !== "search" && (
        <footer className="bg-white border-t border-zinc-200 mt-12 py-6 px-4 sm:px-6 text-xs text-zinc-500">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-900 font-heading">
                RTI Online 2.0
              </span>
              <span className="text-zinc-300">&bull;</span>
              <span>
                National Informatics Centre &bull; Ministry of Personnel, Public Grievances &amp; Pensions
              </span>
            </div>

            <div className="text-zinc-400 text-[11px]">
              WCAG 2.1 AA Compliant &bull; Right to Information Act, 2005
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}
