import React from "react";
import { DemandForm, TriageResult, AiAnalysis } from "../types";
import { formatPoints } from "../lib/triageEngine";
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
          <small>Direcionamento do chamado e pontos de conferência</small>
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
              <small>ALERTA DE ATENÇÃO IMEDIATA</small>
              <b>Possível incidente com risco de agravamento</b>
              <p>
                O chamado menciona impacto crescente ou interrupção. A análise
                técnica deve iniciar imediatamente, sem aguardar o preenchimento
                de todos os campos.
              </p>
            </div>
          )}

          {/* Se Rota for Score (Demanda elegível) */}
          {result.route === "score" && (
            <>
              {/* Definição de Urgência pelo Operador */}
              <div className="urgency-selector-card">
                <div className="urgency-header">
                  <b>Definição do prazo de início pela triagem</b>
                  <small>Peso no cálculo: 30 pontos</small>
                </div>
                <label className="urgency-label">
                  Janela para início do atendimento técnico:
                  <select
                    value={form.actionWindow}
                    onChange={(e) => onChangeUrgency(e.target.value)}
                  >
                    <option value="5">Imediato (Urgência máxima: 30 pts)</option>
                    <option value="4">Em até 1 hora (22.5 pts)</option>
                    <option value="3">No mesmo dia (15 pts)</option>
                    <option value="2">Em até 3 dias úteis (7.5 pts)</option>
                    <option value="1">Fluxo regular ou backlog (0 pts)</option>
                  </select>
                </label>
              </div>

              {/* Regra de Urgência Máxima */}
              {form.actionWindow === "5" && (
                <div className="urgency-rule">
                  <small>REGRA DE URGÊNCIA MÁXIMA</small>
                  <b>Atendimento com início imediato</b>
                  <p>
                    A urgência máxima exige ação prioritária da equipe,
                    independentemente da pontuação total apurada.
                  </p>
                </div>
              )}

              {/* Scoreline com Medidor Visual */}
              <div className="scoreline">
                <div className="score-number-box">
                  <span className="score-val">{result.totalScore}</span>
                  <small className="score-max">/100</small>
                  <p>Score ponderado</p>
                </div>
                <div className="meter-container">
                  <div className="meter-bar">
                    <i style={{ width: `${result.totalScore}%` }}></i>
                  </div>
                  <div className="meter-labels">
                    <span>Baixa (0)</span>
                    <span>Média (50)</span>
                    <span>Alta (100)</span>
                  </div>
                </div>
              </div>

              {/* Tabela de Critérios */}
              <div className="criteria-container">
                <div className="criteria-header">
                  <b>Composição da Matriz Ponderada</b>
                  <small>Escala: ((Nota - 1) / 4) × Peso</small>
                </div>
                <div className="criteria">
                  {result.criteria.map((c) => (
                    <div key={c.name} className="criteria-item">
                      <div className="criteria-main">
                        <span className="criteria-name">{c.name}</span>
                        <b className="criteria-note">{c.note}/5</b>
                        <em className="criteria-points">
                          {formatPoints(c.points)} pts
                        </em>
                      </div>
                      <small className="criteria-rationale">{c.rationale}</small>
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
                      : "Trate a demanda conforme a fila operacional e o score ponderado."}
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
