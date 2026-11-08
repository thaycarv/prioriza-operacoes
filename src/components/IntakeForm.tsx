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
          <p className="eyebrow">SOLICITAÇÃO PROTOCOLADA COM SUCESSO</p>
          <h3>Demanda registrada no ecossistema RadarSocial.</h3>
          <p>
            Ela foi direcionada à esteira de triagem operacional. A coordenação técnica
            analisará os requisitos, o MROSC e a conformidade sanitária antes da liberação.
          </p>
          <div className="protocol-box">
            <small>CÓDIGO DO PROTOCOLO OPERACIONAL</small>
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
              <b>Entrada da Demanda Operacional</b>
              <small>Fatos observáveis e evidências fornecidas pelo polo ou comunidade</small>
            </div>
          </div>

          <label>
            <HelpLabel help="Resuma objetivamente o ocorrido no polo comunitário ou cooperativa.">
              Título da demanda ou incidente
            </HelpLabel>
            <input
              placeholder="Ex: Interrupção de energia e link de rede no Polo Digital Norte"
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
            />
          </label>

          <div className="cols">
            <label>
              <HelpLabel help="Indique a entidade de origem dentro do ecossistema de projetos do RadarSocial.">
                Polo ou entidade de origem
              </HelpLabel>
              <select
                value={form.origin}
                onChange={(e) => onChange("origin", e.target.value)}
              >
                <option value="Polo Comunitário Digital">Polo Comunitário Digital</option>
                <option value="Cooperativa Agrícola / Produção">Cooperativa Agrícola / Produção</option>
                <option value="Ateliê / Coletivo Produtivo">Ateliê / Coletivo Produtivo</option>
                <option value="Comitê Gestor / PMO RadarSocial">Comitê Gestor / PMO RadarSocial</option>
                <option value="Auditoria / Prestação de Contas">Auditoria / Prestação de Contas</option>
                <option value="Fiscalização / Vigilância Sanitária">Fiscalização / Vigilância Sanitária</option>
                <option value="Liderança Comunitária">Liderança Comunitária</option>
              </select>
            </label>

            <label>
              <HelpLabel help="Indique a natureza aparente da solicitação. A triagem confirmará a rota final.">
                Tipo da demanda
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
            <HelpLabel help="Descreva com fatos concretos: o que aconteceu, quantidade de beneficiários ou insumos atingidos e riscos observados.">
              Descrição com fatos conhecidos
            </HelpLabel>
            <textarea
              rows={4}
              placeholder="Descreva detalhadamente o evento, equipamentos afetados ou motivo do pedido..."
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
            />
          </label>

          <div className="cols">
            <label>
              <HelpLabel help="Informe se a rotina ou as aulas continuam acontecendo ou se houve paralisação total.">
                Situação da operação no polo
              </HelpLabel>
              <select
                value={form.process}
                onChange={(e) => onChange("process", e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="interrompido">Interrompido (Parada total do polo)</option>
                <option value="parcial">Parcialmente comprometido</option>
                <option value="dificuldade">Funcionando com dificuldade / lentidão</option>
                <option value="nao-afetado">Não afetado (Operação regular)</option>
              </select>
            </label>

            <label>
              <HelpLabel help="Existe procedimento provisório que permita continuar as atividades enquanto se resolve?">
                Alternativa temporária (Contorno)
              </HelpLabel>
              <select
                value={form.workaround}
                onChange={(e) => onChange("workaround", e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="sim">Sim, existe contorno viável</option>
                <option value="nao">Não existe contorno</option>
                <option value="nao-sei">Não sei informar</option>
              </select>
            </label>
          </div>

          <div className="cols">
            <label>
              <HelpLabel help="Informe a quantidade de alunos, famílias, máquinas ou unidades de produtos impactados.">
                Afetados confirmados
              </HelpLabel>
              <input
                type="number"
                min="0"
                placeholder="Ex: 10, 40, 150..."
                value={form.affected}
                onChange={(e) => onChange("affected", e.target.value)}
              />
            </label>

            <label>
              <HelpLabel help="Indique se a ocorrência está estável, oscilando ou com novos relatos aumentando.">
                Tendência da ocorrência
              </HelpLabel>
              <select
                value={form.trend}
                onChange={(e) => onChange("trend", e.target.value)}
              >
                <option value="desconhecida">Desconhecida / Não verificada</option>
                <option value="estavel">Estável</option>
                <option value="oscilando">Oscilando / Intermitente</option>
                <option value="aumentando">Aumentando rapidamente</option>
              </select>
            </label>
          </div>

          <label>
            <HelpLabel help="Indique se existe meta de atendimento acordada no termo de colaboração ou contrato de manutenção.">
              Existe SLA formal ou prazo acordado em termo/edital?
            </HelpLabel>
            <select
              value={form.sla}
              onChange={(e) => onChange("sla", e.target.value)}
            >
              <option value="sim">Sim, existe SLA acordado</option>
              <option value="nao">Não existe prazo formal</option>
              <option value="nao-sei">Não sei / Não se aplica</option>
            </select>
          </label>

          <button className="primary" type="submit">
            Protocolar solicitação na esteira
            <ArrowRight className="btn-icon" aria-hidden="true" />
          </button>
        </>
      )}
    </form>
  );
};
