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
import { V1View } from "./components/V1View";

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
  const [version, setVersion] = useState<"v1" | "v2">("v2");
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
      <Header currentVersion={version} onSelectVersion={setVersion} />

      {version === "v1" ? (
        <V1View />
      ) : (
        <>
          {/* Seção Principal de Apresentação V2 */}
          <section className="hero">
            <div>
              <p className="eyebrow">{textos.apresentacao.categoria}</p>
              <h1>
                {textos.apresentacao.titulo}
                <br />
                <em>{textos.apresentacao.destaque}</em>
              </h1>
              <p className="lede">{textos.apresentacao.descricao}</p>
            </div>

            <div className="principles">
              {textos.principios.map((item) => [
                <span key={`${item.numero}-numero`}>{item.numero}</span>,
                <p key={`${item.numero}-texto`}>
                  <b>{item.titulo}</b>
                  <br />
                  {item.descricao}
                </p>,
              ])}
            </div>
          </section>

          {/* Espaço de Trabalho e Demonstração */}
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
                🔍 Visão da Triagem (Análise e Score)
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

          {/* Metodologia e Fundamentação */}
          <section className="case">
            <div>
              <p className="eyebrow">{textos.case.categoria}</p>
              <h2>
                {textos.case.tituloLinha1}
                <br />
                {textos.case.tituloLinha2}
              </h2>
            </div>
            <div className="case-grid">
              {textos.case.etapas.map((etapa) => (
                <article key={etapa.numero}>
                  <span>{etapa.numero}</span>
                  <b>{etapa.titulo}</b>
                  <p>{etapa.descricao}</p>
                </article>
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
            <p>{textos.rodape.competencias}</p>
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
        </>
      )}
    </main>
  );
}
