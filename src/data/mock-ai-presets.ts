export interface JanAIPreset {
  id: string;
  category: string;
  badge: string;
  language: string;
  rawInput: string;
  clarifications: {
    question: string;
    suggestedAnswer: string;
  }[];
  generatedRTI: {
    targetPublicAuthority: string;
    pioDesignation: string;
    subject: string;
    sectionCite: string;
    formattedQueries: string[];
    statutoryClause: string;
    prescribedFee: number;
    recommendedAttachments: string[];
  };
}

export const JAN_AI_PRESETS: JanAIPreset[] = [
  {
    id: "preset-pothole-hi",
    category: "Civic Infrastructure",
    badge: "Road & Potholes (Hinglish/Hindi)",
    language: "Hinglish / Hindi",
    rawInput: "Hamare mohalle me Indiranagar 12th main road pichle saal banayi thi aur 2 mahine me hi saare gaddhe nikal aaye. Thekedar kon tha aur kitne cr rupaye kharch kiye the BBMP ne? Hume inspection report chahiye.",
    clarifications: [
      {
        question: "Do you also wish to demand the Asphalt Core Test Laboratory report and Defect Liability Period duration?",
        suggestedAnswer: "Yes, include Defect Liability clause under BBMP Standard Contract Conditions (Clause 14)."
      },
      {
        question: "Do you want certified copies or physical file inspection under Section 2(j)(i)?",
        suggestedAnswer: "Demand certified copies of Measurement Book (MB) and Quality Control sign-off."
      }
    ],
    generatedRTI: {
      targetPublicAuthority: "Bruhat Bengaluru Mahanagara Palike (BBMP) - South Zone",
      pioDesignation: "Public Information Officer & Executive Engineer (Roads Division), BBMP",
      subject: "Request for Information under Section 6(1) of the RTI Act, 2005 regarding Road Resurfacing & Defect Liability for 12th Main Indiranagar.",
      sectionCite: "Section 6(1) read with Section 2(j)(ii) for certified true copies",
      formattedQueries: [
        "Please provide the certified copy of the Work Order, Tender Sanction Order, and Bill of Quantities (BOQ) issued for the asphalt resurfacing of 12th Main Road, Indiranagar executed between 01-Jan-2023 and 31-Dec-2023.",
        "Please provide the Name, Registered Address, and GST Number of the primary contractor awarded the aforementioned work.",
        "Please provide the total amount sanctioned and the actual amount disbursed/paid to the contractor to date against the Measurement Book (MB).",
        "Please provide a certified copy of the Bitumen Lab Test Report / Core Sampling Quality Audit conducted prior to release of final payment.",
        "Please specify the exact Defect Liability Period (DLP) for this road stretch, and provide copies of any rectification notices served to the contractor under Clause 14.2."
      ],
      statutoryClause: "Information requested pertains to public expenditure and infrastructure safety. Under Section 7(1), response is due within 30 days.",
      prescribedFee: 10,
      recommendedAttachments: [
        "Photographs of current road condition with geo-timestamp",
        "Copy of ₹10 payment receipt or BPL card proof"
      ]
    }
  },
  {
    id: "preset-hospital-en",
    category: "Public Healthcare",
    badge: "Hospital Medicine Shortage (English)",
    language: "English",
    rawInput: "My father went to the district government hospital for his monthly insulin and cardiac medicines, but the pharmacy counter clerk told us stock is zero and asked us to buy from private medical shop outside for 2000 rupees. Isn't this supposed to be free?",
    clarifications: [
      {
        question: "Is this matter urgent regarding critical life-saving treatment?",
        suggestedAnswer: "Yes, highlight under Section 7(1) 48-hour Life & Liberty priority proviso."
      }
    ],
    generatedRTI: {
      targetPublicAuthority: "District Civil Hospital & State Health Directorate",
      pioDesignation: "Chief Public Information Officer & Medical Superintendent, District Hospital",
      subject: "URGENT: Application under Section 6(1) read with Section 7(1) Proviso (Life & Liberty) regarding Monthly Free Drug Stock Registers for Insulin & Cardiac Medications.",
      sectionCite: "Section 7(1) 48-Hour Statutory Priority Mandate",
      formattedQueries: [
        "Please provide certified copies of the Daily Stock & Issue Register (Form 4) for Human Insulin 40IU/ml and Atorvastatin 10mg maintained at the Central OPD Pharmacy from 01-Aug-2024 to 25-Aug-2024.",
        "Please provide the list of all medicine indent requisitions dispatched by the Hospital Superintendent to the State Medical Services Corporation for the current fiscal quarter.",
        "Under the Free Drug Distribution Scheme, please state the official protocol for local emergency purchase when essential medicines are temporarily out of stock.",
        "Please provide the name and designation of the supervisory authority responsible for inspecting daily zero-stock incidents at the OPD counter."
      ],
      statutoryClause: "URGENT MATTER: As this information directly concerns the medical life and health of citizens dependent on essential life-saving medication, information is requested within 48 hours pursuant to the proviso to Section 7(1).",
      prescribedFee: 10,
      recommendedAttachments: [
        "Doctor's prescription slip showing required medicine names",
        "Hospital OPD registration token copy"
      ]
    }
  },
  {
    id: "preset-ration-ta",
    category: "Food & Ration",
    badge: "PDS Ration Cut / Bio Fraud (Tamil/English)",
    language: "Tamil / English",
    rawInput: "Our local Fair Price Shop ration dealer only opens 2 days a week and deducts 5kg rice claiming biometric server error. We need the official monthly allotment quota for Shop #3402 in Madurai.",
    clarifications: [
      {
        question: "Do you wish to demand the digital PoS machine audit logs and truck delivery challans?",
        suggestedAnswer: "Yes, include electronic Point of Sale transaction register."
      }
    ],
    generatedRTI: {
      targetPublicAuthority: "Tamil Nadu Civil Supplies Corporation / Taluk Supply Office",
      pioDesignation: "Taluk Supply Officer & Public Information Officer, Civil Supplies Department",
      subject: "Request for Information under Section 6(1) of the RTI Act, 2005 regarding Monthly Foodgrain Allocation and PoS Machine Distribution Logs for Fair Price Shop No. 3402.",
      sectionCite: "Section 6(1) of RTI Act, 2005",
      formattedQueries: [
        "Please provide the certified monthly allotment quota of Rice, Sugar, Wheat, and Dal allocated to Fair Price Shop (FPS) No. 3402 for the months of June, July, and August 2024.",
        "Please provide the daily opening and closing stock register as recorded in the electronic Point of Sale (e-PoS) machine for the aforementioned shop.",
        "Please provide the certified copy of the mandatory shop operating hours and weekly working days schedule approved by the Taluk Supply Office.",
        "Please provide the inspection diary copies of the Taluk Supply Officer who inspected FPS No. 3402 in the last 6 months."
      ],
      statutoryClause: "PDS records are public beneficiary records under Section 4(1)(b)(xii) of RTI Act 2005 and must be provided within 30 days.",
      prescribedFee: 10,
      recommendedAttachments: [
        "Smart Ration Card front/back copy",
        "Shop signboard photo with FPS number"
      ]
    }
  }
];
