"use client";

import React from "react";
import { X, Sparkles, AlertTriangle, CheckCircle2, TrendingUp, Users, Clock, ShieldCheck, Building2 } from "lucide-react";

interface WhyEliminateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WhyEliminateModal({ isOpen, onClose }: WhyEliminateModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div 
        className="bg-white w-full max-w-3xl max-h-[90vh] rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 bg-[#1A5276] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Building2 className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300">
                Strategic National Architecture PRD v1.0
              </span>
              <h3 className="text-base font-bold text-white">
                Project SURYA: Re-engineering India&apos;s RTI Infrastructure
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-800 bg-slate-50/50 flex-1">
          {/* Main Statement */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2 text-sm leading-relaxed text-slate-700">
            <p className="font-bold text-slate-900 text-base">
              Product Vision &amp; Architectural North Star
            </p>
            <p>
              <em>&ldquo;Every citizen shall have real-time, zero-friction access to the administrative truth of the Republic — not as a privilege granted by the state, but as a right enforced by technology.&rdquo;</em>
            </p>
            <p className="text-slate-600 text-xs">
              <strong>Mean Time to Truth (MTTT):</strong> The average time between a citizen asking a question and receiving a complete, verifiable answer. Current baseline: 45-90+ days. <strong>SURYA Target: &lt;7 days for 80% of queries.</strong>
            </p>
          </div>

          {/* Key Architectural Pillars from PRD */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 block font-heading">
                1. Open by Default (Sec 4)
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Automated ingestion of tenders, municipal audits, and school grants into the National Transparency Repository before citizens even need to file.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 block font-heading">
                2. Algorithmic SLAs
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Hard-coded 30-day and 48-hr statutory countdowns with automated Section 20(1) personal penalty tracking and HRMS auto-deductions.
              </p>
            </div>

            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 block font-heading">
                3. Unified Inquiries
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Automated NLP clustering consolidates thousands of duplicate queries into single public dockets, eliminating administrative gridlock.
              </p>
            </div>
          </div>

          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <span>
              SURYA aligns with Digital India, Bhashini AI, and DigiLocker frameworks to make transparency universal across 22 scheduled languages.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-slate-200 bg-white flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-[#1A5276] text-white font-bold text-xs">
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}
