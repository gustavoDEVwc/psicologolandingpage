/* ===== ÚNICO ARQUIVO QUE VOCÊ EDITA PARA CADA CLIENTE ===== */
window.SITE = {
  tema: "salvia", // salvia | azul | lavanda (ou crie um em style.css)
  nome: "Dra. Helena Duarte",
  titulo: "Psicóloga clínica",
  crp: "CRP 08/00000", // obrigatório na publicidade de psicólogos
  whatsapp: "5545999999999", // só números, com DDI
  telefone: "(45) 99999-9999",
  email: "contato@helenaduarte.com.br",
  endereco: "Rua Exemplo, 123, sala 4 - Centro, Cascavel - PR",
  atendimento: "Presencial e online",

  hero: {
    titulo: "Um espaço seguro para você ser ouvido, no seu ritmo.",
    texto:
      "Terapia individual para adultos, com escuta cuidadosa, sigilo e sem julgamentos.",
  },
  acolhimento: {
    titulo: "Procurar ajuda já é um passo importante",
    texto:
      "Ansiedade, cansaço, luto, uma fase difícil nos relacionamentos ou a sensação de estar perdido. Você não precisa ter certeza do que sente para começar. A primeira conversa serve para nos conhecermos.",
  },
  // Tópicos: adicione, remova ou edite à vontade
  topicos: [
    {
      titulo: "Ansiedade e estresse",
      texto: "Preocupação constante, insônia, tensão e dificuldade de relaxar.",
    },
    {
      titulo: "Depressão e tristeza",
      texto: "Falta de ânimo, desesperança e sensação de vazio.",
    },
    {
      titulo: "Relacionamentos",
      texto: "Conflitos, dependência emocional, separações e limites.",
    },
    {
      titulo: "Autoestima e autoconhecimento",
      texto: "Inseguranças, autocobrança e busca de sentido.",
    },
    {
      titulo: "Luto e transições",
      texto: "Perdas, mudanças de carreira, maternidade e novas fases.",
    },
    {
      titulo: "Burnout e trabalho",
      texto: "Exaustão, pressão e dificuldade de equilibrar a vida.",
    },
  ],
  // Como funciona
  passos: [
    {
      titulo: "Você escolhe um horário",
      texto: "Reserve abaixo e conte, se quiser, o que o trouxe até aqui.",
    },
    {
      titulo: "Confirmamos pelo WhatsApp",
      texto: "Respondo para confirmar o horário e tirar dúvidas.",
    },
    {
      titulo: "Primeira sessão",
      texto: "Conversamos sobre sua história e definimos juntos como seguir.",
    },
  ],
  sobre: {
    titulo: "Sobre a profissional",
    foto: "", // ex.: 'fotos/helena.jpg' (deixe vazio para usar iniciais)
    textos: [
      "Sou psicóloga clínica há 8 anos, com formação em Terapia Cognitivo-Comportamental. Acredito que a terapia funciona quando existe confiança e respeito ao tempo de cada pessoa.",
      "Atendo adultos presencialmente e por videochamada, em sessões de 50 minutos.",
    ],
    formacao: [
      "Graduação em Psicologia, UNIOESTE",
      "Especialização em TCC",
      "Supervisão clínica contínua",
    ],
  },
  faq: [
    {
      p: "Como funciona a primeira sessão?",
      r: "É uma conversa de acolhimento. Você fala sobre o que o trouxe e eu explico como a terapia funciona. Não há obrigação de continuar.",
    },
    {
      p: "Quanto tempo dura cada sessão?",
      r: "Cerca de 50 minutos, geralmente uma vez por semana.",
    },
    {
      p: "O atendimento online funciona?",
      r: "Sim. Tem a mesma validade e eficácia do presencial, só precisa de internet estável e um lugar reservado.",
    },
    {
      p: "Tudo o que eu disser é sigiloso?",
      r: "Sim. O sigilo é uma obrigação ética prevista no Código de Ética do Psicólogo.",
    },
    {
      p: "E se eu precisar remarcar?",
      r: "Avise com pelo menos 24 horas de antecedência pelo WhatsApp.",
    },
  ],

  // ----- Agendamento -----
  agendamento: {
    valor: "R$ 180,00", // texto livre; deixe '' para ocultar
    duracaoMin: 50,
    diasAFrente: 45, // quantos dias no futuro aparecem
    antecedenciaHoras: 4, // não permite reservar em cima da hora
    modalidades: ["Presencial", "Online"],
    // 0=dom 1=seg 2=ter 3=qua 4=qui 5=sex 6=sáb
    horarios: {
      1: ["09:00", "10:00", "14:00", "15:00", "16:00"],
      2: ["09:00", "10:00", "14:00", "15:00", "16:00"],
      3: ["14:00", "15:00", "16:00", "17:00"],
      4: ["09:00", "10:00", "14:00", "15:00", "16:00"],
      5: ["09:00", "10:00", "11:00"],
    },
    // Horários já preenchidos ou folgas, formato 'AAAA-MM-DD' (dia todo) ou 'AAAA-MM-DD HH:MM'
    indisponiveis: ["2026-12-25", "2026-12-24 14:00"],
  },

  // ----- Privacidade (LGPD) -----
  privacidade: { atualizadoEm: "09/11/2026" },
};
