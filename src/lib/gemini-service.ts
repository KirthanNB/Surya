import { MOCK_DISCLOSURES } from "@/data/mock-disclosures";
import { MOCK_COLLECTIVE_DOCKETS } from "@/data/mock-campaigns";

export interface GeneratedRTIResult {
  jurisdictionType: "Central Government" | "State Government";
  stateName?: string;
  departmentCategory: string;
  pioDesignation: string;
  targetPublicAuthority: string;
  subject: string;
  formattedQueries: string[];
  statutoryClause: string;
  prescribedFee: number;
  reasoning?: string;
}

export interface ChatMessagePayload {
  role: "user" | "model";
  text: string;
}

export interface GeminiConversationalResponse {
  replyText: string;
  isAskingFollowUp: boolean;
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

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

export async function structureRTIQuery(
  rawInput: string,
  customApiKey?: string
): Promise<GeneratedRTIResult> {
  const res = await sendGeminiConversation([], rawInput);
  if (res.structuredDraft) {
    return res.structuredDraft;
  }

  return {
    jurisdictionType: "State Government",
    stateName: "Concerned State / UT",
    departmentCategory: "Municipal & Urban Governance",
    pioDesignation: "Public Information Officer (PIO)",
    targetPublicAuthority: "Concerned Public Authority",
    subject: `Seeking certified public records regarding: ${rawInput.slice(0, 60)}`,
    formattedQueries: [
      `Certified true copy of sanction orders, tenders, and work completion certificates regarding: ${rawInput} under Section 2(j)(ii) of the RTI Act, 2005.`,
      `Certified extracts of Measurement Book (MB) entries and financial vouchers disbursed to appointed contractors.`,
      `Certified copies of third-party quality testing reports, material lab test results, and defect liability warranty agreements.`,
    ],
    statutoryClause: "Section 6(1) read with Section 2(j)(ii) of RTI Act 2005",
    prescribedFee: 10,
  };
}

export async function sendGeminiConversation(
  history: ChatMessagePayload[],
  currentMessage: string,
  preferredLanguage: string = "en"
): Promise<GeminiConversationalResponse> {
  const lower = currentMessage.toLowerCase();

  // 1. Proactive Disclosure Check (Section 4 Repository)
  const foundProactive = MOCK_DISCLOSURES.find((doc) => {
    const combined = (doc.title + " " + doc.snippet + " " + doc.department + " " + doc.documentContent.heading).toLowerCase();
    const words = lower.split(" ").filter((w) => w.length > 3);
    return words.some((w) => combined.includes(w));
  });

  // 2. Active Campaign Check
  const foundCampaign = MOCK_COLLECTIVE_DOCKETS.find((dock) => {
    const combined = (dock.clusterTitle + " " + dock.targetDepartment).toLowerCase();
    return (
      (lower.includes("metro") || lower.includes("train") || lower.includes("railway") || lower.includes("subway")) &&
      combined.includes("metro")
    ) || (
      (lower.includes("pothole") || lower.includes("bmc") || lower.includes("mumbai")) &&
      combined.includes("mumbai")
    );
  });

  const systemInstruction = `You are the official Administrative AI Legal Assistant on the Government of India National RTI 2.0 Portal.
You represent the Government of India and take full statutory responsibility under the Right to Information Act, 2005.
You communicate respectfully and fluently in whatever language the citizen uses (Telugu, Kannada, Hindi, Tamil, Malayalam, Bengali, Marathi, or English).

CORE DUTIES:
1. Carefully comprehend the citizen's query.
2. Determine if this falls under:
   - "Central Government" (e.g. National Highways, Railways, Defence, Central Universities, PSU Banks, Income Tax, Central Ministries) OR
   - "State Government" (e.g. Municipal Corporations, PWD, State Water Supply, State Police, Ration/PDS, District Health/Schools, Panchayati Raj).
3. Classify the Department Category (e.g. "Municipal & Urban Development", "Health & Family Welfare", "School Education & Literacy", "Food & Civil Supplies (PDS)", "Public Works (PWD)", "Water Supply & Sewerage", "Revenue & Land Administration").

4. IF the query is broad or missing location/time details:
   - Acknowledge their statutory right with official responsibility in the SAME language the citizen used.
   - Ask 2 to 3 targeted follow-up questions to identify the specific location/ward/district, year/timeline, and required certified documents.
   - Set "isAskingFollowUp": true and provide 2-3 short, actionable suggestions in the SAME LANGUAGE in "followUpSuggestions".

5. IF the query has specific details:
   - Set "isAskingFollowUp": false.
   - Produce an airtight Section 6(1) RTI application with Section 2(j)(ii) certified copy clauses.
   - Populate "structuredDraft" with jurisdictionType ("Central Government" | "State Government"), stateName, departmentCategory, pioDesignation, targetPublicAuthority, subject, and formattedQueries.

OUTPUT JSON FORMAT ONLY:
{
  "replyText": "Official response in citizen's language",
  "isAskingFollowUp": boolean,
  "followUpSuggestions": ["Suggestion 1 in citizen language", "Suggestion 2 in citizen language"],
  "matchedCampaign": null or {"id": "DOCKET-01", "title": "...", "department": "...", "subscribers": 4892},
  "matchedProactiveRecord": null or {"id": "DISC-01", "title": "...", "department": "...", "amount": "₹4.82 Cr", "summary": "..."},
  "structuredDraft": null or {
    "jurisdictionType": "State Government",
    "stateName": "State / UT Name",
    "departmentCategory": "Water Supply & Sanitation",
    "pioDesignation": "Executive Engineer & Designated PIO",
    "targetPublicAuthority": "District Water Supply & Sewerage Board",
    "subject": "Seeking certified records of drinking water pipeline and lab quality tests",
    "formattedQueries": [
      "1. Certified copy of pipeline sanction order, tender award, and contractor agreement under Section 2(j)(ii) of RTI Act 2005.",
      "2. Certified copy of drinking water potability and quality laboratory testing certificates.",
      "3. Certified copy of Measurement Book (MB) entries and disbursement vouchers."
    ],
    "statutoryClause": "Section 6(1) read with Section 2(j)(ii) of RTI Act 2005",
    "prescribedFee": 10
  }
}`;

  // Call live Gemini 2.5 Flash API
  try {
    const contents = [
      ...history.map((m) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.text }],
      })),
      {
        role: "user",
        parts: [{ text: `[Citizen Query]: ${currentMessage}` }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        }),
      }
    );

    if (response.ok) {
      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (rawText) {
        const parsed = JSON.parse(rawText);
        
        // If we found local proactive or campaign matches, enrich response
        if (foundProactive && !parsed.matchedProactiveRecord) {
          parsed.matchedProactiveRecord = {
            id: foundProactive.id,
            title: foundProactive.title,
            department: foundProactive.department,
            amount: foundProactive.documentContent.sanctionAmount || "₹4.82 Crores",
            summary: foundProactive.snippet,
          };
        }
        if (foundCampaign && !parsed.matchedCampaign) {
          parsed.matchedCampaign = {
            id: foundCampaign.id,
            title: foundCampaign.clusterTitle,
            department: foundCampaign.targetDepartment,
            subscribers: foundCampaign.totalSubscribers,
          };
        }

        return {
          replyText: parsed.replyText || "I have analyzed your administrative request.",
          isAskingFollowUp: parsed.isAskingFollowUp ?? false,
          followUpSuggestions: parsed.followUpSuggestions || [],
          matchedCampaign: parsed.matchedCampaign || undefined,
          matchedProactiveRecord: parsed.matchedProactiveRecord || undefined,
          structuredDraft: parsed.structuredDraft || undefined,
        };
      }
    }
  } catch (err) {
    console.error("National RTI Legal Intake API exception:", err);
  }

  // Robust Fallback
  return {
    replyText: `Under the Right to Information Act, 2005, you are entitled to inspect and receive certified true copies of public records regarding "${currentMessage.slice(0, 80)}". To direct your application to the exact Public Information Officer (PIO):

1. **Location:** Which specific ward, village, mandal, or district is this public work located in?
2. **Period:** What timeframe are you seeking records for (e.g. 2023–2025)?
3. **Specific Documents:** Do you require certified work orders, Measurement Book (MB) bills, or water/material quality laboratory test certificates?`,
    isAskingFollowUp: true,
    followUpSuggestions: [
      "Include last 2 years contractor payment bills",
      "Include water/material quality laboratory test reports",
      "Provide certified work order and tender agreements",
    ],
    matchedProactiveRecord: foundProactive
      ? {
          id: foundProactive.id,
          title: foundProactive.title,
          department: foundProactive.department,
          amount: foundProactive.documentContent.sanctionAmount || "₹4.82 Cr",
          summary: foundProactive.snippet,
        }
      : undefined,
    matchedCampaign: foundCampaign
      ? {
          id: foundCampaign.id,
          title: foundCampaign.clusterTitle,
          department: foundCampaign.targetDepartment,
          subscribers: foundCampaign.totalSubscribers,
        }
      : undefined,
  };
}
