import React from "react";
import { DemandForm, TriageResult, AiAnalysis } from "../types";
import { AiAssistantCard } from "./AiAssistantCard";
import {
  ListChecks,
  RotateCcw,
  AlertTriangle,
  CalendarClock,
  Clock,
  CheckCircle2,
  FileText,
  AlertOctagon,
} from "lucide-react";

interface TriageResultPanelProps {
  form: DemandForm;
  result: TriageResult;
  analyzed: boolean;
  reviewed: boolean;
  aiAnalysis: AiAnalysis | null;
  onChangeUrgency: (urgencyValue: string) => void;
  onToggleReviewed: () => void;
  onOpenExport: () => void;
}

export const TriageResultPanel: React.FC<TriageResultPanelProps> = ({
  form,
  result,
  analyzed,
  reviewed,
  aiAnalysis,
  onChangeUrgency,
  onToggleReviewed,
  onOpenExport,
}) => {
  const getRouteIcon = (route: string) => {
    switch (route) {
      case "queue":
        return <ListChecks className="route-icon" aria-hidden="true" />;
      case "return":
        return <RotateCcw className="route-icon" aria-hidden="true" />;
      case "triage":
        return <AlertTriangle className="route-icon" aria-hidden="true" />;
      case "backlog":
        return <CalendarClock className="route-icon" aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <div className="panel result-panel">
      <div className="panel-title">
        <span className="step-badge">2</span>
        <div>
          <b>Resultado da Triagem</b>
          <small>Classificação de prioridade e direcionamento</small>
        </div>
      </div>

      {!analyzed ? (
        <div className="empty">
          <div className="empty-icon-wrapper">
            <RotateCcw className="empty-icon-svg" aria-hidden="true" />
          </div>
          <b>Formulário alterado</b>
          <p>
            Envie a solicitação ou escolha um dos cenários acima para ver a análise.
          </p>
        </div>
      ) : (
        <>
          {/* Banner de Rota */}
          <div className={`route ${result.route}`}>
            <div className="route-header">
              <div className="route-header-left">
                {getRouteIcon(result.route)}
                <span className="route-badge">{result.route.toUpperCase()}</span>
              </div>
              <small>ENCAMINHAMENTO</small>
            </div>
            <h3>{result.routeTitle}</h3>
            <p>{result.routeDescription}</p>
          </div>

          {/* Dados Ausentes */}
          {result.missingFields.length > 0 && (
            <div className="missing-card">
              <div className="missing-header">
                <AlertOctagon className="missing-icon" aria-hidden="true" />
                <b>Informações que estão faltando:</b>
              </div>
              <ul className="missing-list">
                {result.missingFields.map((field, idx) => (
                  <li key={idx}>{field}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Alerta de Urgência */}
          {result.route === "triage" && (
            <div className="urgency-rule warning-rule">
              <div className="urgency-header-bar">
                <AlertTriangle className="warning-icon" aria-hidden="true" />
                <small>ATENÇÃO IMEDIATA</small>
              </div>
              <b>Risco de paralisação ou pendência sanitária (RDC 727)</b>
              <p>
                A equipe técnica deve verificar o caso imediatamente, sem aguardar a complementação de dados.
              </p>
            </div>
          )}

          {/* Se Rota for Fila Operacional */}
          {result.route === "queue" && (
            <>
              {/* Definição de Urgência pelo Operador */}
              <div className="urgency-selector-card">
                <div className="urgency-header">
                  <b>Prazo de início do atendimento (SLA)</b>
                  <small>Ajuste manual da equipe</small>
                </div>
                <label className="urgency-label">
                  Tempo para início do atendimento:
                  <select
                    value={form.actionWindow}
                    onChange={(e) => onChangeUrgency(e.target.value)}
                  >
                    <option value="5">Imediato (Urgência P1 - até 1 hora)</option>
                    <option value="4">Alta prioridade (P2 - até 4 horas)</option>
                    <option value="3">Prioridade regular (P3 - no mesmo dia)</option>
                    <option value="2">Rotina (P3 - até 3 dias úteis)</option>
                    <option value="1">Planejamento (P4 - próximo ciclo)</option>
                  </select>
                </label>
              </div>

              {/* Regra de Urgência Máxima */}
              {form.actionWindow === "5" && (
                <div className="urgency-rule">
                  <div className="urgency-header-bar">
                    <Clock className="warning-icon text-red" aria-hidden="true" />
                    <small>URGÊNCIA MÁXIMA</small>
                  </div>
                  <b>Início imediato (SLA: até 1 hora)</b>
                  <p>
                    Requer acionamento prioritário da equipe técnica de manutenção ou coordenação de campo.
                  </p>
                </div>
              )}

              {/* Cartão de Severidade */}
              <div className={`severity-card ${result.priority.badgeClass}`}>
                <div className="severity-card-top">
                  <div className="severity-badge-box">
                    <span className="severity-code">{result.priority.level}</span>
                    <div>
                      <b className="severity-title">{result.priority.name}</b>
                      <span className="severity-sla-tag">
                        <Clock className="tag-icon" aria-hidden="true" />
                        {result.priority.slaLabel}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="severity-rationale">
                  <b>Motivo da Classificação:</b> {result.priority.rationale}
                </p>
              </div>
            </>
          )}

          {/* Destaques e Apoio à Triagem */}
          <AiAssistantCard aiAnalysis={aiAnalysis} />

          {/* Barra de Ações Finais */}
          <div className="triage-actions-bar">
            <button
              type="button"
              className={`review-btn ${reviewed ? "reviewed" : "secondary"}`}
              onClick={onToggleReviewed}
            >
              <CheckCircle2 className="btn-icon" aria-hidden="true" />
              {reviewed ? "Triagem Aprovada" : "Aprovar Triagem"}
            </button>
            <button
              type="button"
              className="export-btn"
              onClick={onOpenExport}
              title="Copiar resumo da decisão"
            >
              <FileText className="btn-icon" aria-hidden="true" />
              Copiar Resumo
            </button>
          </div>
        </>
      )}
    </div>
  );
};
