// src/data/itemsConstants.js

// ========== ARMADURAS E ESCUDOS ==========
export const ARMADURAS = [
  // Armaduras Leves
  { nome: "Acolchoada", preco: 5, ca: "11 + Modificador de Destreza", rd: "-", forca: "-", furtividade: "Desvantagem", peso: 4, excecao: "-", tipo: "Leve" },
  { nome: "Couro", preco: 10, ca: "11 + Modificador de Destreza", rd: "-", forca: "-", furtividade: "-", peso: 5, excecao: "-", tipo: "Leve" },
  { nome: "Couro Batido", preco: 45, ca: "12 + Modificador de Destreza", rd: "-", forca: "-", furtividade: "-", peso: 6.5, excecao: "-", tipo: "Leve" },
  
  // Armaduras Médias
  { nome: "Gibão de Peles", preco: 10, ca: "12 + Modificador de Destreza (máx +2)", rd: "1", forca: "-", furtividade: "-", peso: 6, excecao: "Ácido", tipo: "Média" },
  { nome: "Camisão de Malha", preco: 30, ca: "13 + Modificador de Destreza (máx +2)", rd: "1", forca: "-", furtividade: "-", peso: 10, excecao: "Elétrico", tipo: "Média" },
  { nome: "Lórica de Escamas", preco: 50, ca: "14 + Modificador de Destreza (máx +2)", rd: "1", forca: "-", furtividade: "Desvantagem", peso: 22.5, excecao: "Elétrico", tipo: "Média" },
  { nome: "Couraça Peitoral", preco: 400, ca: "14 + Modificador de Defesa (máx +2)", rd: "1", forca: "-", furtividade: "-", peso: 10, excecao: "Elétrico", tipo: "Média" },
  { nome: "Placas Parcial", preco: 750, ca: "15 + Modificador de Defesa (máx +2)", rd: "1", forca: "-", furtividade: "Desvantagem", peso: 20, excecao: "Elétrico", tipo: "Média" },
  
  // Armaduras Pesadas
  { nome: "Cota de Anéis", preco: 30, ca: "15", rd: "1", forca: "-", furtividade: "Desvantagem", peso: 20, excecao: "Elétrico", tipo: "Pesada" },
  { nome: "Cota de Malha", preco: 75, ca: "16", rd: "2", forca: "13", furtividade: "Desvantagem", peso: 27.5, excecao: "Elétrico", tipo: "Pesada" },
  { nome: "Cota de Talas", preco: 200, ca: "17", rd: "2", forca: "15", furtividade: "Desvantagem", peso: 30, excecao: "-", tipo: "Pesada" },
  { nome: "Placas", preco: 1500, ca: "18", rd: "3", forca: "15", furtividade: "Desvantagem", peso: 32.5, excecao: "-", tipo: "Pesada" },
  
  // Armaduras Especiais
  { nome: "Couraça de Aço Rúnico", preco: 0, ca: "14 + Modificador de Destreza (máx +2)", rd: "2/5 mágico", forca: "-", furtividade: "-", peso: 10, excecao: "-", tipo: "Especial" },
  { nome: "Segunda Pele Vastinata", preco: 0, ca: "14 + Modificador de Destreza (máx +2)", rd: "1/4 mágico", forca: "-", furtividade: "-", peso: 0.25, excecao: "Ácido", tipo: "Especial" },
  { nome: "Peitoral Vastinata", preco: 0, ca: "16 + Modificador de Destreza (máx +2)", rd: "2/5 mágico", forca: "-", furtividade: "-", peso: 2, excecao: "Ácido", tipo: "Especial" },
];

export const ESCUDOS = [
  { nome: "Broquel", preco: 1, ca: "Especial", rd: "-", forca: "-", furtividade: "-", peso: 1, excecao: "-" },
  { nome: "Escudo Leve", preco: 5, ca: "1", rd: "-", forca: "-", furtividade: "-", peso: 3, excecao: "-" },
  { nome: "Escudo Pesado", preco: 15, ca: "2", rd: "-", forca: "13", furtividade: "-", peso: 7, excecao: "-" },
  { nome: "Escudo de Torre", preco: 50, ca: "+2, Especial", rd: "-", forca: "13", furtividade: "Desvantagem", peso: 15, excecao: "-" },
];

