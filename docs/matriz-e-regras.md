# Matriz e regras da V1

## Critérios ponderados

| Critério | Definição | Peso |
| --- | --- | ---: |
| Urgência | Em quanto tempo o atendimento precisa começar | 30 |
| Impacto | Efeito atual sobre a operação | 30 |
| Risco | Consequências possíveis se a demanda não for tratada | 20 |
| Abrangência | Alcance confirmado do problema | 10 |
| Dependências | Outras atividades que podem ficar impedidas | 10 |

## Conversão da nota

`pontos = ((nota - 1) / 4) × peso`

| Nota | Parcela do peso |
| ---: | ---: |
| 1/5 | 0% |
| 2/5 | 25% |
| 3/5 | 50% |
| 4/5 | 75% |
| 5/5 | 100% |

O score é calculado pelo sistema. A camada interpretativa apenas sugere notas e justificativas quando existem evidências suficientes.

## Regras independentes do score

- Urgência 5/5 exige início imediato.
- SLA ou prazo formal é validado internamente e não compõe a pontuação.
- Evolução do problema é tratada como ponto de conferência.
- Ausência de SLA ou de tendência confirmada não bloqueia o score por si só.
- Falta de informação em um critério central impede o cálculo total.

## Encaminhamentos

1. Dados mínimos completos: score provisório e validação da triagem.
2. Dados incompletos sem indício crítico: retorno para complementação.
3. Dados incompletos com indício crítico: triagem humana imediata, sem score.
4. Demanda planejada: backlog.

