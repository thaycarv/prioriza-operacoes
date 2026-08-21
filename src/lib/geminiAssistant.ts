import { DemandForm, AiAnalysis, TriageResult } from "../types";

/**
 * Análise de apoio à triagem operacional
 * Extrai o que é fato, aponta o que falta e gera perguntas de esclarecimento.
 */
export function analyzeDemand(
  form: DemandForm,
  triage: TriageResult
): AiAnalysis {
  const desc = form.description || "";
  const facts: string[] = [];
  const hypotheses: string[] = [];
  const missingElements: string[] = [];
  const suggestedQuestions: string[] = [];

  // Fatos principais
  if (form.title) {
    facts.push(`Demanda: "${form.title}"`);
  }
  if (form.affected && form.affected !== "0") {
    facts.push(`${form.affected} usuário(s)/cliente(s) confirmados.`);
  }
  if (form.process) {
    facts.push(`Operação está ${form.process.replace("-", " ")}.`);
  }
  if (form.sla === "sim") {
    facts.push(`Existe prazo ou SLA acordado.`);
  }

  // Hipóteses do texto (quando a pessoa usa termos de incerteza)
  const sentences = desc.split(/[.!?\n]+/).map((s) => s.trim()).filter(Boolean);
  for (const sentence of sentences) {
    const lower = sentence.toLowerCase();
    if (
      lower.includes("pode") ||
      lower.includes("acho") ||
      lower.includes("talvez") ||
      lower.includes("parece") ||
      lower.includes("suspeita") ||
      lower.includes("possível")
    ) {
      hypotheses.push(sentence);
    } else if (sentence.length > 5 && !facts.some((f) => f.includes(sentence))) {
      facts.push(sentence);
    }
  }

  if (hypotheses.length === 0 && desc.length > 0) {
    hypotheses.push("Nenhuma suposição encontrada; o relato foi direto.");
  }

  // O que está faltando e perguntas diretas
  if (!form.affected || form.affected.trim() === "") {
    missingElements.push("Quantidade de pessoas ou contas impactadas.");
    suggestedQuestions.push(
      "Quantas pessoas ou clientes foram afetados diretamente até agora?"
    );
  }

  if (!form.process) {
    missingElements.push("Se a operação está totalmente parada ou apenas lenta.");
    suggestedQuestions.push(
      "A equipe consegue continuar trabalhando com lentidão ou o processo está 100% parado?"
    );
  }

  if (!form.workaround || form.workaround === "nao-sei") {
    missingElements.push("Existência de alguma forma alternativa de trabalhar (contorno).");
    suggestedQuestions.push(
      "Existe algum procedimento alternativo provisório enquanto resolvemos?"
    );
  }

  if (form.trend === "desconhecida" && triage.route !== "backlog") {
    suggestedQuestions.push(
      "Isso aconteceu uma vez só ou tem se repetido ao longo do dia?"
    );
  }

  if (missingElements.length === 0) {
    missingElements.push("Todos os dados básicos necessários foram preenchidos.");
  }

  // Resumo prático e direto
  let summary = "";
  let riskAssessment = "";

  if (triage.route === "score") {
    summary = `Pedido bem detalhado (Score ${triage.totalScore}/100). Você só precisa confirmar o prazo para iniciar o atendimento.`;
    riskAssessment = triage.criticalSignal
      ? "Atenção: há menção de piora ou risco de travar outras áreas."
      : "Controlado: impacto delimitado e claro.";
  } else if (triage.route === "triage") {
    summary = `Atenção: há sinais de problema grave no relato, mas faltam detalhes. Em vez de esperar, fale direto com quem abriu o chamado.`;
    riskAssessment = "Alto risco: pode ser um incidente grave em andamento.";
  } else if (triage.route === "return") {
    summary = `Faltam informações fundamentais para entender a urgência. Copie as perguntas abaixo e peça para o solicitante responder antes de colocar na fila.`;
    riskAssessment = "Não avaliado (dados insuficientes).";
  } else {
    summary = `Trata-se de uma melhoria planejada. Deve ir para a fila de planejamento futuro, sem furar a fila do suporte diário.`;
    riskAssessment = "Baixo (demanda planejada).";
  }

  return {
    facts,
    hypotheses,
    missingElements,
    suggestedQuestions,
    summary,
    riskAssessment,
  };
}
