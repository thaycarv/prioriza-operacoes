import React, { useState } from "react";
import { AiAnalysis } from "../types";
import { Sparkles, Check, Copy } from "lucide-react";

interface AiAssistantCardProps {
  aiAnalysis: AiAnalysis | null;
}

export const AiAssistantCard: React.FC<AiAssistantCardProps> = ({
  aiAnalysis,
}) => {
  const [copiedQuestion, setCopiedQuestion] = useState<string | null>(null);

  const handleCopyQuestion = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedQuestion(text);
    setTimeout(() => setCopiedQuestion(null), 2000);
  };

  if (!aiAnalysis) return null;

  return (
    <div className="assistant-card">
      <div className="assistant-card-header">
        <div className="assistant-title-box">
          <Sparkles className="assistant-icon" aria-hidden="true" />
          <b>Apoio Analítico & Fatos do Relato</b>
        </div>
        <span className="assistant-pill">Copiloto Operacional</span>
      </div>

      <div className="assistant-summary">
        <p>{aiAnalysis.summary}</p>
      </div>

      <div className="assistant-grid">
        <div className="assistant-col">
          <b>Fatos Confirmados na Demanda</b>
          <ul>
            {aiAnalysis.facts.map((fact, idx) => (
              <li key={idx}>{fact}</li>
            ))}
          </ul>
        </div>

        <div className="assistant-col">
          <b>Hipóteses a Validar com o Polo</b>
          <ul>
            {aiAnalysis.hypotheses.map((hyp, idx) => (
              <li key={idx}>{hyp}</li>
            ))}
          </ul>
        </div>
      </div>

      {aiAnalysis.suggestedQuestions.length > 0 && (
        <div className="assistant-questions">
          <div className="questions-header">
            <b>Perguntas Recomendadas para o Solicitante:</b>
            <small>Clique em uma pergunta para copiar e enviar ao polo</small>
          </div>
          <div className="questions-list">
            {aiAnalysis.suggestedQuestions.map((q, idx) => (
              <div
                key={idx}
                className="question-chip"
                onClick={() => handleCopyQuestion(q)}
                title="Clique para copiar"
                role="button"
                tabIndex={0}
              >
                <span>{q}</span>
                <span className="copy-action">
                  {copiedQuestion === q ? (
                    <>
                      <Check className="copy-icon" aria-hidden="true" />
                      Copiado
                    </>
                  ) : (
                    <>
                      <Copy className="copy-icon" aria-hidden="true" />
                      Copiar
                    </>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
