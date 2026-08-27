"use client";

import React from "react";
import { X, Download, Printer, ShieldCheck, FileText, CheckCircle2, Calendar, Building2 } from "lucide-react";
import { AlreadyPublicResult } from "@/types";

interface DocumentPreviewModalProps {
  document: AlreadyPublicResult | null;
  onClose: () => void;
  onDownload: () => void;
}

export function DocumentPreviewModal({ document, onClose, onDownload }: DocumentPreviewModalProps) {
  if (!document) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white w-full max-w-4xl max-h-[90vh] rounded-2xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-zinc-200 bg-zinc-50/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF6B35] flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified Proactive Disclosure
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  {document.id}
                </span>
              </div>
              <h3 className="text-base font-bold text-zinc-900 line-clamp-1 mt-0.5">
                {document.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 rounded-lg text-zinc-600 hover:bg-zinc-200/60 transition-colors"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onDownload}
              className="px-3 py-1.5 rounded-lg bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download {document.fileFormat}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-800 bg-zinc-50/30">
          {/* Official Header Simulation */}
          <div className="bg-white p-6 rounded-xl border border-zinc-200 shadow-xs space-y-4">
            <div className="text-center border-b border-zinc-200 pb-4">
              <p className="text-xs font-bold tracking-widest text-zinc-500 uppercase">
                {document.jurisdiction}
              </p>
              <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight mt-1 font-heading">
                {document.documentContent.heading}
              </h2>
              <p className="text-xs text-zinc-500 mt-1">
                Proactive Public Record disclosed under <span className="font-semibold text-zinc-700">{document.disclosureClause}</span>
              </p>
            </div>

            {/* Key Sanction Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 bg-zinc-50 p-4 rounded-lg border border-zinc-100 text-xs">
              <div>
                <span className="text-zinc-500 block">Sanction Order No:</span>
                <span className="font-mono font-semibold text-zinc-900">{document.documentContent.sanctionOrderNo}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Allocated Budget:</span>
                <span className="font-bold text-emerald-700 text-sm">{document.documentContent.allocatedAmount}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Expended to Date:</span>
                <span className="font-bold text-zinc-900 text-sm">{document.documentContent.expendedAmount}</span>
              </div>
              <div>
                <span className="text-zinc-500 block">Execution Status:</span>
                <span className="font-semibold text-blue-700">{document.documentContent.completionStatus}</span>
              </div>
            </div>

            {document.documentContent.contractorName && (
              <div className="p-3 bg-orange-50/60 rounded-lg border border-orange-200/60 text-xs">
                <span className="font-semibold text-orange-900">Awarded Primary Contractor / Vendor: </span>
                <span className="text-zinc-800">{document.documentContent.contractorName}</span>
              </div>
            )}

            {/* Key Audit Observations */}
            {document.documentContent.keyObservations && document.documentContent.keyObservations.length > 0 && (
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-700 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Audited Technical &amp; Financial Observations</span>
                </h4>
                <ul className="space-y-2 text-xs text-zinc-700 bg-white p-3.5 rounded-lg border border-zinc-200">
                  {document.documentContent.keyObservations.map((obs: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35] mt-1.5 flex-shrink-0" />
                      <span>{obs}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Data Table if available */}
            {document.documentContent.tableData && Array.isArray(document.documentContent.tableData) && document.documentContent.tableData.length > 0 && (
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-zinc-700 mb-2">
                  Itemized Expenditure &amp; Quality Metrics
                </h4>
                <div className="overflow-x-auto rounded-lg border border-zinc-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-zinc-100 text-zinc-700 font-semibold border-b border-zinc-200">
                      <tr>
                        {Object.keys(document.documentContent.tableData[0] || {}).map((col) => (
                          <th key={col} className="py-2.5 px-3">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-200">
                      {document.documentContent.tableData.map((row: Record<string, unknown>, rIdx: number) => (
                        <tr key={rIdx} className="hover:bg-zinc-50">
                          {Object.values(row).map((val: unknown, cIdx: number) => (
                            <td key={cIdx} className="py-2 px-3 text-zinc-800">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Source Verification Footer */}
            <div className="pt-3 border-t border-zinc-200 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-500">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>Source: {document.sourcePortal}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                <span>Published on: {document.publishedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 border-t border-zinc-200 bg-white flex items-center justify-between">
          <p className="text-xs text-emerald-800 font-medium flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>This document fulfills your query without requiring a formal RTI filing.</span>
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-800 text-xs font-semibold transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
