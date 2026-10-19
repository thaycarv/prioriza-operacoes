# Casos de Teste e Validação Operacional

## Objetivo

Submeter a matriz operacional a cenários reais de saúde e regulação operacional para validar a aderência das quatro rotas de encaminhamento e a eficácia da triagem com suporte analítico.

## Cenários de Teste Validados

### Cenário A: Bloqueio na dispensação de quimioterápico
- **Contexto:** Travamento no sistema de dispensação da farmácia hospitalar para a oncologia com pacientes aguardando infusão.
- **Enquadramento:** Severidade Crítica P1 (Ação Imediata).
- **Meta de Início (SLA):** Imediato (até 1 hora).
- **Resultado:** Ação imediata com acionamento prioritário da equipe técnica.
- **Aprendizado:** Incidentes com risco direto à saúde exigem rota prioritária instantânea sem barreiras burocráticas.

### Cenário B: Autorização de cirurgia eletiva de alta complexidade
- **Contexto:** Solicitação de artroplastia sem laudo de imagem anexado e sem justificativa de indicação clínica exigida pelo protocolo regulatório.
- **Enquadramento:** Retorno ao Solicitante por Dados Incompletos.
- **Resultado:** O chamado não entra na fila técnica; retorna imediatamente ao solicitante com perguntas orientadas sobre os laudos ausentes.
- **Aprendizado:** Bloquear chamados incompletos na entrada evita retrabalho e protege o tempo da equipe técnica.

### Cenário C: Revisão do protocolo de teleconsulta para psicologia
- **Contexto:** Proposta de melhoria no formulário de triagem para o próximo ciclo semestral, sem impacto na operação vigente.
- **Enquadramento:** Backlog de Planejamento (P4).
- **Resultado:** Direcionamento ao repositório de melhorias contínuas sem disputar prioridade com a fila de incidentes.
- **Aprendizado:** Separar evolução programada de suporte operacional evita sobrecarga e mantém a fila diária limpa.

### Cenário D: Suspeita de lote com reação adversa (Farmacovigilância)
- **Contexto:** Unidade de internação relata episódios de hipotensão súbita após infusão de lote de antibiótico com volume crescente de alertas.
- **Enquadramento:** Alerta de Atenção Imediata (Triagem Humana Imediata).
- **Resultado:** Alerta preventivo acionado para farmacovigilância e equipe médica, com análise humana imediata mesmo antes do preenchimento formal de todos os campos.
- **Aprendizado:** A falta de dados administrativos nunca deve atrasar a contenção de um risco sanitário em potencial.

## Conclusões da Validação

A evolução do projeto confirmou que filas operacionais eficientes dispensam cálculos artificiais de pontos. O modelo de matriz de severidade (P1 a P4) combinado com rotas claras e supervisão humana (Human-in-the-Loop) oferece maior clareza, transparência e segurança para a tomada de decisão.
