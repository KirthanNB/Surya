"use client";

import React, { useState, useEffect } from "react";
import { 
  Search, 
  CheckCircle2, 
  AlertTriangle, 
  Building, 
  Scale, 
  Download,
  ArrowRight,
  Clock
} from "lucide-react";
import { MOCK_TRACKING_RECORDS } from "@/data/mock-tracking";
import { RTITrackingRecord, SectionType } from "@/types";
import { PenaltyCountdownClock } from "./penalty-countdown-clock";
import { downloadTextFile } from "@/lib/export-utils";

interface LifecycleTrackerProps {
  onSelectSection: (section: SectionType) => void;
}

export function LifecycleTracker({ onSelectSection }: LifecycleTrackerProps) {
  const defaultRecords: RTITrackingRecord[] = Object.values(MOCK_TRACKING_RECORDS);
  const [records, setRecords] = useState<RTITrackingRecord[]>(defaultRecords);
  const [selectedRecord, setSelectedRecord] = useState<RTITrackingRecord | null>(null);
  const [hasUserCreatedRTI, setHasUserCreatedRTI] = useState(false);
  const [searchToken, setSearchToken] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const customRaw = localStorage.getItem("surya_custom_rtis");
      if (customRaw) {
        try {
          const customList: RTITrackingRecord[] = JSON.parse(customRaw);
          if (customList.length > 0) {
            setHasUserCreatedRTI(true);
            const combined = [...customList, ...defaultRecords];
            setRecords(combined);
            setSelectedRecord(customList[0]);
            return;
          }
        } catch {
          // fallback
        }
      }
      // If no custom RTI, default to first demo record
      setSelectedRecord(defaultRecords[0]);
    }
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchToken.trim()) return;

    const matched = records.find(
      (r) =>
        r.applicationId.toLowerCase().includes(searchToken.toLowerCase()) ||
        r.maskedAadhaar.includes(searchToken)
    );

    if (matched) {
      setSelectedRecord(matched);
    } else {
      alert(`No active filing found for "${searchToken}". Try searching for RTI-2024-KA-8891 or lodge a new application.`);
    }
  };

  const handleDownloadStatus = () => {
    if (!selectedRecord) return;
    const content = `GOVERNMENT OF INDIA - RTI STATUS & SLA AUDIT CERTIFICATE
========================================================================
Application Number: ${selectedRecord.applicationId}
Filing Date: ${selectedRecord.filingDate}
Public Authority: ${selectedRecord.department}
Assigned PIO: ${selectedRecord.pioName}
Subject: ${selectedRecord.subject}

STATUTORY COMPLIANCE (Section 7(1) RTI Act, 2005):
- Statutory Time Limit: ${selectedRecord.statutoryDeadlineDays} Days
- Days Elapsed: ${selectedRecord.daysElapsed} Days
- Status: ${selectedRecord.status.toUpperCase()}
- Current Accumulated Penalty under Section 20(1): ₹${selectedRecord.accumulatedPenalty.toLocaleString()}

EVENT AUDIT TIMELINE:
${selectedRecord.stages.map((s) => `[Stage ${s.stageNumber}] ${s.title} - Status: ${s.status.toUpperCase()}${s.timestamp ? ` (${s.timestamp})` : ""} - Officer: ${s.officerRole || "N/A"}`).join("\n")}

Certificate Verification Hash: 0x${Math.random().toString(16).substring(2, 10)}
Generated via RTI Online 2.0 National Transparency Portal`;

    downloadTextFile(`RTI_Status_${selectedRecord.applicationId}.txt`, content);
  };

  return (
    <div className="py-6 px-3 sm:px-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-heading">
          Track RTI Status &amp; Statutory SLA
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600">
          Section 7(1) mandates a strict 30-day resolution deadline. If 30 days elapse without a reply, you become eligible for a First Appeal under Section 19(1).
        </p>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-3">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchToken}
              onChange={(e) => setSearchToken(e.target.value)}
              placeholder="Search by Tracking ID (e.g. RTI-2024-KA-8891) or Aadhaar..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]"
            />
          </div>
          <button
            type="submit"
            className="px-4 sm:px-5 py-2.5 rounded-xl bg-zinc-900 text-white text-xs sm:text-sm font-bold hover:bg-black transition-all"
          >
            Track Status
          </button>
        </form>

        {/* Quick Sample Selector */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-semibold text-zinc-500">Sample Records:</span>
          {records.slice(0, 4).map((rec) => (
            <button
              key={rec.applicationId}
              onClick={() => setSelectedRecord(rec)}
              className={`text-xs px-2.5 py-1 rounded-lg border font-mono transition-all ${
                selectedRecord?.applicationId === rec.applicationId
                  ? "bg-orange-100 text-[#FF6B35] border-[#FF6B35] font-bold"
                  : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
              }`}
            >
              {rec.applicationId}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Record View */}
      {selectedRecord && (
        <div className="space-y-5 animate-in fade-in">
          {/* Live Countdown Clock */}
          <PenaltyCountdownClock record={selectedRecord} />

          {/* If 30-day limit expired or rejected: Prominent First Appeal Action */}
          {(selectedRecord.daysElapsed >= selectedRecord.statutoryDeadlineDays || selectedRecord.status === "rejected") && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-50 border border-amber-300 flex flex-col sm:flex-row items-center justify-between gap-3 text-zinc-900">
              <div className="space-y-0.5 text-center sm:text-left">
                <span className="font-bold text-xs sm:text-sm text-amber-900 flex items-center justify-center sm:justify-start gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-amber-700" />
                  30-Day Period Elapsed &bull; Right to First Appeal Active
                </span>
                <p className="text-xs text-zinc-700">
                  Under Section 19(1), failure to provide information within 30 days is deemed a refusal. You may file a First Appeal to the Appellate Authority.
                </p>
              </div>

              <button
                onClick={() => onSelectSection("precedent")}
                className="px-5 py-2.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm flex-shrink-0 transition-all hover:scale-105"
              >
                <Scale className="w-4 h-4 text-amber-300" />
                <span>Lodge Section 19(1) First Appeal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Main Lifecycle Card */}
          <div className="bg-white rounded-3xl border border-zinc-200 p-5 sm:p-7 shadow-sm space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs sm:text-sm font-extrabold text-zinc-900 bg-zinc-100 px-2.5 py-1 rounded-md">
                    {selectedRecord.applicationId}
                  </span>
                  <span className="text-xs text-zinc-500">
                    Filed on: {selectedRecord.filingDate}
                  </span>
                </div>
                <h3 className="text-base font-bold text-zinc-900 mt-2">
                  {selectedRecord.subject}
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{selectedRecord.department} &bull; PIO: {selectedRecord.pioName}</span>
                </p>
              </div>

              <button
                onClick={handleDownloadStatus}
                className="px-3.5 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Audit Certificate (.txt)</span>
              </button>
            </div>

            {/* 5-Stage Event Tracker */}
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 block">
                Official Event Audit Trail:
              </span>

              <div className="relative pl-6 space-y-6 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-200">
                {selectedRecord.stages.map((stage) => {
                  const isCompleted = stage.status === "completed";
                  const isInProgress = stage.status === "in_progress";
                  const isDelayed = stage.status === "delayed";

                  return (
                    <div key={stage.stageNumber} className="relative space-y-1">
                      <div
                        className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          isCompleted
                            ? "bg-emerald-600 text-white"
                            : isInProgress
                            ? "bg-[#FF6B35] text-white ring-4 ring-orange-100 animate-pulse"
                            : isDelayed
                            ? "bg-red-600 text-white"
                            : "bg-zinc-200 text-zinc-500"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : stage.stageNumber}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-1 text-xs">
                        <span className={`font-bold ${isCompleted ? "text-zinc-900" : isInProgress ? "text-[#FF6B35]" : "text-zinc-500"}`}>
                          {stage.title}
                        </span>
                        {stage.timestamp && (
                          <span className="text-[11px] font-mono text-zinc-400">
                            {stage.timestamp}
                          </span>
                        )}
                      </div>

                      {stage.officerRole && (
                        <p className="text-[11px] text-zinc-500">
                          Custodian: <span className="font-semibold text-zinc-700">{stage.officerRole}</span>
                        </p>
                      )}

                      {stage.remarks && (
                        <p className="text-[11px] text-zinc-600 bg-zinc-50 p-2.5 rounded-xl border border-zinc-100">
                          {stage.remarks}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