// ========== ARMAS ==========
export const ARMAS_SIMPLES_CORPO = [
  { nome: "Adaga", preco: 2, dano: "1d4 p/ 1d4 r", critico: "p 19 x3", peso: 0.5, maestria: "Ágil", propriedades: "Acuidade, arremesso (20/60 pés), leve" },
  { nome: "Arpão", preco: 3, dano: "1d6 p", critico: "x2", peso: 0.5, maestria: "Lentidão", propriedades: "Acuidade, arremesso (20/80 pés)" },
  { nome: "Azagaia", preco: 5, dano: "1d6 p", critico: "x2", peso: 1, maestria: "Lentidão", propriedades: "Arremesso (distância 30/120 pés)" },
  { nome: "Bastão", preco: 2, dano: "1d6 c", critico: "20 x3", peso: 2, maestria: "Fender", propriedades: "Versátil (1d8 c)" },
  { nome: "Clava Grande", preco: 2, dano: "1d8 c", critico: "x2", peso: 5, maestria: "Empurrar", propriedades: "Pesada, duas mãos" },
  { nome: "Foice", preco: 1, dano: "1d4 r/ 1d4 p", critico: "r 19 x3", peso: 1, maestria: "Ágil", propriedades: "Leve" },
  { nome: "Lança", preco: 1, dano: "1d6 p", critico: "x2", peso: 1.5, maestria: "Tontear", propriedades: "Arremesso (20/60 pés), versátil (1d8 p)" },
  { nome: "Maça", preco: 5, dano: "1d6 c", critico: "19 x3", peso: 2, maestria: "Tontear", propriedades: "-" },
  { nome: "Machadinha", preco: 5, dano: "1d6 r", critico: "x2", peso: 1, maestria: "Aflição", propriedades: "Leve, arremesso (20/60 pés)" },
  { nome: "Martelo Leve", preco: 2, dano: "1d6 c", critico: "x2", peso: 1, maestria: "Ágil", propriedades: "Leve, arremesso (20/60 pés)" },
  { nome: "Porrete", preco: 1, dano: "1d4 c", critico: "x2", peso: 1, maestria: "Lentidão", propriedades: "Leve" },
];

export const ARMAS_SIMPLES_DISTANCIA = [
  { nome: "Arco Curto", preco: 25, dano: "1d6 p", critico: "x2", peso: 1, maestria: "Aflição", propriedades: "Munição (80/320 pés), duas mãos" },
  { nome: "Besta Leve", preco: 25, dano: "1d8 p", critico: "x2", peso: 2.5, maestria: "Lentidão", propriedades: "Munição (80/320 pés), recarga, duas mãos" },
  { nome: "Dardo", preco: 5, dano: "1d4 p", critico: "x2", peso: 0.1, maestria: "Aflição", propriedades: "Acuidade, arremesso (20/60 pés)" },
  { nome: "Funda", preco: 1, dano: "1d4 c", critico: "x2", peso: 0, maestria: "Lentidão", propriedades: "Munição (30/120 pés)" },
];

export const ARMAS_MARCIAIS_CORPO = [
  { nome: "Alabarda", preco: 20, dano: "1d10 r/ 1d6 p", critico: "x2", peso: 3, maestria: "Fender", propriedades: "Duas mãos, extensão 1, pesada" },
  { nome: "Cimitarra", preco: 25, dano: "1d6 r/ 1d4 p", critico: "r 19 x3", peso: 1.5, maestria: "Ágil", propriedades: "Acuidade, leve" },
  { nome: "Chakram Pequeno", preco: 3, dano: "1d4 r", critico: "x2", peso: 1, maestria: "Tontear", propriedades: "Acuidade, arremesso (15/60 pés), leve, regional (Targon)" },
  { nome: "Chakram Médio", preco: 6, dano: "1d8 r", critico: "x2", peso: 3.5, maestria: "Aflição", propriedades: "Acuidade, arremesso (30/90 pés), pesada, regional (Shurima)" },
  { nome: "Chicote", preco: 2, dano: "1d4 r", critico: "20 x3", peso: 1.5, maestria: "Lentidão", propriedades: "Acuidade, captura, extensão 2" },
  { nome: "Espada Curta", preco: 10, dano: "1d6 p/ 1d4 r", critico: "p x3", peso: 1, maestria: "Aflição", propriedades: "Acuidade, leve" },
  { nome: "Espada Grande", preco: 50, dano: "2d6 r/ 1d8 p", critico: "x2", peso: 3, maestria: "Raspão", propriedades: "Duas mãos, pesada" },
  { nome: "Espada Longa", preco: 15, dano: "1d8 r/ 1d6 p", critico: "x2", peso: 1.5, maestria: "Tontear", propriedades: "Versátil (1d10 r/ 1d8 p)" },
  { nome: "Foice de Guerra", preco: 10, dano: "2d4 r/ 1d8 p", critico: "x2", peso: 2.5, maestria: "Tontear", propriedades: "Duas mãos, extensão 1, pesada" },
  { nome: "Glaive", preco: 20, dano: "1d10 r/p", critico: "x2", peso: 3, maestria: "Raspão", propriedades: "Duas mãos, extensão 1, pesada" },
  { nome: "Katar", preco: 15, dano: "1d6 p/ 1d6 r", critico: "p 19 x3", peso: 1.5, maestria: "Ágil/ Aflição", propriedades: "Acuidade, regional (Ionia, Noxus, Shurima)" },
  { nome: "Khopesh", preco: 20, dano: "1d8 r", critico: "x2", peso: 2, maestria: "Tontear", propriedades: "Acuidade, regional (Ionia, Targon, Shurima), versátil (1d10 r)" },
  { nome: "Lança de Montaria", preco: 10, dano: "1d12 p", critico: "x2", peso: 3, maestria: "Fender", propriedades: "Extensão 1, especial" },
  { nome: "Lança Longa", preco: 5, dano: "1d10 p/ 1d6 r", critico: "x2", peso: 4, maestria: "Empurrar", propriedades: "Duas mãos, extensão 2, híbrida (1d6 cortante), pesada" },
  { nome: "Maça Estrela", preco: 15, dano: "1d6 c + 1d4 p", critico: "19 x3", peso: 2, maestria: "Tontear", propriedades: "-" },
  { nome: "Machado de Batalha", preco: 10, dano: "1d8 r", critico: "x2", peso: 2, maestria: "Raspão", propriedades: "Versátil (1d10 r)" },
  { nome: "Machado Grande", preco: 30, dano: "1d12 r", critico: "x2", peso: 3.5, maestria: "Fender", propriedades: "Pesada, duas mãos" },
  { nome: "Malho", preco: 10, dano: "2d6 c", critico: "x2", peso: 5, maestria: "Tontear", propriedades: "Pesada, duas mãos" },
  { nome: "Mangual", preco: 10, dano: "1d4 p + 1d4 c", critico: "x2", peso: 1, maestria: "Tontear", propriedades: "Extensão" },
  { nome: "Manopla de Guerra", preco: 1, dano: "* especial", critico: "x2", peso: 0.5, maestria: "Ágil", propriedades: "Manopla, (*+1 de dano com golpes desarmados)" },
  { nome: "Martelo de Guerra", preco: 15, dano: "1d8 c", critico: "x2", peso: 1, maestria: "Empurrar", propriedades: "Versátil (1d10 c)" },
  { nome: "Picareta de Guerra", preco: 5, dano: "1d8 p/ 1d4 c", critico: "p 19 x3", peso: 1, maestria: "Tontear", propriedades: "-" },
  { nome: "Rapieira", preco: 25, dano: "1d8 p/ 1d4 r", critico: "p 20 x3", peso: 1, maestria: "Aflição", propriedades: "Acuidade" },
  { nome: "Tridente", preco: 5, dano: "1d6 p", critico: "20 x3", peso: 1, maestria: "Lentidão", propriedades: "Arremesso (20/60 pés), versátil (1d8 p)" },
];

