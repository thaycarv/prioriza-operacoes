import React, { useState } from "react";
import { DemandForm, TriageResult, AiAnalysis } from "../types";
import { formatPoints } from "../lib/triageEngine";

interface DecisionExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  form: DemandForm;
  triage: TriageResult;
  aiAnalysis: AiAnalysis | null;
  protocol: string;
}

export const DecisionExportModal: React.FC<DecisionExportModalProps> = ({
  isOpen,
  onClose,
  form,
  triage,
  aiAnalysis,
  protocol,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const exportText = `*Resumo da Triagem: Prioriza*
Protocolo: ${protocol || "OP-" + new Date().getFullYear() + "-DEMO"}
Data: ${new Date().toLocaleDateString("pt-BR")}

*1. Solicitação:*
- Título: ${form.title || "Sem título"}
- Origem: ${form.origin} (${form.kind})
- Pessoas/Contas Afetadas: ${form.affected || "0"}
- Status da Operação: ${form.process || "Não informado"}
- Alternativa Temporária (Contorno): ${form.workaround}

*2. Encaminhamento:*
- Rota: ${triage.routeTitle}
- Pontuação: ${triage.route === "score" ? `${triage.totalScore}/100 pts` : "Sem pontuação nesta rota"}
- Início do Atendimento: ${
    form.actionWindow === "5"
      ? "Imediato (Urgência máxima)"
      : form.actionWindow === "4"
      ? "Em até 1 hora"
      : form.actionWindow === "3"
      ? "No mesmo dia"
      : form.actionWindow === "2"
      ? "Em até 3 dias úteis"
      : "Fluxo regular ou planejado"
  }

${
  triage.criteria.length > 0
    ? `*3. Critérios:* \n` +
      triage.criteria
        .map(
          (c) =>
            `- ${c.name} (${c.note}/5): ${formatPoints(c.points)} pts (${c.rationale})`
        )
        .join("\n")
    : ""
}

${
  aiAnalysis?.suggestedQuestions && aiAnalysis.suggestedQuestions.length > 0
    ? `\n*Dúvidas para esclarecimento:*\n` +
      aiAnalysis.suggestedQuestions.map((q) => `- ${q}`).join("\n")
    : ""
}
`;

  const handleCopy = () => {
    navigator.clipboard.writeText(exportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>📋 Copiar Resumo para o Chamado</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="modal-desc">
          Texto formatado para colar no chamado de suporte, Jira, WhatsApp ou Slack.
        </p>

        <textarea
          className="export-textarea"
          readOnly
          value={exportText}
          rows={12}
        />

        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>
            Fechar
          </button>
          <button className="primary" onClick={handleCopy}>
            {copied ? "✓ Copiado com sucesso!" : "Copiar Texto"}
          </button>
        </div>
      </div>
    </div>
  );
};
