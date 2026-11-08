import { describe, it, expect } from "vitest";
import { evaluateDemand, determinePriority, PRIORITY_DEFINITIONS } from "../lib/triageEngine";
import { scenarioData } from "../components/ScenarioSelector";

describe("Motor de Triagem Operacional: RadarSocial Prioriza", () => {
  it("deve conter as 4 definições canônicas de severidade (P1 a P4)", () => {
    expect(PRIORITY_DEFINITIONS.P1.level).toBe("P1");
    expect(PRIORITY_DEFINITIONS.P2.level).toBe("P2");
    expect(PRIORITY_DEFINITIONS.P3.level).toBe("P3");
    expect(PRIORITY_DEFINITIONS.P4.level).toBe("P4");
  });

  it("Cenário A: deve enquadrar pane elétrica no Polo Digital como Fila de Atendimento Imediato (P1)", () => {
    const result = evaluateDemand(scenarioData.A.form);
    expect(result.route).toBe("queue");
    expect(result.priority.level).toBe("P1");
    expect(result.missingFields).toHaveLength(0);
    expect(result.priority.slaLabel).toContain("até 1 hora");
    expect(result.routeTitle).toContain("Fila de Atendimento Imediato");
  });

  it("Cenário B: deve direcionar pedido sem cotações para Retorno com Orientações", () => {
    const result = evaluateDemand(scenarioData.B.form);
    expect(result.route).toBe("return");
    expect(result.missingFields).toContain("Pessoas ou itens afetados");
    expect(result.routeTitle).toContain("Retorno com Orientações");
  });

  it("Cenário C: deve encaminhar expansão noturna de ateliê para Backlog de Planejamento", () => {
    const result = evaluateDemand(scenarioData.C.form);
    expect(result.route).toBe("backlog");
    expect(result.priority.level).toBe("P4");
    expect(result.missingFields).toHaveLength(0);
    expect(result.routeTitle).toContain("Backlog de Planejamento");
  });

  it("Cenário D: deve acionar Atenção Imediata para notificação de rotulagem sanitária Anvisa", () => {
    const result = evaluateDemand(scenarioData.D.form);
    expect(result.route).toBe("triage");
    expect(result.criticalSignal).toBe(true);
    expect(result.priority.level).toBe("P1");
    expect(result.routeTitle).toBe("Atenção Imediata");
  });

  it("deve gerar sempre 5 fatores operacionais estruturados de análise", () => {
    const result = evaluateDemand(scenarioData.A.form);
    expect(result.factors).toHaveLength(5);
    const factorNames = result.factors.map((f) => f.name);
    expect(factorNames).toContain("Impacto no Processo");
    expect(factorNames).toContain("Alternativa Temporária (Contorno)");
    expect(factorNames).toContain("Abrangência Confirmada");
    expect(factorNames).toContain("Evolução da Ocorrência");
    expect(factorNames).toContain("Compromisso de Prazo (SLA)");
  });
});