export const ARMAS_MARCIAIS_DISTANCIA = [
  { nome: "Arco Longo", preco: 50, dano: "1d8 p", critico: "x2", peso: 1, maestria: "Lentidão", propriedades: "Duas mãos, munição (150/600 pés), pesada" },
  { nome: "Besta de Repetição", preco: 300, dano: "1d6 p", critico: "x2", peso: 1.5, maestria: "Aflição", propriedades: "Capacidade 5, leve, munição (80/400 pés), regional (Demacia)" },
  { nome: "Besta de Mão", preco: 75, dano: "1d6 p", critico: "x2", peso: 1.5, maestria: "Aflição", propriedades: "Leve, munição (30/120 pés), recarga" },
  { nome: "Besta de Repetição", preco: 150, dano: "1d6 p", critico: "x2", peso: 1.5, maestria: "Lentidão", propriedades: "Capacidade 4, duas mãos, munição (60/300 pés), regional (Demacia, Piltover, Zaun)" },
  { nome: "Besta de Repetição Pesada", preco: 400, dano: "1d8 p", critico: "x2", peso: 5, maestria: "Lentidão", propriedades: "Capacidade 4, duas mãos, munição (60/300 pés), pesada, regional (Demacia, Piltover, Zaun)" },
  { nome: "Besta Pesada", preco: 50, dano: "1d10 p", critico: "x2", peso: 4.5, maestria: "Lentidão", propriedades: "Duas mãos, munição (90/400 pés), pesada, recarga" },
  { nome: "Rede", preco: 1, dano: "-", critico: "x2", peso: 1.5, maestria: "-", propriedades: "Especial, arremesso (5/15 pés)" },
  { nome: "Zarabatana", preco: 10, dano: "1d2 p", critico: "x2", peso: 0.5, maestria: "Aflição", propriedades: "Munição (25/90 pés), recarga" },
];

