import React from "react";
import { DemandForm, TriageResult, AiAnalysis } from "../types";
import { AiAssistantCard } from "./AiAssistantCard";

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
  return (
    <div className="panel result-panel">
      <div className="panel-title">
        <span className="step-badge">2</span>
        <div>
          <b>Análise e Encaminhamento</b>
          <small>Direcionamento do chamado e enquadramento de severidade</small>
        </div>
      </div>

      {!analyzed ? (
        <div className="empty">
          <div className="empty-icon">↻</div>
          <b>Formulário alterado</b>
          <p>
            Envie a solicitação ou escolha um cenário para visualizar a análise.
          </p>
        </div>
      ) : (
        <>
          {/* Banner de Rota */}
          <div className={`route ${result.route}`}>
            <div className="route-header">
              <span className="route-badge">{result.route.toUpperCase()}</span>
              <small>ENCAMINHAMENTO RECOMENDADO</small>
            </div>
            <h3>{result.routeTitle}</h3>
            <p>{result.routeDescription}</p>
          </div>

          {/* Dados Ausentes */}
          {result.missingFields.length > 0 && (
            <div className="missing-card">
              <b>Informações essenciais ausentes:</b>
              <ul className="missing-list">
                {result.missingFields.map((field, idx) => (
                  <li key={idx}>{field}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Alerta de Triagem Imediata */}
          {result.route === "triage" && (
            <div className="urgency-rule warning-rule">
              <small>ALERTA DE ATENÇÃO IMEDIATA (FAST TRACK)</small>
              <b>Possível incidente com risco de agravamento</b>
              <p>
                O chamado menciona impacto crítico ou risco de paralisação. A
                análise técnica deve iniciar imediatamente, sem aguardar o
                preenchimento de todos os campos.
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
                  <small>Ajuste operacional de SLA</small>
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
                  <small>REGRA DE URGÊNCIA MÁXIMA</small>
                  <b>Atendimento com início imediato</b>
                  <p>
                    A urgência máxima exige acionamento prioritário da equipe,
                    tratando o ticket como emergência operacional (Fast Track).
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
                        ⏱ {result.priority.slaLabel}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="severity-rationale">
                  <b>Diagnóstico da Triagem:</b> {result.priority.rationale}
                </p>
              </div>

              {/* Matriz de Fatores Operacionais */}
              <div className="factors-container">
                <div className="factors-header">
                  <b>Matriz de Avaliação Operacional (Impacto x Urgência)</b>
                  <small>5 Dimensões de Governança</small>
                </div>
                <div className="factors-list">
                  {result.factors.map((f, idx) => (
                    <div key={idx} className="factor-item">
                      <div className="factor-main">
                        <span className="factor-name">{f.name}</span>
                        <span
                          className={`factor-impact-badge impact-${f.impactLevel}`}
                        >
                          {f.status}
                        </span>
                      </div>
                      <small className="factor-detail">{f.detail}</small>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pontos de conferência */}
              <div className="attention-block">
                <small>PONTOS DE CONFERÊNCIA</small>
                <div className="attention-item">
                  <span>SLA e Prazo Formal</span>
                  <b>
                    {form.sla === "sim"
                      ? "Solicitante informou existência de SLA acordado"
                      : form.sla === "nao"
                      ? "Solicitante informou ausência de prazo formal"
                      : "Existência de prazo formal não confirmada"}
                  </b>
                  <p>
                    {form.sla === "sim"
                      ? "Verifique o contrato aplicável e registre o tempo restante no ticket."
                      : "Trate a demanda conforme a fila operacional e o nível de severidade atribuído."}
                  </p>
                </div>

                <div className="attention-item">
                  <span>Evolução da Ocorrência</span>
                  <b>{result.worseningMarker}</b>
                  <p>{result.worseningAction}</p>
                </div>
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
              {reviewed ? "Avaliação Concluída" : "Concluir Avaliação"}
            </button>
            <button
              type="button"
              className="export-btn"
              onClick={onOpenExport}
              title="Copiar relatório estruturado"
            >
              Copiar Resumo
            </button>
          </div>
        </>
      )}
    </div>
  );
};
