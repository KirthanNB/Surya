"use client";

import React from "react";
import { X, Layers, Server, ShieldCheck, Database, Cpu, Globe, Lock, CheckCircle2 } from "lucide-react";

interface SystemArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SystemArchitectureModal({ isOpen, onClose }: SystemArchitectureModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in">
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 text-[#FF6B35] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-orange-400">
                End-to-End Technical Blueprint
              </span>
              <h3 className="text-base font-bold text-white">
                How Project SURYA Scales Safely to 1.4 Billion Citizens
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-800 bg-zinc-50/50 flex-1">
          {/* Architecture Diagram Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Layer 1 */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                1
              </div>
              <h4 className="font-bold text-sm text-zinc-900">
                Section 4 Automated Crawler Pipeline
              </h4>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                Asynchronous headless workers index public gazettes, municipal tenders (GeM), CAG audit PDF tables, and state proactive disclosure desks into structured JSON schemas.
              </p>
              <div className="p-2 bg-blue-50 rounded-lg text-[10px] text-blue-900 font-mono">
                Tech: Python Scrapy, Playwright, OCR Parser
              </div>
            </div>

            {/* Layer 2 */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6B35] flex items-center justify-center font-bold">
                2
              </div>
              <h4 className="font-bold text-sm text-zinc-900">
                Semantic Vector Search &amp; Precedent Store
              </h4>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                650,000+ landmark Central Information Commission orders and state disclosures embedded using OpenAI / Vertex embeddings, enabling instant matching in &lt;100ms.
              </p>
              <div className="p-2 bg-orange-50 rounded-lg text-[10px] text-orange-950 font-mono">
                Tech: pgvector / Pinecone, HNSW Indexing
              </div>
            </div>

            {/* Layer 3 */}
            <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                3
              </div>
              <h4 className="font-bold text-sm text-zinc-900">
                DigiLocker &amp; Bhashini Integration
              </h4>
              <p className="text-zinc-600 text-[11px] leading-relaxed">
                1-click instant verification for BPL ration cards via DigiLocker OAuth for ₹0 fee waiver under Sec 7(5), with vernacular voice-to-text powered by Bhashini.
              </p>
              <div className="p-2 bg-emerald-50 rounded-lg text-[10px] text-emerald-950 font-mono">
                Tech: DigiLocker API, Bhashini AI, UPI 2.0
              </div>
            </div>
          </div>

          {/* Safety & Compliance Card */}
          <div className="p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-xs text-emerald-950 space-y-3">
            <div className="flex items-center gap-2 font-bold text-sm text-emerald-900">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>Government Safety, Security &amp; Non-Interference Compliance</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-[11px] leading-relaxed text-zinc-700">
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-bold text-zinc-900 block">✓ No Live System Scraping:</span>
                <p>SURYA operates exclusively on already-published Section 4 open records and anonymized public tribunal judgments.</p>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-emerald-100 space-y-1">
                <span className="font-bold text-zinc-900 block">✓ Zero Sensitive PII Stored:</span>
                <p>Aadhaar numbers are strictly masked (`XXXX-XXXX-8921`) and tokens are ephemeral cryptographic hashes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-200 bg-white flex justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-xl bg-zinc-900 text-white font-semibold text-xs">
            Close Architecture
          </button>
        </div>
      </div>
    </div>
  );
}