export const ARMAS_IMPROPRIAS_CORPO = [
  { nome: "Chakram Grande", preco: 12, dano: "1d12 r", critico: "x2", peso: 7, maestria: "Raspão", propriedades: "Acuidade, duas mãos, extensão 1, imprópria -2, regional (Ixtal)" },
  { nome: "Cutelo Crescente", preco: 60, dano: "2d6 r", critico: "19 x3", peso: 2, maestria: "Fender", propriedades: "Imprópria -2, regional (Shurima), versátil (3d6 r)" },
  { nome: "Dracocida", preco: 150, dano: "1d10 p", critico: "x2", peso: 4.5, maestria: "Lentidão", propriedades: "Especial, duas mãos, extensão 1, imprópria -2, regional (Demacia)" },
  { nome: "Espada Javali", preco: 60, dano: "2d8 r", critico: "19 x3", peso: 6, maestria: "Fender", propriedades: "Imprópria -2, pesada, regional (Freljord), versátil (2d10 r)" },
  { nome: "Han Kote", preco: 1, dano: "* especial", critico: "x2", peso: 0.5, maestria: "Ágil", propriedades: "Defensivo 1, imprópria -1, manopla, (*+1 de dano com golpes desarmados), regional (Ionia)" },
  { nome: "Ídolo de Deus Ancião", preco: 10, dano: "1d8 c", critico: "19 x3", peso: 5, maestria: "Empurrar", propriedades: "Duas mãos, imprópria -1, pesada, regional (Águas de Sentina)" },
  { nome: "Katana", preco: 25, dano: "1d8 r/ 1d4 p", critico: "19 x3", peso: 1, maestria: "Lentidão", propriedades: "Acuidade, imprópria -1, versátil (1d10 r/ 1d6 p), regional (Ionia)" },
  { nome: "Lâmina Navori", preco: 15, dano: "1d6 r/p", critico: "x2", peso: 1.5, maestria: "Aflição", propriedades: "Arremesso (20/60 pés), leve, imprópria -3, regional (Ionia), especial" },
  { nome: "Nodachi", preco: 75, dano: "2d6 r/ 1d6 p", critico: "19 x3", peso: 3, maestria: "Lentidão", propriedades: "Duas mãos, extensão 1, Imprópria -2, pesada, regional (Ionia)" },
  { nome: "Nícoli", preco: 30, dano: "2d4 c", critico: "19 x2", peso: 3, maestria: "Aflição", propriedades: "Defensivo 1, imprópria -2, pesada, regional (Nazumah)" },
  { nome: "Nunchaku", preco: 1, dano: "1d4 c", critico: "19 x3", peso: 1, maestria: "Ágil", propriedades: "Acuidade, imprópria -3, leve, proteção 1, versátil (1d6 c), regional (Ionia)" },
  { nome: "Sai", preco: 10, dano: "1d4 p", critico: "19 x3", peso: 0.5, maestria: "Aflição", propriedades: "Acuidade, desarme, imprópria -1, leve" },
  { nome: "Sanfa", preco: 5, dano: "1d4 c", critico: "19 x2", peso: 0.5, maestria: "Lentidão", propriedades: "Acuidade, defensivo 1, imprópria -1, leve, regional (Ionia, Nazumah)" },
];

export const ARMAS_IMPROPRIAS_DISTANCIA = [
  { nome: "Shuriken", preco: 1, dano: "1d4 p/1d2 r", critico: "x2", peso: 0.2, maestria: "Raspão", propriedades: "Imprópria -1, leve, arremesso (20/60 pés), regional (Ionia)" },
];

export const ARMAS_CORRENTES = [
  { nome: "Adaga com Corrente", preco: 10, dano: "1d4 p/ 1d4 c", critico: "19 x3", peso: 1.5, maestria: "Ágil/ Tontear", propriedades: "Acuidade, desarme, duas mãos, extensão 3, imprópria -2, leve, regional (Ionia)" },
  { nome: "Cão-Dragão", preco: 25, dano: "1d8 r/ *", critico: "19 x3", peso: 2, maestria: "Fender", propriedades: "Captura, desarme, especial, extensão 3, imprópria -2, leve, manopla, regional (Noxus)" },
  { nome: "Corrente Espinhosa", preco: 10, dano: "1d6 p", critico: "x2", peso: 2, maestria: "Aflição", propriedades: "Acuidade, captura, desarme, duas mãos, extensão 3, imprópria -2, leve, regional (Noxus)" },
  { nome: "Foice com Corrente", preco: 10, dano: "1d6 r/ 1d4 c", critico: "x2", peso: 2.5, maestria: "Ágil/ Tontear", propriedades: "Acuidade, captura, desarme, duas mãos, extensão 3, imprópria -2, leve, regional (Ionia)" },
  { nome: "Lâmina com Corrente", preco: 20, dano: "1d6 p/ 1d6 r", critico: "19 x3", peso: 2, maestria: "Tontear", propriedades: "Acuidade, captura, desarme, extensão 3, imprópria -2, leve, regional (Noxus)" },
  { nome: "Manopla com Corrente", preco: 10, dano: "1d6 c/* especial", critico: "3 Kg", peso: 3, maestria: "Tontear", propriedades: "Captura, desarme, especial, extensão 3, imprópria -2, leve, manopla, (*+1 de dano com golpes desarmados)" },
  { nome: "Martelo Meteoro", preco: 40, dano: "1d8 c", critico: "x2", peso: 2, maestria: "Empurrar", propriedades: "Acuidade, captura, desarme, duas mãos, extensão 3, imprópria -2, regional (Ionia)" },
];

