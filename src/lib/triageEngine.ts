import {
  DemandForm,
  TriageResult,
  PriorityLevel,
  SeverityInfo,
  OperationalFactor,
} from "../types";

export const PRIORITY_DEFINITIONS: Record<
  PriorityLevel,
  Omit<SeverityInfo, "rationale">
> = {
  P1: {
    level: "P1",
    name: "Crítico (Ação Imediata)",
    slaLabel: "Atendimento em até 1 hora",
    color: "#dc2626",
    badgeClass: "badge-p1",
  },
  P2: {
    level: "P2",
    name: "Alto Impacto",
    slaLabel: "Atendimento em até 4 horas",
    color: "#d97706",
    badgeClass: "badge-p2",
  },
  P3: {
    level: "P3",
    name: "Prioridade Regular",
    slaLabel: "Atendimento no mesmo dia / até 24h",
    color: "#047857",
    badgeClass: "badge-p3",
  },
  P4: {
    level: "P4",
    name: "Planejamento",
    slaLabel: "Próximo ciclo semestral",
    color: "#475569",
    badgeClass: "badge-p4",
  },
};

export function determinePriority(
  form: DemandForm,
  criticalSignal: boolean
): SeverityInfo {
  const affectedCount = Number(form.affected) || 0;
  const isInterrupted = form.process === "interrompido";
  const isPartial = form.process === "parcial";
  const hasNoWorkaround = form.workaround === "nao";
  const isImmediate = form.actionWindow === "5";
  const is1Hour = form.actionWindow === "4";

  // P1: Crítico
  if (
    isImmediate ||
    criticalSignal ||
    (isInterrupted && hasNoWorkaround) ||
    /curto-circuito|incêndio|alagamento|queda de link|parada total|anvisa|sanitári|intoxicaç|contaminaç|segurança física|interrupção total|perda de lote|pane elétrica/i.test(
      form.description.toLowerCase()
    )
  ) {
    const base = PRIORITY_DEFINITIONS.P1;
    let rationale =
      "Demanda com risco iminente ou interrupção de serviço essencial sem plano de contorno.";
    if (criticalSignal) {
      rationale =
        "Risco sanitário, pane elétrica ou paralisação direta da atividade comunitária.";
    } else if (isInterrupted && hasNoWorkaround) {
      rationale =
        "Atividade no polo 100% paralisada sem procedimento de contorno disponível.";
    } else if (isImmediate) {
      rationale =
        "Triagem indicou necessidade de intervenção imediata da equipe (SLA até 1h).";
    }
    return { ...base, rationale };
  }

  // P2: Alto Impacto
  if (
    is1Hour ||
    isInterrupted ||
    (isPartial && hasNoWorkaround) ||
    affectedCount >= 10 ||
    form.trend === "aumentando"
  ) {
    const base = PRIORITY_DEFINITIONS.P2;
    let rationale =
      "Impacto operacional severo em múltiplos beneficiários ou processo comprometido sem contorno.";
    if (affectedCount >= 10) {
      rationale = `Volume expressivo de pessoas ou equipamentos afetados (${affectedCount} confirmados).`;
    } else if (isPartial && hasNoWorkaround) {
      rationale =
        "Operação parcialmente comprometida sem contorno provisório identificado.";
    } else if (isInterrupted) {
      rationale =
        "Processo interrompido, mitigado temporariamente por procedimento de contorno.";
    }
    return { ...base, rationale };
  }

  // P4: Baixo / Planejado
  if (
    form.kind === "Melhoria planejada" ||
    form.kind === "Melhoria de Escopo / Expansão" ||
    form.process === "nao-afetado" ||
    form.actionWindow === "1"
  ) {
    const base = PRIORITY_DEFINITIONS.P4;
    return {
      ...base,
      rationale:
        "Demanda de melhoria ou expansão programada, sem impacto nas atividades vigentes.",
    };
  }

  // P3: Médio / Regular
  const base = PRIORITY_DEFINITIONS.P3;
  return {
    ...base,
    rationale:
      "Dificuldade operacional com contorno viável ou solicitação rotineira de polo comunitário.",
  };
}

