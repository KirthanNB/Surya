"use client";

import React, { useState } from "react";
import { 
  X, 
  Award, 
  Video, 
  FileText, 
  HelpCircle, 
  Key, 
  CheckCircle2, 
  Copy, 
  Check, 
  Layers, 
  Sparkles,
  ShieldAlert
} from "lucide-react";
import { HACKATHON_SUBMISSION_DOCS } from "@/data/hackathon-docs";

interface HackathonSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HackathonSubmissionModal({ isOpen, onClose }: HackathonSubmissionModalProps) {
  const [activeTab, setActiveTab] = useState<"summary" | "video" | "answers" | "credentials">("summary");
  const [copiedText, setCopiedText] = useState(false);

  if (!isOpen) return null;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(HACKATHON_SUBMISSION_DOCS.textSummary250Words);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF6B35] to-[#FFA07A] flex items-center justify-center text-white shadow-md">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Build What Moves India Submission Package
                </span>
              </div>
              <h3 className="text-base font-bold text-white">
                Project SURYA &bull; Judge Evaluation &amp; Submission Kit
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center border-b border-zinc-200 bg-zinc-50 px-6 gap-2 pt-2">
          <button
            onClick={() => setActiveTab("summary")}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "summary"
                ? "border-[#FF6B35] text-[#FF6B35] bg-white"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>250-Word Summary</span>
          </button>

          <button
            onClick={() => setActiveTab("video")}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "video"
                ? "border-[#FF6B35] text-[#FF6B35] bg-white"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Video className="w-4 h-4" />
            <span>2-Minute Video Script</span>
          </button>

          <button
            onClick={() => setActiveTab("answers")}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "answers"
                ? "border-[#FF6B35] text-[#FF6B35] bg-white"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>6 Hackathon Questions</span>
          </button>

          <button
            onClick={() => setActiveTab("credentials")}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "credentials"
                ? "border-[#FF6B35] text-[#FF6B35] bg-white"
                : "border-transparent text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Key className="w-4 h-4" />
            <span>Demo Credentials &amp; Guide</span>
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-800 bg-zinc-50/40 flex-1">
          {/* Tab 1: Exact 250-Word Summary */}
          {activeTab === "summary" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Official Hackathon Form Text (Exact Word Limit Compliant)
                  </span>
                </div>
                <button
                  onClick={handleCopySummary}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900 text-white font-semibold text-xs flex items-center gap-1.5 hover:bg-black transition-all"
                >
                  {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedText ? "Copied!" : "Copy Summary Text"}</span>
                </button>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-xs leading-relaxed text-sm text-zinc-800 space-y-3 font-sans whitespace-pre-wrap">
                {HACKATHON_SUBMISSION_DOCS.textSummary250Words}
              </div>

              <div className="p-4 bg-orange-50 rounded-xl border border-orange-200 text-xs text-orange-950 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF6B35]" />
                  The Winning Hook for Judges:
                </span>
                <p>
                  &ldquo;While other teams built forms to file RTIs in 30 seconds, SURYA makes filing obsolete by indexing the 60%+ of data that is already legally public under Section 4.&rdquo;
                </p>
              </div>
            </div>
          )}

          {/* Tab 2: 2-Minute Video Breakdown Script */}
          {activeTab === "video" && (
            <div className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-200 text-blue-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <Video className="w-4 h-4 text-blue-600" />
                  Format: Exactly 2 Minutes (1 Min Demo + 1 Min Tech/Philosophy)
                </span>
                <p className="text-[11px] text-blue-900">
                  Follow this precise script while recording your Loom / OBS screen recording to blow away the VM &amp; OpenAI India judging panel.
                </p>
              </div>

              {/* Segment 1 */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <h4 className="font-bold text-sm text-zinc-900">
                    {HACKATHON_SUBMISSION_DOCS.twoMinuteVideoScript.segment1.title}
                  </h4>
                  <span className="text-[10px] font-mono font-bold bg-orange-100 text-[#E0531D] px-2 py-0.5 rounded-full">
                    {HACKATHON_SUBMISSION_DOCS.twoMinuteVideoScript.segment1.timestamp}
                  </span>
                </div>
                <div className="space-y-2">
                  {HACKATHON_SUBMISSION_DOCS.twoMinuteVideoScript.segment1.speakerNotes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-800 leading-relaxed font-mono">
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              {/* Segment 2 */}
              <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-2">
                  <h4 className="font-bold text-sm text-zinc-900">
                    {HACKATHON_SUBMISSION_DOCS.twoMinuteVideoScript.segment2.title}
                  </h4>
                  <span className="text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                    {HACKATHON_SUBMISSION_DOCS.twoMinuteVideoScript.segment2.timestamp}
                  </span>
                </div>
                <div className="space-y-2">
                  {HACKATHON_SUBMISSION_DOCS.twoMinuteVideoScript.segment2.speakerNotes.map((note, idx) => (
                    <div key={idx} className="p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-xs text-zinc-800 leading-relaxed font-mono">
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: 6 Questions Answered */}
          {activeTab === "answers" && (
            <div className="space-y-4">
              {HACKATHON_SUBMISSION_DOCS.judgingQuestions.map((item, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-2">
                  <h4 className="font-bold text-sm text-zinc-900 font-heading">
                    {item.q}
                  </h4>
                  <p className="text-xs text-zinc-700 leading-relaxed bg-zinc-50 p-3 rounded-xl border border-zinc-100">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Tab 4: Demo Credentials & Guide */}
          {activeTab === "credentials" && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 space-y-1">
                <span className="font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Zero Login Barrier for Judges
                </span>
                <p className="text-[11px] text-emerald-900">
                  Judges can test every single feature immediately without creating an account or providing personal phone numbers.
                </p>
              </div>

              <div className="space-y-3">
                <span className="font-bold text-xs uppercase tracking-wider text-zinc-500 block">
                  Pre-Configured Demo Personas &amp; Tracking Records:
                </span>
                {HACKATHON_SUBMISSION_DOCS.demoAccounts.map((acc, idx) => (
                  <div key={idx} className="bg-white p-4 rounded-xl border border-zinc-200 flex items-center justify-between gap-3">
                    <div>
                      <span className="font-bold text-xs text-zinc-900">{acc.role}</span>
                      <p className="text-[11px] text-zinc-500 mt-0.5">{acc.purpose}</p>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#FF6B35] bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200">
                      {acc.trackingId || acc.bplCardNo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-200 bg-white flex items-center justify-between text-xs">
          <span className="text-zinc-500 flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-[#FF6B35]" />
            <span>Prototype ready for Vercel deployment and video recording.</span>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white font-semibold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
