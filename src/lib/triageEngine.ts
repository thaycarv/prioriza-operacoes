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
    slaLabel: "Atendimento Imediato (até 1 hora)",
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
    name: "Médio / Regular",
    slaLabel: "Atendimento no mesmo dia / até 24h",
    color: "#2563eb",
    badgeClass: "badge-p3",
  },
  P4: {
    level: "P4",
    name: "Baixo / Planejamento",
    slaLabel: "Fluxo padrão / Ciclos de roadmap",
    color: "#16a34a",
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
    /óbito|anafilaxia|quimioterap|uti|risco de vida|risco de morte|parada total/.test(
      form.description.toLowerCase()
    )
  ) {
    const base = PRIORITY_DEFINITIONS.P1;
    let rationale =
      "Demanda com risco iminente ou interrupção de serviço essencial sem plano de contorno.";
    if (criticalSignal) {
      rationale =
        "Identificados termos de emergência ou risco crítico direto à operação/usuários.";
    } else if (isInterrupted && hasNoWorkaround) {
      rationale =
        "Processo operacional 100% interrompido sem procedimento de contorno disponível.";
    } else if (isImmediate) {
      rationale =
        "Triagem técnica indicou necessidade de início imediato da intervenção.";
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
      "Impacto operacional severo em múltiplos usuários ou processo comprometido sem contorno.";
    if (affectedCount >= 10) {
      rationale = `Volume expressivo de afetados (${affectedCount} confirmados) ou tendência crescente.`;
    } else if (isPartial && hasNoWorkaround) {
      rationale =
        "Operação parcialmente comprometida sem contorno provisório identificado.";
    } else if (isInterrupted) {
      rationale =
        "Processo interrompido, mitigado temporariamente por contorno.";
    }
    return { ...base, rationale };
  }

  // P4: Baixo / Planejado
  if (
    form.kind === "Melhoria planejada" ||
    form.process === "nao-afetado" ||
    form.actionWindow === "1"
  ) {
    const base = PRIORITY_DEFINITIONS.P4;
    return {
      ...base,
      rationale:
        "Demanda de evolução ou baixa criticidade operacional, sem impacto em atendimentos vigentes.",
    };
  }

  // P3: Médio / Regular
  const base = PRIORITY_DEFINITIONS.P3;
  return {
    ...base,
    rationale:
      "Dificuldade ou lentidão operacional com contorno viável ou escopo pontual.",
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
    workaroundDetail = "A equipe não tem como prosseguir sem a correção.";
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
    reachStatus = "Ampla escala (>= 50 afetados)";
    reachLevel = "critico";
    reachDetail = "Impacto generalizado em usuários ou clientes.";
  } else if (affectedCount >= 10) {
    reachStatus = "Escala departamental (10 a 49 afetados)";
    reachLevel = "alto";
    reachDetail = "Múltiplas pessoas ou setores impactados.";
  } else if (affectedCount >= 1) {
    reachStatus = "Ocorrência pontual (< 10 afetados)";
    reachLevel = "moderado";
    reachDetail = "Incidente restrito a usuários identificados.";
  }

  // 4. Tendência
  let trendStatus = "Estável";
  let trendLevel: OperationalFactor["impactLevel"] = "baixo";
  let trendDetail = "Sem variação significativa no volume de relatos.";
  if (form.trend === "aumentando") {
    trendStatus = "Em aceleração / Aumentando";
    trendLevel = "alto";
    trendDetail = "Novos relatos surgindo rapidamente.";
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
    slaDetail = "Existe meta formal de tempo vinculada a contrato ou catálogo.";
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
    /aumento|continua aumentando|indispon|paralisa|múltipl|perda de dados|seguran|grave|parou tudo|crítico|critico|urgência|uti|óbito|reação adversa|quimioterap|anafilaxia|risco de vida|risco de morte/.test(
      desc
    ) || form.trend === "aumentando";

  const priority = determinePriority(form, criticalSignal);
  const factors = buildOperationalFactors(form, criticalSignal);

  // Rota 4: Demanda planejada
  if (form.kind === "Melhoria planejada") {
    return {
      route: "backlog",
      routeTitle: "Direcionar ao Backlog de Planejamento",
      routeDescription:
        "Demanda planejável de melhoria. Não concorre na fila de incidentes operacionais imediatos.",
      missingFields: [],
      criticalSignal,
      priority: {
        ...PRIORITY_DEFINITIONS.P4,
        rationale:
          "Item de melhoria registrado para ciclos futuros de planejamento.",
      },
      factors,
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
        routeTitle: "Triagem Imediata de Risco",
        routeDescription:
          "Sinais de possível criticidade detectados com dados incompletos. A análise humana começa de imediato enquanto se solicita complementação.",
        missingFields: missing,
        criticalSignal: true,
        priority: {
          ...PRIORITY_DEFINITIONS.P1,
          rationale:
            "Sinais de gravidade operacional exigem averiguação prioritária imediata.",
        },
        factors,
        worseningMarker: "Indício de potencial agravamento",
        worseningAction: "Iniciar apuração imediata com a equipe responsável.",
      };
    }
    return {
      route: "return",
      routeTitle: "Devolver para Complementação",
      routeDescription:
        "Faltam dados essenciais para qualificar o impacto e alcance. O chamado retorna ao solicitante com perguntas orientadas.",
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
        "Solicitar esclarecimentos adicionais antes de reenviar à fila.",
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
      ? "Avaliar acionamento preventivo de plantão técnico."
      : form.trend === "oscilando"
      ? "Monitorar logs e novas ocorrências nas próximas horas."
      : form.trend === "estavel"
      ? "Manter acompanhamento padrão durante a resolução."
      : "Confirmar com o solicitante se o sintoma se repetiu.";

  const isP1 = priority.level === "P1";
  const routeTitle = isP1
    ? "Fila de Ação Imediata (Severidade P1)"
    : `Fila Operacional Qualificada (Severidade ${priority.level})`;

  const routeDescription = isP1
    ? "Dados mínimos validados. Classificado como Incidente Crítico com início imediato do atendimento técnico."
    : `Dados mínimos validados. A demanda está organizada na fila regular conforme a matriz de criticidade (${priority.slaLabel}).`;

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
