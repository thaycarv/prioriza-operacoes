import React, { useState } from "react";
import { DemandForm, TriageResult, AiAnalysis } from "../types";
import { FileText, X, Check, Copy } from "lucide-react";

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

  const exportText = `*Resumo da Triagem: RadarSocial Prioriza*
Protocolo: ${protocol || "RS-" + new Date().getFullYear() + "-02041"}
Data: ${new Date().toLocaleDateString("pt-BR")}

*1. Identificação:*
- Título: ${form.title || "Sem título"}
- Origem: ${form.origin} (${form.kind})
- Afetados: ${form.affected || "0"} confirmado(s)
- Situação: ${form.process || "Não informado"}
- Contorno: ${form.workaround}

*2. Classificação da Triagem:*
- Encaminhamento: ${triage.routeTitle}
- Prioridade: ${triage.priority.level} (${triage.priority.name})
- Prazo (SLA): ${triage.priority.slaLabel}
- Justificativa: ${triage.priority.rationale}

*3. Fatores Analisados:*
${triage.factors
  .map((f) => `- ${f.name}: ${f.status} (${f.detail})`)
  .join("\n")}

${
  aiAnalysis?.suggestedQuestions && aiAnalysis.suggestedQuestions.length > 0
    ? `\n*Perguntas para o Solicitante:*\n` +
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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-header-title">
            <FileText className="modal-title-icon" aria-hidden="true" />
            <h3>Resumo da Triagem</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar modal">
            <X className="modal-close-icon" aria-hidden="true" />
          </button>
        </div>

        <p className="modal-desc">
          Texto pronto para copiar e enviar por e-mail, WhatsApp ou registrar no chamado.
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
            {copied ? (
              <>
                <Check className="btn-icon" aria-hidden="true" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="btn-icon" aria-hidden="true" />
                Copiar Resumo
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
