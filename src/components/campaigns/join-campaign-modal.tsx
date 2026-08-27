"use client";

import React, { useState } from "react";
import { 
  X, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  FileText, 
  PlusCircle, 
  Clock,
  Download,
  Printer
} from "lucide-react";
import confetti from "canvas-confetti";
import { CollectiveDocket } from "@/types";
import { downloadTextFile, printFormattedDocument } from "@/lib/export-utils";

interface JoinCampaignModalProps {
  docket: CollectiveDocket;
  onClose: () => void;
  onSuccessSubscribe: (docketId: string, citizenName: string, subQuery?: string) => void;
}

export function JoinCampaignModal({
  docket,
  onClose,
  onSuccessSubscribe,
}: JoinCampaignModalProps) {
  const [citizenName, setCitizenName] = useState("Kirthan N. B.");
  const [maskedAadhaar, setMaskedAadhaar] = useState("XXXX-XXXX-9921");
  const [hasSubQuery, setHasSubQuery] = useState(false);
  const [subQueryText, setSubQueryText] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = () => {
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setIsSubscribed(true);
      onSuccessSubscribe(docket.id, citizenName, hasSubQuery ? subQueryText : undefined);

      try {
        confetti({
          particleCount: 75,
          spread: 60,
          origin: { y: 0.6 },
          colors: ["#FF6B35", "#15803D", "#FFA07A"]
        });
      } catch {
        // test fallback
      }
    }, 1000);
  };

  const handleDownloadCoFilerPass = () => {
    const content = `GOVERNMENT OF INDIA - COLLECTIVE PUBLIC DOCKET CO-FILER PASS
========================================================================
Docket Reference: ${docket.id}
Docket Title: ${docket.clusterTitle}
Target Authority: ${docket.targetDepartment}
Co-Requester Name: ${citizenName}
Aadhaar Authentication: Verified via DigiLocker (${maskedAadhaar})
Filing Fee: ZERO (Consolidated Collective Inquiry)
Statutory SLA Remaining: ${docket.daysRemainingInSLA} Days
Total Co-Requesters: ${(docket.totalSubscribers + 1).toLocaleString()}

Demanded Certified Information:
${docket.demandedInformationItems.map((item, idx) => `${idx + 1}. ${item}`).join("\n")}
${hasSubQuery ? `\nAppended Specific Sub-Query:\n* ${subQueryText}` : ""}

Issued via National Transparency Portal (RTI Online 2.0)`;

    downloadTextFile(`Co_Filer_Pass_${docket.id}.txt`, content);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#18181B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-[#FF6B35] flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-orange-400">
                Consolidated Docket &bull; Zero Filing Fee
              </span>
              <h3 className="text-sm font-bold text-white">
                Subscribe to Public Inquiry
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!isSubscribed ? (
          <div className="p-6 space-y-4 text-xs text-zinc-700">
            <div className="bg-zinc-50 p-3.5 rounded-xl border border-zinc-200 space-y-1">
              <span className="text-zinc-500 uppercase text-[10px] font-bold block">Consolidated Subject:</span>
              <p className="font-bold text-zinc-900 text-xs">{docket.clusterTitle}</p>
              <p className="text-[11px] text-zinc-500">{docket.targetDepartment} &bull; {docket.totalSubscribers.toLocaleString()} Co-Citizens</p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Your Name:</label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs font-semibold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-zinc-700 mb-1">Masked Aadhaar / Voter ID:</label>
                <input
                  type="text"
                  value={maskedAadhaar}
                  onChange={(e) => setMaskedAadhaar(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs font-mono"
                />
              </div>

              <div className="pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasSubQuery}
                    onChange={(e) => setHasSubQuery(e.target.checked)}
                    className="rounded border-zinc-300 text-[#FF6B35] focus:ring-[#FF6B35]"
                  />
                  <span className="font-bold text-zinc-900 text-xs">Append an itemized sub-question to this docket</span>
                </label>
              </div>

              {hasSubQuery && (
                <div className="space-y-1 animate-in fade-in">
                  <textarea
                    rows={2}
                    value={subQueryText}
                    onChange={(e) => setSubQueryText(e.target.value)}
                    placeholder="E.g., Specifically regarding pier 140 to 160 structural cracks inspection..."
                    className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs"
                  />
                </div>
              )}
            </div>

            <button
              onClick={handleSubscribe}
              disabled={isSubscribing}
              className="w-full py-3 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50"
            >
              {isSubscribing ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Subscribing &amp; Adding Sub-Point...</span>
                </>
              ) : (
                <>
                  <Users className="w-4 h-4" />
                  <span>Subscribe to Docket (Zero Fee)</span>
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="p-6 text-center space-y-4 animate-in fade-in">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-zinc-900">
                Subscribed as Co-Requester!
              </h3>
              <p className="text-xs text-zinc-600">
                You will receive SMS &amp; Email alerts when the PIO uploads the public response.
              </p>
            </div>

            <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-200 text-xs font-mono">
              Co-Filer ID: DOCKET-SUB-{Math.floor(10000 + Math.random() * 90000)}
            </div>

            <div className="flex items-center justify-center gap-2 pt-2">
              <button
                onClick={handleDownloadCoFilerPass}
                className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Pass (.txt)</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
