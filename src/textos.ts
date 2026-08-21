// Textos institucionais e operacionais do Prioriza
// Tom equilibrado: profissional, claro e objetivo, sem excesso de informalidade e sem jargões desnecessários.

export const textos = {
  marca: {
    nome: "Prioriza",
    assinatura: "Gestão e Triagem de Demandas Operacionais",
    versao: "Protótipo Operacional",
  },

  apresentacao: {
    categoria: "GESTÃO DE OPERAÇÕES E PROCESSOS",
    titulo: "Triagem estruturada de demandas,",
    destaque: "com critérios objetivos e decisão humana.",
    descricao:
      "Fluxo para qualificar, organizar e direcionar solicitações em operações de suporte e tecnologia. O sistema identifica o impacto real no processo, aponta informações pendentes e orienta o encaminhamento adequado com apoio analítico.",
  },

  principios: [
    {
      numero: "01",
      titulo: "Entrada padronizada",
      descricao:
        "Registro baseado em fatos observáveis e volume confirmado de usuários afetados, evitando suposições preliminares.",
    },
    {
      numero: "02",
      titulo: "Tratamento de pendências",
      descricao:
        "Demandas com dados incompletos retornam com perguntas objetivas para complementação pelo solicitante.",
    },
    {
      numero: "03",
      titulo: "Decisão fundamentada",
      descricao:
        "O cálculo ponderado organiza a fila de atendimento, cabendo à equipe de operações a avaliação final.",
    },
  ],

  demonstracao: {
    categoria: "SIMULAÇÃO DO PROCESSO",
    titulo: "Simulação de Cenários Operacionais",
  },

  case: {
    categoria: "METODOLOGIA E GOVERNANÇA",
    tituloLinha1: "Por que matrizes universais de pontuação",
    tituloLinha2: "apresentam limitações na operação?",

    etapas: [
      {
        numero: "01",
        titulo: "Dispersão de solicitações",
        descricao:
          "Demandas chegam por múltiplos canais com diferentes níveis de detalhamento, frequentemente classificadas como urgentes sem fundamentação.",
      },
      {
        numero: "02",
        titulo: "Limitações da nota única",
        descricao:
          "Atribuir uma pontuação automática a qualquer solicitação pode induzir a erros em pedidos incompletos e mascarar sinais críticos.",
      },
      {
        numero: "03",
        titulo: "Quatro rotas de encaminhamento",
        descricao:
          "O modelo adota quatro caminhos distintos: fila operacional com score, retorno para complementação, triagem imediata para riscos e backlog para melhorias.",
      },
      {
        numero: "04",
        titulo: "Tecnologia como suporte analítico",
        descricao:
          "Modelos de suporte auxiliam na síntese de evidências e identificação de lacunas, mantendo a responsabilidade da decisão sob controle humano.",
      },
    ],
  },

  rodape: {
    titulo: "Prioriza: Projeto de Operações e Melhoria Contínua",
    observacao:
      "Protótipo desenvolvido para demonstrar fluxos de triagem operacional com suporte de modelos analíticos.",
    competencias:
      "Modelagem de processos, Gestão de chamados, Análise de impacto, Governança operacional",
  },
} as const;
