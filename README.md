# Prioriza: Gestão e Triagem de Demandas Operacionais

O **Prioriza** é um protótipo funcional para organização, validação e direcionamento de solicitações em operações de suporte e tecnologia. O projeto transforma relatos dispersos em fluxos estruturados, com critérios objetivos de avaliação, tratamento de exceções e decisão humana fundamentada.

Consulte o [Catálogo de Melhorias](MELHORIAS.md) para detalhes da evolução do projeto.

---

## 1. O Cenário Operacional

Em rotinas de suporte e operações, solicitações costumam chegar por múltiplos canais sem padronização. Muitas demandas são registradas como urgentes sem informações mínimas que permitam mensurar impacto real, alcance ou dependências técnicas.

Esse contexto gera:
* Disputas sobre a prioridade de atendimento;
* Retrabalho da equipe na coleta tardia de informações;
* Risco de subestimar incidentes críticos descritos de forma superficial;
* Decisões orientadas apenas pela percepção subjetiva de quem solicita.

---

## 2. Quatro Rotas de Encaminhamento

Para evitar distorções de uma fórmula única aplicada a cenários heterogêneos, o Prioriza distribui as solicitações em quatro fluxos:

| Situação | Encaminhamento | Tratamento |
| :--- | :--- | :--- |
| **Dados completos e demanda operacional** | **Fila Normal (Score Provisório)** | Cálculo determinístico da pontuação (0 a 100 pontos) e validação da janela de início pela equipe técnica. |
| **Dados essenciais ausentes** | **Retorno para Complementação** | A demanda não recebe pontuação forçada e retorna com perguntas objetivas para esclarecimento. |
| **Sinais de risco ou agravamento** | **Triagem Humana Imediata** | A apuração técnica inicia imediatamente, sem aguardar score ou confirmação formal prévia. |
| **Demanda planejada ou melhoria** | **Backlog de Planejamento** | Direcionamento para ciclos de planejamento, sem concorrer com a fila de incidentes imediatos. |

---

## 3. Matriz Ponderada de 100 Pontos

Nas demandas elegíveis para pontuação, aplica-se a matriz determinística composta por 5 dimensões:

| Critério | O que avalia | Peso |
| :--- | :--- | ---: |
| **Urgência** | Prazo necessário para início do atendimento (definido pela triagem) | 30 |
| **Impacto** | Nível de comprometimento do processo (interrompido, parcial ou com lentidão) | 30 |
| **Risco** | Possibilidade de agravamento e existência de solução de contorno | 20 |
| **Abrangência** | Volume confirmado de usuários ou clientes atingidos | 10 |
| **Dependências** | Impacto direto em outras áreas ou processos subsequentes | 10 |
| **Total** | | **100** |

```text
pontos = ((nota - 1) / 4) * peso
```

*Regra de Urgência Máxima:* Se a triagem definir início imediato (nota 5/5), o chamado recebe prioridade operacional máxima, independentemente do score total acumulado.

---

## 4. Apoio Analítico e Governança

O sistema dispõe de recursos de apoio à triagem:
* **Separação entre Fatos e Hipóteses:** Identifica evidências confirmadas e isola suposições do solicitante;
* **Perguntas Objetivas para Esclarecimento:** Gera sugestões de questionamentos para demandas incompletas;
* **Exportação Estruturada:** Permite copiar o parecer em formato padronizado para registro em tickets de Service Desk (Jira, ServiceNow, Zendesk ou Slack);
* **Governança:** A tecnologia atua como suporte analítico, permanecendo a decisão e responsabilidade final sob controle humano.

---

## 5. Estrutura Técnica

* **Interface:** React + TypeScript + Vite;
* **Estilização:** CSS modular, responsivo e com foco em usabilidade;
* **Arquitetura:** Componentes isolados em `components/`, regras em `lib/` e tipagens em `types/`.

---

## 6. Instruções de Execução

1. Clone o repositório:
   ```bash
   git clone https://github.com/thaycarv/prioriza-operacoes.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Inicie o ambiente local:
   ```bash
   npm run dev
   ```
4. Acesse no navegador: `http://localhost:5173/prioriza-operacoes/`

---

## 7. Créditos

Projeto autoral desenvolvido por **Thayâne Carvalho**, voltado para **Processos, Gestão de Operações e Melhoria Contínua**.
