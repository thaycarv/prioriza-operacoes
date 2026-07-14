# Prioriza — Priorização de Demandas Operacionais

Protótipo funcional de apoio à entrada, validação, encaminhamento e priorização de demandas operacionais.

**[Acessar demonstração funcional](https://thaycarv.github.io/prioriza-operacoes/)**

> V1 testada com cenários simulados. O protótipo não foi implantado ou validado em ambiente produtivo.

## Visão geral

O Prioriza nasceu da seguinte questão operacional: como organizar demandas de diferentes origens quando todas chegam como urgentes, com níveis distintos de informação e sem critérios comuns de decisão?

A solução modela um processo com:

- entrada mínima orientada;
- validação das informações;
- quatro rotas de encaminhamento;
- matriz ponderada de 100 pontos;
- tratamento de demandas incompletas e indícios críticos;
- separação entre solicitante e triagem;
- decisão final humana e rastreável.

## Problema identificado

Demandas pouco estruturadas podem causar retrabalho, disputa de prioridade, perda de prazo e decisões baseadas apenas na percepção de urgência de quem solicita.

O projeto foi desenvolvido para tornar a entrada mais clara e a triagem mais consistente, sem transformar o score ou a IA em decisão automática.

## Processo modelado

| Situação | Encaminhamento |
| --- | --- |
| Demanda operacional com dados mínimos | Cálculo do score e validação da triagem |
| Informação obrigatória ausente, sem indício crítico | Retorno para complementação |
| Informação incompleta com indício crítico | Triagem humana imediata, sem score |
| Demanda planejada | Backlog |

O solicitante recebe apenas a confirmação e o protocolo. Score, justificativas e pontos para conferência ficam restritos à visão da triagem.

## Matriz de pontuação

| Critério | Peso |
| --- | ---: |
| Urgência | 30 |
| Impacto | 30 |
| Risco | 20 |
| Abrangência | 10 |
| Dependências | 10 |
| **Total** | **100** |

A conversão utiliza toda a escala:

```text
pontos = ((nota - 1) / 4) × peso
```

Assim, 1/5 vale zero e 5/5 utiliza o peso completo. Urgência 5/5 aciona início imediato do atendimento, independentemente do total.

SLA e evolução do problema permanecem fora do score. Eles funcionam como pontos de conferência e podem acionar providências específicas sem distorcer a pontuação.

## Testes da V1

| Cenário | Resultado esperado e obtido |
| --- | --- |
| A — cliente não finaliza compra | Score 53/100 e início imediato |
| B — atualização de dashboard incompleta | Retorno para complementação, sem score |
| C — análise de nova funcionalidade | Encaminhamento ao backlog |
| D — aumento de relatos de lentidão | Triagem humana imediata, sem confirmar incidente |

Os testes revelaram que uma matriz universal não tratava adequadamente todas as situações. Por isso, o fluxo foi redesenhado para combinar score, regras de exceção e revisão humana.

## Papel proposto para a IA

A camada de IA foi modelada para:

- identificar informações ausentes;
- separar fatos, hipóteses e inferências;
- sugerir classificações justificadas;
- sinalizar indícios críticos;
- formular perguntas para complementação.

A IA não calcula o score, não confirma incidentes e não define a prioridade final. A V1 demonstrativa utiliza regras determinísticas; a integração com um modelo generativo permanece como evolução futura.

## Decisões de governança

- A criticidade percebida pelo solicitante não influencia a análise inicial.
- O solicitante fornece fatos; a triagem define a Urgência.
- Informação ausente não é substituída por suposição.
- Demandas críticas incompletas não recebem prioridade automática: seguem para triagem humana.
- Toda pontuação precisa de justificativa e pode ser revisada.

## Minha atuação no projeto

Projeto autoral de **Thayâne Carvalho Oliveira**, Engenheira de Produção.

Responsabilidades desenvolvidas no case:

- diagnóstico do problema operacional;
- definição dos campos e das responsabilidades;
- construção e revisão da matriz de priorização;
- desenho das rotas e exceções;
- teste de estresse com cenários;
- revisão da experiência do solicitante e da triagem;
- definição dos limites da automação e da decisão humana.

A implementação do protótipo e a organização dos materiais contaram com apoio de IA. As regras de negócio, avaliações dos testes, decisões de processo e aprovações foram conduzidas pela autora.

## Competências demonstradas

Modelagem de processos · Melhoria contínua · Priorização · Gestão de riscos · SLAs · Experiência do usuário · Requisitos de negócio · Governança de IA

## Limitações e próximos passos

Esta versão não possui autenticação real, banco de dados, integrações corporativas ou operação contínua. Uma evolução para MVP exigiria persistência dos tickets, perfis de acesso, histórico de decisões, indicadores, segurança e testes com usuários reais.

## Conteúdo do repositório

- [`docs/matriz-e-regras.md`](docs/matriz-e-regras.md): critérios, fórmula e regras de exceção.
- [`docs/testes-v1.md`](docs/testes-v1.md): cenários e aprendizados da V1.
- [`docs/governanca-e-ia.md`](docs/governanca-e-ia.md): limites da automação e responsabilidades.
- [`src/`](src/): implementação da interface demonstrativa.
