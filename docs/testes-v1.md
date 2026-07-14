# Testes da V1

## Objetivo

Submeter a primeira matriz a situações diferentes para verificar se o score, sozinho, seria suficiente para decidir o encaminhamento.

## Resultados

### Cenário A — Cliente não finaliza compra

- Um cliente confirmado; outros afetados são apenas hipótese.
- Impacto 3/5 e Abrangência 1/5.
- Urgência 5/5 definida pela triagem.
- Resultado: 53/100 e início imediato.
- Aprendizado: urgência máxima precisa de regra própria, sem elevar artificialmente os demais critérios.

### Cenário B — Atualização de dashboard

- Prazo informado, mas ausência de dados necessários para critérios centrais.
- Sem evidência crítica suficiente.
- Resultado: devolução para complementação, sem score.
- Aprendizado: demandas incompletas não devem entrar normalmente na fila de triagem.

### Cenário C — Análise de nova funcionalidade

- Natureza planejada e sem necessidade operacional imediata.
- Resultado: backlog, sem aplicação forçada da matriz operacional.
- Aprendizado: nem toda demanda precisa receber score.

### Cenário D — Aumento de lentidão

- Aumento de relatos e crescimento contínuo, mas dados centrais incompletos.
- Resultado: triagem humana imediata, sem score e sem confirmação automática de incidente.
- Aprendizado: a ausência de informações não pode ocultar indícios potencialmente críticos.

## Redesenho resultante

O teste levou à substituição de uma matriz universal por um processo com quatro rotas. SLA e Agravamento foram retirados do score e transformados em pontos de conferência. Também foram separadas as visões do solicitante e da triagem.

## Limite da validação

Os resultados confirmam a coerência lógica da V1 em cenários simulados. Não representam validação estatística, implantação real ou desempenho comprovado em ambiente produtivo.

