import { DemandForm, TriageResult, CriteriaScore } from "../types";

export const WEIGHTS = {
  urgency: 30,
  impact: 30,
  risk: 20,
  reach: 10,
  dependencies: 10,
} as const;

export function calculatePoints(note: number, weight: number): number {
  return ((note - 1) / 4) * weight;
}

export function formatPoints(value: number): string {
  return Number.isInteger(value)
    ? String(value)
    : value.toLocaleString("pt-BR", { maximumFractionDigits: 1 });
}

export function evaluateDemand(form: DemandForm): TriageResult {
  const desc = form.description.toLowerCase();
  const criticalSignal =
    /aumento|continua aumentando|indispon|paralisa|múltipl|perda de dados|seguran|grave|parou tudo|crítico|critico|urgência|uti|óbito|reação adversa|quimioterap|anafilaxia|risco de vida|risco de morte/.test(
      desc
    ) || form.trend === "aumentando";

  // Rota 4: Demanda planejada
  if (form.kind === "Melhoria planejada") {
    return {
      route: "backlog",
      routeTitle: "Direcionar ao Backlog",
      routeDescription:
        "Demanda planejável de melhoria. Não concorre na fila de incidentes operacionais imediatos.",
      missingFields: [],
      criticalSignal,
      totalScore: 0,
      criteria: [],
      worseningMarker: "Não aplicável a itens planejados",
      worseningAction: "Priorizar nos ciclos de planejamento e roadmap.",
    };
  }

  // Validação de completude
  const missing: string[] = [];
  if (!form.title.trim()) missing.push("Título da demanda");
  if (!form.description.trim()) missing.push("Descrição com fatos conhecidos");
  if (!form.process) missing.push("Situação atual do processo");
  if (!form.workaround) missing.push("Informação sobre alternativa temporária");
  if (!form.affected || form.affected.trim() === "")
    missing.push("Quantidade confirmada de afetados");

  // Rota 2 ou Rota 3 quando incompleto
  if (missing.length > 0) {
    if (criticalSignal) {
      return {
        route: "triage",
        routeTitle: "Triagem Humana Imediata",
        routeDescription:
          "Sinais de possível criticidade detectados, porém com dados incompletos. A análise humana começa de imediato sem cálculo de score provisório.",
        missingFields: missing,
        criticalSignal: true,
        totalScore: 0,
        criteria: [],
        worseningMarker: "Indício de potencial agravamento",
        worseningAction: "Iniciar apuração imediata com a equipe técnica.",
      };
    }
    return {
      route: "return",
      routeTitle: "Devolver para Complementação",
      routeDescription:
        "Faltam dados essenciais para qualificar o impacto e alcance. O chamado retorna ao solicitante sem score.",
      missingFields: missing,
      criticalSignal: false,
      totalScore: 0,
      criteria: [],
      worseningMarker: "Dados insuficientes para avaliar tendência",
      worseningAction:
        "Solicitar esclarecimentos adicionais antes de reenviar.",
    };
  }

  // Rota 1: Demanda operacional elegível para Score
  const urgencyNote = Number(form.actionWindow) || 3;
  const affectedCount = Number(form.affected) || 0;

  const impactNote =
    form.process === "interrompido"
      ? affectedCount > 1
        ? 4
        : 3
      : form.process === "parcial"
      ? 3
      : form.process === "dificuldade"
      ? 2
      : 1;

  const riskNote = criticalSignal
    ? 4
    : form.workaround === "nao"
    ? 3
    : form.workaround === "nao-sei"
    ? 2
    : 1;

  const reachNote =
    affectedCount >= 50
      ? 5
      : affectedCount >= 10
      ? 4
      : affectedCount >= 3
      ? 3
      : affectedCount >= 2
      ? 2
      : 1;

  const dependenciesNote =
    form.process === "interrompido" ? 3 : form.process === "parcial" ? 2 : 1;

  const criteria: CriteriaScore[] = [
    {
      name: "Urgência",
      note: urgencyNote,
      weight: WEIGHTS.urgency,
      points: calculatePoints(urgencyNote, WEIGHTS.urgency),
      rationale: "Definida pelo prazo de início estipulado pela triagem.",
    },
    {
      name: "Impacto",
      note: impactNote,
      weight: WEIGHTS.impact,
      points: calculatePoints(impactNote, WEIGHTS.impact),
      rationale: `Processo operacional ${form.process.replace("-", " ")}.`,
    },
    {
      name: "Risco",
      note: riskNote,
      weight: WEIGHTS.risk,
      points: calculatePoints(riskNote, WEIGHTS.risk),
      rationale: criticalSignal
        ? "Identificados sinais potenciais de agravamento."
        : form.workaround === "nao"
        ? "Não existe alternativa temporária (contorno)."
        : form.workaround === "nao-sei"
        ? "Existência de alternativa ainda não confirmada."
        : "Existe alternativa temporária viável.",
    },
    {
      name: "Abrangência",
      note: reachNote,
      weight: WEIGHTS.reach,
      points: calculatePoints(reachNote, WEIGHTS.reach),
      rationale: `${form.affected} caso(s)/usuário(s) confirmado(s).`,
    },
    {
      name: "Dependências",
      note: dependenciesNote,
      weight: WEIGHTS.dependencies,
      points: calculatePoints(dependenciesNote, WEIGHTS.dependencies),
      rationale:
        form.process === "interrompido"
          ? "Interrupção direta que bloqueia processos subsequentes."
          : "Impacto moderado ou isolado em outras áreas.",
    },
  ];

  const totalScore = Math.round(
    criteria.reduce((sum, item) => sum + item.points, 0)
  );

  const worseningMarker =
    form.trend === "aumentando"
      ? "Ocorrências em crescimento acelerado"
      : form.trend === "oscilando"
      ? "Ocorrências oscilando / intermitentes"
      : form.trend === "estavel"
      ? "Situação informada como estável"
      : "Evolução temporal ainda não verificada";

  const worseningAction =
    form.trend === "aumentando"
      ? "Avaliar acionamento preventivo de plantão técnico."
      : form.trend === "oscilando"
      ? "Monitorar logs e novas ocorrências nas próximas horas."
      : form.trend === "estavel"
      ? "Manter acompanhamento padrão durante a resolução."
      : "Confirmar com o solicitante se o sintoma se repetiu.";

  return {
    route: "score",
    routeTitle: "Demanda Elegível (Score Provisório)",
    routeDescription:
      "Dados mínimos validados. O score provisório apoia a equipe a planejar a ordem de atendimento.",
    missingFields: [],
    criticalSignal,
    totalScore,
    criteria,
    worseningMarker,
    worseningAction,
  };
}
