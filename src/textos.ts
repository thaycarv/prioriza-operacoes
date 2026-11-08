// Textos institucionais e operacionais do RadarSocial Prioriza
// Módulo de triagem operacional, governança de incidentes e qualificação de demandas do ecossistema RadarSocial.

export const textos = {
  marca: {
    nome: "RadarSocial Prioriza",
    sigla: "RS",
    assinatura: "Triagem & Qualificação Operacional de Demandas",
    modulo: "Módulo Integrado ao RadarSocial",
    versao: "Cockpit Operacional",
  },

  apresentacao: {
    categoria: "TRIAGEM OPERACIONAL & GOVERNANÇA DE DEMANDAS",
    titulo: "Qualificação inteligente de demandas e incidentes",
    destaque: "Human-in-the-Loop",
    descricao:
      "Cockpit de triagem operacional conectado ao RadarSocial: separa urgências reais de infraestrutura e conformidade sanitária de solicitações rotineiras, cobrando requisitos obrigatórios do MROSC antes de abrir tarefas para o comitê gestor.",
  },

  principios: [
    {
      numero: "01",
      titulo: "Fatos Observáveis",
      descricao:
        "Registrar o evento físico concreto ocorrido nos polos comunitários e o número real de beneficiários ou equipamentos afetados.",
    },
    {
      numero: "02",
      titulo: "Retorno Guiado ao Solicitante",
      descricao:
        "Solicitações de recursos ou insumos sem cotações, notas fiscais ou laudos retornam imediatamente com orientações do MROSC, sem sobrecarregar a coordenação.",
    },
    {
      numero: "03",
      titulo: "Matriz de Severidade com SLA (P1 a P4)",
      descricao:
        "A criticidade operacional define o tempo de início da resposta técnica (de até 1 hora a ciclos semestrais), mantendo a supervisão humana obrigatória em cada decisão.",
    },
  ],

  demonstracao: {
    categoria: "SIMULAÇÃO DO ECOSSISTEMA RADARSOCIAL",
    titulo: "Cenários Operacionais da Carteira de Programas Sociais",
  },

  rodape: {
    titulo: "RadarSocial Prioriza · Gestão de Operações e Eficiência de Processos",
    observacao:
      "Módulo de triagem operacional desenvolvido por Thayâne Carvalho (Engenharia de Produção & Nutrição) para qualificar fluxos de entrada, gerenciar capacidade produtiva e eliminar retrabalho em programas sociais.",
    competencias: "Engenharia de Processos • Triagem Operacional • Governança MROSC • Conformidade Sanitária (Anvisa) • Human-in-the-Loop",
  },
} as const;
