"use client";

import React, { useState, useEffect } from "react";
import { Clock, AlertTriangle, ShieldCheck } from "lucide-react";
import { RTITrackingRecord } from "@/types";

interface PenaltyCountdownClockProps {
  record: RTITrackingRecord;
}

export function PenaltyCountdownClock({ record }: PenaltyCountdownClockProps) {
  // Live seconds countdown ticker
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    const totalStatutorySec = record.statutoryDeadlineDays * 86400;
    const elapsedSec = record.daysElapsed * 86400;
    return Math.max(0, totalStatutorySec - elapsedSec);
  });

  const isExpired = record.daysElapsed >= record.statutoryDeadlineDays;

  useEffect(() => {
    if (isExpired) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [isExpired]);

  const days = Math.floor(secondsRemaining / 86400);
  const hours = Math.floor((secondsRemaining % 86400) / 3600);
  const minutes = Math.floor((secondsRemaining % 3600) / 60);
  const seconds = secondsRemaining % 60;

  return (
    <div className={`p-5 rounded-2xl border transition-all ${
      isExpired
        ? "bg-red-50/90 border-red-200 text-red-950"
        : "bg-emerald-50/90 border-emerald-200 text-emerald-950"
    }`}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side Details */}
        <div className="space-y-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            {isExpired ? (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-200 text-red-900">
                <AlertTriangle className="w-3.5 h-3.5" />
                Statutory 30-Day Limit Expired &bull; Section 19(1) Appeal Due
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                <ShieldCheck className="w-3.5 h-3.5" />
                Active Section 7(1) Statutory Countdown
              </span>
            )}
          </div>
          <h3 className="font-extrabold text-base text-zinc-900">
            {isExpired ? "Deemed Refusal under Section 7(2)" : "Time Remaining for Public Information Officer to Respond"}
          </h3>
          <p className="text-xs text-zinc-600">
            {isExpired
              ? `The 30-day statutory response deadline expired ${record.daysElapsed - record.statutoryDeadlineDays} days ago. Citizen is entitled to First Appeal.`
              : `Statutory limit: ${record.statutoryDeadlineDays} Days. Under Section 7(6), delay entitles citizen to free certified records.`}
          </p>
        </div>

        {/* Right Side Live Countdown Display */}
        {!isExpired ? (
          <div className="flex items-center gap-2 font-mono text-center flex-shrink-0">
            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 shadow-2xs min-w-[54px]">
              <span className="text-xl font-extrabold text-zinc-900 block leading-none">{days}</span>
              <span className="text-[10px] text-zinc-500 font-sans uppercase font-bold">Days</span>
            </div>
            <span className="text-lg font-bold text-zinc-400">:</span>
            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 shadow-2xs min-w-[54px]">
              <span className="text-xl font-extrabold text-zinc-900 block leading-none">{hours.toString().padStart(2, '0')}</span>
              <span className="text-[10px] text-zinc-500 font-sans uppercase font-bold">Hours</span>
            </div>
            <span className="text-lg font-bold text-zinc-400">:</span>
            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 shadow-2xs min-w-[54px]">
              <span className="text-xl font-extrabold text-zinc-900 block leading-none">{minutes.toString().padStart(2, '0')}</span>
              <span className="text-[10px] text-zinc-500 font-sans uppercase font-bold">Mins</span>
            </div>
            <span className="text-lg font-bold text-zinc-400">:</span>
            <div className="bg-white p-2.5 rounded-xl border border-emerald-200 shadow-2xs min-w-[54px]">
              <span className="text-xl font-extrabold text-[#FF6B35] block leading-none">{seconds.toString().padStart(2, '0')}</span>
              <span className="text-[10px] text-zinc-500 font-sans uppercase font-bold">Secs</span>
            </div>
          </div>
        ) : (
          <div className="bg-white p-3 rounded-xl border border-red-200 text-center shadow-2xs flex-shrink-0">
            <span className="text-[10px] uppercase font-bold text-red-600 block">Personal Fine Accruing</span>
            <span className="text-xl font-extrabold text-red-700 font-mono block">₹{record.accumulatedPenalty.toLocaleString()}</span>
            <span className="text-[10px] text-zinc-500 font-sans">₹250/day per Sec 20(1)</span>
          </div>
        )}
      </div>
    </div>
  );
}
