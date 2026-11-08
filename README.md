# RadarSocial Prioriza: Triagem & Qualificação Operacional de Demandas

> **Módulo Integrado ao Ecossistema RadarSocial**  
> **Aplicação Online:** [https://thaycarv.github.io/prioriza-operacoes/](https://thaycarv.github.io/prioriza-operacoes/)  
> **Autora & Coordenação Técnica:** Thayâne Carvalho (Engenharia de Produção & Nutrição)

O **RadarSocial Prioriza** é o módulo de triagem operacional, gestão de incidentes e qualificação de demandas do ecossistema **RadarSocial**.

Enquanto o **RadarSocial** atua no nível **estratégico** (governança de programas, controle físico-financeiro com Curva S, remanejamento de rubricas e matriz 5W2H), o **RadarSocial Prioriza** atua no nível **operacional de ponta**: recebe as demandas, ocorrências e solicitações vindas dos polos comunitários e cooperativas, aplicando uma matriz de severidade (P1 a P4) e direcionamento inteligente com supervisão humana (**Human-in-the-Loop**).

---

## 🎯 O Desafio Operacional na Gestão de Programas Sociais

Em programas sociais com múltiplos polos e cooperativas atendidas, tudo chega rotulado como "urgente" por mensagens ou e-mails:
* **Falta de requisitos formais:** pedidos de recursos chegam sem as 3 cotações de mercado ou sem a prestação de contas de notas fiscais exigidas pelo **MROSC (Lei nº 13.019/2014)**, travando o comitê em retrabalho;
* **Risco de paralisação física:** panes elétricas ou quedas de internet em laboratórios comunitários de TI podem interromper turmas de alunos se não forem atendidas imediatamente;
* **Riscos sanitários e regulatórios:** falhas de rotulagem nutricional em alimentos artesanais (**RDC nº 727/2022 da Anvisa**) exigem intervenção técnica preventiva antes da autuação ou descarte de lotes;
* **Sobrecarga da equipe:** sem uma triagem com critérios objetivos, atende-se quem reclama mais alto, gerando ineficiência e desperdício de recursos públicos/privados.

---

## 🚦 Quatro Rotas Estratégicas de Direcionamento

| Rota de Encaminhamento | Situação no Polo Comunitário | Tratamento Operacional no RadarSocial |
| :--- | :--- | :--- |
| **Fila de Ação Imediata (P1)** | Pane elétrica, parada total de polo ou risco sanitário | Acionamento prioritário com atendimento técnico imediato (**SLA: até 1 hora**). |
| **Fila Operacional Regular (P2/P3)** | Demanda qualificada com processo operando ou contorno viável | Organização na fila conforme o impacto (**P2: até 4 horas** / **P3: no mesmo dia**). |
| **Retorno Guiado ao Solicitante** | Falta de 3 cotações, NFs anteriores ou laudos exigidos pelo MROSC | A demanda não sobrecarrega a coordenação; retorna com perguntas orientadas e requisitos claros. |
| **Backlog Estratégico (P4)** | Proposta de expansão ou melhoria de longo prazo (ex: turno noturno) | Registrada para análise orçamentária no próximo ciclo semestral do RadarSocial. |

---

## 📊 Matriz de Severidade & Prazos (P1 a P4)

A severidade é determinada por fatores operacionais concretos (Impacto no Processo, Existência de Contorno, Afetados Confirmados, Tendência e SLA Normativo):

* **P1: Crítico (Ação Imediata):** Interrupção total de polo comunitário ou risco direto à conformidade/segurança. Início imediato (**SLA: até 1 hora**).
* **P2: Alto Impacto:** Operação do polo parcialmente comprometida sem contorno provisório ou escala departamental (**SLA: até 4 horas**).
* **P3: Médio / Regular:** Dificuldade operacional com procedimento de contorno ativo ou solicitação de rotina (**SLA: no mesmo dia / até 24h**).
* **P4: Baixo / Planejamento:** Melhoria planejada sem impacto nas atividades vigentes (**Ciclos semestrais do RadarSocial**).

---

## 🎭 Cenários Operacionais Demonstrativos

O cockpit permite simular 4 desafios reais do portfólio de projetos do RadarSocial:

1. **Cenário A — Pane Elétrica e Queda de Link no Polo Digital Norte (Inclusão Digital):**
   * Curto-circuito interrompeu 20 computadores a poucas horas de oficina certificadora de 40 jovens.
   * *Enquadramento:* **Fila de Ação Imediata (P1)** com SLA de 1h para manutenção emergencial.
2. **Cenário B — Solicitação de Adiantamento de Insumos sem 3 Cotações (Agricultura Familiar):**
   * Cooperativa Terra Viva pede R$ 14.500 após vendaval, sem anexar cotações ou NFs exigidas pelo MROSC.
   * *Enquadramento:* **Retorno Guiado ao Solicitante** para evitar glosas na prestação de contas.
3. **Cenário C — Expansão Noturna do Ateliê Comunitário (Empreendedorismo Feminino):**
   * Coletivo propõe turma noturna de costura para mães que trabalham de dia. Aulas diurnas normais.
   * *Enquadramento:* **Backlog Estratégico (P4)** para o planejamento do próximo ciclo semestral.
4. **Cenário D — Inconformidade Sanitária de Geleias - RDC 727 (Alimentação Saudável):**
   * Fiscalização apontou ausência de rotulagem nutricional e alérgenos em 150 potes artesanais.
   * *Enquadramento:* **Triagem Imediata de Risco Sanitário** com acionamento da Nutricionista/Eng. de Produção.

---

## 🛠️ Stack Técnica & Arquitetura

* **Frontend:** React 19, TypeScript, Vite
* **Ícones & Design System:** Lucide React (sem emojis avulsos), padrão editorial Slate Mineral & Deep Forest integrado ao design do RadarSocial
* **Testes & Qualidade:** Vitest com 6 testes automatizados cobrindo a matriz P1–P4, as 4 rotas de triagem e os fatores de processo

```bash
# Instalar dependências
npm install

# Iniciar servidor local
npm run dev

# Executar testes unitários
npm test -- --run

# Gerar compilação de produção
npm run build
```

---

## 👩‍💼 Competências Aplicadas

Engenharia de Processos • Teoria das Filas e Gestão de Capacidade • Governança MROSC (Lei 13.019/2014) • Conformidade Regulatória Sanitária (Anvisa RDC 727/2022) • Human-in-the-Loop • Gestão de Incidentes Operacionais
