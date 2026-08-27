"use client";

import React, { useState } from "react";
import { ShieldCheck, CheckSquare, Square, Lock, X, AlertCircle } from "lucide-react";

interface TermsAndConditionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export function TermsAndConditionsModal({
  isOpen,
  onClose,
  onAccept,
}: TermsAndConditionsModalProps) {
  // All checkboxes initially FALSE (Unchecked)
  const [checkSection3, setCheckSection3] = useState(false);
  const [checkSection89, setCheckSection89] = useState(false);
  const [checkDPDP, setCheckDPDP] = useState(false);

  if (!isOpen) return null;

  const allAccepted = checkSection3 && checkSection89 && checkDPDP;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-zinc-200 max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#FF6B35] flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-zinc-900 font-heading">
                Statutory Citizen Declarations
              </h3>
              <p className="text-[11px] text-zinc-500">
                Mandatory legal undertakings under the RTI Act, 2005
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Declarations List (Must be checked manually) */}
        <div className="space-y-3 text-xs">
          <p className="text-zinc-600">
            Please read and tick each statutory declaration below before lodging your RTI application:
          </p>

          {/* Clause 1: Section 3 Citizen of India */}
          <div
            onClick={() => setCheckSection3(!checkSection3)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
              checkSection3
                ? "bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400/30"
                : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <button type="button" className="mt-0.5 text-emerald-600 flex-shrink-0">
              {checkSection3 ? <CheckSquare className="w-4 h-4 fill-emerald-600 text-white" /> : <Square className="w-4 h-4 text-zinc-400" />}
            </button>
            <div className="space-y-0.5">
              <span className="font-bold text-zinc-900 block">
                1. Citizen of India Undertaking (Section 3)
              </span>
              <p className="text-zinc-600 leading-relaxed">
                I hereby solemnly declare that I am a bona fide citizen of India and entitled to seek public information under Section 3 of the Right to Information Act, 2005.
              </p>
            </div>
          </div>

          {/* Clause 2: Section 8 & 9 Non-Exemption Affirmation */}
          <div
            onClick={() => setCheckSection89(!checkSection89)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
              checkSection89
                ? "bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400/30"
                : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <button type="button" className="mt-0.5 text-emerald-600 flex-shrink-0">
              {checkSection89 ? <CheckSquare className="w-4 h-4 fill-emerald-600 text-white" /> : <Square className="w-4 h-4 text-zinc-400" />}
            </button>
            <div className="space-y-0.5">
              <span className="font-bold text-zinc-900 block">
                2. Non-Exemption Affirmation (Section 8 &amp; 9)
              </span>
              <p className="text-zinc-600 leading-relaxed">
                To the best of my knowledge, the information sought does not fall within the exemptions specified under Section 8 or Section 9 of the Act and pertains solely to official public records.
              </p>
            </div>
          </div>

          {/* Clause 3: DPDP Act 2023 & BPL Waiver Consent */}
          <div
            onClick={() => setCheckDPDP(!checkDPDP)}
            className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
              checkDPDP
                ? "bg-emerald-50/80 border-emerald-300 ring-1 ring-emerald-400/30"
                : "bg-zinc-50 border-zinc-200 hover:border-zinc-300"
            }`}
          >
            <button type="button" className="mt-0.5 text-emerald-600 flex-shrink-0">
              {checkDPDP ? <CheckSquare className="w-4 h-4 fill-emerald-600 text-white" /> : <Square className="w-4 h-4 text-zinc-400" />}
            </button>
            <div className="space-y-0.5">
              <span className="font-bold text-zinc-900 block">
                3. Data Privacy &amp; Verification Consent (DPDP Act 2023)
              </span>
              <p className="text-zinc-600 leading-relaxed">
                I consent to the tokenized verification of my DigiLocker/Aadhaar identity and PDS BPL status solely for statutory application dispatch and zero-fee processing under Section 7(5).
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center justify-between gap-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 font-semibold text-xs hover:bg-zinc-50 transition-all"
          >
            Cancel
          </button>

          <button
            type="button"
            disabled={!allAccepted}
            onClick={onAccept}
            className="px-5 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Confirm Undertakings &amp; Proceed</span>
          </button>
        </div>
      </div>
    </div>
  );
}
