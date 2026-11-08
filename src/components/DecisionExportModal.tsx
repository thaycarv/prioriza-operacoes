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

  const exportText = `*Parecer de Triagem Operacional: RadarSocial Prioriza*
Protocolo: ${protocol || "RS-OP-" + new Date().getFullYear() + "-DEMO"}
Data: ${new Date().toLocaleDateString("pt-BR")}
Módulo: Triagem de Demandas & Incidentes Comunitários

*1. Identificação da Solicitação:*
- Título: ${form.title || "Sem título"}
- Origem no RadarSocial: ${form.origin} (${form.kind})
- Volume Afetado: ${form.affected || "0"} confirmado(s)
- Situação do Processo: ${form.process || "Não informado"}
- Alternativa Temporária (Contorno): ${form.workaround}

*2. Enquadramento e Severidade Operacional:*
- Rota de Encaminhamento: ${triage.routeTitle}
- Nível de Criticidade: ${triage.priority.level} (${triage.priority.name})
- Meta de Atendimento (SLA): ${triage.priority.slaLabel}
- Parecer da Triagem: ${triage.priority.rationale}

*3. Fatores Operacionais Analisados:*
${triage.factors
  .map((f) => `- ${f.name}: ${f.status} (${f.detail})`)
  .join("\n")}

${
  aiAnalysis?.suggestedQuestions && aiAnalysis.suggestedQuestions.length > 0
    ? `\n*Perguntas Recomendadas para o Solicitante (Polo/Cooperativa):*\n` +
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
            <h3>Parecer Estruturado de Triagem</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Fechar modal">
            <X className="modal-close-icon" aria-hidden="true" />
          </button>
        </div>

        <p className="modal-desc">
          Texto padronizado para anexação no dossiê do RadarSocial, atas de comitê ou despacho com lideranças de polo.
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
                Copiado com sucesso!
              </>
            ) : (
              <>
                <Copy className="btn-icon" aria-hidden="true" />
                Copiar Parecer
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
