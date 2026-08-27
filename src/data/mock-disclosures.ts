import { AlreadyPublicResult } from "@/types";

export const MOCK_DISCLOSURES: AlreadyPublicResult[] = [
  {
    id: "DISC-BBMP-2024-098",
    title: "Ward 17 (JP Nagar) Road Resurfacing & Drainage Tender Sanctions",
    department: "Bruhat Bengaluru Mahanagara Palike (BBMP) - Engineering Division",
    jurisdiction: "Bengaluru, Karnataka",
    category: "infrastructure",
    disclosureClause: "Section 4(1)(b)(xi) - Budget Allotments & Execution Details",
    sourcePortal: "Karnataka Open Municipal Data & e-Procurement Portal",
    publishedDate: "2024-07-15",
    fileFormat: "PDF",
    fileSize: "2.4 MB",
    relevanceScore: 99,
    snippet: "Official Work Order BBMP/EE/S-DIV/WO/2024/098 sanctioning ₹4.82 Crores for 14 asphalt stretches in Ward 17. Includes contractor guarantee clause, defect liability period of 36 months, and asphalt thickness test reports.",
    keyFacts: [
      { label: "Approved Budget", value: "₹4,82,50,000" },
      { label: "Contractor", value: "M/s Sri Venkateshwara Infraprojects" },
      { label: "Defect Liability", value: "3 Years (Valid till Aug 2027)" },
      { label: "Work Status", value: "Completed (Audit Passed)" },
    ],
    documentContent: {
      heading: "BRUHAT BENGALURU MAHANAGARA PALIKE - CHIEF ENGINEER (SOUTH)",
      sanctionOrderNo: "BBMP/CE(S)/PR/17/2024-25/0892",
      allocatedAmount: "₹4,82,50,000",
      expendedAmount: "₹4,61,12,300",
      contractorName: "M/s Sri Venkateshwara Infraprojects Pvt Ltd (GSTIN: 29AAACS8912P1Z0)",
      completionStatus: "Completed on 12-June-2024 (Defect Liability active)",
      keyObservations: [
        "Core sampling test conducted by BMS College of Engineering on 28-May-2024 confirms 50mm Bituminous Concrete layer compliance.",
        "Citizen grievance hotline registered 2 pothole complaints post-monsoon; contractor served rectification notice under Clause 14.2.",
        "Total retention deposit of ₹48.25 Lakhs withheld with Municipal Treasury pending final quality inspection."
      ],
      tableData: [
        { "Stretch Name": "24th Main 5th Phase", "Length (m)": "1,240", "Cost (INR)": "₹84,50,000", "Quality Score": "94/100" },
        { "Stretch Name": "15th Cross Ring Road Jn", "Length (m)": "850", "Cost (INR)": "₹62,10,000", "Quality Score": "91/100" },
        { "Stretch Name": "Dollar Layout Link Road", "Length (m)": "1,920", "Cost (INR)": "₹1,42,00,000", "Quality Score": "96/100" },
        { "Stretch Name": "Drainage Culvert Rebuild", "Length (m)": "450", "Cost (INR)": "₹52,00,000", "Quality Score": "89/100" },
      ]
    }
  },
  {
    id: "DISC-MOHFW-2024-412",
    title: "National Free Essential Drugs Scheme - Central Hospital Stock Register & Procurement Rates",
    department: "Ministry of Health & Family Welfare - Central Drugs Standard Control Org",
    jurisdiction: "Central Government / Pan-India",
    category: "health",
    disclosureClause: "Section 4(1)(b)(xiv) - Electronic Inventory & Stock Status",
    sourcePortal: "e-Aushadhi / National Health Portal Proactive Disclosure Desk",
    publishedDate: "2024-08-01",
    fileFormat: "CSV",
    fileSize: "1.1 MB",
    relevanceScore: 96,
    snippet: "Real-time consolidated batch inventory of 384 Essential Medicines (NLEM 2022) across AIIMS Delhi, Safdarjung Hospital, and RML Hospital. Includes unit purchase rates on GeM and expiry schedules.",
    keyFacts: [
      { label: "Total Medicines Monitored", value: "384 Essential Drugs" },
      { label: "Active Stock Level", value: "92.4% Full Availability" },
      { label: "Procurement Benchmark", value: "GeM Rate Contract 2024" },
      { label: "Free Dispensation Clause", value: "100% Zero-Cost to Citizens" },
    ],
    documentContent: {
      heading: "GOVERNMENT OF INDIA - MINISTRY OF HEALTH & FAMILY WELFARE",
      sanctionOrderNo: "MOHFW/PROC/E-AUSHADHI/2024/Q2-CONSOL",
      allocatedAmount: "₹120.00 Crores",
      expendedAmount: "₹94.35 Crores",
      contractorName: "Multiple Empanelled Generic Manufacturers via Government e-Marketplace (GeM)",
      completionStatus: "Active Monthly Rollout (FY 2024-25)",
      keyObservations: [
        "Paracetamol 500mg procured at ₹0.32/tablet; Metformin 500mg at ₹0.48/tablet under bulk central tender.",
        "Zero-stock alerts automatically trigger buffer reallocation from Central Medical Services Society (CMSS) warehouse within 48 hours.",
        "All civil hospital pharmacies mandated to display daily stock board at OPD counters per MOHFW circular #18/2023."
      ],
      tableData: [
        { "Drug Name": "Amoxicillin 500mg Cap", "Current Stock": "4,50,000 units", "Unit Cost": "₹1.45", "Status": "Adequate" },
        { "Drug Name": "Insulin Regular 40IU/ml", "Current Stock": "18,200 vials", "Unit Cost": "₹82.50", "Status": "Adequate" },
        { "Drug Name": "Atorvastatin 10mg", "Current Stock": "2,10,000 tabs", "Unit Cost": "₹0.68", "Status": "Adequate" },
        { "Drug Name": "Oral Rehydration Salts", "Current Stock": "95,000 sachets", "Unit Cost": "₹3.10", "Status": "Surplus" },
      ]
    }
  },
  {
    id: "DISC-EDU-DL-2024-055",
    title: "Directorate of Education Delhi: PM-SHRI & Samagra Shiksha School Grant Utilization",
    department: "Directorate of Education, Govt of NCT of Delhi",
    jurisdiction: "Delhi NCT",
    category: "education",
    disclosureClause: "Section 4(1)(b)(v) & (xi) - School Level Scheme Allocations",
    sourcePortal: "DoE Edudel Proactive Section 4 Disclosure Archive",
    publishedDate: "2024-06-20",
    fileFormat: "PDF",
    fileSize: "3.8 MB",
    relevanceScore: 94,
    snippet: "Annual School Development Grant utilization report for 1,027 Delhi Government schools. Includes computer lab installations, dual-desk procurement, CCTV maintenance, and mid-day meal nutrition audits.",
    keyFacts: [
      { label: "Total Fund Disbursed", value: "₹48.90 Crores" },
      { label: "Schools Covered", value: "1,027 Govt & Aided Schools" },
      { label: "Smart Classrooms", value: "3,400 Units Installed" },
      { label: "SMC Verification", value: "100% Parent Sign-off Done" },
    ],
    documentContent: {
      heading: "DIRECTORATE OF EDUCATION - GOVT OF NCT OF DELHI",
      sanctionOrderNo: "DE/SMC/FIN-AUDIT/2023-24/1029",
      allocatedAmount: "₹48,90,00,000",
      expendedAmount: "₹47,15,40,000",
      contractorName: "School Management Committees (SMCs) & GeM Direct Empanelled Vendors",
      completionStatus: "Audited by Internal Directorate Finance Wing",
      keyObservations: [
        "Sanitary napkin vending machines installed and operational across 100% senior secondary girls' schools.",
        "STEM robotics kit distribution completed across 280 schools in collaboration with IIT Delhi outreach cell.",
        "Unspent balance of ₹1.74 Cr re-credited to State Treasury pursuant to General Financial Rules (GFR) 2017."
      ],
      tableData: [
        { "District": "District South", "Allocated": "₹6.80 Cr", "Expended": "₹6.62 Cr", "Utilization": "97.3%" },
        { "District": "District East", "Allocated": "₹5.40 Cr", "Expended": "₹5.18 Cr", "Utilization": "95.9%" },
        { "District": "District North-West", "Allocated": "₹8.20 Cr", "Expended": "₹7.95 Cr", "Utilization": "96.9%" },
        { "District": "District Central", "Allocated": "₹4.10 Cr", "Expended": "₹3.92 Cr", "Utilization": "95.6%" },
      ]
    }
  },
  {
    id: "DISC-NHAI-2024-781",
    title: "NH-48 Bengaluru-Mysuru Expressway Toll Collection & Safety Audit Compliance",
    department: "National Highways Authority of India (NHAI) - Regional Office",
    jurisdiction: "Karnataka",
    category: "tenders",
    disclosureClause: "Section 4(1)(b)(xiii) - Concessions, Permits and Authorizations Granted",
    sourcePortal: "NHAI Data Lake & Toll Transparency Portal",
    publishedDate: "2024-05-10",
    fileFormat: "PDF",
    fileSize: "5.2 MB",
    relevanceScore: 91,
    snippet: "Complete toll collection figures (₹18.4 Cr/month avg), toll plaza concessionaire agreement, emergency medical response logs, and IRC safety compliance report for the 118km Greenfield expressway.",
    keyFacts: [
      { label: "Monthly Toll Avg", value: "₹18,40,00,000" },
      { label: "Ambulance Units", value: "8 Dedicated High-Speed ALS Units" },
      { label: "Speed Detection Radars", value: "48 AI Cameras Operational" },
      { label: "Pothole Warranty", value: "Zero Tolerance Clause Active" },
    ],
    documentContent: {
      heading: "NATIONAL HIGHWAYS AUTHORITY OF INDIA (MINISTRY OF ROAD TRANSPORT)",
      sanctionOrderNo: "NHAI/RO-BLR/TECH/BM-EXP/2024/552",
      allocatedAmount: "₹8,480 Crores (Project Capital)",
      expendedAmount: "₹8,480 Crores (Fully Commissioned)",
      contractorName: "NHAI Project Implementation Unit (PIU) Ramanagara",
      completionStatus: "Commercial Operation Date (COD) achieved",
      keyObservations: [
        "100% FASTag automated tolling with average transaction processing time of 2.8 seconds per vehicle.",
        "Rainwater harvesting ponds built at every 500m median intervals to prevent highway surface waterlogging.",
        "Quarterly road safety audit conducted by Central Road Research Institute (CRRI) rating expressway 4.4/5."
      ],
      tableData: [
        { "Plaza Name": "Kaniminike Plaza (Km 18)", "Daily PCU": "48,200", "Avg Monthly Revenue": "₹9.80 Cr" },
        { "Plaza Name": "Sheshagirihalli Plaza (Km 82)", "Daily PCU": "39,100", "Avg Monthly Revenue": "₹8.60 Cr" },
      ]
    }
  },
  {
    id: "DISC-PDS-TN-2024-118",
    title: "Tamil Nadu Civil Supplies: Public Distribution System (PDS) Monthly Ration Allotment Register",
    department: "Food & Consumer Protection Department, Govt of Tamil Nadu",
    jurisdiction: "Chennai & Districts, Tamil Nadu",
    category: "welfare",
    disclosureClause: "Section 4(1)(b)(xii) - Beneficiary Subsidy Programmes Execution",
    sourcePortal: "TN PDS (TNePDS) Fair Price Shop Public Dashboard",
    publishedDate: "2024-07-28",
    fileFormat: "CSV",
    fileSize: "890 KB",
    relevanceScore: 93,
    snippet: "FPS Fair Price Shop grain allocation quotas, biometric authentication success rate (99.2%), free rice distribution figures under NFSA and State Universal PDS, and sugar/dal buffer reserves.",
    keyFacts: [
      { label: "Fair Price Shops", value: "35,120 Outlets Active" },
      { label: "Free Rice Allotment", value: "100% Free for all Smart Card Holders" },
      { label: "Biometric POS Success", value: "99.2% First-attempt Match" },
      { label: "Grievance Redressal", value: "Avg 48 hrs resolution" },
    ],
    documentContent: {
      heading: "TAMIL NADU CIVIL SUPPLIES CORPORATION - CHENNAI",
      sanctionOrderNo: "TNCSC/PDS-AUDIT/JUL-2024/0912",
      allocatedAmount: "₹10,500 Crores (Annual Subsidy)",
      expendedAmount: "₹2,625 Crores (Q1 FY25)",
      contractorName: "Direct State Procurement via Tamil Nadu Warehousing Corporation",
      completionStatus: "Monthly continuous public dispatch",
      keyObservations: [
        "Zero diversion rate recorded in 2024 audit due to end-to-end GPS tracking of grain transport trucks.",
        "Fortified Rice Kernels (FRK) blended at 1:100 ratio to combat iron-deficiency anemia in children.",
        "Point of Sale (PoS) machine transactions synced in real-time with State Central Server."
      ]
    }
  }
];

export const MOCK_DATABASES_SCANNED = [
  { name: "Section 4 Proactive Disclosure Portals", count: "3,420 depts", status: "online" },
  { name: "CPGRAMS Public Grievance Database", count: "1.2M records", status: "online" },
  { name: "CAG Public Audit Reports (2018-2024)", count: "18,400 audits", status: "online" },
  { name: "Government e-Marketplace (GeM) Tenders", count: "890k contracts", status: "online" },
  { name: "State Municipal Open Data Engines", count: "48 cities", status: "online" },
  { name: "National Health & e-Aushadhi Drug Stocks", count: "4,200 hospitals", status: "online" },
  { name: "Samagra Shiksha & PM-SHRI Portal", count: "1.1M schools", status: "online" },
  { name: "National Highways & Road Safety Repositories", count: "140k km data", status: "online" },
  { name: "National Food Security Ration Registers", count: "5.4L FPS shops", status: "online" },
  { name: "Central Information Commission (CIC) Repository", count: "650k rulings", status: "online" },
  { name: "State High Court RTI Bench Orders", count: "42k orders", status: "online" },
  { name: "Open Government Data (OGD) Platform India", count: "550k datasets", status: "online" }
];
