# RadarSocial Prioriza: Triagem & Qualificação Operacional de Demandas

> **Módulo Integrado ao Ecossistema RadarSocial**  
> **Aplicação Online:** [https://thaycarv.github.io/prioriza-operacoes/](https://thaycarv.github.io/prioriza-operacoes/)  
> **Autora & Coordenação Técnica:** Thayâne Carvalho (Engenharia de Produção & Nutrição)

O **RadarSocial Prioriza** é o módulo de triagem operacional, gestão de incidentes e qualificação de demandas do ecossistema **RadarSocial**.

Enquanto o **RadarSocial** atua no nível **estratégico** (governança de programas, controle físico-financeiro com Curva S, remanejamento de rubricas e matriz 5W2H), o **RadarSocial Prioriza** atua no nível **operacional de ponta**: recebe as demandas, ocorrências e solicitações vindas dos polos comunitários e cooperativas, aplicando uma matriz de severidade (P1 a P4) e direcionamento inteligente com supervisão humana.

---

## 🎯 O Desafio Operacional na Gestão de Programas Sociais

Em programas sociais com múltiplos polos e cooperativas atendidas, tudo chega rotulado como "urgente" por mensagens ou e-mails:
* **Falta de requisitos formais:** pedidos de recursos chegam sem as 3 cotações de mercado ou sem a prestação de contas de notas fiscais exigidas pelas regras de compras do projeto, travando o comitê em retrabalho;
* **Risco de paralisação física:** panes elétricas ou quedas de internet em laboratórios comunitários de TI podem interromper turmas de alunos se não forem atendidas imediatamente;
* **Riscos sanitários e regulatórios:** falhas de rotulagem nutricional em alimentos artesanais (**RDC nº 727/2022 da Anvisa**) exigem intervenção técnica preventiva antes da autuação ou descarte de lotes;
* **Sobrecarga da equipe:** sem uma triagem com critérios objetivos, atende-se quem reclama mais alto, gerando ineficiência e desperdício de recursos públicos/privados.

---

## 🚦 Quatro Rotas Estratégicas de Direcionamento

| Rota de Encaminhamento | Situação no Polo Comunitário | Tratamento Operacional no RadarSocial |
| :--- | :--- | :--- |
| **Fila de Atendimento Imediato (P1)** | Pane elétrica, parada total de polo ou risco sanitário | Início imediato do atendimento técnico (**SLA: até 1 hora**). |
| **Fila Regular de Atendimento (P2/P3)** | Demanda com dados completos e processo operando com contorno | Organização na fila regular conforme impacto (**P2: até 4h** / **P3: no mesmo dia**). |
| **Retorno com Orientações** | Faltam cotações de mercado, notas fiscais ou dados essenciais | Chamado retorna ao solicitante com orientações objetivas do que falta anexar. |
| **Backlog de Planejamento (P4)** | Demanda de melhoria ou expansão sem urgência imediata | Registrada para o próximo ciclo de planejamento e orçamento semestral. |

---

## 📊 Matriz de Severidade & Prazos (P1 a P4)

A severidade é determinada por fatores operacionais concretos (Impacto no Processo, Existência de Contorno, Afetados Confirmados, Tendência e SLA Normativo):

* **P1: Crítico (Ação Imediata):** Interrupção total de polo comunitário ou risco direto à conformidade/segurança. Início imediato (**SLA: até 1 hora**).
* **P2: Alto Impacto:** Operação do polo parcialmente comprometida sem contorno provisório ou escala departamental (**SLA: até 4 horas**).
* **P3: Médio / Regular:** Dificuldade operacional com procedimento de contorno ativo ou solicitação de rotina (**SLA: no mesmo dia / até 24h**).
* **P4: Baixo / Planejamento:** Melhoria planejada sem impacto nas atividades vigentes (**Ciclos semestrais do RadarSocial**).

---

## 📋 Chamados & Ocorrências dos Polos Comunitários

O sistema gerencia chamados reais do portfólio de projetos do ecossistema RadarSocial:

1. **Chamado #2041: Polo Digital Norte (Inclusão Digital):**
   * Curto-circuito interrompeu 20 computadores a poucas horas de oficina certificadora de 40 jovens.
   * *Enquadramento:* **Fila de Atendimento Imediato (P1)** com SLA de 1h para manutenção emergencial.
2. **Chamado #2042: Cooperativa Terra Viva (Agricultura Familiar):**
   * Cooperativa pede R$ 14.500 após vendaval, sem anexar cotações ou NFs exigidas pelas regras de compras.
   * *Enquadramento:* **Retorno com Orientações** para evitar glosas na prestação de contas.
3. **Chamado #2043: Ateliê Comunitário (Empreendedorismo Feminino):**
   * Coletivo propõe turma noturna de costura para mães que trabalham de dia. Aulas diurnas normais.
   * *Enquadramento:* **Backlog de Planejamento (P4)** para o planejamento do próximo ciclo semestral.
4. **Chamado #2044: Coletivo Gastronomia Solidária (Alimentação Saudável):**
   * Fiscalização apontou ausência de rotulagem nutricional e alérgenos em 150 potes artesanais.
   * *Enquadramento:* **Atenção Imediata** com acionamento técnico da equipe de nutrição e operações.

---

## 🛠️ Stack Técnica & Arquitetura

* **Frontend:** React 19, TypeScript, Vite
* **Ícones & Design System:** Lucide React (sem emojis avulsos), padrão editorial Slate Mineral & Deep Forest integrado ao design do RadarSocial
* **Testes & Qualidade:** Vitest com 6 testes automatizados cobrindo a matriz P1 a P4, as 4 rotas de triagem e os fatores de processo

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

Engenharia de Processos • Teoria das Filas e Gestão de Capacidade • Gestão de Compras e Prestação de Contas • Conformidade Regulatória Sanitária (Rotulagem e Alérgenos) • Supervisão Humana • Gestão de Incidentes Operacionais
