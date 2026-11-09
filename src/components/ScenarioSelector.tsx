import React from "react";
import { DemandForm } from "../types";
import {
  AlertOctagon,
  FileQuestion,
  CalendarClock,
  ShieldAlert,
  PlusCircle,
} from "lucide-react";

export interface OperationalTicketItem {
  ticketNumber: string;
  protocol: string;
  polo: string;
  badge: string;
  badgeClass: string;
  description: string;
  slaTag: string;
  form: DemandForm;
}

export const scenarioData: Record<string, OperationalTicketItem> = {
  A: {
    ticketNumber: "#2041",
    protocol: "RS-2026-02041",
    polo: "Polo Digital Norte",
    badge: "P1 · Imediato",
    badgeClass: "badge-red",
    description: "Pane elétrica e indisponibilidade de internet",
    slaTag: "40 alunos · SLA: 1h",
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
    ticketNumber: "#2042",
    protocol: "RS-2026-02042",
    polo: "Cooperativa Terra Viva",
    badge: "Pendente Doc",
    badgeClass: "badge-amber",
    description: "Adiantamento para insumos agrícolas",
    slaTag: "Sem 3 cotações · MROSC",
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
    ticketNumber: "#2043",
    protocol: "RS-2026-02043",
    polo: "Ateliê Comunitário",
    badge: "P4 · Planejamento",
    badgeClass: "badge-blue",
    description: "Expansão de turma noturna de costura",
    slaTag: "15 inscritas · Ciclo Semestral",
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
    ticketNumber: "#2044",
    protocol: "RS-2026-02044",
    polo: "Gastronomia Solidária",
    badge: "Risco Sanitário",
    badgeClass: "badge-orange",
    description: "Notificação de rotulagem (RDC 727)",
    slaTag: "150 potes · Anvisa",
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
        return <ShieldAlert className="scenario-icon text-orange" aria-hidden="true" />;
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
                <div className="ticket-id-tag">
                  {getIcon(key)}
                  <b>{data.ticketNumber}</b>
                </div>
                <span className={`sample-badge ${data.badgeClass}`}>{data.badge}</span>
              </div>
              <span className="ticket-polo-name">{data.polo}</span>
              <small className="ticket-desc">{data.description}</small>
              <span className="ticket-sla-tag">{data.slaTag}</span>
            </button>
          );
        })}

        <button
          type="button"
          className={`sample-btn free-test-btn ${!currentTitle ? "active" : ""}`}
          onClick={onStartFreeTest}
        >
          <div className="sample-btn-header">
            <div className="ticket-id-tag">
              <PlusCircle className="scenario-icon text-emerald" aria-hidden="true" />
              <b>+ Novo</b>
            </div>
            <span className="sample-badge badge-green">Entrada Manual</span>
          </div>
          <span className="ticket-polo-name">Novo Chamado</span>
          <small className="ticket-desc">Formulário em branco</small>
          <span className="ticket-sla-tag">Preenchimento</span>
        </button>
      </div>
    </div>
  );
};
