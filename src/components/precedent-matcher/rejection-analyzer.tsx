"use client";

import React, { useState } from "react";
import { Scale, FileText, Gavel, ArrowRight } from "lucide-react";
import { MOCK_PRECEDENTS, REJECTION_CATEGORIES } from "@/data/mock-precedents";
import { CICPrecedent, SectionType } from "@/types";
import { AppealGeneratorModal } from "./appeal-generator-modal";

interface RejectionAnalyzerProps {
  onSelectSection: (section: SectionType) => void;
}

export function RejectionAnalyzer({ onSelectSection }: RejectionAnalyzerProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("8_1_d");
  const [activePrecedentForAppeal, setActivePrecedentForAppeal] = useState<CICPrecedent | null>(null);

  const matchedPrecedents: CICPrecedent[] = MOCK_PRECEDENTS[selectedCategoryId] || [];
  const activeCategory = REJECTION_CATEGORIES.find((c) => c.id === selectedCategoryId);

  return (
    <div className="py-6 px-3 sm:px-6 max-w-4xl mx-auto space-y-6">
      {/* Clean Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-heading">
          First Appeal Assistance (Section 19)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600">
          Under Section 19(1) of the RTI Act 2005, any citizen aggrieved by a rejection or 30-day deemed refusal can file a First Appeal. Select your ground of appeal below to prepare a substantiated petition.
        </p>
      </div>

      {/* Clean Ground of Appeal Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold text-zinc-700">
          Select the Ground of Appeal or Rejection Clause Cited by PIO:
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {REJECTION_CATEGORIES.map((cat) => {
            const isSelected = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all space-y-1 ${
                  isSelected
                    ? "bg-orange-50/80 border-[#FF6B35] ring-2 ring-[#FF6B35]/20 shadow-xs"
                    : "bg-white border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-900 font-heading">
                    {cat.label.split("-")[0]}
                  </span>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    {cat.successRate}
                  </span>
                </div>
                <p className="text-xs text-zinc-700 font-semibold truncate">
                  {cat.label.split("-")[1]}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Matched Precedents (Clean, spacious card) */}
      <div className="space-y-4">
        {matchedPrecedents.map((prec) => (
          <div
            key={prec.id}
            className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-7 shadow-xs hover:shadow-md transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-zinc-900 text-white">
                  {prec.rulingNumber}
                </span>
                <span className="text-xs font-semibold text-zinc-700">
                  {prec.tribunal}
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                Order Date: {prec.dateOfOrder}
              </span>
            </div>

            <div>
              <h4 className="text-base font-bold text-zinc-900">
                {prec.caseTitle}
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">
                Bench: {prec.bench} &bull; Overruled: <strong className="text-zinc-800">{prec.sectionOverruled}</strong>
              </p>
            </div>

            <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100 space-y-1 text-xs">
              <span className="font-bold text-zinc-700 block">Established Legal Principle (Ratio Decidendi):</span>
              <p className="text-zinc-800 leading-relaxed font-medium">
                {prec.keyPrinciple}
              </p>
            </div>

            <div className="p-3.5 bg-orange-50/50 rounded-2xl border border-orange-100 text-xs text-zinc-700 font-mono italic leading-relaxed">
              &ldquo;{prec.verbatimExcerpt}&rdquo;
            </div>

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between">
              <span className="text-xs text-zinc-500 hidden sm:inline">
                Statutory ground under Section 19(1)
              </span>

              <button
                onClick={() => setActivePrecedentForAppeal(prec)}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105 ml-auto"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Generate Section 19(1) Appeal Petition</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Appeal Generator Modal */}
      {activePrecedentForAppeal && (
        <AppealGeneratorModal
          precedent={activePrecedentForAppeal}
          onClose={() => setActivePrecedentForAppeal(null)}
        />
      )}
    </div>
  );
}
