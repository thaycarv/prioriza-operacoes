import React from "react";
import { DemandForm } from "../types";

export const scenarioData: Record<
  string,
  { form: DemandForm; badge: string; description: string }
> = {
  A: {
    badge: "Urgência Máxima",
    description: "Cliente não finaliza compra (Score 53 com início imediato)",
    form: {
      title: "Cliente não finaliza compra",
      origin: "Cliente",
      kind: "Incidente",
      perceived: "Alta",
      description:
        "Cliente informa que não consegue finalizar uma compra no checkout. Pode estar afetando outros clientes na mesma etapa.",
      process: "interrompido",
      workaround: "nao-sei",
      affected: "1",
      trend: "desconhecida",
      actionWindow: "5",
      sla: "sim",
    },
  },
  B: {
    badge: "Dados Incompletos",
    description: "Atualização de relatório (Retorno para complementação)",
    form: {
      title: "Atualização de relatório gerencial",
      origin: "Área interna",
      kind: "Solicitação operacional",
      perceived: "Alta",
      description:
        "Operações solicita atualização de um relatório usado na reunião de diretoria amanhã. Prazo informado hoje às 18h.",
      process: "dificuldade",
      workaround: "nao-sei",
      affected: "",
      trend: "desconhecida",
      actionWindow: "3",
      sla: "nao-sei",
    },
  },
  C: {
    badge: "Melhoria Planejada",
    description: "Nova funcionalidade (Encaminhamento ao backlog)",
    form: {
      title: "Análise para nova funcionalidade",
      origin: "Área interna",
      kind: "Melhoria planejada",
      perceived: "Moderada",
      description:
        "Produto solicita análise de dados para avaliar nova funcionalidade. Sem prazo imediato. Pode influenciar o próximo trimestre.",
      process: "nao-afetado",
      workaround: "sim",
      affected: "1",
      trend: "estavel",
      actionWindow: "1",
      sla: "nao",
    },
  },
  D: {
    badge: "Sinal de Risco",
    description: "Aumento de lentidão sem confirmação (Triagem imediata)",
    form: {
      title: "Aumento de lentidão no sistema",
      origin: "Sistema/monitoramento",
      kind: "Possível incidente",
      perceived: "Crítica",
      description:
        "Suporte identifica aumento de chamados sobre lentidão. Ainda não existe confirmação técnica de incidente, mas o volume continua aumentando.",
      process: "dificuldade",
      workaround: "nao-sei",
      affected: "",
      trend: "aumentando",
      actionWindow: "5",
      sla: "nao-sei",
    },
  },
};

interface ScenarioSelectorProps {
  currentTitle: string;
  onSelectScenario: (scenarioKey: string) => void;
  onStartFreeTest: () => void;
}

export const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({
  currentTitle,
  onSelectScenario,
  onStartFreeTest,
}) => {
  return (
    <div className="samples-container">
      <div className="samples">
        {Object.entries(scenarioData).map(([key, data]) => {
          const isActive = currentTitle === data.form.title;
          return (
            <button
              key={key}
              onClick={() => onSelectScenario(key)}
              className={`scenario-btn ${isActive ? "active" : ""}`}
              title={data.description}
            >
              <span className="scenario-tag">Cenário {key}</span>
              <span className="scenario-label">{data.badge}</span>
            </button>
          );
        })}
        <button className="free-test" onClick={onStartFreeTest}>
          + Novo Teste Livre
        </button>
      </div>
    </div>
  );
};
