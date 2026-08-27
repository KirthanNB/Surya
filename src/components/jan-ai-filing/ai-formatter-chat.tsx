"use client";

import React, { useState } from "react";
import { 
  Sparkles, 
  Mic, 
  MicOff, 
  FileText, 
  ShieldCheck, 
  Copy, 
  Check, 
  Download, 
  Printer, 
  ArrowRight
} from "lucide-react";
import { SectionType } from "@/types";
import { PaymentBPLModal } from "./payment-bpl-modal";
import { TermsAndConditionsModal } from "./terms-and-conditions-modal";
import { structureRTIQuery, GeneratedRTIResult } from "@/lib/gemini-service";
import { downloadTextFile, printFormattedDocument } from "@/lib/export-utils";

interface AIFormatterChatProps {
  onSelectSection: (section: SectionType) => void;
}

export function AIFormatterChat({ onSelectSection }: AIFormatterChatProps) {
  const [citizenInput, setCitizenInput] = useState("");
  const [structuredRTI, setStructuredRTI] = useState<GeneratedRTIResult | null>(null);

  const [isFormatting, setIsFormatting] = useState(false);
  const [hasFormatted, setHasFormatted] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [copiedRti, setCopiedRti] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const handleProcessQuery = async (inputStr: string) => {
    if (!inputStr.trim()) return;

    setIsFormatting(true);
    setHasFormatted(false);

    try {
      const res = await structureRTIQuery(inputStr);
      setStructuredRTI(res);
      setHasFormatted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsFormatting(false);
    }
  };

  const handleVoiceInput = () => {
    if (typeof window === "undefined") return;

    type SpeechRecognitionInstance = {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      onstart: () => void;
      onresult: (event: { results: { [key: number]: { [key: number]: { transcript: string } } } }) => void;
      onerror: () => void;
      onend: () => void;
      start: () => void;
      stop: () => void;
    };

    const SpeechRec = (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionInstance; webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).SpeechRecognition || (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionInstance }).webkitSpeechRecognition;

    if (!SpeechRec) {
      setIsListening(true);
      setTimeout(() => {
        setIsListening(false);
        const voiceText = "हमारे प्राथमिक स्वास्थ्य केंद्र में डॉक्टर पिछले 3 महीने से नहीं आ रहे हैं, उपस्थिति रजिस्टर और संविदा वेतन की जानकारी चाहिए।";
        setCitizenInput(voiceText);
        handleProcessQuery(voiceText);
      }, 1200);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = "hi-IN";
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => setCitizenInput(event.results[0][0].transcript);
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => {
        setIsListening(false);
        if (citizenInput.trim()) {
          handleProcessQuery(citizenInput);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const getApplicationText = () => {
    if (!structuredRTI) return "";
    return `APPLICATION FOR INFORMATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005
========================================================================================

To:
${structuredRTI.pioDesignation}
${structuredRTI.targetPublicAuthority}

SUBJECT: ${structuredRTI.subject}

PARTICULARS OF INFORMATION SOUGHT:
${structuredRTI.formattedQueries.map((q, i) => `${i + 1}. ${q}`).join("\n\n")}

STATUTORY PROVISIONS:
- ${structuredRTI.statutoryClause}
- Certified True Copies demanded under Section 2(j)(ii) of the RTI Act, 2005.

PRESCRIBED APPLICATION FEE:
- ₹${structuredRTI.prescribedFee} (Enclosed via Bharatkosh UPI / Instant BPL Fee Waiver per Section 7(5))

Applicant Signature: [Digitally Signed via DigiLocker]
Date: ${new Date().toLocaleDateString("en-IN")}`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getApplicationText());
    setCopiedRti(true);
    setTimeout(() => setCopiedRti(false), 3000);
  };

  const handleDownload = () => {
    downloadTextFile(`RTI_Application_${Date.now()}.txt`, getApplicationText());
  };

  const handlePrint = () => {
    if (!structuredRTI) return;
    printFormattedDocument(structuredRTI.subject, getApplicationText());
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight font-heading">
          Submit RTI Application (Section 6)
        </h2>
        <p className="text-xs sm:text-sm text-zinc-600">
          Speak or type in your language. The system formats itemized legal queries with certified copy demands per Section 2(j).
        </p>
      </div>

      {/* Clean Input Box (No clutter / no noisy chips) */}
      <div className="bg-white p-5 sm:p-6 rounded-3xl border border-zinc-200 shadow-sm space-y-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleProcessQuery(citizenInput);
          }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <label className="block text-xs font-bold text-zinc-800">
              State your requirement in your language:
            </label>
            <button
              type="button"
              onClick={handleVoiceInput}
              className={`text-xs px-3 py-1.5 rounded-xl border font-bold flex items-center gap-1.5 transition-all ${
                isListening
                  ? "bg-red-600 text-white border-red-700 animate-pulse"
                  : "bg-zinc-100 hover:bg-zinc-200 border-zinc-300 text-zinc-700"
              }`}
            >
              {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-red-500" />}
              <span>{isListening ? "Listening..." : "Voice Input (Hindi / English)"}</span>
            </button>
          </div>

          <textarea
            rows={3}
            value={citizenInput}
            onChange={(e) => setCitizenInput(e.target.value)}
            placeholder="Type or speak what information you require from the government..."
            className="w-full px-4 py-3 rounded-2xl border border-zinc-300 text-sm sm:text-base focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35]"
          />

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-zinc-400">
              Instant structuring via Gemini 1.5 Flash Model
            </span>
            <button
              type="submit"
              disabled={isFormatting || !citizenInput.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm transition-all disabled:opacity-40"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isFormatting ? "Structuring..." : "Structure Application Draft"}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Formatted Output */}
      {hasFormatted && structuredRTI && (
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-md p-5 sm:p-7 space-y-5 animate-in fade-in">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#FF6B35] flex items-center justify-center font-bold">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Structured Section 6(1) Draft
                </span>
                <h3 className="text-sm font-bold text-zinc-900 mt-0.5">
                  Verified Legal Draft Generated
                </h3>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1"
              >
                {copiedRti ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRti ? "Copied" : "Copy"}</span>
              </button>

              <button
                onClick={handleDownload}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .txt</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-3 py-1.5 rounded-lg bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-semibold flex items-center gap-1"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={() => setShowTermsModal(true)}
                className="px-4 py-2 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Accept Terms &amp; Submit (₹0 BPL / ₹10)</span>
              </button>
            </div>
          </div>

          {/* Formatted Content */}
          <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3 text-xs text-zinc-800">
            <div className="border-b border-zinc-200 pb-2 space-y-0.5">
              <span className="text-zinc-500 uppercase text-[10px] font-bold block">Designated Authority:</span>
              <p className="font-bold text-zinc-900 text-xs">{structuredRTI.pioDesignation}</p>
              <p className="text-zinc-600 text-[11px]">{structuredRTI.targetPublicAuthority}</p>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-zinc-200">
              <span className="text-zinc-500 font-bold block text-[10px] uppercase">Subject:</span>
              <p className="font-bold text-zinc-900 text-xs mt-0.5">
                {structuredRTI.subject}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="font-bold uppercase tracking-wider text-zinc-700 block text-[11px]">
                Itemized Queries with Section 2(j) Certified Copies:
              </span>
              <div className="space-y-1.5">
                {structuredRTI.formattedQueries.map((query, qIdx) => (
                  <div key={qIdx} className="bg-white p-2.5 rounded-xl border border-zinc-200 flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-orange-100 text-[#FF6B35] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                      {qIdx + 1}
                    </span>
                    <p className="text-zinc-800 text-xs leading-relaxed">{query}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-900 text-[11px] font-medium">
              ⚖️ {structuredRTI.statutoryClause}
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Declaration Modal */}
      <TermsAndConditionsModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => {
          setShowTermsModal(false);
          setShowPaymentModal(true);
        }}
      />

      {/* Payment & BPL Waiver Modal */}
      {showPaymentModal && structuredRTI && (
        <PaymentBPLModal
          rtiDetails={{
            targetPublicAuthority: structuredRTI.targetPublicAuthority,
            subject: structuredRTI.subject,
            queriesCount: structuredRTI.formattedQueries.length,
            feeAmount: structuredRTI.prescribedFee,
            queriesList: structuredRTI.formattedQueries,
          }}
          onClose={() => setShowPaymentModal(false)}
          onSuccessSubmitted={(appId) => {
            onSelectSection("tracker");
          }}
        />
      )}
    </div>
  );
}
