# Prioriza | Case de Operações, Projetos e Processos

O **Prioriza** é um protótipo funcional de apoio à entrada, validação, encaminhamento e priorização de demandas operacionais. O projeto transforma solicitações dispersas e incompletas em um fluxo estruturado, com critérios explícitos, tratamento de exceções e decisão humana rastreável.

> **Escopo da validação:** a V1 foi testada exclusivamente com cenários simulados de uma operação de suporte de tecnologia B2B. Não houve implantação, validação com usuários reais ou medição de resultados em ambiente produtivo.

**[Acessar a demonstração](https://thaycarv.github.io/prioriza-operacoes/)**

## O problema operacional

Demandas de clientes, áreas internas e sistemas de monitoramento podem chegar por canais e formatos diferentes. Muitas são apresentadas como urgentes, mesmo quando faltam informações básicas para avaliar impacto, alcance, risco ou prazo.

Sem um processo comum, esse contexto favorece retrabalho, disputa de prioridade, perda de prazo e decisões baseadas principalmente na percepção de quem solicita. O desafio do case foi criar uma triagem mais consistente sem reduzir situações diferentes a uma pontuação automática.

## Abordagem e evolução da solução

A primeira hipótese foi utilizar uma matriz universal: toda demanda receberia uma pontuação e seguiria para a fila conforme o score. Os testes mostraram que essa abordagem falhava em três situações importantes: demandas incompletas, sinais potencialmente críticos sem dados suficientes e solicitações planejadas que não pertenciam à fila operacional.

O processo foi então redesenhado em quatro etapas:

1. estruturar a entrada com fatos observáveis e dados mínimos;
2. validar a completude antes de calcular qualquer score;
3. encaminhar a demanda por uma de quatro rotas;
4. aplicar a matriz somente quando ela for adequada, sempre com revisão da triagem.

Também foram separadas as visões do solicitante e da equipe de triagem. O solicitante recebe a confirmação e o protocolo; score, justificativas e pontos de conferência ficam na visão interna.

## Quatro rotas de encaminhamento

| Condição | Encaminhamento | Tratamento |
| --- | --- | --- |
| Dados mínimos completos e demanda operacional | **Score provisório** | O sistema calcula a pontuação e a triagem valida as informações e conclui a decisão. |
| Dados incompletos, sem indício crítico | **Retorno para complementação** | A demanda volta ao solicitante e não recebe score. |
| Dados incompletos, com indício crítico | **Triagem humana imediata** | A análise começa sem score e sem confirmação automática de incidente. |
| Demanda planejada | **Backlog** | A solicitação fica fora da fila operacional e não recebe uma pontuação forçada. |

## Matriz e regras de decisão

A matriz tem 100 pontos e combina cinco critérios. A camada interpretativa pode sugerir notas e justificativas, mas o cálculo é determinístico e a avaliação final pertence à triagem.

| Critério | O que avalia | Peso |
| --- | --- | ---: |
| Urgência | Em quanto tempo o atendimento precisa começar | 30 |
| Impacto | Efeito atual sobre a operação | 30 |
| Risco | Possíveis consequências se a demanda não for tratada | 20 |
| Abrangência | Alcance confirmado do problema | 10 |
| Dependências | Outras atividades que podem ficar impedidas | 10 |
| **Total** |  | **100** |

Cada nota de 1 a 5 utiliza toda a escala do respectivo peso:

```text
pontos = ((nota - 1) / 4) × peso
```

Assim, a nota 1/5 representa 0% do peso e a nota 5/5 representa 100%.

Principais regras de decisão:

- Urgência 5/5 exige início imediato, independentemente do score total.
- A Urgência é definida pela triagem; a criticidade percebida pelo solicitante não altera a análise inicial.
- SLA ou prazo formal e evolução do problema ficam fora do score. São pontos de conferência que podem exigir ações específicas.
- A ausência de SLA ou de tendência confirmada, isoladamente, não bloqueia o cálculo.
- A falta de informação em um critério central impede o score total.
- Informações ausentes não são substituídas por suposições.
- Toda pontuação precisa de justificativa, pode ser revisada e não encerra a decisão sozinha.

Detalhes adicionais estão em [`docs/matriz-e-regras.md`](docs/matriz-e-regras.md).

## Papel da IA e governança

A IA foi concebida como uma camada de apoio à análise. Ela pode:

- organizar os fatos informados;
- separar fatos, hipóteses e inferências;
- identificar informações ausentes;
- sugerir notas justificadas quando houver evidências;
- sinalizar linguagem associada a indícios críticos;
- propor perguntas para complementação.

Ela **não toma a decisão final**. Também não inventa dados, não calcula o score, não confirma incidentes, não define prioridade e não dispensa a revisão humana.

Na V1 pública, a interface utiliza regras determinísticas para demonstrar o processo. A integração com um modelo generativo foi apenas especificada como possibilidade futura e ainda precisa ser testada antes de qualquer uso operacional. Consulte [`docs/governanca-e-ia.md`](docs/governanca-e-ia.md).

## Testes realizados e principal aprendizado

Quatro cenários simulados foram usados para testar os limites da primeira matriz:

| Cenário simulado | Encaminhamento obtido | Aprendizado |
| --- | --- | --- |
| Cliente não finaliza compra | Score 53/100 e início imediato | Urgência máxima precisa de regra própria, sem inflar os demais critérios. |
| Atualização de dashboard com dados incompletos | Retorno para complementação, sem score | Uma demanda incompleta não deve entrar normalmente na fila de triagem. |
| Análise de nova funcionalidade | Backlog, sem score | Nem toda demanda pertence à matriz operacional. |
| Aumento de relatos de lentidão com dados incompletos | Triagem humana imediata, sem confirmar incidente | A falta de dados não pode ocultar sinais potencialmente críticos. |

O principal aprendizado foi que **a matriz universal falhou**. O score, sozinho, não representava adequadamente todas as situações. A solução deixou de ser uma fila única pontuada e passou a combinar quatro rotas, regras de exceção, pontos de conferência e revisão humana.

Esses testes verificaram a coerência lógica da V1 em cenários simulados. Eles não constituem validação estatística nem comprovam desempenho real. A descrição completa está em [`docs/testes-v1.md`](docs/testes-v1.md).

## Minha atuação

Projeto autoral de **Thayâne Carvalho Oliveira**, Engenheira de Produção, com atuação nas frentes de Operações, Projetos e Processos:

- diagnóstico e delimitação do problema operacional;
- levantamento dos campos mínimos e divisão de responsabilidades;
- construção, teste e revisão da matriz de priorização;
- desenho do fluxo, das quatro rotas e das regras de exceção;
- criação e análise dos cenários simulados;
- revisão da experiência do solicitante e da triagem;
- definição de governança, limites de automação e pontos de decisão humana;
- estruturação do protótipo funcional e da documentação do case.

A implementação do protótipo e a organização dos materiais contaram com apoio de IA. As regras de negócio, análises dos testes, decisões de processo e aprovações foram conduzidas pela autora.

## Resultados e aprendizados

Como resultado do trabalho, foi construído um processo demonstrável que:

- diferencia demandas pontuáveis, incompletas, potencialmente críticas e planejadas;
- explicita critérios, responsabilidades e exceções;
- protege a tomada de decisão contra score automático e informações presumidas;
- separa a experiência de quem solicita da análise feita pela triagem;
- documenta os limites da IA e da própria validação.

Não são apresentados ganhos percentuais, redução de prazo ou volume processado, pois o protótipo não operou em produção. O resultado comprovado neste estágio é o aprendizado de desenho de processo: uma matriz só é útil quando existem critérios de entrada, rotas alternativas e governança para as exceções.

## Stack real do projeto

- **Interface:** React e TypeScript;
- **build e desenvolvimento:** Vite;
- **estilos:** CSS;
- **publicação:** GitHub Pages;
- **automação de deploy:** GitHub Actions;
- **lógica da V1:** regras determinísticas executadas no front-end, sem banco de dados ou modelo generativo integrado.

## Limitações e próximos passos

A V1 não possui autenticação, banco de dados, integrações corporativas, persistência dos tickets ou histórico contínuo de decisões. Também não foi validada com usuários ou demandas reais.

Para evoluir o protótipo para um MVP, os próximos passos são:

1. testar o fluxo com usuários e cenários reais controlados;
2. revisar critérios e regras a partir das evidências coletadas;
3. implementar persistência, perfis de acesso e trilha de auditoria;
4. definir indicadores de processo antes de medir desempenho;
5. adicionar requisitos de segurança e integrações necessárias;
6. testar separadamente qualquer camada generativa, com monitoramento e revisão humana obrigatória.

## Estrutura do repositório

- [`src/`](src/): interface e regras determinísticas do protótipo;
- [`docs/matriz-e-regras.md`](docs/matriz-e-regras.md): critérios, fórmula e exceções;
- [`docs/testes-v1.md`](docs/testes-v1.md): cenários simulados e aprendizados;
- [`docs/governanca-e-ia.md`](docs/governanca-e-ia.md): responsabilidades e limites da automação;
- [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml): publicação automatizada no GitHub Pages.

---

**Demonstração:** [thaycarv.github.io/prioriza-operacoes](https://thaycarv.github.io/prioriza-operacoes/)
