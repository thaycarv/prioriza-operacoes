import React from "react";
import { DemandForm } from "../types";

export const scenarioData: Record<
  string,
  { form: DemandForm; badge: string; description: string }
> = {
  A: {
    badge: "Urgência Máxima",
    description: "Bloqueio na dispensação de quimioterápico (Score 53 com início imediato)",
    form: {
      title: "Bloqueio na dispensação de quimioterápico",
      origin: "Farmácia Hospitalar",
      kind: "Incidente Crítico",
      perceived: "Alta",
      description:
        "Farmácia hospitalar relata travamento no sistema de dispensação de quimioterápicos para a ala oncológica. Pacientes aguardam infusão agendada para esta manhã.",
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
    description: "Autorização de cirurgia eletiva (Retorno por falta de laudo)",
    form: {
      title: "Autorização de cirurgia eletiva de alta complexidade",
      origin: "Consultório Credenciado",
      kind: "Regulação / Guia",
      perceived: "Alta",
      description:
        "Médico solicita autorização para artroplastia total de quadril com prótese importada. O pedido não contém o laudo de imagem anexado nem a justificativa de indicação clínica exigida pelo protocolo ANS.",
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
    description: "Revisão de protocolo ambulatorial (Direcionamento ao backlog)",
    form: {
      title: "Revisão do protocolo de teleconsulta para psicologia",
      origin: "Coordenação Clínica",
      kind: "Melhoria planejada",
      perceived: "Moderada",
      description:
        "Coordenação médica solicita reavaliação dos fluxos do formulário de triagem de telemedicina para o próximo ciclo semestral. Sem impacto em atendimentos vigentes.",
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
    description: "Suspeita de reação adversa em lote (Triagem humana imediata)",
    form: {
      title: "Suspeita de lote com reação adversa (Farmacovigilância)",
      origin: "Vigilância / Enfermagem",
      kind: "Possível incidente sanitário",
      perceived: "Crítica",
      description:
        "Unidade de internação relata 2 casos de hipotensão súbita após infusão de lote de antibiótico. Ainda sem confirmação laboratorial da causa, mas volume de alertas de enfermagem continua aumentando.",
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