export function buildOperationalFactors(
  form: DemandForm,
  criticalSignal: boolean
): OperationalFactor[] {
  const affectedCount = Number(form.affected) || 0;

  // 1. Processo
  let processStatus = "Operação normal";
  let processLevel: OperationalFactor["impactLevel"] = "baixo";
  let processDetail = "Sem impacto nas rotinas atuais.";
  if (form.process === "interrompido") {
    processStatus = "Interrompido (Parada Total)";
    processLevel = "critico";
    processDetail = "Atividades operacionais completamente paralisadas.";
  } else if (form.process === "parcial") {
    processStatus = "Parcialmente Comprometido";
    processLevel = "alto";
    processDetail = "Etapas essenciais do fluxo de trabalho bloqueadas.";
  } else if (form.process === "dificuldade") {
    processStatus = "Operando com Dificuldade";
    processLevel = "moderado";
    processDetail = "Lentidão observada ou esforço manual de contorno.";
  }

  // 2. Contorno
  let workaroundStatus = "Contorno viável disponível";
  let workaroundLevel: OperationalFactor["impactLevel"] = "baixo";
  let workaroundDetail = "Existe procedimento alternativo em uso.";
  if (form.workaround === "nao") {
    workaroundStatus = "Sem alternativa temporária";
    workaroundLevel = "critico";
    workaroundDetail = "A equipe não tem como prosseguir sem a correção técnica.";
  } else if (form.workaround === "nao-sei") {
    workaroundStatus = "Alternativa a verificar";
    workaroundLevel = "moderado";
    workaroundDetail = "Existência de contorno ainda não confirmada.";
  }

  // 3. Abrangência
  let reachStatus = `${affectedCount} caso(s) confirmado(s)`;
  let reachLevel: OperationalFactor["impactLevel"] = "baixo";
  let reachDetail = "Ocorrência localizada ou pontual.";
  if (affectedCount >= 50) {
    reachStatus = "Ampla escala (>= 50 beneficiários)";
    reachLevel = "critico";
    reachDetail = "Impacto generalizado em múltiplos polos ou turmas.";
  } else if (affectedCount >= 10) {
    reachStatus = "Escala departamental (10 a 49 afetados)";
    reachLevel = "alto";
    reachDetail = "Múltiplas pessoas ou polo comunitário impactado.";
  } else if (affectedCount >= 1) {
    reachStatus = "Ocorrência pontual (< 10 afetados)";
    reachLevel = "moderado";
    reachDetail = "Incidente restrito a posto de trabalho ou lote específico.";
  }

  // 4. Tendência
  let trendStatus = "Estável";
  let trendLevel: OperationalFactor["impactLevel"] = "baixo";
  let trendDetail = "Sem variação significativa no volume de relatos.";
  if (form.trend === "aumentando") {
    trendStatus = "Em aceleração / Aumentando";
    trendLevel = "alto";
    trendDetail = "Novos relatos ou risco de contaminação/agravo em expansão.";
  } else if (form.trend === "oscilando") {
    trendStatus = "Oscilando / Intermitente";
    trendLevel = "moderado";
    trendDetail = "Comportamento inconstante ao longo do período.";
  }

  // 5. Prazo Formal / SLA
  let slaStatus = "Sem SLA formal acordado";
  let slaLevel: OperationalFactor["impactLevel"] = "baixo";
  let slaDetail = "Atendimento segue a fila regular por criticidade.";
  if (form.sla === "sim") {
    slaStatus = "SLA Contratual / Normativo Vigente";
    slaLevel = "alto";
    slaDetail = "Meta formal de atendimento vinculada a edital ou termo de parceria.";
  }

  return [
    {
      name: "Impacto no Processo",
      status: processStatus,
      impactLevel: processLevel,
      detail: processDetail,
    },
    {
      name: "Alternativa Temporária (Contorno)",
      status: workaroundStatus,
      impactLevel: workaroundLevel,
      detail: workaroundDetail,
    },
    {
      name: "Abrangência Confirmada",
      status: reachStatus,
      impactLevel: reachLevel,
      detail: reachDetail,
    },
    {
      name: "Evolução da Ocorrência",
      status: trendStatus,
      impactLevel: trendLevel,
      detail: trendDetail,
    },
    {
      name: "Compromisso de Prazo (SLA)",
      status: slaStatus,
      impactLevel: slaLevel,
      detail: slaDetail,
    },
  ];
}

