"use client";

import React, { useState } from "react";
import { 
  Search, 
  Sparkles, 
  Database, 
  CheckCircle2, 
  Download, 
  FileText, 
  X, 
  ShieldCheck, 
  Building, 
  Calendar, 
  ArrowRight,
  PenTool,
  Users
} from "lucide-react";
import confetti from "canvas-confetti";
import { MOCK_DISCLOSURES, MOCK_DATABASES_SCANNED } from "@/data/mock-disclosures";
import { AlreadyPublicResult, SectionType } from "@/types";
import { DocumentPreviewModal } from "./document-preview-modal";

interface AlreadyPublicSearchProps {
  onSelectSection: (section: SectionType) => void;
}

export function AlreadyPublicSearch({ onSelectSection }: AlreadyPublicSearchProps) {
  const [searchQuery, setSearchQuery] = useState("Ward 17 Bangalore road repair budget & contractor");
  const [isScanning, setIsScanning] = useState(false);
  const [scannedDbCount, setScannedDbCount] = useState(0);
  const [searchResults, setSearchResults] = useState<AlreadyPublicResult[]>(MOCK_DISCLOSURES.slice(0, 2));
  const [hasSearched, setHasSearched] = useState(true);
  const [previewDocument, setPreviewDocument] = useState<AlreadyPublicResult | null>(null);
  const [celebratedId, setCelebratedId] = useState<string | null>(null);

  const sampleSuggestions = [
    "Ward 17 Bangalore road repair budget",
    "Safdarjung Hospital free medicine stock",
    "Delhi school computer lab grants",
    "Bengaluru Mysuru expressway toll audits"
  ];

  const performSearch = (term: string) => {
    if (!term.trim()) return;

    setIsScanning(true);
    setHasSearched(true);
    setScannedDbCount(0);
    setSearchResults([]);

    const totalDbs = MOCK_DATABASES_SCANNED.length;
    let step = 0;

    const interval = setInterval(() => {
      if (step < totalDbs) {
        setScannedDbCount((prev) => prev + 1);
        step++;
      } else {
        clearInterval(interval);
        setIsScanning(false);

        const lower = term.toLowerCase();
        const matches = MOCK_DISCLOSURES.filter((item) => {
          const matchText = (
            item.title +
            " " +
            item.department +
            " " +
            item.jurisdiction +
            " " +
            item.snippet +
            " " +
            item.documentContent.heading +
            " " +
            (item.documentContent.contractorName || "")
          ).toLowerCase();

          const tokens = lower.split(" ").filter((t) => t.length > 2);
          if (tokens.length === 0) return true;
          return tokens.some((t) => matchText.includes(t));
        });

        setSearchResults(matches.length > 0 ? matches.slice(0, 2) : MOCK_DISCLOSURES.slice(0, 2));
      }
    }, 45);
  };

  const triggerCelebration = (docId: string) => {
    setCelebratedId(docId);
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#FF6B35", "#15803D", "#FFA07A"]
      });
    } catch {
      // test fallback
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Calm, Soothing Title */}
      <div className="text-center max-w-xl mx-auto space-y-1.5 pt-2">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-heading">
          Search Before You File
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
          Over 60% of administrative records are already published under Section 4. Search across 12 open government databases instantly:
        </p>
      </div>

      {/* Clean Centered Search Input Box */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            performSearch(searchQuery);
          }}
          className="relative flex items-center"
        >
          <Search className="w-5 h-5 text-zinc-400 absolute left-4 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search road budgets, hospital stocks, school grants, tenders..."
            className="w-full pl-12 pr-28 py-3.5 rounded-xl bg-zinc-50 border border-zinc-200 text-sm sm:text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition-all"
          />

          <div className="absolute right-2 flex items-center gap-1">
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              type="submit"
              disabled={isScanning}
              className="px-4 py-2 rounded-lg bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs sm:text-sm font-bold transition-all disabled:opacity-50"
            >
              Search
            </button>
          </div>
        </form>

        {/* Suggestion Chips */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs text-zinc-400">Try:</span>
          {sampleSuggestions.map((sug, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setSearchQuery(sug);
                performSearch(sug);
              }}
              className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 hover:bg-orange-50 hover:text-[#FF6B35] text-zinc-600 transition-colors"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>

      {/* Live Scanning Indicator */}
      {isScanning && (
        <div className="bg-zinc-900 text-white p-4 rounded-xl space-y-2 animate-in fade-in">
          <div className="flex items-center justify-between text-xs text-zinc-300">
            <span className="font-semibold text-orange-400 flex items-center gap-2">
              <Database className="w-4 h-4 animate-spin text-[#FF6B35]" />
              Scanning 12 Proactive Government Databases...
            </span>
            <span className="font-mono">{scannedDbCount} / {MOCK_DATABASES_SCANNED.length}</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#FF6B35] to-emerald-400 transition-all duration-75"
              style={{ width: `${(scannedDbCount / MOCK_DATABASES_SCANNED.length) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* Clean Verified Results (1-2 Cards max) */}
      {hasSearched && !isScanning && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-zinc-500">
            <span className="font-semibold text-zinc-700 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official Section 4 Disclosures ({searchResults.length} verified records found)</span>
            </span>
          </div>

          <div className="space-y-3">
            {searchResults.map((result) => {
              const isCelebrated = celebratedId === result.id;
              return (
                <div
                  key={result.id}
                  className="bg-white rounded-2xl border border-zinc-200 p-5 shadow-xs hover:shadow-sm transition-all space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold text-xs border border-emerald-200">
                      Section 4 Proactive Record
                    </span>
                    <span className="text-xs text-zinc-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {result.publishedDate}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-zinc-900">
                      {result.title}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-zinc-400" />
                      <span>{result.department} &bull; {result.jurisdiction}</span>
                    </p>
                  </div>

                  <p className="text-xs text-zinc-700 bg-zinc-50 p-3 rounded-xl border border-zinc-100 leading-relaxed">
                    {result.snippet}
                  </p>

                  <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreviewDocument(result)}
                        className="px-3.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 transition-all"
                      >
                        <FileText className="w-3.5 h-3.5 text-orange-400" />
                        <span>View Verified Order</span>
                      </button>

                      <button
                        onClick={() => {
                          setPreviewDocument(result);
                          triggerCelebration(result.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download {result.fileFormat}</span>
                      </button>
                    </div>

                    <button
                      onClick={() => triggerCelebration(result.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                        isCelebrated
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isCelebrated ? "🎉 Found! No filing needed" : "Found what you need?"}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Calming Next Step Card */}
          <div className="p-4 rounded-xl bg-orange-50/60 border border-orange-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div>
              <p className="font-bold text-zinc-900">Need specific unreleased internal files?</p>
              <p className="text-zinc-600">Draft a formal Section 6 request with AI or join a public docket.</p>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onSelectSection("campaigns")}
                className="px-3 py-1.5 rounded-lg bg-white border border-zinc-300 text-zinc-800 font-semibold hover:bg-zinc-50"
              >
                Public Dockets
              </button>
              <button
                onClick={() => onSelectSection("file-rti")}
                className="px-3 py-1.5 rounded-lg bg-[#FF6B35] hover:bg-[#E0531D] text-white font-bold flex items-center gap-1"
              >
                <span>Draft with AI</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Document Preview Modal */}
      {previewDocument && (
        <DocumentPreviewModal
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
          onDownload={() => {
            triggerCelebration(previewDocument.id);
            alert(`Downloaded official verified ${previewDocument.fileFormat}: ${previewDocument.title}`);
          }}
        />
      )}
    </div>
  );
}
