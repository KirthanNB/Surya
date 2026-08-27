"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Search, 
  Mic, 
  MicOff, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  FileText, 
  ShieldCheck, 
  Download, 
  Users, 
  ArrowRight, 
  RotateCcw, 
  Edit3, 
  Check, 
  Building,
  Landmark,
  Scale
} from "lucide-react";
import { CalmCanvas3D } from "@/components/ui/calm-canvas-3d";
import { sendGeminiConversation, GeneratedRTIResult, ChatMessagePayload } from "@/lib/gemini-service";
import { downloadTextFile } from "@/lib/export-utils";
import { DocumentPreviewModal } from "@/components/search-engine/document-preview-modal";
import { TermsAndConditionsModal } from "@/components/jan-ai-filing/terms-and-conditions-modal";
import { PaymentBPLModal } from "@/components/jan-ai-filing/payment-bpl-modal";
import { JoinCampaignModal } from "@/components/campaigns/join-campaign-modal";
import { SectionType, AlreadyPublicResult, CollectiveDocket } from "@/types";
import { MOCK_DISCLOSURES } from "@/data/mock-disclosures";
import { MOCK_COLLECTIVE_DOCKETS } from "@/data/mock-campaigns";

interface ConciergeChatProps {
  onSelectSection: (section: SectionType) => void;
}

interface ChatMessage {
  id: string;
  sender: "citizen" | "assistant";
  text: string;
  timestamp: string;
  followUpSuggestions?: string[];
  matchedCampaign?: {
    id: string;
    title: string;
    department: string;
    subscribers: number;
  };
  matchedProactiveRecord?: {
    id: string;
    title: string;
    department: string;
    amount: string;
    summary: string;
  };
  structuredDraft?: GeneratedRTIResult;
}

