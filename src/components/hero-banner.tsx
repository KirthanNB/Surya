"use client";

import React from "react";
import { 
  Search, 
  FileText, 
  Clock, 
  ShieldCheck, 
  ArrowRight,
  Database,
  Sparkles,
  Users
} from "lucide-react";
import { SectionType } from "@/types";

interface HeroBannerProps {
  onSelectSection: (section: SectionType) => void;
  onOpenWhyEliminate: () => void;
}

export function HeroBanner({ onSelectSection, onOpenWhyEliminate }: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#FFF0EB]/40 via-[#FAFAF7] to-[#FAFAF7] border-b border-zinc-200/80 py-10 px-4 sm:px-6 lg:px-8">
      {/* Subtle Glow Backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-[#FF6B35]/10 to-amber-200/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Tag */}
        <div className="flex items-center justify-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/80 border border-orange-200/80 text-[#E0531D] text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>National Transparency Operating System &bull; RTI Act 2005</span>
          </div>
        </div>

        {/* Hero Title & Simple Purpose */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 tracking-tight leading-tight font-heading">
            Universal &amp; Proactive Access to <br className="hidden sm:inline" />
            <span className="text-[#FF6B35]">Administrative Truth</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Search over <strong>4.2 million proactively published Section 4 records</strong> before filing. If your record isn&apos;t public, file with AI guidance or subscribe to a collective public docket.
          </p>
        </div>

        {/* Guided 3-Step Citizen Roadmap (Crystal Clear, Step-by-Step) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Step 1 */}
          <div 
            onClick={() => onSelectSection("search")}
            className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer space-y-2.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-orange-100 text-[#FF6B35] font-extrabold text-xs flex items-center justify-center">
                1
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                Instant (0s)
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#FF6B35] transition-colors flex items-center justify-between">
              <span>Search Disclosures</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Query 12 open government databases for sanction orders, tenders, and budgets already published under Section 4.
            </p>
          </div>

          {/* Step 2 */}
          <div 
            onClick={() => onSelectSection("file-rti")}
            className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer space-y-2.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-blue-100 text-blue-700 font-extrabold text-xs flex items-center justify-center">
                2
              </span>
              <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full">
                AI Guided
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#FF6B35] transition-colors flex items-center justify-between">
              <span>Submit or Join Docket</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Express in everyday words (Hindi, Tamil, English). AI structures itemized Section 6(1) requests with 100% BPL fee waiver.
            </p>
          </div>

          {/* Step 3 */}
          <div 
            onClick={() => onSelectSection("tracker")}
            className="p-5 rounded-2xl bg-white border border-zinc-200 shadow-xs hover:shadow-md hover:border-orange-300 transition-all cursor-pointer space-y-2.5 group"
          >
            <div className="flex items-center justify-between">
              <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 font-extrabold text-xs flex items-center justify-center">
                3
              </span>
              <span className="text-[11px] font-semibold text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded-full">
                SLA Tracked
              </span>
            </div>
            <h3 className="text-sm font-bold text-zinc-900 group-hover:text-[#FF6B35] transition-colors flex items-center justify-between">
              <span>Track Live SLA Clock</span>
              <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed">
              Follow your application across 5 stages with live statutory 30-day countdowns and Section 20 accountability tracking.
            </p>
          </div>
        </div>

        {/* 3 Clean, High-Impact Transparency Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white/80 p-4 rounded-xl border border-zinc-200/80 text-center">
            <p className="text-2xl font-extrabold text-[#FF6B35] font-heading">4.2M+</p>
            <p className="text-xs font-semibold text-zinc-800 mt-0.5">Section 4 Proactive Records</p>
            <p className="text-[11px] text-zinc-500">Searchable across 12 open portals</p>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-zinc-200/80 text-center">
            <p className="text-2xl font-extrabold text-emerald-700 font-heading">&lt; 7 Days</p>
            <p className="text-xs font-semibold text-zinc-800 mt-0.5">Mean Time to Truth (MTTT)</p>
            <p className="text-[11px] text-zinc-500">Target for verified administrative data</p>
          </div>

          <div className="bg-white/80 p-4 rounded-xl border border-zinc-200/80 text-center">
            <p className="text-2xl font-extrabold text-zinc-900 font-heading">17.95 Lakhs</p>
            <p className="text-xs font-semibold text-zinc-800 mt-0.5">Applications Processed</p>
            <p className="text-[11px] text-zinc-500">Across Central &amp; State Authorities</p>
          </div>
        </div>
      </div>
    </div>
  );
}