// ========== ARMAS DE FOGO ==========
export const ARMAS_FOGO = [
  // Leves
  { nome: "Pistola", nivel: 1, preco: 75, dano: "1d6p", critico: "x2", peso: 1.5, maestria: "Aflição", erro: "4", alcance: "45/150", propriedades: "Cap. 1, força 1, leve" },
  { nome: "Garrucha", nivel: 2, preco: 100, dano: "1d8p", critico: "x2", peso: 2, maestria: "Aflição", erro: "3", alcance: "60/250", propriedades: "Cap. 2, força 1, leve" },
  { nome: "Derringer", nivel: 2, preco: 250, dano: "1d6p", critico: "x4", peso: 0.5, maestria: "Ágil", erro: "1", alcance: "20/50", propriedades: "Capacidade 2, leve, especial" },
  { nome: "Revolver", nivel: 3, preco: 250, dano: "1d8p", critico: "19 x3", peso: 2, maestria: "Aflição", erro: "3", alcance: "60/250", propriedades: "Cap. 5, força 1, leve" },
  { nome: "Pistola Semi-Automática", nivel: 4, preco: 500, dano: "1d10p", critico: "19 x3", peso: 2, maestria: "Aflição", erro: "3", alcance: "100/300", propriedades: "Cap. 10, força 1, leve, rajada 5" },
  { nome: "Pistola Automática", nivel: 5, preco: 1500, dano: "1d10p", critico: "19 x3", peso: 2, maestria: "Aflição", erro: "2", alcance: "100/300", propriedades: "Cap. 10, força 1, leve, estável, rajada 5" },
  { nome: "Pistola Rajinante", nivel: 6, preco: 3000, dano: "1d12p", critico: "19 x3", peso: 2, maestria: "Aflição+Lentidão", erro: "1", alcance: "150/640", propriedades: "Cap. 15, força 1, leve, estável, rajada 10" },
  
  // Médias
  { nome: "Carabina", nivel: 1, preco: 125, dano: "1d8p", critico: "x2", peso: 3.5, maestria: "Raspão", erro: "4", alcance: "30", propriedades: "Cap. 1, duas mãos, dispersão, força 1" },
  { nome: "Espingarda", nivel: 2, preco: 250, dano: "1d10p", critico: "x2", peso: 3.5, maestria: "Raspão", erro: "3", alcance: "30", propriedades: "Cap. 2, duas mãos, dispersão, força 1" },
  { nome: "Escopeta", nivel: 3, preco: 500, dano: "2d6p", critico: "x2", peso: 3.5, maestria: "Raspão", erro: "3", alcance: "30", propriedades: "Cap. 2, duas mãos, dispersão, força 1" },
  { nome: "Carabina de Tambor", nivel: 4, preco: 1500, dano: "2d6p", critico: "x2", peso: 4, maestria: "Raspão", erro: "3", alcance: "30", propriedades: "Cap. 10, duas mãos, dispersão, força 1, rajada 2" },
  { nome: "Espingarda Automática", nivel: 5, preco: 3500, dano: "2d8p", critico: "x2", peso: 4, maestria: "Raspão", erro: "2", alcance: "30", propriedades: "Cap. 8, duas mãos, dispersão, força 1, rajada 2" },
  { nome: "Escopeta Krug", nivel: 6, preco: 5000, dano: "2d8p", critico: "19 x3", peso: 4, maestria: "Raspão+Empurrar", erro: "2", alcance: "45", propriedades: "Cap. 10, duas mãos, dispersão, força 1, rajada 4" },
  
  // Longas
  { nome: "Arcabuz", nivel: 1, preco: 125, dano: "1d12p", critico: "x2", peso: 3.5, maestria: "Aflição", erro: "3", alcance: "150/640", propriedades: "Cap. 1, duas mãos, força 1" },
  { nome: "Mosquete", nivel: 2, preco: 300, dano: "3d4p", critico: "19 x3", peso: 3.5, maestria: "Aflição", erro: "3", alcance: "150/640", propriedades: "Cap. 4, duas mãos, força 1" },
  { nome: "Rifle", nivel: 3, preco: 750, dano: "4d4p", critico: "19 x3", peso: 3.5, maestria: "Aflição", erro: "2", alcance: "200/800", propriedades: "Cap. 4, duas mãos, força 1, rajada 2" },
  { nome: "Fuzil", nivel: 4, preco: 2000, dano: "2d10", critico: "19 x3", peso: 3.5, maestria: "Aflição", erro: "2", alcance: "200/800", propriedades: "Cap. 15, duas mãos, força 1, rajada 5" },
  { nome: "Rifle de Precisão", nivel: 5, preco: 5000, dano: "2d12", critico: "18 x4", peso: 3.5, maestria: "Aflição", erro: "1", alcance: "500/1000", propriedades: "Cap. 4, duas mãos, força 1" },
  { nome: "Fuzil Ancião", nivel: 6, preco: 10000, dano: "2d12", critico: "18 x4", peso: 3.5, maestria: "Aflição+Tontear", erro: "1", alcance: "500/1000", propriedades: "Cap. 15, duas mãos, força 1, rajada 10" },
  
  // Canhões
  { nome: "Canhão de Mão", nivel: 1, preco: 125, dano: "1d8c", critico: "x2", peso: 6, maestria: "Empurrar", erro: "2", alcance: "60/250", propriedades: "Cap. 1, duas mãos, explosivo 5, força 1" },
  { nome: "Canhão Médio", nivel: 2, preco: 350, dano: "1d10c", critico: "x2", peso: 8, maestria: "Empurrar", erro: "2", alcance: "80/340", propriedades: "Cap. 2, duas mãos, explosivo 10, força 2" },
  { nome: "Lança-granadas Simples", nivel: 2, preco: 300, dano: "1d8c", critico: "x2", peso: 4, maestria: "Raspão", erro: "1", alcance: "60/250", propriedades: "Cap. 2, duas mãos, explosivo 5, força 1" },
  { nome: "Canhão Pesado", nivel: 3, preco: 750, dano: "2d8c", critico: "x2", peso: 12, maestria: "Empurrar", erro: "2", alcance: "150/640", propriedades: "Cap. 2, duas mãos, explosivo 15, força 3" },
  { nome: "Lança-granadas Médio", nivel: 3, preco: 750, dano: "1d10c", critico: "x2", peso: 5, maestria: "Raspão", erro: "1", alcance: "80/340", propriedades: "Cap. 2, duas mãos, explosivo 10, força 2" },
  { nome: "Canhão Enorme", nivel: 4, preco: 1500, dano: "3d10c", critico: "x2", peso: 20, maestria: "Empurrar", erro: "2", alcance: "300/900", propriedades: "Cap. 2, duas mãos, explosivo 20, força 4" },
  { nome: "Lança-granadas Pesado", nivel: 4, preco: 1500, dano: "2d8c", critico: "x2", peso: 6, maestria: "Raspão", erro: "1", alcance: "150/640", propriedades: "Cap. 4, duas mãos, explosivo 15, força 2" },
  { nome: "Bazuca Grompe", nivel: 5, preco: 5000, dano: "3d12c", critico: "x2", peso: 12, maestria: "Raspão", erro: "1", alcance: "300/900", propriedades: "Cap. 2, duas mãos, explosivo 20, força 2" },
  { nome: "Bombarda Nashor", nivel: 6, preco: 15000, dano: "3d12 x2*", critico: "19 x3", peso: 50, maestria: "Empurrar+Raspão", erro: "0", alcance: "500/1000", propriedades: "Cap. 4, duas mãos, explosivo 30, força 6" },
  
  // Lança-Chamas
  { nome: "Simples", nivel: 3, preco: 350, dano: "1d8 ígneo", critico: "-", peso: 14, maestria: "Raspão", erro: "-", alcance: "C10 - L 30", propriedades: "Carga 10, duas mãos, especial, força 2" },
  { nome: "Compacto", nivel: 4, preco: 750, dano: "1d8 ígneo", critico: "-", peso: 4, maestria: "Raspão", erro: "-", alcance: "C15 - L 45", propriedades: "Carga 4, duas mãos, especial" },
  
  // Baionetas
  { nome: "Pistola Faca", nivel: 1, preco: 95, dano: "1d6p/r", critico: "x2", peso: 2, maestria: "Aflição/Ágil", erro: "4", alcance: "60/250", propriedades: "Acuidade, baioneta, cap. 1, força 1, imprópria -2, leve" },
  { nome: "Arcabuz Espada", nivel: 1, preco: 175, dano: "1d12p/ 1d10r", critico: "x2", peso: 4, maestria: "Aflição/ Tontear", erro: "3", alcance: "150/640", propriedades: "Baioneta, cap. 1, duas mãos, imprópria -2" },
  { nome: "Canhão Machado", nivel: 1, preco: 175, dano: "1d8c/ 1d12 r", critico: "r x2", peso: 9, maestria: "Empurrar/Raspão", erro: "3", alcance: "60/250", propriedades: "Baioneta, cap. 1, duas mãos, explosivo 5, força 1, imprópria -2, pesada" },
  { nome: "Revólver Laminar", nivel: 2, preco: 350, dano: "1d8p/r", critico: "19 x3", peso: 3, maestria: "Aflição/Tontear", erro: "3", alcance: "60/250", propriedades: "Baioneta, cap. 5, força 1, leve, imprópria -2, versátil (1d10)" },
];

