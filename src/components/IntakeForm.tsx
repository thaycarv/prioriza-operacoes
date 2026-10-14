import React from "react";
import { DemandForm } from "../types";

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
        ?
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
          <div className="confirmation-icon">✓</div>
          <p className="eyebrow">SOLICITAÇÃO REGISTRADA COM SUCESSO</p>
          <h3>Recebemos sua demanda operacional.</h3>
          <p>
            Ela foi encaminhada para a fila de triagem. A equipe fará a
            avaliação técnica dos dados observáveis antes do direcionamento.
          </p>
          <div className="protocol-box">
            <small>CÓDIGO DO PROTOCOLO / TICKET</small>
            <b>{protocol}</b>
          </div>
          <button type="button" className="secondary" onClick={onReset}>
            Abrir nova solicitação
          </button>
        </div>
      ) : (
        <>
          <div className="panel-title">
            <span className="step-badge">1</span>
            <div>
              <b>Entrada da demanda</b>
              <small>Dados observáveis e evidências fornecidas pelo solicitante</small>
            </div>
          </div>

          <label>
            <HelpLabel help="Resuma em poucas palavras o que está acontecendo de forma objetiva.">
              Título da demanda
            </HelpLabel>
            <input
              placeholder="Ex: Bloqueio na dispensação de medicamento na farmácia"
              value={form.title}
              onChange={(e) => onChange("title", e.target.value)}
            />
          </label>

          <div className="cols">
            <label>
              <HelpLabel help="Indique o canal ou origem da demanda: paciente, consultório, farmácia ou alerta do sistema.">
                Origem do relato
              </HelpLabel>
              <select
                value={form.origin}
                onChange={(e) => onChange("origin", e.target.value)}
              >
                <option>Paciente / Usuário</option>
                <option>Consultório / Unidade Assistencial</option>
                <option>Farmácia / Farmacovigilância</option>
                <option>Área interna / Regulação</option>
                <option>Sistema / Monitoramento</option>
                <option>Cliente</option>
                <option>Área interna</option>
                <option>Sistema/monitoramento</option>
                <option>Farmácia Hospitalar</option>
                <option>Consultório Credenciado</option>
                <option>Coordenação Clínica</option>
                <option>Vigilância / Enfermagem</option>
              </select>
            </label>

            <label>
              <HelpLabel help="Indique a natureza aparente neste primeiro momento. A triagem validará a classificação real.">
                Tipo percebido
              </HelpLabel>
              <select
                value={form.kind}
                onChange={(e) => onChange("kind", e.target.value)}
              >
                <option>Incidente Crítico</option>
                <option>Possível incidente sanitário</option>
                <option>Regulação / Guia</option>
                <option>Solicitação operacional</option>
                <option>Melhoria planejada</option>
                <option>Incidente</option>
                <option>Possível incidente</option>
              </select>
            </label>
          </div>

          <label>
            <HelpLabel help="Relate com fatos conhecidos: o que aconteceu, quando começou, onde ocorre e quais impactos foram observados. Evite suposições.">
              Descrição com fatos conhecidos
            </HelpLabel>
            <textarea
              rows={4}
              placeholder="Descreva detalhadamente o sintoma ocorrido..."
              value={form.description}
              onChange={(e) => onChange("description", e.target.value)}
            />
          </label>

          <div className="cols">
            <label>
              <HelpLabel help="Informe se ainda é possível operar e em que condição: normal, com lentidão, parcialmente ou interrompido.">
                Situação do processo
              </HelpLabel>
              <select
                value={form.process}
                onChange={(e) => onChange("process", e.target.value)}
              >
                <option value="">Selecione</option>
                <option value="interrompido">Interrompido (Parada total)</option>
                <option value="parcial">Parcialmente comprometido</option>
                <option value="dificuldade">Funcionando com dificuldade/lentidão</option>
                <option value="nao-afetado">Não afetado (Operação normal)</option>
              </select>
            </label>

            <label>
              <HelpLabel help="Existe procedimento provisório que permita continuar o trabalho enquanto o problema é resolvido?">
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
              <HelpLabel help="Informe apenas a quantidade já confirmada de pessoas, clientes ou contas atingidas até o momento.">
                Afetados confirmados
              </HelpLabel>
              <input
                type="number"
                min="0"
                placeholder="Ex: 1, 10, 50..."
                value={form.affected}
                onChange={(e) => onChange("affected", e.target.value)}
              />
            </label>

            <label>
              <HelpLabel help="Indique se os relatos estão estáveis, oscilando ou aumentando.">
                Tendência das ocorrências
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
            <HelpLabel help="SLA é um prazo formal acordado em contrato ou catálogo de serviços.">
              Existe SLA ou prazo formal acordado para esta demanda?
            </HelpLabel>
            <select
              value={form.sla}
              onChange={(e) => onChange("sla", e.target.value)}
            >
              <option value="sim">Sim, existe prazo/SLA acordado</option>
              <option value="nao">Não existe prazo formal</option>
              <option value="nao-sei">Não sei / Não se aplica</option>
            </select>
          </label>

          <button className="primary" type="submit">
            Enviar solicitação <span>→</span>
          </button>
        </>
      )}
    </form>
  );
};
