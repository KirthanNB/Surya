export type SectionType = 
  | "search" 
  | "file-rti" 
  | "tracker" 
  | "campaigns" 
  | "public-records" 
  | "precedent" 
  | "scorecard";

export type RTIStageStatus = "completed" | "in_progress" | "pending" | "delayed";

export interface RTIStage {
  stageNumber: number;
  title: string;
  description?: string;
  status: RTIStageStatus;
  timestamp?: string;
  officerRole?: string;
  remarks?: string;
  actionRequired?: string | boolean;
}

export interface RTITrackingRecord {
  applicationId: string;
  filingDate: string;
  subject: string;
  department: string;
  jurisdictionType?: "Central" | "State" | string;
  stateName?: string;
  departmentCategory?: string;
  pioName: string;
  maskedAadhaar: string;
  statutoryDeadlineDays: number;
  daysElapsed: number;
  hoursElapsed?: number;
  currentStage?: number;
  accumulatedPenalty: number;
  penaltyPerDay?: number;
  rejectionReason?: string | { sectionCited: string; pioExplanation: string; orderDate: string; };
  stages: RTIStage[];
  status: "active" | "disposed" | "overdue_penalty" | "rejected" | "on_time" | string;
  isLifeAndLiberty?: boolean;
}

export interface CollectiveDocket {
  id: string;
  clusterTitle: string;
  clusterSummary: string;
  targetDepartment: string;
  pioDesignation: string;
  jurisdiction: string;
  totalSubscribers: number;
  thresholdForExpeditedHearing: number;
  status: string;
  daysRemainingInSLA: number;
  autoClusteredDate: string;
  systemReasoning: string;
  subscribedCitizensList: string[];
  demandedInformationItems: string[];
  officialResponses: {
    date: string;
    title: string;
    description: string;
    issuedBy: string;
  }[];
}

export interface CICPrecedent {
  id: string;
  caseTitle: string;
  rulingNumber: string;
  dateOfOrder: string;
  tribunal: string;
  bench: string;
  sectionOverruled: string;
  category?: string;
  keyPrinciple: string;
  verbatimExcerpt: string;
  applicableCircumstances?: string[];
  appliesToScenarios?: string[];
  victoryProbabilityScore?: number;
}

export interface AlreadyPublicResult {
  id: string;
  title: string;
  department: string;
  jurisdiction: string;
  stateName?: string;
  category?: string;
  datePublished?: string;
  publishedDate?: string;
  sourcePortal?: string;
  proactiveDisclosureSection?: string;
  snippet: string;
  sourceUrl?: string;
  fileFormat?: string;
  fileSize?: string;
  relevanceScore?: number;
  keyFacts?: any;
  disclosureClause?: string;
  documentContent: {
    heading: string;
    body?: string;
    sanctionAmount?: string;
    contractorName?: string;
    completionDate?: string;
    sanctionOrderNo?: string;
    allocatedAmount?: string;
    expendedAmount?: string;
    completionStatus?: string;
    keyObservations?: string[];
    tableData?: any;
  };
}

export interface DepartmentScorecard {
  id: string;
  name: string;
  ministry: string;
  jurisdiction: string;
  grade: string;
  totalRTIsReceived: number;
  proactiveDisclosureRate: number;
  avgResponseDays: number;
  rejectionRate: number;
  penaltiesLeviedINR: number;
  trend: string;
  chronicDelayOffices: string[];
  topCategories: string[];
}

export interface AccessibilitySettings {
  highContrast: boolean;
  fontSize: "normal" | "large" | "extra-large";
  dyslexiaFont: boolean;
  language: "en" | "hi" | "ta" | "kn" | "te" | "ml" | "bn";
  screenReaderActive: boolean;
}
