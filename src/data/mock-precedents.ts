import { CICPrecedent } from "@/types";

export const MOCK_PRECEDENTS: Record<string, CICPrecedent[]> = {
  "8_1_d": [
    {
      id: "PREC-CIC-4521",
      rulingNumber: "CIC/SG/A/2011/000282/12391",
      caseTitle: "Shailesh Gandhi vs. Public Works Department, Delhi",
      tribunal: "Central Information Commission, New Delhi",
      bench: "Information Commissioner Shailesh Gandhi",
      dateOfOrder: "2011-05-18",
      sectionOverruled: "Section 8(1)(d) - Commercial Confidence & Tender Bids",
      keyPrinciple: "Once a public contract is awarded, all rates, contractor bills, measurement books, and quality certificates become public property. Section 8(1)(d) cannot be invoked to shield public expenditure.",
      verbatimExcerpt: "The Commission notes that when public funds are spent, the public has an absolute right to know how every rupee was spent and what quality was delivered. Once contracts are concluded, commercial confidence ceases to exist in relations between the state and the contractor.",
      appliesToScenarios: [
        "Contractor bill payments & measurement books",
        "Tender evaluation sheets after award of contract",
        "Public road resurfacing and building quality reports",
        "Sub-contractor names and material purchase vouchers"
      ],
      victoryProbabilityScore: 96
    },
    {
      id: "PREC-DHC-8812",
      rulingNumber: "W.P.(C) 499/2012 & CM 1098/2012",
      caseTitle: "Union of India vs. Central Information Commission & Anr. (Delhi High Court)",
      tribunal: "High Court of Delhi",
      bench: "Hon'ble Mr. Justice Rajiv Shakdher",
      dateOfOrder: "2013-03-22",
      sectionOverruled: "Section 8(1)(d) - Trade Secrets in Public Works",
      keyPrinciple: "Mere claim by a private contractor that disclosure will hurt competitive edge does not satisfy the high burden of Section 8(1)(d). Larger public interest in integrity of public procurement overrides private commercial claims.",
      verbatimExcerpt: "A blanket claim of commercial confidence without demonstrating specific, quantifiable harm to competitive position is unsustainable in law.",
      appliesToScenarios: [
        "Tender quotation comparisons",
        "Performance guarantee status",
        "Concessionaire toll collections"
      ],
      victoryProbabilityScore: 92
    }
  ],
  "8_1_j": [
    {
      id: "PREC-SC-1029",
      rulingNumber: "Civil Appeal No. 10044/2010",
      caseTitle: "Central Board of Secondary Education & Anr. vs. Aditya Bandopadhyay & Ors.",
      tribunal: "Supreme Court of India",
      bench: "Hon'ble Justices R.V. Raveendran & A.K. Patnaik",
      dateOfOrder: "2011-08-09",
      sectionOverruled: "Section 8(1)(j) - Personal Information & Official Performance",
      keyPrinciple: "An employee's public performance, leave records, attendance, official travel allowances, and salary drawn from the public exchequer are not 'personal information' exempt under Section 8(1)(j).",
      verbatimExcerpt: "Public servants cannot claim exemption under personal information for matters relating to discharge of their official public duties funded by the taxpayer.",
      appliesToScenarios: [
        "Public servant attendance registers & transfer orders",
        "Salary slip breakups and allowance disclosures",
        "Official inspection logs of government officers",
        "Disciplinary proceedings conclusion reports"
      ],
      victoryProbabilityScore: 94
    },
    {
      id: "PREC-CIC-9921",
      rulingNumber: "CIC/WB/A/2006/00469 & 00470",
      caseTitle: "Manoj K. Kamra vs. University of Rajasthan",
      tribunal: "Central Information Commission",
      bench: "Chief Information Commissioner Wajahat Habibullah",
      dateOfOrder: "2007-01-12",
      sectionOverruled: "Section 8(1)(j) - Educational Degrees & Public Qualifications",
      keyPrinciple: "Educational qualifications submitted to obtain public employment or constitutional office cannot be classified as private third-party personal data under Section 8(1)(j).",
      verbatimExcerpt: "The qualifications based on which a person holds a public office or job must be open to public scrutiny to ensure honesty in public appointments.",
      appliesToScenarios: [
        "Educational qualification verification for govt jobs",
        "Recruitment marks lists & cutoff rosters",
        "Experience certificates submitted for state tenders"
      ],
      victoryProbabilityScore: 91
    }
  ],
  "7_9": [
    {
      id: "PREC-CIC-3301",
      rulingNumber: "CIC/AT/A/2008/00020",
      caseTitle: "Subhash Chandra Agrawal vs. Supreme Court of India Registry",
      tribunal: "Central Information Commission",
      bench: "Full Bench of Information Commissioners",
      dateOfOrder: "2009-01-06",
      sectionOverruled: "Section 7(9) - Disproportionate Diversion of Resources",
      keyPrinciple: "Section 7(9) is only a clause regarding the 'form' of supply of information, NOT a ground for denial or rejection of information. If compiling takes time, the PIO must allow file inspection.",
      verbatimExcerpt: "Section 7(9) does not authorize the PIO to deny information altogether; it merely permits providing information in another form if compilation would disproportionately divert public resources.",
      appliesToScenarios: [
        "PIO claiming data is spread across 500 files",
        "PIO demanding citizen to narrow query without offering file inspection",
        "Denial of old physical records citing shortage of staff"
      ],
      victoryProbabilityScore: 98
    }
  ]
};

export const REJECTION_CATEGORIES = [
  {
    id: "8_1_d",
    label: "Section 8(1)(d) - Commercial Confidence & Trade Secrets",
    description: "Used by PIOs to hide tender bids, contractor rates, supplier agreements, or audit bills.",
    successRate: "96% Win Rate in Appeals",
  },
  {
    id: "8_1_j",
    label: "Section 8(1)(j) - Personal Information of Public Servants",
    description: "Used by PIOs to deny attendance, travel bills, salary slips, or official performance records.",
    successRate: "94% Win Rate in Appeals",
  },
  {
    id: "7_9",
    label: "Section 7(9) - Disproportionate Diversion of Resources",
    description: "Used by PIOs claiming 'compilation requires too many staff hours' to illegally dismiss requests.",
    successRate: "98% Win Rate in Appeals",
  }
];
