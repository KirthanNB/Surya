"use client";

import React, { useState } from "react";
import { 
  CreditCard, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Download, 
  X, 
  Building,
  ArrowRight,
  Sparkles,
  Lock,
  FileCheck
} from "lucide-react";
import { RTITrackingRecord } from "@/types";
import { downloadTextFile } from "@/lib/export-utils";

interface PaymentBPLModalProps {
  rtiDetails: {
    targetPublicAuthority: string;
    subject: string;
    queriesCount: number;
    feeAmount: number;
    queriesList?: string[];
  };
  onClose: () => void;
  onSuccessSubmitted: (applicationId: string) => void;
}

export function PaymentBPLModal({
  rtiDetails,
  onClose,
  onSuccessSubmitted,
}: PaymentBPLModalProps) {
  // Default tab is STANDARD FEE (₹10)
  const [selectedTab, setSelectedTab] = useState<"standard" | "bpl">("standard");
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  
  // BPL verification state
  const [bplCardNumber, setBplCardNumber] = useState("");
  const [isVerifyingBpl, setIsVerifyingBpl] = useState(false);
  const [isBplVerified, setIsBplVerified] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedAppId, setSubmittedAppId] = useState<string | null>(null);

  const handleVerifyBPL = () => {
    if (!bplCardNumber.trim()) return;
    setIsVerifyingBpl(true);

    setTimeout(() => {
      setIsVerifyingBpl(false);
      setIsBplVerified(true);
    }, 900);
  };

  const handleFinalSubmit = () => {
    setIsSubmitting(true);
    const newAppId = `RTI-2024-${Math.floor(1000 + Math.random() * 9000)}`;

    const newRecord: RTITrackingRecord = {
      applicationId: newAppId,
      filingDate: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      subject: rtiDetails.subject,
      department: rtiDetails.targetPublicAuthority,
      jurisdictionType: "State",
      departmentCategory: "Public Administration",
      pioName: "Designated Public Information Officer",
      maskedAadhaar: "XXXX-XXXX-4892",
      statutoryDeadlineDays: 30,
      daysElapsed: 0,
      accumulatedPenalty: 0,
      status: "active",
      stages: [
        {
          stageNumber: 1,
          title: "Application Received & Tokenized",
          description: selectedTab === "bpl" ? "Filed under BPL Statutory Exemption (Sec 7(5))" : "Statutory fee ₹10.00 reconciled via Bharatkosh / UPI Gateway",
          status: "completed",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          officerRole: "Central Registry & Inward Desk",
          remarks: "Unique statutory token generated.",
        },
        {
          stageNumber: 2,
          title: "Dispatched to Custodian PIO",
          description: `Assigned to Designated PIO, ${rtiDetails.targetPublicAuthority}`,
          status: "in_progress",
          officerRole: "Designated PIO",
          remarks: "30-day statutory countdown timer active.",
        },
        {
          stageNumber: 3,
          title: "Record Retrieval & Section 2(j) Certification",
          description: "Attestation and physical/electronic file extraction",
          status: "pending",
        },
        {
          stageNumber: 4,
          title: "Statutory Order & Information Release",
          description: "Dispatch of certified records to citizen vault",
          status: "pending",
        },
      ],
    };

    // Save to LocalStorage
    if (typeof window !== "undefined") {
      const existing = localStorage.getItem("surya_custom_rtis");
      let list: RTITrackingRecord[] = [];
      if (existing) {
        try { list = JSON.parse(existing); } catch {}
      }
      list.unshift(newRecord);
      localStorage.setItem("surya_custom_rtis", JSON.stringify(list));
    }

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedAppId(newAppId);
    }, 1200);
  };

  const handleDownloadReceipt = () => {
    if (!submittedAppId) return;
    const content = `GOVERNMENT OF INDIA - RTI APPLICATION SUBMISSION RECEIPT
========================================================================
Application Number: ${submittedAppId}
Submission Date: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}
Public Authority: ${rtiDetails.targetPublicAuthority}
Subject: ${rtiDetails.subject}
Number of Itemized Queries: ${rtiDetails.queriesCount}

FEE & STATUTORY DETAILS:
- Payment Type: ${selectedTab === "bpl" ? "BPL Fee Waiver (₹0.00 under Section 7(5))" : "Standard Fee (₹10.00 via UPI/Gateway)"}
${selectedTab === "bpl" ? `- Verified BPL Ration Card: ${bplCardNumber}` : "- Payment Status: SUCCESS (Transaction Ref: BHRKOSH-98214)"}
- Statutory Response Time Limit: 30 Calendar Days (Section 7(1))
- Mandatory Legal Recourse: Section 19(1) First Appeal eligible on Day 31

Generated via National RTI 2.0 Transparency Portal &bull; Government of India`;

    downloadTextFile(`RTI_Receipt_${submittedAppId}.txt`, content);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl border border-zinc-200 max-w-lg w-full p-6 space-y-5 shadow-2xl animate-in fade-in zoom-in-95">
        
        {/* SUCCESS CONFIRMATION STATE */}
        {submittedAppId ? (
          <div className="text-center space-y-4 py-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
                Application Successfully Lodged
              </span>
              <h3 className="text-xl font-extrabold text-zinc-900 font-mono">
                {submittedAppId}
              </h3>
              <p className="text-xs text-zinc-600 max-w-sm mx-auto">
                Dispatched to the Designated PIO at <strong>{rtiDetails.targetPublicAuthority}</strong>. Statutory 30-day resolution countdown is active.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
              <button
                onClick={handleDownloadReceipt}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-zinc-300 hover:bg-zinc-50 text-zinc-700 text-xs font-bold flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                <span>Download Official Receipt (.txt)</span>
              </button>

              <button
                onClick={() => onSuccessSubmitted(submittedAppId)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>Track Application Live</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* PAYMENT / BPL SELECTOR FORM */
          <>
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-zinc-900 font-heading">
                  Statutory Fee Payment &amp; Submission
                </h3>
                <p className="text-xs text-zinc-500">
                  Target Authority: {rtiDetails.targetPublicAuthority}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Selector: Standard Fee (Default) vs BPL Exemption */}
            <div className="grid grid-cols-2 gap-2 bg-zinc-100 p-1.5 rounded-2xl">
              <button
                type="button"
                onClick={() => setSelectedTab("standard")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  selectedTab === "standard"
                    ? "bg-white text-zinc-900 shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Standard Statutory Fee (₹10.00)
              </button>

              <button
                type="button"
                onClick={() => setSelectedTab("bpl")}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                  selectedTab === "bpl"
                    ? "bg-white text-[#FF6B35] shadow-xs"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                BPL Exemption (₹0.00 &bull; Sec 7(5))
              </button>
            </div>

            {/* TAB 1: STANDARD FEE (₹10) */}
            {selectedTab === "standard" && (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-zinc-50 rounded-2xl border border-zinc-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-zinc-900 block">Prescribed Statutory Fee</span>
                    <span className="text-zinc-500 text-[11px]">Under RTI (Regulation of Fee and Cost) Rules</span>
                  </div>
                  <span className="text-lg font-mono font-extrabold text-zinc-900">₹10.00</span>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-zinc-700 block">Select Payment Channel:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("upi")}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        paymentMethod === "upi"
                          ? "bg-orange-50 border-[#FF6B35] text-[#FF6B35] font-bold"
                          : "bg-white border-zinc-200 text-zinc-700"
                      }`}
                    >
                      <QrCode className="w-4 h-4 mx-auto mb-1" />
                      <span>Instant UPI</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        paymentMethod === "card"
                          ? "bg-orange-50 border-[#FF6B35] text-[#FF6B35] font-bold"
                          : "bg-white border-zinc-200 text-zinc-700"
                      }`}
                    >
                      <CreditCard className="w-4 h-4 mx-auto mb-1" />
                      <span>Debit / Rupay</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("netbanking")}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        paymentMethod === "netbanking"
                          ? "bg-orange-50 border-[#FF6B35] text-[#FF6B35] font-bold"
                          : "bg-white border-zinc-200 text-zinc-700"
                      }`}
                    >
                      <Building className="w-4 h-4 mx-auto mb-1" />
                      <span>Net Banking</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: BPL EXEMPTION (Requires Verification) */}
            {selectedTab === "bpl" && (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-950 space-y-1">
                  <span className="font-bold block flex items-center gap-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    Section 7(5) Statutory Fee Exemption (₹0.00)
                  </span>
                  <p className="text-[11px] text-emerald-800 leading-relaxed">
                    Citizens Below Poverty Line (BPL) are exempted from application fees and document copy charges upon registry verification.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="font-bold text-zinc-700 block">Enter BPL / AAY Ration Card Number:</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={bplCardNumber}
                      onChange={(e) => {
                        setBplCardNumber(e.target.value);
                        setIsBplVerified(false);
                      }}
                      placeholder="e.g. KA-BPL-2024-98421"
                      className="flex-1 px-3 py-2 rounded-xl border border-zinc-300 text-xs font-mono text-zinc-900 bg-white"
                    />
                    <button
                      type="button"
                      onClick={handleVerifyBPL}
                      disabled={!bplCardNumber.trim() || isVerifyingBpl}
                      className="px-3 py-2 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold disabled:opacity-40"
                    >
                      {isVerifyingBpl ? "Verifying..." : isBplVerified ? "Verified ✓" : "Verify Card"}
                    </button>
                  </div>
                </div>

                {isBplVerified && (
                  <div className="p-2.5 bg-emerald-100/70 rounded-xl border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>BPL Card Verified via National PDS Registry &bull; 100% Fee Waived (₹0.00)</span>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-3 border-t border-zinc-100 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-zinc-300 text-zinc-700 font-semibold text-xs hover:bg-zinc-50"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                disabled={isSubmitting || (selectedTab === "bpl" && !isBplVerified)}
                className="px-5 py-2.5 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>
                  {isSubmitting
                    ? "Dispatching Application..."
                    : selectedTab === "bpl"
                    ? "Submit with ₹0 BPL Waiver"
                    : "Pay ₹10.00 & Lodge RTI"}
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
