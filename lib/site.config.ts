/**
 * ============================================================
 *  CONTEÚDO EDITÁVEL DO SITE
 *  Tudo o que aparece no site vem daqui. Os textos abaixo são
 *  GENÉRICOS e PROVISÓRIOS: revise e troque pelos dados reais
 *  da academia antes de publicar.
 * ============================================================
 */

export interface Modality { name: string; text: string; image: string }
export interface GalleryItem { label: string; image: string }
export interface Plan {
  name: string;
  description: string;
  /** Só o valor, ex.: "129,90". Vazio = mostra "Consulte". */
  price: string;
  period: string;
  features: string[];
  highlight?: boolean;
}
export interface Stat { label: string; value: number; suffix?: string }
export interface Testimonial { name: string; detail: string; text: string }

export const site = {
  name: "Sua Academia",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://seu-projeto.pages.dev",
  description:
    "Academia com estrutura completa, orientação profissional e ambiente de alto padrão. Conheça as modalidades, os planos e faça sua matrícula.",

  /** Fundo do hero. Use "video" (mp4) OU "image". Vazio = arte dourada gerada no código. */
  hero: { video: "", poster: "", image: "" },

  /** Número com DDI + DDD, só dígitos. Ex.: "5571999999999". Vazio = botões levam ao formulário. */
  whatsapp: { number: "", message: "Olá! Quero conhecer a academia e saber mais sobre os planos." },
  phone: "",
  email: "",

  address: {
    line1: "Endereço da academia",
    line2: "Cidade – UF",
    /** Texto usado no mapa incorporado (ex.: "Rua X, 100, Cidade, UF"). Vazio = mapa oculto. */
    mapQuery: "",
  },

  hours: [
    { days: "Segunda a sexta", time: "Informe o horário" },
    { days: "Sábado", time: "Informe o horário" },
    { days: "Domingo e feriados", time: "Informe o horário" },
  ],

  /** Links completos (https://...). Redes vazias não aparecem no site. */
  social: { instagram: "", facebook: "", youtube: "", tiktok: "" },

  about: {
    title: "Um ambiente feito para quem leva o treino a sério.",
    paragraphs: [
      "Aqui o foco é a sua evolução. Espaço, equipamentos e orientação trabalhando juntos para que cada treino conte.",
      "Do primeiro dia à sua melhor versão, você treina com método, segurança e a energia de quem está no lugar certo.",
    ],
    points: [
      { title: "Estrutura para treinar", text: "Equipamentos e espaços pensados para cada tipo de treino." },
      { title: "Orientação profissional", text: "Acompanhamento para treinar com segurança e método." },
      { title: "Ambiente que motiva", text: "Energia, foco e constância em cada treino." },
    ],
    imageMain: "",
    imageSecond: "",
  },

  modalities: [
    { name: "Musculação", text: "Força, hipertrofia e definição com acompanhamento e método.", image: "" },
    { name: "Funcional", text: "Movimentos completos para mobilidade, resistência e desempenho no dia a dia.", image: "" },
    { name: "Cardio", text: "Condicionamento e saúde do coração, respeitando o seu ritmo.", image: "" },
    { name: "Personal trainer", text: "Plano individual, atenção total e metas traçadas sob medida.", image: "" },
    { name: "Aulas coletivas", text: "Energia em grupo para treinar com intensidade e motivação.", image: "" },
  ] as Modality[],

  gallery: [
    { label: "Área de musculação", image: "" },
    { label: "Espaço funcional", image: "" },
    { label: "Cardio", image: "" },
    { label: "Estúdio de aulas", image: "" },
    { label: "Treino personalizado", image: "" },
    { label: "O ambiente", image: "" },
  ] as GalleryItem[],

  plans: [
    {
      name: "Essencial",
      description: "Para começar com consistência.",
      price: "",
      period: "/mês",
      features: ["Acesso à área de treino", "Avaliação inicial", "Treino orientado"],
    },
    {
      name: "Performance",
      description: "O mais escolhido por quem quer evoluir.",
      price: "",
      period: "/mês",
      features: ["Tudo do Essencial", "Aulas coletivas", "Acompanhamento da evolução", "Acesso estendido"],
      highlight: true,
    },
    {
      name: "Elite",
      description: "Atenção máxima e resultado sob medida.",
      price: "",
      period: "/mês",
      features: ["Tudo do Performance", "Sessões com personal trainer", "Plano individualizado"],
    },
  ] as Plan[],

  /** Troque os números pelos dados reais e mude demo para false (some o aviso). */
  stats: {
    demo: true,
    items: [
      { label: "Alunos ativos", value: 500, suffix: "+" },
      { label: "Modalidades", value: 5 },
      { label: "Horas de treino por semana", value: 80, suffix: "h" },
      { label: "Anos de história", value: 10, suffix: "+" },
    ] as Stat[],
  },

  phrases: ["Disciplina", "Constância", "Força", "Evolução", "Superação"],

  /** Textos demonstrativos. Substitua por avaliações reais (com autorização do aluno) e mude demo para false. */
  testimonials: {
    demo: true,
    items: [
      { name: "Nome do aluno", detail: "Modalidade ou tempo de casa", text: "Texto demonstrativo: aqui entra o depoimento real de um aluno sobre a experiência de treinar na academia." },
      { name: "Nome da aluna", detail: "Modalidade ou tempo de casa", text: "Texto demonstrativo: aqui entra uma avaliação sobre o atendimento, a estrutura ou os resultados alcançados." },
      { name: "Nome do aluno", detail: "Modalidade ou tempo de casa", text: "Texto demonstrativo: aqui entra mais um depoimento. Edite em lib/site.config.ts." },
    ] as Testimonial[],
  },
};
