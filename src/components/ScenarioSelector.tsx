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
  { form: DemandForm; badge: string; description: string }
> = {
  A: {
    badge: "Crítico P1",
    description: "Queda de energia e internet no Polo Digital",
    form: {
      title: "Queda de energia e internet no Polo Digital Norte",
      origin: "Polo Comunitário Digital",
      kind: "Incidente de Infraestrutura / TI",
      perceived: "Crítica",
      description:
        "Curto-circuito no quadro elétrico paralisou 20 computadores a poucas horas da aula de 40 jovens da comunidade. Sem contorno provisório e com risco de queima de placas.",
      process: "interrompido",
      workaround: "nao",
      affected: "40",
      trend: "desconhecida",
      actionWindow: "5",
      sla: "sim",
    },
  },
  B: {
    badge: "Faltam Dados",
    description: "Adiantamento sem cotações de fornecedores",
    form: {
      title: "Solicitação de adiantamento para insumos agrícolas",
      origin: "Cooperativa Agrícola / Produção",
      kind: "Solicitação Financeira / Remanejamento",
      perceived: "Alta",
      description:
        "Cooperativa solicita liberação de R$ 14.500 para mudas após vendaval, mas não anexou as 3 cotações de mercado nem as notas fiscais da remessa anterior exigidas pelo termo de colaboração.",
      process: "dificuldade",
      workaround: "nao-sei",
      affected: "",
      trend: "desconhecida",
      actionWindow: "3",
      sla: "nao-sei",
    },
  },
  C: {
    badge: "Planejamento P4",
    description: "Expansão de turma noturna no ateliê",
    form: {
      title: "Abertura de turma noturna no Ateliê Comunitário",
      origin: "Ateliê / Coletivo Produtivo",
      kind: "Melhoria de Escopo / Expansão",
      perceived: "Moderada",
      description:
        "Liderança do coletivo propõe criar turma noturna de corte e costura para mães que trabalham de dia. Aulas diurnas normais sem impacto. Demanda para análise no próximo ciclo semestral.",
      process: "nao-afetado",
      workaround: "sim",
      affected: "15",
      trend: "estavel",
      actionWindow: "1",
      sla: "nao",
    },
  },
  D: {
    badge: "Atenção Imediata",
    description: "Alerta de rotulagem sanitária (RDC 727)",
    form: {
      title: "Notificação de rotulagem em lote de geleias (RDC 727)",
      origin: "Fiscalização / Vigilância Sanitária",
      kind: "Risco Regulatório & Sanitário (Anvisa)",
      perceived: "Crítica",
      description:
        "Fiscalização apontou ausência de tabela nutricional obrigatória e declaração de alérgenos (RDC nº 727/2022) em 150 potes de geleia artesanal prontos para entrega escolar. Risco de perda do lote.",
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
            <span className="sample-badge">Teste Livre</span>
          </div>
          <b>Formulário em Branco</b>
          <small>Preencher dados manuais do zero</small>
        </button>
      </div>
    </div>
  );
};