export function ConciergeChat({ onSelectSection }: ConciergeChatProps) {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechLanguage, setSpeechLanguage] = useState<string>("en-IN");
  const [isChatActive, setIsChatActive] = useState(false);

  // Editable draft state
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);
  const [editedSubject, setEditedSubject] = useState("");
  const [editedAuthority, setEditedAuthority] = useState("");
  const [editedJurisdiction, setEditedJurisdiction] = useState<"Central Government" | "State Government">("State Government");
  const [editedStateName, setEditedStateName] = useState("Karnataka");
  const [editedCategory, setEditedCategory] = useState("Municipal & Urban Governance");
  const [editedQueries, setEditedQueries] = useState<string[]>([]);

  // Modals
  const [previewDocModal, setPreviewDocModal] = useState<AlreadyPublicResult | null>(null);
  const [selectedCampaignForJoin, setSelectedCampaignForJoin] = useState<CollectiveDocket | null>(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [activeRtiForSubmit, setActiveRtiForSubmit] = useState<GeneratedRTIResult | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages, isProcessing]);

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
        const sample = speechLanguage.startsWith("te")
          ? "మా హిల్స్ దగ్గరగా తాగే నీళ్ల పైప్‌లైన్ మరియు నీటి నాణ్యత నివేదిక వివరాలు కావాలి"
          : speechLanguage.startsWith("hi")
          ? "वार्ड 17 में सड़क निर्माण बजट और ठेकेदार के भुगतान की जानकारी चाहिए"
          : speechLanguage.startsWith("kn")
          ? "ವಾರ್ಡ್ 17 ರಸ್ತೆ ನಿರ್ಮಾಣ ಕಾಮಗಾರಿ ವೆಚ್ಚ ಮತ್ತು ಗುತ್ತಿಗೆದಾರರ ವಿವರಗಳು ಬೇಕು"
          : "Ward 17 road repair budget and contractor payment details";
        setUserInput(sample);
        handleSendMessage(sample);
      }, 1100);
      return;
    }

    try {
      const recognition = new SpeechRec();
      recognition.lang = speechLanguage;
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event) => setUserInput(event.results[0][0].transcript);
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => {
        setIsListening(false);
        if (userInput.trim()) {
          handleSendMessage(userInput);
        }
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  const handleSendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isProcessing) return;

    setIsChatActive(true);
    const timeStr = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    // 1. Append Citizen Message
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "citizen",
      text: trimmed,
      timestamp: timeStr,
    };

    setMessages((prev) => [...prev, userMsg]);
    setUserInput("");
    setIsProcessing(true);

    // Prepare History for National Legal Intake Desk
    const historyPayload: ChatMessagePayload[] = messages.map((m) => ({
      role: m.sender === "citizen" ? "user" : "model",
      text: m.text,
    }));

    try {
      const aiResponse = await sendGeminiConversation(historyPayload, trimmed, speechLanguage);

      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: "assistant",
        text: aiResponse.replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        followUpSuggestions: aiResponse.followUpSuggestions,
        matchedCampaign: aiResponse.matchedCampaign,
        matchedProactiveRecord: aiResponse.matchedProactiveRecord,
        structuredDraft: aiResponse.structuredDraft,
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  // Clicking on a suggestion pill populates the input so the citizen can review/edit before sending
  const handlePillClick = (suggestionText: string) => {
    setUserInput(suggestionText);
    inputRef.current?.focus();
  };

  const handleStartEditing = (draft: GeneratedRTIResult, msgId: string) => {
    setEditingDraftId(msgId);
    setEditedSubject(draft.subject);
    setEditedAuthority(draft.targetPublicAuthority);
    setEditedJurisdiction(draft.jurisdictionType || "State Government");
    setEditedStateName(draft.stateName || "Karnataka");
    setEditedCategory(draft.departmentCategory || "Municipal & Urban Governance");
    setEditedQueries([...draft.formattedQueries]);
  };

  const handleSaveEditedDraft = (msgId: string) => {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === msgId && m.structuredDraft
          ? {
              ...m,
              structuredDraft: {
                ...m.structuredDraft,
                subject: editedSubject,
                targetPublicAuthority: editedAuthority,
                jurisdictionType: editedJurisdiction,
                stateName: editedStateName,
                departmentCategory: editedCategory,
                formattedQueries: editedQueries,
              },
            }
          : m
      )
    );
    setEditingDraftId(null);
  };

  const handleStartSubmit = (draft: GeneratedRTIResult) => {
    setActiveRtiForSubmit(draft);
    setShowTermsModal(true);
  };

  const handleResetConversation = () => {
    setMessages([]);
    setIsChatActive(false);
    setUserInput("");
    setEditingDraftId(null);
  };

  return (
    <div className="relative h-[calc(100vh-4.5rem)] flex flex-col justify-between px-3 sm:px-6 max-w-4xl mx-auto overflow-hidden">
      {/* 3D Ashoka Dharma Chakra in background (subtle watermark) */}
      <CalmCanvas3D />

      <div className="relative z-10 w-full flex-1 flex flex-col h-full overflow-hidden">
        
        {/* TOP INTRO HEADER */}
        <div className="text-center space-y-1 pt-1 pb-2 border-b border-zinc-200/50 flex-shrink-0">
          <h1 className="text-lg sm:text-2xl font-extrabold text-zinc-900 tracking-tight font-heading leading-tight">
            National RTI Assistant
          </h1>
          <p className="text-xs text-zinc-600 leading-relaxed max-w-xl mx-auto">
            Under the Right to Information Act 2005, every citizen has the right to inspect public records. Speak or type your request below—we&apos;ll check published documents, active campaigns, or draft your request.
          </p>
        </div>

        {/* INITIAL STATE: Search Box in Center */}
        {!isChatActive ? (
          <div className="flex-1 flex flex-col items-center justify-center py-6">
            <motion.div
              layoutId="gemini-input-bar"
              className="w-full max-w-2xl bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-zinc-300 shadow-xl shadow-zinc-200/50 space-y-3"
            >
              <div className="flex items-center gap-2">
                <Search className="w-5 h-5 text-zinc-400 ml-2 flex-shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onFocus={() => setIsChatActive(true)}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isProcessing) {
                      e.preventDefault();
                      handleSendMessage(userInput);
                    }
                  }}
                  placeholder="Ask what government information or public records you need..."
                  className="flex-1 px-2 py-2 bg-transparent text-sm sm:text-base text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                />

                {/* Voice Language Selector */}
                <select
                  value={speechLanguage}
                  onChange={(e) => setSpeechLanguage(e.target.value)}
                  className="text-xs font-semibold bg-zinc-100 text-zinc-700 rounded-xl px-2 py-2 outline-none cursor-pointer border border-zinc-200 hidden sm:block"
                  title="Voice input language"
                >
                  <option value="en-IN">English</option>
                  <option value="hi-IN">हिन्दी</option>
                  <option value="kn-IN">ಕನ್ನಡ</option>
                  <option value="te-IN">తెలుగు</option>
                  <option value="ta-IN">தமிழ்</option>
                  <option value="ml-IN">മലയാളം</option>
                  <option value="bn-IN">বাংলা</option>
                </select>

                {/* Mic */}
                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`p-2.5 sm:p-3 rounded-2xl transition-all ${
                    isListening
                      ? "bg-red-600 text-white animate-pulse"
                      : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700"
                  }`}
                  title="Voice input in your chosen language"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#FF6B35]" />}
                </button>

                {/* Send */}
                <button
                  type="button"
                  onClick={() => handleSendMessage(userInput)}
                  disabled={!userInput.trim() || isProcessing}
                  className="px-4 py-3 rounded-2xl bg-[#FF6B35] hover:bg-[#E0531D] text-white font-bold text-xs sm:text-sm flex items-center gap-1 shadow-sm transition-all disabled:opacity-40"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>
        ) : (
          /* CONVERSATIONAL CHAT STREAM */
          <div className="flex-1 flex flex-col justify-between overflow-hidden pt-2">
            
            {/* Top Status Bar */}
            <div className="flex items-center justify-between pb-2 flex-shrink-0">
              <span className="text-xs font-bold text-zinc-700 flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-[#FF6B35]" />
                <span>National RTI Legal Desk &bull; Live Intake</span>
              </span>
              <button
                onClick={handleResetConversation}
                className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200 shadow-2xs font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>New Session</span>
              </button>
            </div>

            {/* Scrollable Messages Thread */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 pb-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 text-xs sm:text-sm ${
                    msg.sender === "citizen" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-2xl rounded-3xl p-4 sm:p-5 space-y-3 ${
                      msg.sender === "citizen"
                        ? "bg-zinc-900 text-white rounded-br-xs shadow-sm"
                        : "bg-white border border-zinc-200/90 text-zinc-900 rounded-bl-xs shadow-md"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[10px] text-zinc-400">
                      <span className="font-bold">{msg.sender === "citizen" ? "You (Citizen)" : "RTI Assistant"}</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div className="leading-relaxed whitespace-pre-wrap font-normal">
                      {msg.text}
                    </div>

                    {/* EDITABLE FOLLOW-UP SUGGESTIONS (Populates input bar on click) */}
                    {msg.followUpSuggestions && msg.followUpSuggestions.length > 0 && (
                      <div className="pt-2 flex flex-wrap gap-1.5 border-t border-zinc-100">
                        {msg.followUpSuggestions.map((sug, idx) => (
                          <button
                            key={idx}
                            onClick={() => handlePillClick(sug)}
                            className="text-xs px-3 py-1.5 rounded-full bg-zinc-50 hover:bg-orange-50 hover:text-[#FF6B35] border border-zinc-200 text-zinc-800 font-semibold transition-colors text-left flex items-center gap-1"
                            title="Click to edit before sending"
                          >
                            <span>{sug}</span>
                            <Edit3 className="w-2.5 h-2.5 text-zinc-400 ml-0.5" />
                          </button>
                        ))}
                      </div>
                    )}

                    {/* 1. PROACTIVELY PUBLISHED RECORD EMBED */}
                    {msg.matchedProactiveRecord && (
                      <div className="bg-emerald-50/90 rounded-2xl border border-emerald-200 p-4 space-y-3 text-zinc-900">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Section 4 Proactive Record Found
                          </span>
                          <span className="text-xs font-bold text-emerald-900 font-mono">
                            {msg.matchedProactiveRecord.amount}
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-zinc-900 text-sm">{msg.matchedProactiveRecord.title}</h4>
                          <p className="text-zinc-600 text-xs mt-0.5">{msg.matchedProactiveRecord.department}</p>
                        </div>

                        <p className="text-xs bg-white p-3 rounded-xl border border-emerald-100 text-zinc-800 leading-relaxed">
                          {msg.matchedProactiveRecord.summary}
                        </p>

                        <div className="pt-1 flex flex-wrap items-center justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setPreviewDocModal(MOCK_DISCLOSURES[0])}
                              className="px-3.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-black text-white text-xs font-bold flex items-center gap-1.5 shadow-xs"
                            >
                              <FileText className="w-3.5 h-3.5 text-[#FF6B35]" />
                              <span>View Official Sanction Order</span>
                            </button>

                            <button
                              onClick={() => {
                                downloadTextFile(
                                  `Proactive_Order_${msg.matchedProactiveRecord!.id}.txt`,
                                  `GOVERNMENT OF INDIA - PROACTIVE DISCLOSURE\nTitle: ${msg.matchedProactiveRecord!.title}\nDepartment: ${msg.matchedProactiveRecord!.department}\nSummary: ${msg.matchedProactiveRecord!.summary}`
                                );
                              }}
                              className="px-3 py-1.5 rounded-xl bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-700 text-xs font-semibold flex items-center gap-1"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download .txt</span>
                            </button>
                          </div>

                          <button
                            onClick={() => handleSendMessage("I need deeper internal file notings and measurement book details beyond this proactive order")}
                            className="text-xs font-bold text-[#FF6B35] hover:underline"
                          >
                            Need deeper internal files &rarr; File RTI
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 2. MATCHED CITIZEN CAMPAIGN EMBED */}
                    {msg.matchedCampaign && (
                      <div className="bg-blue-50/90 rounded-2xl border border-blue-200 p-4 space-y-2.5 text-zinc-900">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-blue-900 bg-blue-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-blue-600" />
                            Active Citizen Campaign
                          </span>
                          <span className="text-xs font-bold text-blue-900">
                            {msg.matchedCampaign.subscribers.toLocaleString()} Citizens Joined
                          </span>
                        </div>

                        <div>
                          <h4 className="font-bold text-zinc-900 text-sm">{msg.matchedCampaign.title}</h4>
                          <p className="text-zinc-600 text-xs">{msg.matchedCampaign.department}</p>
                        </div>

                        <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
                          <button
                            onClick={() => setSelectedCampaignForJoin(MOCK_COLLECTIVE_DOCKETS[0])}
                            className="px-4 py-2 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                          >
                            <Users className="w-3.5 h-3.5" />
                            <span>Subscribe &amp; Add Sub-Points (Zero Fee)</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleSendMessage("I want to file a separate individual RTI specifically for this")}
                            className="text-xs text-zinc-600 hover:text-zinc-900 font-semibold"
                          >
                            File Separate Individual RTI
                          </button>
                        </div>
                      </div>
                    )}

                    {/* 3. STRUCTURED RTI DRAFT (WITH JURISDICTION & INLINE EDITING) */}
                    {msg.structuredDraft && (
                      <div className="bg-orange-50/80 rounded-2xl border border-orange-200 p-4 sm:p-5 space-y-3 text-zinc-900">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-[#E0531D] bg-orange-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B35]" />
                            Section 6(1) Statutory Application Draft
                          </span>

                          <div className="flex items-center gap-1.5">
                            {editingDraftId !== msg.id ? (
                              <button
                                onClick={() => handleStartEditing(msg.structuredDraft!, msg.id)}
                                className="text-xs text-zinc-700 hover:text-zinc-900 flex items-center gap-1 font-bold px-2.5 py-1 rounded-lg bg-white border border-zinc-300 shadow-2xs"
                              >
                                <Edit3 className="w-3 h-3 text-[#FF6B35]" />
                                <span>Edit Draft</span>
                              </button>
                            ) : (
                              <button
                                onClick={() => handleSaveEditedDraft(msg.id)}
                                className="text-xs text-emerald-800 font-bold flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-100 border border-emerald-300 shadow-2xs"
                              >
                                <Check className="w-3.5 h-3.5" />
                                <span>Save Changes</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {/* EDITABLE OR VIEW MODE */}
                        {editingDraftId === msg.id ? (
                          <div className="space-y-2.5 text-xs">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              <div>
                                <label className="block font-bold text-zinc-800 mb-0.5">Jurisdiction:</label>
                                <select
                                  value={editedJurisdiction}
                                  onChange={(e) => setEditedJurisdiction(e.target.value as "Central Government" | "State Government")}
                                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 font-semibold text-zinc-900 bg-white"
                                >
                                  <option value="State Government">State Government / UT</option>
                                  <option value="Central Government">Central Government</option>
                                </select>
                              </div>

                              <div>
                                <label className="block font-bold text-zinc-800 mb-0.5">Department Category:</label>
                                <input
                                  type="text"
                                  value={editedCategory}
                                  onChange={(e) => setEditedCategory(e.target.value)}
                                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 font-semibold text-zinc-900 bg-white"
                                />
                              </div>
                            </div>

                            <div>
                              <label className="block font-bold text-zinc-800 mb-0.5">Target Public Authority &amp; PIO:</label>
                              <input
                                type="text"
                                value={editedAuthority}
                                onChange={(e) => setEditedAuthority(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 font-semibold text-zinc-900 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-zinc-800 mb-0.5">Subject Line:</label>
                              <input
                                type="text"
                                value={editedSubject}
                                onChange={(e) => setEditedSubject(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 bg-white"
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="block font-bold text-zinc-800">Itemized Queries (Certified Copies):</label>
                              {editedQueries.map((q, qIdx) => (
                                <textarea
                                  key={qIdx}
                                  rows={2}
                                  value={q}
                                  onChange={(e) => {
                                    const next = [...editedQueries];
                                    next[qIdx] = e.target.value;
                                    setEditedQueries(next);
                                  }}
                                  className="w-full px-3 py-2 rounded-lg border border-zinc-300 text-zinc-900 bg-white"
                                />
                              ))}
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-2 text-xs">
                            {/* Metadata Badges */}
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-800 border border-zinc-200">
                                {msg.structuredDraft.jurisdictionType || "State Government"}
                              </span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-orange-100 text-[#E0531D] border border-orange-200">
                                {msg.structuredDraft.departmentCategory || "Municipal & Urban Governance"}
                              </span>
                            </div>

                            <div>
                              <span className="text-[10px] font-bold uppercase text-zinc-500 block">Designated Authority:</span>
                              <h4 className="font-bold text-zinc-900 text-sm">{msg.structuredDraft.pioDesignation} &bull; {msg.structuredDraft.targetPublicAuthority}</h4>
                              <p className="text-zinc-700 mt-0.5 font-semibold">Subject: {msg.structuredDraft.subject}</p>
                            </div>

                            <div className="space-y-1.5 pt-1">
                              <span className="font-bold text-zinc-800 block text-[11px]">Itemized Queries:</span>
                              {msg.structuredDraft.formattedQueries.map((q, idx) => (
                                <div key={idx} className="bg-white p-2.5 rounded-xl border border-zinc-200 flex items-start gap-2 text-zinc-900 font-medium">
                                  <span className="w-4 h-4 rounded-full bg-orange-100 text-[#FF6B35] font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                                    {idx + 1}
                                  </span>
                                  <p className="leading-relaxed">{q}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        <div className="pt-3 border-t border-orange-200/60 flex flex-wrap items-center justify-between gap-2">
                          <button
                            onClick={() => {
                              downloadTextFile(
                                `RTI_Application_${Date.now()}.txt`,
                                `APPLICATION UNDER SECTION 6(1) RTI ACT 2005\nJurisdiction: ${msg.structuredDraft!.jurisdictionType}\nCategory: ${msg.structuredDraft!.departmentCategory}\nTo: ${msg.structuredDraft!.pioDesignation}, ${msg.structuredDraft!.targetPublicAuthority}\nSubject: ${msg.structuredDraft!.subject}\nQueries:\n${msg.structuredDraft!.formattedQueries.map((q, i) => `${i + 1}. ${q}`).join("\n")}`
                              );
                            }}
                            className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-100 border border-zinc-300 text-zinc-700 text-xs font-semibold flex items-center gap-1"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Draft (.txt)</span>
                          </button>

                          <button
                            onClick={() => handleStartSubmit(msg.structuredDraft!)}
                            className="px-4 py-2 rounded-xl bg-[#FF6B35] hover:bg-[#E0531D] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
                          >
                            <ShieldCheck className="w-4 h-4" />
                            <span>Review Terms &amp; Submit Application</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isProcessing && (
                <div className="flex gap-3 text-xs justify-start">
                  <div className="bg-white border border-zinc-200 p-3.5 rounded-2xl shadow-xs flex items-center gap-2 text-zinc-800 font-semibold">
                    <Sparkles className="w-4 h-4 text-[#FF6B35] animate-spin" />
                    <span>Analyzing with National Legal Intake AI &amp; checking public records...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* DOCKED BOTTOM INPUT BAR */}
            <div className="w-full pt-2 pb-2 flex-shrink-0">
              <div className="w-full bg-white/95 backdrop-blur-md p-2.5 sm:p-3 rounded-full border border-zinc-300 shadow-xl flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !isProcessing) {
                      e.preventDefault();
                      handleSendMessage(userInput);
                    }
                  }}
                  placeholder="Ask follow-up or provide specific details..."
                  className="flex-1 px-3 py-2 bg-transparent text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
                />

                <select
                  value={speechLanguage}
                  onChange={(e) => setSpeechLanguage(e.target.value)}
                  className="text-xs font-semibold bg-zinc-100 text-zinc-700 rounded-lg px-2 py-1.5 outline-none cursor-pointer border border-zinc-200 hidden sm:block"
                  title="Voice language"
                >
                  <option value="en-IN">EN</option>
                  <option value="hi-IN">हिन्दी</option>
                  <option value="kn-IN">ಕನ್ನಡ</option>
                  <option value="te-IN">తెలుగు</option>
                  <option value="ta-IN">தமிழ்</option>
                  <option value="ml-IN">മലയാളം</option>
                  <option value="bn-IN">বাংলা</option>
                </select>

                <button
                  type="button"
                  onClick={handleVoiceInput}
                  className={`p-2.5 rounded-full transition-all ${
                    isListening
                      ? "bg-red-600 text-white animate-pulse"
                      : "hover:bg-zinc-100 text-zinc-600"
                  }`}
                  title="Voice input"
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4 text-[#FF6B35]" />}
                </button>

                <button
                  type="button"
                  onClick={() => handleSendMessage(userInput)}
                  disabled={!userInput.trim() || isProcessing}
                  className="p-2.5 rounded-full bg-[#FF6B35] hover:bg-[#E0531D] text-white transition-all disabled:opacity-30 mr-0.5"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verified Document Preview Modal */}
      {previewDocModal && (
        <DocumentPreviewModal
          document={previewDocModal}
          onClose={() => setPreviewDocModal(null)}
          onDownload={() => {
            alert(`Downloaded official verified record: ${previewDocModal.title}`);
          }}
        />
      )}

      {/* Campaign Join Modal */}
      {selectedCampaignForJoin && (
        <JoinCampaignModal
          docket={selectedCampaignForJoin}
          onClose={() => setSelectedCampaignForJoin(null)}
          onSuccessSubscribe={() => {
            setSelectedCampaignForJoin(null);
            onSelectSection("campaigns");
          }}
        />
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
      {showPaymentModal && activeRtiForSubmit && (
        <PaymentBPLModal
          rtiDetails={{
            targetPublicAuthority: activeRtiForSubmit.targetPublicAuthority,
            subject: activeRtiForSubmit.subject,
            queriesCount: activeRtiForSubmit.formattedQueries.length,
            feeAmount: activeRtiForSubmit.prescribedFee,
          }}
          onClose={() => setShowPaymentModal(false)}
          onSuccessSubmitted={() => {
            onSelectSection("tracker");
          }}
        />
      )}
    </div>
  );
}