export const MUNICAO_ARMAS_FOGO = [
  { nome: "Munição de Canhão", quantidade: 20, pesoTotal: 10, preco: 10 },
  { nome: "Munição Leve", quantidade: 100, pesoTotal: 1.5, preco: 10 },
  { nome: "Munição Longa", quantidade: 20, pesoTotal: 0.5, preco: 10 },
  { nome: "Munição Média", quantidade: 25, pesoTotal: 1, preco: 10 },
  { nome: "Tanque Simples", quantidade: 5, pesoTotal: 10, preco: 10 },
  { nome: "Tanque Compacto", quantidade: 10, pesoTotal: 10, preco: 10 },
];

// ========== EQUIPAMENTOS ==========
export const EQUIPAMENTOS = [
  { nome: "Ábaco", preco: 2, peso: 1 },
  { nome: "Ácido (frasco)", preco: 25, peso: 0.5 },
  { nome: "Água benta (frasco)", preco: 25, peso: 0.5 },
  { nome: "Algemas", preco: 2, peso: 3 },
  { nome: "Algibeira", preco: 5, peso: 0.5 },
  { nome: "Aljava", preco: 1, peso: 0.5 },
  { nome: "Ampulheta", preco: 25, peso: 0.5 },
  { nome: "Anel de sinete", preco: 5, peso: 0 },
  { nome: "Antitoxina (frasco)", preco: 25, peso: 0 },
  { nome: "Apito sinalizador", preco: 5, peso: 0 },
  { nome: "Água Negra", preco: 25, peso: 0.5 },
  { nome: "Ariete portátil", preco: 4, peso: 16 },
  { nome: "Armadilha de caça", preco: 5, peso: 12 },
  { nome: "Arpéu", preco: 2, peso: 2 },
  { nome: "Balança de mercador", preco: 5, peso: 1.5 },
  { nome: "Balde", preco: 5, peso: 1 },
  { nome: "Barril", preco: 2, peso: 30 },
  { nome: "Baú", preco: 5, peso: 12 },
  { nome: "Bolsa de componentes", preco: 25, peso: 1 },
  { nome: "Caixa para fogo", preco: 5, peso: 0.5 },
  { nome: "Caneta tinteiro", preco: 2, peso: 0 },
  { nome: "Cantil (capacidade 2 l - 2,5 kg cheio)", preco: 2, peso: 0.5 },
  { nome: "Cera de lacre", preco: 5, peso: 0 },
  { nome: "Cesta", preco: 4, peso: 1 },
  { nome: "Cobertor", preco: 5, peso: 1.5 },
  { nome: "Corda de cânhamo (50 pés)", preco: 1, peso: 5 },
  { nome: "Corda de seda (50 pés)", preco: 10, peso: 2.5 },
  { nome: "Corrente (10 pés)", preco: 5, peso: 5 },
  { nome: "Equipamento de pesca", preco: 1, peso: 2 },
  { nome: "Escada (10 pés)", preco: 1, peso: 12 },
  { nome: "Esferas de metal (saco com 1.000)", preco: 1, peso: 1 },
  { nome: "Espelho de aço", preco: 5, peso: 0.25 },
  { nome: "Estacas de ferro (10)", preco: 1, peso: 2.5 },
  { nome: "Estojo de cápsulas", preco: 20, peso: 2 },
  { nome: "Estojo de curandeiro", preco: 5, peso: 1.5 },
  { nome: "Estojo de escalada", preco: 25, peso: 6 },
  { nome: "Estojo de mapa ou pergaminho", preco: 1, peso: 0.5 },
  { nome: "Estojo de refeição", preco: 2, peso: 0.5 },
  { nome: "Estojo de víveres de besta", preco: 1, peso: 0.5 },
  { nome: "Estrepes (20)", preco: 1, peso: 1 },
  { nome: "Fechadura/ cadeado", preco: 10, peso: 0.5 },
  { nome: "Fogo Alquímico", preco: 50, peso: 0.5 },
  { nome: "Frasco ou caneca", preco: 2, peso: 0.5 },
  { nome: "Giz (1 pedaço)", preco: 1, peso: 0 },
  { nome: "Jarra ou ânfora", preco: 2, peso: 2 },
  { nome: "Lanterna", preco: 5, peso: 0.5 },
  { nome: "Lanterna coberta", preco: 5, peso: 1 },
  { nome: "Lanterna Foca-facho", preco: 10, peso: 1 },
  { nome: "Livro", preco: 25, peso: 2.5 },
  { nome: "Livro de magias/Grimório", preco: 50, peso: 1.5 },
  { nome: "Luneta", preco: 1000, peso: 0.5 },
  { nome: "Lupa", preco: 100, peso: 0 },
  { nome: "Marreta", preco: 2, peso: 5 },
  { nome: "Martelo", preco: 1, peso: 1.5 },
  { nome: "Mochila", preco: 20, peso: 2.5 },
  { nome: "Munição", preco: 1, peso: 0 },
  { nome: "Balas de funda (20)", preco: 4, peso: 0.75 },
  { nome: "Dardos de zarabatana (50)", preco: 1, peso: 0.5 },
  { nome: "Flechas (20)", preco: 1, peso: 0.5 },
  { nome: "Virotes de besta (20)", preco: 1, peso: 0.5 },
  { nome: "Óleo (frasco)", preco: 1, peso: 0.5 },
  { nome: "Pá", preco: 2, peso: 2.5 },
  { nome: "Panela de ferro", preco: 2, peso: 5 },
  { nome: "Papel (1 folha)", preco: 2, peso: 0 },
  { nome: "Pé-de-cabra", preco: 2, peso: 2.5 },
  { nome: "Pedra de amolar", preco: 1, peso: 0.5 },
  { nome: "Perfume (frasco)", preco: 5, peso: 0 },
  { nome: "Pergaminho (1 folha)", preco: 1, peso: 0 },
  { nome: "Picareta de mineiro", preco: 2, peso: 5 },
  { nome: "Piroflúido", preco: 50, peso: 0.5 },
  { nome: "Pitão", preco: 5, peso: 0.125 },
  { nome: "Poção de cura", preco: 50, peso: 0.25 },
  { nome: "Rações (1 dia)", preco: 5, peso: 1 },
  { nome: "Roldana/ Polia", preco: 1, peso: 2.5 },
  { nome: "Roupas (comuns)", preco: 5, peso: 1.5 },
  { nome: "Roupas (fantasia)", preco: 5, peso: 2 },
  { nome: "Roupas (finas)", preco: 15, peso: 3 },
  { nome: "Roupas (viagem)", preco: 2, peso: 2 },
  { nome: "Sabão", preco: 2, peso: 0 },
  { nome: "Saco", preco: 1, peso: 0.25 },
  { nome: "Saco de dormir", preco: 1, peso: 3.5 },
  { nome: "Símbolo sagrado", preco: 5, peso: 0 },
  { nome: "Amuleto", preco: 5, peso: 0.5 },
  { nome: "Emblema", preco: 5, peso: 0 },
  { nome: "Relicário", preco: 5, peso: 1 },
  { nome: "Sino", preco: 1, peso: 0 },
  { nome: "Tenda (para duas pessoas)", preco: 2, peso: 10 },
  { nome: "Tinta (frasco com 30 ml)", preco: 10, peso: 0 },
  { nome: "Tocha", preco: 1, peso: 0.5 },
  { nome: "Túnica", preco: 1, peso: 2 },
  { nome: "Vara (10 pés)", preco: 5, peso: 3.5 },
  { nome: "Vela", preco: 1, peso: 0 },
  { nome: "Varinha de teixo", preco: 10, peso: 0.5 },
  { nome: "Veneno básico (frasco)", preco: 100, peso: 0 },
  { nome: "Bastão de madeira", preco: 5, peso: 2 },
  { nome: "Cajado", preco: 5, peso: 2 },
  { nome: "Cristal", preco: 10, peso: 0.5 },
  { nome: "Orbe", preco: 20, peso: 1.5 },
  { nome: "Varinha", preco: 10, peso: 0.5 },
  { nome: "Ramo de visco", preco: 1, peso: 0 },
  { nome: "Tótem", preco: 1, peso: 0 },
  { nome: "Frasco de vidro", preco: 1, peso: 0 },
];

