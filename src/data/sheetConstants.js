export const STORAGE_KEY = "runarcana_sheet_v1";

export const ATTRS = ["FOR", "DES", "CON", "INT", "SAB", "CAR"];
export const PROF = 2;

export const CRITICOS = ["19-20", "20"];
export const MULTS = ["x2", "x3"];
export const TIPOS_DANO = ["Corte", "Perfuração", "Impacto", "Fogo", "Gelo", "Veneno", "Energia"];
export const ALCANCES_ATAQUE = ["Corpo a corpo", "Curto", "Médio", "Longo"];

export const TIPOS_MAGIA = ["Truque", "Magia", "Ritual"];
export const AREAS = ["Cone", "Cilindro", "Cubo", "Esfera", "Linha"];
export const DURACOES = ["Instantânea", "Concentrada"];
export const CONJURACOES = ["Ação", "Ação Bônus", "Ataque", "Reação", "Maior"];

export const ELEMENTOS = [
  // Mantive key/label, mas cores exatamente como você pediu
  { key: "sombrio", label: "Sombrio", c1: "#7a3dff", c2: "#2d0d66" },
  { key: "agua", label: "Água", c1: "#2fd5c8", c2: "#0c5f63" },
  { key: "fogo", label: "Fogo", c1: "#ff8a2a", c2: "#7a2a00" },
  { key: "magma", label: "Magma", c1: "#ff3b2e", c2: "#5a2d1a" },
  { key: "tempestade", label: "Tempestade", c1: "#4aa3ff", c2: "#f2f6ff" },
  { key: "metal", label: "Metal", c1: "#b9c1cc", c2: "#5b6472" },
  { key: "cristal", label: "Cristal", c1: "#bfe6ff", c2: "#6bb6ff" },
  { key: "veneno", label: "Veneno", c1: "#b7ff2a", c2: "#2d5a00" },
  { key: "luz", label: "Luz", c1: "#fff2a8", c2: "#b58b1a" },
  { key: "vento", label: "Vento", c1: "#ffffff", c2: "#aeb6c2" },
  { key: "terra", label: "Terra", c1: "#8a5a2b", c2: "#3a220f" },
  { key: "gelo", label: "Gelo", c1: "#d9fbff", c2: "#7fd3ff" },
  { key: "flora", label: "Flora", c1: "#37d46a", c2: "#ff6fb1" },
  { key: "artico", label: "Ártico", c1: "#2b7cff", c2: "#ffffff" },
  { key: "deserto", label: "Deserto", c1: "#f2d08a", c2: "#b8862a" },
  { key: "inferno", label: "Inferno", c1: "#ff3a2f", c2: "#ff8a2a" },
  { key: "nevasca", label: "Nevasca", c1: "#7fd3ff", c2: "#ffffff" },
  { key: "som", label: "Som", c1: "#8a66ff", c2: "#3b3f4a" },
  { key: "trovejante", label: "Trovejante", c1: "#3c7bff", c2: "#ffd84a" },
];

