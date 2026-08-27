import { RTITrackingRecord } from "@/types";

export const MOCK_TRACKING_RECORDS: Record<string, RTITrackingRecord> = {
  "RTI-2024-KA-8891": {
    applicationId: "RTI-2024-KA-8891",
    maskedAadhaar: "XXXX-XXXX-8921",
    subject: "Ward 17 Stormwater Drain Reconstruction Expenditure & Contractor Test Certificates",
    department: "Bruhat Bengaluru Mahanagara Palike (BBMP) - Major Roads Division",
    pioName: "Sri R. K. Manjunath (Executive Engineer & PIO)",
    filingDate: "2024-07-10",
    isLifeAndLiberty: false,
    statutoryDeadlineDays: 30,
    daysElapsed: 48,
    currentStage: 3,
    status: "overdue_penalty",
    penaltyPerDay: 250,
    accumulatedPenalty: 4500, // (48 - 30) = 18 days * 250 = ₹4,500
    stages: [
      {
        stageNumber: 1,
        title: "Application Dispatched & Cryptographically Timestamped",
        status: "completed",
        timestamp: "10 Jul 2024, 10:14 AM",
        officerRole: "SURYA Digital Registry",
        remarks: "Section 6(1) digital token generated. ₹10 statutory fee verified via Bharatkosh UPI.",
      },
      {
        stageNumber: 2,
        title: "Assigned to Public Information Officer (PIO)",
        status: "completed",
        timestamp: "12 Jul 2024, 03:45 PM",
        officerRole: "Central Registry BBMP",
        remarks: "Transferred to Sri R. K. Manjunath (EE & CPIO, South Zone) under acknowledgement #BBMP/RTI/24/8891.",
      },
      {
        stageNumber: 3,
        title: "Section 5(4) Sub-officer Information Retrieval",
        status: "delayed",
        timestamp: "18 Jul 2024, 11:20 AM",
        officerRole: "Assistant Executive Engineer (Ward 17)",
        remarks: "Internal memo issued to Junior Engineer for asphalt core test reports. No response filed for 30+ days.",
        actionRequired: "Statutory 30-day window expired on 09-Aug-2024. Personal fine of ₹250/day is accumulating against the PIO."
      },
      {
        stageNumber: 4,
        title: "Disclosure Drafting & Redaction Review",
        status: "pending",
        officerRole: "PIO Legal Cell",
        remarks: "Awaiting primary document dispatch from Engineering Wing.",
      },
      {
        stageNumber: 5,
        title: "Final Disclosure Dispatch to Citizen",
        status: "pending",
        officerRole: "CPIO Office",
        remarks: "Public inspection copies and certified PDF records pending citizen release.",
      }
    ]
  },
  "RTI-2024-DL-1044": {
    applicationId: "RTI-2024-DL-1044",
    maskedAadhaar: "XXXX-XXXX-4102",
    subject: "Emergency Life-Saving Medicine Availability at Safdarjung Hospital Trauma ICU",
    department: "Safdarjung Hospital & Vardhman Mahavir Medical College",
    pioName: "Dr. Ananya Sharma (Addl Medical Superintendent & CPIO)",
    filingDate: "2024-08-25",
    isLifeAndLiberty: true,
    statutoryDeadlineDays: 2, // 48 hours under Section 7(1) proviso
    daysElapsed: 1,
    hoursElapsed: 31,
    currentStage: 3,
    status: "on_time",
    penaltyPerDay: 250,
    accumulatedPenalty: 0,
    stages: [
      {
        stageNumber: 1,
        title: "Section 7(1) Life & Liberty Priority Filing Initiated",
        status: "completed",
        timestamp: "25 Aug 2024, 08:30 AM",
        officerRole: "SURYA Priority Rapid Desk",
        remarks: "Flagged under 48-Hour Urgent Life & Liberty proviso. Emergency alert sent via SMS/Email to Medical Superintendent.",
      },
      {
        stageNumber: 2,
        title: "CPIO Emergency Docket Assigned",
        status: "completed",
        timestamp: "25 Aug 2024, 09:15 AM",
        officerRole: "Medical Superintendent Office",
        remarks: "Acknowledged by Dr. Ananya Sharma. Expedited processing protocol invoked.",
      },
      {
        stageNumber: 3,
        title: "Central Pharmacy & ICU Stock Register Verification",
        status: "in_progress",
        timestamp: "25 Aug 2024, 02:00 PM",
        officerRole: "Chief Pharmacist & ICU Incharge",
        remarks: "Verifying current batch quantities of Inj. Noradrenaline and Inj. Meropenem.",
      },
      {
        stageNumber: 4,
        title: "Immediate Digital Certification",
        status: "pending",
        officerRole: "CPIO Office",
        remarks: "Scheduled for release within remaining 17 hours.",
      },
      {
        stageNumber: 5,
        title: "Emergency Delivery to Citizen",
        status: "pending",
        officerRole: "SURYA Direct Delivery",
        remarks: "Digital dispatch via encrypted portal.",
      }
    ]
  },
  "RTI-2024-MH-4420": {
    applicationId: "RTI-2024-MH-4420",
    maskedAadhaar: "XXXX-XXXX-9934",
    subject: "Coastal Road Project Contractor Sub-Contracting Details and Tender Financial Bids",
    department: "Brihanmumbai Municipal Corporation (BMC)",
    pioName: "Sri Vikram Patwardhan (Chief Engineer & PIO)",
    filingDate: "2024-06-15",
    isLifeAndLiberty: false,
    statutoryDeadlineDays: 30,
    daysElapsed: 32,
    currentStage: 4,
    status: "rejected",
    penaltyPerDay: 250,
    accumulatedPenalty: 0,
    rejectionReason: {
      sectionCited: "Section 8(1)(d) - Commercial Confidence & Trade Secrets",
      pioExplanation: "The requested contractor unit rate breakdown and sub-contracting agreements contain trade secrets and commercial confidence of the bidder, disclosure of which would harm their competitive position.",
      orderDate: "2024-07-16"
    },
    stages: [
      {
        stageNumber: 1,
        title: "Filing Dispatched",
        status: "completed",
        timestamp: "15 Jun 2024, 11:00 AM",
        officerRole: "SURYA Portal",
      },
      {
        stageNumber: 2,
        title: "CPIO Receipt",
        status: "completed",
        timestamp: "17 Jun 2024, 02:30 PM",
        officerRole: "BMC Coastal Road Wing",
      },
      {
        stageNumber: 3,
        title: "Third Party Consultation under Section 11",
        status: "completed",
        timestamp: "28 Jun 2024, 04:10 PM",
        officerRole: "L&T / HCC Consortium",
        remarks: "Contractor objected to disclosure citing commercial confidence.",
      },
      {
        stageNumber: 4,
        title: "Application Rejected by PIO",
        status: "delayed",
        timestamp: "16 Jul 2024, 05:00 PM",
        officerRole: "CPIO BMC",
        remarks: "Order passed denying information under Section 8(1)(d). Precedent Matcher ready for 1-Click Appeal.",
      },
      {
        stageNumber: 5,
        title: "First Appeal Available",
        status: "pending",
        officerRole: "Appellate Authority (Addl Municipal Commissioner)",
        remarks: "Citizen advised to use SURYA Precedent Matcher to cite CIC Landmark Order CIC/SG/A/2011/000282.",
      }
    ]
  }
};
