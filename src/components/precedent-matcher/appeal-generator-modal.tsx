"use client";

import React, { useState } from "react";
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Printer, 
  Scale, 
  ShieldCheck,
  Building
} from "lucide-react";
import { CICPrecedent } from "@/types";
import { downloadTextFile, printFormattedDocument } from "@/lib/export-utils";

interface AppealGeneratorModalProps {
  precedent: CICPrecedent;
  onClose: () => void;
}

export function AppealGeneratorModal({ precedent, onClose }: AppealGeneratorModalProps) {
  const [appellantName, setAppellantName] = useState("Kirthan N. B.");
  const [originalRtiNumber, setOriginalRtiNumber] = useState("RTI-2024-KA-8891");
  const [copied, setCopied] = useState(false);

  const getAppealPetitionText = () => {
    return `BEFORE THE FIRST APPELLATE AUTHORITY
UNDER SECTION 19(1) OF THE RIGHT TO INFORMATION ACT, 2005
========================================================================================

IN THE MATTER OF:
${appellantName} ... Appellant
VERSUS
Central Public Information Officer (CPIO) ... Respondent

1. PARTICULARS OF THE ORIGINAL APPLICATION:
   - Original Application No.: ${originalRtiNumber}
   - Date of Application: ${new Date().toLocaleDateString("en-IN")}
   - Impugned Rejection Order citing: ${precedent.sectionOverruled}

2. BRIEF FACTS & GROUNDS FOR FIRST APPEAL:
   a. The Appellant sought certified copies of official public records under Section 2(j)(ii) of the RTI Act, 2005.
   b. The Respondent CPIO summarily rejected the disclosure citing ${precedent.sectionOverruled} in a mechanical manner without substantiating the statutory threshold of exemption.

3. LANDMARK LEGAL PRECEDENT RELIED UPON:
   - Case Title: ${precedent.caseTitle}
   - Forum/Tribunal: ${precedent.tribunal}
   - Decision/Order No.: ${precedent.rulingNumber} (Date of Order: ${precedent.dateOfOrder})
   - Ratio Decidendi: "${precedent.keyPrinciple}"
   - Verbatim Excerpt: "${precedent.verbatimExcerpt}"

4. PRAYER / RELIEF SOUGHT:
   a. Quash and set aside the impugned rejection order passed by the CPIO.
   b. Direct the CPIO to provide certified true copies of all requested documents free of charge under Section 7(6) due to statutory delay.
   c. Recommend appropriate penal action under Section 20(1) for unwarranted denial of public records.

Date: ${new Date().toLocaleDateString("en-IN")}
Place: Bengaluru, India

(Digitally Signed)
${appellantName} (Appellant)`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getAppealPetitionText());
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleDownload = () => {
    downloadTextFile(`First_Appeal_Section_19_${originalRtiNumber}.txt`, getAppealPetitionText());
  };

  const handlePrint = () => {
    printFormattedDocument(`First Appeal under Section 19(1) - ${originalRtiNumber}`, getAppealPetitionText());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="bg-white w-full max-w-2xl max-h-[90vh] rounded-3xl shadow-2xl border border-zinc-200 flex flex-col overflow-hidden animate-in zoom-in-95"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-[#18181B] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-[#FF6B35] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-orange-400">
                Statutory First Appeal Drafting &bull; Section 19(1)
              </span>
              <h3 className="text-sm font-bold text-white">
                Precedent-Substantiated Appeal Draft
              </h3>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs text-zinc-700 bg-zinc-50/50 flex-1">
          {/* Customizer Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white p-4 rounded-xl border border-zinc-200 shadow-2xs">
            <div>
              <label className="block text-[11px] font-bold text-zinc-700 mb-1">Appellant Name:</label>
              <input
                type="text"
                value={appellantName}
                onChange={(e) => setAppellantName(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs font-semibold text-zinc-900"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-zinc-700 mb-1">Original Application No.:</label>
              <input
                type="text"
                value={originalRtiNumber}
                onChange={(e) => setOriginalRtiNumber(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-xs font-mono text-zinc-900"
              />
            </div>
          </div>

          {/* Formatted Text Preview */}
          <div className="p-4 bg-white rounded-xl border border-zinc-200 font-mono text-[11px] text-zinc-800 whitespace-pre-wrap leading-relaxed shadow-2xs">
            {getAppealPetitionText()}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-zinc-200 bg-white flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleCopy}
              className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>

            <button
              onClick={handleDownload}
              className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download .txt</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Draft</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-bold shadow-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
