"use client";

import React, { useState } from "react";
import { Search, FileText, CheckCircle2, Download, Building, Filter, ArrowRight } from "lucide-react";
import { MOCK_DISCLOSURES } from "@/data/mock-disclosures";
import { AlreadyPublicResult, SectionType } from "@/types";
import { DocumentPreviewModal } from "./document-preview-modal";
import { downloadTextFile } from "@/lib/export-utils";

interface PublicRecordsViewProps {
  onSelectSection: (section: SectionType) => void;
}

export function PublicRecordsView({ onSelectSection }: PublicRecordsViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [previewDoc, setPreviewDoc] = useState<AlreadyPublicResult | null>(null);

  const filteredDocs = MOCK_DISCLOSURES.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.snippet.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCat =
      selectedCategory === "all" ||
      (doc.category && doc.category.toLowerCase().includes(selectedCategory.toLowerCase()));

    return matchesSearch && matchesCat;
  });

  return (
    <div className="py-6 px-3 sm:px-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Section 4 Proactive Disclosures
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-heading">
          National Public Records Repository
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600">
          Under Section 4(1)(b) of the RTI Act 2005, public authorities are statutorily required to proactively publish tenders, budgets, sanction orders, and beneficiary lists for open inspection.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-zinc-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search published budgets, sanction orders, work orders by keyword or department..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-zinc-300 text-xs sm:text-sm focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2.5 rounded-xl border border-zinc-300 text-xs font-semibold text-zinc-700 bg-white"
          >
            <option value="all">All Categories</option>
            <option value="infrastructure">Infrastructure &amp; Roads</option>
            <option value="health">Health &amp; Medicine</option>
            <option value="education">School Education</option>
            <option value="ration">Food &amp; PDS Quota</option>
          </select>
        </div>
      </div>

      {/* Disclosed Records Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredDocs.map((doc) => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-zinc-200 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Section 4 Verified
                </span>
                <span className="text-[11px] font-mono font-bold text-zinc-900">
                  {doc.documentContent.sanctionAmount || "Official Record"}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-zinc-900 text-sm sm:text-base">
                  {doc.title}
                </h4>
                <p className="text-xs text-zinc-500 mt-0.5 flex items-center gap-1">
                  <Building className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{doc.department} &bull; {doc.jurisdiction}</span>
                </p>
              </div>

              <p className="text-xs text-zinc-600 bg-zinc-50 p-3 rounded-xl border border-zinc-100 leading-relaxed line-clamp-3">
                {doc.snippet}
              </p>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setPreviewDoc(doc)}
                className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
              >
                <FileText className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>View Sanction Order</span>
              </button>

              <button
                onClick={() => {
                  downloadTextFile(
                    `Public_Record_${doc.id}.txt`,
                    `GOVERNMENT OF INDIA - SECTION 4 PROACTIVE DISCLOSURE\nTitle: ${doc.title}\nDepartment: ${doc.department}\nJurisdiction: ${doc.jurisdiction}\nAmount: ${doc.documentContent.sanctionAmount || "N/A"}\nSummary:\n${doc.snippet}\nContent:\n${doc.documentContent.body}`
                  );
                }}
                className="px-3 py-2 rounded-xl border border-zinc-300 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Document Preview Modal */}
      {previewDoc && (
        <DocumentPreviewModal
          document={previewDoc}
          onClose={() => setPreviewDoc(null)}
          onDownload={() => {
            alert(`Downloaded official verified record: ${previewDoc.title}`);
          }}
        />
      )}
    </div>
  );
}