export const MISTERIOS = [
  // Celestiais
  { key: "cronomancia", label: "Cronomancia", color1: "#d6b35a", color2: "#fff2a8", desc: "Cronomancia afeta o eixo do tempo do espaço-tempo..." },
  { key: "espacomancia", label: "Espaçomancia", color1: "#0b2a66", color2: "#1e6bff", desc: "Espaçomancia manipula o eixo espacial..." },
  { key: "gravitomancia", label: "Gravitomancia", color1: "#8a93a1", color2: "#3b3f4a", desc: "Gravitomancia estuda atração e repulsão..." },
  { key: "runomancia", label: "Runomancia", color1: "#bfe6ff", color2: "#2b7cff", desc: "Runomancia concentra-se na energia celestial e runas..." },

  // Elementais gerais / Elementos (podem reutilizar cores dos elementos)
  { key: "agua", label: "Água", color1: "#2fd5c8", color2: "#0c5f63", desc: "O mistério da Água lida com cura, pressão e fluxo..." },
  { key: "artico", label: "Ártico", color1: "#2b7cff", color2: "#ffffff", desc: "Ártico une vida intensa e oposição para harmonia..." },
  { key: "cristal", label: "Cristal", color1: "#bfe6ff", color2: "#6bb6ff", desc: "Cristal conserva, protege e estabiliza estruturas..." },
  { key: "deserto", label: "Deserto", color1: "#f2d08a", color2: "#b8862a", desc: "Deserto representa corrosão física/metafísica..." },
  { key: "encantamento", label: "Encantamento", color1: "#ff6fb1", color2: "#e7d7a0", desc: "Encantamento impõe vontade e potencializa conexões..." },
  { key: "etermancia", label: "Étermancia", color1: "#37d46a", color2: "#d6b35a", desc: "Étermancia estuda fios fundamentais da mana..." },
  { key: "hemomancia", label: "Hemomancia", color1: "#b22121", color2: "#ff3a2f", desc: "Hemomancia manipula o princípio vital do sangue..." },
  { key: "ilusao", label: "Ilusão", color1: "#9aa3b2", color2: "#3b3f4a", desc: "Ilusão afeta percepção e mecanismos sensoriais..." },
  { key: "necromancia", label: "Necromancia", color1: "#000000", color2: "#2a2a2a", desc: "Necromancia trabalha campos energéticos deixados pela vida..." },
  { key: "oniromancia", label: "Oniromancia", color1: "#ffd1ea", color2: "#ff6fb1", desc: "Oniromancia canaliza sonhos e pesadelos..." },
  { key: "transmutacao", label: "Transmutação", color1: "#fff2a8", color2: "#d6b35a", desc: "Transmutação altera características físicas e estados..." },
  { key: "umbramancia", label: "Umbramancia", color1: "#7a3dff", color2: "#0b0b0b", desc: "Umbramancia manifesta a sombra por energia espiritual..." },
  { key: "adivinhacao", label: "Adivinhação", color1: "#7a3dff", color2: "#d6b35a", desc: "Adivinhação observa linhas do destino e interações..." },
];

export const defaultNovoAtaque = {
  nome: "",
  tipoDano: "Corte",
  dano: "",
  alcance: "Corpo a corpo",
  critico: "20",
  mult: "x2",
};

export const defaultNovoPoder = { nome: "", desc: "" };

export const defaultNovaMagia = {
  nome: "",
  elemento: "sombrio",
  tipo: "Magia",
  area: "Esfera",
  duracaoTipo: "Instantânea",
  duracaoTexto: "",
  alvos: "",
  conjuracao: "Ataque",
  alcance: "",
  descricao: "",
  equipada: false,
};

export const defaultNovoMisterio = { misterioKey: "" };

export const defaultState = {
  tab: "magias",
  info: { jogador: "", personagem: "", classe: "", origem: "", regiao: "" },
  attrs: { FOR: 10, DES: 10, CON: 10, INT: 10, SAB: 10, CAR: 10 },
  skills: [
    { name: "Acrobacia", attr: "DES", trained: false },
    { name: "Arcanismo", attr: "INT", trained: false },
    { name: "Atletismo", attr: "FOR", trained: false },
    { name: "Atuação", attr: "CAR", trained: false },
    { name: "Enganação", attr: "CAR", trained: false },
    { name: "Furtividade", attr: "DES", trained: false },
    { name: "História", attr: "INT", trained: false },
    { name: "Intimidação", attr: "CAR", trained: false },
    { name: "Intuição", attr: "SAB", trained: false },
    { name: "Investigação", attr: "INT", trained: false },
    { name: "Medicina", attr: "SAB", trained: false },
    { name: "Natureza", attr: "INT", trained: false },
    { name: "Percepção", attr: "SAB", trained: false },
    { name: "Persuasão", attr: "CAR", trained: false },
    { name: "Prestidigitação", attr: "DES", trained: false },
    { name: "Religião", attr: "INT", trained: false },
    { name: "Sobrevivência", attr: "SAB", trained: false },
    { name: "Tecnologia", attr: "INT", trained: false },
  ],
  vida: { atual: 35, max: 131 },
  mana: { atual: 40, max: 50 },
  ataques: [],
  poderes: [],
  magias: [],
  magiaStats: { cd: 0, acerto: 0 },
  misterios: [],
};
