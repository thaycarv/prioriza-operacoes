// Textos institucionais e operacionais do Prioriza
// Tom equilibrado: profissional, claro, direto e sem jargões.

export const textos = {
  marca: {
    nome: "Prioriza",
    assinatura: "Triagem Operacional e Regulação em Saúde",
    versao: "Protótipo Operacional",
  },

  apresentacao: {
    categoria: "OPERAÇÕES & GESTÃO DE PROCESSOS",
    titulo: "Triagem de chamados",
    destaque: "",
    descricao:
      "O Prioriza ajuda a separar o que é emergência do que pode seguir no fluxo normal, cobrando dados que faltam antes de abrir a tarefa.",
  },

  principios: [
    {
      numero: "01",
      titulo: "Fatos",
      descricao:
        "Registrar o que realmente aconteceu e quantas pessoas foram afetadas.",
    },
    {
      numero: "02",
      titulo: "Retorno",
      descricao:
        "Pedidos que chegam sem laudos ou informações básicas voltam direto ao solicitante com orientações claras, sem travar a equipe.",
    },
    {
      numero: "03",
      titulo: "Prioridade com critério",
      descricao:
        "A criticidade (P1 a P4) define prazos para cada caso, preservando a autonomia da equipe técnica na decisão final.",
    },
  ],

  demonstracao: {
    categoria: "SIMULAÇÃO DO PROCESSO",
    titulo: "Simulação de Cenários Operacionais em Saúde",
  },

  comoFunciona: {
    categoria: "COMO FUNCIONA NA PRÁTICA",
    titulo:
      "Por que filas únicas e pontuações automáticas costumam falhar na operação real?",
    etapas: [
      {
        numero: "01",
        titulo: "Volume desordenado",
        descricao:
          "Pedidos chegam por mensagens, e-mails e formulários. Sem um filtro inicial, chamados graves disputam espaço com dúvidas simples.",
      },
      {
        numero: "02",
        titulo: "O perigo de dar nota a pedido incompleto",
        descricao:
          "Calcular prioridade para um pedido que não tem informações básicas gera prazos irreais e atrasa quem mais precisa.",
      },
      {
        numero: "03",
        titulo: "Quatro caminhos bem definidos",
        descricao:
          "Cada chamado vai para o lugar certo: atendimento urgente, fila com prioridade, devolução para o solicitante ou planejamento futuro.",
      },
      {
        numero: "04",
        titulo: "Tecnologia como apoio, não como dona da decisão",
        descricao:
          "O sistema resume fatos e sugere as perguntas certas, mas quem avalia e bate o martelo é quem conhece a operação.",
      },
    ],
  },

  rodape: {
    titulo: "Prioriza: Gestão de Operações e Eficiência de Processos",
    observacao:
      "Ferramenta desenvolvida para estruturar fluxos de atendimento, reduzir retrabalho e apoiar equipes na tomada de decisão.",
    competencias: "",
  },
} as const;
