import React from "react";
import { DemandForm } from "../types";
import { CheckCircle2, ArrowRight, HelpCircle, RotateCcw } from "lucide-react";

export function HelpLabel({
  children,
  help,
}: {
  children: string;
  help: string;
}) {
  return (
    <span className="field-label">
      {children}
      <span className="help" tabIndex={0} aria-label={`${children}: ${help}`}>
        <HelpCircle className="help-icon" aria-hidden="true" />
        <span role="tooltip">{help}</span>
      </span>
    </span>
  );
}

interface IntakeFormProps {
  form: DemandForm;
  protocol: string;
  onChange: (key: keyof DemandForm, value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
}

export const IntakeForm: React.FC<IntakeFormProps> = ({
  form,
  protocol,
  onChange,
  onSubmit,
  onReset,
}) => {
  return (
    <form className="panel form-panel" onSubmit={onSubmit}>
      {protocol ? (
        <div className="confirmation">
          <div className="confirmation-icon-wrapper">
            <CheckCircle2 className="confirmation-icon-svg" aria-hidden="true" />
          </div>
          <p className="eyebrow">SOLICITAÇÃO ENVIADA</p>
          <h3>Chamado registrado com sucesso.</h3>
          <p>
            A demanda já está na fila de triagem da equipe técnica para avaliação de prioridade e prazo.
          </p>
          <div className="protocol-box">
            <small>NÚMERO DO PROTOCOLO</small>
            <b>{protocol}</b>
          </div>
          <button type="button" className="secondary" onClick={onReset}>
            <RotateCcw className="btn-icon" aria-hidden="true" />
            Abrir nova solicitação
          </button>
        </div>
      ) : (
        <>
          <div className="panel-title">
            <span className="step-badge">1</span>
            <div>
              <b>Dados da Solicitação</b>
              <small>Preencha as informações do pedido ou ocorrência</small>
            </div>
          </div>

          <label>
            <HelpLabel help="Resuma em poucas palavras o que está acontecendo.">
              Título da solicitação
            </HelpLabel>
            <input
              placeholder="Ex: Queda de energia e internet no Polo Digital Norte"
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
            />
          </label>

          <div className="cols">
            <label>
              <HelpLabel help="Polo ou comunidade de onde partiu a solicitação.">
                Polo ou setor de origem
              </HelpLabel>
              <select
                value={form.origin}
                onChange={(e) => onChange("origin", e.target.value)}
              >
                <option value="Polo Comunitário Digital">Polo Comunitário Digital</option>
                <option value="Cooperativa Agrícola / Produção">Cooperativa Agrícola / Produção</option>
                <option value="Ateliê / Coletivo Produtivo">Ateliê / Coletivo Produtivo</option>
                <option value="Comitê Gestor / PMO">Comitê Gestor / PMO</option>
                <option value="Auditoria / Prestação de Contas">Auditoria / Prestação de Contas</option>
                <option value="Fiscalização / Vigilância Sanitária">Fiscalização / Vigilância Sanitária</option>
                <option value="Liderança Comunitária">Liderança Comunitária</option>
              </select>
            </label>

            <label>
              <HelpLabel help="Natureza da solicitação para triagem inicial.">
                Tipo da solicitação
              </HelpLabel>
              <select
                value={form.kind}
                onChange={(e) => onChange("kind", e.target.value)}
              >
                <option value="Incidente de Infraestrutura / TI">Incidente de Infraestrutura / TI</option>
                <option value="Solicitação Financeira / Remanejamento">Solicitação Financeira / Remanejamento</option>
                <option value="Risco Regulatório & Sanitário (Anvisa)">Risco Regulatório & Sanitário (Anvisa)</option>
                <option value="Demanda Operacional de Rotina">Demanda Operacional de Rotina</option>
                <option value="Melhoria de Escopo / Expansão">Melhoria de Escopo / Expansão</option>
              </select>
            </label>
          </div>

          <label>
            <HelpLabel help="Descreva com fatos: o que houve, quando começou e impactos práticos.">
              Descrição do ocorrido
            </HelpLabel>
            <textarea
              rows={4}
              placeholder="Descreva o que aconteceu de forma objetiva..."
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
            />
          </label>

          <div className="cols">
            <label>
              <HelpLabel help="A rotina do polo parou totalmente ou segue com lentidão?">
                Situação da operação
              </HelpLabel>
              <select
                value={form.process}
                onChange={(e) => onChange("process", e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="interrompido">Interrompido (Parada total)</option>
                <option value="parcial">Parcialmente afetado</option>
                <option value="dificuldade">Funcionando com lentidão</option>
                <option value="nao-afetado">Normal (Sem impacto)</option>
              </select>
            </label>

            <label>
              <HelpLabel help="Há procedimento provisório para trabalhar enquanto resolve?">
                Existe alternativa temporária (contorno)?
              </HelpLabel>
              <select
                value={form.workaround}
                onChange={(e) => onChange("workaround", e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim, existe contorno</option>
                <option value="nao">Não existe contorno</option>
                <option value="nao-sei">Não sei informar</option>
              </select>
            </label>
          </div>

          <div className="cols">
            <label>
              <HelpLabel help="Número confirmado de alunos, máquinas ou famílias atingidas.">
                Pessoas ou itens afetados
              </HelpLabel>
              <input
                type="number"
                min="0"
                placeholder="Ex: 20"
                value={form.affected}
                onChange={(e) => onChange("affected", e.target.value)}
              />
            </label>

            <label>
              <HelpLabel help="A ocorrência está estável ou aumentando?">
                Tendência da ocorrência
              </HelpLabel>
              <select
                value={form.trend}
                onChange={(e) => onChange("trend", e.target.value)}
              >
                <option value="desconhecida">Não verificada</option>
                <option value="estavel">Estável</option>
                <option value="oscilando">Oscilando / Intermitente</option>
                <option value="aumentando">Aumentando</option>
              </select>
            </label>
          </div>

          <label>
            <HelpLabel help="Existe prazo formal fixado em contrato ou edital?">
              Existe prazo ou SLA formal acordado?
            </HelpLabel>
            <select
              value={form.sla}
              onChange={(e) => onChange("sla", e.target.value)}
            >
              <option value="sim">Sim, existe prazo formal</option>
              <option value="nao">Não existe prazo formal</option>
              <option value="nao-sei">Não sei informar</option>
            </select>
          </label>

          <button className="primary" type="submit">
            Enviar solicitação
            <ArrowRight className="btn-icon" aria-hidden="true" />
          </button>
        </>
      )}
    </form>
  );
};
