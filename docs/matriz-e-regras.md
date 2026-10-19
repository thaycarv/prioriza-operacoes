# Matriz Operacional e Regras de Triagem (P1 a P4)

## Níveis de Criticidade & Severidade (Padrão ITSM / Operações de Saúde)

| Nível | Classificação | Critérios Operacionais | Meta de Início (SLA) | Rota de Encaminhamento |
| :---: | :--- | :--- | :--- | :--- |
| **P1** | **Crítico (Ação Imediata)** | Interrupção total de serviço essencial, ausência de contorno ou risco direto à vida/segurança | **Imediato (até 1h)** | Fila de Ação Imediata |
| **P2** | **Alto Impacto** | Operação parcialmente comprometida sem contorno, volume expressivo de afetados (>= 10) ou ocorrências em aceleração | **Em até 4 horas** | Fila Operacional Prioritária |
| **P3** | **Médio / Regular** | Dificuldade ou lentidão operacional com contorno viável ativo ou escopo pontual (< 10 afetados) | **No mesmo dia / até 24h** | Fila Operacional Regular |
| **P4** | **Baixo / Planejamento** | Demanda de melhoria de longo prazo ou sem impacto nas rotinas atuais | **Ciclos de Roadmap** | Backlog de Planejamento |

---

## Dimensões de Avaliação da Matriz

1. **Impacto no Processo**:
   - *Interrompido (Parada Total)*: Atividades operacionais completamente paralisadas (Impacto Crítico).
   - *Parcialmente Comprometido*: Etapas essenciais bloqueadas (Impacto Alto).
   - *Dificuldade / Lentidão*: Operação continua com esforço adicional (Impacto Moderado).
   - *Não Afetado*: Rotina normal (Impacto Baixo).

2. **Alternativa Temporária (Contorno)**:
   - *Sem contorno*: A equipe não tem como continuar sem a resolução (Agrava severidade).
   - *A verificar*: Existência de procedimento alternativo ainda não confirmada.
   - *Com contorno viável*: Procedimento provisório ativo (Mitiga a severidade imediata).

3. **Abrangência Confirmada**:
   - *Ampla Escala (>= 50)*: Impacto generalizado.
   - *Escala Departamental (10 a 49)*: Múltiplas equipes ou clientes impactados.
   - *Ocorrência Pontual (< 10)*: Incidente restrito.

4. **Evolução da Ocorrência (Tendência)**:
   - *Aumentando rapidamente*: Propagação acelerada.
   - *Oscilando*: Intermitente.
   - *Estável*: Sintoma controlado.

5. **Compromisso de Prazo (SLA)**:
   - Verificação de existência de prazo contratual ou regulatório formal (ANS, catálogo interno).

---

## Quatro Rotas Estratégicas de Encaminhamento

1. **Fila Operacional Qualificada (P1 a P3)**: Dados mínimos validados, severidade apurada e ticket posicionado na fila de atendimento.
2. **Devolver para Complementação**: Chamados sem laudos ou informações fundamentais retornam imediatamente com perguntas orientadas, evitando retrabalho.
3. **Triagem Imediata de Risco**: Sinais críticos identificados mesmo com formulário incompleto. O atendimento começa de imediato enquanto a documentação é complementada.
4. **Backlog de Planejamento (P4)**: Demandas de melhoria são organizadas para ciclos futuros sem concorrer com a fila de suporte diário.