// ========== MONTARIAS E ANIMAIS ==========
export const MONTARIAS = [
  { nome: "Burro ou mula", preco: 8, deslocamento: "40 pés", capacidadeCarga: 190 },
  { nome: "Camelo", preco: 50, deslocamento: "50 pés", capacidadeCarga: 218 },
  { nome: "Cavalo de carga", preco: 50, deslocamento: "40 pés", capacidadeCarga: 245 },
  { nome: "Cavalo de guerra", preco: 400, deslocamento: "60 pés", capacidadeCarga: 245 },
  { nome: "Cavalo de montaria", preco: 75, deslocamento: "60 pés", capacidadeCarga: 218 },
  { nome: "Elefante", preco: 200, deslocamento: "40 pés", capacidadeCarga: 600 },
  { nome: "Mastim", preco: 25, deslocamento: "40 pés", capacidadeCarga: 88.5 },
  { nome: "Pônei", preco: 30, deslocamento: "40 pés", capacidadeCarga: 102 },
];

export const VEICULOS_AQUATICOS = [
  { nome: "Barco a remo", preco: 50, deslocamento: "2,4 km/h" },
  { nome: "Barco de guilha", preco: 3000, deslocamento: "1,6 km/h" },
  { nome: "Dracar", preco: 10000, deslocamento: "4,8 km/h" },
  { nome: "Galera", preco: 30000, deslocamento: "6,5 km/h" },
  { nome: "Navio de guerra", preco: 25000, deslocamento: "4 km/h" },
  { nome: "Veleiro", preco: 10000, deslocamento: "3,2 km/h" },
];

