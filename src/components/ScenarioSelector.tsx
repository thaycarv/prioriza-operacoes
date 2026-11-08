import React from "react";
import { DemandForm } from "../types";
import {
  AlertOctagon,
  FileQuestion,
  CalendarClock,
  ShieldAlert,
  Sparkles,
} from "lucide-react";

export const scenarioData: Record<
  string,
  { form: DemandForm; badge: string; description: string; icon: string }
> = {
  A: {
    badge: "Crítico P1 (Ação Imediata)",
    description: "Pane elétrica e queda de link no Polo Digital (Inclusão Digital)",
    icon: "AlertOctagon",
    form: {
      title: "Interrupção de energia e link de rede no Polo Digital Norte",
      origin: "Polo Comunitário Digital",
      kind: "Incidente de Infraestrutura / TI",
      perceived: "Crítica",
      description:
        "Curto-circuito no quadro de distribuição secundário interrompeu a energia de 20 computadores e travou o link de internet a poucas horas da oficina certificadora de 40 jovens da comunidade. Sem contorno provisório e com risco de queima de placas.",
      process: "interrompido",
      workaround: "nao",
      affected: "40",
      trend: "desconhecida",
      actionWindow: "5",
      sla: "sim",
    },
  },
  B: {
    badge: "Dados Incompletos",
    description: "Pedido de adiantamento sem 3 cotações MROSC (Agricultura Familiar)",
    icon: "FileQuestion",
    form: {
      title: "Solicitação de adiantamento emergencial para insumos agrícolas",
      origin: "Cooperativa Agrícola / Produção",
      kind: "Solicitação Financeira / Remanejamento",
      perceived: "Alta",
      description:
        "Cooperativa solicita liberação emergencial de R$ 14.500 para compra de mudas e adubo orgânico após vendaval. O pedido não contém as 3 cotações de fornecedores locais nem a prestação de contas das notas fiscais do repasse anterior exigidas pelo MROSC.",
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
    description: "Abertura de turma noturna no Ateliê (Empreendedorismo Feminino)",
    icon: "CalendarClock",
    form: {
      title: "Expansão da grade horária do Ateliê Comunitário para turno noturno",
      origin: "Ateliê / Coletivo Produtivo",
      kind: "Melhoria de Escopo / Expansão",
      perceived: "Moderada",
      description:
        "Liderança do coletivo propõe abertura de turma noturna de corte e costura para mães que trabalham durante o dia. As oficinas regulares diurnas continuam funcionando normalmente sem impacto. Demanda direcionada para análise no próximo ciclo semestral.",
      process: "nao-afetado",
      workaround: "sim",
      affected: "15",
      trend: "estavel",
      actionWindow: "1",
      sla: "nao",
    },
  },
  D: {
    badge: "Sinal de Risco Sanitário",
    description: "Inconformidade de rotulagem de geleias - RDC 727 (Alimentação Saudável)",
    icon: "ShieldAlert",
    form: {
      title: "Inconformidade sanitária e suspensão cautelar de lote de geleias (RDC 727)",
      origin: "Fiscalização / Vigilância Sanitária",
      kind: "Risco Regulatório & Sanitário (Anvisa)",
      perceived: "Crítica",
      description:
        "Notificação prévia da vigilância sanitária apontou ausência de tabela nutricional obrigatória e declaração de alérgenos conforme a RDC nº 727/2022 da Anvisa em 150 potes de geleia artesanal prontos para distribuição escolar. Risco iminente de descarte do lote.",
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
  const getIcon = (key: string) => {
    switch (key) {
      case "A":
        return <AlertOctagon className="scenario-icon text-red" aria-hidden="true" />;
      case "B":
        return <FileQuestion className="scenario-icon text-amber" aria-hidden="true" />;
      case "C":
        return <CalendarClock className="scenario-icon text-blue" aria-hidden="true" />;
      case "D":
        return <ShieldAlert className="scenario-icon text-amber" aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <div className="samples-container">
      <div className="samples">
        {Object.entries(scenarioData).map(([key, data]) => {
          const isActive = currentTitle === data.form.title;
          return (
            <button
              key={key}
              type="button"
              className={`sample-btn ${isActive ? "active" : ""}`}
              onClick={() => onSelectScenario(key)}
            >
              <div className="sample-btn-header">
                {getIcon(key)}
                <span className="sample-badge">{data.badge}</span>
              </div>
              <b>Cenário {key}</b>
              <small>{data.description}</small>
            </button>
          );
        })}

        <button
          type="button"
          className="sample-btn free-test-btn"
          onClick={onStartFreeTest}
        >
          <div className="sample-btn-header">
            <Sparkles className="scenario-icon text-emerald" aria-hidden="true" />
            <span className="sample-badge">Simulação Livre</span>
          </div>
          <b>Formulário em Branco</b>
          <small>Preencher dados manuais para testar regras operacionais</small>
        </button>
      </div>
    </div>
  );
};
