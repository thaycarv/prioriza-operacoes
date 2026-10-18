// Textos institucionais e operacionais do Prioriza
// Tom equilibrado: profissional, claro e objetivo, sem excesso de informalidade e sem jargões desnecessários.

export const textos = {
  marca: {
    nome: "Prioriza",
    assinatura: "Triagem Operacional e Regulação em Saúde",
    versao: "Protótipo Operacional",
  },

  apresentacao: {
    categoria: "GESTÃO DE OPERAÇÕES E PROCESSOS EM SAÚDE",
    titulo: "Triagem de solicitações operacionais e assistenciais",
    destaque: "como apoio à decisão humana.",
    descricao:
      "Fluxo para qualificar, organizar e direcionar demandas. O sistema identifica o impacto real, aponta pendências e orienta o caminho mais adequado.",
  },

  principios: [
    {
      numero: "01",
      titulo: "Entrada padronizada",
      descricao:
        "Registro baseado em fatos operacionais/clínicos e volume confirmado de pessoas afetadas, separando relatos preliminares de evidências técnicas.",
    },
    {
      numero: "02",
      titulo: "Tratamento de pendências",
      descricao:
        "Solicitações sem laudos ou dados essenciais retornam com perguntas objetivas para complementação, evitando indeferimentos arbitrários.",
    },
    {
      numero: "03",
      titulo: "Decisão fundamentada",
      descricao:
        "A matriz de severidade (P1 a P4) e as regras de emergência organizam a fila com metas claras de SLA, cabendo à equipe técnica a validação final (Human-in-the-Loop).",
    },
  ],

  demonstracao: {
    categoria: "SIMULAÇÃO DO PROCESSO",
    titulo: "Simulação de Cenários Operacionais em Saúde",
  },

  case: {
    categoria: "METODOLOGIA E GOVERNANÇA",
    tituloLinha1: "Por que matrizes universais de pontuação",
    tituloLinha2: "apresentam limitações na operação em saúde?",

    etapas: [
      {
        numero: "01",
        titulo: "Dispersão de solicitações",
        descricao:
          "Demandas chegam por múltiplos canais (consultórios, farmácias, unidades assistenciais) frequentemente marcadas de forma incorreta e sem fundamentação técnica.",
      },
      {
        numero: "02",
        titulo: "Limitações da nota única",
        descricao:
          "Atribuir um score cego a pedidos incompletos pode induzir a erros de auditoria, atrasar emergências e mascarar sinais críticos de risco à operação.",
      },
      {
        numero: "03",
        titulo: "Quatro rotas de encaminhamento",
        descricao:
          "O modelo adota quatro caminhos: fila operacional qualificada (P1 a P4), retorno para complementação documental, triagem imediata para riscos críticos e backlog para melhorias.",
      },
      {
        numero: "04",
        titulo: "Tecnologia como suporte analítico",
        descricao:
          "Modelos de inteligência auxiliam na síntese de evidências e identificação de lacunas, mantendo a responsabilidade da decisão sob controle do profissional responsável.",
      },
    ],
  },

  rodape: {
    titulo: "Prioriza: Projeto de Operações e Melhoria Contínua em Saúde",
    observacao:
      "Protótipo desenvolvido para demonstrar fluxos de triagem e regulação operacional com suporte de modelos analíticos.",
    competencias: "",
  },
} as const;
