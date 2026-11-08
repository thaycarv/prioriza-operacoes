# Catálogo de Auditoria e Melhorias: RadarSocial Prioriza

Este documento registra as auditorias e transformações realizadas no **RadarSocial Prioriza**, sob a ótica de **Engenharia de Produção (Qualidade e Processos)** e **Recrutamento Técnico/ESG**, integrando-o formalmente como módulo operacional do ecossistema **RadarSocial**.

---

## 1. Comparativo entre Versões & Transformações

| Dimensão | Estado Anterior | Estado Atual (Módulo RadarSocial) | Ganho Operacional & Defesa em Entrevistas |
| :--- | :--- | :--- | :--- |
| **Escopo & Posicionamento** | Chamados genéricos de regulação em saúde/hospitalar desconectados do restante do portfólio. | **Extensão oficial do RadarSocial:** módulo de triagem operacional para demandas de polos e cooperativas sociais. | Cria um ecossistema coerente de ponta a ponta (Macro-governança no RadarSocial + Triagem tática no Prioriza). |
| **Cenários Operacionais** | Cenários hospitalares isolados (quimioterápico, prótese de quadril, teleconsulta). | **Cenários do RadarSocial:** Inclusão Digital (Polo Norte), Agricultura Familiar (Cooperativa Terra Viva), Costura Comunitária e Alimentos (RDC 727 Anvisa). | Conexão autêntica com as competências reais da candidata (Engenharia de Produção + Nutrição). |
| **Ancoragem Regulatória** | Menções genéricas à ANS. | **MROSC (Lei 13.019/2014)** para exigência de 3 cotações/NFs e **RDC nº 727/2022 da Anvisa** para rotulagem nutricional de geleias. | Demonstra domínio da legislação brasileira de parcerias com o terceiro setor e vigilância sanitária. |
| **Design System** | Paleta ciano/verde-água com emojis avulsos no layout. | **Padrão Editorial Deep Forest & Slate:** ícones vetoriais SVG da biblioteca **Lucide React**, contraste acessível e topbar institucional com selo do RadarSocial. | Acabamento de produto corporativo de alto padrão, sem cara de template descartável de IA. |
| **Engenharia de Testes** | Sem suíte automatizada de testes de regras de triagem. | **Vitest integrado:** 6 testes unitários cobrindo todas as 4 rotas de triagem, níveis P1 a P4 e geração dos 5 fatores operacionais. | Garantia contra regressões e conformidade técnica no pipeline de CI/CD. |

---

## 2. A Jornada Integrada de Triagem com Human-in-the-Loop

1. **Entrada Padronizada (Poka-Yoke):** O formulário exige dados observáveis e objetivos (número de pessoas/equipamentos afetados, situação do processo e existência de contorno temporário).
2. **Motor Determinístico de Regras:**
   - Detecta automaticamente se faltam requisitos formais do MROSC e aciona a rota de **Retorno com Orientações**, eliminando retrabalho do comitê.
   - Identifica sinais de emergência física ou sanitária e encaminha à **Fila de Atendimento Imediato (P1)** com SLA de até 1 hora.
   - Isola solicitações de longo prazo e as direciona ao **Backlog de Planejamento (P4)**, evitando que concorram com incidentes críticos.
3. **Apoio Analítico com Supervisão Humana:**
   - Separa o que é fato comprovado de hipóteses levantadas pelo solicitante.
   - Gera perguntas de esclarecimento em 1 clique para envio ao polo comunitário.
   - Exige aprovação explícita do analista de operações antes de liberar a priorização final.