export function evaluateDemand(form: DemandForm): TriageResult {
  const desc = form.description.toLowerCase();
  const criticalSignal =
    /aumento|continua aumentando|indispon|paralisa|múltipl|perda de dados|seguran|grave|parou tudo|crítico|critico|urgência|curto-circuito|pane elétrica|anvisa|sanitári|alérgeno|queima/i.test(
      desc
    ) || form.trend === "aumentando";

  const priority = determinePriority(form, criticalSignal);
  const factors = buildOperationalFactors(form, criticalSignal);

  // Rota 4: Demanda planejada / Backlog
  if (
    form.kind === "Melhoria planejada" ||
    form.kind === "Melhoria de Escopo / Expansão"
  ) {
    return {
      route: "backlog",
      routeTitle: "Backlog de Planejamento",
      routeDescription:
        "Demanda de melhoria ou expansão. Registrada para o próximo ciclo de planejamento semestral.",
      missingFields: [],
      criticalSignal: false,
      priority: {
        ...PRIORITY_DEFINITIONS.P4,
        rationale:
          "Item registrado para o próximo ciclo de planejamento e orçamento.",
      },
      factors,
      worseningMarker: "Não aplicável a itens planejados",
      worseningAction: "Priorizar nos ciclos de planejamento e orçamento.",
    };
  }

  // Validação de completude
  const missing: string[] = [];
  if (!form.title.trim()) missing.push("Título da solicitação");
  if (!form.description.trim()) missing.push("Descrição do ocorrido");
  if (!form.process) missing.push("Situação atual da operação");
  if (!form.workaround) missing.push("Alternativa temporária (contorno)");
  if (!form.affected || form.affected.trim() === "")
    missing.push("Pessoas ou itens afetados");

  // Rota 2 ou Rota 3 quando incompleto
  if (missing.length > 0) {
    if (criticalSignal) {
      return {
        route: "triage",
        routeTitle: "Atenção Imediata",
        routeDescription:
          "Sinais de risco identificados com dados incompletos. A equipe deve verificar o caso imediatamente.",
        missingFields: missing,
        criticalSignal: true,
        priority: {
          ...PRIORITY_DEFINITIONS.P1,
          rationale:
            "Sinais de gravidade operacional ou risco sanitário exigem averiguação prioritária imediata.",
        },
        factors,
        worseningMarker: "Indício de potencial agravamento",
        worseningAction: "Iniciar apuração imediata com a equipe de campo ou fiscalização.",
      };
    }
    return {
      route: "return",
      routeTitle: "Retorno com Orientações",
      routeDescription:
        "Faltam dados essenciais (ex: cotações ou notas fiscais). O pedido retorna ao solicitante para complementação.",
      missingFields: missing,
      criticalSignal: false,
      priority: {
        ...PRIORITY_DEFINITIONS.P3,
        rationale:
          "Demanda aguardando complementação documental antes da priorização final.",
      },
      factors,
      worseningMarker: "Dados insuficientes para avaliar tendência",
      worseningAction:
        "Solicitar documentos comprobatórios ou esclarecimentos antes de reenviar à fila.",
    };
  }

  // Rota 1: Demanda qualificada na Fila Operacional
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
      ? "Avaliar acionamento preventivo de suporte técnico."
      : form.trend === "oscilando"
      ? "Monitorar estabilidade da operação nas próximas 4 horas."
      : form.trend === "estavel"
      ? "Manter acompanhamento padrão durante a resolução."
      : "Confirmar com o polo se o problema se repetiu.";

  const isP1 = priority.level === "P1";
  const routeTitle = isP1
    ? "Fila de Atendimento Imediato (P1)"
    : `Fila Regular de Atendimento (${priority.level})`;

  const routeDescription = isP1
    ? "Demanda crítica validada. Início imediato do atendimento técnico (SLA até 1h)."
    : `Demanda validada. Organizada na fila regular de atendimento (${priority.slaLabel}).`;

  return {
    route: "queue",
    routeTitle,
    routeDescription,
    missingFields: [],
    criticalSignal,
    priority,
    factors,
    worseningMarker,
    worseningAction,
  };
}
