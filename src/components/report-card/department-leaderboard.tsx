"use client";

import React, { useState } from "react";
import { 
  BarChart3, 
  Award, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown, 
  Building, 
  CheckCircle2, 
  Flame, 
  Filter,
  ShieldCheck,
  Search
} from "lucide-react";
import { MOCK_DEPARTMENTS } from "@/data/mock-departments";
import { DepartmentScorecard, SectionType } from "@/types";
import { MetricsCharts } from "./metrics-charts";

interface DepartmentLeaderboardProps {
  onSelectSection: (section: SectionType) => void;
}

export function DepartmentLeaderboard({ onSelectSection }: DepartmentLeaderboardProps) {
  const [jurisdictionFilter, setJurisdictionFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDepts = MOCK_DEPARTMENTS.filter((d) => {
    const matchJur = jurisdictionFilter === "all" || d.jurisdiction.toLowerCase() === jurisdictionFilter;
    const matchSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) || d.ministry.toLowerCase().includes(searchTerm.toLowerCase());
    return matchJur && matchSearch;
  });

  const getGradeBadge = (grade: DepartmentScorecard["grade"]) => {
    switch (grade) {
      case "A+":
      case "A":
        return "bg-emerald-100 text-emerald-800 border-emerald-300";
      case "B":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "C":
        return "bg-amber-100 text-amber-800 border-amber-300";
      case "D":
      case "F":
        return "bg-red-100 text-red-800 border-red-300 animate-pulse";
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100/80 text-[#E0531D] text-xs font-semibold">
          <BarChart3 className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>Pillar 5: Public PIO Report Card</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 tracking-tight font-heading">
          National Transparency &amp; PIO Leaderboard
        </h2>
        <p className="text-sm sm:text-base text-zinc-600">
          Rank every government department by response latency, rejection rates, proactive disclosure compliance, and personal Section 20 penalties levied against officers.
        </p>
      </div>

      {/* Visual Analytics Charts */}
      <MetricsCharts departments={MOCK_DEPARTMENTS} />

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-zinc-200 shadow-xs">
        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Ministry or Dept..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-zinc-300 focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]"
          />
        </div>

        {/* Jurisdiction Filter Buttons */}
        <div className="flex items-center gap-1.5 text-xs w-full sm:w-auto overflow-x-auto">
          <span className="text-zinc-500 font-semibold flex items-center gap-1 mr-1">
            <Filter className="w-3 h-3 text-zinc-400" /> Tier:
          </span>
          {["all", "central", "state", "municipal"].map((tier) => (
            <button
              key={tier}
              onClick={() => setJurisdictionFilter(tier)}
              className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                jurisdictionFilter === tier
                  ? "bg-zinc-900 text-white font-bold"
                  : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDepts.map((dept) => (
          <div
            key={dept.id}
            className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-xs hover:shadow-md hover:border-orange-200 transition-all space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Header with Letter Grade */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">
                    {dept.jurisdiction} Authority &bull; {dept.ministry}
                  </span>
                  <h3 className="text-sm font-bold text-zinc-900 mt-0.5 leading-snug">
                    {dept.name}
                  </h3>
                </div>

                <div className={`px-3 py-1.5 rounded-xl border text-center font-extrabold text-base sm:text-lg ${getGradeBadge(dept.grade)}`}>
                  <span className="block text-[9px] uppercase font-bold tracking-widest text-zinc-500">Grade</span>
                  {dept.grade}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <div className="bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                  <span className="text-[10px] text-zinc-500 block">Avg Response</span>
                  <span className={`font-bold ${dept.avgResponseDays > 30 ? "text-red-600" : "text-zinc-900"}`}>
                    {dept.avgResponseDays} Days
                  </span>
                </div>

                <div className="bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                  <span className="text-[10px] text-zinc-500 block">Rejection Rate</span>
                  <span className={`font-bold ${dept.rejectionRate > 20 ? "text-red-600" : "text-zinc-900"}`}>
                    {dept.rejectionRate}%
                  </span>
                </div>

                <div className="bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                  <span className="text-[10px] text-zinc-500 block">Sec 4 Proactive</span>
                  <span className="font-bold text-emerald-700">
                    {dept.proactiveDisclosureRate}%
                  </span>
                </div>

                <div className="bg-zinc-50 p-2 rounded-lg border border-zinc-100">
                  <span className="text-[10px] text-zinc-500 block">Penalties</span>
                  <span className="font-bold text-orange-700">
                    ₹{(dept.penaltiesLeviedINR / 1000).toFixed(0)}k
                  </span>
                </div>
              </div>

              {/* Chronic Delay Warning */}
              {dept.chronicDelayOffices.length > 0 && (
                <div className="p-2.5 bg-red-50/60 rounded-xl border border-red-200/60 text-[11px] text-zinc-700">
                  <span className="font-semibold text-red-900 flex items-center gap-1 mb-0.5">
                    <AlertTriangle className="w-3 h-3 text-red-600" />
                    Chronic Delay &amp; Penalty Warning Offices:
                  </span>
                  <span className="text-zinc-600">
                    {dept.chronicDelayOffices.join(", ")}
                  </span>
                </div>
              )}
            </div>

            {/* Top Query Categories */}
            <div className="pt-2 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-1 text-[11px]">
              <span className="text-zinc-400">Frequent Inquiries:</span>
              <div className="flex flex-wrap gap-1">
                {dept.topCategories.map((cat, cIdx) => (
                  <span key={cIdx} className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-600 text-[10px]">
                    {cat}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
