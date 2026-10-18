# Prioriza • Triagem Inteligente e Qualificação de Demandas

O **Prioriza** é uma plataforma de triagem operacional desenhada para qualificar, organizar e direcionar fluxos de atendimento em setores de alta complexidade, como saúde, educação, impacto social e serviços públicos.

O projeto elimina o gargalo das filas desordenadas, onde quase tudo chega rotulado como urgente. Utilizando Inteligência Artificial como suporte analítico à decisão humana (Human-in-the-Loop), o sistema analisa o contexto da solicitação, avalia o nível real de criticidade e indica a rota mais eficiente de resolução.

---

## 🎯 O Desafio Operacional
Em operações de atendimento e serviços essenciais, pedidos e chamados chegam diariamente por múltiplos canais (mensagens, formulários e e-mails). Sem um método inteligente de triagem:
* Demandas com risco real à saúde ou à continuidade do serviço podem ficar invisíveis no volume de mensagens;
* Equipes perdem horas cobrando dados básicos que deveriam ter vindo no primeiro contato;
* A priorização corre o risco de ser arbitrária, atendendo quem reclama mais alto em vez de quem mais precisa;
* O time operacional sofre com sobrecarga de trabalho manual e falta de clareza nos prazos.

---

## 🚦 Quatro Rotas Estratégicas de Encaminhamento
Em vez de empurrar todas as solicitações para uma fila única, o Prioriza direciona cada caso para o fluxo mais adequado:

| Situação Identificada | Rota de Encaminhamento | Tratamento Prático |
| :--- | :--- | :--- |
| **Demanda completa e qualificada** | **Fila Regular com Prioridade** | Classificação automática por nível de criticidade e prazo de atendimento. |
| **Falta de dados essenciais ou laudos** | **Retorno Guiado ao Solicitante** | A demanda não trava na equipe; retorna com orientações claras sobre o que falta. |
| **Sinal de risco crítico ou vulnerabilidade** | **Ação Imediata (Fast Track)** | Pula etapas burocráticas e aciona atendimento prioritário da equipe responsável. |
| **Sugestão ou melhoria de longo prazo** | **Backlog de Planejamento** | Registrada para ciclos futuros, sem concorrer com demandas do dia a dia. |

---

## 📊 Matriz de Severidade & Prazos (P1 a P4)
Em vez de fórmulas matemáticas arbitrárias ou pontuações artificiais de IA, o Prioriza adota a matriz de severidade e criticidade operacional (alinhada aos padrões de ITSM e governança em saúde):

* **P1: Crítico (Fast Track):** Interrupção total de serviço essencial ou risco direto à segurança/saúde. Início imediato (SLA: até 1 hora).
* **P2: Alto Impacto:** Operação parcialmente comprometida sem contorno provisório ou múltiplos usuários afetados. (SLA: até 4 horas).
* **P3: Médio / Regular:** Dificuldade operacional com procedimento de contorno viável ativo ou impacto pontual. (SLA: no mesmo dia / até 24h).
* **P4: Baixo / Planejamento:** Melhoria contínua ou demanda sem impacto nas rotinas atuais. (Ciclos de Roadmap).

---

## 🤝 O Papel da Inteligência Artificial Responsável
A IA atua como um copiloto consultivo para quem está na ponta do atendimento, com foco em simplicidade e governança:

* **Leitura de Contexto:** A partir do relato livre do usuário, o modelo identifica fatos objetivos, histórico relatado e volume de pessoas impactadas;
* **Verificação de Completude:** O sistema checa automaticamente se documentos, laudos ou dados de contato essenciais estão presentes antes de abrir a tarefa para a equipe;
* **Sugestão de Resposta e Encaminhamento:** Aponta para qual setor direcionar e sugere mensagens de esclarecimento acolhedoras e profissionais;
* **Decisão Centrada no Humano (Human-in-the-Loop):** A tecnologia analisa e recomenda, mas a validação e a decisão final cabem sempre ao profissional responsável.

---

## 🛠️ Estrutura Técnica & Execução
* **Frontend:** React, TypeScript, Vite
* **Design & Estilo:** CSS modular, Motion Principles com física spring e micro-interações
* **Governança:** GitFlow rigoroso com Issues, Branches e Pull Requests (conforme `AGENTS.md`)

```bash
# Instalar dependências
npm install

# Iniciar servidor local
npm run dev

# Gerar build de produção
npm run build
```

---

## 👩‍💼 Competências Aplicadas
Engenharia de Processos • Triagem e Qualificação de Demandas • IA Generativa Aplicada • Governança Ética e Human-in-the-Loop • Transformação Digital em Serviços Essenciais
