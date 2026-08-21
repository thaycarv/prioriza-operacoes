export type DemandForm = {
  title: string;
  origin: string;
  kind: string;
  perceived: string;
  description: string;
  process: string;
  workaround: string;
  affected: string;
  trend: string;
  actionWindow: string;
  sla: string;
};

export type RouteType = "score" | "return" | "triage" | "backlog";

export type CriteriaScore = {
  name: string;
  note: number;
  weight: number;
  points: number;
  rationale: string;
};

export type TriageResult = {
  route: RouteType;
  routeTitle: string;
  routeDescription: string;
  missingFields: string[];
  criticalSignal: boolean;
  totalScore: number;
  criteria: CriteriaScore[];
  worseningMarker: string;
  worseningAction: string;
};

export type AiAnalysis = {
  facts: string[];
  hypotheses: string[];
  missingElements: string[];
  suggestedQuestions: string[];
  summary: string;
  suggestedActionWindow?: number;
  riskAssessment: string;
};