export const ARREIOS_VEICULOS = [
  { nome: "Alforjes", preco: 4, peso: 4 },
  { nome: "Alimentação (por dia)", preco: 5, peso: 5 },
  { nome: "Armadura de montaria", preco: "X4", peso: "X2" },
  { nome: "Biga", preco: 250, peso: 50 },
  { nome: "Carroça", preco: 15, peso: 100 },
  { nome: "Carruagem", preco: 100, peso: 300 },
  { nome: "Estábulo (por dia)", preco: 5, peso: 0 },
  { nome: "Rédea e freio", preco: 2, peso: 0.5 },
  { nome: "Sela Compacta", preco: 5, peso: 7.5 },
  { nome: "Sela Exótica", preco: 60, peso: 20 },
  { nome: "Sela Militar", preco: 20, peso: 20 },
  { nome: "Sela Viagem", preco: 10, peso: 12 },
  { nome: "Trenó", preco: 20, peso: 150 },
  { nome: "Vagão", preco: 35, peso: 200 },
];

export const COMIDA_BEBIDA_HOSPEDAGEM = [
  { nome: "Acomodação em estalagem (por dia) - Esquálida", preco: 7 },
  { nome: "Acomodação em estalagem (por dia) - Pobre", preco: 1 },
  { nome: "Acomodação em estalagem (por dia) - Modesta", preco: 5 },
  { nome: "Acomodação em estalagem (por dia) - Confortável", preco: 8 },
  { nome: "Acomodação em estalagem (por dia) - Abastada", preco: 2 },
  { nome: "Acomodação em estalagem (por dia) - Aristocrática", preco: 4 },
  { nome: "Banquete (por pessoa)", preco: 10 },
  { nome: "Carne, pedaço", preco: 3 },
  { nome: "Cerveja - Caneca", preco: 4 },
  { nome: "Cerveja - Galão", preco: 2 },
  { nome: "Pão, pedaço", preco: 2 },
  { nome: "Queijo, naco", preco: 1 },
  { nome: "Refeições - Esquálida", preco: 3 },
  { nome: "Refeições - Pobre", preco: 6 },
  { nome: "Refeições - Modesta", preco: 3 },
  { nome: "Refeições - Confortável", preco: 5 },
  { nome: "Refeições - Abastada", preco: 8 },
  { nome: "Refeições - Aristocrática", preco: 2 },
  { nome: "Vinho - Bom (garrafa)", preco: 10 },
  { nome: "Vinho - Comum (jarra)", preco: 2 },
];