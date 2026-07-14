# Governança e papel da IA

## Princípio central

A IA apoia a análise, mas não substitui a decisão operacional.

## A camada de IA pode

- organizar os fatos informados;
- separar hipóteses e inferências;
- identificar informações ausentes;
- sugerir notas com evidência e nível de confiança;
- sinalizar linguagem associada a indícios críticos;
- sugerir perguntas para complementação.

## A camada de IA não pode

- inventar dados ausentes;
- calcular o score final;
- confirmar a existência de incidente;
- declarar a prioridade final;
- usar a criticidade percebida para ajustar notas;
- dispensar a revisão humana.

## Responsabilidades por perfil

### Solicitante

Relata fatos conhecidos, informa o alcance confirmado e indica se conhece SLA ou prazo formal. Após o envio, visualiza apenas a confirmação e o protocolo.

### Sistema

Valida campos, aplica regras de encaminhamento, calcula o score determinístico e registra a decisão.

### Triagem

Confere as informações, define a Urgência, valida risco e dependências, verifica SLA e conclui a avaliação.

## Transparência da V1

O protótipo público demonstra o processo por meio de regras determinísticas. A integração generativa foi especificada conceitualmente e deve ser testada separadamente antes de qualquer uso operacional.

