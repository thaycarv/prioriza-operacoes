import { useState, useMemo } from "react";
import "./tooltips.css";
import "./styles.css";
import { textos } from "./textos";
import { DemandForm } from "./types";
import { evaluateDemand } from "./lib/triageEngine";
import { analyzeDemand } from "./lib/geminiAssistant";
import { Header } from "./components/Header";
import { ScenarioSelector, scenarioData } from "./components/ScenarioSelector";
import { IntakeForm } from "./components/IntakeForm";
import { TriageResultPanel } from "./components/TriageResultPanel";
import { DecisionExportModal } from "./components/DecisionExportModal";

const emptyForm: DemandForm = {
  title: "",
  origin: "Cliente",
  kind: "Solicitação operacional",
  perceived: "",
  description: "",
  process: "",
  workaround: "",
  affected: "",
  trend: "desconhecida",
  actionWindow: "3",
  sla: "nao-sei",
};

export default function App() {
  const [form, setForm] = useState<DemandForm>(scenarioData.A.form);
  const [analyzed, setAnalyzed] = useState(true);
  const [reviewed, setReviewed] = useState(false);
  const [view, setView] = useState<"requester" | "analyst">("requester");
  const [protocol, setProtocol] = useState("");
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Motor de regras e triagem
  const triageResult = useMemo(() => evaluateDemand(form), [form]);

  // Assistente de análise e pontos de atenção
  const aiAnalysis = useMemo(
    () => (analyzed ? analyzeDemand(form, triageResult) : null),
    [form, triageResult, analyzed]
  );

  // Atualizar campo do formulário
  const handleChangeField = (key: keyof DemandForm, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setAnalyzed(false);
    setReviewed(false);
  };

  // Alterar Urgência na triagem
  const handleChangeUrgency = (urgencyValue: string) => {
    setForm((prev) => ({ ...prev, actionWindow: urgencyValue }));
    setReviewed(false);
  };

  // Selecionar cenário de teste
  const handleSelectScenario = (key: string) => {
    const selected = scenarioData[key].form;
    setForm(selected);
    setAnalyzed(true);
    setReviewed(false);
    setProtocol("");
  };

  // Limpar formulário para teste livre
  const handleStartFreeTest = () => {
    setForm({ ...emptyForm });
    setProtocol("");
    setAnalyzed(false);
    setReviewed(false);
    setView("requester");
  };

  // Enviar formulário
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzed(true);
    const newProtocol = `OP-${new Date().getFullYear()}-${String(
      Date.now()
    ).slice(-6)}`;
    setProtocol(newProtocol);
  };

  return (
    <main>
      <Header />

      {/* Espaço de Trabalho e Demonstração (Direto no Protótipo) */}
      <section className="workspace">
        <div className="section-head">
          <div>
            <p className="eyebrow">{textos.demonstracao.categoria}</p>
            <h2>{textos.demonstracao.titulo}</h2>
          </div>

          <ScenarioSelector
            currentTitle={form.title}
            onSelectScenario={handleSelectScenario}
            onStartFreeTest={handleStartFreeTest}
          />
        </div>

        {/* Alternador de Perfis (Primeiro Solicitante, Depois Triagem) */}
        <div
          className="view-switch"
          aria-label="Alternar perfil de visualização"
        >
          <button
            className={view === "requester" ? "active" : ""}
            onClick={() => setView("requester")}
          >
            👤 Visão do Solicitante (Entrada e Protocolo)
          </button>
          <button
            className={view === "analyst" ? "active" : ""}
            onClick={() => setView("analyst")}
          >
            🔍 Visão da Triagem (Análise e Severidade)
          </button>
        </div>

        {/* Painéis Principais */}
        <div className={`grid view-${view}`}>
          <IntakeForm
            form={form}
            protocol={protocol}
            onChange={handleChangeField}
            onSubmit={handleSubmitForm}
            onReset={handleStartFreeTest}
          />

          <TriageResultPanel
            form={form}
            result={triageResult}
            analyzed={analyzed}
            reviewed={reviewed}
            aiAnalysis={aiAnalysis}
            onChangeUrgency={handleChangeUrgency}
            onToggleReviewed={() => setReviewed(!reviewed)}
            onOpenExport={() => setIsExportModalOpen(true)}
          />
        </div>
      </section>

      {/* Diretrizes e Princípios Operacionais */}
      <section className="about-section">
        <div className="about-header">
          <p className="eyebrow">{textos.apresentacao.categoria}</p>
          <h2>{textos.apresentacao.titulo}</h2>
          <p className="lede">{textos.apresentacao.descricao}</p>
        </div>

        <div className="principles">
          {textos.principios.map((item) => (
            <div key={item.numero} className="principle-item">
              <span className="principle-num">{item.numero}</span>
              <p>
                <b>{item.titulo}:</b> {item.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Rodapé */}
      <footer>
        <p>
          <b>{textos.rodape.titulo}</b>
          <br />
          {textos.rodape.observacao}
        </p>
      </footer>

      {/* Modal de Exportação */}
      <DecisionExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        form={form}
        triage={triageResult}
        aiAnalysis={aiAnalysis}
        protocol={protocol}
      />
    </main>
  );
}
