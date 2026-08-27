import { CollectiveDocket } from "@/types";

export const MOCK_COLLECTIVE_DOCKETS: CollectiveDocket[] = [
  {
    id: "DOCKET-2026-BLR-089",
    clusterTitle: "Outer Ring Road Metro Corridor: Phase 2A/2B Milestone Delays & Contractor Penalty Recovery",
    clusterSummary: "Automated Cluster Docket created by System after detecting 3,420 related inquiries filed to BMRCL regarding utility shifting delays, contractor liquidated damages, and safety inspection certificates between Silk Board and KR Puram.",
    targetDepartment: "Bangalore Metro Rail Corporation Limited (BMRCL)",
    pioDesignation: "Chief Public Information Officer & General Manager (Land & Procurement), BMRCL",
    jurisdiction: "Bengaluru, Karnataka (State Authority)",
    totalSubscribers: 4892,
    thresholdForExpeditedHearing: 5000,
    status: "under_pio_review",
    daysRemainingInSLA: 6,
    autoClusteredDate: "2026-08-01",
    systemReasoning: "AI clustering detected 89% semantic overlap across 3,400+ citizen inquiries regarding Silk Board to KR Puram civil works. Consolidated into single Section 6(1) unified docket.",
    subscribedCitizensList: [
      "Kavitha R.", "Arun Sundaram", "Vikramaditya S.", "Meenakshi Iyer", "Sunil Deshmukh"
    ],
    demandedInformationItems: [
      "Certified copies of Monthly Progress Reports (MPR) submitted by Afcons and Shankaranarayana Infrastructure.",
      "Total Liquidated Damages (LD) calculated and recovered from civil contractors for missed delivery milestones.",
      "Third-party viaduct concrete compressive strength and load test certificates issued by IISc/CRRI."
    ],
    officialResponses: [
      {
        date: "2026-08-20",
        title: "Interim Disclosure Uploaded by CPIO",
        description: "BMRCL uploaded monthly structural milestone charts to the National Transparency Repository for public download.",
        issuedBy: "CPIO Office, BMRCL"
      },
      {
        date: "2026-08-02",
        title: "Automated Collective Notice Served to PIO",
        description: "Consolidated digital notice dispatched under Section 6(1) with 4,500+ verified citizen signatures.",
        issuedBy: "RTI Online National Registry"
      }
    ]
  },
  {
    id: "DOCKET-2026-MUM-412",
    clusterTitle: "Brihanmumbai Pre-Monsoon Road Concretization Quality Audit & Defect Liability Warranties",
    clusterSummary: "System-generated cluster aggregating 2,210 inquiries regarding asphalt quality test reports, VJTI lab core testing, and 3-year defect liability warranty notices across Western Suburbs.",
    targetDepartment: "Brihanmumbai Municipal Corporation (BMC) - Roads & Traffic Dept",
    pioDesignation: "Public Information Officer & Chief Engineer (Vigilance), BMC",
    jurisdiction: "Mumbai, Maharashtra (Municipal Authority)",
    totalSubscribers: 3120,
    thresholdForExpeditedHearing: 3500,
    status: "active_gathering",
    daysRemainingInSLA: 12,
    autoClusteredDate: "2026-08-05",
    systemReasoning: "System detected high query density across K-West, H-East, and P-North wards relating to pre-monsoon road resurfacing contracts.",
    subscribedCitizensList: [
      "Sameer Joshi", "Nalini Merchant", "Dr. Farhan Qureshi", "Pooja Hegde"
    ],
    demandedInformationItems: [
      "Certified Measurement Books (MB) and bitumen extraction test reports for 24 ward link roads.",
      "Copies of show-cause notices served to empanelled road contractors under Defect Liability Clause 14.",
      "List of contractor performance bank guarantees held by Municipal Treasury."
    ],
    officialResponses: [
      {
        date: "2026-08-18",
        title: "Vigilance Cell Verification Initiated",
        description: "Chief Engineer (Vigilance) issued direction to Junior Engineers to compile Ward 14-22 test logs.",
        issuedBy: "BMC Roads HQ"
      }
    ]
  },
  {
    id: "DOCKET-2026-DEL-109",
    clusterTitle: "Directorate of Education Delhi: Computer Science & Physics Faculty Vacancy Roster",
    clusterSummary: "System-clustered docket consolidating 1,390 queries from School Management Committees (SMCs) demanding school-wise sanctioned vs vacant teacher strength.",
    targetDepartment: "Directorate of Education, Govt of NCT of Delhi",
    pioDesignation: "Public Information Officer & Joint Director (Establishment), DoE",
    jurisdiction: "Delhi NCT (State Authority)",
    totalSubscribers: 1845,
    thresholdForExpeditedHearing: 2000,
    status: "disclosed_publicly",
    daysRemainingInSLA: 0,
    autoClusteredDate: "2026-07-20",
    systemReasoning: "System grouped multiple queries on government school teacher allocations into a single proactive Section 4(1)(b) disclosure mandate.",
    subscribedCitizensList: [
      "Sunita Verma", "Rajesh Khurana", "Deepak Gupta", "Anita Thomas"
    ],
    demandedInformationItems: [
      "School-wise sanctioned vs in-position permanent faculty rosters for 1,027 senior secondary schools.",
      "Number of guest faculty requisitions dispatched to DSSSB for FY 2026-27."
    ],
    officialResponses: [
      {
        date: "2026-08-10",
        title: "Proactive Disclosure Order #DE/2026/1029 Published",
        description: "Directorate of Education uploaded the complete school vacancy roster on Edudel portal and notified recruitment for 1,420 positions.",
        issuedBy: "Special Director of Education, DoE Delhi"
      }
    ]
  }
];
