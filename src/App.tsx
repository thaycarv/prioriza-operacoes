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
import { FilePlus2, ListFilter } from "lucide-react";

const emptyForm: DemandForm = {
  title: "",
  origin: "Polo Comunitário Digital",
  kind: "Incidente de Infraestrutura / TI",
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
  const [protocol, setProtocol] = useState(scenarioData.A.protocol);
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

  // Selecionar chamado na fila
  const handleSelectScenario = (key: string) => {
    const selected = scenarioData[key];
    setForm(selected.form);
    setProtocol(selected.protocol);
    setAnalyzed(true);
    setReviewed(false);
  };

  // Limpar formulário para novo chamado manual
  const handleStartFreeTest = () => {
    setForm({ ...emptyForm });
    setProtocol("");
    setAnalyzed(false);
    setReviewed(false);
    setView("requester");
  };

  // Registrar ocorrência
  const handleSubmitForm = (e: React.FormEvent) => {
    e.preventDefault();
    setAnalyzed(true);
    const newProtocol = `RS-${new Date().getFullYear()}-${String(
      Date.now()
    ).slice(-5)}`;
    setProtocol(newProtocol);
  };

  return (
    <main className="app-shell">
      <Header />

      <section className="workspace">
        {/* Cabeçalho da Fila de Chamados dos Polos */}
        <div className="section-head">
          <div className="queue-header-titles">
            <p className="eyebrow">{textos.fila.categoria}</p>
            <h2>{textos.fila.titulo}</h2>
            <p className="queue-subtitle">{textos.fila.subtitulo}</p>
          </div>

          <div className="queue-stats-row">
            <span className="stat-pill">
              <span className="stat-dot dot-gray"></span>
              <b>4</b> chamados na fila
            </span>
            <span className="stat-pill">
              <span className="stat-dot dot-red"></span>
              <b>1</b> imediato (P1)
            </span>
            <span className="stat-pill">
              <span className="stat-dot dot-amber"></span>
              <b>1</b> pendência MROSC
            </span>
            <span className="stat-pill">
              <span className="stat-dot dot-orange"></span>
              <b>1</b> risco sanitário
            </span>
            <span className="stat-pill">
              <span className="stat-dot dot-blue"></span>
              <b>1</b> planejamento (P4)
            </span>
          </div>

          <ScenarioSelector
            currentTitle={form.title}
            onSelectScenario={handleSelectScenario}
            onStartFreeTest={handleStartFreeTest}
          />
        </div>

        {/* Abas Limpas de Navegação */}
        <div className="view-switch" aria-label="Alternar visualização">
          <button
            type="button"
            className={view === "requester" ? "active" : ""}
            onClick={() => setView("requester")}
          >
            <FilePlus2 className="btn-icon" aria-hidden="true" />
            Nova Solicitação
          </button>
          <button
            type="button"
            className={view === "analyst" ? "active" : ""}
            onClick={() => setView("analyst")}
          >
            <ListFilter className="btn-icon" aria-hidden="true" />
            Fila de Triagem
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

      {/* Rodapé Corporativo Enxuto */}
      <footer className="app-footer">
        <div className="footer-content">
          <b>{textos.rodape.titulo}</b>
          <p>{textos.rodape.observacao}</p>
          <small className="footer-skills">{textos.rodape.competencias}</small>
        </div>
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
