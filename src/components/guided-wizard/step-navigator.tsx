"use client";

import React from "react";
import { Search, Users, FileText, Clock, Scale, BarChart3, Check } from "lucide-react";
import { SectionType } from "@/types";

interface StepNavigatorProps {
  activeSection: SectionType;
  onSelectSection: (section: SectionType) => void;
}

export function StepNavigator({ activeSection, onSelectSection }: StepNavigatorProps) {
  const steps: { id: SectionType; stepNum: number; title: string; subtitle: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: "search", stepNum: 1, title: "Search First", subtitle: "Section 4 Disclosures", icon: Search },
    { id: "campaigns", stepNum: 2, title: "Public Dockets", subtitle: "Join Collective Query", icon: Users },
    { id: "file-rti", stepNum: 3, title: "Submit Request", subtitle: "AI Wizard & BPL Waiver", icon: FileText },
    { id: "tracker", stepNum: 4, title: "Track Status", subtitle: "Live SLA Countdown", icon: Clock },
    { id: "precedent", stepNum: 5, title: "Appeal Help", subtitle: "CIC Precedents", icon: Scale },
    { id: "scorecard", stepNum: 6, title: "Scorecard", subtitle: "PIO Accountability", icon: BarChart3 },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === activeSection);

  return (
    <div className="w-full bg-white border-b border-zinc-200/80 py-3 px-4 shadow-2xs">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between gap-1 sm:gap-2 overflow-x-auto py-1">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeSection === step.id;
            const isCompleted = idx < currentStepIndex;

            return (
              <button
                key={step.id}
                onClick={() => onSelectSection(step.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all flex-shrink-0 text-left ${
                  isActive
                    ? "bg-[#18181B] text-white shadow-xs"
                    : isCompleted
                    ? "bg-orange-50/80 text-zinc-800 hover:bg-orange-100/60"
                    : "bg-zinc-50 text-zinc-500 hover:bg-zinc-100"
                }`}
              >
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                  isActive
                    ? "bg-[#FF6B35] text-white"
                    : isCompleted
                    ? "bg-emerald-600 text-white"
                    : "bg-zinc-200 text-zinc-600"
                }`}>
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.stepNum}
                </div>

                <div className="hidden sm:block">
                  <span className={`text-xs font-bold block leading-tight ${isActive ? "text-white" : "text-zinc-900"}`}>
                    {step.title}
                  </span>
                  <span className={`text-[10px] block leading-none ${isActive ? "text-zinc-300" : "text-zinc-500"}`}>
                    {step.subtitle}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
