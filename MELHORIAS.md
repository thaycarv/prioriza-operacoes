# Catálogo de Melhorias: Prioriza

Este documento cataloga as evoluções realizadas no **Prioriza**, estruturando as melhorias em termos de usabilidade, clareza operacional e arquitetura.

---

## 1. Comparativo entre Versões

| Aspecto | Versão 1.0 | Versão 2.0 | Benefício Operacional |
| :--- | :--- | :--- | :--- |
| **Linguagem e Tom** | Foco excessivo em termos técnicos abstratos. | Comunicação profissional, clara e alinhada à rotina de operações. | Maior clareza e facilidade de adoção pelos usuários. |
| **Fluxo de Visualização** | Tela única sem ordenação prioritária de papéis. | Navegação iniciando pela Visão do Solicitante, seguida da Visão da Triagem. | Alinhamento com a jornada real de entrada e posterior análise. |
| **Suporte à Triagem** | Regra estática com filtros simples por palavras-chave. | Apoio analítico que categoriza fatos e sugere perguntas para demandas pendentes. | Redução de retrabalho e agilidade na complementação de dados. |
| **Estrutura de Código** | Arquivo único centralizando estado, layout e lógica. | Código modular em TypeScript (`components/`, `lib/`, `types/`). | Manutenibilidade e facilidade para evolução contínua. |

---

## 2. Detalhamento das Alterações

1. **Jornada de Usuário Reordenada:**
   * O sistema abre por padrão na **Visão do Solicitante**, permitindo o registro da demanda e visualização do protocolo de atendimento.
   * O operador pode alternar para a **Visão da Triagem** para conferir o enquadramento de severidade (P1 a P4), pontos de atenção e prazos de SLA.

2. **Apoio Analítico Sem Complexidade Excessiva:**
   * Identificação de dados confirmados versus hipóteses levantadas no relato.
   * Geração de perguntas objetivas com cópia em um clique para envio ao solicitante.
   * Eliminação de etapas intermediárias ou configurações desnecessárias.

3. **Exportação Padronizada:**
   * Recurso para copiar o parecer completo da triagem formatado para registro em tickets de Service Desk.
