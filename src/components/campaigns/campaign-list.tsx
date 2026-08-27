"use client";

import React, { useState } from "react";
import { 
  Users, 
  Building, 
  CheckCircle2, 
  Clock, 
  Sparkles, 
  Layers, 
  PlusCircle, 
  ArrowRight 
} from "lucide-react";
import { MOCK_COLLECTIVE_DOCKETS } from "@/data/mock-campaigns";
import { CollectiveDocket, SectionType } from "@/types";
import { JoinCampaignModal } from "./join-campaign-modal";

interface CampaignListProps {
  onSelectSection: (section: SectionType) => void;
}

export function CampaignList({ onSelectSection }: CampaignListProps) {
  const [dockets, setDockets] = useState<CollectiveDocket[]>(MOCK_COLLECTIVE_DOCKETS);
  const [selectedDocketForJoin, setSelectedDocketForJoin] = useState<CollectiveDocket | null>(null);
  const [expandedDocketId, setExpandedDocketId] = useState<string | null>(null);
  const [clusteringDemoQuery, setClusteringDemoQuery] = useState("");
  const [showClusterMatchNotice, setShowClusterMatchNotice] = useState(false);

  const handleSuccessSubscribe = (docketId: string, citizenName: string, subQuery?: string) => {
    setDockets((prev) =>
      prev.map((d) =>
        d.id === docketId
          ? {
              ...d,
              totalSubscribers: d.totalSubscribers + 1,
              demandedInformationItems: subQuery
                ? [...d.demandedInformationItems, `[Appended by ${citizenName}]: ${subQuery}`]
                : d.demandedInformationItems,
            }
          : d
      )
    );
  };

  const handleSimulateClusterCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clusteringDemoQuery.trim()) return;
    setShowClusterMatchNotice(true);
  };

  const totalCitizensUnified = dockets.reduce((acc, d) => acc + d.totalSubscribers, 0);

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/80 text-[#E0531D] text-xs font-semibold">
          <Layers className="w-3.5 h-3.5 text-[#FF6B35]" />
          <span>Step 2A: Collective Public Inquiries</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-heading">
          System-Clustered Public Dockets
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600">
          When multiple citizens inquire about the same public project or department, the system auto-clusters them into a <strong>Single Consolidated Docket</strong>. Subscribe for free with 1-click or append your sub-question.
        </p>
      </div>

      {/* Clean Unified Citizens Counter */}
      <div className="bg-zinc-900 text-white p-5 rounded-2xl border border-zinc-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#FF6B35] flex items-center justify-center flex-shrink-0 font-bold">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-white font-heading">{totalCitizensUnified.toLocaleString()}</span>
              <span className="text-xs text-orange-300 font-medium bg-orange-950/60 px-2 py-0.5 rounded border border-orange-800">
                Co-Requesters Unified
              </span>
            </div>
            <p className="text-xs text-zinc-400 mt-0.5">
              Consolidated across 3 Active High-Density Public Dockets &bull; Zero Filing Fees
            </p>
          </div>
        </div>

        <button
          onClick={() => onSelectSection("file-rti")}
          className="w-full md:w-auto px-4 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Draft Unique Inquiry</span>
        </button>
      </div>

      {/* Cluster Search Bar */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">
          Check if Your Question is in an Active Clustered Docket:
        </span>
        <form onSubmit={handleSimulateClusterCheck} className="flex gap-2">
          <input
            type="text"
            value={clusteringDemoQuery}
            onChange={(e) => {
              setClusteringDemoQuery(e.target.value);
              setShowClusterMatchNotice(false);
            }}
            placeholder="E.g., Bangalore Metro Phase 2 delay, BMC pothole repairs, Delhi school science teachers..."
            className="flex-1 px-4 py-2.5 rounded-xl border border-zinc-300 text-xs focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-zinc-900 text-white text-xs font-semibold hover:bg-black transition-all"
          >
            Check Cluster
          </button>
        </form>

        {showClusterMatchNotice && (
          <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 flex items-center justify-between animate-in fade-in">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span><strong>Cluster Match Found!</strong> 4,892 citizens are already co-inquiring regarding this subject with BMRCL.</span>
            </span>
            <button
              onClick={() => setSelectedDocketForJoin(dockets[0])}
              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs"
            >
              Subscribe (Zero Fee)
            </button>
          </div>
        )}
      </div>

      {/* Active Dockets Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-zinc-800 flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#FF6B35]" />
          <span>Active Consolidated Dockets ({dockets.length})</span>
        </h3>

        <div className="grid grid-cols-1 gap-4">
          {dockets.map((docket) => {
            const isExpanded = expandedDocketId === docket.id;
            const progressPct = Math.min(100, Math.round((docket.totalSubscribers / docket.thresholdForExpeditedHearing) * 100));

            return (
              <div
                key={docket.id}
                className="bg-white rounded-2xl border border-zinc-200 shadow-xs hover:shadow-md transition-all p-5 sm:p-6 space-y-4"
              >
                {/* Top Details */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-zinc-800 bg-zinc-100 px-2.5 py-1 rounded-md">
                      {docket.id}
                    </span>
                    <span className="text-xs text-zinc-500 font-medium">
                      Auto-clustered: {docket.autoClusteredDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    {docket.status === "disclosed_publicly" ? (
                      <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Disclosed &amp; Published
                      </span>
                    ) : docket.status === "under_pio_review" ? (
                      <span className="bg-blue-100 text-blue-800 font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-blue-600" /> Under PIO Review
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 font-bold px-2.5 py-0.5 rounded-full">
                        Active Gathering
                      </span>
                    )}
                    <span className="text-zinc-500 font-mono font-semibold">{docket.daysRemainingInSLA} Days in SLA</span>
                  </div>
                </div>

                {/* Title and Authority */}
                <div>
                  <h4 className="text-base font-bold text-zinc-900 leading-snug">
                    {docket.clusterTitle}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{docket.targetDepartment} &bull; {docket.jurisdiction}</span>
                  </p>
                </div>

                {/* System Clustering Explanation */}
                <div className="bg-zinc-50 p-3 rounded-xl border border-zinc-100 text-xs text-zinc-700 space-y-1">
                  <span className="font-bold text-[#FF6B35] flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    System Clustering Reasoning:
                  </span>
                  <p className="text-[11px] text-zinc-600 leading-relaxed">
                    {docket.systemReasoning}
                  </p>
                </div>

                {/* Demanded Records */}
                <div className="space-y-1.5 text-xs">
                  <span className="font-bold text-zinc-700 block">Consolidated Demands:</span>
                  <ul className="space-y-1 text-zinc-600">
                    {docket.demandedInformationItems.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#FF6B35] font-bold">&bull;</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscriber Progress */}
                <div className="space-y-1 pt-1">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-zinc-800 flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-[#FF6B35]" />
                      <span>{docket.totalSubscribers.toLocaleString()} Co-Requesters Subscribed</span>
                    </span>
                    <span className="text-zinc-500 font-mono">
                      {progressPct}% of {docket.thresholdForExpeditedHearing.toLocaleString()} Threshold
                    </span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#FF6B35] to-emerald-500 transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {/* Expanded Updates */}
                {isExpanded && (
                  <div className="pt-3 border-t border-zinc-100 space-y-2 text-xs animate-in fade-in">
                    <span className="font-bold text-zinc-800 block">Official Docket Filings &amp; Notices:</span>
                    <div className="space-y-2 pl-2 border-l-2 border-orange-200">
                      {docket.officialResponses.map((res, rIdx) => (
                        <div key={rIdx} className="space-y-0.5">
                          <div className="flex items-center justify-between text-[11px]">
                            <span className="font-semibold text-zinc-800">{res.title}</span>
                            <span className="text-zinc-400 font-mono">{res.date}</span>
                          </div>
                          <p className="text-zinc-600 text-[11px]">{res.description}</p>
                          <span className="text-[10px] text-zinc-400 italic">Issued by: {res.issuedBy}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => setExpandedDocketId(isExpanded ? null : docket.id)}
                    className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    {isExpanded ? "Hide Updates" : `View Updates (${docket.officialResponses.length})`}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedDocketForJoin(docket)}
                    className="px-4 py-2 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                  >
                    <Users className="w-3.5 h-3.5" />
                    <span>Subscribe (Zero Fee)</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subscribe Modal */}
      {selectedDocketForJoin && (
        <JoinCampaignModal
          docket={selectedDocketForJoin}
          onClose={() => setSelectedDocketForJoin(null)}
          onSuccessSubscribe={handleSuccessSubscribe}
        />
      )}
    </div>
  );
}
