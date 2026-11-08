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
          <b>Triagem Operacional & Enquadramento</b>
          <small>Direcionamento na esteira do RadarSocial e validação de severidade</small>
        </div>
      </div>

      {!analyzed ? (
        <div className="empty">
          <div className="empty-icon-wrapper">
            <RotateCcw className="empty-icon-svg" aria-hidden="true" />
          </div>
          <b>Formulário alterado</b>
          <p>
            Envie a solicitação ou selecione um cenário demonstrativo para visualizar a triagem.
          </p>
        </div>
      ) : (
        <>
          {/* Banner de Rota Recomendada */}
          <div className={`route ${result.route}`}>
            <div className="route-header">
              <div className="route-header-left">
                {getRouteIcon(result.route)}
                <span className="route-badge">{result.route.toUpperCase()}</span>
              </div>
              <small>ENCAMINHAMENTO RECOMENDADO</small>
            </div>
            <h3>{result.routeTitle}</h3>
            <p>{result.routeDescription}</p>
          </div>

          {/* Dados Ausentes (Poka-Yoke do Retorno Guiado) */}
          {result.missingFields.length > 0 && (
            <div className="missing-card">
              <div className="missing-header">
                <AlertOctagon className="missing-icon" aria-hidden="true" />
                <b>Requisitos essenciais ausentes para aprovação:</b>
              </div>
              <ul className="missing-list">
                {result.missingFields.map((field, idx) => (
                  <li key={idx}>{field}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Alerta de Triagem Imediata por Risco */}
          {result.route === "triage" && (
            <div className="urgency-rule warning-rule">
              <div className="urgency-header-bar">
                <AlertTriangle className="warning-icon" aria-hidden="true" />
                <small>ALERTA DE ATENÇÃO IMEDIATA</small>
              </div>
              <b>Possível incidente com risco regulatório ou paralisação</b>
              <p>
                O relato aponta risco iminente ou pendência sanitária (ex: Anvisa RDC 727). A
                coordenação técnica deve intervir de imediato, sem aguardar trâmites burocráticos.
              </p>
            </div>
          )}

          {/* Se Rota for Fila Operacional Qualificada */}
          {result.route === "queue" && (
            <>
              {/* Definição de Urgência pelo Operador */}
              <div className="urgency-selector-card">
                <div className="urgency-header">
                  <b>Validação do prazo de início pela triagem</b>
                  <small>Ajuste de SLA pelo operador</small>
                </div>
                <label className="urgency-label">
                  Janela para início do atendimento técnico:
                  <select
                    value={form.actionWindow}
                    onChange={(e) => onChangeUrgency(e.target.value)}
                  >
                    <option value="5">Imediato (Urgência máxima / P1)</option>
                    <option value="4">Em até 1 hora (Alta prioridade / P2)</option>
                    <option value="3">No mesmo dia (Prioridade regular / P3)</option>
                    <option value="2">Em até 3 dias úteis (Rotina / P3)</option>
                    <option value="1">Fluxo regular ou backlog (P4)</option>
                  </select>
                </label>
              </div>

              {/* Regra de Urgência Máxima */}
              {form.actionWindow === "5" && (
                <div className="urgency-rule">
                  <div className="urgency-header-bar">
                    <Clock className="warning-icon text-red" aria-hidden="true" />
                    <small>REGRA DE URGÊNCIA MÁXIMA</small>
                  </div>
                  <b>Atendimento com início imediato (SLA: até 1 hora)</b>
                  <p>
                    A urgência máxima exige acionamento prioritário da equipe técnica de manutenção ou
                    coordenação de campo do RadarSocial.
                  </p>
                </div>
              )}

              {/* Cartão Executivo de Severidade Operacional */}
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
                  <b>Diagnóstico da Triagem:</b> {result.priority.rationale}
                </p>
              </div>
            </>
          )}

          {/* Destaques e Apoio à Triagem com IA */}
          <AiAssistantCard aiAnalysis={aiAnalysis} />

          {/* Barra de Ações Finais (Human-in-the-Loop) */}
          <div className="triage-actions-bar">
            <button
              type="button"
              className={`review-btn ${reviewed ? "reviewed" : "secondary"}`}
              onClick={onToggleReviewed}
            >
              <CheckCircle2 className="btn-icon" aria-hidden="true" />
              {reviewed ? "Triagem Homologada pelo Analista" : "Validar Triagem (Human-in-the-Loop)"}
            </button>
            <button
              type="button"
              className="export-btn"
              onClick={onOpenExport}
              title="Copiar parecer estruturado da decisão"
            >
              <FileText className="btn-icon" aria-hidden="true" />
              Copiar Parecer
            </button>
          </div>
        </>
      )}
    </div>
  );
};
