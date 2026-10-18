import React, { useState } from "react";
import { DemandForm, TriageResult, AiAnalysis } from "../types";

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

  const exportText = `*Resumo da Triagem Operacional: Prioriza*
Protocolo: ${protocol || "OP-" + new Date().getFullYear() + "-DEMO"}
Data: ${new Date().toLocaleDateString("pt-BR")}

*1. Identificação da Solicitação:*
- Título: ${form.title || "Sem título"}
- Origem: ${form.origin} (${form.kind})
- Volume Afetado: ${form.affected || "0"} confirmado(s)
- Situação do Processo: ${form.process || "Não informado"}
- Alternativa Temporária (Contorno): ${form.workaround}

*2. Enquadramento e Severidade:*
- Rota: ${triage.routeTitle}
- Nível de Criticidade: ${triage.priority.level} (${triage.priority.name})
- Meta de Atendimento (SLA): ${triage.priority.slaLabel}
- Justificativa da Triagem: ${triage.priority.rationale}

*3. Fatores Operacionais Analisados:*
${triage.factors
  .map((f) => `- ${f.name}: ${f.status} (${f.detail})`)
  .join("\n")}

${
  aiAnalysis?.suggestedQuestions && aiAnalysis.suggestedQuestions.length > 0
    ? `\n*Perguntas Recomendadas para o Solicitante:*\n` +
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
          <h3>📋 Copiar Resumo Estruturado</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <p className="modal-desc">
          Texto formatado para registro em ferramentas de chamado, prontuário, Jira ou comunicação operacional.
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
            {copied ? "✓ Copiado com sucesso!" : "Copiar Resumo"}
          </button>
        </div>
      </div>
    </div>
  );
};
