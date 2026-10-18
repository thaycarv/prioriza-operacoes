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

export type RouteType = "queue" | "return" | "triage" | "backlog";

export type PriorityLevel = "P1" | "P2" | "P3" | "P4";

export type SeverityInfo = {
  level: PriorityLevel;
  name: string;
  slaLabel: string;
  color: string;
  badgeClass: string;
  rationale: string;
};

export type OperationalFactor = {
  name: string;
  status: string;
  impactLevel: "critico" | "alto" | "moderado" | "baixo";
  detail: string;
};

export type TriageResult = {
  route: RouteType;
  routeTitle: string;
  routeDescription: string;
  missingFields: string[];
  criticalSignal: boolean;
  priority: SeverityInfo;
  factors: OperationalFactor[];
  worseningMarker: string;
  worseningAction: string;
};

export type AiAnalysis = {
  facts: string[];
  hypotheses: string[];
  missingElements: string[];
  suggestedQuestions: string[];
  summary: string;
  riskAssessment: string;
};

